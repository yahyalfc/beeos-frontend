import * as React from "react";
import { useRef, useEffect, useLayoutEffect } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import gsap from "gsap";

import useMousePosition from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

// Configuration for the blur effect
const BLUR_CONFIG = {
  SIZE: 260,
  MOVEMENT_BOUNDARY: 60,
  SPRING: {
    duration: 0.6,
    ease: "elastic.out(0.15, 0.85)",
  },
} as const;

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-full text-base font-semibold transition-all disabled:shadow-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-muted text-white shadow-[0px_0px_32px_0px_rgba(30,219,255,1)]",
      },
      size: {
        default: "h-[72px] px-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disableAnimation?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  disableAnimation = false,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const animationRef = useRef<gsap.core.Tween>(null);

  useLayoutEffect(() => {
    if (disableAnimation || props.disabled || !blurRef.current) return;

    // Initialize blur element position
    gsap.set(blurRef.current, {
      x: -BLUR_CONFIG.SIZE,
      y: -BLUR_CONFIG.SIZE,
    });
  }, [disableAnimation, props.disabled]);

  useEffect(() => {
    if (
      disableAnimation ||
      props.disabled ||
      !buttonRef.current ||
      !blurRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    )
      return;

    const button = buttonRef.current;
    const blurElement = blurRef.current;
    const rect = button.getBoundingClientRect();

    // Calculate relative position
    const rawX = mousePosition.x - rect.left;
    const rawY = mousePosition.y - rect.top;

    // Constrain position within boundaries
    const x =
      Math.max(
        -BLUR_CONFIG.MOVEMENT_BOUNDARY,
        Math.min(rect.width + BLUR_CONFIG.MOVEMENT_BOUNDARY, rawX)
      ) -
      BLUR_CONFIG.SIZE / 2;

    const y =
      Math.max(
        -BLUR_CONFIG.MOVEMENT_BOUNDARY,
        Math.min(rect.height + BLUR_CONFIG.MOVEMENT_BOUNDARY, rawY)
      ) -
      BLUR_CONFIG.SIZE / 2;

    // Kill previous animation if exists
    animationRef.current?.kill();

    // Animate to new position
    animationRef.current = gsap.to(blurElement, {
      x,
      y,
      ...BLUR_CONFIG.SPRING,
      overwrite: "auto",
    });

    return () => {
      animationRef.current?.kill();
    };
  }, [mousePosition, disableAnimation, props.disabled]);

  // Render with asChild support
  if (asChild) {
    return (
      <div className="relative inline-flex overflow-hidden rounded-full">
        <Comp
          ref={buttonRef}
          data-slot="button"
          className={cn(
            buttonVariants({ variant, size, className }),
            "relative z-10"
          )}
          {...props}
        >
          {children}
        </Comp>
        {!disableAnimation && !props.disabled && (
          <div
            ref={blurRef}
            className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-accent will-change-transform"
            style={{
              width: BLUR_CONFIG.SIZE,
              height: BLUR_CONFIG.SIZE,
              filter: "blur(40px)",
              WebkitBackfaceVisibility: "hidden",
              WebkitPerspective: 1000,
              WebkitTransform: "translate3d(0,0,0)",
              WebkitTransformStyle: "preserve-3d",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <Comp
      ref={buttonRef}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative overflow-hidden"
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute left-[2px] top-[2px] bottom-[2px] rounded-full z-[1] right-[2px] bg-background" />

      {!disableAnimation && !props.disabled && (
        <div
          ref={blurRef}
          className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-accent will-change-transform"
          style={{
            width: BLUR_CONFIG.SIZE,
            height: BLUR_CONFIG.SIZE,
            filter: "blur(40px)",
            WebkitBackfaceVisibility: "hidden",
            WebkitPerspective: 1000,
            WebkitTransform: "translate3d(0,0,0)",
            WebkitTransformStyle: "preserve-3d",
          }}
        />
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
