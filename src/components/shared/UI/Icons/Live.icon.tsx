import { type FC, type SVGProps } from "react";

export const LiveIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="22"
      viewBox="0 0 20 22"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1545_379)">
        <rect
          fill="#334650"
          fillOpacity="0.25"
          height="20"
          rx="10"
          transform="matrix(-4.37114e-08 -1 0.999994 0.00361804 0 20.9638)"
          width="20"
        />
        <g filter="url(#filter1_d_1545_379)">
          <circle
            cx="5"
            cy="5"
            fill="#51E3FF"
            r="5"
            transform="matrix(-4.37114e-08 -1 0.999994 0.00361804 5 15.9638)"
          />
        </g>
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="20.0001"
          id="filter1_d_1545_379"
          width="20"
          x="0"
          y="0.981873"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.317647 0 0 0 0 0.890196 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_1545_379"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1545_379"
            mode="normal"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1545_379">
          <rect
            fill="white"
            height="20"
            rx="10"
            transform="matrix(-4.37114e-08 -1 0.999994 0.00361804 0 20.9638)"
            width="20"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
