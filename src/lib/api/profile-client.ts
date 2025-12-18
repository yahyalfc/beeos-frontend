/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import { USER_KEY } from "@/utils/constants";
const NEXT_PUBLIC_PROFILE_API_URL = "https://beeos-dev-api.lumoscodes.dev";
// process.env.NEXT_PUBLIC_PROFILE_API_URL ||
export class ProfileApiError extends Error {
  constructor(public status: number, public data: any, message: string) {
    super(message);
    this.name = "ProfileApiError";
  }
}

class ProfileApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${NEXT_PUBLIC_PROFILE_API_URL}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          throw new ProfileApiError(
            error.response.status,
            error.response.data,
            error.message
          );
        }
        throw error;
      }
    );
  }

  private getAuthToken(): string | null {
    const authToken = localStorage.getItem(USER_KEY);
    if (authToken) return authToken;
    return null;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const profileApiClient = new ProfileApiClient();
