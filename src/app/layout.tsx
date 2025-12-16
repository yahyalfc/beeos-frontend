import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";

import "./globals.css";
import { TanstackProvider } from "@/components/providers/Tanstack.provider";
import WagmiContextProvider from "@/components/providers/Wagmi.provider";
import { WalletProvider } from "@/components/providers/Wallet.provider";
import { CustomCursor } from "@/components/shared/UI/Cursor/CustomCursor";

const tusker_grotesk = localFont({
  src: [
    { path: "./_fonts/TuskerGrotesk-3500Medium.ttf", weight: "500" },
    { path: "./_fonts/TuskerGrotesk-3600Semibold.ttf", weight: "600" },
    { path: "./_fonts/TuskerGrotesk-3700Bold.ttf", weight: "700" },
    { path: "./_fonts/TuskerGrotesk-3800Super.ttf", weight: "800" },
  ],
  variable: "--font-tusker",
  display: "swap",
});

const tusker_grotesk_exp = localFont({
  src: [
    { path: "./_fonts/TuskerGrotesk-4500Medium.ttf", weight: "500" },
    { path: "./_fonts/TuskerGrotesk-4600Semibold.ttf", weight: "600" },
    { path: "./_fonts/TuskerGrotesk-4700Bold.ttf", weight: "700" },
    { path: "./_fonts/TuskerGrotesk-4800Super.ttf", weight: "800" },
  ],
  variable: "--font-tusker-exp",
  display: "swap",
});

const geistInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeeOS NFT",
  description:
    "The Hive is Live. BeeOS is more than an NFT collection — it's a full-stack war machine for NFT trading.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = (await headers()).get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistInter.variable} ${tusker_grotesk.variable} ${tusker_grotesk_exp.variable} antialiased`}
      >
        {/* ALL PROVIDERS MUST BE INSIDE BODY */}
        <TanstackProvider>
          <WagmiContextProvider cookies={cookies}>
            <WalletProvider>
              <CustomCursor />
              {children}
              <SpeedInsights />
            </WalletProvider>
          </WagmiContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
