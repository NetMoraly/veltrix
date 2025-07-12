'use client';

import SupabaseProvider from '@/components/SupabaseProvider';

export default function AuthLayout({ children }) {
  return (
    <SupabaseProvider>
      {children}
    </SupabaseProvider>
  );
}
