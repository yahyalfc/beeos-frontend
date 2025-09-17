"use client";

import { useCallback, useState, useEffect } from "react";

import { toast } from "sonner";
import { erc721Abi } from "viem";
import { 
  useAccount, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useReadContract,
  useSwitchChain
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { STAKING_CONFIG } from "@/utils/constants";

import { lockerAbi } from "./lockerAbi";

const targetChainId = STAKING_CONFIG.IS_TESTNET ? sepolia.id : mainnet.id;
const WALLET_NOT_CONNECTED_MESSAGE = "Please connect your wallet";

interface UseStakingReturn {
  // State
  isApproved: boolean;
  isApproving: boolean;
  isStaking: boolean;
  isUnstaking: boolean;
  
  // Actions
  approveNFTs: () => Promise<void>;
  stakeNFTs: (tokenIds: string[], lockDuration: number) => Promise<void>;
  unstakeNFTs: (tokenIds: string[]) => Promise<void>;
  checkApproval: () => Promise<boolean>;
  
  // Chain management
  switchToCorrectChain: () => Promise<void>;
  isCorrectChain: boolean;
}

export function useStaking(): UseStakingReturn {
  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  
  const isCorrectChain = chain?.id === targetChainId;
  
  // Check if NFTs are approved for staking contract
  const { data: isApprovedForAll } = useReadContract({
    address: STAKING_CONFIG.NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: erc721Abi,
    functionName: "isApprovedForAll",
    args: address ? [address, STAKING_CONFIG.LOCKER_CONTRACT_ADDRESS as `0x${string}`] : undefined,
  });
  
  // Write contract hooks
  const { 
    writeContractAsync: writeApprove,
    data: approveHash,
  } = useWriteContract();
  
  const { 
    writeContractAsync: writeStake,
    data: stakeHash,
  } = useWriteContract();
  
  const { 
    writeContractAsync: writeUnstake,
    data: unstakeHash,
  } = useWriteContract();
  
  // Wait for transaction receipts
  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  
  const { isLoading: isStakeLoading } = useWaitForTransactionReceipt({
    hash: stakeHash,
  });
  
  const { isLoading: isUnstakeLoading } = useWaitForTransactionReceipt({
    hash: unstakeHash,
  });
  
  // Switch to correct chain
  const switchToCorrectChain = useCallback(async () => {
    try {
      await switchChainAsync({ chainId: targetChainId });
      toast.success("Successfully switched network");
    } catch (error) {
      console.error("Failed to switch chain:", error);
      toast.error("Failed to switch network");
    }
  }, [switchChainAsync]);
  
  // Check approval status
  const checkApproval = useCallback((): Promise<boolean> => {
    return Promise.resolve(!!isApprovedForAll);
  }, [isApprovedForAll]);
  
  // Approve NFTs for staking
  const approveNFTs = useCallback(async () => {
    if (!address) {
      toast.error(WALLET_NOT_CONNECTED_MESSAGE);
      return;
    }
    
    if (!isCorrectChain) {
      await switchToCorrectChain();
      return;
    }
    
    setIsApproving(true);
    
    try {
      await writeApprove({
        address: STAKING_CONFIG.NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: erc721Abi,
        functionName: "setApprovalForAll",
        args: [STAKING_CONFIG.LOCKER_CONTRACT_ADDRESS as `0x${string}`, true],
      });
      
      toast.success("Approval transaction submitted");
      
    } catch (error) {
      console.error("Approval failed:", error);
      toast.error("Failed to approve NFTs");
      setIsApproving(false);
    }
  }, [address, isCorrectChain, switchToCorrectChain, writeApprove]);
  
  // Stake NFTs
  const stakeNFTs = useCallback(async (tokenIds: string[], lockDuration: number) => {
    if (!address) {
      toast.error(WALLET_NOT_CONNECTED_MESSAGE);
      return;
    }
    
    if (!isCorrectChain) {
      await switchToCorrectChain();
      return;
    }
    
    if (!isApprovedForAll) {
      toast.error("Please approve NFTs first");
      return;
    }
    
    setIsStaking(true);
    
    try {
      // Convert days to seconds
      const lockTime = lockDuration * 24 * 60 * 60;
      
      await writeStake({
        address: STAKING_CONFIG.LOCKER_CONTRACT_ADDRESS as `0x${string}`,
        abi: lockerAbi,
        functionName: "lockBatchERC721",
        args: [
          STAKING_CONFIG.NFT_CONTRACT_ADDRESS as `0x${string}`,
          tokenIds.map(id => BigInt(id)),
          BigInt(lockTime),
        ],
      });
      
      toast.success("Staking transaction submitted");
      
    } catch (error) {
      console.error("Staking failed:", error);
      toast.error("Failed to stake NFTs");
      setIsStaking(false);
    }
  }, [address, isCorrectChain, isApprovedForAll, switchToCorrectChain, writeStake]);
  
  // Unstake NFTs
  const unstakeNFTs = useCallback(async (tokenIds: string[]) => {
    if (!address) {
      toast.error(WALLET_NOT_CONNECTED_MESSAGE);
      return;
    }
    
    if (!isCorrectChain) {
      await switchToCorrectChain();
      return;
    }
    
    setIsUnstaking(true);
    
    try {
      await writeUnstake({
        address: STAKING_CONFIG.LOCKER_CONTRACT_ADDRESS as `0x${string}`,
        abi: lockerAbi,
        functionName: "unlockBatchERC721",
        args: [
          STAKING_CONFIG.NFT_CONTRACT_ADDRESS as `0x${string}`,
          tokenIds.map(id => BigInt(id)),
        ],
      });
      
      toast.success("Unstaking transaction submitted");
      
    } catch (error) {
      console.error("Unstaking failed:", error);
      toast.error("Failed to unstake NFTs");
      setIsUnstaking(false);
    }
  }, [address, isCorrectChain, switchToCorrectChain, writeUnstake]);
  
  // Update loading states when transactions complete
  useEffect(() => {
    if (!isApproveLoading && isApproving) {
      setIsApproving(false);
      if (approveHash) {
        toast.success("NFTs approved successfully!");
      }
    }
  }, [isApproveLoading, isApproving, approveHash]);
  
  useEffect(() => {
    if (!isStakeLoading && isStaking) {
      setIsStaking(false);
      if (stakeHash) {
        toast.success("NFTs staked successfully!");
      }
    }
  }, [isStakeLoading, isStaking, stakeHash]);
  
  useEffect(() => {
    if (!isUnstakeLoading && isUnstaking) {
      setIsUnstaking(false);
      if (unstakeHash) {
        toast.success("NFTs unstaked successfully!");
      }
    }
  }, [isUnstakeLoading, isUnstaking, unstakeHash]);
  
  return {
    // State
    isApproved: !!isApprovedForAll,
    isApproving: isApproving || isApproveLoading,
    isStaking: isStaking || isStakeLoading,
    isUnstaking: isUnstaking || isUnstakeLoading,
    
    // Actions
    approveNFTs,
    stakeNFTs,
    unstakeNFTs,
    checkApproval,
    
    // Chain management
    switchToCorrectChain,
    isCorrectChain,
  };
}
