/* eslint-disable sonarjs/no-duplicate-string */
"use client";

import { type FC, useRef } from "react";


import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { Button } from "@/components/shared/UI/Button/button";
import { useDeviceDetection } from "@/hooks/useResponsible";

import { SECTIONS_SCROLL_TRIGGER_STARTS } from "../constants";
import {
  assistantsBenefits,
  MAIN_ASSISTANTS_ACTIONS_ANIMATION_CONFIG,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export const AssistantMain: FC = ({}) => {
  const startsConfig = SECTIONS_SCROLL_TRIGGER_STARTS.THIRD_ORDER;
  const config = MAIN_ASSISTANTS_ACTIONS_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonBlockRef = useRef<HTMLDivElement>(null);
  const contentBlockRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (
        !isLoaded ||
        sectionRef.current == null ||
        titleRef.current == null ||
        contentBlockRef.current == null ||
        buttonBlockRef.current == null ||
        descriptionRef.current == null
      )
        return;

      const titleSpan = titleRef.current.querySelector("span");
      const textSpans = [
        ...contentBlockRef.current.querySelectorAll("span"),
      ] as HTMLSpanElement[];
      const linesDivs = linesRef.current;

      gsap.set(titleSpan, {
        y: config.initialY,
        rotate: config.initialRotation,
      });

      gsap.set([descriptionRef.current, buttonBlockRef.current], {
        opacity: 0,
      });

      gsap.set(contentBlockRef.current, {
        scale: 0,
      });

      gsap.set(textSpans, {
        opacity: 0,
      });

      gsap.set(linesDivs, {
        width: 0,
      });

      gsap.set(sectionRef.current, {
        pointerEvents: "none",
      });

      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: `top ${startsConfig}`,
            end: `+=${window.innerHeight * config.scrollMultiplier}`,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        tl
          // Initializing animation
          .to(descriptionRef.current, {
            opacity: 1,
            duration: config.descriptiontDuration,
            ease: "power4.inOut",
          })
          .to(
            sectionRef.current,
            {
              pointerEvents: "auto",
            },
            "<"
          )
          .to(
            buttonBlockRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            titleSpan,
            {
              y: 0,
              rotate: 0,
              transformOrigin: "top left",
              duration: config.animationDuration,
              ease: "sine.inOut",
            },
            "<"
          )
          .to(
            contentBlockRef.current,
            {
              scale: 1,
              transformOrigin: "center center",
              duration: config.animationDuration,
              ease: "sine.inOut",
            },
            "<"
          )
          .to(
            linesDivs,
            {
              width: "100%",
              transformOrigin: "center left",
              duration: config.animationDuration * 0.4,
              ease: "sine.inOut",
              stagger: config.animationDuration * 0.1,
            },
            "-=0.2"
          )
          .to(
            textSpans,
            {
              opacity: 1,
              duration: config.animationDuration * 0.6,
              ease: "sine.inOut",
              stagger: config.animationDuration * 0.1,
            },
            `-=${config.animationDuration * 0.4}`
          )

          // Revert animation
          .to(
            titleSpan,
            {
              y: config.exitY,
              rotate: config.exitRotation,
              transformOrigin: "top left",
              duration: config.animationDuration * 0.7,
              ease: "sine.inOut",
            },
            `${config.scrollMultiplier * 0.6}`
          )
          .to(
            descriptionRef.current,
            {
              opacity: 0,
              duration: config.descriptiontDuration * 0.8,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 0.58}`
          )
          .to(
            buttonBlockRef.current,
            {
              opacity: 0,
              duration: config.buttonDuration * 0.7,
              ease: "power4.inOut",
            },
            `${config.scrollMultiplier * 0.59}`
          )
          .to(
            contentBlockRef.current,
            {
              scale: 0,
              transformOrigin: "center center",
              duration: config.animationDuration * 0.5,
              ease: "sine.inOut",
            },
            `${config.scrollMultiplier * 0.8}`
          )
          .to(
            // eslint-disable-next-line sonarjs/no-misleading-array-reverse
            linesDivs.reverse(),
            {
              width: "0%",
              transformOrigin: "center right",
              duration: config.animationDuration * 0.3,
              ease: "sine.inOut",
              stagger: config.animationDuration * 0.1,
            },
            `${config.scrollMultiplier * 0.65}`
          )
          .to(sectionRef.current, {
            pointerEvents: "none",
          })
          .to(
            // eslint-disable-next-line sonarjs/no-misleading-array-reverse
            textSpans.reverse(),
            {
              opacity: 0,
              duration: config.animationDuration * 0.4,
              ease: "sine.inOut",
              stagger: config.animationDuration * 0.1,
            },
            `${config.scrollMultiplier * 0.6}`
          );
      } else {
        const tlMobile = gsap.timeline({});

        tlMobile
          .to(descriptionRef.current, {
            opacity: 1,
            duration: config.descriptiontDuration,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: `top 90%`,
              end: `bottom 75%`,
              scrub: 1.5,
            },
          })
          .to(
            buttonBlockRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: descriptionRef.current,
                start: `top 90%`,
                end: `bottom 75%`,
                scrub: 1.5,
              },
            },
            "<"
          )
          .to(
            titleSpan,
            {
              y: 0,
              rotate: 0,
              transformOrigin: "top left",
              duration: config.animationDuration,
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: contentBlockRef.current,
                start: `top 70%`,
                end: `bottom 45%`,
                scrub: 1.5,
              },
            },
            "<"
          )
          .to(
            contentBlockRef.current,
            {
              scale: 1,
              transformOrigin: "center center",
              duration: config.animationDuration,
              ease: "sine.inOut",
              scrollTrigger: {
                trigger: contentBlockRef.current,
                start: `top 95%`,
                end: `bottom 80%`,
                scrub: 1.5,
              },
            },
            "<"
          )
          .to(linesDivs, {
            width: "100%",
            transformOrigin: "center left",
            duration: config.animationDuration * 0.4,
            ease: "sine.inOut",
            stagger: config.animationDuration * 0.1,
            scrollTrigger: {
              trigger: contentBlockRef.current,
              start: `top 70%`,
              end: `bottom 55%`,
              scrub: 1.5,
            },
          })
          .to(textSpans, {
            opacity: 1,
            duration: config.animationDuration * 0.6,
            ease: "sine.inOut",
            stagger: config.animationDuration * 0.1,
            scrollTrigger: {
              trigger: contentBlockRef.current,
              start: `top 70%`,
              end: `bottom 55%`,
              scrub: 1.5,
            },
          });
      }
    },
    {
      dependencies: [isLoaded],
    }
  );

  const setLinesRef = (index: number, ref: HTMLDivElement | null) => {
    // eslint-disable-next-line security/detect-object-injection
    linesRef.current[index] = ref;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto md:h-[100svh] md:pt-[60px] md:pointer-events-none relative md:fixed top-0 left-0 overflow-hidden will-change-transform"
    >
      <div className="container relative z-[5] h-full flex flex-col-reverse gap-7 md:gap-0 md:flex-row md:justify-between overflow-hidden inset-0 pt-2 md:pt-11 pb-[60px]">
        <div className="flex flex-col justify-start gap-12 items-start">
          <div className="flex flex-col gap-4">
            <h2 ref={titleRef} className="title-huge-main">
              <div className="overflow-hidden">
                <span className="inline-block">NFT AI ASSISTANT</span>
              </div>
            </h2>
            <p
              ref={descriptionRef}
              className="w-full max-w-[400px] text-md opacity-0"
            >
              <span className="w-full inline-block">
                BeeOS AI Agent is the NFT-native heart of BeeOS. It scans
                markets, surfaces trade ideas, lets you buy/sell inside the
                interface, and tracks shareable PnL/ROI — with plain-language
                insights for every move. Currently in active development — early
                access rolling out.
              </span>
            </p>
          </div>
          <div ref={buttonBlockRef} className="flex justify-start opacity-0">
            <Button>Launching Soon</Button>
          </div>
        </div>
        <div className="block mt-8 md:m-0">
          <div className="flex justify-center items-center relative">
            <div
              ref={contentBlockRef}
              className="relative w-full shrink-0 h-auto max-w-[max(320px,23vw)] border border-ring origin-center"
            >
              {/* points for angles */}
              <div className="absolute z-[2] top-0 left-0 w-2.5 h-2.5 shrink-0 rounded-full bg-white translate-y-[-50%] translate-x-[-50%]" />
              <div className="absolute z-[2] top-0 right-0 w-2.5 h-2.5 shrink-0 rounded-full bg-white translate-y-[-50%] translate-x-[50%]" />
              <div className="absolute z-[2] bottom-0 left-0 w-2.5 h-2.5 shrink-0 rounded-full bg-white translate-y-[50%] translate-x-[-50%]" />
              <div className="absolute z-[2] bottom-0 right-0 w-2.5 h-2.5 shrink-0 rounded-full bg-white translate-y-[50%] translate-x-[50%]" />
              {/* actual content */}
              <ul className="flex w-full flex-col">
                {assistantsBenefits.map((item, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <li
                      key={item.id}
                      className="flex flex-col relative pl-5 md:pl-7 pr-8 md:pr-10 py-5 md:py-6 justify-start text-md md:text-lg items-start gap-4"
                    >
                      <span className="opacity-0">{item.text}</span>
                      {!isLast ? (
                        <div
                          ref={(el) => setLinesRef(item.id, el)}
                          className="absolute bottom-0 left-0 right-0 h-[1px] w-0 bg-ring"
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
