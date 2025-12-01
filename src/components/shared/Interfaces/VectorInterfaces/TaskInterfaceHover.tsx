import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const TaskHoverInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 455 224"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <foreignObject height="98%" width="100%" x={2} x1={2} x2={2}y={2} y1={2} y2={2}>
        <div
          style={{
            backdropFilter: "blur(5px)",
            clipPath: "url(#bgblur_0_1564_272_clip_path)",
            height: "100%",
            width: "100%",
          }}
         />
      </foreignObject>
      <path
        d="M4.00001 0.999948L451 0.999909C452.657 0.999909 454 2.34305 454 3.99991L454 197.741C454 198.546 453.676 199.318 453.101 199.882L430.419 222.141C429.858 222.692 429.104 223 428.318 223L4.00021 223C2.34335 223 1.00021 221.657 1.00021 220L1.00001 3.99995C1.00001 2.34309 2.34315 0.999948 4.00001 0.999948Z"
        data-figma-bg-blur-radius="10"
        fill="#0F1414"
        fill-opacity="0.8"
        stroke="currentColor"
      />
      <defs>
        <clipPath
          id="bgblur_0_1566_274_clip_path"
          transform="translate(9.5 9.5)"
        >
          <path d="M4.00001 0.999948L451 0.999909C452.657 0.999909 454 2.34305 454 3.99991L454 197.741C454 198.546 453.676 199.318 453.101 199.882L430.419 222.141C429.858 222.692 429.104 223 428.318 223L4.00021 223C2.34335 223 1.00021 221.657 1.00021 220L1.00001 3.99995C1.00001 2.34309 2.34315 0.999948 4.00001 0.999948Z" />
        </clipPath>
      </defs>
    </svg>
  );
};
