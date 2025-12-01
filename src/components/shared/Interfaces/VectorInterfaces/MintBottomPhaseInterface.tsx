"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

interface MintPhaseBottomInterfaceProps extends SVGProps<SVGSVGElement> {
  variant: "default" | "accent";
}

export const MintPhaseBottomInterface: FC<MintPhaseBottomInterfaceProps> = ({
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
          d="M593.377 51.5L3 51.5001C1.6193 51.5001 0.500031 50.3807 0.5 49.0001L0.499996 3.50006C0.500064 2.1194 1.61932 1.00006 3 1.00006L606.999 1.00098C608.38 1.00098 609.499 2.12027 609.499 3.50098L609.499 37.1348C609.499 37.8576 609.186 38.5448 608.641 39.0195L595.019 50.8848C594.62 51.2317 594.124 51.4431 593.602 51.4902L593.377 51.5Z"
          stroke="url(#paint0_linear_1618_380)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1618_380"
            x1="609.999"
            x2="406.028"
            y1="52"
            y2="-262.681"
          >
            <stop stop-color="#0A5161" />
            <stop offset="0.528874" stop-color="#20D7FF" />
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
        d="M593.377 51.5L3 51.5001C1.6193 51.5001 0.500031 50.3807 0.5 49.0001L0.499996 3.50006C0.500064 2.1194 1.61932 1.00006 3 1.00006L606.999 1.00098C608.38 1.00098 609.499 2.12027 609.499 3.50098L609.499 37.1348C609.499 37.8576 609.186 38.5448 608.641 39.0195L595.019 50.8848C594.62 51.2317 594.124 51.4431 593.602 51.4902L593.377 51.5Z"
        stroke="#212D35"
      />
    </svg>
  );
};
