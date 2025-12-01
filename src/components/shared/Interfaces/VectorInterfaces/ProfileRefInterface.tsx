import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ProfileRefInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 574 276"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M3.34914 0.831462L570.965 0.831512C572.622 0.831512 574 2.17468 574 3.83151L574 243.254C574 244.054 573.68 244.821 573.112 245.384L543.906 274.334C543.344 274.89 542.585 275.203 541.794 275.203L3.31427 275.203C1.65741 275.203 0.31427 273.86 0.31427 272.203L0.314293 3.83146C0.314294 2.1746 1.69228 0.831462 3.34914 0.831462Z"
        fill="url(#paint0_linear_1552_303)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1552_303"
          x1="13.6174"
          x2="199.776"
          y1="275.203"
          y2="-159.586"
        >
          <stop stop-color="#0E1010" />
          <stop offset="0.312525" stop-color="#0D1010" />
          <stop offset="0.625029" stop-color="#131919" />
          <stop offset="0.985611" stop-color="#0C0E0E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
