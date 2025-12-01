"use client";

import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "@/components/features/MainPage/HeroMain/HeroMain";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { RightTriangle } from "../../UI/RightTriangle/RightTriangle";

export const VectorInterface: FC = ({}) => {
  const { isLoaded } = useLoading();
  const interfaceRef = useRef<HTMLDivElement>(null);

  const {isMobile} = useDeviceDetection();

  useGSAP(() => {
    if (!interfaceRef.current || !isLoaded) return;
    
    gsap.set([interfaceRef.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({
      delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.8,
    });

    tl.to(interfaceRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, {
    scope: interfaceRef,
    dependencies: [isLoaded],
  });

  return (
    <div
      ref={interfaceRef}
      className="fixed z-[8500] top-0 left-0 w-full h-full pointer-events-none md:border-ring md:border-solid opacity-0"
      style={{
        borderWidth: !isMobile ? "var(--interface-border-w)" : 0,
      }}
    >
      {/* Left side + connection agnle */}
      <div
        className="absolute left-[var(--interface-padding)] top-[calc(var(--header-height)-1px)]  sm:top-[var(--interface-corners-top-value)] bottom-[var(--interface-corners-bottom-v)] w-[var(--interface-border-w)] bg-ring"
        data-corner="left"
      />
      <div
        className="absolute left-[var(--interface-padding)] bottom-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-left"
      >
        <RightTriangle
          corner="bottom-left"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
      {/* Bottom side */}
      <div className="absolute bottom-[var(--interface-padding)] left-[var(--interface-corners-y-value)] right-[var(--interface-corners-y-value)] h-[var(--interface-border-w)] bg-ring" />
      {/* Right side + connection agnle */}
      <div
        className="absolute right-[var(--interface-padding)] top-[calc(var(--header-height)-1px)]  sm:top-[var(--interface-corners-top-value)] bottom-[var(--interface-corners-bottom-v)] w-[var(--interface-border-w)] bg-ring"
        data-corner="right"
      />
      <div
        className="absolute right-[var(--interface-padding)] bottom-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-right"
      >
        <RightTriangle
          corner="bottom-right"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
    </div>
  );
};
