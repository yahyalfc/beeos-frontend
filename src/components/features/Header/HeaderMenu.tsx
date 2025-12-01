/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { type FC, useRef } from "react";

import Link from "next/link";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { HeaderMenuInterface } from "@/components/shared/Interfaces/VectorInterfaces/HeaderMenuInterface";
import { BadgeSoon } from "@/components/shared/UI/Badge/BadgeSoon";
import { SocialBundleLinks } from "@/components/shared/UI/Links/SocialBundleLinks";

import { headerNavLinks } from "./constants";

interface HeaderMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLAnchorElement[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (menuRef.current == null || overlayRef.current == null) return;

    const defaultHeight = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height")
      .trim();

    // Create timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "sine.inOut",
      },
    });

    if (isOpen) {
      gsap.set(menuRef.current, {
        height: defaultHeight,
        opacity: 0,
      });

      gsap.set(overlayRef.current, {
        opacity: 0,
      });

      // Opening animation
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.4,
        },
        0
      )
        .to(
          menuRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          0.05
        )
        .to(
          menuRef.current,
          {
            height: "auto",
            duration: 0.45,
          },
          0.25
        );
    } else {
      // Closing animation
      tl.to(menuRef.current, {
        height: defaultHeight,
        duration: 0.45,
      })
        .to(
          menuRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          0.4
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.35,
          },
          0.35
        );
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed z-[8950] top-0 left-0 right-0 bottom-0 bg-black/50 pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={isOpen}
        onClick={() => setIsOpen(false)}
      />
      <div
        ref={menuRef}
        aria-description="Header Menu"
        className="fixed z-[8990] h-[var(--header-height)] overflow-hidden top-[calc(var(--interface-padding))] left-[calc(var(--interface-padding))] right-[calc(var(--interface-padding))] opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Interface */}
        <HeaderMenuInterface />
        {/* Content */}
        <nav className="pt-24 pb-8 relative z-[5] flex flex-col items-center justify-between gap-10">
          <ul className="flex flex-col gap-2">
            {headerNavLinks.map(({ id, title, href, isComingSoon }, index) => (
              <Link
                key={id}
                ref={(el) => {
                  // eslint-disable-next-line security/detect-object-injection
                  if (el != null) navItemsRef.current[index] = el;
                }}
                href={href}
                className={`title-md inline-flex transform-gpu items-center justify-center gap-2 text-center ${
                  isComingSoon
                    ? "pointer-events-none !text-slight"
                    : "text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{title}</span>
                {isComingSoon ? (
                  <BadgeSoon className="!px-2 !py-4 !text-lg" />
                ) : null}
              </Link>
            ))}
          </ul>
          <div ref={socialRef}>
            <SocialBundleLinks />
          </div>
        </nav>
      </div>
    </>
  );
};
