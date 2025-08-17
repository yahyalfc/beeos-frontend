import { ROUTES } from "@/utils/constants";

import { type HeaderNavLinkType } from "../Header/constants";

export const whitepaperLinks = "https://arena-vs.gitbook.io/paper";

export const footerNavLinks: HeaderNavLinkType[] = [
  {
    id: ROUTES.HOME,
    title: "Home",
    href: ROUTES.HOME,
  },
  // {
  //   id: ROUTES.PROFILE,
  //   title: "Profile",
  //   href: ROUTES.PROFILE,
  //   isComingSoon: true,
  // },
  {
    id: ROUTES.LAUNCHPAD,
    title: "Launchpad",
    href: ROUTES.LAUNCHPAD,
  },
  {
    id: ROUTES.AI_ASSISTANT,
    title: "AI Assistant",
    href: ROUTES.AI_ASSISTANT,
    isComingSoon: true,
  },
];

export const FOOTER_LOGO_ANIMATION_CONFIG = {
  circlesinitialY: "20%",
  logoInitialY: "60%",
  animationDuration: 0.8,
} as const;
