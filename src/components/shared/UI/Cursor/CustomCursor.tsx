"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useIsMobile } from "@/hooks/useResponsible";

import { type CursorConfig } from "./constants";

// Types
interface CursorPosition {
  x: number;
  y: number;
}

interface CursorContextValue {
  setHovered: (hovered: boolean) => void;
  setText: (text: string) => void;
}

// Default configuration
const DEFAULT_CONFIG: Required<CursorConfig> = {
  innerSize: 16,
  outerSize: 48,
  innerColor: "white",
  outerColor: "#233036",
  outerAlpha: 1,
  innerScale: 1,
  outerScale: 1,
  trailingSpeed: 0.3,
  speed: 0.15,
  clickScale: {
    inner: 1.5,
    outer: 0.9,
  },
  hoverScale: {
    inner: 0.5,
    outer: 1.5,
  },
  mixBlendMode: true,
  innerClass: "",
  outerClass: "",
};

const BackOutEase = "back.out(1.7)";

const PowerOutEase = "power2.out";

// Context for external cursor control
const CursorContext = React.createContext<CursorContextValue | null>(null);

export const useCursor = (): CursorContextValue => {
  const context = React.useContext(CursorContext);

  if (!context) {
    throw new Error("useCursor must be used within CursorProvider");
  }

  return context;
};

// Main cursor component
export const CustomCursor: React.FC<CursorConfig> = (props) => {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...props }), [props]);

  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<CursorPosition>({ x: -100, y: -100 });
  const cursorVisible = useRef(false);
  const isHovered = useRef(false);
  const cursorText = useRef("");
  const rafId = useRef<number>(null);
  const interactiveElements = useRef<Set<Element>>(new Set());

  // Scroll-related refs
  const isScrolling = useRef(false);
  const isMouseMoving = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>(null);
  const lastMousePos = useRef<CursorPosition>({ x: -100, y: -100 });
  const mouseMoveTimeout = useRef<NodeJS.Timeout>(null);

  // Initialize GSAP
  useGSAP(() => {
    if (typeof window === "undefined") return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    // Set initial position
    if (cursorInnerRef.current && cursorOuterRef.current) {
      gsap.set([cursorInnerRef.current, cursorOuterRef.current], {
        xPercent: -50,
        yPercent: -50,
        x: mousePos.current.x,
        y: mousePos.current.y,
      });
    }

    return () => {
      // Cleanup: restore default cursor
      document.documentElement.style.cursor = "";
    };
  }, []);

  // Update cursor position
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };

    // Check if mouse actually moved
    if (
      lastMousePos.current.x !== e.clientX ||
      lastMousePos.current.y !== e.clientY
    ) {
      isMouseMoving.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Clear mouse move timeout
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }

      // Set mouse as not moving after a short delay
      mouseMoveTimeout.current = setTimeout(() => {
        isMouseMoving.current = false;
      }, 100);

      // If scrolling and mouse moves, show cursor
      if (isScrolling.current && cursorVisible.current) {
        if (cursorInnerRef.current && cursorOuterRef.current) {
          gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
            opacity: 1,
            duration: 0.2,
          });
        }
      }
    }
  }, []);

  // Handle scroll
  const handleScroll = useCallback(() => {
    isScrolling.current = true;

    // Only hide cursor if not moving mouse
    if (!isMouseMoving.current && cursorVisible.current) {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
          opacity: 0.2,
          duration: 0.2,
        });
      }
    }

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set timeout to detect when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;

      // Restore cursor visibility if it was visible
      if (cursorVisible.current) {
        if (cursorInnerRef.current && cursorOuterRef.current) {
          gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
            opacity: 1,
            duration: 0.3,
          });
        }
      }
    }, 150);
  }, []);

  // Handle visibility
  const handleMouseEnter = useCallback(() => {
    cursorVisible.current = true;
    if (cursorInnerRef.current && cursorOuterRef.current) {
      gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    cursorVisible.current = false;
    if (cursorInnerRef.current && cursorOuterRef.current) {
      gsap.to([cursorInnerRef.current, cursorOuterRef.current], {
        opacity: 0,
        duration: 0.3,
      });
    }
  }, []);

  // Handle click animations
  const handleMouseDown = useCallback(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      gsap.to(cursorInnerRef.current, {
        scale: config.clickScale.inner,
        duration: 0.2,
        ease: BackOutEase,
      });
      gsap.to(cursorOuterRef.current, {
        scale: config.clickScale.outer,
        duration: 0.2,
        ease: BackOutEase,
      });
    }
  }, [config.clickScale]);

  const handleMouseUp = useCallback(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      const innerScale = isHovered.current ? config.hoverScale.inner : 1;
      const outerScale = isHovered.current ? config.hoverScale.outer : 1;

      gsap.to(cursorInnerRef.current, {
        scale: innerScale,
        duration: 0.2,
        ease: BackOutEase,
      });
      gsap.to(cursorOuterRef.current, {
        scale: outerScale,
        duration: 0.2,
        ease: BackOutEase,
      });
    }
  }, [config.hoverScale]);

  // Handle hover effects
  const addHoverListeners = useCallback(
    (element: Element) => {
      const handleEnter = (): void => {
        isHovered.current = true;
        if (cursorOuterRef.current && cursorInnerRef.current) {
          gsap.to(cursorOuterRef.current, {
            scale: config.hoverScale.outer,
            borderWidth: "2px",
            duration: 0.3,
            ease: PowerOutEase,
          });
          gsap.to(cursorInnerRef.current, {
            scale: config.hoverScale.inner,
            duration: 0.3,
            ease: PowerOutEase,
          });
        }
      };

      const handleLeave = (): void => {
        isHovered.current = false;
        if (cursorOuterRef.current && cursorInnerRef.current) {
          gsap.to(cursorOuterRef.current, {
            scale: 1,
            borderWidth: "1px",
            duration: 0.3,
            ease: PowerOutEase,
          });
          gsap.to(cursorInnerRef.current, {
            scale: 1,
            duration: 0.3,
            ease: PowerOutEase,
          });
        }
      };

      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);

      // Store cleanup function
      return () => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      };
    },
    [config.hoverScale]
  );

  // Animation loop
  const updateCursor = useCallback(() => {
    if (
      cursorVisible.current &&
      cursorInnerRef.current &&
      cursorOuterRef.current
    ) {
      // Outer cursor - responsive
      gsap.to(cursorOuterRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: config.speed,
        ease: "power2.out",
      });

      // Inner cursor - smooth trailing
      gsap.to(cursorInnerRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: config.trailingSpeed,
        ease: "power3.out",
      });
    }

    rafId.current = requestAnimationFrame(updateCursor);
  }, [config.speed, config.trailingSpeed]);

  // Setup event listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Start animation loop
    updateCursor();

    // Add global event listeners
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial visibility check
    if (document.hasFocus()) {
      handleMouseEnter();
    }

    return () => {
      // Cancel animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Clear timeouts
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }

      // Remove event listeners
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    updateCursorPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    updateCursor,
    handleScroll,
  ]);

  // Setup interactive element detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanupFunctions: (() => void)[] = [];

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      const selector =
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover="true"]';
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        if (!interactiveElements.current.has(element)) {
          interactiveElements.current.add(element);
          const cleanup = addHoverListeners(element);

          cleanupFunctions.push(cleanup);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial scan
    const selector =
      'a, button, input, textarea, select, [role="button"], [data-cursor-hover="true"]';
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      interactiveElements.current.add(element);
      const cleanup = addHoverListeners(element);

      cleanupFunctions.push(cleanup);
    });

    return () => {
      observer.disconnect();
      cleanupFunctions.forEach((cleanup) => cleanup());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interactiveElements.current.clear();
    };
  }, [addHoverListeners]);

  // Context value
  const contextValue = useMemo<CursorContextValue>(
    () => ({
      setHovered: (hovered: boolean) => {
        isHovered.current = hovered;
        if (hovered) {
          handleMouseDown();
        } else {
          handleMouseUp();
        }
      },
      setText: (text: string) => {
        cursorText.current = text;
      },
    }),
    [handleMouseDown, handleMouseUp]
  );

  const innerStyles = {
    width: `${config.innerSize}px`,
    height: `${config.innerSize}px`,
    backgroundColor: config.innerColor,
    opacity: 0,
  };

  const outerStyles = {
    width: `${config.outerSize}px`,
    height: `${config.outerSize}px`,
    borderColor: config.outerColor,
    opacity: 0,
  };

  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <CursorContext.Provider value={contextValue}>
        {/* Inner cursor */}
        <div
          ref={cursorInnerRef}
          style={innerStyles}
          className={`pointer-events-none fixed left-0 top-0 z-[9999] rounded-full ${
            config.mixBlendMode ? "mix-blend-difference" : ""
          } ${config.innerClass}`}
        />

        {/* Outer cursor */}
        <div
          ref={cursorOuterRef}
          className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border bg-transparent ${config.outerClass}`}
          style={outerStyles}
        />
      </CursorContext.Provider>
    );
  }
};
