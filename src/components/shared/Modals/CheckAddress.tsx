"use client";
import { type FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchQuery } from "@/hooks/useSearchQuery";

import { MODALS_QUERIES } from "./constants";
import { InputInterface } from "../Interfaces/VectorInterfaces/InputInterface";
import { ModalDefaultPlateInterface } from "../Interfaces/VectorInterfaces/ModalDefaultPlateInterface";
import { DefaultButton } from "../UI/Button/DefaultButton";
import {
  Dialog,
  DialogContent,
  DialogContentBody,
  DialogTitle,
} from "../UI/Dialog/Dialog";

// Zod schema with address validation
const addressSchema = z.object({
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters")
    .regex(
      /^[a-zA-Z0-9\s,.\-'#/()]+$/,
      "Address can only contain letters, numbers, spaces, and common punctuation (,.'-#/())"
    )
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Address must contain both letters and numbers"
    ),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface CheckAddressSubProps {
  onCheck: (address: string) => void;
}

const CheckAddressSub: FC<CheckAddressSubProps> = ({ onCheck }) => {
  const { setParams, getParams } = useSearchQuery();
  const modalQuery = getParams(MODALS_QUERIES.CHECK_ADDRESS_MODAL);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  let isOpen = false;
  if (modalQuery === "true") isOpen = true;

  const onSubmit = (data: AddressFormData) => {
    onCheck(data.address);
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setParams(MODALS_QUERIES.CHECK_ADDRESS_MODAL, "false");
          reset();
        }
      }}
    >
      <DialogContent side="middle">
        <DialogContentBody className="flex flex-col justify-center items-center">
          <DialogTitle className="hidden">Sent link to your email</DialogTitle>
          <ModalDefaultPlateInterface className="text-accent" />
          <div className="flex relative z-[2] flex-col justify-center items-start max-w-[358px]">
            <h2 className="title-small mb-3">Got an Address to check?</h2>
            <p className="mb-6 text-md text-center">
              Just type it here and see the result!
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full relative">
                <InputInterface />
                <input
                  {...register("address")}
                  className="w-full h-[60px] px-5 border text-md border-none ring-0 outline-none text-white placeholder:text-slight"
                  placeholder="Type your address…"
                  type="text"
                />
              </div>
              {errors.address && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
              <div className="shrink-0 flex justify-center items-center flex-1 mt-6 w-full">
                <DefaultButton
                  className="w-full h-[68px] cursor-pointer shrink-0 flex-1"
                  size="default"
                  type="submit"
                  variant="accent"
                >
                  Check Status
                </DefaultButton>
              </div>
            </form>
          </div>
        </DialogContentBody>
      </DialogContent>
    </Dialog>
  );
};

export default CheckAddressSub;
