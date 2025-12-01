/* eslint-disable sonarjs/no-duplicate-string */
"use client";

import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { MAIN_BEEOS_TITLE_ANIMATION_CONFIG } from "./constants";


gsap.registerPlugin(ScrollTrigger);

export const BeeOsTitle: FC = ({}) => {
  const config = MAIN_BEEOS_TITLE_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if ((titleRef.current == null) || !isLoaded) return;

      const spans = titleRef.current.querySelectorAll("span");

      gsap.set(spans, { y: config.initialY, rotate: config.initialRotation });

      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top -170%",
            end: `+=${window.innerHeight * config.scrollMultiplier}`,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        tl.to(spans, {
          y: 0,
          rotate: 0,
          transformOrigin: "top left",
          duration: config.animationDuration,
          ease: "sine.inOut",
          stagger: config.staggerDelay,
        }).to(
          spans,
          {
            y: config.exitY,
            rotate: config.exitRotation,
            transformOrigin: "top left",
            duration: config.animationDuration * 0.7,
            ease: "sine.inOut",
            stagger: config.exitStaggerDelay,
          },
          `+=${config.animationDuration}`
        );
      } else {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: `bottom 85%`,
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
      dependencies: [isLoaded, isMobile],
    }
  );

  return (
    <h2 ref={titleRef} className="title-huge-main mb-3 md:max-w-[80%] md:mb-0">
      {isMobile ? (
        <>
          <div className="overflow-hidden">
            <span className="inline-block">We don&apos;t chase</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">alpha. We build it.</span>
          </div>
        </>
      ) : (
        <>
          <div className="overflow-hidden">
            <span className="inline-block">We don&apos;t</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">chase alpha.</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block">We build it.</span>
          </div>
        </>
      )}
    </h2>
  );
};
