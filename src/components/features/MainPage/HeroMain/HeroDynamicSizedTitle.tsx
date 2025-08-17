/* eslint-disable sonarjs/no-duplicate-string */
"use client";

import { type FC, useRef, useEffect, useState, useCallback } from "react";

import { gsap } from "gsap";

import { useLoading } from "@/components/providers/LoadingProvider";
import { ArenaVsTitleIcon } from "@/components/shared/UI/Icons/ArenaVSTitle.icon";

import { INITIAL_HERO_MAIN_ANIMATION_DURATION } from "./HeroMain";

export const HeroDynamicSizedTitle: FC = () => {
  const { isLoaded } = useLoading();

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);

  const dimensionsRef = useRef({ width: 0, height: 0 });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [, forceUpdate] = useState({}); // Used to trigger re-renders when needed
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const ASPECT_RATIO = 828 / 310;
  const INITIAL_WIDTH_VW = 55;

  const triggerRender = useCallback(() => {
    forceUpdate({});
  }, []);

  const debounce = useCallback((func: () => void, delay: number) => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(func, delay);
    };
  }, []);

  const calculateInitialDimensions = useCallback(() => {
    const vw = window.innerWidth / 100;
    const initialWidth = INITIAL_WIDTH_VW * vw;
    const initialHeight = initialWidth / ASPECT_RATIO;
    return { width: initialWidth, height: initialHeight };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateFinalDimensions = useCallback(() => {
    if (h1Ref.current != null) {
      const rect = h1Ref.current.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return { width: 0, height: 0 };
  }, []);

  const updateDimensionsForResize = useCallback(() => {
    if (isAnimationComplete && (h1Ref.current != null)) {
      const rect = h1Ref.current.getBoundingClientRect();
      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };
      triggerRender();
    }
  }, [isAnimationComplete, triggerRender]);

  const setupResizeObserver = useCallback(() => {
    if (!isAnimationComplete) return;

    const debouncedUpdate = debounce(updateDimensionsForResize, 300);

    resizeObserverRef.current = new ResizeObserver(updateDimensionsForResize);

    if (h1Ref.current != null) {
      resizeObserverRef.current.observe(h1Ref.current);
    }

    window.addEventListener("resize", debouncedUpdate);

    return () => {
      if (resizeObserverRef.current != null) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener("resize", debouncedUpdate);
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAnimationComplete, updateDimensionsForResize, debounce]);

  // Initialize animation on mount
  useEffect(() => {
    if ((h1Ref.current != null) && (titleBlockRef.current != null) && isLoaded) {
      gsap.set(h1Ref.current, {
        y: "100vh",
      });

      gsap.set(titleBlockRef.current, {
        scaleY: 1.6,
      });

      const initialDims = calculateInitialDimensions();
      const finalDims = calculateFinalDimensions();

      // Set initial dimensions
      dimensionsRef.current = initialDims;
      triggerRender();

      // Create GSAP timeline for smooth animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimationComplete(true);
        },
      });

      // Animate the dimensions state
      tl.to(titleBlockRef.current, {
        scaleY: 1,
        duration: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.5,
        ease: "power4.inOut",
      })
        .to(
          h1Ref.current,
          {
            y: 0,
            duration: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.5,
            ease: "power4.inOut",
          },
          "<"
        )
        .to(
          { width: initialDims.width, height: initialDims.height },
          {
            width: finalDims.width,
            height: finalDims.height,
            duration: INITIAL_HERO_MAIN_ANIMATION_DURATION * 0.5,
            ease: "power4.inOut",
            onUpdate(this: gsap.core.Tween) {
              const target = this.targets()[0] as { width: number; height: number };
              dimensionsRef.current = {
                width: target.width,
                height: target.height,
              };
              triggerRender();
            },
          }
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Setup resize observer after animation completes
  useEffect(() => {
    if (isAnimationComplete) {
      return setupResizeObserver();
    }
  }, [isAnimationComplete, setupResizeObserver]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resizeObserverRef.current != null) {
        resizeObserverRef.current.disconnect();
      }
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <h1
      ref={h1Ref}
      className="flex justify-center items-center w-full h-full inset-0 overflow-hidden"
    >
      <div ref={titleBlockRef} className="block">
        <ArenaVsTitleIcon
          className="block transition-opacity duration-300"
          height={dimensionsRef.current.height}
          preserveAspectRatio="none"
          width={dimensionsRef.current.width}
          style={{
            width: `${dimensionsRef.current.width}px`,
            height: `${dimensionsRef.current.height}px`,
          }}
        />
      </div>
      <span className="scale-0 absolute pointer-events-none">BeeOS</span>
    </h1>
  );
};
