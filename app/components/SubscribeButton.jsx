"use client";

export default function SubscribeButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`
        w-full rounded-xl py-3 px-6 font-semibold text-base text-white
        border border-[#b44cff]/60 bg-white/5
        hover:bg-gradient-to-r hover:from-[#34ace4]/80 hover:to-[#b44cff]/80
        hover:text-white transition-all duration-200
        shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#b44cff]/40
        active:scale-98
      `}
      style={{ zIndex: 1 }}
    >
      {children}
    </button>
  );
}