import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ProfileService } from "@/services/api/profile.service";
import { UsersService } from "@/services/api/users.service";

export const useCreateWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wallet: string) => ProfileService.createWallet(wallet),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Failed to create wallet:", error);
    },
  });
};

export const useActivateCode = () => {
  const queryClient = useQueryClient();
  const { walletAddress } = useWallet();

  return useMutation({
    mutationFn: (code: string) => {
      if (!walletAddress) throw new Error("No wallet connected");
      return UsersService.activateCode(walletAddress, code);
    },
    onSuccess: () => {
      toast.success("Code activated successfully!");
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error("Failed to activate code");
      console.error("Failed to activate code:", error);
    },
  });
};
