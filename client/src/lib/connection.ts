import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let reachable = true;
let checkInFlight: Promise<void> | null = null;
let retryTimer: number | null = null;

function notify() {
  listeners.forEach(listener => listener());
}

function setReachable(value: boolean) {
  if (value && retryTimer !== null && typeof window !== "undefined") {
    window.clearTimeout(retryTimer);
    retryTimer = null;
  }
  if (!value && retryTimer === null && typeof window !== "undefined") {
    retryTimer = window.setTimeout(() => {
      retryTimer = null;
      void checkServerReachability();
    }, 3000);
  }
  if (reachable === value) return;
  reachable = value;
  notify();
}

export function markServerReachable() {
  setReachable(true);
}

export async function checkServerReachability() {
  if (checkInFlight) return checkInFlight;

  checkInFlight = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch("/api/trpc/auth.me", {
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
      setReachable(response.status > 0 && response.status < 500);
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
  window.addEventListener("focus", () => void checkServerReachability());
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void checkServerReachability();
  });
  window.addEventListener("offline", () => setReachable(false));
  void checkServerReachability();
}