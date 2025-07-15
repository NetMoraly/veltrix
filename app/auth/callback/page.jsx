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

      // Не удалось получить сессию — редирект на логин
      router.replace('/login');
    }

    checkSessionWithRetry();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white text-xl font-semibold">
      Проверяем сессию и перенаправляем...
    </div>
  );
}

