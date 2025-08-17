import { MAIN_TITLES_ANIMATION_CONFIG } from "../constants";

export const MAIN_LAUNCHPAD_TITLE_ANIMATION_CONFIG = {
  ...MAIN_TITLES_ANIMATION_CONFIG,
  initialY: "140%",
  animationDuration: 1,
  scrollMultiplier: 1.25,
} as const;