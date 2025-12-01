"use client";

import { type FC, type SVGProps } from "react";

import { useIsMobile } from "@/hooks/useResponsible";
import { cn } from "@/lib/utils";

export const ButtonWIDEPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <svg
        fill="none"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 363 62"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
          className
        )}
        {...props}
      >
        <path
          d="M1.58579 12.9162L12.9142 1.58774C13.2893 1.21267 13.798 1.00195 14.3285 1.00195H360C361.105 1.00195 362 1.89738 362 3.00195V47.6735C362 48.204 361.789 48.7127 361.414 49.0877L350.086 60.4162C349.711 60.7912 349.202 61.002 348.672 61.002H3C1.89543 61.002 1 60.1065 1 59.002V14.3304C1 13.7999 1.21071 13.2912 1.58579 12.9162Z"
          fill="#0D0F11"
          stroke="url(#paint0_linear_1556_278)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1556_278"
            x1="377.942"
            x2="293.719"
            y1="2.79095"
            y2="189.26"
          >
            <stop stop-color="#3E5967" />
            <stop offset="1" stop-color="#1D262B" />
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
      viewBox="0 0 612 62"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M1.58579 12.9142L12.9142 1.58578C13.2893 1.21071 13.798 1 14.3285 1H609C610.105 1 611 1.89543 611 3V47.6716C611 48.202 610.789 48.7107 610.414 49.0858L599.086 60.4142C598.711 60.7893 598.202 61 597.672 61H3C1.89543 61 1 60.1046 1 59V14.3284C1 13.798 1.21071 13.2893 1.58579 12.9142Z"
        fill="#0D0F11"
        stroke="url(#paint0_linear_1549_279)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1549_279"
          x1="637.937"
          x2="581.928"
          y1="2.78899"
          y2="212.327"
        >
          <stop stopColor="#3E5967" />
          <stop offset="1" stopColor="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
