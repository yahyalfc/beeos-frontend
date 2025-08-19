"use client";

import { type FC } from "react";

import { type Socials } from "@/types/collections";

import { Badge } from "../UI/Badge/Badge";
import { DiscordIcon } from "../UI/Icons/Discord.icon";
import { GlobeIcon } from "../UI/Icons/Globe.icon";
import { TelegramIcon } from "../UI/Icons/Telegram.icon";
import { XLGIcon } from "../UI/Icons/X.icon";

interface MinterHeadingProps {
  collectionName: string;
  blockchainName: string;
  amountNft: number;
  socials: Socials;
}

export const MinterHeading: FC<MinterHeadingProps> = ({
  collectionName,
  blockchainName,
  amountNft,
  socials,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full shrink-0">
      <div className="w-full flex flex-row justify-between items-start">
        <h1 className="title-small">{collectionName}</h1>
        <div className="flex items-center justify-end gap-2">
          {socials.twitter ? (
            <a href={socials.twitter} target="_blank">
              <XLGIcon />
            </a>
          ) : null}
          {socials.telegram ? (
            <a href={socials.telegram} target="_blank">
              <TelegramIcon />
            </a>
          ) : null}
          {socials.discord ? (
            <a href={socials.discord} target="_blank">
              <DiscordIcon />
            </a>
          ) : null}
          {socials.website ? (
            <a href={socials.website} target="_blank">
              <GlobeIcon />
            </a>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="capitalize">{blockchainName}</Badge>
        <Badge>
          <span className="text-regent">supply:</span>&nbsp;{amountNft}
        </Badge>
      </div>
    </div>
  );
};
