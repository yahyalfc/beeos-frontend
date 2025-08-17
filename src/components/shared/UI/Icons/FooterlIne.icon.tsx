import { type FC, type SVGProps } from "react";

export const FooterlIne: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="75"
      viewBox="0 0 1410 75"
      width="1410"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 69.5801L103 12.5H1307L1405 69.5801" stroke="#212D35" />
      <g filter="url(#filter0_d_1497_746)">
        <rect
          fill="url(#paint0_linear_1497_746)"
          height="1"
          width="198"
          x="388"
          y="12"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="25"
          id="filter0_d_1497_746"
          width="222"
          x="376"
          y="0"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.45098 0 0 0 0 0.898039 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_1497_746"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1497_746"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1497_746"
          x1="388"
          x2="586"
          y1="12.5"
          y2="12.5"
        >
          <stop stopColor="#212D35" />
          <stop offset="0.250729" stopColor="#537389" />
          <stop offset="0.500027" stopColor="#73E5FF" />
          <stop offset="0.747252" stopColor="#537389" />
          <stop offset="1" stopColor="#212D35" />
        </linearGradient>
      </defs>
    </svg>
  );
};
