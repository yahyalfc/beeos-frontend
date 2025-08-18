"use client";

import { type FC, type ReactNode, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DeviderLine } from "@/components/shared/Interfaces/Lines/DeviderLine";
import { BadgeSoon } from "@/components/shared/UI/Badge/BadgeSoon";
import { SocialBundleLinks } from "@/components/shared/UI/Links/SocialBundleLinks";
import { MagicText } from "@/components/shared/UI/MagicText/MagicText";
import { ROUTES } from "@/utils/constants";

import {
  FOOTER_LOGO_ANIMATION_CONFIG,
  footerNavLinks,
  whitepaperLinks,
} from "./constants";
import { FooterUpdatesForm } from "./FooterUpdatesForm";

gsap.registerPlugin(ScrollTrigger);

export const FooterGeneral: FC = ({}) => {
  const logoConfig = FOOTER_LOGO_ANIMATION_CONFIG;

  const pathname = usePathname();

  const footerRef = useRef<HTMLDivElement>(null);

  const logoImageRef = useRef<HTMLImageElement>(null);
  const logoCirclesRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (
        !footerRef.current ||
        !logoImageRef.current ||
        !logoCirclesRef.current
      )
        return;

      gsap.set(logoImageRef.current, {
        opacity: 0,
        y: logoConfig.logoInitialY,
      });

      gsap.set(logoCirclesRef.current, {
        opacity: 0,
        y: logoConfig.circlesinitialY,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: `top 15%`,
          end: `bottom 15%`,
        },
      });

      tl.to(logoCirclesRef.current, {
        opacity: 1,
        y: 0,
        duration: logoConfig.animationDuration * 1.2,
        ease: "sine.out",
      }).to(
        logoImageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: logoConfig.animationDuration,
          ease: "sine.out",
        },
        `-=${logoConfig.animationDuration * 0.8}`
      );
    },
  );

  return (
    <footer
      key={pathname}
      ref={footerRef}
      className="h-auto md:h-[100svh] relative z-[12] pt-12 md:pt-[120px] bg-background overflow-hidden"
    >
      <div className="container relative z-10 md:z-[3] flex flex-col md:grid md:grid-rows-[60px_1fr_auto]">
        <DeviderLine />
        <div className="flex flex-col gap-12 md:flex-row md:gap-0 justify-between md:items-stretch mb-[100px] md:mb-0  md:px-[8vw] pt-3 ">
          <div className="flex justify-between flex-col items-start">
            <FooterUpdatesForm />
            <div className="hidden md:block">
              <FooterNavDocs />
            </div>
          </div>
          <FooterNavBlock>
            <FooterNavTitle>Information</FooterNavTitle>
            <nav aria-label="Footer navigation for Main Pages">
              <ul className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-3">
                {footerNavLinks.map(({ id, title, href, isComingSoon }) => (
                  <li key={id} className="">
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-2 ${
                        isComingSoon ? "pointer-events-none" : ""
                      }`}
                    >
                      <MagicText
                        className={`text-huge ${
                          isComingSoon ? "!text-slight" : ""
                        }`}
                      >
                        {title}
                      </MagicText>
                      {isComingSoon ? (
                        <BadgeSoon className="text-[13px] leading-none" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterNavBlock>
          <div className="flex flex-col gap-12 md:gap-16 items-start">
            <FooterNavBlock>
              <FooterNavTitle>Contact us</FooterNavTitle>
              <a className="text-huge" href="mailto:hello@beeos2548.com">
                hello@beeos2548.com
              </a>
            </FooterNavBlock>
            <FooterNavBlock>
              <div className="hidden md:block">
                <FooterNavTitle>On social</FooterNavTitle>
              </div>
              <SocialBundleLinks />
            </FooterNavBlock>
            <div className="block md:hidden">
              <FooterNavDocs />
            </div>
          </div>
        </div>
      </div>
      {/* this one should have left height */}

      <div
        className="absolute z-[3] left-0 bottom-0 w-full h-[30%] right-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(6, 7, 7, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <Image
        ref={logoImageRef}
        unoptimized
        alt="Logo text"
        className="aspect-[674/409] w-[40vw] z-[2] h-auto absolute left-0 right-0 bottom-[-7vw] top-auto m-auto"
        height={310}
        src="/beeos-big-lg.svg"
        width={828}
      />
      <Image
        ref={logoCirclesRef}
        unoptimized
        alt="Logo text"
        className="aspect-[1409/549] w-[96vw] z-[2] h-auto absolute left-0 right-0 bottom-[-15vw] top-auto m-auto"
        height={549}
        src="/footer-circles.svg"
        width={1409}
      />
    </footer>
  );
};

const FooterNavDocs: FC = () => {
  return (
    <nav aria-label="Footer navigation for Docs">
      <ul className="flex justify-start items-center gap-8">
        <li className="block">
          <Link href={ROUTES.PRIVACY_POLICY}>
            <MagicText className="text-mini">Privacy Policy</MagicText>
          </Link>
        </li>
        <li className="block">
          <Link href={ROUTES.TERMS_OF_SERVICE}>
            <MagicText className="text-mini">Terms of Service</MagicText>
          </Link>
        </li>
        <li className="block">
          <a href={whitepaperLinks} target="_blank">
            <MagicText className="text-mini">Whitepaper</MagicText>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const FooterNavTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="inline-block text-mini text-sm md:text-base">
    {children}
  </span>
);

const FooterNavBlock: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-6 md:gap-8">{children}</div>
);
