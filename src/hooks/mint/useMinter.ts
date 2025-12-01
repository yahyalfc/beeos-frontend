import { useState, useEffect } from "react";

import { arbitrum } from "@reown/appkit/networks";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { getAddress } from "viem";
import { useReadContract, useWriteContract } from "wagmi";

import { checkMerkleList, getMerkleProof } from "@/lib/api/externalApi";
import { config } from "@/utils/config";
import { THREES_NAMES_CHECK } from "@/utils/mint.constants";

import MinterABI from "./EarnVerseMinter1.abi.json";
import { type PropStamp } from "./useMintCountdown";

export const contractAddress = "0x3642E2C6df7228a82bA9FB8bca0765D5643Df800";
export const AMOUNT_NFT = 5555;

export enum PHASES {
  WHITELIST = "whitelist",
  WAITLIST = "waitlist",
  PUBLIC = "public",
  PRE_PHASE = "prePhase",
}

export const useMinter = () => {
  const { address, isConnected } = useAppKitAccount();
  const [isMinted, setIsMinted] = useState(false);
  const [userPhase, setUserPhase] = useState<PHASES>(PHASES.PRE_PHASE);

  const { writeContract, writeContractAsync } = useWriteContract();

  // TanStack Query mutations
  const checkMerkleListMutation = useMutation({
    mutationFn: checkMerkleList,
  });

  const getMerkleProofMutation = useMutation({
    mutationFn: getMerkleProof,
  });

  // Read contract data
  const {
    data: supplyRemains,
    isLoading: isLoadingSupply,
    error,
    isError,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: MinterABI,
    functionName: "supplyRemains",
    chainId: arbitrum.id,
  });

  const {
    data: gtdTimestamp,
    isLoading: isLoadingGtd,
    refetch: refetchGtd,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: MinterABI,
    functionName: "startGTD",
    chainId: arbitrum.id,
  });

  const {
    data: waitTimestamp,
    isLoading: isLoadingWait,
    refetch: refetchWait,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: MinterABI,
    functionName: "startWait",
    chainId: arbitrum.id,
  });

  const {
    data: publicTimestamp,
    isLoading: isLoadingPublic,
    refetch: refetchPublic,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: MinterABI,
    functionName: "startPublic",
    chainId: arbitrum.id,
  });

  const checkUserAddress = async () => {
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    if (address && ethereumAddressRegex.test(address)) {
      const checkedAddress = getAddress(address);

      try {
        const resWhiteList = await checkMerkleListMutation.mutateAsync({
          wallet: checkedAddress,
          treeName: THREES_NAMES_CHECK.WHITELIST,
        });

        const resWaitList = await checkMerkleListMutation.mutateAsync({
          wallet: checkedAddress,
          treeName: THREES_NAMES_CHECK.WAITLIST,
        });

        if (resWhiteList.whitelisted) {
          return PHASES.WHITELIST;
        } else if (resWaitList.whitelisted) {
          return PHASES.WAITLIST;
        } else {
          return PHASES.PUBLIC;
        }
      } catch (error) {
        console.error("Error checking user address:", error);
        return null;
      }
    } else {
      return null;
    }
  };

  const readSupplyAmount = async (): Promise<bigint | undefined> => {
    const res: bigint | undefined = (await readContract(config, {
      address: contractAddress as `0x${string}`,
      abi: MinterABI,
      functionName: "supplyRemains",
      chainId: arbitrum.id,
    })) as bigint;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (res != undefined) {
      return res;
    }
    return BigInt(AMOUNT_NFT);
  };

  const readPublicPhase = async (): Promise<bigint | undefined> => {
    const res: bigint | undefined = (await readContract(config, {
      address: contractAddress as `0x${string}`,
      abi: MinterABI,
      functionName: "claimed",
      chainId: arbitrum.id,

      args: [address],
    })) as bigint;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (res != undefined) {
      return res;
    }
    return BigInt(0);
  };

  const readWaitWhitePhases = async (): Promise<boolean> => {
    const res = await readContract(config, {
      address: contractAddress as `0x${string}`,
      abi: MinterABI,
      functionName: "claimed",
      chainId: arbitrum.id,

      args: [address],
    });

    return !!res;
  };

  const readContractClaim = async (
    currentPhase: PHASES | null
  ): Promise<boolean> => {
    const resWhiteWaitphase = await readWaitWhitePhases();
    const resPublic = await readPublicPhase();

    if (resWhiteWaitphase && currentPhase !== PHASES.PUBLIC) {
      setIsMinted(true);
      return true;
    }

    if (currentPhase === PHASES.PUBLIC && resPublic && resPublic >= BigInt(1)) {
      setIsMinted(true);
      return true;
    }

    return false;
  };

  const mint = async (phase: PHASES | null) => {
    if (!address || !phase)
      return { success: false, error: "No address or phase" };

    const supplyRe = await readSupplyAmount();
    if (supplyRe && supplyRe <= BigInt(0)) {
      return { success: false, error: "Sold out" };
    }

    const isWhitelisted = await checkUserAddress();
    const alreadyMinted = await readContractClaim(phase);
    if (alreadyMinted) {
      return { success: false, error: "Already minted" };
    }

    if (!isWhitelisted) {
      return { success: false, error: "Not whitelisted" };
    }

    try {
      if (phase === PHASES.WHITELIST && isWhitelisted === PHASES.WHITELIST) {
        const correctAddress = getAddress(address);
        const merkleProof = await getMerkleProofMutation.mutateAsync({
          wallet: correctAddress,
          treeName: THREES_NAMES_CHECK.WHITELIST,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (supplyRemains && merkleProof) {
          writeContract({
            address: contractAddress as `0x${string}`,
            abi: MinterABI,
            functionName: "mintWithProof",
            args: [merkleProof.proof],
            chainId: arbitrum.id,
          });
          return { success: true };
        }
      } else if (
        phase === PHASES.WAITLIST &&
        (isWhitelisted === PHASES.WAITLIST ||
          isWhitelisted === PHASES.WHITELIST)
      ) {
        const correctAddress = getAddress(address);
        const merkleProof = await getMerkleProofMutation.mutateAsync({
          wallet: correctAddress,
          treeName: THREES_NAMES_CHECK.WAITLIST,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (supplyRemains && merkleProof) {
          writeContract({
            address: contractAddress as `0x${string}`,
            abi: MinterABI,
            functionName: "mintWithProof",
            args: [merkleProof.proof],
            chainId: arbitrum.id,
          });
          return { success: true };
        }
      } else if (phase === PHASES.PUBLIC) {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: MinterABI,
          functionName: "mintPublic",
          chainId: arbitrum.id,
        });
        return { success: true };
      }
    } catch {
      return { success: false, error: "Transaction failed" };
    }

    return { success: false, error: "Unknown error" };
  };

  const setDefaultPermission = async () => {
    const permission = await checkUserAddress();
    if (permission === PHASES.WHITELIST) {
      setUserPhase(PHASES.WHITELIST);
    } else if (permission === PHASES.WAITLIST) {
      setUserPhase(PHASES.WAITLIST);
    }
  };

  const refetchTimestamps = async () => {
    await refetchGtd();
    await refetchWait();
    await refetchPublic();
  };

  useEffect(() => {
    if (!isConnected || !address) {
      setIsMinted(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    const checkMintedStatus = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (isConnected && address && userPhase) {
        try {
          await readContractClaim(userPhase);
        } catch (error) {
          console.error("Error checking minted status:", error);
        }
      }
    };

    void checkMintedStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected, userPhase]);

  const isLoading =
    isLoadingSupply ||
    isLoadingGtd ||
    isLoadingWait ||
    isLoadingPublic ||
    checkMerkleListMutation.isPending ||
    getMerkleProofMutation.isPending;

  const nftCount =
    supplyRemains && !isLoadingSupply
      ? AMOUNT_NFT - +(supplyRemains as bigint).toString().replace("n", "")
      : 0;

  return {
    // State
    isMinted,
    userPhase,
    nftCount,

    // Contract data
    supplyRemains,
    gtdTimestamp: gtdTimestamp as PropStamp,
    waitTimestamp: waitTimestamp as PropStamp,
    publicTimestamp: publicTimestamp as PropStamp,

    // Loading states
    isLoading,
    error,
    isError,

    // Actions
    mint,
    checkUserAddress,
    readContractClaim,
    setDefaultPermission,
    refetchTimestamps,
    writeContractAsync,
  };
};
