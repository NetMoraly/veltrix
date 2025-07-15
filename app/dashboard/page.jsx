import dynamic from 'next/dynamic';

// Динамически загружаем клиентскую часть
const DashboardClientWrapper = dynamic(() => import('../components/DashboardClient'), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardClient />;
}


