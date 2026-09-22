import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let reachable = typeof navigator === "undefined" ? true : navigator.onLine;
let checkInFlight: Promise<void> | null = null;

function notify() {
  listeners.forEach(listener => listener());
}

function setReachable(value: boolean) {
  if (reachable === value) return;
  reachable = value;
  notify();
}

export async function checkServerReachability() {
  if (checkInFlight) return checkInFlight;

  checkInFlight = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch("/api/trpc/auth.me?batch=1&input=%7B%7D", {
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
      setReachable(response.ok || response.status === 401);
    } catch {
      setReachable(false);
    } finally {
      window.clearTimeout(timeout);
      checkInFlight = null;
    }
  })();

  return checkInFlight;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return reachable;
}

export function useServerReachability() {
  const isReachable = useSyncExternalStore(subscribe, getSnapshot, () => true);

  return { isReachable, checkServerReachability };
}

if (typeof window !== "undefined") {
  window.addEventListener("online", () => void checkServerReachability());
  window.addEventListener("offline", () => setReachable(false));
  void checkServerReachability();
}