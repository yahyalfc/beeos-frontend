"use client";

import { type FC } from "react";

import Image from "next/image";

import { BannerPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/BannerPlateInterface";
import { CollectionBannerPlate } from "@/components/shared/Plates/CollectionBannerPlate";
import { VerifiedIcon } from "@/components/shared/UI/Icons/Verified.icon";
import { useIsMobile } from "@/hooks/useResponsible";
import { EXTERNAL_LINKS } from "@/utils/constants";

export const CollectionsHero: FC = ({}) => {
  const isMobile = useIsMobile();
  return (
    <section className="relative block pb-8 h-auto overflow-hidden">
      {/* Baclground and Lines */}
      {isMobile ? (
        <Image
          priority
          alt="Background"
          className="absolute left-0 right-0 bottom-0 top-0 h-full w-full object-cover"
          height={780}
          quality={100}
          src="/mobile-banner-beeos.png"
          width={929}
        />
      ) : (
        <Image
          priority
          alt="Background"
          className="absolute left-0 right-0 bottom-0 top-0 h-full w-full object-cover"
          height={780}
          quality={100}
          src="/banner-beeos-collection.png"
          width={2268}
        />
      )}

      {/* Content */}
      <div className="container">
        <div className="inner-container flex flex-col justify-end  min-h-[520px]">
          <div className="flex flex-col gap-6">
            <div className="block">
              <h1
                className="title-huge inline-flex items-start gap-2"
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                onClick={() => {
                  window.open(EXTERNAL_LINKS.OPENSEA, "_blank", "noreferrer");
                }}
              >
                BeeOS
                <span className="inline">
                  <VerifiedIcon />
                </span>
              </h1>
              <p className="text-md text-sky">by ArenaVS</p>
            </div>
            <div className="block">
              <div className="inline-flex items-center gap-5 md:gap-8 py-3 pl-4 md:pl-6 pr-[38px] relative">
                <CollectionBannerPlate label="Floor Price" value="$31.59" />
                <CollectionBannerPlate label="Items" value="2548" />
                <CollectionBannerPlate label="Total Volume" value="$220K" />
                <CollectionBannerPlate label="Listed" value="4.4%" />
                <BannerPlateInterface />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
