import { ROUTES } from "@/utils/constants";

export interface HeaderNavLinkType {
  id: string;
  title: string;
  href: string;
  isComingSoon?: boolean;
}

export const headerNavLinks: HeaderNavLinkType[] = [
  {
    id: ROUTES.HOME,
    title: "Home",
    href: ROUTES.HOME,
  },
  {
    id: ROUTES.LAUNCHPAD,
    title: "Launchpad",
    href: ROUTES.LAUNCHPAD,
  },
  {
    id: ROUTES.STAKING,
    title: "Staking",
    href: ROUTES.STAKING,
    // isComingSoon: true,
  },
  {
    id: ROUTES.AI_ASSISTANT,
    title: "AI Assistant",
    href: ROUTES.AI_ASSISTANT,
    isComingSoon: true,
  },
];
