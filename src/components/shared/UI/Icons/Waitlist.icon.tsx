import { type FC, type SVGProps } from "react";

export const WaitlistIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="64"
      viewBox="0 0 65 64"
      width="65"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M51.6724 63.42L64.1584 51.0367C64.537 50.6611 64.75 50.1499 64.75 49.6166V2.00003C64.75 0.895466 63.8546 3.5405e-05 62.75 3.46107e-05L15.4451 0C14.9147 0 14.4059 0.210715 14.0309 0.585787L1.33578 13.2809C0.960712 13.6559 0.75 14.1647 0.75 14.6951V62C0.75 63.1046 1.64543 64 2.75 64H50.264C50.7916 64 51.2978 63.7915 51.6724 63.42Z"
        fill="#1EDBFF"
      />
      <path
        d="M23.75 32L30.114 38.364L42.8405 25.636"
        stroke="#060707"
        stroke-linecap="square"
        stroke-width="3"
      />
    </svg>
  );
};
