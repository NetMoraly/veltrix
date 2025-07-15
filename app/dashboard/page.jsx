import dynamic from 'next/dynamic';

// ✅ Динамический импорт, отключающий SSR
const DashboardWrapper = dynamic(() => import('../components/wrappers/DashboardWrapper'), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardWrapper />;
}



