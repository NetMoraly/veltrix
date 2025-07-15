'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext'; // путь поправь под себя
import Header from './Header';
import Footer from './Footer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardClient() {
  const router = useRouter();
  const { session, loading, supabase } = useAuth();

  const [daysLeft, setDaysLeft] = useState(3);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    if (!session) {
      setHasActiveSubscription(false);
      setDaysLeft(0);
      return;
    }

    async function checkSubscription() {
      const userId = session.user?.id;
      if (!userId) {
        setHasActiveSubscription(false);
        setDaysLeft(0);
        return;
      }

      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('subscription_active, subscription_expires_at')
        .eq('user_id', userId)
        .eq('subscription_active', true)
        .single();

      if (subscription && subscription.subscription_expires_at) {
        setHasActiveSubscription(true);

        const now = new Date();
        const expires = new Date(subscription.subscription_expires_at);
        const diffMs = expires.getTime() - now.getTime();
        const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

        setDaysLeft(diffDays);
      } else {
        setHasActiveSubscription(false);
        setDaysLeft(0);
      }
    }

    checkSubscription();
  }, [session, supabase]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [loading, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Загрузка...
      </div>
    );
  }

  if (!session) return null;

  // Остальной твой JSX без изменений
  const stats = [
    { day: 'Пн', value: 2 },
    { day: 'Вт', value: 1 },
    { day: 'Ср', value: 3 },
    { day: 'Чт', value: 2 },
    { day: 'Пт', value: 1 },
    { day: 'Сб', value: 2 },
    { day: 'Вс', value: 3 },
  ];

  const forecasts = [
    {
      match: 'Team A vs Team B',
      time: '18:00',
      prediction: 'Победа A',
      analysis: 'Команда A показывает сильную домашнюю форму...',
    },
    {
      match: 'Team C vs Team D',
      time: '21:00',
      prediction: 'Тотал больше 2.5',
      analysis: 'Обе команды часто играют результативно...',
    },
    {
      match: 'Team E vs Team F',
      time: '23:30',
      prediction: 'Обе забьют',
      analysis: 'Обе команды стабильно забивают, но плохо защищаются...',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header />
      <main className="flex-grow px-4 py-10 text-white max-w-5xl w-full mx-auto">
        {/* ... весь твой JSX с прогнозами и статистикой без изменений */}
        {/* просто замени session и supabase на useAuth */}
        <div className="mb-10 bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-lg">
            Осталось дней подписки: <span className="font-bold">{daysLeft} дней</span>
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition">
              Продлить
            </button>
            <button
              onClick={() => router.push('/settings')}
              className="bg-white/10 border border-white/20 px-5 py-2 rounded-xl text-white font-medium hover:bg-white/20 transition"
            >
              Настройки профиля
            </button>
          </div>
        </div>

        {/* ... остальное содержимое и футер */}
      </main>

      {selectedForecast && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="animate-fadeInScale bg-white/10 backdrop-blur-2xl text-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative transition-all duration-300">
            <button
              onClick={() => setSelectedForecast(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition transform hover:scale-125 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedForecast.match}</h3>
            <p className="text-sm text-white/70 mb-2">Время: {selectedForecast.time}</p>
            <p className="mb-4 text-green-400 font-semibold">
              Прогноз: {selectedForecast.prediction}
            </p>
            <p className="text-white/90">{selectedForecast.analysis}</p>
          </div>
        </div>
      )}

      <Footer />


    </div>
  );

}

