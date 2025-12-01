import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const TaskInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 453 222"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <foreignObject height="100%" width="100%" x="-10" y="-10">
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
        d="M3.00001 -5.22125e-05L450 -9.12905e-05C451.657 -9.14353e-05 453 1.34305 453 2.99991L453 196.741C453 197.546 452.676 198.318 452.101 198.882L429.419 221.141C428.858 221.692 428.104 222 427.318 222L3.00021 222C1.34335 222 0.000213506 220.657 0.000213361 219L1.1372e-05 2.99995C1.12271e-05 1.34309 1.34315 -5.20676e-05 3.00001 -5.22125e-05Z"
        data-figma-bg-blur-radius="10"
        fill="#0F1414"
        fill-opacity="0.8"
      />
      <defs>
        <clipPath id="bgblur_0_1564_272_clip_path" transform="translate(10 10)">
          <path d="M3.00001 -5.22125e-05L450 -9.12905e-05C451.657 -9.14353e-05 453 1.34305 453 2.99991L453 196.741C453 197.546 452.676 198.318 452.101 198.882L429.419 221.141C428.858 221.692 428.104 222 427.318 222L3.00021 222C1.34335 222 0.000213506 220.657 0.000213361 219L1.1372e-05 2.99995C1.12271e-05 1.34309 1.34315 -5.20676e-05 3.00001 -5.22125e-05Z" />
        </clipPath>
      </defs>
    </svg>

    // <svg
    //   width="100%"
    //   preserveAspectRatio="none"
    //   height="100%"
    //   viewBox="0 0 453 222"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={cn(
    //     "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
    //     className
    //   )}
    //   {...props}
    // >
    //   <path
    //     d="M3.00001 -5.22125e-05L450 -9.12905e-05C451.657 -9.14353e-05 453 1.34305 453 2.99991L453 196.741C453 197.546 452.676 198.318 452.101 198.882L429.419 221.141C428.858 221.692 428.104 222 427.318 222L3.00021 222C1.34335 222 0.000213506 220.657 0.000213361 219L1.1372e-05 2.99995C1.12271e-05 1.34309 1.34315 -5.20676e-05 3.00001 -5.22125e-05Z"
    //     fill="#0D1111"
    //   />
    // </svg>
  );
};
