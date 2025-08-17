"use client";

import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { MAIN_LAUNCHPAD_TITLE_ANIMATION_CONFIG } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export const LaunchpadTitleMain: FC = ({}) => {
  const config = MAIN_LAUNCHPAD_TITLE_ANIMATION_CONFIG;

  const { isLoaded } = useLoading();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (!titleRef.current || !isLoaded) return;

      const spans = titleRef.current.querySelectorAll("span");

      gsap.set(spans, { y: config.initialY, rotate: config.initialRotation });

      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom",
            end: `bottom 40%`,
            scrub: 1.5,
          },
        });

        tl.to(spans, {
          y: 0,
          rotate: 0,
          transformOrigin: "top left",
          duration: config.animationDuration,
          ease: "sine.inOut",
          stagger: config.staggerDelay,
        });
      } else {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%",
            end: `bottom 65%`,
            scrub: 1.5,
          },
        });

        tlMobile.to(spans, {
          y: 0,
          rotate: 0,
          transformOrigin: "top left",
          duration: config.animationDuration,
          ease: "sine.inOut",
          stagger: config.staggerDelay,
        });
      }
    },
    {
      scope: titleRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <h2 ref={titleRef} className="title-md-main text-[max(3.5vw,28px)] text-center">
      {isMobile ? (
        <>
          <div className="overflow-hidden">
            <span className="inline-block">BeeOS Launchpad</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">Early. Curated. Real access.</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              Get whitelisted for handpicked drops.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              Only collections our traders actually mint.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              You&apos;re in the list — you&apos;re in the game.
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="overflow-hidden">
            <span className="inline-block">
              BeeOS Launchpad. Early. Curated. Real access.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              Get whitelisted for handpicked drops.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              Only collections our traders actually mint.
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">
              You&apos;re in the list — you&apos;re in the game.
            </span>
          </div>
        </>
      )}
    </h2>
  );
};
