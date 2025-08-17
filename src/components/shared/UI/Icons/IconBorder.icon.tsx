import { type FC, type SVGProps } from "react";

export const IconBorder: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="49"
      viewBox="0 0 49 49"
      width="49"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M48 48H10.5L1 38.5V1H38.5L48 10.5V48Z" stroke="#212D35" />
    </svg>
  );
};
