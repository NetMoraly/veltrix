'use client';

import dynamic from 'next/dynamic';

// ⛔ Импорт нельзя делать в page.jsx
const DashboardWrapper = dynamic(() => import('../components/wrappers/DashboardWrapper'), {
  ssr: false,
});

export default function DashboardPageWrapper() {
  return <DashboardWrapper />;
}
