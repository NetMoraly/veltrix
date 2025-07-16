// components/InstagramButton.tsx
'use client';

import SubscribeButton from './SubscribeButton';

interface InstagramButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function InstagramButton({ href, children }: InstagramButtonProps) {
  return (
    <SubscribeButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-full rounded-xl py-3 px-6 font-semibold text-base text-white border-0
        bg-transparent
        hover:bg-gradient-to-r hover:from-[#F8334A] hover:via-[#FCAB10] hover:to-[#2477B3]
        transition-all duration-200 shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#F8334A]/40
        active:scale-98 hover:scale-105 cursor-pointer
      "
    >
      {children}
    </SubscribeButton>
  );
}
