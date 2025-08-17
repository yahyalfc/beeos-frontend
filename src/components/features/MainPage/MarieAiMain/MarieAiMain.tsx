"use client";

import { type FC, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLoading } from "@/components/providers/LoadingProvider";
import { Button } from "@/components/shared/UI/Button/button";
import { useDeviceDetection } from "@/hooks/useResponsible";
import { ROUTES } from "@/utils/constants";

import { SECTIONS_SCROLL_TRIGGER_STARTS } from "../constants";
import { MAIN_MARIE_ACTIONS_ANIMATION_CONFIG } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export const MarieAiMain: FC = ({}) => {
  const startsConfig = SECTIONS_SCROLL_TRIGGER_STARTS.FOURTH_ORDER;
  const config = MAIN_MARIE_ACTIONS_ANIMATION_CONFIG;
  const { isLoaded } = useLoading();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonBlockRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useDeviceDetection();

  useGSAP(
    () => {
      if (
        !isLoaded ||
        !sectionRef.current ||
        !titleRef.current ||
        !buttonBlockRef.current
      )
        return;

      const titleSpan = titleRef.current.querySelectorAll("span");

      gsap.set(titleSpan, {
        y: config.initialY,
        rotate: config.initialRotation,
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
      });

      gsap.set(buttonBlockRef.current, {
        opacity: 0,
      });

      gsap.set(sectionRef.current, {
        pointerEvents: "none",
      });

      const sineInOut = "sine.inOut";

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
          .to(
            titleSpan,
            {
              y: 0,
              rotate: 0,
              transformOrigin: "top left",
              duration: config.animationDuration,
              ease: sineInOut,
              stagger: config.staggerDelay,
            },
            "<"
          )
          .to(
            sectionRef.current,
            {
              pointerEvents: "auto",
            },
            "<"
          )
          .to(
            cardsRef.current,
            {
              opacity: 1,
              duration: config.animationDuration * 0.5,
              ease: sineInOut,
              stagger: config.staggerDelay * 0.25,
            },
            "<"
          )
          .to(
            buttonBlockRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: sineInOut,
            },
            "<=0.5"
          )

          // Revert animation
          .to(
            titleSpan,
            {
              y: config.exitY,
              rotate: config.exitRotation,
              transformOrigin: "top left",
              duration: config.animationDuration * 0.7,
              ease: sineInOut,
              stagger: config.staggerDelay * 0.25,
            },
            `${config.scrollMultiplier * 0.6}`
          )
          .to(
            cardsRef.current.toReversed(),
            {
              opacity: 0,
              duration: config.animationDuration * 0.5,
              ease: sineInOut,
              stagger: config.staggerDelay * 0.2,
            },
            `${config.scrollMultiplier * 0.6}`
          )
          .to(sectionRef.current, {
            pointerEvents: "none",
          })
          .to(
            buttonBlockRef.current,
            {
              opacity: 0,
              duration: config.buttonDuration,
              ease: sineInOut,
            },
            `${config.scrollMultiplier * 0.6}`
          );
      } else {
        const tlMobile = gsap.timeline({});

        tlMobile
          // Initializing animation
          .to(
            imageRef.current,
            {
              opacity: 1,
              duration: config.animationDuration,
              ease: sineInOut,
              scrollTrigger: {
                trigger: imageRef.current,
                start: `top 95%`,
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
              ease: sineInOut,
              stagger: config.staggerDelay,
              scrollTrigger: {
                trigger: titleRef.current,
                start: `top 100%`,
                end: `bottom 75%`,
                scrub: 1.5,
              },
            },
            "<"
          )
          .to(
            sectionRef.current,
            {
              pointerEvents: "auto",
            },
            "<"
          )
          .to(
            cardsRef.current,
            {
              opacity: 1,
              duration: config.animationDuration * 0.5,
              ease: sineInOut,
              stagger: config.staggerDelay * 0.25,
            },
            "<"
          )
          .to(
            buttonBlockRef.current,
            {
              opacity: 1,
              duration: config.buttonDuration,
              ease: sineInOut,
              scrollTrigger: {
                trigger: buttonBlockRef.current,
                start: `top 95%`,
                end: `bottom 85%`,
                scrub: 1.5,
              },
            },
            "<=0.5"
          );
      }
    },
    {
      dependencies: [isLoaded, isMobile],
    }
  );

  const setCardsRef = (index: number, ref: HTMLDivElement | null) => {
    // eslint-disable-next-line security/detect-object-injection
    cardsRef.current[index] = ref;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full md:h-[100svh] md:pt-[60px] md:pointer-events-none relative md:fixed md:top-0 md:left-0 overflow-hidden will-change-transform"
    >
      <div className="container relative z-[5] h-full flex flex-col gap-8 md:flex-row md:gap-0 justify-start overflow-hidden inset-0 pt-3 md:pt-11 pb-[60px]">
        {isMobile ? (
          <div ref={imageRef} className="block opacity-0 md:hidden">
            <Image
              unoptimized
              alt="Marie demo"
              className="w-full h-auto aspect-[393/416]"
              height={416}
              src="/marie-demo.png"
              width={393}
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-start gap-6 items-start">
          <h2 ref={titleRef} className="title-huge-main">
            <div className="overflow-hidden">
              <span className="inline-block">Marie – Your Web3</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block">AI Companion</span>
            </div>
          </h2>
          <div ref={buttonBlockRef} className="block opacity-0">
            <Link href={ROUTES.MARIE_BOT}>
              <Button>Explore features</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 w-full h-full hidden md:flex justify-center items-end">
        <Image
          ref={(el) => setCardsRef(0, el)}
          alt="Marie Ai representative"
          className="absolute aspect-[738/1283] w-[28vw] h-auto bottom-0 object-cover"
          height={1283}
          src="/marie.png"
          width={738}
        />

        <Image
          ref={(el) => setCardsRef(1, el)}
          unoptimized
          alt="Card number 1"
          className="absolute aspect-[485/199] w-[27vw] left-[16vw] bottom-[25svh]"
          height={199}
          src="/marie-card-mode.svg"
          width={485}
        />
        <Image
          ref={(el) => setCardsRef(2, el)}
          alt="Card number 2"
          className="absolute aspect-[555/199] w-[30vw] right-[19vw] m-auto top-[-13svh] bottom-0 left-auto"
          height={199}
          src="/marie-card-bot.svg"
          width={555}
        />
        <Image
          ref={(el) => setCardsRef(3, el)}
          alt="Card number 2"
          className="absolute aspect-[491/199] w-[27.5vw] bottom-[12svh] right-[14vw]"
          height={199}
          src="/marie-bot-portfolio.svg"
          width={491}
        />
      </div>
    </section>
  );
};
