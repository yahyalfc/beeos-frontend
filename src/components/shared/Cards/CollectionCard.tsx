/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { type FC, useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { weiToEth } from "@/helpers/ethCalculations";
import { PROJECT_STATUSES, type Collection } from "@/types/collections";
import { ROUTES } from "@/utils/constants";

import { CardCollectionInterface } from "../Interfaces/VectorInterfaces/CardCollectionInterface";
import { DefaultButton } from "../UI/Button/DefaultButton";
import { LiveIcon } from "../UI/Icons/Live.icon";

interface CollectionCardProps {
  data: Collection;
}

export const CollectionCard: FC<CollectionCardProps> = ({
  data: { id, name, imageUrl, nftPrice, amountNFT, status },
}) => {
  const router = useRouter();

  const handleCollectionClick = useCallback(() => {
    router.push(`${ROUTES.COLLECTION}/${id}`);
  }, [router, id]);

  const { startsAt, statusName, endsAt } = status;

  let imageUrlProper: string;

  if (!imageUrl) {
    imageUrlProper = "/collection-preview-gpt.png"; // Fallback image
  } else if (!imageUrl.startsWith("https://")) {
    imageUrlProper = `/${imageUrl}`; // Then its local
  } else {
    imageUrlProper = imageUrl;
  }

  return (
    <div
      key={id}
      className="block relative cursor-pointer"
      role="button"
      onClick={handleCollectionClick}
    >
      <div className="block w-full">
        {imageUrlProper.match(/\.mp4/gim) ? (
          <video
            autoPlay
            loop
            muted
            className="block w-full inset-0 h-[280px] object-contain"
          >
            <source src={imageUrlProper} type="video/mp4" />
          </video>
        ) : (
          <Image
            alt={`${name} Preview`}
            className="object-cover w-full h-[280px]"
            height={560}
            src={imageUrlProper}
            width={670}
          />
        )}
      </div>
      <div className="flex flex-col gap-6 relative p-5">
        <CardCollectionInterface />
        <div className="pr-3.5 flex flex-col gap-5">
          <h3
            className={`title-mini shrink-0 ${
              name.length > 17 ? "text-xl" : "text-2xl"
            }`}
          >
            {name}
          </h3>
          <div className="flex justify-between flex-1 shrink-0 items-center">
            <CollectionCardAboutItem
              label="Price"
              value={nftPrice === "0" ? "Free" : `${weiToEth(nftPrice)} ETH`}
            />
            <CollectionCardAboutItem
              label="Items"
              value={amountNFT.toString()}
            />
            <CollectionCardAboutItem
              label="Minted"
              value={
                statusName === PROJECT_STATUSES.QUESTING ||
                statusName === PROJECT_STATUSES.UPCOMING
                  ? "0%"
                  : statusName === PROJECT_STATUSES.MINT
                  ? "In Progress"
                  : "100%"
              }
            />
          </div>
        </div>
        <div className="block w-full shrink-0 flex-1">
          <DefaultButton className="w-full" variant="ghost">
            {statusName === PROJECT_STATUSES.QUESTING ? (
              <div className="inline-flex gap-3 items-center">
                <span className="inline-flex gap-1.5 items-center">
                  <LiveIcon />
                  <span className="text-accent">Questing Live</span>
                </span>
              </div>
            ) : statusName === PROJECT_STATUSES.MINT ? (
              <div className="inline-flex gap-3 items-center">
                <span className="inline-flex gap-1.5 items-center">
                  <LiveIcon />
                  <span className="text-accent">Mint Live</span>
                </span>
                <span>Ended</span>
              </div>
            ) : statusName === PROJECT_STATUSES.UPCOMING ? (
              <div className="inline-flex gap-3 items-center">
                <span>
                  <span className="text-grayish">Starts:</span>
                  &nbsp;
                  <span>
                    {new Date(startsAt).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </div>
            ) : (
              <div className="inline-flex gap-3 items-center">
                <span>
                  <span className="text-grayish">Ended:</span>
                  &nbsp;
                  <span>
                    {new Date(endsAt).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </span>
              </div>
            )}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

interface CollectionCardAboutItemProps {
  label: string;
  value: string;
}

const CollectionCardAboutItem: FC<CollectionCardAboutItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-default text-sm text-grayish">{label}</span>
      <span className="text-md font-semibold text-white">{value}</span>
    </div>
  );
};
