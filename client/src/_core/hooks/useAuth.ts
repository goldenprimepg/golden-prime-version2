import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo } from "react";
import { clearOfflineWorkspaceSnapshots } from "@/lib/offlineSnapshot";
import { useServerReachability } from "@/lib/connection";

const USER_STORAGE_KEY = "golden-prime-user-info";

function readOfflineUser() {
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && Number.isSafeInteger(parsed.id) ? parsed : null;
  } catch {
    return null;
  }
}

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath } = options ?? {};
  const { isReachable: isOnline } = useServerReachability();
  const utils = trpc.useUtils();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 5 * 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });
  const cachedUser = useMemo(() => readOfflineUser(), [meQuery.data]);
  const offlineUser = useMemo(() => !isOnline ? cachedUser : null, [isOnline, cachedUser]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      throw error;
    } finally {
      const storedUser = meQuery.data ?? readOfflineUser();
      if (storedUser?.id) clearOfflineWorkspaceSnapshots(storedUser.id);
      window.localStorage.removeItem(USER_STORAGE_KEY);
      window.localStorage.removeItem("golden_prime_session_token");
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  useEffect(() => {
    if (meQuery.data) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(meQuery.data));
    } else if (meQuery.isFetched && meQuery.data === null && isOnline) {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [isOnline, meQuery.data, meQuery.isFetched]);

  const state = useMemo(() => {
    const user = meQuery.data ?? (meQuery.isLoading ? cachedUser : offlineUser);
    return {
      user,
      loading: (meQuery.isLoading && !user) || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(user),
    };
  }, [
    cachedUser,
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    offlineUser,
    logoutMutation.error,
    logoutMutation.isPending,
  ]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (redirectPath && window.location.pathname === redirectPath) return;

    window.location.href = redirectPath ?? "/login";
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
