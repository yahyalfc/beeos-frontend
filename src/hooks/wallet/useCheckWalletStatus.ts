import { useCallback } from "react";

import { toast } from "sonner";

import { type WALLET_STATUSES } from "@/utils/constants";

import { useCheckUserStatus } from "../mutations/use-user-mutations";

export interface CheckStatusParams {
  projectId: string;
  walletAddress?: string;
}

export interface CheckStatusResponse {
  status: WALLET_STATUSES;
  message?: string;
}

interface CheckWalletStatusProps {
  onSuccess?: (status: string) => void;
  onError?: () => void;
}

type CheckStatusFn = ({
  projectId,
  walletAddress,
}: CheckStatusParams) => Promise<WALLET_STATUSES | null>;

export const useCheckWalletStatus = ({
  onSuccess,
  onError,
}: CheckWalletStatusProps): CheckStatusFn => {
  const checkUserStatus = useCheckUserStatus();

  const checkStatus = useCallback(
    async ({
      projectId,
      walletAddress,
    }: CheckStatusParams): Promise<WALLET_STATUSES | null> => {
      try {
        const result = await checkUserStatus.mutateAsync({
          projectId,
          walletAddress,
        });
        onSuccess?.(result);
        return result;
      } catch (error) {
        onError?.();
        if (JSON.stringify(error).includes("429")) {
          toast.error(
            "Oops... There's too many requests coming from you, just wait a few minutes and try again!"
          );
          return null;
        }
        toast.error("Something went wrong! Try again later =(");
        return null;
      }
    },
    [checkUserStatus, onError, onSuccess]
  );

  return checkStatus;
};
