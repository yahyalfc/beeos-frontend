"use client";

import { type FC } from "react";

import { cn } from "@/lib/utils";

interface HeaderBlockSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export const HeaderBlockSeparator: FC<HeaderBlockSeparatorProps> = ({
  className,
  ...props
}) => {
  const interfaceBorderWidth = "var(--interface-border-w)";
  return (
    <div
      className={cn(
        "flex-1 h-[var(--header-interface-height)] border-solid border-ring",
        className
      )}
      {...props}
      style={{
        borderBottomWidth: interfaceBorderWidth,
        borderLeftWidth: interfaceBorderWidth,
        borderRightWidth: interfaceBorderWidth,
      }}
    />
  );
};
