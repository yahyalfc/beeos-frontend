"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-center"
      theme="dark"
      style={
        {
          "--normal-bg": "var(--tabs-color)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--ring)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
