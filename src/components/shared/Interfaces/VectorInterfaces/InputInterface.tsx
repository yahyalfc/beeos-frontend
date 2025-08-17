"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const InputInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 363 62"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full pointer-events-none",
        className
      )}
      {...props}
    >
      <path
        d="M4 61H359.5C361.157 61 362.5 59.6569 362.5 58V15.3699C362.5 14.4998 362.122 13.6726 361.465 13.1028L348.346 1.73293C347.8 1.26022 347.103 1 346.381 1H4C2.34314 1 1 2.34315 1 4V58C1 59.6569 2.34314 61 4 61Z"
        stroke="url(#paint0_linear_1615_383)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1615_383"
          x1="-14.9637"
          x2="69.1817"
          y1="59.211"
          y2="-127.345"
        >
          <stop stop-color="#3E5967" />
          <stop offset="1" stop-color="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
