"use client";
import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useLoading } from "@/components/providers/LoadingProvider";
import { Button } from "@/components/shared/UI/Button/button";
import { SOCIAL_MEDIA_LINKS } from "@/utils/constants";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "./HeroMain";

export const HeroMainContent: FC = ({}) => {
  const { isLoaded } = useLoading();
  const scopeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!descriptionRef.current || !buttonRef.current || !isLoaded) return;
      gsap.set([descriptionRef.current, buttonRef.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        delay: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.85,
      });

      tl.to(descriptionRef.current, {
        opacity: 1,
        duration: 0.65,
        ease: "power4.inOut",
      }).to(
        buttonRef.current,
        {
          opacity: 1,
          duration: 0.65,
          ease: "power4.inOut",
        },
        "<"
      );
    },
    {
      scope: scopeRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <div
      ref={scopeRef}
      className="content-block flex flex-col gap-6 sm:gap-0 justify-center sm:flex-row sm:justify-between items-center"
      data-purpose="content"
    >
      <p
        ref={descriptionRef}
        className="max-w-[360px] w-full text-md text-center sm:text-left"
      >
        <span className="w-full inline-block">
          <span className="hidden sm:inline-block">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          The Hive is Live. BeeOS is more than an NFT collection — it&apos;s a
          full-stack war machine for NFT trading.
        </span>
      </p>
      <div ref={buttonRef} className="flex justify-center items-center">
        <a href={SOCIAL_MEDIA_LINKS.DISCORD} rel="noreferrer" target="_blank">
          <Button>Explore BeeOS</Button>
        </a>
      </div>
    </div>
  );
};
