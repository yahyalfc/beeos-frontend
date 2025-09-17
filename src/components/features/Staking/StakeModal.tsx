"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { NFTRarity, type ProcessedNFT } from "@/types/staking";

interface StakeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly selectedNFTs: ProcessedNFT[];
  readonly mode: "stake" | "unstake";
  readonly isLoading?: boolean;
  readonly onConfirm: (days?: number) => Promise<void>;
}

const STAKING_PERIODS = [
  { days: 7, label: "7 Days", multiplier: 1 },
  { days: 30, label: "30 Days", multiplier: 1.5 },
  { days: 90, label: "90 Days", multiplier: 2.5 },
  { days: 180, label: "180 Days", multiplier: 4 },
];

const getRarityStyles = (rarity: NFTRarity): string => {
  switch (rarity) {
    case NFTRarity.MYTHIC:
      return "bg-purple-500/20 text-purple-400";
    case NFTRarity.LEGENDARY:
      return "bg-yellow-500/20 text-yellow-400";
    case NFTRarity.RARE:
      return "bg-blue-500/20 text-blue-400";
    case NFTRarity.COMMON:
    default:
      return "bg-gray-700 text-gray-400";
  }
};

export function StakeModal({
  isOpen,
  onClose,
  selectedNFTs,
  mode,
  isLoading = false,
  onConfirm,
}: Readonly<StakeModalProps>) {
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const calculateRewards = () => {
    const period = STAKING_PERIODS.find((p) => p.days === selectedPeriod);
    const baseXP = selectedNFTs.reduce((acc, nft) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const rarityMultiplier = {
        [NFTRarity.COMMON]: 1,
        [NFTRarity.RARE]: 2,
        [NFTRarity.LEGENDARY]: 4,
        [NFTRarity.MYTHIC]: 10,
      }[nft.rarity] ?? 1;
      return acc + rarityMultiplier;
    }, 0);
    
    return {
      dailyXP: baseXP,
      totalXP: baseXP * selectedPeriod,
      multiplier: period?.multiplier ?? 1,
      finalXP: baseXP * selectedPeriod * (period?.multiplier ?? 1),
    };
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(mode === "stake" ? selectedPeriod : undefined);
      onClose();
    } catch (error) {
      console.error("Staking operation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const rewards = mode === "stake" ? calculateRewards() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        tabIndex={0}
        type="button"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {mode === "stake" ? "Stake NFTs" : "Unstake NFTs"}
          </h2>
          <button
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            disabled={isProcessing}
            type="button"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Selected NFTs */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Selected NFTs ({selectedNFTs.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedNFTs.map((nft) => (
                <div
                  key={nft.tokenId}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg"
                >
                  <span className="text-sm text-white">#{nft.tokenId}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${getRarityStyles(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Staking Period (only for staking) */}
          {mode === "stake" && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Staking Period
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {STAKING_PERIODS.map((period) => (
                  <button
                    key={period.days}
                    type="button"
                    className={`p-4 rounded-lg border transition-all ${
                      selectedPeriod === period.days
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setSelectedPeriod(period.days)}
                  >
                    <div className="text-left">
                      <div className="text-white font-medium">{period.label}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {period.multiplier}x multiplier
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rewards Preview (only for staking) */}
          {mode === "stake" && rewards && (
            <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
              <h3 className="text-sm font-medium text-gray-400">
                Estimated Rewards
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {rewards.dailyXP} XP
                  </div>
                  <div className="text-sm text-gray-400">Per Day</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {rewards.finalXP.toLocaleString()} XP
                  </div>
                  <div className="text-sm text-gray-400">
                    Total ({selectedPeriod} days × {rewards.multiplier}x)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Warning for unstaking */}
          {mode === "unstake" && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-400">
                ⚠️ Unstaking early may result in reduced rewards. Make sure the lock period has ended.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-800">
          <button
            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            disabled={isProcessing}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing || isLoading}
            type="button"
            onClick={() => {
              void handleConfirm();
            }}
          >
            {isProcessing || isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    fill="none"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              // eslint-disable-next-line sonarjs/no-nested-conditional
              `Confirm ${mode === "stake" ? "Stake" : "Unstake"}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
