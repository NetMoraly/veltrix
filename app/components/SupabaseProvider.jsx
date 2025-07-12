'use client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

export default function SupabaseProvider({ children }) {
  const [client] = useState(() => supabase);
  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  );
}
