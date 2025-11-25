/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import { erc721Abi, getAddress } from "viem";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { mainnet, mantaSepoliaTestnet } from "wagmi/chains";

import {
  fetchBatchNFTMetadata,
  fetchUserNFTs,
} from "@/app/(staking)/actions/staking.actions";
import { useWallet } from "@/components/providers/Wallet.provider";
import { type ProcessedNFT } from "@/types/staking";
import { getRarityRank } from "@/utils/beeOsRarity.constants";
import { STAKING_CONFIG } from "@/utils/constants";

import { lockerAbi } from "./lockerAbi";

// Use the proper API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Types (keeping the existing ones for compatibility)
export enum NFT_RARITY {
  COMMON = "Common",
  RARE = "Rare",
  LEGENDARY = "Legendary",
  MYTHIC = "Mythic",
}

export interface IArenaNFTResult {
  payload: { name: string; logo: string; tokenId: string };
  traits: { value: NFT_RARITY }[];
  unlockTime?: string;
  canUnlock?: boolean;
  createdAt?: string;
  isExternal?: boolean;
}

export interface IBeeOsResult {
  arenaData?: IArenaNFTResult;
  animation_url?: null;
  external_app_url?: null;
  id: string;
  image_url: string;
  token_id?: string;
  isExternal?: boolean;
}

const NFT_RARITY_MAP = {
  [NFT_RARITY.COMMON]: 1,
  [NFT_RARITY.RARE]: 2,
  [NFT_RARITY.LEGENDARY]: 4,
  [NFT_RARITY.MYTHIC]: 10,
};

export const useBeeOsStakingOld = (): {
  beeOsResults: IBeeOsResult[];
  beeOsResultsLocked: IArenaNFTResult[];
  selectedNFTs: IBeeOsResult[];
  setSelectedNFTs: React.Dispatch<React.SetStateAction<IBeeOsResult[]>>;
  selectedNFTsLocked: string[];
  setSelectedNFTsLocked: React.Dispatch<React.SetStateAction<string[]>>;
  isOpenStakeModal: boolean;
  setIsOpenStakeModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingBeeOs: boolean;
  days: number;
  setDays: React.Dispatch<React.SetStateAction<number>>;
  approveAllNft: () => Promise<void>;
  lockNFTs: () => Promise<void>;
  unlockNFTs: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  isLoadingApprove: boolean;
  isSuccessApprove: boolean;
  isLoadingUnlock: boolean;
  rewardedNft: number;
  youWillGetXp: number;
  youWillGetPerDay: number;
  address?: string;
  unlocked: { xp?: number } | undefined;
  lockedByAddress: any;
} => {
  const isTestnet = process.env.NEXT_PUBLIC_IS_TESTNET === "true";
  const LOCK_CONTRACT = STAKING_CONFIG.LOCKER_CONTRACT_ADDRESS;
  const NFT_COLLECTION = STAKING_CONFIG.NFT_CONTRACT_ADDRESS;

  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { isConnected } = useWallet();

  const [beeOsResults, setBeeOsResults] = useState<IBeeOsResult[]>([]);
  const [beeOsResultsLocked, setBeeOsResultsLocked] = useState<
    IArenaNFTResult[]
  >([]);
  const [selectedNFTs, setSelectedNFTs] = useState<IBeeOsResult[]>([]);
  const [selectedNFTsLocked, setSelectedNFTsLocked] = useState<string[]>([]);
  const [isOpenStakeModal, setIsOpenStakeModal] = useState(false);
  const [isLoadingBeeOs, setIsLoadingBeeOs] = useState(false);
  const [days, setDays] = useState(30);

  // Queries - Updated to use new API endpoints
  const { data: locked } = useQuery({
    queryKey: ["locked", address],
    queryFn: async (): Promise<
      { nftIds: string[]; createdAt: string; isLocked?: boolean }[]
    > => {
      if (!address) return [];
      const res = await fetch(
        `${API_BASE_URL}/api/v1/nft-staking/locked?walletAddress=${getAddress(
          address
        )}`
      );
      if (!res.ok) {
        console.error("Failed to fetch locked NFTs");
        return [];
      }
      return res.json();
    },
    enabled: !!address,
    refetchOnWindowFocus: true,
  });

  // Updated to use the new API endpoint for unlocked NFTs
  const { data: unlocked } = useQuery({
    queryKey: ["unlocked", address],
    queryFn: async (): Promise<{ xp?: number; totalXp?: string }> => {
      if (!address) return {};
      const res = await fetch(
        `${API_BASE_URL}/api/v1/nft-staking/unlocked?walletAddress=${getAddress(
          address
        )}`
      );
      if (!res.ok) {
        console.error("Failed to fetch unlocked NFTs");
        return {};
      }
      const data = await res.json();
      // Convert totalXp to number for compatibility
      return {
        xp: data.totalXp ? parseFloat(data.totalXp) : undefined,
        totalXp: data.totalXp,
      };
    },
    enabled: !!address,
    refetchOnWindowFocus: true,
  });

  const lockedByAddress = useReadContract({
    abi: lockerAbi,
    address: LOCK_CONTRACT as `0x${string}`,
    functionName: "getLocksByAddress",
    args: address
      ? [NFT_COLLECTION as `0x${string}`, getAddress(address)]
      : undefined,
  });

  // Transactions
  const { data: hash, writeContract } = useWriteContract();
  const { data: hashApprove, writeContract: writeContractApprove } =
    useWriteContract();
  const { data: hashUnlock, writeContract: writeContractUnlock } =
    useWriteContract();

  // Approve
  const approveAllNft = useCallback(async (): Promise<void> => {
    if (!address) return;
    writeContractApprove({
      address: NFT_COLLECTION as `0x${string}`,
      abi: erc721Abi,
      functionName: "setApprovalForAll",
      args: [LOCK_CONTRACT as `0x${string}`, true],
      chain: isTestnet ? mantaSepoliaTestnet : mainnet,
      account: getAddress(address),
    });
  }, [NFT_COLLECTION, LOCK_CONTRACT, isTestnet, address, writeContractApprove]);

  // Stake
  const lockTime = 60 * 60 * 24 * days;
  const lockNFTs = useCallback(async (): Promise<void> => {
    if (!address || selectedNFTs.length === 0) return;
    writeContract({
      address: LOCK_CONTRACT as `0x${string}`,
      abi: lockerAbi,
      functionName: "lockBatchERC721",
      args: [
        NFT_COLLECTION as `0x${string}`,
        selectedNFTs.map((item) => BigInt(item.id)),
        BigInt(lockTime),
      ],
      chain: isTestnet ? mantaSepoliaTestnet : mainnet,
      account: getAddress(address),
    });
  }, [
    LOCK_CONTRACT,
    NFT_COLLECTION,
    selectedNFTs,
    lockTime,
    isTestnet,
    address,
    writeContract,
  ]);

  // Unstake
  const unlockNFTs = useCallback(() => {
    if (!address || selectedNFTsLocked.length === 0) return;
    writeContractUnlock({
      address: LOCK_CONTRACT as `0x${string}`,
      abi: lockerAbi,
      functionName: "unlockBatchERC721",
      args: [
        NFT_COLLECTION as `0x${string}`,
        selectedNFTsLocked.map((id) => BigInt(id)),
      ],
      chain: isTestnet ? mantaSepoliaTestnet : mainnet,
      account: getAddress(address),
    });
  }, [
    LOCK_CONTRACT,
    NFT_COLLECTION,
    selectedNFTsLocked,
    isTestnet,
    address,
    writeContractUnlock,
  ]);

  const getNFTList = useCallback(
    async (userAddress?: string): Promise<void> => {
      if (!userAddress) {
        setBeeOsResults([]);
        return;
      }
      setIsLoadingBeeOs(true);
      try {
        const { nfts } = await fetchUserNFTs(userAddress);

        const convertedResults: IBeeOsResult[] = nfts.map(
          (nft: ProcessedNFT) => {
            const localRarity = getRarityRank(nft.tokenId);
            const finalRarity =
              localRarity;

            return {
              id: nft.tokenId,
              token_id: nft.tokenId,
              image_url: nft.image,
              animation_url: null,
              external_app_url: null,
              arenaData: {
                payload: {
                  name: nft.name,
                  logo: nft.image,
                  tokenId: nft.tokenId,
                },
                traits: [
                  {
                    value: finalRarity,
                  },
                ],
              },
            };
          }
        );

        setBeeOsResults(convertedResults);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setBeeOsResults([]);
      } finally {
        setIsLoadingBeeOs(false);
      }
    },
    [NFT_COLLECTION]
  );

  const getLockedNFTs = useCallback(async (): Promise<void> => {
    const resultsLocked: IArenaNFTResult[] = [];
    const lockedNftId = locked?.flatMap((item) => item.nftIds) || [];
    console.log("Locked NFT IDs:", lockedNftId);
    const tokenItemsWithTime = (lockedByAddress?.data as any[])
      ?.filter((item) => item?.isLocked)
      ?.map((item: any) => ({
        tokenId: `${item.tokenId}`.replace(/n/g, ""),
        unlockTime: item.unlockTime,
      }));

    if (address && tokenItemsWithTime && tokenItemsWithTime.length > 0) {
      try {
        const tokenIds = tokenItemsWithTime.map((item: any) => item.tokenId);
        const { nfts } = await fetchBatchNFTMetadata(tokenIds);

        console.log("Fetched locked NFTs metadata:", nfts);

        nfts.forEach((nft: ProcessedNFT) => {
          const tokenItem = tokenItemsWithTime.find(
            (item: any) => item.tokenId === nft.tokenId
          );

          const isExternalNft = lockedNftId.some(
            (id) => id !== tokenItem?.tokenId
          );

          const localRarity = getRarityRank(nft.tokenId);

          const finalRarity =
            localRarity;

          resultsLocked.push({
            payload: {
              name: nft.name,
              logo: nft.image,
              tokenId: nft.tokenId,
            },
            traits: [
              {
                value: finalRarity,
              },
            ],
            createdAt: locked?.find((lockedItem: any) =>
              lockedItem.nftIds.includes(nft.tokenId)
            )?.createdAt,
            unlockTime: tokenItem?.unlockTime?.toString(),
            canUnlock: isExternalNft
              ? true
              : tokenItem?.unlockTime &&
                new Date().getTime() >
                  new Date(Number(tokenItem.unlockTime) * 1000).getTime(),
          });
        });

        setBeeOsResultsLocked(resultsLocked);
      } catch (error) {
        console.error("Error fetching locked NFT metadata:", error);
        setBeeOsResultsLocked([]);
      }
    }
  }, [lockedByAddress?.data, locked, address, NFT_COLLECTION]);

  // XP and rewards calculations
  const rewardedNft =
    (beeOsResultsLocked &&
      beeOsResultsLocked
        ?.map((item: any) => {
          const rarity = (item.traits?.[0]?.value ||
            NFT_RARITY.COMMON) as NFT_RARITY;
          const rarityValue =
            NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];

          return (
            (rarityValue *
              (new Date().getTime() -
                new Date(item.createdAt || "").getTime())) /
            (1000 * 60 * 60 * 24)
          );
        })
        ?.filter((val: number) => val)
        ?.reduce((acc: number, curr: number) => acc + curr, 0)) ||
    0;

  const youWillGetXp =
    selectedNFTs
      ?.map((item: any) => {
        const rarity = (item?.arenaData?.traits?.[0]?.value ||
          NFT_RARITY.COMMON) as NFT_RARITY;
        return NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];
      })
      .reduce((acc: number, curr: number) => acc + curr, 0) * days || 0;

  const youWillGetPerDay =
    beeOsResultsLocked
      ?.map((item: any) => {
        const rarity = (item?.traits?.[0]?.value ||
          NFT_RARITY.COMMON) as NFT_RARITY;
        return NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];
      })
      .reduce((acc: number, curr: number) => acc + curr, 0) || 0;

  // Chain switching and initialization
  const isCorrectChain =
    chain?.id === (isTestnet ? mantaSepoliaTestnet : mainnet).id;
  const handleSwitchChain = useCallback(async (): Promise<void> => {
    if (!isConnected || !address) return;

    if (!isCorrectChain && switchChainAsync) {
      const chainObj = isTestnet ? mantaSepoliaTestnet : mainnet;
      try {
        await switchChainAsync({
          chainId: chainObj.id,
        });
      } catch (error) {
        console.error("Error switching chain:", error);
      }
    }
    void getNFTList(address);
  }, [
    isCorrectChain,
    isTestnet,
    switchChainAsync,
    getNFTList,
    address,
    isConnected,
  ]);

  // Effects
  useEffect(() => {
    void handleSwitchChain();
  }, [address, chain?.id]);

  useEffect(() => {
    void getNFTList(address);
  }, [address, locked]);

  useEffect(() => {
    if (locked && locked?.length > 0) {
      void lockedByAddress.refetch();
    }
  }, [locked, address]);


  useEffect(() => {
    if (locked && locked?.length > 0 && lockedByAddress?.data) {
      void getLockedNFTs();
    }
  }, [lockedByAddress?.data, locked]);

  // After stake - Updated to use new API endpoint
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash && days > 0) {
      const lockTimeTimestamp = Math.floor(Date.now() / 1000) + lockTime;
      void fetch(`${API_BASE_URL}/api/v1/nft-staking/lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hash,
          lockTime: lockTimeTimestamp,
        }),
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        } else {
          console.error("Failed to record lock transaction");
        }
      });
    }
  }, [isSuccess, hash, days, lockTime]);

  // After approve
  const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } =
    useWaitForTransactionReceipt({ hash: hashApprove });

  // After unstake - Updated to use new API endpoint
  const { isLoading: isLoadingUnlock, isSuccess: isSuccessUnlock } =
    useWaitForTransactionReceipt({ hash: hashUnlock });

  useEffect(() => {
    if (isSuccessUnlock && hashUnlock) {
      void fetch(`${API_BASE_URL}/api/v1/nft-staking/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash: hashUnlock }),
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        } else {
          console.error("Failed to record unlock transaction");
        }
      });
    }
  }, [hashUnlock, isSuccessUnlock]);

  // Return all needed for UI
  return {
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
    unlocked,
    lockedByAddress,
  };
};
