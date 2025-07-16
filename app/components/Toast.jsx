"use client";

import { useEffect } from "react";

export default function Toast({ message, onClose, type = "error", duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  const color = type === "error" ? "from-[#ff0050] to-[#b44cff]" : "from-[#34ace4] to-[#b44cff]";
  const icon = type === "error"
    ? (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#ff0050" opacity="0.2"/>
        <path d="M15 9l-6 6M9 9l6 6" stroke="#ff0050" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    : (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#34ace4" opacity="0.2"/>
        <path d="M7 13l3 3 7-7" stroke="#34ace4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl bg-gradient-to-r ${color} flex items-center gap-3 animate-fadeIn backdrop-blur-xl`}>
      {icon}
      <span className="text-white font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white text-xl px-2 transition">&times;</button>
    </div>
  );
}

