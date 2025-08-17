import { apiClient } from "@/lib/api/client";
import { type CollectionsArray } from "@/types/collections";

export class CollectionsService {
  static async getCollections(): Promise<CollectionsArray> {
    try {
      const response = await apiClient.get<CollectionsArray>(`/projects`);
      return response;
    } catch (error) {
      console.error("Error fetching collections:", error);
      throw error;
    }
  }
}
