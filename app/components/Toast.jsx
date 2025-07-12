"use client";

import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#2b004d] text-white px-6 py-4 rounded-2xl shadow-xl border border-[#b44cff] backdrop-blur-lg transition-all">
      <div className="flex items-center justify-between gap-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-sm px-3 py-1 rounded bg-[#b44cff] hover:bg-[#a43ceb] transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

