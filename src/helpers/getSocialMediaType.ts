// eslint-disable @typescript-eslint/no-unsafe-member-access
import { SOCIAL_MEDIA } from "@/utils/constants";

export function getSocialMediaType(url: string): SOCIAL_MEDIA {
  try {
    const normalizedUrl = url.toLowerCase();

    // Check for Discord
    if (
      normalizedUrl.includes("discord.com") ||
      normalizedUrl.includes("discord.gg") ||
      normalizedUrl.includes("discordapp.com")
    ) {
      return SOCIAL_MEDIA.DISCORD;
    }

    // Check for Telegram
    if (
      normalizedUrl.includes("telegram.org") ||
      normalizedUrl.includes("telegram.me") ||
      normalizedUrl.includes("t.me")
    ) {
      return SOCIAL_MEDIA.TELEGRAM;
    }

    // Check for X (formerly Twitter)
    if (
      normalizedUrl.includes("x.com") ||
      normalizedUrl.includes("twitter.com")
    ) {
      return SOCIAL_MEDIA.X;
    }

    // Default to internal/other
    return SOCIAL_MEDIA.INTERNAL;
  } catch {
    // If URL parsing fails, return internal as default
    return SOCIAL_MEDIA.INTERNAL;
  }
}
