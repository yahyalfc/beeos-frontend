/* eslint-disable sonarjs/no-commented-code */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, type FC } from "react";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";
import { Badge } from "@/components/shared/UI/Badge/Badge";
import { VerifiedIcon } from "@/components/shared/UI/Icons/Verified.icon";
import { shortenAddress } from "@/helpers/shortenAddress";
import { useProfileStats } from "@/hooks/queries/useProfile";

import { formatPointCount } from "./utils";

export const ProfileHero: FC = () => {
  const { walletAddress } = useWallet();
  const { data: stats, isLoading } = useProfileStats();

  const [isHolder] = useState(true);

  return (
    <section className="relative block  pb-14">
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
          {isHolder ? (
            <Badge variant="accent">
              <span className="text-base text-accent">BeeOS NFT Holder</span>
            </Badge>
          ) : (
            <Badge variant="default">
              <span className="text-base text-white/60">No BeeOS NFT detected</span>
            </Badge>
          )}
        </div>

        <div className="relative px-10 py-7 max-w-[320px] w-full shrink-0">
          <ProfileXPInterface />
          <div className="relative z-[2] flex flex-col items-center gap-2.5">
            <span className="text-lg text-slight">Airdrop Points</span>
            <span
              className="title-huge text-accent"
              title={stats ? String(stats.points) : "0"}
            >
              {!isLoading && stats ? formatPointCount(stats.points) : "0"}
              {/* {formatPointCount( stats?.points ?? 1200)} */}
            </span>
            <span className="text-mini text-slight">
              Bee Points (Total earned)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
