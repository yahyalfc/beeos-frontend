import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

import { type ApiError } from "@/lib/api/client";
import { UsersService } from "@/services/api/users.service";
import { type CheckUserStatusRes } from "@/types/collections";
import {
  type User,
  type CreateUserInput,
  type UpdateUserInput,
  type UserInitializationResponse,
  type UserGenerateSignResponse,
  type UserProject,
  type UserInitializeProjectBody,
} from "@/types/user";
import { type WALLET_STATUSES } from "@/utils/constants";

import { userKeys } from "../queries/use-users";


// Type for mutation context
interface MutationContext {
  previousData?: unknown;
}

export function useInitializeUser(
  options?: UseMutationOptions<
    UserInitializationResponse,
    ApiError,
    CreateUserInput,
    MutationContext
  >
): UseMutationResult<UserInitializationResponse, ApiError, CreateUserInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => UsersService.initializeUser(data),
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(data.user.id),
      });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to initialize user:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}

export function useInitializeCollectionUser(
  options?: UseMutationOptions<
    UserProject,
    ApiError,
    UserInitializeProjectBody,
    MutationContext
  >
): UseMutationResult<UserProject, ApiError, UserInitializeProjectBody> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserInitializeProjectBody) =>
      UsersService.initializeCollectionUser(data),
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries({
        queryKey: userKeys.detail(data.user.id),
      });
      void queryClient.invalidateQueries({
        queryKey: userKeys.collection(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to initialize user:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}

export function useCheckUserStatus(
  options?: UseMutationOptions<
    WALLET_STATUSES,
    ApiError,
    CheckUserStatusRes,
    MutationContext
  >
): UseMutationResult<WALLET_STATUSES, ApiError, CheckUserStatusRes> {
  return useMutation({
    mutationFn: (reqData: CheckUserStatusRes) =>
      UsersService.checkUserStatus(reqData),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to check user status:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}

// Enhanced generate sign mutation with helper methods
export function useGenerateSignUser(
  options?: UseMutationOptions<
    UserGenerateSignResponse,
    ApiError,
    string,
    MutationContext
  >
) {
  const mutation = useMutation({
    mutationFn: (address: string) => UsersService.generateSignUser(address),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error("Failed to generate signature:", error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });

  // Add helper method for common use case
  const generateAndSign = async (
    address: string
  ): Promise<UserGenerateSignResponse> => {
    return mutation.mutateAsync(address);
  };

  return {
    ...mutation,
    generateAndSign,
  };
}

// Enhanced update mutation with optimistic updates
export function useUpdateUser(
  id: string,
  options?: UseMutationOptions<User, ApiError, UpdateUserInput>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserInput) => UsersService.updateUser(id, data),
    onSuccess: (data, variables, context) => {
      // Update with server response
      queryClient.setQueryData(userKeys.detail(id), data);
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // Ensure data is fresh
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      options?.onSettled?.(data, error, variables, context);
    },
    ...options,
  });
}
