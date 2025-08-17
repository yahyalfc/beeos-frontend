"use client";

import { type FC } from "react";

import { SOCIAL_MEDIA_LINKS } from "@/utils/constants";

import { HeaderCard } from "../Cards/HeaderCard";
import { DiscordIcon } from "../UI/Icons/Discord.icon";
import { XIcon } from "../UI/Icons/X.icon";
import { SocialLinks } from "../UI/Links/SocialLink";

interface HeaderLeftSideBlockProps {
  onMenuClick: () => void;
}
export const HeaderLeftSideBlock: FC<HeaderLeftSideBlockProps> = ({ onMenuClick }) => {
  return (
    <>
      {/* Tablet/Desktop */}
      <HeaderCard className="hidden md:flex shrink-0 gap-3 justify-center items-center">
        <SocialLinks href={SOCIAL_MEDIA_LINKS.X}>
          <XIcon />
        </SocialLinks>
        <SocialLinks href={SOCIAL_MEDIA_LINKS.DISCORD}>
          <DiscordIcon />
        </SocialLinks>
      </HeaderCard>
      {/* Mobile */}
      <HeaderCard
        className="flex md:hidden w-full shrink-0 justify-center cursor-pointer items-center"
        onClick={onMenuClick}
      >
        <span className="link-base">Menu</span>
      </HeaderCard>
    </>
  );
};
