import { type FC, type SVGProps } from "react";

export const OffIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="141"
      viewBox="0 0 141 141"
      width="141"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_1552_293)">
        <path
          d="M33.0598 31.4892C23.0598 41.2924 16.8555 54.9533 16.8555 70.0632C16.8555 99.8945 41.0385 124.078 70.8698 124.078C100.701 124.078 124.884 99.8945 124.884 70.0632C124.884 40.2319 100.701 16.0488 70.8698 16.0488V31.4892M70.8698 70.0632L49.2641 48.4575"
          shapeRendering="crispEdges"
          stroke="#00BAFF"
          strokeLinecap="square"
          strokeOpacity="0.2"
          strokeWidth="12"
        />
      </g>
      <path
        d="M33.2043 31.4404C23.2043 41.2436 17 54.9044 17 70.0144C17 99.8457 41.1831 124.029 71.0144 124.029C100.846 124.029 125.029 99.8457 125.029 70.0144C125.029 40.1831 100.846 16 71.0144 16V31.4404M71.0144 70.0144L49.4086 48.4086"
        stroke="#1EDBFF"
        strokeLinecap="square"
        strokeWidth="12"
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="140.029"
          id="filter0_d_1552_293"
          width="140.029"
          x="0.855469"
          y="0.0488281"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.729412 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_1552_293"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1552_293"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
