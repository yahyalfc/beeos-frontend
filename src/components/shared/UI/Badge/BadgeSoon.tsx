"use client";

import { type FC } from "react";

import { cn } from "@/lib/utils";

import { BadgeIcon } from "../Icons/Badge.icon";

type BadgeSoonProps = React.HTMLAttributes<HTMLDivElement>;

export const BadgeSoon: FC<BadgeSoonProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        "relative px-[7px] py-[5px] leading-none",
        className
      )}
      {...props}
    >
      <span className="absolute bottom-0 left-0 right-0 top-0">
        <BadgeIcon className="h-full w-full" />
      </span>
      <span className="relative !text-[11px] text-slight !uppercase z-[1]">Soon</span>
    </span>
  );
};
