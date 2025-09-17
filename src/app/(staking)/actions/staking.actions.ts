"use server";

import { AlchemyService } from "@/services/api/alchemy.service";
import  { type ProcessedNFT } from "@/types/staking";
import { StakingError, STAKING_ERROR_CODES } from "@/types/staking";
import { STAKING_CONFIG } from "@/utils/constants";

const alchemyService = new AlchemyService();

/**
 * Fetch NFTs for a wallet address
 * Server action to get all NFTs from Alchemy API
 */
export async function fetchUserNFTs(walletAddress: string): Promise<{
  nfts: ProcessedNFT[];
  error?: StakingError;
}> {
  try {
    if (!walletAddress) {
      return {
        nfts: [],
        error: new StakingError(
          "Wallet address is required",
          STAKING_ERROR_CODES.INVALID_ADDRESS
        ),
      };
    }

    // Fetch all NFTs from Alchemy (handles pagination internally)
    const nfts = await alchemyService.getAllNFTsForOwner(walletAddress);

    return { nfts };
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return {
      nfts: [],
      error: new StakingError(
        error instanceof Error ? error.message : "Failed to fetch NFTs",
        STAKING_ERROR_CODES.FETCH_FAILED,
        error
      ),
    };
  }
}

/**
 * Fetch NFT metadata by token ID
 * Server action to get detailed NFT metadata
 */
export async function fetchNFTMetadata(
  contractAddress: string,
  tokenId: string
): Promise<{
  metadata: ProcessedNFT | null;
  error?: StakingError;
}> {
  try {
    const nftData = await alchemyService.getNFTMetadata(contractAddress, tokenId);
    
    if (!nftData) {
      return {
        metadata: null,
        error: new StakingError(
          "NFT metadata not found",
          "NOT_FOUND"
        ),
      };
    }

    // Process the NFT data into our format
    const metadata = alchemyService.processNFT(nftData, "unknown");
    return { metadata };
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return {
      metadata: null,
      error: new StakingError(
        error instanceof Error ? error.message : "Failed to fetch metadata",
        STAKING_ERROR_CODES.FETCH_FAILED,
        error
      ),
    };
  }
}

/**
 * Batch fetch multiple NFTs metadata
 * Optimized for fetching multiple NFTs at once
 */
export async function fetchBatchNFTMetadata(
  tokenIds: string[]
): Promise<{
  nfts: ProcessedNFT[];
  error?: StakingError;
}> {
  try {
    const promises = tokenIds.map((tokenId) =>
      alchemyService.getNFTMetadata(STAKING_CONFIG.NFT_CONTRACT_ADDRESS, tokenId)
    );

    const results = await Promise.allSettled(promises);
    
    const nfts: ProcessedNFT[] = [];
    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        const processedNFT = alchemyService.processNFT(result.value, "unknown");
        nfts.push(processedNFT);
      }
    }

    return { nfts };
  } catch (error) {
    console.error("Error batch fetching NFTs:", error);
    return {
      nfts: [],
      error: new StakingError(
        "Failed to fetch batch NFT metadata",
        "BATCH_FETCH_ERROR",
        error
      ),
    };
  }
}


// eslint-disable-next-line @typescript-eslint/require-await
export async function fetchStakingStats(nfts: ProcessedNFT[]): Promise<{
  stats: {
    totalNFTs: number;
    totalStaked: number;
    availableNFTs: number;
    xpPerDay: number;
    totalRewards: number;
    averageLockTime: number;
    multiplier: number;
    rarityDistribution?: Record<string, number>;
  } | null; error?: StakingError;
}> {
  try {
    const stakedNFTs = nfts.filter(nft => nft.isStaked);
    const availableNFTs = nfts.filter(nft => !nft.isStaked);
    
    // Calculate rarity distribution
    const rarityDistribution: Record<string, number> = {};
    nfts.forEach(nft => {
      rarityDistribution[nft.rarity] = (rarityDistribution[nft.rarity] || 0) + 1;
    });
    
    const stats = {
      totalNFTs: nfts.length,
      totalStaked: stakedNFTs.length,
      availableNFTs: availableNFTs.length,
      xpPerDay: stakedNFTs.reduce((total, nft) => total + nft.xpPerDay, 0),
      totalRewards: nfts.reduce((total, nft) => total + (nft.totalXpEarned ?? 0), 0),
      averageLockTime: 0, // Will be calculated from actual staking data
      multiplier: 1, // Base multiplier, can be enhanced based on staking duration
      rarityDistribution,
    };

    return { stats };
  } catch (error) {
    console.error("Error calculating staking stats:", error);
    return {
      stats: null,
      error: new StakingError(
        "Failed to calculate staking statistics",
        "STATS_ERROR",
        error
      ),
    };
  }
}

/**
 * Validate NFT ownership
 * Server action to verify if a wallet owns specific NFTs
 */
export async function validateNFTOwnership(
  walletAddress: string,
  tokenIds: string[]
): Promise<{
  valid: boolean;
  ownedTokenIds: string[];
  error?: StakingError;
}> {
  try {
    const nfts = await alchemyService.getAllNFTsForOwner(walletAddress);

    const ownedTokenIds = nfts
      .filter((nft) => tokenIds.includes(nft.tokenId))
      .map((nft) => nft.tokenId);

    return {
      valid: ownedTokenIds.length === tokenIds.length,
      ownedTokenIds,
    };
  } catch (error) {
    console.error("Error validating ownership:", error);
    return {
      valid: false,
      ownedTokenIds: [],
      error: new StakingError(
        "Failed to validate NFT ownership",
        "VALIDATION_ERROR",
        error
      ),
    };
  }
}
