"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ButtonACCENTMiniPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
}) => {
  return (
    <>
      <div
        className={cn(
          "absolute z-0 left-0 right-0 bottom-0 top-0 w-full h-full grid grid-cols-1 grid-rows-1",
          className
        )}
      >
        <div className="relative w-full h-full grid grid-cols-[auto_1fr_auto] grid-rows-1 p-1">
          <div className="h-full w-auto aspect-[14/48]">
            <AccentBtnPartLeftMini
              className="w-full h-full"
            />
          </div>
          <div className="bg-[#17252D] scale-x-[1.07] h-full w-full" />
          <div className="h-full w-auto aspect-[14/48] ">
            <AccentBtnPartRightMini
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute z-0 left-0 right-0 bottom-0 top-0 w-full h-full grid grid-cols-1 grid-rows-1",
          className
        )}
      >
        <div className="relative w-full h-full grid grid-cols-[auto_1fr_auto] grid-rows-1">
          <div className="h-full w-auto aspect-[20/58]">
            <AccentBtnPartLeftBorder
              className="w-full h-full"
            />
          </div>
          <div className="h-full w-full border-y border-[#17252D]" />
          <div className="h-full w-auto aspect-[20/58] ">
            <AccentBtnPartRightBorder
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const AccentBtnPartRightMini: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="48"
      viewBox="0 0 14 48"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0V48H0.555102C1.08217 48 1.58792 47.7919 1.96242 47.4211L13.4042 36.0901C13.7853 35.7126 13.9989 35.1979 13.9968 34.6614L13.8737 1.99246C13.8695 0.890842 12.9753 0 11.8737 0H0Z"
        fill="#17252D"
      />
    </svg>
  );
};

export const AccentBtnPartLeftMini: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="48"
      viewBox="0 0 14 48"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.32165e-06 13.3278L0.000174891 46C0.000180658 47.1046 0.895608 48 2.00017 48H12.4866H14V0H13.3156C12.7848 0 12.2758 0.21101 11.9006 0.586548L0.585031 11.9143C0.21042 12.2894 0 12.7977 4.32165e-06 13.3278Z"
        fill="#17252D"
      />
    </svg>
  );
};

export const AccentBtnPartRightBorder: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="58"
      viewBox="0 0 20 58"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 1H15.9903C17.6509 1 18.9956 2.34906 18.9903 4.00968L18.87 41.271C18.8675 42.0586 18.5553 42.8136 18.0009 43.373L4.49707 57"
        stroke="#17252D"
      />
      <path
        d="M0 57H3.25736C4.05301 57 4.81607 56.6839 5.37868 56.1213L7.5 54"
        stroke="#1EDBFF"
      />
      <path d="M14 1L16 1C17.6569 1 19 2.34315 19 4L19 6" stroke="#1EDBFF" />
    </svg>
  );
};

export const AccentBtnPartLeftBorder: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="none"
      height="58"
      viewBox="0 0 20 58"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 1H16.7426C15.947 1 15.1839 1.31607 14.6213 1.87868L1.87868 14.6213C1.31607 15.1839 1 15.947 1 16.7426V54C1 55.6569 2.34315 57 4 57H20"
        stroke="#17252D"
      />
      <path
        d="M20 1L16.6098 1C15.8936 1 15.2011 1.25618 14.6574 1.72223L12 4"
        stroke="#1EDBFF"
      />
      <path d="M6 57H4C2.34315 57 1 55.6569 1 54V52" stroke="#1EDBFF" />
    </svg>
  );
};
