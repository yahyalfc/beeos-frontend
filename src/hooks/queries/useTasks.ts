import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import { TasksService } from "@/services/api/tasks.service";
import { type PaginationParams } from "@/types/api";
import { type TasksArray } from "@/types/tasks";

export const tasksKeys = {
  all: ["tasks"] as const,
  lists: () => [...tasksKeys.all, "list"] as const,
  list: (params?: PaginationParams) => [...tasksKeys.lists(), params] as const,
  details: () => [...tasksKeys.all, "detail"] as const,
  detail: (id: string) => [...tasksKeys.details(), id] as const,
};

export function useTasks(
  collectionId: string,
  options?: Omit<UseQueryOptions<TasksArray, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: tasksKeys.details(),
    queryFn: () => TasksService.getTasks(collectionId),
    enabled: true,
    ...options,
  });
}
