'use client';

import RouteGuard from '../components/RouteGuard'; // поправь путь под свою структуру
import DashboardClient from '../components/DashboardClient';

export default function DashboardPage() {
  return (
    <RouteGuard>
      <DashboardClient />
    </RouteGuard>
  );
}

