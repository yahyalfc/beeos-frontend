"use client";
import { useState, type FC } from "react";

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

const Activatecodemodal = ({ handleActivateCode }: any) => {
  const { setParams, getParams } = useSearchQuery();
  const modalQuery = getParams(MODALS_QUERIES.ACTIVATE_CODE_MODAL);
  let isOpen = false;
  const [code, setCode] = useState("");

  //Handle submit
  const handleSubmit = () => {
    handleActivateCode(code);
    setParams(MODALS_QUERIES.ACTIVATE_CODE_MODAL, "false");
  };

  if (modalQuery === "true") isOpen = true;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setParams(MODALS_QUERIES.ACTIVATE_CODE_MODAL, "false");
        }
      }}
    >
      <DialogContent side="middle">
        <DialogContentBody className="flex flex-col justify-center items-center">
          <DialogTitle className="hidden">Hello World Modal</DialogTitle>
          <ModalDefaultPlateInterface className="text-accent" />
          <div className="flex relative z-[2] flex-col justify-center items-center max-w-[358px]">
            <h2 className="title-small text-2xl mb-3 text-center leading-8 sm:text-[32px] sm:leading-[40px]">
              Got a code? Enter it here!
            </h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Type your code here"
              className="input_modal"
            />
            <div className="shrink-0 flex justify-center items-center flex-1 w-full">
              <DefaultButton
                className="w-full w-full h-[68px] cursor-pointer shrink-0 flex-1"
                size="default"
                variant="accent"
                onClick={handleSubmit}
              >
                Apply Code
              </DefaultButton>
            </div>
          </div>
        </DialogContentBody>
      </DialogContent>
    </Dialog>
  );
};

export default Activatecodemodal;
