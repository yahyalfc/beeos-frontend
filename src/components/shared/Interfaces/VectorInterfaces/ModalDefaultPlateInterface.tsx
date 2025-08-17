"use client";

import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const ModalDefaultPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {

  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 457 405"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <path
        d="M457 402L457 28.6951C457 27.8994 456.684 27.1363 456.121 26.5737L430.425 0.878643C429.863 0.316056 429.1 0 428.304 0H3C1.34315 0 0 1.34313 0 2.99999V375.721C0 376.517 0.316086 377.28 0.878717 377.842L27.1588 404.121C27.7214 404.684 28.4844 405 29.2801 405H454C455.657 405 457 403.657 457 402Z"
        fill="url(#paint0_linear_1615_382)"
      />
      <path
        d="M395 0.999999L427.963 0.999999C428.753 0.999999 429.511 1.31139 430.073 1.86662L455.109 26.6193C455.679 27.1829 456 27.9511 456 28.7527L456 66"
        stroke="currentColor"
        stroke-width="2"
      />
      <path
        d="M61 404L29.2588 404C28.4536 404 27.6822 403.676 27.1181 403.102L1.85931 377.375C1.30856 376.814 1 376.06 1 375.273L1 338"
        stroke="currentColor"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1615_382"
          x1="446.403"
          x2="76.629"
          y1="-2.39312e-05"
          y2="466.077"
        >
          <stop stop-color="#0E1010" />
          <stop offset="0.312525" stop-color="#0D1010" />
          <stop offset="0.625029" stop-color="#131919" />
          <stop offset="0.985611" stop-color="#0C0E0E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
