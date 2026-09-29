import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { sendOverdueRentAlerts } from "../scheduled/rentAlerts";

export function createApp() {
  const app = express();
  app.use((req, _res, next) => {
    try {
      const parsed = new URL(req.url || "/", "http://localhost");
      const apiPath = parsed.searchParams.get("__api_path");
      if (apiPath) {
        parsed.searchParams.delete("__api_path");
        const search = parsed.searchParams.toString();
        req.url = `/api/${apiPath.replace(/^\/+/, "")}${search ? `?${search}` : ""}`;
      } else if (
        req.url &&
        !req.url.startsWith("/api/") &&
        (req.url.startsWith("/trpc") || req.url.startsWith("/storage") || req.url.startsWith("/scheduled"))
      ) {
        req.url = `/api${req.url}`;
      }
    } catch {
      // keep req.url unchanged
    }
    if (req.body !== undefined && req.body !== null && !(req as { _body?: boolean })._body) {
      if (Buffer.isBuffer(req.body) || typeof req.body === "string") {
        const raw = req.body.toString("utf8").trim();
        if (raw.startsWith("{") || raw.startsWith("[")) {
          try {
            req.body = JSON.parse(raw);
          } catch {
            // keep original body
          }
        }
      }
      (req as { _body?: boolean })._body = true;
    }
    next();
  });
  // Upload data URLs are validated and capped by the tRPC procedure; this
  // parser limit only prevents Express from rejecting valid 5 MB images.
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  app.post(["/api/scheduled/rent-overdue-alerts", "/scheduled/rent-overdue-alerts"], sendOverdueRentAlerts);
  app.use(
    ["/api/trpc", "/trpc"],
    createExpressMiddleware({ router: appRouter, createContext }),
  );
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Express API error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          message: err instanceof Error ? err.message : "Internal server error",
        },
      });
    }
  });
  return app;
}
