"use client";

import { type FC, type ReactNode } from "react";

interface SocialLinksProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export const SocialLinks: FC<SocialLinksProps> = ({ children, ...props }) => {
  return (
    <a
      className="inline-block relative"
      data-variant="social"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
};
