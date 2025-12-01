"use client";

import React, { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";

import { cn } from "@/lib/utils";

interface MagicTextProps {
  children: string;
  notification?: number;
  className?: string;
  href?: string;
}

export const MagicText: React.FC<MagicTextProps> = ({
  children,
  notification,
  className = "",
  href,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [notificationColor, setNotificationColor] = useState<string>("");

  const colors = {
    white: "#ffffff",
    accent: "#1edbff",
    turquoise: "#202d35",
  };

  const colorKeys = Object.keys(colors) as (keyof typeof colors)[];

  useEffect(() => {
    // Split text into individual letters
    setLetters(Array.from(children));

    // Set random notification color
    if (notification !== undefined) {
      const randomColor =
        // eslint-disable-next-line sonarjs/pseudo-random
        colorKeys[Math.floor(Math.random() * colorKeys.length)];

      // eslint-disable-next-line security/detect-object-injection
      setNotificationColor(colors[randomColor]);
    }
    // eslint-disable-next-line
  }, [children, notification]);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const bars = element.querySelectorAll(".bar");

    // GSAP timeline for hover animations
    const tl = gsap.timeline({ paused: true });

    const gsapEase = "power2.out";

    // Animate bars with staggered delays
    tl.to(
      bars[0],
      {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.5,
        ease: gsapEase,
      },
      0
    )
      .to(
        bars[1],
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.5,
          ease: gsapEase,
        },
        0.05
      )
      .to(
        bars[2],
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.5,
          ease: gsapEase,
        },
        0.1
      );

    const handleMouseEnter = () => {
      tl.play();
    };
    const handleMouseLeave = () => {
      tl.reverse();
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [letters]);

  const props = href ? { href } : {};

  return (
    <div
      ref={textRef}
      className={cn(
        "relative inline-flex cursor-pointer select-none duration-500 ease-in-out hover:text-white",
        className
      )}
      {...props}
    >
      {/* Animated bars */}
      {[colors.turquoise, colors.white, colors.turquoise].map(
        (color, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`bar-${index}`}
            className="bar pointer-events-none absolute bottom-[40%] left-0 z-10 h-[10%] w-full origin-right scale-x-0"
            style={{ backgroundColor: color }}
          />
        )
      )}

      {/* Text letters */}
      {letters.map((letter, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={`${letter}-${index}`}
          className={`pointer-events-none relative ${
            index % 2 === 0 ? "z-20" : "-z-10"
          }`}
          style={{
            whiteSpace: "pre",
            display: "inline-block",
            minWidth: letter === " " ? "0.25em" : "auto",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}

      {notification !== undefined && (
        <span className="pointer-events-none relative">
          <span
            className="absolute -right-12 top-0 flex h-12 w-12 translate-y-full transform items-center justify-center rounded-full text-sm font-bold text-black"
            style={{ backgroundColor: notificationColor }}
          >
            {notification}
          </span>
        </span>
      )}
    </div>
  );
};
