'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        // Пользователь залогинен — редирект на дашборд
        router.replace('/dashboard');
      } else {
        // Нет сессии — редирект на логин
        router.replace('/login');
      }
    }
    checkSession();
  }, [router, supabase]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white text-xl font-semibold">
      Проверяем сессию и перенаправляем...
    </div>
  );
}
