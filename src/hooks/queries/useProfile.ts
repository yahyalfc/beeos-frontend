import { useQuery } from "@tanstack/react-query";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ProfileService } from "@/services/api/profile.service";

// Dummy data for development
const dummyAchievements = [
  {
    id: "1",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "First Stake",
    description: "Complete your first stake in BeeOS",
    current: 1,
    target: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Community Member",
    description: "Join our community and participate in discussions",
    current: 5,
    target: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Mint Master",
    description: "Mint 5 NFTs on our platform",
    current: 3,
    target: 5,
    createdAt: new Date().toISOString(),
  },
];

const dummyActivities = [
  {
    id: "1",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Staked Tokens",
    points: 50,
    txHash: "0xabcdef1234567890",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Minted NFT",
    points: 25,
    txHash: "0xabcdef1234567891",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Joined Community",
    points: 10,
    txHash: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    wallet: "0x1234567890123456789012345678901234567890",
    title: "Completed Task",
    points: 15,
    txHash: undefined,
    createdAt: new Date().toISOString(),
  },
];

export const useProfileStats = () => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "stats", walletAddress],
    queryFn: () => ProfileService.getWalletStats(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30000,
  });
};

// For development purposes, we can override the API data with dummy data
const USE_DUMMY_DATA = true; // Set this to false to use real API data

export const useProfileActivities = (page = 0, size = 5) => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "activities", walletAddress, page, size],
    queryFn: () => {
      if (USE_DUMMY_DATA) {
        // Return a slice of dummy activities based on pagination
        const startIndex = page * size;
        return Promise.resolve(
          dummyActivities.slice(startIndex, startIndex + size)
        );
      }
      return ProfileService.getWalletActivities(walletAddress!, page, size);
    },
    enabled: USE_DUMMY_DATA || !!walletAddress,
    staleTime: 30000,
  });
};

export const useProfileAchievements = () => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "achievements", walletAddress],
    queryFn: () => {
      if (USE_DUMMY_DATA) {
        return Promise.resolve(dummyAchievements);
      }
      return ProfileService.getWalletAchievements(walletAddress!);
    },
    enabled: USE_DUMMY_DATA || !!walletAddress,
    staleTime: 30000,
  });
};