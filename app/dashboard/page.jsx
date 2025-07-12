'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Добро пожаловать в дашборд!</h1>
    </div>
  );
}
