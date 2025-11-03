import { type ReactNode } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Metadata } from "next";
import { Toaster } from "sonner";

import { FooterGeneral } from "@/components/features/Footer/FooterGeneral";
import { HeaderGeneral } from "@/components/features/Header/HeaderGeneral";

export const metadata: Metadata = {
  title: "Profile | BeeOS",
  description: "View your BeeOS profile, achievements, and activity",
};

export default function ProfileLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SpeedInsights />

      <Toaster />
      <div>
        <HeaderGeneral />
        <main className="relative min-h-screen bg-background">{children}</main>
        <FooterGeneral />
      </div>
    </>
  );
}
