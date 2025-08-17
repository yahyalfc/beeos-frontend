"use client";

import { type FC } from "react";

import { FooterlIne } from "../../UI/Icons/FooterlIne.icon";

export const DeviderLine: FC = ({}) => {
  return (
    <div className="relative hidden md:block w-full h-[60px]">
      {/* Dots */}
      <div className="absolute left-0 bottom-0 w-2.5 h-2.5 rounded-full bg-skyblue drop-shadow-[0_25px_25px_rgba(81,227,255,0.25)]" />
      <div className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-skyblue drop-shadow-[0_25px_25px_rgba(81,227,255,0.25)]" />
      {/* Line */}
      <FooterlIne className="!w-full h-[60px]" preserveAspectRatio="none" />
    </div>
  );
};
