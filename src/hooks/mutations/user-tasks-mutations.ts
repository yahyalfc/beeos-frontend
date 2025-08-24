import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import { TasksService } from "@/services/api/tasks.service";
import { type Task } from "@/types/tasks";

import { tasksKeys } from "../queries/useTasks";
import { userKeys } from "../queries/useUsers";

// Type for mutation context
interface MutationContext {
  previousData?: unknown;
}

export function useCompleteTask(
  options?: UseMutationOptions<Task, ApiError, string, MutationContext>
): UseMutationResult<Task, ApiError, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => TasksService.finishTask(taskId),
    onSuccess: (data, variables, context) => {
      setTimeout(() => {
        void queryClient.invalidateQueries({ queryKey: tasksKeys.details() });
        void queryClient.invalidateQueries({ queryKey: userKeys.details() });
        void queryClient.invalidateQueries({ queryKey: userKeys.collection() });
      }, 2500);

      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to initialize user:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}
