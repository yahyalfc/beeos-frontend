/* eslint-disable sonarjs/no-commented-code */
"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { ProfileAchievements } from "@/components/features/Profile/ProfileAchievements";
import { ProfileActivities } from "@/components/features/Profile/ProfileActivities";
import { ProfileHero } from "@/components/features/Profile/ProfileHero";
import { ProfileStats } from "@/components/features/Profile/ProfileStats";
import { useWallet } from "@/components/providers/Wallet.provider";
import { useCreateWallet } from "@/hooks/mutations/useProfileMutations";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function ProfilePage() {
  const router = useRouter();
  const { isConnected, walletAddress } = useWallet();
  const { mutate: createWallet } = useCreateWallet();

  useScrollToTop();

  useEffect(() => {
    // if (!isConnected || !walletAddress) {
    //   router.push("/");
    //   return;
    // }
    // createWallet(walletAddress);
  }, [isConnected, walletAddress, router, createWallet]);

  if (!isConnected || !walletAddress) {
    return null;
  }

  return (
    <div className="container">
      <div className="inner-container pt-[120px]">
        <div className="md:grid md:grid-cols-[1fr] gap-6">
          <ProfileHero />
        </div>

        <ProfileStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
          <ProfileAchievements />
          <ProfileActivities />
        </div>
      </div>
    </div>
  );
}
