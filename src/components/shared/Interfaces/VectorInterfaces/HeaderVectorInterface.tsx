"use client";

import { type FC } from "react";

import { RightTriangle } from "../../UI/RightTriangle/RightTriangle";

interface HeaderVectorInterfaceProps {
  isShort?: boolean;
}

export const HeaderVectorInterface: FC<HeaderVectorInterfaceProps> = ({
  isShort = true,
}) => {
  if (isShort) {
    return (
      <>
        {/* Straight lines */}
        {/* Left Straight line */}
        <div className="block md:hidden absolute top-0 bottom-[var(--header-interface-angle-height)] left-[var(--interface-padding)] w-[var(--interface-border-w)] bg-ring" />

        {/* Right Straight line */}
        <div className="block md:hidden absolute top-0 bottom-[var(--header-interface-angle-height)] right-[var(--interface-padding)] w-[var(--interface-border-w)] bg-ring" />

        {/* Top Straight line */}
        <div className="block md:hidden absolute top-0 left-[calc(var(--interface-padding)+1px)] right-[calc(var(--interface-padding)+1px)] h-[var(--interface-border-w)] bg-ring" />

        {/* Connection sides agnles */}
        {/* Bottom left angle */}
        <div
          className="absolute hidden md:block left-[var(--header-interface-corners-y-value)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--interface-angles-b-w)]"
          data-angle="bottom-left"
        >
          <RightTriangle
            corner="top-left"
            height={14 * 1 + 1}
            strokeColor="var(--ring)"
            strokeWidth={1}
            width={14 * 1.9}
          />
        </div>

        {/* Bottom right angle */}
        <div
          className="absolute hidden md:block right-[var(--header-interface-corners-y-value)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--interface-angles-b-w)]"
          data-angle="bottom-right"
        >
          <RightTriangle
            corner="top-right"
            height={14 * 1 + 1}
            strokeColor="var(--ring)"
            strokeWidth={1}
            width={14 * 1.9}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Straight lines */}
      {/* Left Straight line */}
      <div className="block absolute top-0 bottom-[var(--header-interface-angle-height)] md:bottom-0 left-[var(--interface-padding)] md:left-0 w-[var(--interface-border-w)] bg-ring" />

      {/* Right Straight line */}
      <div className="block absolute top-0 bottom-[var(--header-interface-angle-height)] md:bottom-0 right-[var(--interface-padding)] md:right-0 w-[var(--interface-border-w)] bg-ring" />

      {/* Top Straight line */}
      <div className="block absolute top-0 left-[var(--interface-padding)] right-[var(--interface-padding)] md:left-0 md:right-0 h-[var(--interface-border-w)] bg-ring" />

      {/* Connection short line LEFT */}
      <div className="hidden md:block absolute bottom-0 left-0 right-[calc(100%-var(--interface-padding))] h-[var(--interface-border-w)] bg-ring" />

      {/* Connection short line RIGHT */}
      <div className="hidden md:block absolute bottom-0 right-0 left-[calc(100%-var(--interface-padding))] h-[var(--interface-border-w)] bg-ring" />

      {/* Connection sides agnles */}
      {/* Bottom left angle */}
      <div
        className="absolute hidden md:block left-[var(--header-interface-corners-y-value)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-left"
      >
        <RightTriangle
          corner="top-left"
          height={14 * 1 + 1}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>

      {/* Bottom right angle */}
      <div
        className="absolute hidden md:block right-[var(--header-interface-corners-y-value)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-right"
      >
        <RightTriangle
          corner="top-right"
          height={14 * 1 + 1}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
    </>
  );
};
