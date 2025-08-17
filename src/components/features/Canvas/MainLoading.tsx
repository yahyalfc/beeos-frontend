"use client";

import { type FC, useRef, useMemo } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useLoading } from "@/components/providers/LoadingProvider";
import { useIsMobile } from "@/hooks/useResponsible";
import { useWindowReloadOnResize } from "@/hooks/useWindowResizerOnChange";

interface AnimationConfig {
  duration: number;
  stagger: number;
  ease: string;
  y: {
    from: number;
    to: number;
  };
}

const ANIMATION_CONFIG: AnimationConfig = {
  duration: 0.6,
  stagger: 0.12,
  ease: "sine.inOut",
  y: {
    from: 0,
    to: -8, 
  },
};

const DOT_COUNT = 3;

export const MainLoading: FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { isResizing } = useWindowReloadOnResize({
    enabled: !isMobile,
  });

  const { isLoaded } = useLoading();

  const isVisible = useMemo(
    () => !isLoaded || isResizing,
    [isLoaded, isResizing]
  );

  useGSAP(
    () => {
      const dots = dotsRef.current.filter(Boolean) as HTMLDivElement[];

      if (dots.length !== DOT_COUNT) return;

      timelineRef.current?.kill();

      gsap.set(dots, {
        y: ANIMATION_CONFIG.y.from,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        repeat: -1,
        paused: !isVisible,
        onRepeat: () => {
          tl.timeScale(gsap.utils.random(0.9, 1.1));
        },
      });

      dots.forEach((dot, index) => {
        tl.to(
          dot,
          {
            y: ANIMATION_CONFIG.y.to,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
          },
          index * ANIMATION_CONFIG.stagger
        ).to(
          dot,
          {
            y: ANIMATION_CONFIG.y.from,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
          },
          index * ANIMATION_CONFIG.stagger + ANIMATION_CONFIG.duration
        );
      });

      timelineRef.current = tl;
    },
    { scope: containerRef, dependencies: [] }
  );

  useGSAP(
    () => {
      if (!timelineRef.current) return;

      if (isVisible) {
        timelineRef.current.resume();
      } else {
        const progress = timelineRef.current.progress();

        if (progress > 0.8) {
          timelineRef.current.pause();
        } else {
          gsap.to(timelineRef.current, {
            timeScale: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              timelineRef.current?.pause();
            },
          });
        }
      }
    },
    { dependencies: [isVisible] }
  );

  return (
    <div
      aria-label="Loading"
      aria-live="polite"
      role="status"
      className={`fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-background transition-all duration-200 ${
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-center">
        <p className="title-huge inline-flex items-end gap-[0.75vw] text-[9vw] leading-none sm:gap-[.25vw] sm:text-[4vw]">
          <span>Loading</span>
          <span
            ref={containerRef}
            className="inline-flex gap-[0.75vw] pb-[1.5vw] sm:gap-[0.25vw] sm:pb-[0.55vw]"
            role="presentation"
          >
            {Array.from({ length: DOT_COUNT }).map((_, index) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                ref={(el) => {
                  // eslint-disable-next-line security/detect-object-injection
                  dotsRef.current[index] = el;
                }}
                aria-hidden="true"
                className="h-[2.25vw] w-[2.25vw] shrink-0 bg-white will-change-transform sm:h-[0.75vw] sm:w-[0.75vw]"
              />
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};
