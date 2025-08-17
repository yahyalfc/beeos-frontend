import { type FC, type SVGProps } from "react";

export const SendIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="40"
      viewBox="0 0 40 40"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 0H18.9744H30.4902C31.0161 0 31.5209 0.207202 31.8953 0.57673L39.3282 7.91476C39.7076 8.28933 39.9217 8.79987 39.9231 9.33302L39.995 37.995C39.9977 39.1015 39.1015 40 37.995 40H2C0.895431 40 0 39.1046 0 38V2C0 0.895431 0.89543 0 2 0Z"
        fill="white"
      />
      <path
        d="M15 25L25 15M25 15H17M25 15V23"
        stroke="#0A1621"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
};
