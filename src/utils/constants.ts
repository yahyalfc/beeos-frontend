export const USER_KEY = "user-jwt-token";
export const CONNECTED_STATUS = "@appkit/connection_status";
export const USER_ADDRESS = "user-address";
export const REFCODE_COLLECTION = "refcode-collection-";

export enum QUERIES {
  REFERRAL_START = "ref-start",
}

export enum ROUTES {
  HOME = "/",
  PROFILE = "/profile",
  MARKETPLACE = "/marketplace",
  DAPPS = "/dapps",
  STAKING = "/staking",
  BLOG = "/blog",
  ABOUT = "/about",
  COLLECTION = `/collections`,
  SIGN_IN = "/auth/sign-in",
  LAUNCHPAD = "/launchpad",
  TERMS_OF_SERVICE = "/terms",
  PRIVACY_POLICY = "/policy",
  AI_ASSISTANT = "/ai-assistant",
  // MOCKS
  MARIE_BOT = "/dapps/marie_arenavs_bot",
}

export enum SOCIAL_MEDIA {
  INTERNAL = "internal",
  DISCORD = "discord",
  TELEGRAM = "telegram",
  X = "x",
}

export enum SOCIAL_MEDIA_LINKS {
  DISCORD = "https://discord.com/invite/FxVyTPtF7f",
  TELEGRAM = "https://x.com/beeos_arenavs",
  X = "https://twitter.com/arenaweb3?s=21&t=eJC2rnI1Ww1E49kSqeWi0g",
}

export enum EXTERNAL_LINKS {
  OPENSEA = "https://opensea.io/collection/beeos",
}

export enum WALLET_STATUSES {
  WHITELIST = "WHITELIST",
  GUARANTEED = "guaranteed",
  PUBLIC = "PUBLIC",
}
