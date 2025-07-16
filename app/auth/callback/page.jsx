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
      {/* Вращающийся круг */}
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

      {/* Абстрактный "мозг" — AI элемент */}
      <path
        d="M35 40 C30 30, 50 25, 50 40 
           C50 25, 70 30, 65 40 
           M35 60 C30 70, 50 75, 50 60 
           C50 75, 70 70, 65 60"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        
      />
      <circle cx="40" cy="50" r="2" fill="#a855f7" />
      <circle cx="60" cy="50" r="2" fill="#9333ea" />
      <line x1="40" y1="50" x2="60" y2="50" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="4 2" />

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

