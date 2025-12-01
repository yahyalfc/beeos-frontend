import { SpeedInsights } from "@vercel/speed-insights/next";

import { FooterGeneral } from "@/components/features/Footer/FooterGeneral";
import { HeaderGeneral } from "@/components/features/Header/HeaderGeneral";
import { Toaster } from "@/components/shared/UI/Sonner/sonner";

export default function LaunchpadLayout({
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
