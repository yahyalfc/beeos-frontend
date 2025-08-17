"use client";

import { type FC } from "react";

import { useWallet } from "@/components/providers/Wallet.provider";
import { DeviderLine } from "@/components/shared/Interfaces/Lines/DeviderLine";

import { CollectionSingleProfileData } from "./CollectionSingleProfileData";

interface CollectionSingleProfileProps {
  // eslint-disable-next-line sonarjs/no-redundant-optional
  nothing?: undefined;
}

export const CollectionSingleProfile: FC<
  CollectionSingleProfileProps
> = ({}) => {
  const { isConnected, walletAddress } = useWallet();
  const isWalletExist = isConnected && walletAddress;

  return (
    <section className="relative block pt-12 pb-14">
      <div className="container">
        <div className="inner-container">
          <DeviderLine />
          {isWalletExist ? <CollectionSingleProfileData /> : null}
        </div>
      </div>
    </section>
  );
};
