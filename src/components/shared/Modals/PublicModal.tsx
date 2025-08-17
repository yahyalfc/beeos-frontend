"use client";
import { type FC } from "react";

import { useSearchQuery } from "@/hooks/useSearchQuery";

import { MODALS_QUERIES } from "./constants";
import { ModalDefaultPlateInterface } from "../Interfaces/VectorInterfaces/ModalDefaultPlateInterface";
import { DefaultButton } from "../UI/Button/DefaultButton";
import {
  Dialog,
  DialogContent,
  DialogContentBody,
  DialogTitle,
} from "../UI/Dialog/Dialog";
import { PublicIcon } from "../UI/Icons/PublicIcon.icon";

const PublicWalletSub: FC = () => {
  const { setParams, getParams } = useSearchQuery();
  const modalQuery = getParams(MODALS_QUERIES.PUBLIC_WALLET_MODAL);
  let isOpen = false;
  if (modalQuery === "true") isOpen = true;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setParams(MODALS_QUERIES.PUBLIC_WALLET_MODAL, "false");
        }
      }}
    >
      <DialogContent side="middle">
        <DialogContentBody className="flex flex-col justify-center items-center">
          <DialogTitle className="hidden">Sent link to your email</DialogTitle>
          <ModalDefaultPlateInterface className="text-[rgba(255,44,48,1)]" />
          <div className="flex relative z-[2] flex-col justify-center items-center max-w-[358px]">
            <span className="mb-8 flex justify-center items-center h-16 w-16 rounded-full">
              <PublicIcon />
            </span>
            <h2 className="title-small text-2xl mb-3 text-center leading-8 sm:text-[32px] sm:leading-[40px]">
              YOU&apos;RE NOT IN THE GUARANTEED OR WAITLIST PHASES
            </h2>
            <p className="mb-8 text-md text-center">
              Try your luck in the public phase instead!
            </p>
            <div className="shrink-0 flex justify-center items-center flex-1 w-full">
              <DefaultButton
                className="w-full max-w-[320px] h-[68px] cursor-pointer shrink-0 flex-1"
                size="default"
                variant="accent"
                onClick={() =>
                  setParams(MODALS_QUERIES.PUBLIC_WALLET_MODAL, "false")
                }
              >
                Got it
              </DefaultButton>
            </div>
          </div>
        </DialogContentBody>
      </DialogContent>
    </Dialog>
  );
};

export default PublicWalletSub;
