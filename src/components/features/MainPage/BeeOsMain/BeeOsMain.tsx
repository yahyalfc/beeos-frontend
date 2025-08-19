/* eslint-disable sonarjs/no-duplicate-string */
"use client";

import { type FC, useRef } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { Button } from "@/components/shared/UI/Button/button";
import { useDeviceDetection } from "@/hooks/useResponsible";
import { EXTERNAL_LINKS } from "@/utils/constants";

import { BeeOSContent } from "./BeeOSContent";
import { BeeOsTitle } from "./BeeOsTitle";
import { MAIN_BEEOS_ACTIONS_ANIMATION_CONFIG } from "./constants";
import { SECTIONS_SCROLL_TRIGGER_STARTS } from "../constants";



gsap.registerPlugin(ScrollTrigger);

export const BeeOsMain: FC = ({}) => {
  const startsConfig = SECTIONS_SCROLL_TRIGGER_STARTS;
  const config = MAIN_BEEOS_ACTIONS_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (
        (sectionRef.current == null) ||
        (descriptionRef.current == null) ||
        (buttonRef.current == null) ||
        !isLoaded
      )
        return;

      gsap.set([descriptionRef.current, buttonRef.current], {
        opacity: 0,
      });

      if (!isMobile) {
        gsap.set(sectionRef.current, {
          pointerEvents: "none",
        });

        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: `top ${startsConfig.SECOND_ORDER}`,
            end: `+=${window.innerHeight * config.scrollMultiplier}`,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        tl2
          .to(descriptionRef.current, {
            opacity: 1,
            duration: config.descriptiontDuration,
            ease: "power4.inOut",
          })
          .set(sectionRef.current, {
            pointerEvents: "auto",
          })
          .to(
            buttonRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: "power4.inOut",
            },
            `-=${config.descriptiontDuration * 0.9}`
          )
          .to(
            descriptionRef.current,
            {
              opacity: 0,
              duration: config.descriptiontDuration,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 1}`
          )
          .to(
            buttonRef.current,
            {
              opacity: 0,
              duration: config.buttonDuration,
              ease: "power4.inOut",
            },
            `-=${config.descriptiontDuration * 0.8}`
          )
          .set(sectionRef.current, {
            pointerEvents: "none",
          });
      } else {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top 75%`,
            end: `bottom 75%`,
            scrub: 1.5,
            markers: false,
          },
        });

        tlMobile
          .to(descriptionRef.current, {
            opacity: 1,
            duration: config.descriptiontDuration,
            ease: "power4.inOut",
          })
          .to(
            buttonRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: "power4.inOut",
            },
            `-=${config.descriptiontDuration * 0.9}`
          );
      }
    },
    {
      scope: sectionRef,
      dependencies: [isLoaded, isMobile],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto min-h-[100svh] md:min-h-auto md:h-[100svh] md:pointer-events-none pt-[60px] relative md:fixed md:top-0 md:left-0 overflow-hidden will-change-transform"
    >
      <BeeOSContent />
      <div className="container relative z-[5] h-full md:grid md:grid-cols-2 md:overflow-hidden inset-0 pt-5 md:pt-11 pb-[60px]">
        <div className="flex flex-col justify-between items-start">
          <BeeOsTitle />
          <div className="flex flex-col gap-10 md:gap-12 max-w-[500px]">
            <p ref={descriptionRef} className="w-full text-md opacity-0">
              <span className="w-full inline-block">
                BeeOS NFTs give you exclusive access to launchpad whitelists,
                staking rewards, and premium features of our AI assistant
              </span>
            </p>
            <div
              ref={buttonRef}
              className="flex flex-col md:flex-row justify-start items-center gap-5 md:gap-6 opacity-0"
            >
              <a className="w-full md:w-auto" href={EXTERNAL_LINKS.OPENSEA} rel="noreferrer" target="_blank">
                <Button className="w-full md:w-auto">Unlock BeeOS</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
