"use client";

import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { ShadowInterface } from "@/components/shared/Interfaces/ShadowedInterface";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { MAIN_SCROLLABLE_INTERFACE_ANIMATION_CONFIG } from "./constants";
import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "../HeroMain/HeroMain";

gsap.registerPlugin(ScrollTrigger);

export const ScrollableInterface: FC = ({}) => {
  const config = MAIN_SCROLLABLE_INTERFACE_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();

  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const gradientTopRef = useRef<HTMLDivElement>(null);
  const gradientBottomRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (
        !triggerRef.current ||
        !containerRef.current ||
        !isLoaded ||
        !gradientTopRef.current ||
        !gradientBottomRef.current
      )
        return;

      gsap.set([gradientTopRef.current, gradientBottomRef.current], {
        opacity: 0,
      });

      if (isMobile) {
        const tlMobile = gsap.timeline({
          delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.5,
        });

        tlMobile
          .to(gradientTopRef.current, {
            opacity: 1,
            duration: config.topGradientDuration,
            ease: config.gradientsEase,
          })
          .to(gradientBottomRef.current, {
            opacity: 1,
            duration: config.bottomGradientDuration,
            ease: config.gradientsEase,
          });
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: `top bottom`,
            end: "bottom top",
            scrub: 1.5,
            // debug
            markers: false,
          },
        });

        tl.to(gradientTopRef.current, {
          opacity: 1,
          duration: config.topGradientDuration,
          ease: config.gradientsEase,
        }).to(gradientBottomRef.current, {
          opacity: 1,
          duration: config.bottomGradientDuration,
          ease: config.gradientsEase,
        });
      }
    },
    {
      dependencies: [isLoaded],
      scope: containerRef,
    }
  );

  return (
    <>
      <div ref={triggerRef} className="hidden" />
      <div
        ref={containerRef}
        className="fixed top-0 left-0 right-0 bottom-0 w-full pointer-events-none h-full z-[8900]"
      >
        <ShadowInterface
          gradientBottomRef={gradientBottomRef}
          gradientTopRef={gradientTopRef}
        />
      </div>
    </>
  );
};
