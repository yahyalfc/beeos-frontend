/* eslint-disable sonarjs/no-commented-code */
import {
  type AppKitNetwork,
  base,
  // baseSepolia
} from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { injected } from "wagmi/connectors";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// const customBaseSepolia = {
//   ...baseSepolia,
//   rpcUrls: {
//     default: {
//       http: ["base-sepolia-rpc.publicnode.com"], // e.g., 'https://base-sepolia.infura.io/v3/YOUR_API_KEY'
//     },
//     public: {
//       http: ["base-sepolia-rpc.publicnode.com"],
//     },
//   },
// };

export const BASE_MAINNET_RPC_URL = "https://mainnet.base.org";

const customBase = {
  ...base,
  rpcUrls: {
    default: {
      http: [BASE_MAINNET_RPC_URL],
    },
    public: {
      http: [BASE_MAINNET_RPC_URL],
    },
  },
};

// export const networks: AppKitNetwork[] = [customBaseSepolia];
export const networks: AppKitNetwork[] = [customBase];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  connectors: [injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    // [baseSepolia.id]: http("base-sepolia-rpc.publicnode.com"),
    [base.id]: http(BASE_MAINNET_RPC_URL),
  },
});

export const config = wagmiAdapter.wagmiConfig;
