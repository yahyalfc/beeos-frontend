/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { ApiError } from "@/lib/api/client";

class OKXWeb3ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    const baseURL = "https://web3.okx.com/api/v5/mktplace/nft";

    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "OK-ACCESS-KEY": process.env.NEXT_PUBLIC_OKX_ACCESS_KEY ?? "",
      },
      timeout: 30000
    });

    this.client.interceptors.response.use(
      (response) => {
        if (response.data?.code !== "0") {
          throw new ApiError(
            400,
            response.data,
            response.data?.msg ?? "OKX Web3 API Error"
          );
        }
        return response;
      },
      (error) => {
        if (error.response) {
          throw new ApiError(
            error.response.status,
            error.response.data,
            error.message
          );
        }
        throw error;
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
}

export const okxApiClient = new OKXWeb3ApiClient();
