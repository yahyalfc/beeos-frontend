"use client";

import { type FC } from "react";

import { Badge } from "../UI/Badge/Badge";
import { DiscordIcon } from "../UI/Icons/Discord.icon";
import { GlobeIcon } from "../UI/Icons/Globe.icon";
import { TelegramIcon } from "../UI/Icons/Telegram.icon";
import { XLGIcon } from "../UI/Icons/X.icon";

interface MinterHeadingProps {
  collectionName: string;
  blockchainName: string;
  amountNft: number;
}

export const MinterHeading: FC<MinterHeadingProps> = ({
  collectionName,
  blockchainName,
  amountNft,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full shrink-0">
      <div className="w-full flex flex-row justify-between items-start">
        <h1 className="title-small">{collectionName}</h1>
        <div className="flex items-center justify-end gap-2">
          <a href="https://x.com/gpt360_official" target="_blank">
            <XLGIcon />
          </a>
          <a href="https://t.me/GPT360_Announcement" target="_blank">
            <TelegramIcon />
          </a>
          <a href="https://discord.com/invite/Dz9bdQ95p5" target="_blank">
            <DiscordIcon />
          </a>
          <a href="https://gpt360.io" target="_blank">
            <GlobeIcon />
          </a>
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
