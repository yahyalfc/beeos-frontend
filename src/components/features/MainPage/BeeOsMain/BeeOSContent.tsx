/* eslint-disable sonarjs/no-duplicate-string */
"use client";

import { type FC, useRef } from "react";

import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { ShadowInterface } from "@/components/shared/Interfaces/ShadowedInterface";
import InfiniteScroll from "@/components/shared/UI/InfiniteScroll/InfiniteScroll";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { beeOsImagesColFirst, beeOsImagesColSecond , MAIN_BEEOS_CONTENT_ANIMATION_CONFIG } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export const BeeOSContent: FC = ({}) => {
  const config = MAIN_BEEOS_CONTENT_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();

  const contentRef = useRef<HTMLDivElement>(null);
  const gradientTopRef = useRef<HTMLDivElement>(null);
  const gradientBottomRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (
        (contentRef.current == null) ||
        (gradientTopRef.current == null) ||
        (gradientBottomRef.current == null) ||
        !isLoaded
      )
        return;

      gsap.set(
        [contentRef.current, gradientBottomRef.current, gradientTopRef.current],
        {
          opacity: 0,
        }
      );

      if (!isMobile) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top -200%",
            end: `+=${window.innerHeight * config.scrollMultiplier}`,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        tl2
          // Initializing animation
          .to(contentRef.current, {
            opacity: 1,
            duration: config.contentDuration,
            ease: "power4.inOut",
          })
          .to(
            gradientTopRef.current,
            {
              opacity: 1,
              duration: config.gradientDuration,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            gradientBottomRef.current,
            {
              opacity: 1,
              duration: config.gradientDuration,
              ease: "power4.inOut",
            },
            "<"
          )
          // Revert animation
          .to(
            contentRef.current,
            {
              opacity: 0,
              duration: config.contentDuration * 0.8,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 0.55}`
          )
          .to(
            gradientTopRef.current,
            {
              opacity: 0,
              duration: config.gradientDuration * 1.4,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 0.7}`
          )
          .to(
            gradientBottomRef.current,
            {
              opacity: 0,
              duration: config.gradientDuration * 1.4,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 0.7}`
          );
      } else {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 60%",
            end: `bottom 60%`,
            anticipatePin: 1,
          },
        });

        tlMobile
          .to(contentRef.current, {
            opacity: 1,
            duration: config.contentDuration,
            ease: "power4.inOut",
          })
      }
    },
    {
      scope: contentRef,
      dependencies: [isLoaded, isMobile],
    }
  );

  const itemsFirstCol = beeOsImagesColFirst.map((item) => ({
    content: (
      <Image
        key={item}
        unoptimized
        alt={item}
        className="aspect-[287/398] w-full h-auto"
        height={1400}
        src={item}
        width={1000}
      />
    ),
  }));

  const itemsSecondCol = beeOsImagesColSecond.map((item) => ({
    content: (
      <Image
        key={item}
        unoptimized
        alt={item}
        className="aspect-[287/398] w-full h-auto"
        height={1400}
        src={item}
        width={1000}
      />
    ),
  }));

  return (
    <>
      <ShadowInterface
        gradientBottomRef={gradientBottomRef}
        gradientTopRef={gradientTopRef}
      />
      <div
        ref={contentRef}
        className="relative mx-5 mb-3 px-5 md:p-0 md:absolute overflow-hidden md:overflow-visible aspect-[361/390] md:aspect-auto grid grid-cols-2 gap-3 md:gap-5 md:top-[var(--header-interface-height)] z-[1] md:right-[8%] md:mx-auto md:w-[40%] opacity-0 md:bottom-[var(--interface-padding)]"
      >
        <Image unoptimized alt="Overlay" className="absolute w-full h-[100%] object-cover top-0 left-0 right-0 bottom-0 z-[5] pointer-events-none block md:hidden" height={390}  src="/beeOS-WRAP.svg" width={361} />
        <div className="w-full h-full relative rotate-[4deg] md:rotate-[6deg] pointer-events-none" data-line="left">
          <InfiniteScroll
            autoplay
            pauseOnHover
            autoplayDirection="down"
            autoplaySpeed={0.175}
            delay={0}
            items={itemsFirstCol}
            tiltDirection="right"
          />
        </div>
        <div className="w-full h-full relative rotate-[4deg] md:rotate-[6deg] pointer-events-none" data-line="right">
          <InfiniteScroll
            autoplay
            pauseOnHover
            autoplayDirection="down"
            autoplaySpeed={0.175}
            delay={1}
            items={itemsSecondCol}
            tiltDirection="right"
          />
        </div>
      </div>
    </>
  );
};
