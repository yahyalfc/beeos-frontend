/* eslint-disable react/no-array-index-key */
"use client";

import { useState } from "react";

import Image from "next/image";

import { useAccount } from "wagmi";

import { type ProcessedNFT } from "@/types/staking";

interface NFTGridProps {
  nfts: ProcessedNFT[];
  selectedNFTs: ProcessedNFT[];
  onSelectNFT: (nft: ProcessedNFT) => void;
  isLoading?: boolean;
}

export function NFTGrid({ nfts, selectedNFTs, onSelectNFT, isLoading }: Readonly<NFTGridProps>) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-500 text-center">Connect your wallet to view and stake your NFTs</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-3" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No NFTs Found</h3>
        <p className="text-gray-500 text-center">You don&apos;t have any BeeOS NFTs available for staking</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft) => {
        const isSelected = selectedNFTs.some(selected => selected.tokenId === nft.tokenId);
        
        return (
          <NFTCard
            key={nft.tokenId}
            isSelected={isSelected}
            nft={nft}
            onSelect={() => onSelectNFT(nft)}
          />
        );
      })}
    </div>
  );
}

interface NFTCardProps {
  nft: ProcessedNFT;
  isSelected: boolean;
  onSelect: () => void;
}

function NFTCard({ nft, isSelected, onSelect }: Readonly<NFTCardProps>) {
  const [imageError, setImageError] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'bg-gray-100 text-gray-800';
      case 'rare':
        return 'bg-blue-100 text-blue-800';
      case 'legendary':
        return 'bg-purple-100 text-purple-800';
      case 'mythic':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`
        relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-blue-500 text-white rounded-full p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
        </div>
      )}

      {/* NFT Image */}
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        {!imageError ? (
          <Image
            fill
            alt={nft.name}
            className="object-cover"
            src={nft.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </div>
        )}
      </div>

      {/* NFT Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 truncate">{nft.name}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">#{nft.tokenId}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
            {nft.rarity}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">XP/Day:</span>
          <span className="font-semibold text-green-600">{nft.xpPerDay}</span>
        </div>
      </div>
    </div>
  );
}
