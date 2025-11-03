"use client";

import { type FC } from "react";

import { useWallet } from "@/components/providers/Wallet.provider";
import { DeviderLine } from "@/components/shared/Interfaces/Lines/DeviderLine";
import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";
import { BadgeIcon } from "@/components/shared/UI/Icons/Badge.icon";
import { VerifiedIcon } from "@/components/shared/UI/Icons/Verified.icon";
import { shortenAddress } from "@/helpers/shortenAddress";
import { useProfileStats } from "@/hooks/queries/useProfile";

export const ProfileHero: FC = () => {
  const { walletAddress } = useWallet();
  const { data: stats, isLoading } = useProfileStats();

  return (
    <section className="relative block pt-12 pb-14">
      <div className="container">
        <div className="inner-container">
          <DeviderLine />
          <div className="mt-12 max-w-[1164px] mx-auto">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="relative w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center">
                <img
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
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
                <div className="flex items-center gap-2">
                  <BadgeIcon />
                  <span className="text-lg text-accent">BeeOS NFT Holder</span>
                </div>
              </div>

              <div className="relative px-12 py-8 min-w-[320px]">
                <ProfileXPInterface />
                <div className="relative z-[2] flex flex-col items-center gap-2">
                  <span className="text-lg text-slight">Airdrop Points</span>
                  <span className="title-huge text-accent">
                    {!isLoading && stats ? stats.points.toLocaleString() : "0"}
                  </span>
                  <span className="text-mini text-slight">
                    Bee Points (Total earned)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
