import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchShelterResults, fetchShelters } from "@/api/shelters/client";

const DEFAULT_STALE_TIME_MS = 15 * 60 * 1000;
const SHELTERS_STALE_TIME_MS = process.env.NEXT_PUBLIC_SHELTERS_STALE_TIME_MS;

export const QUERY_KEYS = {
  SHELTERS: ["shelters"],
  SHELTER_RESULTS: ["shelter-results"],
} as const;

const getSheltersStaleTime = () => {
  if (!SHELTERS_STALE_TIME_MS) {
    return DEFAULT_STALE_TIME_MS;
  }

  const parsedValue = Number(SHELTERS_STALE_TIME_MS);

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    return DEFAULT_STALE_TIME_MS;
  }

  return parsedValue;
};

export const sheltersQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.SHELTERS,
    queryFn: fetchShelters,
    staleTime: getSheltersStaleTime(),
  });

export const shelterResultsQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.SHELTER_RESULTS,
    queryFn: fetchShelterResults,
    staleTime: getSheltersStaleTime(),
  });

export const useSheltersQuery = () => useQuery(sheltersQueryOptions());

export const useShelterResultsQuery = () => useQuery(shelterResultsQueryOptions());
