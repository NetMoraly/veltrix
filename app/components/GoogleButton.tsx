'use client';

import React from "react";
import Image from "next/image";

type AuthButtonProps = {
  children?: React.ReactNode; // Текст кнопки, можно любой
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconSrc?: string;          // Путь к иконке (чтобы можно было менять, например, Google, Telegram и т.п.)
  iconAlt?: string;
};

export default function AuthButton({
  children = "Продолжить",
  onClick,
  iconSrc = "/google-icon.svg",
  iconAlt = "Icon",
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition cursor-pointer font-old"
      type="button"
    >
      <Image src={iconSrc} alt={iconAlt} width={20} height={20} />
      {children}
    </button>
  );
}

