"use client";

import { type FC, useCallback, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "@/components/features/MainPage/HeroMain/HeroMain";
import { useLoading } from "@/components/providers/LoadingProvider";
import { HeaderCenterBlock } from "@/components/shared/HeaderItems/HeaderCenterBlock";
import { HeaderLeftSideBlock } from "@/components/shared/HeaderItems/HeaderLeftSideBlock";
import { HeaderRightBlock } from "@/components/shared/HeaderItems/HeaderRightBlock";
import { HeaderVectorInterface } from "@/components/shared/Interfaces/VectorInterfaces/HeaderVectorInterface";
import { HeaderBlockSeparator } from "@/components/shared/Separators/HeaderSeparator";

import { HeaderMenu } from "./HeaderMenu";

export const Header: FC = () => {
  const { isLoaded } = useLoading();
  const headerRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (headerRef.current == null || !isLoaded) return;

      gsap.set([headerRef.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.8,
      });

      tl.to(headerRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "sine.inOut",
      });

      return () => {
        tl.kill();
      };
    },
    {
      scope: headerRef,
      dependencies: [isLoaded],
    }
  );

  const handleOpenMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <HeaderMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 w-screen z-[9000] h-[var(--header-height)] pt-[var(--interface-padding)] sm:pt-0 opacity-0"
      >
        <div className="container px-[calc(var(--interface-padding)+var(--interface-border-w)+1px)] md:border-none md:px-[var(--interface-corners-y-value)] flex flex-row items-start">
          {/* Angles for the sides */}
          <HeaderVectorInterface />

          {/* Left Block */}
          <div className="flex flex-row flex-1 md:flex-initial">
            <HeaderBlockSeparator className="w-12 !border-l-0 hidden md:block" />
            <HeaderLeftSideBlock onMenuClick={handleOpenMenu} />
          </div>

          {/* Interface UI part */}
          <HeaderBlockSeparator className="hidden md:block" />

          {/* Center Block */}
          <HeaderCenterBlock />

          {/* Interface UI part */}
          <HeaderBlockSeparator className="hidden md:block" />

          {/* Actions */}
          <div className="flex flex-row flex-1 md:flex-initial">
            <HeaderRightBlock />
            <HeaderBlockSeparator className="w-12 min-w-12 !border-r-0 hidden md:block" />
          </div>
        </div>
      </header>
    </>
  );
};
