"use client";

import clsx from "clsx";
import React, { ReactElement } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps): ReactElement {
  return (
    <button type={type} className={clsx("button", className, "bg-lime-200 hover:bg-lime-300 active:bg-lime-400 text-black font-semibold py-2 px-4 rounded-full transition-colors duration-200")} onClick={onClick}>
      {children}
    </button>
  );
}
