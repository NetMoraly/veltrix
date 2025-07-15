'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as jwtDecode from 'jwt-decode';

const MAX_SESSION_DURATION = 2 * 60 * 60; // 2 часа в секундах

interface JwtPayload {
  iat: number;
  exp: number;
  [key: string]: any;
}

export default function RouteGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        router.push('/login');
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const token = session.access_token;
        const decoded = (jwtDecode as any).default(token);

        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
          await supabase.auth.signOut();
          router.push('/login');
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        if (currentTime - decoded.iat > MAX_SESSION_DURATION) {
          await supabase.auth.signOut();
          router.push('/login');
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        await supabase.auth.signOut();
        router.push('/login');
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [router, supabase]);

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

