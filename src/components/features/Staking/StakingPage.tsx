/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { useState, useMemo } from "react";

import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

import { ButtonACCENTMiniPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/ButtonACCENTMiniPlateInterface";
import { DefaultButton } from "@/components/shared/UI/Button/DefaultButton";
import {
  useUserNFTs,
  useStakingStats,
} from "@/hooks/queries/useStakingQueries";
import { useStaking } from "@/hooks/staking/useStaking";
import { type ProcessedNFT } from "@/types/staking";

import { NFTGrid } from "./NFTGrid";
import { StakeModal } from "./StakeModal";
import { StakingStats } from "./StakingStats";

export function StakingPage() {
  const { address, isConnected } = useAccount();
  const [selectedNFTs, setSelectedNFTs] = useState<ProcessedNFT[]>([]);
  const [modalMode, setModalMode] = useState<"stake" | "unstake">("stake");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user NFTs and staking stats
  const { data: nfts, isLoading: isLoadingNFTs } = useUserNFTs(address ?? "");
  const { data: stats, isLoading: isLoadingStats } = useStakingStats(
    address ?? "0x0"
  );

  // Staking hook for blockchain interactions
  const {
    isApproved,
    isApproving,
    isStaking,
    isUnstaking,
    approveNFTs,
    stakeNFTs,
    unstakeNFTs,
    isCorrectChain,
    switchToCorrectChain,
  } = useStaking();

  // Filter available and staked NFTs
  const { availableNFTs, stakedNFTs } = useMemo(() => {
    if (!nfts) return { availableNFTs: [], stakedNFTs: [] };

    return {
      availableNFTs: nfts.nfts.filter((nft) => !nft.isStaked),
      stakedNFTs: nfts.nfts.filter((nft) => nft.isStaked),
    };
  }, [nfts]);

  // Handle NFT selection
  const handleSelectNFT = (nft: ProcessedNFT) => {
    setSelectedNFTs((prev) => {
      const isSelected = prev.some((n) => n.tokenId === nft.tokenId);
      if (isSelected) {
        return prev.filter((n) => n.tokenId !== nft.tokenId);
      }
      return [...prev, nft];
    });
  };

  // Handle select all
  const handleSelectAll = (nfts: ProcessedNFT[]) => {
    setSelectedNFTs(nfts);
  };

  // Handle stake button click
  const handleStakeClick = () => {
    if (!isApproved) {
      void approveNFTs();
      return;
    }
    setModalMode("stake");
    setIsModalOpen(true);
  };

  // Handle unstake button click
  const handleUnstakeClick = () => {
    setModalMode("unstake");
    setIsModalOpen(true);
  };

  // Handle modal confirm
  const handleModalConfirm = async (days?: number) => {
    const tokenIds = selectedNFTs.map((nft) => nft.tokenId);

    if (modalMode === "stake" && days) {
      await stakeNFTs(tokenIds, days);
    } else if (modalMode === "unstake") {
      await unstakeNFTs(tokenIds);
    }

    setSelectedNFTs([]);
    setIsModalOpen(false);
  };

  // Loading state
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="title-md mb-4">Connect Your Wallet</h2>
          <p className="text-default">
            Please connect your wallet to access the staking dashboard
          </p>
        </div>
      </div>
    );
  }

  if (!isCorrectChain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="title-md mb-4">Wrong Network</h2>
          <p className="text-default mb-6">
            Please switch to the correct network to continue
          </p>
          <div className="w-[300px]">
            <DefaultButton
              className="!w-full shrink-0 cursor-pointer"
              variant="ghost"
              onClick={() => void switchToCorrectChain()}
            >
              Switch Network
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingNFTs || isLoadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="container block">
      <div className="inner-container pt-28">
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col gap-2.5">
            <h1 className="title-md">NFT Staking</h1>
            <p className="text-default text-sky">
              Stake your NFTs to earn XP rewards
            </p>
          </div>

          <StakingStats
            isLoading={isLoadingStats}
            stats={stats?.stats ?? null}
          />
        </div>
        {/* Available NFTs Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Available NFTs ({availableNFTs.length})
            </h2>
            <div className="flex gap-3">
              {selectedNFTs.length > 0 &&
                selectedNFTs.every((nft) => !nft.isStaked) && (
                  <button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    onClick={() => setSelectedNFTs([])}
                  >
                    Clear Selection ({selectedNFTs.length})
                  </button>
                )}
              {availableNFTs.length > 0 && (
                <>
                  <DefaultButton
                    plateChildren={<ButtonACCENTMiniPlateInterface />}
                    size="default"
                    variant="accent"
                    onClick={() => handleSelectAll(availableNFTs)}
                  >
                    Select All
                  </DefaultButton>
                  <DefaultButton
                    plateChildren={<ButtonACCENTMiniPlateInterface />}
                    size="default"
                    variant="accent"
                    disabled={
                      selectedNFTs.filter((nft) => !nft.isStaked).length ===
                        0 ||
                      isApproving ||
                      isStaking
                    }
                    onClick={handleStakeClick}
                  >
                    {isApproving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Approving...
                      </>
                    ) : !isApproved ? (
                      "Approve NFTs"
                    ) : isStaking ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Staking...
                      </>
                    ) : (
                      `Stake Selected (${
                        selectedNFTs.filter((nft) => !nft.isStaked).length
                      })`
                    )}
                  </DefaultButton>
                </>
              )}
            </div>
          </div>

          {availableNFTs.length > 0 ? (
            <NFTGrid
              isLoading={false}
              nfts={availableNFTs}
              selectedNFTs={selectedNFTs}
              onSelectNFT={handleSelectNFT}
            />
          ) : (
            <div className="bg-gray-900 rounded-xl p-12 text-center">
              <p className="text-gray-400">No NFTs available for staking</p>
            </div>
          )}
        </div>

        {/* Staked NFTs Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Staked NFTs ({stakedNFTs.length})
            </h2>
            <div className="flex gap-3">
              {selectedNFTs.length > 0 &&
                selectedNFTs.every((nft) => nft.isStaked) && (
                  <button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    onClick={() => setSelectedNFTs([])}
                  >
                    Clear Selection ({selectedNFTs.length})
                  </button>
                )}
              {stakedNFTs.length > 0 && (
                <>
                  <button
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    onClick={() => handleSelectAll(stakedNFTs)}
                  >
                    Select All
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    disabled={
                      selectedNFTs.filter((nft) => nft.isStaked).length === 0 ||
                      isUnstaking
                    }
                    onClick={handleUnstakeClick}
                  >
                    {isUnstaking ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Unstaking...
                      </>
                    ) : (
                      `Unstake Selected (${
                        selectedNFTs.filter((nft) => nft.isStaked).length
                      })`
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {stakedNFTs.length > 0 ? (
            <NFTGrid
              isLoading={false}
              nfts={stakedNFTs}
              selectedNFTs={selectedNFTs}
              onSelectNFT={handleSelectNFT}
            />
          ) : (
            <div className="bg-gray-900 rounded-xl p-12 text-center">
              <p className="text-gray-400">No staked NFTs</p>
            </div>
          )}
        </div>
      </div>

      {/* Stake/Unstake Modal */}
      <StakeModal
        isLoading={isStaking || isUnstaking}
        isOpen={isModalOpen}
        mode={modalMode}
        selectedNFTs={selectedNFTs}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}
