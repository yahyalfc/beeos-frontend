import { SpeedInsights } from "@vercel/speed-insights/next";

import { FooterGeneral } from "@/components/features/Footer/FooterGeneral";
import { HeaderGeneral } from "@/components/features/Header/HeaderGeneral";
import { Toaster } from "@/components/shared/UI/Sonner/sonner";

export const metadata = {
  title: "Staking - Arena",
  description: "Stake your NFTs and earn rewards on Arena.",
};

export const revalidate = 0; 
export const dynamic = "force-dynamic";

export default function StakingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />

      <Toaster />
      <div>
        <HeaderGeneral />
        {children}
        <FooterGeneral />
      </div>
    </>
  );
}
