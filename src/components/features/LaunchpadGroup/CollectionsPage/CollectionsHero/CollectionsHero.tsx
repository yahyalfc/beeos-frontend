"use client";

import { type FC } from "react";

import Image from "next/image";

import { BannerPlateInterface } from "@/components/shared/Interfaces/VectorInterfaces/BannerPlateInterface";
import { CollectionBannerPlate } from "@/components/shared/Plates/CollectionBannerPlate";
import { VerifiedIcon } from "@/components/shared/UI/Icons/Verified.icon";
import { useOKXCollectionWithStats } from "@/hooks/queries/useOKXQueries";
import { useIsMobile } from "@/hooks/useResponsible";
import { EXTERNAL_LINKS } from "@/utils/constants";

export const CollectionsHero: FC = ({}) => {
  const isMobile = useIsMobile();

  const { collection, stats, isLoading, isError } = useOKXCollectionWithStats({
    slug: "beeos",
    chain: "eth",
  });

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice === 0) return "N/A";
    return `$${numPrice.toFixed(2)}`;
  };

  const formatVolume = (volume: string) => {
    const numVolume = parseFloat(volume);
    if (numVolume === 0) return "N/A";
    if (numVolume >= 1000000) {
      return `$${(numVolume / 1000000).toFixed(1)}M`;
    }
    if (numVolume >= 1000) {
      return `$${(numVolume / 1000).toFixed(0)}K`;
    }
    return `$${numVolume.toFixed(0)}`;
  };

  const formatPercentage = (listed: string, total: string) => {
    const listedNum = parseFloat(listed);
    const totalNum = parseFloat(total);
    if (totalNum === 0) return "N/A";
    return `${((listedNum / totalNum) * 100).toFixed(1)}%`;
  };

  const getDisplayValues = () => {
    if (isLoading) {
      return {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        floorPrice: "Loading...",
        items: "Loading...",
        volume: "Loading...",
        listed: "Loading...",
      };
    }

    if (isError || !collection || !stats) {
      return {
        floorPrice: "$31.59",
        items: "2548",
        volume: "$220K",
        listed: "4.4%",
      };
    }

    return {
      floorPrice: formatPrice(stats.floorPrice),
      items: collection.items || "2548",
      volume: formatVolume(stats.volume24h),
      listed: formatPercentage(collection.listedItems, collection.items),
    };
  };

  const displayValues = getDisplayValues();

  return (
    <section className="relative block pb-8 h-auto overflow-hidden">
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
                {collection?.collectionName ?? "BeeOS"}
                <span className="inline">
                  <VerifiedIcon />
                </span>
              </h1>
              <p className="text-md text-sky">by ArenaVS</p>
            </div>
            <div className="block">
              <div className="inline-flex items-center gap-5 md:gap-8 py-3 pl-4 md:pl-6 pr-[38px] relative">
                <CollectionBannerPlate
                  label="Floor Price"
                  value={displayValues.floorPrice}
                />
                <CollectionBannerPlate
                  label="Items"
                  value={displayValues.items}
                />
                <CollectionBannerPlate
                  label="Total Volume"
                  value={displayValues.volume}
                />
                <CollectionBannerPlate
                  label="Listed"
                  value={displayValues.listed}
                />
                <BannerPlateInterface />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
