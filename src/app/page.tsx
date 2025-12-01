"use client";

import { StaticTmpBackground } from "@/components/features/Backgrounds/StaticTmp";
import { MainScene } from "@/components/features/Canvas/MainBee.canvas";
import { MainLoading } from "@/components/features/Canvas/MainLoading";
import { Footer } from "@/components/features/Footer/Footer";
import { Header } from "@/components/features/Header/Header";
import { AssistantMain } from "@/components/features/MainPage/AssistantsMain/AssistantsMain";
import { BeeOsMain } from "@/components/features/MainPage/BeeOsMain/BeeOsMain";
import { HeroMain } from "@/components/features/MainPage/HeroMain/HeroMain";
import { LaunchpadMain } from "@/components/features/MainPage/LaunchpadMain/LaunchpadMain";
import { ScrollableInterface } from "@/components/features/MainPage/ScrollableInterface/ScrollableInterface";
import { SkelettMain } from "@/components/features/MainPage/SkelettMain/SkelettMain";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { VectorInterface } from "@/components/shared/Interfaces/VectorInterfaces/VectorInterface";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export default function Home() {
  useScrollToTop();

  return (
    <LoadingProvider>
      <Header />
      <MainLoading />
      <VectorInterface />
      <StaticTmpBackground />
      <main className="relative z-10">
        <MainScene />
        <HeroMain />
        <BeeOsMain />
        <AssistantMain />
        {/* <MarieAiMain /> */}
        {/* Skelett for fixed sections order */}
        <SkelettMain />
        {/* SCROLLABLE CONTENT */}
        <ScrollableInterface />
        <LaunchpadMain />
      </main>
      <Footer />
    </LoadingProvider>
  );
}
