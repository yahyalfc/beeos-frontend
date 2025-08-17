import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ProfilePrizeInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 575 568"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M574 563.602V31.5697C574 30.7725 573.683 30.0081 573.118 29.4453L545.068 1.47714C544.506 0.91643 543.744 0.601562 542.95 0.601562H3C1.34315 0.601562 0 1.94472 0 3.60157V535.001C0 535.798 0.317275 536.563 0.881782 537.125L29.5661 565.726C30.1284 566.287 30.8901 566.602 31.6843 566.602H571C572.657 566.602 574 565.258 574 563.602Z"
        fill="url(#paint0_linear_1552_310)"
      />
      <path
        d="M506 1.60156L542.243 1.60156C543.05 1.60156 543.824 1.92695 544.388 2.50418L573.145 31.9141C573.693 32.4746 574 33.2275 574 34.0114L574 72.6016"
        stroke="#1EDBFF"
        stroke-width="2"
      />
      <path
        d="M69 566.602L32.757 566.602C31.9497 566.602 31.1765 566.276 30.612 565.699L1.85502 536.289C1.30691 535.729 1.00002 534.976 1.00002 534.192L0.999994 495.602"
        stroke="#1EDBFF"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1552_310"
          x1="560.69"
          x2="34.1144"
          y1="0.601529"
          y2="597.109"
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
