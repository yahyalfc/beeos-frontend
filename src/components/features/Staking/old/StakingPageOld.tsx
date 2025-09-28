/* eslint-disable @typescript-eslint/no-unnecessary-condition */

"use client";

import React from "react";

import Image from "next/image";

import { useWallet } from "@/components/providers/Wallet.provider";
import { DiscordIcon } from "@/components/shared/UI/Icons/Discord.icon";
import { XLGIcon } from "@/components/shared/UI/Icons/X.icon";
import { RightTriangle } from "@/components/shared/UI/RightTriangle/RightTriangle";
import { useBeeOsStakingOld } from "@/hooks/staking/useBeeOsStakingOld";
import { useIsMobile } from "@/hooks/useResponsible";
import { SOCIAL_MEDIA_LINKS } from "@/utils/constants";

import CollectionStatsOld from "./CollectionStatsOld";
import NFTListOld from "./NFTListOld";
import StakeModalOld from "./StakeModalOld";

const StakingPageOld: React.FC = () => {
  const { isConnected } = useWallet();

  const {
    beeOsResults,
    beeOsResultsLocked,
    selectedNFTs,
    setSelectedNFTs,
    selectedNFTsLocked,
    setSelectedNFTsLocked,
    isOpenStakeModal,
    setIsOpenStakeModal,
    isLoadingBeeOs,
    days,
    setDays,
    approveAllNft,
    lockNFTs,
    unlockNFTs,
    isLoading,
    isSuccess,
    isLoadingApprove,
    isSuccessApprove,
    isLoadingUnlock,
    rewardedNft,
    youWillGetXp,
    youWillGetPerDay,
    address,
  } = useBeeOsStakingOld();

  const selectedNFTsIds = selectedNFTs.map((item) => item.id);

  const isMobile = useIsMobile();

  if (!isConnected) {
    return (
      <div className="container block mt-10">
        <div className="inner-container min-h-screen flex flex-col gap-7 items-center justify-center">
          <h1 className="title-md text-center">
            Connect your wallet to start staking your BeeOS NFTs
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen block mt-28">
      <div className="inner-container">
        <StakeModalOld
          approveAllNft={approveAllNft}
          days={days}
          disabledApprove={days < 30 || isSuccessApprove || isLoadingApprove}
          isLoading={isLoading}
          isLoadingApprove={isLoadingApprove}
          isOpen={isOpenStakeModal}
          isSuccess={isSuccess}
          isSuccessApprove={isSuccessApprove}
          lockNFTs={lockNFTs}
          setDays={setDays}
          youWillGetXp={youWillGetXp}
          disabledStake={
            days < 30 || isSuccess || isLoading || !isSuccessApprove
          }
          onClose={() => setIsOpenStakeModal(false)}
        />

        {/* Header */}
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_3fr] gap-4 mb-10">
          <div className="relative block">
            <Image
              unoptimized
              alt="BeeOS"
              className="w-full aspect-square h-auto"
              height={800}
              src="/staking-pr.png"
              width={800}
            />
          </div>

          <div className="h-full flex flex-col sm:grid sm:grid-rows-2 gap-4 grid-cols-1">
            <div
              className="w-full h-full flex flex-col gap-2 sm:gap-2.5 relative px-4 py-5 sm:py-9 sm:px-8"
              style={{
                background:
                  "linear-gradient(30deg, #0E1010 0%, #0D1010 25%, #131919 50%, #0C0E0E 100% )",
              }}
            >
              <RightTriangle
                className="absolute top-0 right-0 left-auto w-6 h-6 sm:w-9 sm:h-9"
                corner="top-right"
                height={isMobile ? 24 : 36}
                isFilled="rgba(6,7,7,1)"
                strokeColor="black"
                strokeWidth={1}
                width={isMobile ? 24 : 36}
              />
              <div className="flex justify-between gap-2.5 items-start pr-2 sm:pr-3">
                <div className="title-small">BeeOS NFT Staking</div>
                <div className="flex items-center justify-end gap-2">
                  <a href={SOCIAL_MEDIA_LINKS.X} target="_blank">
                    <XLGIcon />
                  </a>
                  <a href={SOCIAL_MEDIA_LINKS.DISCORD} target="_blank">
                    <DiscordIcon />
                  </a>
                </div>
              </div>
              <div className="text-md max-w-[500px]">
                Stake your BeeOS NFTs to earn XP rewards. The longer you stake,
                the more XP you earn!
              </div>
            </div>
            {/* Collection Stats */}
            <CollectionStatsOld
              isLoading={isLoadingBeeOs}
              myNftCount={beeOsResults.length}
              rewardedXp={rewardedNft}
              stakedNftCount={beeOsResultsLocked.length}
              xpPerDay={youWillGetPerDay}
            />
          </div>
        </div>

        {/* Available NFTs */}
        {isLoadingBeeOs && (
          <div className="h-[200px] flex justify-center items-center">
            <div className="title-mini font-tusker-exp leading-[120%]">
              Loading your NFTs...
            </div>
          </div>
        )}

        {!isLoadingBeeOs && beeOsResults.length > 0 && (
          <div className="mb-6 block">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-start mb-8">
              <div className="title-small">Your NFTs</div>

              <div className="flex gap-2.5 flew-wrap relative">
                <button
                  className="px-4 py-2 bg-accent-background relative text-accent rounded-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground "
                  onClick={() => setSelectedNFTs([])}
                >
                  Clear&nbsp;Selection&nbsp;({selectedNFTs.length})
                </button>
                <button
                  className="px-4 py-2 bg-accent-background relative text-accent rounded-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground "
                  onClick={() => setSelectedNFTs(beeOsResults)}
                >
                  Select&nbsp;All
                </button>
                <button
                  className="px-4 py-2 bg-accent-background relative text-accent rounded-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground "
                  onClick={() => setIsOpenStakeModal(true)}
                >
                  Stake&nbsp;Selected&nbsp;({selectedNFTs.length})
                </button>
              </div>
            </div>
            <NFTListOld
              items={beeOsResults}
              selected={selectedNFTsIds}
              onSelect={(id) => {
                const found = beeOsResults.find((item) => item.id === id);
                if (!found) return;
                if (selectedNFTsIds.includes(id)) {
                  setSelectedNFTs((prev) =>
                    prev.filter((item) => item.id !== id)
                  );
                } else {
                  setSelectedNFTs((prev) => [...prev, found]);
                }
              }}
            />
          </div>
        )}

        {/* No Available NFTs */}
        {!isLoadingBeeOs && beeOsResults.length === 0 && (
          <div className="h-[200px] flex justify-center items-center">
            <div className="title-mini font-tusker-exp leading-[120%]">
              No BeeOS NFTs found in your wallet
            </div>
          </div>
        )}

        {/* Staked NFTs */}
        {address && beeOsResultsLocked.length > 0 && (
          <div className="mb-6 block">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-start mb-8">
              <div className="title-small">Staked NFTs</div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 bg-accent-background relative text-accent rounded-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground "
                  onClick={() => setSelectedNFTsLocked([])}
                >
                  Clear&nbsp;Selection&nbsp;({selectedNFTsLocked.length})
                </button>
                <button
                  className="px-4 py-2 bg-accent-background relative text-accent rounded-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground "
                  onClick={() =>
                    setSelectedNFTsLocked(
                      beeOsResultsLocked
                        .filter((item) => item.canUnlock)
                        .map((item) => item.payload?.tokenId)
                        .filter(Boolean)
                    )
                  }
                >
                  Select&nbsp;All&nbsp;Unlockable
                </button>
                <button
                  className="px-6 py-2 bg-red-950 hover:bg-red-900 rounded-sm font-medium disabled:bg-bg-secondary disabled:cursor-not-allowed text-white disabled:text-accent transition-colors flex items-center gap-2"
                  disabled={selectedNFTsLocked.length === 0 || isLoadingUnlock}
                  onClick={unlockNFTs}
                >
                  {isLoadingUnlock ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                      Unstaking...
                    </>
                  ) : (
                    `Unstake Selected (${selectedNFTsLocked.length})`
                  )}
                </button>
              </div>
            </div>
            <NFTListOld
              locked
              selected={selectedNFTsLocked}
              items={beeOsResultsLocked.toSorted(
                (a, b) => Number(a.unlockTime) - Number(b.unlockTime)
              )}
              onSelect={(id) => {
                if (selectedNFTsLocked.includes(id)) {
                  setSelectedNFTsLocked((prev) =>
                    prev.filter((_id) => _id !== id)
                  );
                } else {
                  setSelectedNFTsLocked((prev) => [...prev, id]);
                }
              }}
            />
          </div>
        )}

        {/* No Staked NFTs */}
        {address && beeOsResultsLocked.length === 0 && (
          <div className="h-[200px] flex justify-center items-center">
            <div className="title-mini font-tusker-exp leading-[120%]">
              No staked NFTs
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingPageOld;
