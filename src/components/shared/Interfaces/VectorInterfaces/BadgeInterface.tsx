"use client";

import { type FC } from "react";

export const BadgeInterface: FC = ({}) => {
  return (
    <>
      {/* Main bg part */}
      <div className="absolute bg-nero left-2.5 right-2.5 h-full top-0 bottom-0" />

      {/* Corners */}
      <SmallPlateLeft />
      <SmallPlateRight />
    </>
  );
};

const SmallPlateLeft: FC = () => (
  <svg
    className="absolute left-0 top-0"
    fill="none"
    height="36"
    viewBox="0 0 10 36"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 10.2857L10 0V36H0V10.2857Z" fill="#181B1E" />
  </svg>
);

const SmallPlateRight: FC = () => (
  <svg
    className="absolute right-0 top-0"
    fill="none"
    height="36"
    viewBox="0 0 10 36"
    width="10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 25.7143L-2.86102e-06 36L-1.07205e-07 -9.99118e-07L10 0L10 25.7143Z"
      fill="#181B1E"
    />
  </svg>
);
