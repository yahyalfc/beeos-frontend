/* eslint-disable sonarjs/no-commented-code */
/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { type FC, 
  // useEffect
 } from "react";

// import { useRouter } from "next/navigation";

import { useWallet } from "@/components/providers/Wallet.provider";
import { shortenAddress } from "@/helpers/shortenAddress";
// import { useCreateWallet } from "@/hooks/mutations/useProfileMutations";

import { HeaderCard } from "../Cards/HeaderCard";

export const HeaderRightBlock: FC = ({}) => {
  // const router = useRouter();
  const {
    isConnected,
    isNeededSign,
    walletAddress,
    openConnectModal,
    openAccountModal,
    handleSignMessage,
  } = useWallet();
  // const { mutate: createWallet } = useCreateWallet();
  const isWalletExist = isConnected && walletAddress;

  // Create wallet in profile backend when wallet is connected
  // useEffect(() => {
  //   if (isWalletExist && walletAddress) {
  //     createWallet(walletAddress);
  //   }
  // }, [isWalletExist, walletAddress, createWallet]);

  const handleClick = () => {
    if (isNeededSign && walletAddress) {
      void handleSignMessage(walletAddress);
    } else if (isWalletExist) {
      // router.push(`/profile`);
      void openAccountModal()
    } else {
      void openConnectModal();
    }
  };

  return (
    <HeaderCard
      className="flex items-center shrink-0 w-full md:w-auto justify-center gap-6 cursor-pointer px-1 md:px-7"
      role="button"
      onClick={handleClick}
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
