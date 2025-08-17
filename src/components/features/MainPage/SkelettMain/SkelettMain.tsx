"use client";

import { type FC } from "react";

import { MAIN_ANIMATED_FIXED_SECTIONS_LENGTH } from "../constants";

export const SkelettMain: FC = ({}) => {
  return (
    <div
      className="hidden md:block"
        style={{
          height: `${MAIN_ANIMATED_FIXED_SECTIONS_LENGTH}svh`,
        }}
      />
  );
};
