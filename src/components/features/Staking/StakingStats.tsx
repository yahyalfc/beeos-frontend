"use client";

import { type FC } from "react";

import { Badge } from "@/components/shared/UI/Badge/Badge";
import { Skeleton } from "@/components/shared/UI/Skeleton/Skeleton";
import { type StakingStats as StakingStatsType } from "@/types/staking";

interface StakingStatsProps {
  readonly stats: StakingStatsType | null | undefined;
  readonly isLoading: boolean;
}

export const StakingStats: FC<StakingStatsProps> = ({ stats, isLoading }) => {
  if (isLoading || !stats) {
    return (
      <div className="flex justify-end items-center gap-3">
        {[...Array(4)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={i} className="w-[60px] h-[24px] rounded-none" />
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total NFTs:",
      value: stats.totalNFTs,
    },
    {
      title: "XP Per Day",
      value: `${stats.xpPerDay}`,
    },
    {
      title: "Total Rewards",
      value: stats.totalRewards.toLocaleString(),
    },
    {
      title: "Reward Multiplier",
      value: `${stats.multiplier}x`,
    },
  ];

  return (
    <>
      {/* Main Stats Grid */}
      <div className="flex justify-end items-center gap-3">
        {statCards.map((stat) => {
          return (
            <Badge key={stat.title} className="capitalize">
              <span className="text-regent">{stat.title}</span>&nbsp;
              {stat.value}
            </Badge>
          );
        })}
      </div>

      {/* Rarity Distribution */}
      {/* eslint-disable-next-line sonarjs/no-commented-code */}
      {/* {stats.rarityDistribution &&
        Object.keys(stats.rarityDistribution).length > 0 && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Rarity Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.rarityDistribution).map(
                ([rarity, count]) => (
                  <div key={rarity} className="text-center">
                    <div
                      className={`text-2xl font-bold mb-1 ${
                        rarity === "Mythic"
                          ? "text-purple-400"
                          : rarity === "Legendary"
                          ? "text-yellow-400"
                          : rarity === "Rare"
                          ? "text-blue-400"
                          : "text-gray-400"
                      }`}
                    >
                      {count}
                    </div>
                    <div className="text-sm text-gray-500">{rarity}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )} */}
      {/* Progress to Next Tier */}
      {/* eslint-disable-next-line sonarjs/no-commented-code */}
      {/* {stats.currentTier && stats.nextTier && (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Tier Progress
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {stats.currentTier} → {stats.nextTier}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">
                {stats.nextTierProgress ?? 0}%
              </p>
              <p className="text-xs text-gray-500">
                {stats.xpToNextTier?.toLocaleString() ?? 0} XP needed
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(stats.nextTierProgress ?? 0, 100)}%`,
              }}
            />
          </div>
        </div>
      )} */}
    </>);
};
