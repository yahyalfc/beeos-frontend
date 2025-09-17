/**
 * NFT Staking Types
 * Clean, well-structured types for the staking system
 */

// NFT Rarity Enum
export enum NFTRarity {
  COMMON = 'Common',
  RARE = 'Rare',
  LEGENDARY = 'Legendary',
  MYTHIC = 'Mythic',
}

// Rarity to XP multiplier mapping
export const RARITY_MULTIPLIERS: Record<NFTRarity, number> = {
  [NFTRarity.COMMON]: 1,
  [NFTRarity.RARE]: 2,
  [NFTRarity.LEGENDARY]: 4,
  [NFTRarity.MYTHIC]: 10,
};

// Alchemy NFT Response Types
export interface AlchemyNFT {
  tokenId: string;
  tokenType: string;
  name?: string;
  description?: string;
  tokenUri?: string;
  image?: {
    cachedUrl?: string;
    thumbnailUrl?: string;
    pngUrl?: string;
    contentType?: string;
    size?: number;
  };
  raw?: {
    tokenUri?: string;
    metadata?: {
      name?: string;
      description?: string;
      image?: string;
      attributes?: {
        trait_type: string;
        value: string | number;
      }[];
    };
  };
  collection?: {
    name?: string;
    slug?: string;
    externalUrl?: string;
    bannerImageUrl?: string;
  };
  contract: {
    address: string;
    name?: string;
    symbol?: string;
    tokenType?: string;
    contractDeployer?: string;
    deployedBlockNumber?: number;
  };
  mint?: {
    mintAddress?: string;
    blockNumber?: number;
    timestamp?: string;
    transactionHash?: string;
  };
  owners?: unknown[];
  timeLastUpdated: string;
  balance?: string;
  acquiredAt?: {
    blockTimestamp?: string;
    blockNumber?: number;
  };
}

// Processed NFT for our application
export interface ProcessedNFT {
  id: string;
  tokenId: string;
  name: string;
  description?: string;
  image: string;
  rarity: NFTRarity;
  contractAddress: string;
  owner: string;
  isStaked: boolean;
  stakedAt?: Date;
  unlockTime?: Date;
  xpPerDay: number;
  totalXpEarned?: number;
}

// Staked NFT information
export interface StakedNFT extends ProcessedNFT {
  isStaked: true;
  stakedAt: Date;
  unlockTime: Date;
  lockDuration: number; // in days
  totalXpEarned: number;
  canUnlock: boolean;
}

// Staking Statistics
export interface StakingStats {
  totalNFTs: number;
  totalStaked: number; // Number of staked NFTs
  availableNFTs: number;
  xpPerDay: number; // XP earned per day
  totalRewards: number; // Total XP earned
  averageLockTime: number; // Average lock duration in days
  multiplier: number; // Reward multiplier
  rarityDistribution?: Record<string, number>; // Distribution by rarity
  nextRewardTime?: string; // Next reward claim time
  pendingRewards?: number; // Pending XP to claim
  rank?: number; // User rank in leaderboard
  nextTierProgress?: number; // Progress to next tier (0-100)
  currentTier?: string; // Current tier name
  nextTier?: string; // Next tier name
  xpToNextTier?: number; // XP needed for next tier
}

// Staking Transaction
export interface StakingTransaction {
  type: 'stake' | 'unstake' | 'approve';
  tokenIds: string[];
  lockDuration?: number;
  transactionHash?: string;
  status: 'pending' | 'success' | 'failed';
  error?: string;
  timestamp: Date;
}

// API Response Types
export interface AlchemyNFTsResponse {
  ownedNfts: AlchemyNFT[];
  totalCount: number;
  blockHash: string;
  pageKey?: string;
}

export interface AlchemyError {
  error: {
    code: number;
    message: string;
  };
}

// Staking Configuration
export interface StakingConfig {
  contractAddress: string;
  nftCollectionAddress: string;
  chainId: number;
  isTestnet: boolean;
  minLockDuration: number;
  maxLockDuration: number;
  baseXpPerDay: number;
}

// User Staking State
export interface UserStakingState {
  address: string;
  nfts: ProcessedNFT[];
  stakedNfts: StakedNFT[];
  stats: StakingStats;
  isLoading: boolean;
  error?: string;
}

// Selection State for UI
export interface SelectionState {
  selectedNFTs: ProcessedNFT[];
  selectedStakedNFTs: StakedNFT[];
  lockDuration: number;
  estimatedXp: number;
}

// Modal State
export interface StakeModalState {
  isOpen: boolean;
  mode: 'stake' | 'unstake';
  selectedTokens: string[];
  lockDuration: number;
  isProcessing: boolean;
  error?: string;
}

// Filter and Sort Options
export interface FilterOptions {
  showStaked: boolean;
  showAvailable: boolean;
  rarity?: NFTRarity;
  sortBy: 'tokenId' | 'rarity' | 'xpPerDay' | 'stakedAt';
  sortOrder: 'asc' | 'desc';
}

// Error Types
export class StakingError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'StakingError';
  }
}

export const STAKING_ERROR_CODES = {
  FETCH_FAILED: 'FETCH_FAILED',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  CONTRACT_ERROR: 'CONTRACT_ERROR',
  APPROVAL_FAILED: 'APPROVAL_FAILED',
  STAKE_FAILED: 'STAKE_FAILED',
  UNSTAKE_FAILED: 'UNSTAKE_FAILED',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

// Type Guards
export function isAlchemyNFT(obj: unknown): obj is AlchemyNFT {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'tokenId' in obj &&
    'contract' in obj
  );
}

export function isStakedNFT(nft: ProcessedNFT): nft is StakedNFT {
  return nft.isStaked === true;
}

export function isAlchemyError(obj: unknown): obj is AlchemyError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    typeof (obj as AlchemyError).error === 'object'
  );
}
