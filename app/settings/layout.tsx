// app/settings/layout.tsx
import React from 'react';
import { AuthProvider } from '../../contexts/AuthContext';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
