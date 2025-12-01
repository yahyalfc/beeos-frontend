"use client";

import { type FC } from "react";

import { useDeviceDetection } from "@/hooks/useResponsible";

interface ShadowInterfaceProps {
  gradientTopRef: React.RefObject<HTMLDivElement | null>;
  gradientBottomRef: React.RefObject<HTMLDivElement | null>;
}

export const ShadowInterface: FC<ShadowInterfaceProps> = ({
  gradientTopRef,
  gradientBottomRef,
}) => {
  const { isMobile } = useDeviceDetection();
  return (
    <>
      <div
        ref={gradientTopRef}
        className="absolute top-0 left-0 right-0 w-full h-[calc(var(--header-height)*1.85)] md:h-[20svh] z-[2] opacity-0"
        style={{
          background:
            `linear-gradient(to bottom, var(--background) ${isMobile ? 59 : 30}%, transparent 100%)`,
        }}
      />
      <div
        ref={gradientBottomRef}
        className="absolute bottom-0 left-0 right-0 w-full h-[10svh] sm:h-[16svh] z-[2] opacity-0"
        style={{
          background:
            `linear-gradient(to top, var(--background) ${isMobile ? 20 : 0}%, transparent 100%)`,
        }}
      />
    </>
  );
};
