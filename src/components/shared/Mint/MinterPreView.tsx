"use client";

import { type FC } from "react";

import { type Collection } from "@/types/collections";

import { MinterCardsHuge } from "./MinterCardsHuge";
import { MinterDescription } from "./MinterDescription";
import { MinterHeading } from "./MinterHeading";
import { DefaultButton } from "../UI/Button/DefaultButton";

interface MinterPreViewProps {
  currentlyMinted: number;
  collectionData: Collection;
  onCheckStatus: () => void;
}

export const MinterPreView: FC<MinterPreViewProps> = ({
  collectionData,
  currentlyMinted,
  onCheckStatus,
}) => {
  return (
    <>
      <div className="relative z-[2] w-full flex flex-col gap-6">
        {/* Heading */}
        <MinterHeading
          amountNft={collectionData.amountNFT}
          blockchainName={collectionData.blockchain}
          collectionName={collectionData.name}
        />
        {/* Description */}
        <MinterDescription text={collectionData.description} />
        {/* Mint Card */}
        <MinterCardsHuge
          actionName="Check Wallet Status"
          currentlyMinted={currentlyMinted}
          price="0"
          totalSupply={collectionData.amountNFT}
          onAction={onCheckStatus}
        />
      </div>
      <DefaultButton size="wide" variant="ghost">
        Mint Starts: 24.07.2025
      </DefaultButton>
    </>
  );
};
