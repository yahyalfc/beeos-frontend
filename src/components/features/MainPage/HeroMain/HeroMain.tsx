"use client";
import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";

import { HeroDynamicSizedTitle } from "./HeroDynamicSizedTitle";
import { HeroMainContent } from "./HeroMainContent";
import { SECTIONS_SCROLL_TRIGGER_STARTS } from "../constants";
import { HeroImageRender } from "./HeroImageRender";

gsap.registerPlugin(ScrollTrigger);

export const INITIAL_HERO_MAIN_ANIMATION_DURATION = 3;

export const HeroMain: FC = ({}) => {
  const startsConfig = SECTIONS_SCROLL_TRIGGER_STARTS;
  const { isLoaded } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !containerRef.current ||
        !titlesRef.current ||
        !isLoaded
      )
        return;

      const contentBlock = titlesRef.current.offsetHeight;

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: `top ${startsConfig.FIRST_ORDER}`,
          end: `+=${window.innerHeight * 0.8}`,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      tl2
        .to(containerRef.current, {
          y: -contentBlock,
          ease: "sine.out",
        })
        .to(
          sectionRef.current,
          {
            pointerEvents: "none",
            opacity: 0,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    },
    {
      scope: sectionRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col relative w-full min-h-[100svh] md:block md:min-h-auto md:h-[100svh] pt-[var(--header-height)] pointer-events-auto md:fixed md:top-0 md:left-0 md:overflow-hidden will-change-transform"
    >
      <div className="container flex flex-1 flex-col h-full md:overflow-hidden inset-0 md:pt-11 pt-7 pb-10 md:pb-[60px]">
        <div
          ref={containerRef}
          className="h-full inset-0 flex flex-1 flex-col gap-2 md:gap-0 justify-around md:justify-stretch md:grid md:grid-rows-[5fr_auto]"
        >
          <div ref={titlesRef} className="md:pb-11 h-[20svh] md:h-full inset-0">
            <HeroDynamicSizedTitle />
          </div>
          <HeroImageRender />
          <HeroMainContent />
        </div>
      </div>
    </section>
  );
};
