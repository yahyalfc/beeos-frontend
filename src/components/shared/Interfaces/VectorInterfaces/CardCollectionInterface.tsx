import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const CardCollectionInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 335 210"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M4 209.501C2.06701 209.501 0.500016 207.934 0.5 206.001L0.499985 3.99979C0.5001 2.06692 2.06709 0.499839 3.99998 0.499789L331 0.499756C332.933 0.499767 334.5 2.06686 334.5 3.99976L334.499 187.054C334.499 187.983 334.13 188.874 333.474 189.53L314.527 208.475C313.871 209.132 312.981 209.501 312.053 209.501L4 209.501Z"
        stroke="url(#paint0_linear_1545_361)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1545_361"
          x1="-13.7052"
          x2="326.675"
          y1="7.20188"
          y2="207.726"
        >
          <stop stopColor="#3E5967" />
          <stop offset="1" stopColor="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
