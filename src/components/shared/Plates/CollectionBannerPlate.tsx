"use client";
import { type FC } from "react";

interface CollectionBannerPlateProps {
  label: string;
  value: string;
}

export const CollectionBannerPlate: FC<CollectionBannerPlateProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center not-first:pl-3 md:not-first:pl-5 not-first:border-l-[1px] not-first:border-ring relative z-[2]">
      <span className="inline-block text-md text-cloudy text-xs md:text-sm">{label}</span>
      <span className="inline-block text-md text-white font-bold text-[13px] md:text-sm">
        {value}
      </span>
    </div>
  );
};
