import { trpc } from "@/lib/trpc";
import { markServerReachable } from "@/lib/connection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";

const SESSION_TOKEN_STORAGE_KEY = "golden_prime_session_token";
const queryClient = new QueryClient();

function redirectToPhoneLogin(error: unknown) {
  if (!(error instanceof TRPCClientError) || typeof window === "undefined") return;
  if (error.data?.code !== "UNAUTHORIZED" || window.location.pathname === "/login") return;
  window.location.assign("/login");
}

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") redirectToPhoneLogin(event.query.state.error);
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") redirectToPhoneLogin(event.mutation.state.error);
});

const trpcClient = trpc.createClient({
  links: [httpBatchLink({
    url: "/api/trpc",
    transformer: superjson,
    async fetch(input, init) {
      const headers = new Headers(init?.headers);
      if (typeof window !== "undefined") {
        const storedToken = window.localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
        if (storedToken) {
          headers.set("x-session-token", storedToken);
        }
      }
      const executeFetch = () =>
        globalThis.fetch(input, {
          ...(init ?? {}),
          headers,
          credentials: "include",
        });
      let response = await executeFetch();
      let text = await response.clone().text();
      if (!text.trim() && response.status >= 500) {
        await new Promise(resolve => setTimeout(resolve, 400));
        response = await executeFetch();
        text = await response.clone().text();
      }
      if (response.status > 0 && response.status < 500) {
        markServerReachable();
      }
      if (typeof window !== "undefined") {
        const headerToken = response.headers.get("x-session-token");
        if (headerToken !== null) {
          if (headerToken) {
            window.localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, headerToken);
          } else {
            window.localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
          }
        }
      }
      if (!text.trim()) {
        const fallbackPayload = [{
          error: {
            json: {
              message: "Server is warming up. Please try signing in again in a moment.",
              code: -32603,
              data: { code: "INTERNAL_SERVER_ERROR", httpStatus: response.status || 503 },
            },
          },
        }];
        return new Response(JSON.stringify(fallbackPayload), {
          status: response.status >= 400 ? response.status : 503,
          headers: { "content-type": "application/json" },
        });
      }
      return response;
    },
  })],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
  </trpc.Provider>,
);
