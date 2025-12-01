import { apiClient } from "@/lib/api/client";
import { type Task, type TasksArray, TasksArraySchema, TaskSchema } from "@/types/tasks";

export class TasksService {
  static async getTasks(collectionId: string): Promise<TasksArray> {
    const response = await apiClient.get<TasksArray>(`/tasks/${collectionId}`);
    return TasksArraySchema.parse(response);
  }

   static async finishTask(taskId: string): Promise<Task> {
    const response = await apiClient.post<Task>(`/tasks/${taskId}/complete`, {});
    return TaskSchema.parse(response);
  }
}
