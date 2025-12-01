import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const MintPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 690 690"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M2.99976 690L687 690C688.657 690 690 688.657 690 687L690 38.7864C690 37.9146 689.621 37.086 688.961 36.5162L647.535 0.729791C646.99 0.259035 646.294 3.82088e-06 645.574 3.88383e-06L3.00006 6.00594e-05C1.3432 6.02043e-05 6.11526e-05 1.34319 6.12974e-05 3.00004L-0.000245116 687C-0.000244971 688.657 1.34289 690 2.99976 690Z"
        fill="url(#paint0_linear_1548_277)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1548_277"
          x1="16"
          x2="658.994"
          y1="1.81513e-05"
          y2="718.236"
        >
          <stop stop-color="#0E1010" />
          <stop offset="0.312525" stopColor="#0D1010" />
          <stop offset="0.625029" stopColor="#131919" />
          <stop offset="0.985611" stopColor="#0C0E0E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
