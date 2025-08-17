/* eslint-disable security/detect-object-injection */
import { type ReactElement } from "react";

import { getSocialMediaType } from "@/helpers/getSocialMediaType";
import { SOCIAL_MEDIA } from "@/utils/constants";

import { DiscordIcon } from "../UI/Icons/Discord.icon";
import { GlobeIcon } from "../UI/Icons/Globe.icon";
import { TelegramIcon } from "../UI/Icons/Telegram.icon";
import { XLGIcon } from "../UI/Icons/X.icon";

export const taskIcon: Record<SOCIAL_MEDIA, ReactElement> = {
  [SOCIAL_MEDIA.DISCORD]: <DiscordIcon />,
  [SOCIAL_MEDIA.INTERNAL]: <GlobeIcon />,
  [SOCIAL_MEDIA.TELEGRAM]: <TelegramIcon />,
  [SOCIAL_MEDIA.X]: <XLGIcon />,
};

export function getLinkIcon(link: string): ReactElement {
  const socialMediaType = getSocialMediaType(link);
  return taskIcon[socialMediaType];
}