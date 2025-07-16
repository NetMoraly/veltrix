'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from 'contexts/AuthContext';

export default function RouteGuard({ children }: { children: ReactNode }) {
  const { authenticated, loading, session, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const expireSession = async () => {
      if (!session?.expires_at) return;
      
      const currentTime = Date.now();
      // Проверяем, если expires_at в секундах, конвертируем в миллисекунды
      const sessionExpireTime = session.expires_at * 1000;
      
      if (currentTime >= sessionExpireTime) {
        try {
          // Вызываем logout для очистки сессии
          if (logout) {
            await logout();
          }
          router.replace('/login');
        } catch (error) {
          console.error('Ошибка при выходе из сессии:', error);
          router.replace('/login');
        }
      }
    };

    // Проверить сразу при маунте
    expireSession();

    // Проверять каждые 5 минут (вместо 1 минуты)
    const intervalId = setInterval(expireSession, 1000 * 60 * 5);

    // Редирект если не аутентифицирован
    if (!loading && !authenticated) {
      router.replace('/login');
    }

    return () => clearInterval(intervalId);
  }, [loading, authenticated, router, session, logout]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-[#160029cc] text-white text-xl">
        Загрузка...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}

