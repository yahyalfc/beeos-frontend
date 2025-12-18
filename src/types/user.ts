import { z } from "zod";

import { CollectionSchema } from "./collections";
import { CompletedTasksArraySchema, TasksArraySchema } from "./tasks";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email().nullable(),
  walletAddress: z.string(),
  maxBalanceBlockchain: z.number().nullable(),
  balance: z.string(),
  referralCount: z.number(),
  createdAt: z.string().pipe(z.iso.datetime()),
  updatedAt: z.string().pipe(z.iso.datetime()),
});

export const UserProjectSchema = z.object({
  id: z.uuid(),

  xp: z.string().transform(Number),
  referralCount: z.number(),
  user: UserSchema,
  project: CollectionSchema,
  createdAt: z.string().pipe(z.iso.datetime()),
  updatedAt: z.string().pipe(z.iso.datetime()),
});

export const UserInitializeProjectBodySchema = z.object({
  collectionId: z.string(),
  refCode: z.string().nullable(),
});

export const UserParticipProjects = z.object({
  id: z.uuid(),
  xp: z.string().transform(Number),
  referralCount: z.number(),
  project: CollectionSchema.extend({
    tasks: TasksArraySchema,
  }),
  completedTasks: CompletedTasksArraySchema,
  createdAt: z.string().pipe(z.iso.datetime()),
  updatedAt: z.string().pipe(z.iso.datetime()),
});

export const UserParticipProjectsArraySchema = z.array(UserParticipProjects);

export const InitializationUserResponse = z.object({
  user: UserSchema,
  token: z.string(),
});

export const GenerateSignUserResponse = z.object({
  message: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserInitializationResponse = z.infer<
  typeof InitializationUserResponse
>;
export type UserGenerateSignResponse = z.infer<typeof GenerateSignUserResponse>;
export type UserProject = z.infer<typeof UserProjectSchema>;
export type UserParticipProject = z.infer<typeof UserParticipProjects>;
export type UserParticipProjectsArray = z.infer<
  typeof UserParticipProjectsArraySchema
>;
export type UserInitializeProjectBody = z.infer<
  typeof UserInitializeProjectBodySchema
>;

export const CreateUserSchema = z.object({
  walletAddress: z.string(),
  signature: z.string(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export interface ActivateCodeRequest {
  code: string;
}

export interface ActivateCodeResponse {
  success: boolean;
  message?: string;
}
