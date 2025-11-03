/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable sonarjs/no-commented-code */
"use client";

// import { useEffect } from "react";

import {
  notFound,
  //  useRouter
} from "next/navigation";

// import { ProfileAchievements } from "@/components/features/Profile/ProfileAchievements";
// import { ProfileActivities } from "@/components/features/Profile/ProfileActivities";
// import { ProfileHero } from "@/components/features/Profile/ProfileHero";
// import { ProfileStats } from "@/components/features/Profile/ProfileStats";
// import { useWallet } from "@/components/providers/Wallet.provider";
// import { useCreateWallet } from "@/hooks/mutations/useProfileMutations";
// import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function ProfilePage() {
  // const router = useRouter();
  // const { isConnected, walletAddress } = useWallet();
  // const { mutate: createWallet } = useCreateWallet();

  // useScrollToTop();

  // useEffect(() => {
  //   if (!isConnected || !walletAddress) {
  //     router.push("/");
  //     return;
  //   }

  //   createWallet(walletAddress);
  // }, [isConnected, walletAddress, router, createWallet]);

  // if (!isConnected || !walletAddress) {
  //   return null;
  // }

  notFound();

  return (
    <>
      {/* <ProfileHero />
      <ProfileStats />
      <div className="container">
        <div className="inner-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12">
            <ProfileActivities />
            <ProfileAchievements />
          </div>
        </div>
      </div> */}
    </>
  );
}
