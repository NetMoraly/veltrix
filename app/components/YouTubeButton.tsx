// components/YouTubeButton.tsx
'use client';

import SubscribeButton from './SubscribeButton';

interface YouTubeButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function YouTubeButton({ href, children }: YouTubeButtonProps) {
  return (
    <SubscribeButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-full rounded-xl py-3 px-6 font-semibold text-base text-white border-0
        bg-transparent
        hover:bg-gradient-to-r hover:from-[#FF0000] hover:via-[#8f00ff] hover:to-[#282828]
        transition-all duration-200 shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#ff0000]/40
        active:scale-98 hover:scale-105 cursor-pointer
      "
    >
      {children}
    </SubscribeButton>
  );
}
