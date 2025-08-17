"use client";

import { type FC } from "react";

import { cn } from "@/lib/utils";

import { RightTriangle } from "../UI/RightTriangle/RightTriangle";

interface HeaderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hasCorners?: boolean;
  hasNoLeftAngle?: boolean;
  hasNoRightAngle?: boolean;
}

export const HeaderCard: FC<HeaderCardProps> = ({
  children,
  hasCorners,
  hasNoLeftAngle = false,
  hasNoRightAngle = false,
  onClick,
  className,
}) => {
  return (
    <div
      role="button"
      className={cn(
        "h-[var(--header-height)] relative px-8 sm:px-9 pb-1",
        className
      )}
      onClick={onClick}
    >
      {children}
      {/* UI Interface */}
      {hasCorners ? (
        <>
          <div
            className="absolute top-0 left-0 pointer-events-none bg-ring w-[var(--interface-border-w)]"
            style={{
              height: !hasNoLeftAngle
                ? "calc(100% - var(--header-interface-angle-height))"
                : "100%",
            }}
          />
          <div className="absolute top-0 right-0 h-[calc(100%-var(--header-interface-angle-height))] pointer-events-none bg-ring w-[var(--interface-border-w)]" />
        </>
      ) : null}
      <div
        className="absolute bottom-0 bg-ring h-[var(--interface-border-w)]"
        style={{
          left: !hasNoLeftAngle ? "var(--interface-corners-btn-y-value)" : 0,
          right: !hasNoRightAngle ? "var(--interface-corners-btn-y-value)" : 0,
        }}
      />

      {!hasNoLeftAngle ? (
        <div
          className="absolute left-[var(--interface-border-capacity)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--header-interface-btn-angle-size)]"
          data-angle="bottom-left"
        >
          <RightTriangle
            corner="bottom-left"
            height={14 * 1 + 1}
            strokeColor="var(--ring)"
            strokeWidth={1}
            width={14 * 1.57 + 2}
          />
        </div>
      ) : null}

      {!hasNoRightAngle ? (
        <div
          className="absolute right-[var(--interface-border-capacity)] bottom-0 h-[var(--header-interface-angle-height)] w-[var(--header-interface-btn-angle-size)]"
          data-angle="bottom-right"
        >
          <RightTriangle
            corner="bottom-right"
            height={14 * 1 + 1}
            strokeColor="var(--ring)"
            strokeWidth={1}
            width={14 * 1.57 + 2}
          />
        </div>
      ) : null}
    </div>
  );
};
