/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { okxApiClient } from "@/lib/api/okx-client";
import { 
  type OKXCollection, 
  type OKXStats,
  OKXCollectionSchema,
  OKXStatsSchema,
  type OKXApiResponse 
} from "@/types/okx";

export interface OKXCollectionParams {
  slug?: string;
  contractAddress?: string;
  chain?: string;
}

const COLLECTION_DETAIL_ENDPOINT = "/collection/detail";

export class OKXService {
  static async getCollectionInfo(params: OKXCollectionParams): Promise<OKXCollection> {
    try {
      const response = await okxApiClient.get<OKXApiResponse>(COLLECTION_DETAIL_ENDPOINT, {
        params: {
          slug: params.slug ?? params.contractAddress,
          chain: params.chain ?? "eth",
        },
      });

      if (!response.data || response.data.length === 0) {
        throw new Error(`Collection not found: ${params.slug ?? params.contractAddress}`);
      }

      const validated = OKXCollectionSchema.parse(response.data[0]);
      return validated;
    } catch (error) {
      console.error("Error fetching OKX collection:", error);
      throw error;
    }
  }

  static async getCollectionStats(params: OKXCollectionParams): Promise<OKXStats> {
    try {
      const response = await okxApiClient.get<OKXApiResponse>(COLLECTION_DETAIL_ENDPOINT, {
        params: {
          slug: params.slug ?? params.contractAddress,
          chain: params.chain ?? "eth",
        },
      });

      if (!response.data || response.data.length === 0) {
        throw new Error(`Stats not found for: ${params.slug ?? params.contractAddress}`);
      }

      const validated = OKXStatsSchema.parse(response.data[0]);
      return validated;
    } catch (error) {
      console.error("Error fetching OKX stats:", error);
      throw error;
    }
  }

  static async getMultipleCollections(slugs: string[], chain?: string): Promise<OKXCollection[]> {
    try {
      const promises = slugs.map(slug => 
        this.getCollectionInfo({ slug, chain })
      );
      return await Promise.all(promises);
    } catch (error) {
      console.error("Error fetching multiple collections:", error);
      throw error;
    }
  }

  static async searchCollections(query: string, chain?: string): Promise<OKXCollection[]> {
    try {
      const response = await okxApiClient.get<OKXApiResponse>(COLLECTION_DETAIL_ENDPOINT, {
        params: {
          slug: query,
          chain: chain ?? "eth",
        },
      });

      if (!response.data) {
        return [];
      }

      return response.data.map(item => OKXCollectionSchema.parse(item));
    } catch (error) {
      console.error("Error searching OKX collections:", error);
      return [];
    }
  }
}
