/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React from "react";

import Image from "next/image";

import { useWallet } from "@/components/providers/Wallet.provider";
import { ButtonACCENTMiniPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/ButtonACCENTMiniPlateInterface";
import { DefaultButton } from "@/components/shared/UI/Button/DefaultButton";
import { useBeeOsStakingOld } from "@/hooks/staking/useBeeOsStakingOld";

import CollectionStatsOld from "./CollectionStatsOld";
import NFTListOld from "./NFTListOld";
import StakeModalOld from "./StakeModalOld";

const StakingPageOld: React.FC = () => {
  const { isConnected, openConnectModal } = useWallet();

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

  // For regular NFTs selected - this is an array of objects, we need an array of ids
  const selectedNFTsIds = selectedNFTs.map((item) => item.id);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="flex h-31 min-h-[7.75rem] w-31 min-w-[7.75rem] max-w-3 items-center justify-center rounded-full border border-gray-600">
              <Image
                alt="BeeOS"
                height={52}
                src="/beeos-big-logo.svg"
                width={93}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">BeeOS NFT Staking</h1>
          <p className="text-gray-400 mb-8">
            Connect your wallet to start staking your BeeOS NFTs
          </p>
          <ButtonACCENTMiniPlateInterface>
            <DefaultButton onClick={openConnectModal}>
              Connect Wallet
            </DefaultButton>
          </ButtonACCENTMiniPlateInterface>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
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
        <div className="mb-10">
          <div className="mb-6 flex gap-6">
            <div className="flex h-31 min-h-[7.75rem] w-31 min-w-[7.75rem] max-w-3 items-center justify-center rounded-full border border-gray-600">
              <Image
                alt="BeeOS"
                height={52}
                src="/beeos-big-logo.svg"
                width={93}
              />
            </div>
            <div className="w-full">
              <div className="mb-3 text-4xl font-bold">BeeOS NFT Staking</div>
              <div className="text-gray-400">
                Stake your BeeOS NFTs to earn XP rewards. The longer you stake,
                the more XP you earn!
              </div>
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

          {/* Action Buttons for Available NFTs */}
          {!isLoadingBeeOs && beeOsResults.length > 0 && (
            <div className="mb-6 flex gap-3">
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                onClick={() => setSelectedNFTs([])}
              >
                Clear Selection ({selectedNFTs.length})
              </button>
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                onClick={() => setSelectedNFTs(beeOsResults)}
              >
                Select All
              </button>
              <ButtonACCENTMiniPlateInterface>
                <DefaultButton
                  disabled={selectedNFTs.length === 0}
                  onClick={() => setIsOpenStakeModal(true)}
                >
                  Stake Selected ({selectedNFTs.length})
                </DefaultButton>
              </ButtonACCENTMiniPlateInterface>
            </div>
          )}

          {/* Available NFTs */}
          {isLoadingBeeOs && (
            <div className="text-center py-8">Loading your NFTs...</div>
          )}
          {!isLoadingBeeOs && beeOsResults.length > 0 && (
            <div className="mb-6 block">
              <div className="mb-6 text-xl font-semibold">Your NFTs</div>
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
            <div className="bg-gray-900 rounded-xl p-12 text-center mb-6">
              <p className="text-gray-400">
                No BeeOS NFTs found in your wallet
              </p>
            </div>
          )}

          {/* Action Buttons for Staked NFTs */}
          {address && beeOsResultsLocked.length > 0 && (
            <div className="mb-6 flex gap-3">
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                onClick={() => setSelectedNFTsLocked([])}
              >
                Clear Selection ({selectedNFTsLocked.length})
              </button>
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                onClick={() =>
                  setSelectedNFTsLocked(
                    beeOsResultsLocked
                      .filter((item) => item.canUnlock)
                      .map((item) => item.payload?.tokenId)
                      .filter(Boolean)
                  )
                }
              >
                Select All Unlockable
              </button>
              <button
                className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                disabled={selectedNFTsLocked.length === 0 || isLoadingUnlock}
                onClick={unlockNFTs}
              >
                {isLoadingUnlock ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Unstaking...
                  </>
                ) : (
                  `Unstake Selected (${selectedNFTsLocked.length})`
                )}
              </button>
            </div>
          )}

          {/* Staked NFTs */}
          {address && beeOsResultsLocked.length > 0 && (
            <div className="mb-6 block">
              <div className="mb-6 text-xl font-semibold">Staked NFTs</div>
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
            <div className="bg-gray-900 rounded-xl p-12 text-center">
              <p className="text-gray-400">No staked NFTs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StakingPageOld;
