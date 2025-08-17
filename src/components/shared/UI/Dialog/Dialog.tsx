"use client";

import * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// VARIANTS

export const dialogContentVariants = cva(
  "min-h-[100vh] h-max text-start w-full flex relative",
  {
    variants: {
      side: {
        middle: "justify-center items-center !outline-none px-4",
        center: "justify-center items-start !outline-none",
        right:
          "justify-center sm:justify-end items-start sm:pt-[calc(83px+4lvh)] !outline-none sm:pb-10 sm:pr-[30px]",
      },
    },
    defaultVariants: {
      side: "center",
    },
  }
);

export const dialogBodyVariants = cva("body-dialog relative bg-transparent", {
  variants: {
    variant: {
      default:
        "flex justify-center items-center w-full px-9 py-12 max-w-[457px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// COMPONENTS

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "dialog-overlay fixed top-[-4vh] bottom-0 right-0 left-0 w-full h-[150vh] duration-300 inset-0 z-[9002] bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  classContent?: string;
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, classContent, children, side, ...props }, ref) => {
  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keyup", handleKeyUp, true);
    return () => document.removeEventListener("keyup", handleKeyUp, true);
  }, []);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "scrollable-block fixed overflow-scroll w-[100vw] h-[100vh] transition-all left-0 top-0 bottom-0 right-0 z-[9003] translate-x-[0%] flex bg-transparent duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          classContent
        )}
        onKeyUp={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        {...props}
      >
        <DialogPrimitive.Close
          className={cn(
            dialogContentVariants({ side, className }),
            "duration-300 transition-all"
          )}
        >
          {children}
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogContentBodyProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof dialogBodyVariants> {
  handleBack?: () => void;
  isCloseBtn?: boolean;
}

const DialogContentBody = React.forwardRef<
  HTMLDivElement,
  DialogContentBodyProps
>(({ className, variant, children }, ref) => (
  <div
    ref={ref}
    className={cn(dialogBodyVariants({ variant, className }))}
    role="button"
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
));
DialogContentBody.displayName = "DialogContentBody";

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogContentBody,
  DialogDescription,
};
