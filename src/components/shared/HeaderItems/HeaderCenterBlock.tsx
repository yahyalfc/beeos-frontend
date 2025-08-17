"use client";
import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { headerNavLinks } from "@/components/features/Header/constants";
import { ROUTES } from "@/utils/constants";

import { HeaderCard } from "../Cards/HeaderCard";
import { BadgeSoon } from "../UI/Badge/BadgeSoon";
import { MagicText } from "../UI/MagicText/MagicText";


export const HeaderCenterBlock: FC = ({}) => {
  return (
    <>
      {/* Tablet/Desktop */}
      <HeaderCard className="hidden sm:flex shrink-0 gap-6 justify-center items-center">
        {headerNavLinks.map(({ id, title, href, isComingSoon }) => {
          const Comp = href.startsWith("http") ? "a" : Link;

          return (
            <Comp
              key={id}
              href={href}
              className={`link-base inline-flex items-center gap-1 ${
                isComingSoon ? "pointer-events-none !text-slight" : "text-white"
              }`}
            >
              <MagicText>{title}</MagicText>
              {isComingSoon ? <BadgeSoon /> : null}
            </Comp>
          );
        })}
      </HeaderCard>
      {/* Mobile */}
      <HeaderCard
        hasCorners
        className="flex md:hidden shrink-0 gap-6 justify-center items-center"
      >
        <Link className="inline-block" href={ROUTES.LAUNCHPAD}>
          <Image
            alt="Mini logo"
            className="w-[83px] h-[33px] shrink-0 relative inline-block translate-y-0.5"
            height={33}
            src="/mini-logo-new.svg"
            width={83}
          />
        </Link>
      </HeaderCard>
    </>
  );
};
