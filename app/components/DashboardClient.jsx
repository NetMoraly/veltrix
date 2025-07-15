'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
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
  const supabase = createClientComponentClient();

    const [loading, setLoading] = useState(true);
const [session, setSession] = useState(null);
  const [daysLeft, setDaysLeft] = useState(3);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);



 useEffect(() => {
  const checkAuthAndSubscription = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log('Supabase session check:', session); // 👈 добавлен лог

    if (!session) {
      console.warn('Нет сессии, редирект на логин', sessionError);
      router.push('/login');
      return;
    }

    setSession(session); // 👈 сохраняем сессию в state

    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('subscription_active, subscription_expires_at')
      .eq('user_id', session.user.id)
      .eq('subscription_active', true)
      .single();

    if (subscription && subscription.subscription_expires_at) {
      setHasActiveSubscription(true);

      const now = new Date();
      const expires = new Date(subscription.subscription_expires_at);
      const diffMs = expires - now;
      const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

      setDaysLeft(diffDays);
    } else {
      console.warn('Нет активной подписки или она истекла', subError);
      setHasActiveSubscription(false);
    }

    setLoading(false); // ✅ завершаем загрузку
  };

  checkAuthAndSubscription();
}, [router, supabase]);


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
  
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Загрузка...
    </div>
  );
}

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header />
      <main className="flex-grow px-4 py-10 text-white max-w-5xl w-full mx-auto">
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

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Аналитика на сегодня</h2>
          <div className="relative">
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all ${!hasActiveSubscription ? 'blur-sm pointer-events-none select-none' : ''}`}>
              {forecasts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-xl backdrop-blur-lg shadow-md"
                >
                  <p className="text-lg font-semibold">{item.match}</p>
                  <p className="text-white/70">Время: {item.time}</p>
                  <p className="mt-2 font-medium text-green-400">
                    Оценка: {item.prediction}
                  </p>
                  <button
                    onClick={() => hasActiveSubscription && setSelectedForecast(item)}
                    className={`mt-4 inline-block px-4 py-2 rounded-xl font-semibold text-sm transition ${
                      hasActiveSubscription
                        ? 'bg-gradient-to-r from-[#6e45e2] to-[#88d3ce] text-white hover:scale-105'
                        : 'bg-gray-600 text-white cursor-not-allowed'
                    }`}
                    disabled={!hasActiveSubscription}
                  >
                    Подробнее
                  </button>
                </div>
              ))}
            </div>
            {!hasActiveSubscription && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => router.push('/subscribe')}
                  className="bg-[#b517f5] hover:bg-[#9f11db] text-white px-6 py-3 rounded-xl font-bold text-lg backdrop-blur-xl shadow-xl"
                >
                  Получить доступ к аналитике
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Статистика за 7 дней</h2>
          <div className="bg-white/5 p-4 rounded-xl backdrop-blur-lg shadow-md">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-gradient-to-r from-[#4e1d74] to-[#6e1bb3] text-white text-sm px-4 py-2 rounded-xl shadow-xl font-semibold backdrop-blur-md border border-white/10">
                        Победы: {payload[0].value}
                      </div>
                    ) : null
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#34ace4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
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

      <style jsx>{`
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

