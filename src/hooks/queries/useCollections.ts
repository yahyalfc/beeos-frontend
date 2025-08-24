import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import { CollectionsService } from "@/services/api/collections.service";
import { type PaginationParams } from "@/types/api";
import { type CollectionsArray } from "@/types/collections";

export const collectionKeys = {
  all: ["collections"] as const,
  lists: () => [...collectionKeys.all, "list"] as const,
  list: (params?: PaginationParams) =>
    [...collectionKeys.lists(), params] as const,
  details: () => [...collectionKeys.all, "detail"] as const,
  detail: (id: string) => [...collectionKeys.details(), id] as const,
};

export function useCollections(
  _: undefined,
  options?: Omit<
    UseQueryOptions<CollectionsArray, ApiError>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: collectionKeys.all,
    queryFn: () => CollectionsService.getCollections(),
    enabled: true,
    ...options,
  });
}
