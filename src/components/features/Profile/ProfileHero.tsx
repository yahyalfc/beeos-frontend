/* eslint-disable sonarjs/no-commented-code */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, type FC } from "react";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";
import { Badge } from "@/components/shared/UI/Badge/Badge";
import { VerifiedIcon } from "@/components/shared/UI/Icons/Verified.icon";
import { shortenAddress } from "@/helpers/shortenAddress";
import {
  useProfileActivities,
  useProfileStats,
} from "@/hooks/queries/useProfile";
import { useActivateCode } from "@/hooks/mutations/useProfileMutations";
import { useReadContract } from "wagmi";
import beeOsContractAbi from "@/utils/abi/beeos_contract.abi.json";

import { formatPointCount } from "./utils";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { MODALS_QUERIES } from "@/components/shared/Modals/constants";
import Activatecodemodal from "@/components/shared/Modals/ActivatePromoModal";

export const ProfileHero: FC = () => {
  const { walletAddress } = useWallet();
  const { data: stats, isLoading: statsLoading } = useProfileStats();
  const { data: activities } = useProfileActivities();
  const activateCodeMutation = useActivateCode();

  console.log({ stats });
  console.log({ activities });

  const [isHolder, setIsHolder] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const { setParams } = useSearchQuery();

  // Read balanceOf from contract on mount
  const { data: balance, isLoading: balanceLoading } = useReadContract({
    address: "0x5088f6c95ee2e668907f153f709144ffc92d3abb" as `0x${string}`,
    abi: beeOsContractAbi,
    functionName: "balanceOf",
    args: [walletAddress as `0x${string}`],
    query: {
      enabled: !!walletAddress, // Only run when walletAddress is available
    },
  });

  /* Check if the owner has beeos nft */
  useEffect(() => {
    if (balance !== undefined && balance !== null) {
      // If balance is greater than 0, set isHolder to true
      if (Number(balance) > 0) {
        setIsHolder(true);
      }
    }
  }, [balance]);

  /* Check for points of owner */
  useEffect(() => {
    let total = 0;

    // Add stats points if available
    if (stats && !statsLoading) {
      total += stats.points;
    }

    // Add activity points if available
    if (activities && Array.isArray(activities)) {
      total += activities.reduce(
        (sum, activity) => sum + (activity.points || 0),
        0
      );
    }

    setTotalPoints(total);
  }, [stats, statsLoading, activities]);

  /* Handle activation code */
  const handleOpenPromoCodeModal = () => {
    setParams(MODALS_QUERIES.ACTIVATE_CODE_MODAL, "true");
  };
  const handleActivateCode = (code: string) => {
    activateCodeMutation.mutate(code);
  };
  return (
    <>
      <section className="relative block  pb-14 profile-hero-section">
        <ProfileXPInterface />
        <div className="flex flex-row items-center justify-space-between  hero-content">
          <div className="relative w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center imgprofile_hero">
            <img
              alt="Profile"
              className="w-24 h-24 rounded-full img_main"
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}`}
            />
            <div className="absolute -bottom-2 -right-2">
              <VerifiedIcon />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h1 className="title-md text-center">
              {walletAddress ? shortenAddress(walletAddress) : ""}
            </h1>
            {isHolder ? (
              <Badge variant="accent">
                <span className="text-base text-accent">BeeOS NFT Holder</span>
              </Badge>
            ) : (
              <Badge variant="default">
                <span className="text-base text-white/60">
                  No BeeOS NFT detected
                </span>
              </Badge>
            )}
          </div>

          <div className="relative px-10 py-7  result-div">
            {/* <ProfileXPInterface /> */}
            <div className="flex justify-center w-full  left_hero_stats">
              <div className="relative z-[2] flex flex-col items-center gap-2.5">
                <span className="text-lg text-slight">Bee Points</span>
                <span
                  className="title-huge text-accent"
                  title={String(totalPoints)}
                >
                  {formatPointCount(totalPoints)}
                  {/* {formatPointCount( stats?.points ?? 1200)} */}
                </span>
                <span className="text-mini text-slight">
                  Bee Points (Total earned)
                </span>
                {/* <span className="text-mini text-slight">
            Bee Points (Total earned)
          </span> */}
              </div>
              <button
                onClick={handleOpenPromoCodeModal}
                className=" text-lg font-medium !text-[13px] text-white button_insert_code"
              >
                <img src="\button_bg.png" alt="" />
                Insert code
              </button>
            </div>
          </div>
        </div>
        <Activatecodemodal handleActivateCode={handleActivateCode} />
      </section>
    </>
  );
};
