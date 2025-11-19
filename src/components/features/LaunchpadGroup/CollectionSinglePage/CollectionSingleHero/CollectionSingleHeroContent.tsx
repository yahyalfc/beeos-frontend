/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { type FC, useCallback, useEffect } from "react";

import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { getAddress } from "viem";

import { useCollectionSingleContext } from "@/components/providers/Collections.provider";
import { MintPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/MintPlateInterface";
import { MinterCardsHuge } from "@/components/shared/Mint/MinterCardsHuge";
import { MinterDescription } from "@/components/shared/Mint/MinterDescription";
import { MinterHeading } from "@/components/shared/Mint/MinterHeading";
import {
  EndedMinterPhasesCards,
  MinterPhasesCards,
} from "@/components/shared/Mint/MinterPhasesCards";
import AlreadyMintedSub from "@/components/shared/Modals/AlreadyMinted";
import CheckAddressSub from "@/components/shared/Modals/CheckAddress";
import ConfirmTransactionSub from "@/components/shared/Modals/ConfirmAddress";
import { MODALS_QUERIES } from "@/components/shared/Modals/constants";
import PublicWalletSub from "@/components/shared/Modals/PublicModal";
import SmthWrongModal from "@/components/shared/Modals/SmthWrongModal";
import WaitlistWalletSub from "@/components/shared/Modals/WaitlistModal";
import WhitelistWalletSub from "@/components/shared/Modals/WhitelistModal";
import { DefaultButton } from "@/components/shared/UI/Button/DefaultButton";
import TimerSmall from "@/components/shared/UI/Timer/TimerSmall";
import { smoothScrollTo } from "@/helpers/smoothScrollTo";
import { useMintCountdown } from "@/hooks/mint/useMintCountdown";
import { PHASES, useMinter } from "@/hooks/mint/useMinter";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useCheckWalletStatus } from "@/hooks/wallet/useCheckWalletStatus";
import { PROJECT_STATUSES, type Collection } from "@/types/collections";
import { WALLET_STATUSES } from "@/utils/constants";

interface CollectionSingleHeroContentProps {
  data: Collection;
}

export const CollectionSingleHeroContent: FC<
  CollectionSingleHeroContentProps
> = ({
  data: {
    id,
    name,
    blockchain,
    amountNFT,
    description,
    nftPrice,
    status,
    socials,
  },
}) => {
  const { setParams } = useSearchQuery();
  const { address, isConnected } = useAppKitAccount();

  const { collectionProfile } = useCollectionSingleContext();

  const today = new Date();
  const utcDateMint = new Date(
    Date.UTC(today.getUTCFullYear(), 10, 19, 16, 0, 0)
  );

  const {
    isMinted,
    nftCount,
    userPhase,
    supplyRemains,
    gtdTimestamp,
    waitTimestamp,
    publicTimestamp,
    mint,
    readContractClaim,
    setDefaultPermission,
    refetchTimestamps,
  } = useMinter();

  const { phase, timer, setTimer, setPhase } = useMintCountdown(
    gtdTimestamp,
    waitTimestamp,
    publicTimestamp
  );

  useEffect(() => {
    if (supplyRemains && address && isConnected && phase) {
      void readContractClaim(phase);
      void setDefaultPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplyRemains, address, isConnected, phase]);

  const checkStatus = useCheckWalletStatus({
    onSuccess: (status: string) => {
      switch (status as WALLET_STATUSES) {
        case WALLET_STATUSES.WHITELIST:
          setParams(MODALS_QUERIES.WAITLIST_WALLET_MODAL, "true");
          break;
        case WALLET_STATUSES.GUARANTEED:
          setParams(MODALS_QUERIES.WHITELIST_WALLET_MODAL, "true");
          break;
        default:
          setParams(MODALS_QUERIES.PUBLIC_WALLET_MODAL, "true");
          break;
      }
    },
  });

  const handleMintClick = async () => {
    if (!address) {
      toast.error("Oops... You need to connect your wallet first!");
      return;
    }

    const result = await mint(phase);

    if (result.success) {
      setParams(MODALS_QUERIES.CONFIRM_MINT, "true");
    } else {
      switch (result.error) {
        case "Sold out":
          window.location.reload();
          break;
        case "Already minted":
          setParams(MODALS_QUERIES.ALREADY_MINTED, "true");
          break;
        default:
          setParams(MODALS_QUERIES.SMTH_WRONG, "true");
      }
    }
  };

  const handleJoinWhitelistClick = useCallback(() => {
    void smoothScrollTo("#tasks", {
      duration: 1000,
    });
  }, []);

  const handleReloadPage = async () => {
    setTimer({ hours: 0, minutes: 0, seconds: 0 });
    setPhase(null);
    await refetchTimestamps();
    window.location.reload();
  };

  console.log("status", status);

  const handleCheckUserState = useCallback(
    async (walletAddress?: string) => {
      try {
        if (
          collectionProfile ||
          (walletAddress && typeof walletAddress === "string") ||
          address
        ) {
          const realAddress =
            walletAddress && typeof walletAddress === "string"
              ? walletAddress
              : address;
          await checkStatus({
            projectId: id,
            walletAddress: realAddress ? getAddress(realAddress) : realAddress,
          });
          setParams(MODALS_QUERIES.CHECK_ADDRESS_MODAL, null);
          return;
        } else {
          setParams(MODALS_QUERIES.CHECK_ADDRESS_MODAL, "true");
        }
      } catch {
        toast.error("Something went wrong! Try again later =(");
      }
    },
    [checkStatus, setParams, collectionProfile, address, id]
  );

  const collectionStatus = status;
  const isEnded = collectionStatus.statusName === PROJECT_STATUSES.FINISHED;
  const isUpcoming = collectionStatus.statusName === PROJECT_STATUSES.UPCOMING;
  const isQuesting = collectionStatus.statusName === PROJECT_STATUSES.QUESTING;
  const isMinting =
    collectionStatus.statusName === PROJECT_STATUSES.MINT
     && Date.now() >= utcDateMint.getTime();

  const minterActionLabel =
    phase === PHASES.PRE_PHASE || !isMinting
      ? "Check Wallet Status"
      : isQuesting
      ? "Join Waitlist"
      : isUpcoming
      ? "Comming Soon"
      : "Mint";

  return (
    <div className="relative flex flex-col justify-between gap-6 py-12 md:px-10">
      <PublicWalletSub />
      <WhitelistWalletSub />
      <ConfirmTransactionSub />
      <AlreadyMintedSub />
      <WaitlistWalletSub />
      <SmthWrongModal
        text={
          userPhase === PHASES.WAITLIST && phase === PHASES.WHITELIST
            ? "YOU'RE NOT IN THE GUARANTEED PHASE"
            : undefined
        }
      />
      <CheckAddressSub onCheck={handleCheckUserState} />
      <MintPlateInterface className="hidden md:block sm:block" />
      <div className="relative z-[2] w-full flex flex-col gap-6">
        {/* Heading */}
        <MinterHeading
          amountNft={amountNFT}
          blockchainName={blockchain}
          collectionName={name}
          socials={socials}
        />

        {/* Description */}
        {phase === PHASES.PRE_PHASE ||
        isUpcoming ||
        isQuesting ||
        !isMinting ? (
          <MinterDescription text={description} />
        ) : isEnded ? (
          <EndedMinterPhasesCards
            phase={phase}
            timer={timer}
            onTimerEnded={handleReloadPage}
          />
        ) : (
          <MinterPhasesCards
            phase={phase}
            timer={timer}
            onTimerEnded={handleReloadPage}
          />
        )}
        {/* Mint Card */}
        <MinterCardsHuge
          actionName={minterActionLabel}
          currentlyMinted={nftCount}
          isEnded={isEnded}
          isMinted={isMinted && isMinting}
          isMinting={isMinting}
          isUpcoming={isUpcoming}
          price={nftPrice}
          totalSupply={amountNFT}
          onAction={
            isUpcoming || isQuesting
              ? handleJoinWhitelistClick
              : phase === PHASES.PRE_PHASE || !isMinting
              ? handleCheckUserState
              : handleMintClick
          }
        />
        {/* )} */}
      </div>
      {phase === PHASES.PRE_PHASE || isUpcoming || isQuesting || !isMinting ? (
        <DefaultButton size="wide" variant="ghost">
          Mint {isEnded ? "Started" : "Starts"}
          &nbsp;-&nbsp;
          {isUpcoming || isQuesting || !isMinting ? (
            <span className="text-white">
              {utcDateMint.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })}
              &nbsp;UTC
            </span>
          ) : (
            <TimerSmall
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, sonarjs/different-types-comparison
              inifinite={timer === null ? true : false}
              initialHours={timer.hours}
              initialMinutes={timer.minutes}
              initialSeconds={timer.seconds}
              onComplete={handleReloadPage}
            />
          )}
        </DefaultButton>
      ) : (
        <DefaultButton
          size="wide"
          variant="ghost"
          onClick={() => handleCheckUserState()}
        >
          Check wallet status
        </DefaultButton>
      )}
    </div>
  );
};
