import { profileApiClient } from "@/lib/api/profile-client";
import {
  type ProfileUser,
  type ProfileActivity,
  type ProfileAchievement,
  type CreateWalletRequest,
  type CreateActivityRequest,
} from "@/types/profile";

export class ProfileService {
  static async createWallet(wallet: string): Promise<void> {
    const data: CreateWalletRequest = { wallet };
    await profileApiClient.post("/wallets", data);
  }

  static async getWalletStats(wallet: string): Promise<ProfileUser> {
    return profileApiClient.get<ProfileUser>(`/wallets/${wallet}/stats`);
  }

  static async getWalletActivities(
    wallet: string,
    page = 0,
    size = 5
  ): Promise<ProfileActivity[]> {
    return profileApiClient.get<ProfileActivity[]>(
      `/wallets/${wallet}/activities?page=${page}&size=${size}`
    );
  }

  static async createActivity(
    wallet: string,
    title: string,
    points: number
  ): Promise<void> {
    const data: CreateActivityRequest = { title, points };
    await profileApiClient.post(`/wallets/${wallet}/activities`, data);
  }

  static async getWalletAchievements(
    wallet: string
  ): Promise<ProfileAchievement[]> {
    return profileApiClient.get<ProfileAchievement[]>(
      `/wallets/${wallet}/achievements`
    );
  }
}
