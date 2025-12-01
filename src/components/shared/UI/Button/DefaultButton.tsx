import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { ButtonACCENTDefaultPlateInterface } from "../../Interfaces/VectorInterfaces/ButtonACCENTDefaultPlateInterface";
import { ButtonACCENTPlateInterface } from "../../Interfaces/VectorInterfaces/ButtonACCENTPlateInterface";
import { ButtonBRIGHTTPlateInterface } from "../../Interfaces/VectorInterfaces/ButtonBRIGHTPlateInterface";
import { ButtonMDPlateInterface } from "../../Interfaces/VectorInterfaces/ButtonMDPlateInterface";
import { ButtonWIDEPlateInterface } from "../../Interfaces/VectorInterfaces/ButtonWIDEPlateInterface";

const buttonVariants = cva(
  "inline-flex items-center relative bg-transparent justify-center gap-2 whitespace-nowrap ring-none border-none outline-none text-default text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none  aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "text-black",
        accent: "text-accent",
        ghost: "text-white",
        bright: "text-black font-semibold",
      },
      size: {
        default: "h-12 px-5 py-3",
        wide: "h-[68px] px-6 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface DefaultButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  plateChildren?: React.ReactNode;
}

function DefaultButton({
  className,
  variant = "default",
  size = "default",
  children,
  asChild = false,
  plateChildren,
  ...props
}: Readonly<DefaultButtonProps>) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    >
      <span className="relative inline-flex items-center z-[2]">
        {children}
      </span>

      {plateChildren ?? null}
      {!plateChildren && variant === "ghost" && size === "default" ? (
        <ButtonMDPlateInterface />
      ) : null}

      {!plateChildren && variant === "accent" && size === "wide" ? (
        <ButtonACCENTPlateInterface />
      ) : null}

      {!plateChildren && variant === "accent" && size === "default" ? (
        <ButtonACCENTDefaultPlateInterface />
      ) : null}

      {!plateChildren && variant === "ghost" && size === "wide" ? (
        <ButtonWIDEPlateInterface />
      ) : null}

      {!plateChildren && variant === "bright" && size === "wide" ? (
        <ButtonBRIGHTTPlateInterface />
      ) : null}
    </Comp>
  );
}

export { DefaultButton, buttonVariants };
