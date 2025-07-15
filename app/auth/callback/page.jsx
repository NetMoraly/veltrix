'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkSessionWithRetry() {
      let attempts = 0;

      while (attempts < 5) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          router.replace('/dashboard');
          return;
        }

        attempts++;
        await new Promise((res) => setTimeout(res, 600)); // 0.6 секунды задержка
      }

      
      router.replace('/login');
    }

    checkSessionWithRetry();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white text-xl font-semibold">
      <div className="flex flex-col items-center gap-6">
        <AnimatedLogo />
        <p>Проверяем сессию и перенаправляем...</p>
      </div>
    </div>
  );
}

function AnimatedLogo() {
  return (
    <svg
      className="w-24 h-24 animate-spin-slow"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="283"
        strokeDashoffset="75"
      />
      {/* Inner shape (hexagon) */}
      <polygon
        points="50,15 79,37 79,73 50,95 21,73 21,37"
        stroke="url(#gradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      <style jsx>{`
        svg {
          filter: drop-shadow(0 0 6px #a855f7aa);
        }
      `}</style>
    </svg>
  );
}
