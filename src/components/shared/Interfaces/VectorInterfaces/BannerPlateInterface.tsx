import { type FC, type SVGProps } from "react";

import { cn } from "@/lib/utils";

export const BannerPlateInterface: FC<SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 447 78"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute top-0 left-0 right-0 bottom-0 w-full h-full",
        className
      )}
      {...props}
    >
      <defs>
        <clipPath id="bgblur_clip_path">
          <path d="M0.999023 77L445.499 77L445.633 15.6422L428.623 1.00002L1.133 1L0.999023 77Z" />
        </clipPath>
      </defs>

      {/* Blur effect using foreignObject with percentage dimensions */}
      <foreignObject
        clipPath="url(#bgblur_clip_path)"
        height="100%"
        width="100%"
        x="0"
        y="0"
      >
        <div
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)", // Safari support
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
      </foreignObject>

      {/* Border stroke */}
      <path
        d="M0.999023 77L445.499 77L445.633 15.6422L428.623 1.00002L1.133 1L0.999023 77Z"
        fill="none"
        stroke="white"
        strokeOpacity="0.3"
      />
    </svg>
  );
};
