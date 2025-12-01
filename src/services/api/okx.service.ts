import { 
  type OKXCollection, 
  type OKXStats,
  OKXCollectionSchema,
  OKXStatsSchema
} from "@/types/okx";

export interface OKXCollectionParams {
  slug?: string;
  contractAddress?: string;
  chain?: string;
}

export class OKXService {
  static async getCollectionInfo(params: OKXCollectionParams): Promise<OKXCollection> {
    try {
      const searchParams = new URLSearchParams({
        slug: params.slug ?? params.contractAddress ?? "",
        ...(params.chain && { chain: params.chain }),
      });

      const response = await fetch(`/api/okx/collection?${searchParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error ?? `HTTP ${response.status}`);
      }

      const data = await response.json();
      const validated = OKXCollectionSchema.parse(data);
      return validated;
    } catch (error) {
      console.error("Error fetching OKX collection:", error);
      throw error;
    }
  }

  static async getCollectionStats(params: OKXCollectionParams): Promise<OKXStats> {
    try {
      const searchParams = new URLSearchParams({
        slug: params.slug ?? params.contractAddress ?? "",
        ...(params.chain && { chain: params.chain }),
      });

      const response = await fetch(`/api/okx/stats?${searchParams.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error ?? `HTTP ${response.status}`);
      }

      const data = await response.json();
      const validated = OKXStatsSchema.parse(data);
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
      const collections = await this.getMultipleCollections([query], chain);
      return collections.filter(Boolean);
    } catch (error) {
      console.error("Error searching OKX collections:", error);
      return [];
    }
  }
}
