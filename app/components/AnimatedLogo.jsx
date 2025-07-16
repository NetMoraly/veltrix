    'use client';

import React from 'react';

export default function AnimatedLogo() {
  return (
    <svg
      className="w-24 h-24 animate-spin-slow"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Внешний круг */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="283"
        strokeDashoffset="90"
      />

      {/* Внутренний символ — AI-style "нейрон" */}
      <path
        d="M50 30
           C55 30, 60 35, 60 40
           C60 45, 55 50, 50 50
           C45 50, 40 55, 40 60
           C40 65, 45 70, 50 70"
        stroke="url(#gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Градиент */}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>

      {/* Тень */}
      <style jsx>{`
        svg {
          filter: drop-shadow(0 0 6px #a855f7aa);
        }
      `}</style>
    </svg>
  );
}
