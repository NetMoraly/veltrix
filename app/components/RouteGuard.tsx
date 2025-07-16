'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { useAuth } from 'contexts/AuthContext';









export default function RouteGuard({ children }: { children: ReactNode }) {
  const { authenticated, loading, session } = useAuth();
  const router = useRouter();


    useEffect(() => {
    const expireSession = () => {
      const currentTime = Date.now();
      const sessionExpireTime = session?.expires_at ? new Date(session.expires_at).getTime() : 0;
      if (sessionExpireTime && currentTime >= sessionExpireTime) {
        // Если есть функция logout, вызовите её здесь
        // logout();
        router.replace('/login');
      }
    };

    expireSession(); // Проверить сразу при маунте

    const intervalId = setInterval(expireSession, 1000 * 60);

    if (!loading && !authenticated) {
      router.replace('/login');
    }

    return () => clearInterval(intervalId);
  }, [loading, authenticated, router, session]);

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

