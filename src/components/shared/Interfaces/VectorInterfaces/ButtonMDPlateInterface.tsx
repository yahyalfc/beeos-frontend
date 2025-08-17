import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ButtonMDPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 297 50"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M3 49.4993C1.61927 49.4993 0.5 48.38 0.5 46.9993L0.499997 2.9993C0.500172 1.70514 1.48373 0.641115 2.74414 0.512969L3 0.499297L294 0.500244C295.381 0.500249 296.5 1.61959 296.5 3.00024L296.5 36.1721C296.5 36.835 296.236 37.4709 295.768 37.9397L284.939 48.7678C284.471 49.2366 283.835 49.5002 283.172 49.5002L3 49.4993Z"
        fill="#0D0F11"
        stroke="url(#paint0_linear_1545_376)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1545_376"
          x1="-12.0271"
          x2="54.4044"
          y1="2.43086"
          y2="152.666"
        >
          <stop stopColor="#3E5967" />
          <stop offset="1" stopColor="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
