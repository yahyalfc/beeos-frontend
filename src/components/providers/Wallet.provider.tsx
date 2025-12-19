"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";

import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { toast } from "sonner";
import { useSignMessage } from "wagmi";

import {
  useGenerateSignUser,
  useInitializeUser,
} from "@/hooks/mutations/use-user-mutations";
import { useCreateWallet } from "@/hooks/mutations/useProfileMutations";
import { USER_KEY, CONNECTED_STATUS } from "@/utils/constants";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  token: string | null;
  isLoading: boolean;
  error: Error | null;
  isNeededSign: boolean;
  openConnectModal: () => Promise<void>;
  openAccountModal: () => Promise<void>;
  handleSignMessage: (address: string) => Promise<void>;
}

export const WALLET_CONNECT = "walletConnect";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: Readonly<WalletProviderProps>) {
  // Hooks
  const { isConnected, address } = useAppKitAccount();
  const { open } = useAppKit();
  const { signMessageAsync } = useSignMessage();
  const generateSignMutation = useGenerateSignUser();
  const initializeUserMutation = useInitializeUser();
  const { mutate: createWallet } = useCreateWallet();

  // States
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem(USER_KEY);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(USER_KEY);
    const connectiongStatus = localStorage.getItem(CONNECTED_STATUS);
    if (savedToken && connectiongStatus === "disconnected" && !isConnected) {
      localStorage.removeItem(USER_KEY);
    }
  }, [isConnected]);

  // Handle wallet connection when address changes
  useEffect(() => {
    const savedToken = localStorage.getItem(USER_KEY);

    if (isConnected && address && !savedToken) {
      void handleConnect(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const isNeededSign = isConnected && !token;

  const createWalletCallback = useCallback(
    async (walletAddress: string) => {
      return new Promise<void>((resolve, reject) => {
        createWallet(walletAddress, {
          onSuccess: () => {
            console.log(
              "Wallet created successfully for address:",
              walletAddress
            );
            resolve();
          },
          onError: (error) => {
            console.error("Failed to create wallet:", error);
            toast.error("Failed to create wallet");
            reject(error);
          },
        });
      });
    },
    [createWallet]
  );

  const handleSignMessage = useCallback(
    async (address: string) => {
      setIsLoading(true);
      setError(null);
      toast.message("Please sign message in your App!", {
        position: "top-center",
      });

      try {
        const messageResponse = await generateSignMutation.mutateAsync(address);
        const { message } = messageResponse;

        // Sign message
        const signature = await signMessageAsync({
          message,
          account: address as `0x${string}`,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!signature) {
          throw new Error("Failed to sign message");
        }

        // Initialize user
        const userResponse = await initializeUserMutation.mutateAsync({
          walletAddress: address,
          signature,
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!userResponse.user) {
          throw new Error("Failed to initialize user");
        }

        // Update state
        const jwtToken = userResponse.token;
        setToken(jwtToken);

        // Persist to localStorage
        localStorage.setItem(USER_KEY, jwtToken);

        // Create wallet after successful user initialization
        await createWalletCallback(address);

        toast.success("Authentication successful");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Authentication failed";
        setError(new Error(errorMessage));

        toast.error(`Authentication Failed: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    },
    [
      generateSignMutation,
      initializeUserMutation,
      signMessageAsync,
      createWalletCallback,
    ]
  );

  // Handle wallet connection
  const handleConnect = useCallback(
    async (address: string) => {
      try {
        const existingToken = localStorage.getItem(USER_KEY);
        if (existingToken) {
          setToken(existingToken);
          toast.success("Wallet Connected");
          return;
        }

        await handleSignMessage(address);
      } catch (error) {
        console.error("Connection error:", error);
      }
    },
    [handleSignMessage]
  );

  // Open the wallet selection modal
  const openConnectModal = useCallback(async () => {
    await open({ view: "Connect" });
  }, [open]);

  // Open the account modal
  const openAccountModal = useCallback(async () => {
    await open({ view: "Account" });
  }, [open]);

  const contextValue: WalletContextType = {
    isConnected,
    walletAddress: address ?? null,
    token,
    isLoading,
    error,
    isNeededSign,
    openAccountModal,
    openConnectModal,
    handleSignMessage,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Consumer hook
export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }

  return context;
}

// Optional: Export context for advanced use cases
export { WalletContext };
