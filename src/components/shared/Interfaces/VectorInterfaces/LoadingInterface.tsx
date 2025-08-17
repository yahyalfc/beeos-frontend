"use client";

import { type FC } from "react";

import { RightTriangle } from "../../UI/RightTriangle/RightTriangle";

export const LoadingInterface: FC = ({}) => {
  return (
    <div
      className="fixed z-[8500] top-0 left-0 w-full h-full pointer-events-none border-ring border-solid"
      style={{
        borderWidth: "var(--interface-border-w)",
      }}
    >
      {/* Top angles */}
      <div
        className="absolute left-[var(--interface-padding)] top-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="top-left"
      >
        <RightTriangle
          corner="top-left"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
        <div
        className="absolute right-[var(--interface-padding)] top-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="top-right"
      >
        <RightTriangle
          corner="top-right"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
      {/* Top side */}
      <div className="absolute top-[var(--interface-padding)] left-[var(--interface-corners-y-value)] right-[var(--interface-corners-y-value)] h-[var(--interface-border-w)] bg-ring" />
      {/* Left side + connection agnle */}
      <div
        className="absolute left-[var(--interface-padding)] top-[var(--interface-corners-bottom-v)] bottom-[var(--interface-corners-bottom-v)] w-[var(--interface-border-w)] bg-ring"
        data-corner="left"
      />
      <div
        className="absolute left-[var(--interface-padding)] bottom-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-left"
      >
        <RightTriangle
          corner="bottom-left"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
      {/* Bottom side */}
      <div className="absolute bottom-[var(--interface-padding)] left-[var(--interface-corners-y-value)] right-[var(--interface-corners-y-value)] h-[var(--interface-border-w)] bg-ring" />
      {/* Right side + connection agnle */}
      <div
        className="absolute right-[var(--interface-padding)] top-[var(--interface-corners-bottom-v)] bottom-[var(--interface-corners-bottom-v)] w-[var(--interface-border-w)] bg-ring"
        data-corner="right"
      />
      <div
        className="absolute right-[var(--interface-padding)] bottom-[var(--interface-padding)] h-[var(--interface-angles-b-h)] w-[var(--interface-angles-b-w)]"
        data-angle="bottom-right"
      >
        <RightTriangle
          corner="bottom-right"
          height={14 * 1.4}
          strokeColor="var(--ring)"
          strokeWidth={1}
          width={14 * 1.9}
        />
      </div>
    </div>
  );
};
