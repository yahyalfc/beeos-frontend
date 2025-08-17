"use client";

import { type FC } from "react";

import { SOCIAL_MEDIA_LINKS } from "@/utils/constants";

import { DiscordIcon } from "../Icons/Discord.icon";
import { IconBorder } from "../Icons/IconBorder.icon";
import { XIcon } from "../Icons/X.icon";

export const SocialBundleLinks: FC = ({}) => {
  return (
    <div className="flex items-center justify-start gap-3">
      <a
        className="aspect-square relative flex justify-center items-center w-12 h-12"
        href={SOCIAL_MEDIA_LINKS.X}
        target="_blank"
      >
        <IconBorder className="absolute left-0 top-0 w-full h-full" />
        <XIcon />
      </a>
      <a
        className="aspect-square relative flex justify-center items-center w-12 h-12"
        href={SOCIAL_MEDIA_LINKS.DISCORD}
        target="_blank"
      >
        <IconBorder className="absolute left-0 top-0 w-full h-full" />
        <DiscordIcon />
      </a>
    </div>
  );
};
