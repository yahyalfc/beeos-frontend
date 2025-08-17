"use client";

import { type FC } from "react";

import { InputOutline } from "@/components/shared/UI/Icons/InputOutline.icon";
import { SendIcon } from "@/components/shared/UI/Icons/Send.icon";

export const FooterUpdatesForm: FC = ({}) => {
  return (
    <div className="flex flex-col w-full md:block">
      <h3 className="title-mini mb-6">Get the last updates</h3>
      <div className="w-full shrink-0 md:w-[365px] h-[60px] relative block">
        <InputOutline
          className="absolute left-0 top-0 w-full h-full"
          preserveAspectRatio="none"
        />
        <input
          className="h-[60px] relative w-full z-[5] flex items-center pl-6 pr-[60px] text-base placeholder:text-white placeholder:text-base placeholder:leading-6 placeholder:tracking-[-4%] !outline-none !border-none !ring-0"
          placeholder="Your@email.com"
          type="text"
        />
        <button className="w-10 h-10 cursor-pointer hover:opacity-70 duration-300 transition-all">
          <SendIcon
            className="absolute right-2.5 top-2.5 bottom-2.5 w-10 h-10"
            preserveAspectRatio="none"
          />
        </button>
      </div>
    </div>
  );
};
