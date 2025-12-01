/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from "react";

import Image from "next/image";

import {
  type IArenaNFTResult,
  type IBeeOsResult,
  NFT_RARITY,
} from "@/hooks/staking/useBeeOsStakingOld";
import { cn } from "@/lib/utils";

interface NFTCardProps {
  item: IBeeOsResult | IArenaNFTResult;
  selected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  locked?: boolean;
}

const NFTCardOld: React.FC<NFTCardProps> = ({
  item,
  selected,
  onSelect,
  disabled,
  locked,
}) => {
  const isLockedItem = "payload" in item;
  const id = isLockedItem ? item.payload?.tokenId : item.id;
  const imageUrl = isLockedItem ? item.payload?.logo : item.image_url;
  const name = isLockedItem ? item.payload?.name : `BeeOS #${item.id}`;

  const rarity = isLockedItem
    ? item.traits?.[0]?.value
    : item.arenaData?.traits?.[0]?.value ?? NFT_RARITY.COMMON;

  const getRarityColor = (rarity: NFT_RARITY) => {
    switch (rarity) {
      case NFT_RARITY.MYTHIC:
        return "border-purple-500";
      case NFT_RARITY.LEGENDARY:
        return "border-yellow-500 ";
      case NFT_RARITY.RARE:
        return "border-blue-500 ";
      default:
        return "border-gray-600";
    }
  };

  const getRarityTextColor = (rarity: NFT_RARITY) => {
    switch (rarity) {
      case NFT_RARITY.MYTHIC:
        return "text-purple-400";
      case NFT_RARITY.LEGENDARY:
        return "text-yellow-400";
      case NFT_RARITY.RARE:
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onSelect(id);
    }
  };

  const canUnlock = isLockedItem && item.canUnlock;
  const unlockTime = isLockedItem && item.unlockTime;

  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-xl border-2 p-2 transition-all duration-200",
        getRarityColor(rarity),
        selected && "ring-2 ring-accent ring-offset-2 ring-offset-black",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "hover:scale-105"
      )}
      onClick={handleClick}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-accent flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              fillRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Lock indicator for staked NFTs */}
      {locked && !canUnlock && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-red-800/80 rounded-full p-1">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      )}

      {/* Ready to unlock indicator */}
      {locked && canUnlock && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-accent rounded-full p-1">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      )}

      {/* NFT Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-900">
        {imageUrl ? (
          <Image
            fill
            alt={name}
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-800">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="mt-3 p-1">
        <div className="flex justify-between items-start">
          <p className="text-white text-lg block font-medium truncate mb-1">
            {name}
          </p>
          <p
            className={cn(
              "text-white text-base block font-medium mb-1",
              getRarityTextColor(rarity)
            )}
          >
            {rarity}
          </p>
        </div>

        {locked && unlockTime ? (
          <p className="text-xs text-gray-400">
            Locked until{" "}
            {new Date(Number(`${unlockTime}000`)).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default NFTCardOld;
