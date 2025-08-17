"use client";

import { type FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/UI/Button/button";
import { ROUTES } from "@/utils/constants";

import { LaunchpadTitleMain } from "./LaunchpadTitleMain";

export const LaunchpadMain: FC = ({}) => {
  return (
    <section className="realtive block z-[10] overflow-hidden md:overflow-visible max-w-full pb-9 md:pb-12">
      <div
        className="absolute left-0 bottom-0 h-[100svh] right-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(6, 7, 7, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div className="container flex flex-col-reverse gap-9 md:flex-col md:gap-0 justify-center items-center relative z-[2]">
        <div className="md:max-w-[56%] w-full flex flex-col items-center justify-center gap-10 md:gap-2">
          <LaunchpadTitleMain />
          <div className="flex md:hidden justify-center relative z-10 items-center">
            <Link className="shrink-0 cursor-pointer" href={ROUTES.LAUNCHPAD}>
              <Button>Eplore Launchpad</Button>
            </Link>
          </div>
        </div>
        <Image
          unoptimized
          alt="lauchpad"
          className="aspect-[2042/1346] relative z-[5] scale-[1.3] md:scale-100 md:max-w-[80%] md:w-full md:h-auto"
          height={1346}
          quality={100}
          src="/lauchpad.svg"
          width={2042}
        />
        <div className="hidden md:flex justify-center relative z-10 items-center translate-y-[-48px]">
          <Link className="shrink-0 cursor-pointer" href={ROUTES.LAUNCHPAD}>
            <Button>Eplore Launchpad</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
