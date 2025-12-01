import { type FC, type SVGProps } from "react";

export const InputOutline: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="62"
      viewBox="0 0 367 62"
      width="367"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 61H363C364.657 61 366 59.6569 366 58V15.3699C366 14.4998 365.622 13.6726 364.965 13.1028L351.846 1.73293C351.3 1.26022 350.603 1 349.881 1H4C2.34314 1 1 2.34315 1 4V58C1 59.6569 2.34314 61 4 61Z"
        stroke="url(#paint0_linear_1497_792)"
      />
      <path
        d="M335 0.999999L350.04 0.999999C350.766 0.999999 351.467 1.26302 352.013 1.74033L364.973 13.058C365.626 13.6277 366 14.4515 366 15.3176L366 31"
        stroke="white"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1497_792"
          x1="-15.1182"
          x2="68.49"
          y1="59.211"
          y2="-127.949"
        >
          <stop stopColor="#3E5967" />
          <stop offset="1" stopColor="#1D262B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
