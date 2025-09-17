/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { ButtonACCENTMiniPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/ButtonACCENTMiniPlateInterface";
import { DefaultButton } from "@/components/shared/UI/Button/DefaultButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shared/UI/Dialog/Dialog";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  days: number;
  setDays: (days: number) => void;
  youWillGetXp: number;
  isLoadingApprove: boolean;
  isSuccessApprove: boolean;
  approveAllNft: () => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  lockNFTs: () => Promise<void>;
  disabledApprove: boolean;
  disabledStake: boolean;
}

const StakeModalOld: React.FC<StakeModalProps> = ({
  isOpen,
  onClose,
  days,
  setDays,
  youWillGetXp,
  isLoadingApprove,
  isSuccessApprove,
  approveAllNft,
  isLoading,
  isSuccess,
  lockNFTs,
  disabledApprove,
  disabledStake,
}) => {
  const handleApprove = async () => {
    try {
      await approveAllNft();
    } catch (error) {
      console.error("Error approving NFTs:", error);
    }
  };

  const handleStake = async () => {
    try {
      await lockNFTs();
    } catch (error) {
      console.error("Error staking NFTs:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Stake NFTs
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Days Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Lock Period (Days)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[30, 60, 90, 120, 180, 365].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    days === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setDays(period)}
                >
                  {period}d
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="mt-3">
              <input
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                max="365"
                min="30"
                placeholder="Custom days (min 30)"
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Rewards Preview */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">
              Rewards Preview
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Lock Period:</span>
                <span className="text-white">{days} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total XP:</span>
                <span className="text-green-400 font-medium">
                  {youWillGetXp.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">XP per Day:</span>
                <span className="text-blue-400">
                  {Math.round(youWillGetXp / days).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {days < 30 && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">
                Minimum lock period is 30 days
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isSuccessApprove && (
              <DefaultButton
                className="w-full"
                disabled={disabledApprove || isLoadingApprove}
                plateChildren={<ButtonACCENTMiniPlateInterface />}
                onClick={handleApprove}
              >
                {isLoadingApprove ? "Approving..." : "Approve NFTs"}
              </DefaultButton>
            )}

            {isSuccessApprove && (
              <DefaultButton
                className="w-full"
                disabled={disabledStake || isLoading}
                plateChildren={<ButtonACCENTMiniPlateInterface />}
                onClick={handleStake}
              >
                {isLoading ? "Staking..." : "Stake NFTs"}
              </DefaultButton>
            )}

            <button
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-400 text-sm text-center">
                NFTs staked successfully! The page will reload shortly.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModalOld;
