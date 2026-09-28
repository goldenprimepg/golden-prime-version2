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
      const response = await globalThis.fetch(input, {
        ...(init ?? {}),
        headers,
        credentials: "include",
      });
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
      return response;
    },
  })],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}><App /></QueryClientProvider>
  </trpc.Provider>,
);
