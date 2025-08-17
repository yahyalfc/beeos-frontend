/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { type FC } from "react";

import { useWallet } from "@/components/providers/Wallet.provider";
import { shortenAddress } from "@/helpers/shortenAddress";

import { HeaderCard } from "../Cards/HeaderCard";


export const HeaderRightBlock: FC = ({}) => {
  const {
    isConnected,
    isNeededSign,
    walletAddress,
    openConnectModal,
    openAccountModal,
    handleSignMessage,
  } = useWallet();
  const isWalletExist = isConnected && walletAddress;

  return (
    <HeaderCard
      className="flex items-center shrink-0 w-full md:w-auto justify-center gap-6 cursor-pointer px-1 md:px-7"
      role="button"
      onClick={() =>
        isNeededSign && walletAddress
          ? handleSignMessage(walletAddress)
          : isWalletExist
          ? openAccountModal()
          : openConnectModal()
      }
    >
      <span className="flex items-center cursor-pointer h-full inset-0 link-base !text-[13px] !md:text-base">
        {isNeededSign
          ? "Sign Message"
          : isWalletExist
          ? shortenAddress(walletAddress)
          : "Connect Wallet"}
      </span>
    </HeaderCard>
  );
};
