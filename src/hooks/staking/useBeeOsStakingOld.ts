/* eslint-disable sonarjs/no-dead-store */
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
import axios from "axios";
import { erc721Abi } from "viem";
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { mainnet, mantaSepoliaTestnet } from "wagmi/chains";

import { useWallet } from "@/components/providers/Wallet.provider";

import { lockerAbi } from "./lockerAbi";

// Use the API_BASE_URL as requested
const API_BASE_URL = process.env.NEXT_PUBLIC_API_MINT_URL ?? "";

// Types
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
}

export interface IBeeOsResult {
  arenaData?: IArenaNFTResult;
  animation_url?: null;
  external_app_url?: null;
  id: string;
  image_url: string;
  token_id?: string;
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
  const LOCK_CONTRACT = isTestnet
    ? "0x5027aF793b9f81aAF9A3850979Db905C1E86d2b4"
    : "0xf4EF525f4c6e7EbaDba5E6A42B69367faA97FD75";
  const NFT_COLLECTION = isTestnet
    ? "0x601914abf71cbaDcDCe9A7717594DFB50ED95027"
    : "0x5088F6c95Ee2E668907f153f709144ffc92D3abB";

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

  // Queries
  const { data: locked } = useQuery({
    queryKey: ["locked", address],
    queryFn: async (): Promise<
      { nftIds: string[]; createdAt: string; isLocked?: boolean }[]
    > => {
      if (!address) return [];
      const res = await fetch(
        `https://arenavs.com/api/get-locked?walletAddress=${address}`
      );
      return res.json();
    },
    enabled: !!address,
    refetchOnWindowFocus: true,
  });

  const { data: unlocked } = useQuery({
    queryKey: ["unlocked", address],
    queryFn: async (): Promise<{ xp?: number }> => {
      if (!address) return {};
      const res = await fetch(
        `https://arenavs.com/api/api/get-unlocked?walletAddress=${address}`
      );
      return res.json();
    },
    enabled: !!address,
    refetchOnWindowFocus: true,
  });

  const lockedByAddress = useReadContract({
    abi: lockerAbi,
    address: LOCK_CONTRACT as `0x${string}`,
    functionName: "getLocksByAddress",
    args: address ? [NFT_COLLECTION as `0x${string}`, address] : undefined,
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
      account: address,
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
      account: address,
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
      account: address,
    });
  }, [
    LOCK_CONTRACT,
    NFT_COLLECTION,
    selectedNFTsLocked,
    isTestnet,
    address,
    writeContractUnlock,
  ]);

  // Get NFT list
  const getNFTList = useCallback(
    async (userAddress?: string): Promise<void> => {
      if (!userAddress) {
        setBeeOsResults([]);
        return;
      }
      setIsLoadingBeeOs(true);
      try {
        const myNFTs = await axios.get<{ result: { token_id: string }[] }>(
          `https://arenavs.com/api/get-beeos-nft?walletAddress=${userAddress}`
        );
        const resultsBeeOs = myNFTs.data.result || [];
        let readyArenaReq = false;
        let offset = 0;
        const resultsArena: IArenaNFTResult[] = [];

        // Create axios instance for Arena API
        const arenaApi = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_URL || "",
        });

        while (!readyArenaReq && resultsBeeOs.length > 0) {
          const tokenIds = resultsBeeOs
            .slice(offset, offset + 50)
            .map((item) => item.token_id)
            .join(",");

          if (!tokenIds) {
            readyArenaReq = true;
            break;
          }

          const res = await arenaApi.get<{
            hasNextPage?: boolean;
            docs: IArenaNFTResult[];
          }>("/marketplace/token/collection-address", {
            params: {
              limit: 50,
              offset,
              tokenIds,
              collectionAddress: NFT_COLLECTION,
            },
          });

          resultsArena.push(...(res.data.docs || []));
          if (!res.data.hasNextPage || offset >= resultsBeeOs.length) {
            readyArenaReq = true;
          }
          offset += 50;
        }

        setBeeOsResults(
          resultsBeeOs.map((item) => ({
            ...item,
            image_url: "",
            token_id: item.token_id,
            id: item.token_id,
            arenaData: resultsArena.find(
              (arena) =>
                arena?.payload?.tokenId?.toString() ===
                item.token_id?.toString()
            ),
          }))
        );
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setBeeOsResults([]);
      } finally {
        setIsLoadingBeeOs(false);
      }
    },
    [NFT_COLLECTION]
  );

  // Get locked NFTs
  const getLockedNFTs = useCallback(async (): Promise<void> => {
    const resultsLocked: IArenaNFTResult[] = [];
    let readyLocked = false;
    let offset = 0;
    const lockedTokenIds = Array.from(
      new Set(locked?.map((item) => item.nftIds).flat() || [])
    );
    const tokenItemsWithTime = (lockedByAddress?.data as any[])
      ?.filter((item) => item?.isLocked)
      ?.map((item: any, index: number) => ({
        tokenId: lockedTokenIds[index],
        unlockTime: item.unlockTime,
      }));

    if (address && tokenItemsWithTime && tokenItemsWithTime.length > 0) {
      // Create axios instance for Arena API
      const arenaApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || "",
      });

      while (!readyLocked) {
        const tokenIdsToFetch = tokenItemsWithTime
          .slice(offset, offset + 50)
          .map((item: any) => item.tokenId)
          .join(",");

        if (!tokenIdsToFetch) {
          readyLocked = true;
          break;
        }

        const res = await arenaApi.get<{
          hasNextPage?: boolean;
          docs: IArenaNFTResult[];
        }>("/marketplace/token/collection-address", {
          params: {
            limit: 50,
            offset,
            tokenIds: tokenIdsToFetch,
            collectionAddress: NFT_COLLECTION,
          },
        });

        resultsLocked.push(
          ...(res.data.docs || []).map((item: any) => ({
            ...item,
            createdAt: locked?.find((lockedItem: any) =>
              lockedItem.nftIds.includes(item.payload.tokenId.toString())
            )?.createdAt,
            unlockTime: tokenItemsWithTime
              .find(
                (token: any) =>
                  token.tokenId.toString() === item.payload.tokenId.toString()
              )
              ?.unlockTime.toString(),
            canUnlock:
              new Date().getTime() >
              new Date(
                Number(
                  tokenItemsWithTime
                    .find(
                      (token: any) =>
                        token.tokenId.toString() ===
                        item.payload.tokenId.toString()
                    )
                    ?.unlockTime.toString()
                ) * 1000
              ).getTime(),
          }))
        );
        if (!res.data.hasNextPage || offset >= tokenItemsWithTime.length) {
          readyLocked = true;
        }
        offset += 50;
      }
      setBeeOsResultsLocked(resultsLocked);
    }
  }, [lockedByAddress?.data, locked, address, NFT_COLLECTION]);

  // XP and rewards
  const rewardedNft =
    (beeOsResultsLocked &&
      beeOsResultsLocked
        ?.map(
          (item: any) => {
            const rarity = (item.traits?.[0]?.value || NFT_RARITY.COMMON) as NFT_RARITY;
            const rarityValue = NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];
            return (rarityValue *
              (new Date().getTime() -
                new Date(item.createdAt || "").getTime())) /
            (1000 * 60 * 60 * 24);
          }
        )
        ?.reduce((acc: number, curr: number) => acc + curr, 0)) ||
    0;
  const youWillGetXp =
    selectedNFTs
      ?.map((item: any) => {
        const rarity = (item?.arenaData?.traits?.[0]?.value || NFT_RARITY.COMMON) as NFT_RARITY;
        return NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];
      })
      .reduce(
        (acc: number, curr: number) => acc + curr,
        0
      ) * days || 0;
  const youWillGetPerDay =
    beeOsResultsLocked
      ?.map((item: any) => {
        const rarity = (item?.traits?.[0]?.value || NFT_RARITY.COMMON) as NFT_RARITY;
        return NFT_RARITY_MAP[rarity] ?? NFT_RARITY_MAP[NFT_RARITY.COMMON];
      })
      .reduce(
        (acc: number, curr: number) => acc + curr,
        0
      ) || 0;

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

  // After stake
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash && days > 0) {
      void fetch(`${API_BASE_URL}/lock-beeos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash, lockTime }),
      }).then(() => {
        window.location.reload();
      });
    }
  }, [isSuccess, hash, days, lockTime]);

  // After approve
  const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } =
    useWaitForTransactionReceipt({ hash: hashApprove });

  // After unstake
  const { isLoading: isLoadingUnlock, isSuccess: isSuccessUnlock } =
    useWaitForTransactionReceipt({ hash: hashUnlock });

  useEffect(() => {
    if (isSuccessUnlock && hashUnlock) {
      void fetch(`${API_BASE_URL}/unlock-beeos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash: hashUnlock }),
      }).then(() => {
        window.location.reload();
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
