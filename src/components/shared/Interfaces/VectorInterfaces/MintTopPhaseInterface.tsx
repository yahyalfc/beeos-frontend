"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

interface MintPhaseTopInterfaceProps extends SVGProps<SVGSVGElement> {
  variant: "default" | "accent";
}

export const MintPhaseTopInterface: FC<MintPhaseTopInterfaceProps> = ({
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
        viewBox="0 0 610 51"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
          className
        )}
        {...props}
      >
        <path
          d="M596.757 0.500001L3 0.501038C1.61928 0.50104 0.5 1.62033 0.5 3.00104L0.500004 48.0001C0.500037 49.3807 1.61931 50.5001 3 50.5001L606.999 50.5C608.38 50.5 609.499 49.3807 609.499 48L609.499 13.2422L609.486 12.9951C609.429 12.4229 609.177 11.8848 608.767 11.4746L598.524 1.23242C598.114 0.822239 597.576 0.569567 597.004 0.512697L596.757 0.500001Z"
          stroke="url(#paint0_linear_1618_369)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1618_369"
            x1="610"
            x2="6.98171e-06"
            y1="51"
            y2="-1.71126e-05"
          >
            <stop stop-color="#0A5161" />
            <stop offset="0.5" stop-color="#20D7FF" />
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
      viewBox="0 0 610 51"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M596.757 0.500001L3 0.501038C1.61928 0.50104 0.5 1.62033 0.5 3.00104L0.500004 48.0001C0.500037 49.3807 1.61931 50.5001 3 50.5001L606.999 50.5C608.38 50.5 609.499 49.3807 609.499 48L609.499 13.2422L609.486 12.9951C609.429 12.4229 609.177 11.8848 608.767 11.4746L598.524 1.23242C598.114 0.822239 597.576 0.569567 597.004 0.512697L596.757 0.500001Z"
        stroke="#1D262B"
      />
    </svg>
  );
};
