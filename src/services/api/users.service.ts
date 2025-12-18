import { apiClient } from "@/lib/api/client";
import { type CheckUserStatusRes } from "@/types/collections";
import {
  type User,
  type CreateUserInput,
  type UpdateUserInput,
  UserSchema,
  type UserInitializationResponse,
  InitializationUserResponse,
  type UserGenerateSignResponse,
  GenerateSignUserResponse,
  type UserProject,
  UserProjectSchema,
  type UserInitializeProjectBody,
  type UserParticipProjectsArray,
  UserParticipProjectsArraySchema,
  ActivateCodeRequest,
  ActivateCodeResponse,
} from "@/types/user";
import { type WALLET_STATUSES } from "@/utils/constants";

export class UsersService {
  static async getUser(): Promise<User> {
    const response = await apiClient.get<User>(`/users`);
    return UserSchema.parse(response);
  }

  static async initializeUser(
    data: CreateUserInput
  ): Promise<UserInitializationResponse> {
    const response = await apiClient.post<UserInitializationResponse>(
      "/users/initialize",
      data
    );
    return InitializationUserResponse.parse(response);
  }

  static async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return UserSchema.parse(response);
  }

  static async initializeCollectionUser(
    data: UserInitializeProjectBody
  ): Promise<UserProject> {
    const response = await apiClient.post<UserProject>(
      `/users/initial-project/${data.collectionId}`,
      data.refCode
        ? {
            refCode: data.refCode,
          }
        : {}
    );
    return UserProjectSchema.parse(response);
  }

  static async projectsUser(): Promise<UserParticipProjectsArray> {
    const response = await apiClient.get<UserParticipProjectsArray>(
      `/users/projects`
    );
    return UserParticipProjectsArraySchema.parse(response);
  }

  static async checkUserStatus(
    reqData: CheckUserStatusRes
  ): Promise<WALLET_STATUSES> {
    const response = await apiClient.get<WALLET_STATUSES>(
      `/whitelist/check/${reqData.projectId}${
        reqData.walletAddress ? `/${reqData.walletAddress}` : ""
      }`
    );
    return response;
  }

  static async generateSignUser(
    address: string
  ): Promise<UserGenerateSignResponse> {
    const response = await apiClient.get<UserGenerateSignResponse>(
      `/users/generate-signature-message/${address}`
    );
    return GenerateSignUserResponse.parse(response);
  }

  static async activateCode(
    wallet: string,
    code: string
  ): Promise<ActivateCodeResponse> {
    const data: ActivateCodeRequest = { code };
    return apiClient.post<ActivateCodeResponse>(
      `/users/${wallet}/claimPromoCode`,
      data
    );
  }
}
