import {
  useQuery,
  useQueries,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import {
  OKXService,
  type OKXCollectionParams,
} from "@/services/api/okx.service";
import { type OKXCollection, type OKXStats } from "@/types/okx";

export const okxKeys = {
  all: ["okx"] as const,
  collections: () => [...okxKeys.all, "collections"] as const,
  collection: (slug: string, chain?: string) =>
    [...okxKeys.collections(), slug, chain] as const,
  stats: (slug: string, chain?: string) =>
    [...okxKeys.all, "stats", slug, chain] as const,
  search: (query: string, chain?: string) =>
    [...okxKeys.all, "search", query, chain] as const,
};

export const useOKXCollection = (
  params: OKXCollectionParams,
  options?: Omit<
    UseQueryOptions<OKXCollection, ApiError>,
    "queryKey" | "queryFn"
  >
) => {
  const identifier = params.contractAddress ?? params.slug ?? "";
  return useQuery<OKXCollection, ApiError>({
    queryKey: okxKeys.collection(identifier, params.chain),
    queryFn: () => OKXService.getCollectionInfo(params),
    enabled: !!(params.contractAddress ?? params.slug),
    staleTime: 60 * 1000, 
    gcTime: 5 * 60 * 1000, 
    ...options,
  });
};

export const useOKXStats = (
  params: OKXCollectionParams,
  options?: Omit<UseQueryOptions<OKXStats, ApiError>, "queryKey" | "queryFn">
) => {
  const identifier = params.contractAddress ?? params.slug ?? "";
  return useQuery<OKXStats, ApiError>({
    queryKey: okxKeys.stats(identifier, params.chain),
    queryFn: () => OKXService.getCollectionStats(params),
    enabled: !!(params.contractAddress ?? params.slug),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useOKXCollections = (
  slugs: string[],
  chain?: string,
  options?: Omit<
    UseQueryOptions<OKXCollection, ApiError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: okxKeys.collection(slug, chain),
      queryFn: () => OKXService.getCollectionInfo({ slug, chain }),
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      ...options,
    })),
  });
};

export const useOKXCollectionWithStats = (params: OKXCollectionParams) => {
  const collectionQuery = useOKXCollection(params);
  const statsQuery = useOKXStats(params);

  return {
    collection: collectionQuery.data,
    stats: statsQuery.data,
    isLoading: collectionQuery.isLoading || statsQuery.isLoading,
    isError: collectionQuery.isError || statsQuery.isError,
    error: collectionQuery.error ?? statsQuery.error,
    refetch: () => {
      void collectionQuery.refetch();
      void statsQuery.refetch();
    },
  };
};

export const useOKXSearchCollections = (
  query: string,
  chain?: string,
  options?: Omit<
    UseQueryOptions<OKXCollection[], ApiError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<OKXCollection[], ApiError>({
    queryKey: okxKeys.search(query, chain),
    queryFn: () => OKXService.searchCollections(query, chain),
    enabled: !!query && query.length > 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useOKXMultipleCollections = (
  slugs: string[],
  chain?: string,
  options?: Omit<
    UseQueryOptions<OKXCollection[], ApiError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<OKXCollection[], ApiError>({
    queryKey: [...okxKeys.collections(), "multiple", slugs.join(","), chain],
    queryFn: () => OKXService.getMultipleCollections(slugs, chain),
    enabled: slugs.length > 0,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });
};
