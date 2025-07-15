'use client';

import { AuthProvider } from 'contexts/AuthContext';
import DashboardClient from '../DashboardClient';

export default function DashboardWrapper() {
  return (
    <AuthProvider>
      <DashboardClient />
    </AuthProvider>
  );
}