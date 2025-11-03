import { useQuery } from "@tanstack/react-query";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ProfileService } from "@/services/api/profile.service";

export const useProfileStats = () => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "stats", walletAddress],
    queryFn: () => ProfileService.getWalletStats(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30000,
  });
};

export const useProfileActivities = (page = 0, size = 5) => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "activities", walletAddress, page, size],
    queryFn: () =>
      ProfileService.getWalletActivities(walletAddress!, page, size),
    enabled: !!walletAddress,
    staleTime: 30000,
  });
};

export const useProfileAchievements = () => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: ["profile", "achievements", walletAddress],
    queryFn: () => ProfileService.getWalletAchievements(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30000,
  });
};
