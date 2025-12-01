"use client";

import { type FC } from "react";

interface MinterDescriptionProps {
  text: string;
}

export const MinterDescription: FC<MinterDescriptionProps> = ({ text }) => {
  return <p className="text-md">{text}</p>;
};
