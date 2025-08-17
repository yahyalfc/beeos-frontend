import { type FC, type SVGProps } from "react";

export const GlobeIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 10H6.66667M2.5 10C2.5 14.1421 5.85786 17.5 10 17.5M2.5 10C2.5 5.85786 5.85786 2.5 10 2.5M6.66667 10H13.3333M6.66667 10C6.66667 14.1421 8.15905 17.5 10 17.5M6.66667 10C6.66667 5.85786 8.15905 2.5 10 2.5M13.3333 10H17.5M13.3333 10C13.3333 5.85786 11.8409 2.5 10 2.5M13.3333 10C13.3333 14.1421 11.8409 17.5 10 17.5M17.5 10C17.5 5.85786 14.1421 2.5 10 2.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </svg>
  );
};
