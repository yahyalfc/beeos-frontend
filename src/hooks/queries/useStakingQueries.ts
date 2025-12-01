"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { 
  fetchUserNFTs, 
  fetchNFTMetadata, 
  fetchBatchNFTMetadata,
  fetchStakingStats,
  validateNFTOwnership 
} from "@/app/(staking)/actions/staking.actions";
import { useWallet } from "@/components/providers/Wallet.provider";
import { type ProcessedNFT, type StakingError } from "@/types/staking";
import { STAKING_QUERY_KEYS } from "@/utils/constants";

/**
 * Hook to fetch user's NFTs
 * Uses React Query for caching and automatic refetching
 */
export function useUserNFTs(walletAddress?: string | null) {
  return useQuery({
    queryKey: [STAKING_QUERY_KEYS.USER_NFTS, walletAddress],
    queryFn: async () => {
      if (!walletAddress) {
        return { nfts: [], error: null };
      }
      return fetchUserNFTs(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (formerly cacheTime)
    refetchOnWindowFocus: true,
    retry: 2,
  });
}

/**
 * Hook to fetch NFT metadata by token ID
 */
export function useNFTMetadata(contractAddress: string, tokenId: string) {
  return useQuery({
    queryKey: [STAKING_QUERY_KEYS.NFT_METADATA, contractAddress, tokenId],
    queryFn: () => fetchNFTMetadata(contractAddress, tokenId),
    enabled: !!contractAddress && !!tokenId,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to batch fetch multiple NFT metadata
 */
export function useBatchNFTMetadata(tokenIds: string[]) {
  return useQuery({
    queryKey: [STAKING_QUERY_KEYS.BATCH_NFT_METADATA, tokenIds],
    queryFn: () => fetchBatchNFTMetadata(tokenIds),
    enabled: tokenIds.length > 0,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook to calculate staking statistics from wallet address
 */
export function useStakingStats(walletAddress?: string | null) {
  const { data: nftsData } = useUserNFTs(walletAddress);
  const nfts = nftsData?.nfts ?? [];
  
  return useQuery({
    queryKey: [STAKING_QUERY_KEYS.STAKING_STATS, walletAddress, nfts.length],
    queryFn: () => fetchStakingStats(nfts),
    enabled: !!walletAddress && nfts.length > 0,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to validate NFT ownership
 */
export function useValidateOwnership(tokenIds: string[]) {
  const { walletAddress } = useWallet();
  
  return useQuery({
    queryKey: [STAKING_QUERY_KEYS.VALIDATE_OWNERSHIP, walletAddress, tokenIds],
    queryFn: async () => {
      if (!walletAddress) {
        return { valid: false, ownedTokenIds: [], error: null };
      }
      return validateNFTOwnership(walletAddress, tokenIds);
    },
    enabled: !!walletAddress && tokenIds.length > 0,
    staleTime: 10 * 1000, // 10 seconds
  });
}

/**
 * Hook for staking NFTs with optimistic updates
 */
export function useStakeNFTs() {
  const queryClient = useQueryClient();
  const { walletAddress } = useWallet();

  return useMutation({
    mutationFn: async (nfts: ProcessedNFT[]) => {
      // This will be implemented with the staking contract interaction
      // For now, return a mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, stakedNFTs: nfts });
        }, 1000);
      });
    },
    onMutate: async (nfts) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: [STAKING_QUERY_KEYS.USER_NFTS, walletAddress] 
      });

      // Snapshot the previous value
      const previousNFTs = queryClient.getQueryData([
        STAKING_QUERY_KEYS.USER_NFTS, 
        walletAddress
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [STAKING_QUERY_KEYS.USER_NFTS, walletAddress],
        (old: { nfts: ProcessedNFT[]; error?: StakingError } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            nfts: old.nfts.filter(
              nft => !nfts.find(n => n.tokenId === nft.tokenId)
            ),
          };
        }
      );

      // Return a context object with the snapshotted value
      return { previousNFTs };
    },
    onError: (_err, _nfts, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousNFTs) {
        queryClient.setQueryData(
          [STAKING_QUERY_KEYS.USER_NFTS, walletAddress],
          context.previousNFTs
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      void queryClient.invalidateQueries({ 
        queryKey: [STAKING_QUERY_KEYS.USER_NFTS, walletAddress] 
      });
      void queryClient.invalidateQueries({ 
        queryKey: [STAKING_QUERY_KEYS.STAKED_NFTS, walletAddress] 
      });
    },
  });
}

/**
 * Hook for unstaking NFTs with optimistic updates
 */
export function useUnstakeNFTs() {
  const queryClient = useQueryClient();
  const { walletAddress } = useWallet();

  return useMutation({
    mutationFn: async (tokenIds: string[]) => {
      // This will be implemented with the staking contract interaction
      // For now, return a mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, unstakedTokenIds: tokenIds });
        }, 1000);
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ 
        queryKey: [STAKING_QUERY_KEYS.USER_NFTS, walletAddress] 
      });
      void queryClient.invalidateQueries({ 
        queryKey: [STAKING_QUERY_KEYS.STAKED_NFTS, walletAddress] 
      });
    },
  });
}

/**
 * Combined hook for all staking data
 * Provides a single source of truth for staking state
 */
export function useStakingData() {
  const { walletAddress } = useWallet();
  const userNFTs = useUserNFTs(walletAddress);
  const nfts = userNFTs.data?.nfts ?? [];
  const stakingStats = useStakingStats(walletAddress);
  const stakeNFTs = useStakeNFTs();
  const unstakeNFTs = useUnstakeNFTs();

  return {
    // Data
    nfts,
    stats: stakingStats.data?.stats ?? null,
    
    // Loading states
    isLoading: userNFTs.isLoading || stakingStats.isLoading,
    isLoadingNFTs: userNFTs.isLoading,
    isLoadingStats: stakingStats.isLoading,
    
    // Error states
    error: userNFTs.data?.error ?? stakingStats.data?.error,
    nftsError: userNFTs.data?.error,
    statsError: stakingStats.data?.error,
    
    // Mutations
    stakeNFTs: stakeNFTs.mutate,
    unstakeNFTs: unstakeNFTs.mutate,
    isStaking: stakeNFTs.isPending,
    isUnstaking: unstakeNFTs.isPending,
    
    // Refetch functions
    refetchNFTs: userNFTs.refetch,
    refetchStats: stakingStats.refetch,
    refetchAll: () => {
      void userNFTs.refetch();
      void stakingStats.refetch();
    },
  };
}
