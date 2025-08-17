/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { type FC } from "react";

import { weiToEth } from "@/helpers/ethCalculations";

import { MintCardPlateInterface } from "../Interfaces/VectorInterfaces/MintCardPlateInterface";
import { DefaultButton } from "../UI/Button/DefaultButton";

interface MinterCardsHugeProps {
  totalSupply: number;
  isMinted?: boolean;
  isEnded?: boolean;
  isUpcoming?: boolean;
  currentlyMinted: number;
  price?: string;
  actionName: string;
  onAction?: () => void;
}

export const MinterCardsHuge: FC<MinterCardsHugeProps> = ({
  price = 0,
  isMinted = false,
  isEnded = false,
  isUpcoming = false,
  currentlyMinted,
  totalSupply,
  actionName,
  onAction,
}) => {
  const progress = isEnded
    ? 100
    : Math.floor((currentlyMinted / totalSupply) * 1000) / 10;

  const isPriceZero = price === "0";

  return (
    <div className="block relative p-5">
      <MintCardPlateInterface />

      <div className="relative z-[2] w-full mb-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-default text-sm text-regent">Total minted</h2>
          <span className="text-white text-default text-sm">
            {progress}%&nbsp;
            <span className="text-regent">
              {isEnded
                ? `${currentlyMinted}/${totalSupply}`
                : isUpcoming
                ? `0/${totalSupply}`
                : `${totalSupply}/${totalSupply}`}
            </span>
          </span>
        </div>
        <div className="w-full h-2 bg-loader-bg mt-2 shrink-0 flex-1 relative">
          <div
            className="absolute top-0 left-0 bottom-0 bg-accent"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      <div className="flex relative z-[2] flex-col gap-1 mb-8">
        <span className="text-md softblue">Price</span>
        <span className="inline-flex items-end gap-2">
          <span className="text-accent-muted title-mini font-semibold">
            {isPriceZero ? "Free" : weiToEth(price)}
          </span>
          <span className="text-sm sm:text-lg text-regent !capitalize font-semibold">
            {isPriceZero ? "(just pay gas)" : "ETH"}
          </span>
        </span>
      </div>
      {isEnded ? (
        <DefaultButton
          className="w-full"
          disabled={!onAction}
          size="wide"
          variant={isMinted ? "bright" : "accent"}
          onClick={() => {
            window.open(
              "https://opensea.io/collection/hyperboard-vip",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          Explore Collection
        </DefaultButton>
      ) : (
        <DefaultButton
          className="w-full"
          disabled={!onAction}
          size="wide"
          variant={isMinted ? "bright" : "accent"}
          onClick={onAction}
        >
          {isMinted ? "MINTED" : actionName}
        </DefaultButton>
      )}
    </div>
  );
};
