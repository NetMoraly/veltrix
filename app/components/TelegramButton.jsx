'use client';

import Image from "next/image";

export default function TelegramButton({ children = "Привязать Telegram" }) {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition cursor-pointer font-old"
      type="button"
    >
      <Image src="/plane.png" alt="Telegram Icon" width={20} height={20} />
      {children}
    </button>
  );
}
