/* eslint-disable sonarjs/no-commented-code */
"use client";

import {
  type FC,
  //  useCallback
} from "react";

import { useCollectionSingleContext } from "@/components/providers/Collections.provider";
import { ProfilePrizeInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfilePrizeInterface";
import { ProfileRefInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileRefInterface";
import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";
// import { CopyIcon } from "@/components/shared/UI/Icons/Copy.icon";
import { OffIcon } from "@/components/shared/UI/Icons/Off.icon";
// import { copyToClipboard } from "@/helpers/copyToClipboard";
// import { useUser } from "@/hooks/queries/use-users";
// import { QUERIES } from "@/utils/constants";
// import { toast } from "sonner";

export const CollectionSingleProfileData: FC = ({}) => {
  // const { data: userData } = useUser();
  const { collectionProfile, isLoading } = useCollectionSingleContext();

  // const handleCopyRefCode = useCallback(async () => {
  //   if (userData && collectionProfile) {
  //     await copyToClipboard({
  //       value: `${window.location.href}?${QUERIES.REFERRAL_START}=${collectionProfile.referralCode}`,
  //       successMessage: "Your Referral Link copied into clipboard!",
  //     });
  //   } else {
  //     toast.error("Something went wrong! Try again later :(");
  //   }
  // }, [userData, collectionProfile]);

  return (
    <div className="mt-6 max-w-[1164px] mx-auto sm:grid flex flex-col sm:grid-cols-2 gap-4">
      <div className="flex pb-9 px-10 pt-10 flex-col justify-between relative">
        <ProfilePrizeInterface />
        <div className="relative z-[2] flex w-full items-center justify-between">
          <span className="text-lg text-white">Reward</span>
          <span className="text-lg text-white">NFT</span>
        </div>
        <div className=" relative z-[2] flex justify-center items-center">
          <span className="inline-block shrink-0">
            <OffIcon />
          </span>
        </div>
        <p className="relative z-[2] w-full title-huge text-center text-sky uppercase">
          Waiting for the draw
        </p>
      </div>
      <div className="grid grid-rows-2 grid-cols-1 gap-4">
        <div className="px-8 pt-8 pb-7 flex flex-col gap-[110px] justify-between relative">
          <ProfileXPInterface />
          <span className="relative z-[2] text-lg text-white">Balance</span>
          <span className="relative z-[2] text-accent title-huge">
            {!isLoading && collectionProfile
              ? Math.floor(collectionProfile.xp)
              : 0}
            XP
          </span>
        </div>
        <div className="px-8 pt-8 pb-7 flex flex-col gap-[110px] justify-between relative">
          <ProfileRefInterface />
          <div className="relative z-[2] flex items-center justify-between">
            <span className=" text-lg text-white">Referrals</span>
            {/* <span
              className="shrink-0 cursor-pointer"
              role="button"
              onClick={handleCopyRefCode}
            >
              <CopyIcon />
            </span> */}
          </div>

          <span className="relative z-[2] text-accent title-huge">
            {!isLoading && collectionProfile
              ? collectionProfile.referralCount
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};
