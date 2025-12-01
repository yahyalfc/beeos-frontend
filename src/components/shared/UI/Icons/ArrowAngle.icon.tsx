import { type FC, type SVGProps } from "react";

export const ArrowAngleIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="white"
        stroke-linecap="square"
        stroke-width="1.5"
      />
    </svg>
  );
};
