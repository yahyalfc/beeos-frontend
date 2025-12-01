"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

interface MintPhaseMiddleInterfaceProps extends SVGProps<SVGSVGElement> {
  variant: "default" | "accent";
}

export const MintPhaseMiddleInterface: FC<MintPhaseMiddleInterfaceProps> = ({
  className,
  variant,
  ...props
}) => {
  if (variant === "accent") {
    return (
      <svg
        fill="none"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 610 52"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
          className
        )}
        {...props}
      >
        <path
          d="M606.999 0.5L597.999 0.500001L3 0.501038C1.61928 0.50104 0.5 1.62033 0.5 3.00104L0.500004 48.5001C0.500037 49.8807 1.61931 51.0001 3 51.0001L606.999 51C608.38 51 609.499 49.8807 609.499 48.5L609.499 3C609.499 1.61929 608.38 0.5 606.999 0.5Z"
          stroke="url(#paint0_linear_1618_402)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1618_402"
            x1="610"
            x2="-2.24378e-05"
            y1="52.5"
            y2="-2.15437e-05"
          >
            <stop stop-color="#0A5161" />
            <stop offset="0.53" stop-color="#20D7FF" />
            <stop offset="1" stop-color="#0A5161" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 610 52"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M606.999 0.5L597.999 0.500001L3 0.501038C1.61928 0.50104 0.5 1.62033 0.5 3.00104L0.500004 48.5001C0.500037 49.8807 1.61931 51.0001 3 51.0001L606.999 51C608.38 51 609.499 49.8807 609.499 48.5L609.499 3C609.499 1.61929 608.38 0.5 606.999 0.5Z"
        stroke="#212D35"
      />
    </svg>
  );
};
