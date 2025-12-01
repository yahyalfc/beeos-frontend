"use client";

import { type FC } from "react";

import { RightTriangle } from "../../UI/RightTriangle/RightTriangle";

export const HeaderMenuInterface: FC = ({}) => {
  return (
    <div className="pointer-events-none">
      {/* Backgrounds */}
      {/* Main background */}
      <div className="absolute top-0 left-0 right-0 bottom-[calc(var(--interface-padding)+var(--interface-border-w))] bg-bg-secondary" />

      {/* Bottom part of background */}
      <div className="absolute left-[var(--header-interface-btn-angle-size)] right-[var(--header-interface-btn-angle-size)] h-[var(--header-interface-angle-height)] bottom-[var(--interface-border-w)] bg-bg-secondary" />

      {/* Angles with background */}
      {/* Bottom left angle */}
      <div
        className="absolute left-0 bottom-[var(--interface-border-w)] h-[var(--header-interface-angle-height)] w-[var(--header-interface-btn-angle-size)]"
        data-angle="bottom-left"
      >
        <RightTriangle
        corner="top-right"
          height={14 * 1 + 1}
          isFilled="#0a141e"
          strokeColor="var(--ring)"
          strokeWidth={2}
          width={14 * 1.57 + 2}
        />
      </div>

      {/* Bottom right angle */}
      <div
        className="absolute right-0 bottom-[var(--interface-border-w)] h-[var(--header-interface-angle-height)] w-[var(--header-interface-btn-angle-size)]"
        data-angle="bottom-right"
      >
        <RightTriangle
        corner="top-left"
          height={14 * 1 + 1}
          isFilled="#0a141e"
          strokeColor="var(--ring)"
          strokeWidth={2}
          width={14 * 1.57 + 2}
        />
      </div>

      {/* Lines */}
      <div className="absolute top-0 left-0 right-0 h-[var(--interface-border-w)] bg-ring" />
      <div className="absolute left-[var(--header-interface-btn-angle-size)] right-[var(--header-interface-btn-angle-size)] bottom-[var(--interface-border-w)] h-[var(--interface-border-w)] bg-ring" />
      <div className="absolute top-0 left-0 bottom-[var(--header-interface-angle-height)]  w-[var(--interface-border-w)] bg-ring" />
      <div className="absolute top-0 right-0 bottom-[var(--header-interface-angle-height)]  w-[var(--interface-border-w)] bg-ring" />
    </div>
  );
};
