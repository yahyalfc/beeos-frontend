import { MAIN_TITLES_ANIMATION_CONFIG } from "../constants";

type BeeOSImagesCol = string[];

export const beeOsImagesColFirst: BeeOSImagesCol = [
  "/beeOS/beeOS-1.svg",
  "/beeOS/beeOS-2.svg",
  "/beeOS/beeOS-3.svg",
  "/beeOS/beeOS-4.svg",
  "/beeOS/beeOS-1.svg",
  "/beeOS/beeOS-2.svg",
  "/beeOS/beeOS-3.svg",
  "/beeOS/beeOS-4.svg",
];

export const beeOsImagesColSecond: BeeOSImagesCol = [
  "/beeOS/beeOS-5.svg",
  "/beeOS/beeOS-6.svg",
  "/beeOS/beeOS-7.svg",
  "/beeOS/beeOS-8.svg",
  "/beeOS/beeOS-5.svg",
  "/beeOS/beeOS-6.svg",
  "/beeOS/beeOS-7.svg",
  "/beeOS/beeOS-8.svg",
];

export const MAIN_BEEOS_TITLE_ANIMATION_CONFIG = {
  ...MAIN_TITLES_ANIMATION_CONFIG,
  animationDuration: 1,
  scrollMultiplier: 1.25,
} as const;

export const MAIN_BEEOS_CONTENT_ANIMATION_CONFIG = {
  gradientDuration: 0.4,
  contentDuration: 0.6,
  animationDuration: 1,
  scrollMultiplier: 1.45,
} as const;

export const MAIN_BEEOS_ACTIONS_ANIMATION_CONFIG = {
  descriptiontDuration: 0.6,
  buttonDuration: 0.65,
  scrollMultiplier: 1.85,
} as const;
