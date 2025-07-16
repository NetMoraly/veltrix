'use client';

import React from "react";
import Image from "next/image";

type GoogleButtonProps = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconSrc?: string;
  iconAlt?: string;
};

export default function GoogleButton({
  children = "Войти через Google",
  onClick,
  iconSrc = "/google-icon.svg",
  iconAlt = "Google Icon",
}: GoogleButtonProps) {
  return (
    <button
      onClick={onClick}
      
      type="button"
      className="
        w-full flex items-center justify-center gap-2
        bg-violet-600 hover:bg-violet-700
        text-white font-medium rounded-lg py-3
        transition-transform duration-200
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-violet-700/60
        cursor-pointer
      "
    >
      <Image src={iconSrc} alt={iconAlt} width={20} height={20} />
      {children}
    </button>
  );
}


