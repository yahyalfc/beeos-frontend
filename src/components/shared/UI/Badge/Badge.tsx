import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { BadgeInterface } from "../../Interfaces/VectorInterfaces/BadgeInterface";

const badgeVariants = cva(
  "inline-flex items-center relative h-9 justify-center text-white font-semibold w-fit whitespace-nowrap shrink-0 gap-1 ring-none border-none outline-none aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
      size: {
        default: "px-4 py-[7px] text-xs text-default",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant, size }), className)}
      data-slot="badge"
      {...props}
    >
      <BadgeInterface />
      <span className="inline-block relative z-[2]">{children}</span>
    </Comp>
  );
}

export { Badge, badgeVariants };
