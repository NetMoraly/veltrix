"use client";

export default function SubscribeButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full relative overflow-hidden rounded-xl py-3 px-6 font-bold text-lg text-white shadow-lg transition-all duration-200
        bg-gradient-to-r from-[#34ace4] to-[#b44cff]
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity
        hover:scale-105 active:scale-98
        focus:outline-none focus:ring-2 focus:ring-[#b44cff]/60"
      style={{ zIndex: 1 }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}