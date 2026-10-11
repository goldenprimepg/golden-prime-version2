export const liveQueryOptions = {
  staleTime: 30_000,
  refetchOnMount: false,
  refetchInterval: 15_000,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: true,
} as const;
