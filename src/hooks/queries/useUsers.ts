import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import { UsersService } from "@/services/api/users.service";
import { type PaginationParams } from "@/types/api";
import { type User, type UserParticipProjectsArray } from "@/types/user";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params?: PaginationParams) => [...userKeys.lists(), params] as const,
  collection: () => [...userKeys.all, "collection"] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUser(
  options?: Omit<UseQueryOptions<User, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: userKeys.details(),
    queryFn: () => UsersService.getUser(),
    enabled: true,
    ...options,
  });
}

export function useCollectionsUser(
  options?: Omit<UseQueryOptions<UserParticipProjectsArray, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: userKeys.collection(),
    queryFn: () => UsersService.projectsUser(),
    enabled: true,
    ...options,
  });
}