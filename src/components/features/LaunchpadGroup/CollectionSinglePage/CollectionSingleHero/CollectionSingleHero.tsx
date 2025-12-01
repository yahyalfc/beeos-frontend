"use client";

import { type FC } from "react";

import Image from "next/image";

import { useCollectionSingleContext } from "@/components/providers/Collections.provider";
import { Skeleton } from "@/components/shared/UI/Skeleton/Skeleton";

import { CollectionSingleHeroContent } from "./CollectionSingleHeroContent";

export const CollectionSingleHero: FC = () => {
  const { collectionData, isLoading } = useCollectionSingleContext();

  return (
    <section className="relative pt-[97px]">
      <div className="container">
        <div className="inner-container flex flex-col gap-5 sm:grid sm:grid-cols-2">
          {collectionData && !isLoading ? (
            <>
              <div className="relative block">
                <CollectionSingleHeroPreview
                  bannerUrl={collectionData.bannerUrl}
                />
              </div>
              <CollectionSingleHeroContent data={collectionData} />
            </>
          ) : (
            <>
              <Skeleton className="aspect-square w-full h-auto" />
              <Skeleton className="aspect-square w-full h-auto" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

interface CollectionSingleHeroPreviewProps {
  bannerUrl?: string;
}

const CollectionSingleHeroPreview: FC<CollectionSingleHeroPreviewProps> = ({
  bannerUrl,
}) => {
  if (!bannerUrl) {
    return (
      <Image
        priority
        alt="Render of Pack"
        className="block w-full h-full inset-0 object-cover object-bottom"
        height={1379}
        quality={100}
        src="/gpt-360-pack.png"
        width={1380}
      />
    );
  }

  return (
    <Image
      priority
      alt="Render of Pack"
      className="block w-full h-full inset-0 object-cover object-bottom"
      height={1379}
      quality={100}
      src={`/${bannerUrl}`}
      width={1380}
    />
  );
};
