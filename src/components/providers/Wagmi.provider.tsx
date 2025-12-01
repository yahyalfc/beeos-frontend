"use client";

import React, { type ReactNode } from "react";

import { type AppKitNetwork } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider } from "wagmi";

import { projectId, wagmiAdapter, networks } from "@/utils/config";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "BeeOS Launchpad",
  description: "BeeOs Launchpad",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks as [AppKitNetwork, ...AppKitNetwork[]],
  defaultNetwork: networks[0],
  metadata,
  features: {
    socials: false,
    email: false,
  },
});

export default function WagmiContextProvider({
  children,
  cookies,
}: Readonly<{
  children: ReactNode;
  cookies: string | null;
}>) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      {children}
    </WagmiProvider>
  );
}
