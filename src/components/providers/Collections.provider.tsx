"use client";
import React, {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";

import { toast } from "sonner";

import { useInitializeCollectionUser } from "@/hooks/mutations/use-user-mutations";
import { useCollections } from "@/hooks/queries/useCollections";
import { useCollectionsUser } from "@/hooks/queries/useUsers";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { type Collection } from "@/types/collections";
import { type CompletedTask } from "@/types/tasks";
import { QUERIES, REFCODE_COLLECTION } from "@/utils/constants";

import { useWallet } from "./Wallet.provider";

// Context value type

interface CollectionProfileContext {
  referralCount: number;
  referralCode: string;
  xp: number;
}

interface CollectionsContextValue {
  collectionData: Collection | undefined;
  completedTasks: CompletedTask[] | null;
  collectionProfile: CollectionProfileContext | null;
  isLoading: boolean;
  error: Error | null;
  refetch?: () => void;
}

const CollectionSingleContext = createContext<
  CollectionsContextValue | undefined
>(undefined);

interface CollectionsProviderProps {
  collectionId: string;
  children: ReactNode;
}

// Provider component
export const CollectionSingleProvider: React.FC<CollectionsProviderProps> = ({
  collectionId,
  children,
}) => {
  const { isConnected, walletAddress } = useWallet();

  const { getParams, deleteAllParams } = useSearchQuery();
  const [currentCollection, setCurrentCollection] = useState<
    Collection | undefined
  >();
  const [collectionProfile, setCollectionProfile] =
    useState<CollectionProfileContext | null>(null);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[] | null>(
    null
  );

  const refCodeParam = getParams(QUERIES.REFERRAL_START);

  // Queries
  const { data: collectionUserData, isLoading: isCollectionUserLoading } =
    useCollectionsUser({
      enabled: Boolean(isConnected && walletAddress),
    });

  const {
    data: allCollectionsData,
    isLoading,
    error,
    refetch,
  } = useCollections(undefined);

  // Mutations
  const initCollectionUserMutation = useInitializeCollectionUser();

  // Helpers
  const resetNestedState = () => {
    setCompletedTasks(null);
    setCollectionProfile(null);
  };

  const formRefCode = (collectionId: string) => {
    return `${REFCODE_COLLECTION}${collectionId}`;
  };

  // handling refCode
  useEffect(() => {
    if (refCodeParam && currentCollection) {
      localStorage.setItem(formRefCode(currentCollection.id), refCodeParam);
      deleteAllParams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCodeParam, currentCollection]);

  // activation of account in collections
  useEffect(() => {
    const isWalletExist = Boolean(isConnected && walletAddress);

    const initUserCollectionFn = async (collectionId: string) => {
      const refCode = localStorage.getItem(formRefCode(collectionId));

      const res = await initCollectionUserMutation.mutateAsync({
        collectionId,
        refCode,
      });

      if (!res.id) {
        toast.error("Something went wrong! Please try again later ;(");
      }
    };

    if (collectionUserData && currentCollection && isWalletExist) {
      const neededCollectionUser = collectionUserData.find(
        (coll) => coll.project.id === currentCollection.id
      );

      if (neededCollectionUser) {
        setCompletedTasks(neededCollectionUser.completedTasks);
        setCollectionProfile({
          xp: neededCollectionUser.xp,
          referralCount: neededCollectionUser.referralCount,
          referralCode: neededCollectionUser.id,
        });
      } else {
        void initUserCollectionFn(currentCollection.id);
      }

      return;
    }
    resetNestedState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionUserData, currentCollection, isConnected, walletAddress]);

  useEffect(() => {
    if (allCollectionsData) {
      const currentCollection = allCollectionsData.find(
        (c) => c.id === collectionId
      )!;
      setCurrentCollection(currentCollection);
    }
  }, [allCollectionsData, collectionId]);

  const value: CollectionsContextValue = {
    collectionData: currentCollection,
    collectionProfile,
    completedTasks,
    isLoading: isCollectionUserLoading || isLoading,
    error,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    refetch,
  };

  return (
    <CollectionSingleContext.Provider value={value}>
      {children}
    </CollectionSingleContext.Provider>
  );
};

// Custom hook to consume the context
export const useCollectionSingleContext = (): CollectionsContextValue => {
  const context = useContext(CollectionSingleContext);

  if (context === undefined) {
    throw new Error(
      "useCollectionsContext must be used within a CollectionsProvider"
    );
  }

  return context;
};

export { CollectionSingleContext };
