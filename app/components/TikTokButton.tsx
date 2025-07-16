// components/TikTokButton.tsx
'use client';

import SubscribeButton from './SubscribeButton';

interface TikTokButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function TikTokButton({ href, children }: TikTokButtonProps) {
  return (
    <SubscribeButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-full rounded-xl py-3 px-6 font-semibold text-base text-white border-0
        bg-transparent
        hover:bg-gradient-to-r hover:from-[#25F4EE] hover:via-[#FE2C55] hover:to-[#000000]
        transition-all duration-200 shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#25F4EE]/40
        active:scale-98 hover:scale-105 cursor-pointer
      "
    >
      {children}
    </SubscribeButton>
  );
}
