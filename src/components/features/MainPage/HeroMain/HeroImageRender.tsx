"use client";

import { type FC, useRef } from "react";

import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useLoading } from "@/components/providers/LoadingProvider";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "./HeroMain";

export const HeroImageRender: FC = ({}) => {
  const { isLoaded } = useLoading();

  const { isMobile } = useDeviceDetection();

  const imageRenderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if ((imageRenderRef.current == null) || !isLoaded || !isMobile) return;

      gsap.set(imageRenderRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 40,
      });

      const tl = gsap.timeline({
        delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.6,
      });
      tl.to(imageRenderRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power4.inOut",
      });

    },
    {
      scope: imageRenderRef,
      dependencies: [isLoaded, isMobile],
    }
  );

  return (
    <div ref={imageRenderRef} className="block sm:hidden">
      <Image
        alt="Bee Render"
        className="w-full inline-block aspect-[1338/753] h-auto"
        height={753}
        src="/bee.png"
        width={1338}
      />
    </div>
  );
};
