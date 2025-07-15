'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/AuthContext';






export default function RouteGuard({ children }: { children: ReactNode }) {
  const { authenticated, loading } = useAuth();
  
  
  const router = useRouter();
  


  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace('/login');
    }
  }, [loading, authenticated, router]);

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

