export const liveQueryOptions = {
  staleTime: 60_000,
  gcTime: 15 * 60_000,
  refetchOnMount: false,
  refetchInterval: false,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: false,
} as const;
