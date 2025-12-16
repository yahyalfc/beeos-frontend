import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ProfileXPInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 574 275"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full  svg-interface-bg",
        className
      )}
      {...props}
    >
      <path
        d="M3.3491 274.372L570.965 274.372C572.622 274.372 574 273.029 574 271.372L574 31.9496C574 31.1494 573.68 30.3823 573.112 29.819L543.906 0.869571C543.344 0.312685 542.585 0.000241407 541.794 0.000241338L3.31427 0.00028746C1.65741 0.000287601 0.31427 1.34344 0.31427 3.0003L0.314246 271.372C0.314246 273.029 1.69224 274.372 3.3491 274.372Z"
        fill="url(#paint0_linear_1552_299)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1552_299"
          x1="13.6174"
          x2="199.776"
          y1="0.000179171"
          y2="434.789"
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
