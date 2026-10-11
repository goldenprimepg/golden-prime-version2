import { z } from "zod";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { getDb, isUsingEmbeddedFallback } from "../db";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  dbHealth: publicProcedure.query(async () => {
    const t0 = Date.now();
    let connected = false;
    let mode: "postgres" | "embedded" = "embedded";
    try {
      const db = await getDb();
      if (db) {
        connected = true;
        mode = isUsingEmbeddedFallback() ? "embedded" : "postgres";
      }
    } catch {
      connected = false;
    }
    const latencyMs = Date.now() - t0;
    return {
      connected,
      mode,
      latencyMs,
      timestamp: new Date().toISOString(),
    };
  }),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),
});
