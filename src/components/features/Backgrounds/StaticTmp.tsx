"use client";

import { type FC, useRef } from "react";

import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useLoading } from "@/components/providers/LoadingProvider";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "../MainPage/HeroMain/HeroMain";

export const StaticTmpBackground: FC = ({}) => {
  const { isLoaded } = useLoading();
  
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if ((bgRef.current == null) || !isLoaded) return;

    gsap.set([bgRef.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({
      delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.5,
    });

    tl.to(bgRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, {
    scope: bgRef,
    dependencies: [isLoaded],
  });

  return (
    <div
      ref={bgRef}
      className="fixed z-[1] top-0 left-0 right-0 bottom-0 w-full h-full opacity-0"
    >
      <Image
        alt="Background static"
        className="inset-0 w-full h-full object-cover"
        height={1900}
        quality={100}
        src="/bg.png"
        width={1600}
      />
    </div>
  );
};
