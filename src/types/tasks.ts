import { z } from "zod";

export const TaskSchema = z.object({
  id: z.uuid(),
  link: z.url(),
  reward: z.number().int().positive(),
  icon: z.string(),
  taskName: z.string(),
  stars: z.number().int().min(0).max(5),
  finished: z.boolean().default(false),
});

export const CompletedTaskSchema = z.object({
  id: z.uuid(),
  completedAt: z.string().pipe(z.iso.datetime()),
  task: TaskSchema,
});

export const TasksArraySchema = z.array(TaskSchema);
export const CompletedTasksArraySchema = z.array(CompletedTaskSchema);

export const TaskCompleteResponseSchema = z.object({
  ok: z.boolean(),
});

// If you want to infer the TypeScript type from the schema:
export type Task = z.infer<typeof TaskSchema>;
export type CompletedTask = z.infer<typeof CompletedTaskSchema>;
export type TasksArray = z.infer<typeof TasksArraySchema>;
export type TaskCompleteResponse = z.infer<typeof TaskCompleteResponseSchema>;
