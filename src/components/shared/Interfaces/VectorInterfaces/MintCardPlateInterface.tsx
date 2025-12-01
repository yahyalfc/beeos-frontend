"use client";

import { type FC, type SVGProps } from "react";

import { useIsMobile } from "@/hooks/useResponsible";
import { cn } from "@/lib/utils";

export const MintCardPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
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
        viewBox="0 0 363 257"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
          className
        )}
        {...props}
      >
        <path
          d="M4 256.5C2.06701 256.5 0.500009 254.933 0.5 253L0.499981 4.00001C0.500006 2.06704 2.067 0.500007 3.99998 0.500006L359 0.501923C360.933 0.501941 362.5 2.06897 362.5 4.00192L362.498 233.976C362.498 234.901 362.132 235.789 361.479 236.445L342.529 255.472C341.873 256.131 340.98 256.502 340.049 256.502L4 256.5Z"
          fill="#0D0F11"
          stroke="url(#paint0_linear_1555_267)"
        />
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1555_267"
            x1="-14.9418"
            x2="376.025"
            y1="8.60332"
            y2="212.273"
          >
            <stop stopColor="#3E5967" />
            <stop offset="1" stopColor="#1D262B" />
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
      viewBox="0 0 611 261"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M4.00098 260.5C2.06823 260.5 0.501068 258.933 0.500976 257L0.499981 4.00012L0.504864 3.82044C0.595362 2.03044 2.03031 0.595536 3.82029 0.505006L3.99998 0.500123L607 0.500061C608.933 0.500061 610.5 2.06709 610.5 4.00006L610.5 238.11C610.5 239.04 610.13 239.932 609.472 240.589L590.528 259.479C589.872 260.133 588.983 260.5 588.057 260.5L4.00098 260.5Z"
        fill="#0D0F11"
        stroke="url(#paint0_linear_1549_283)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1549_283"
          x1="-25.8932"
          x2="453.642"
          y1="8.72256"
          y2="423.64"
        >
          <stop stop-color="#3E5967" />
          <stop offset="1" stop-color="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
