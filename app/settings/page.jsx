'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [telegramUsername, setTelegramUsername] = useState('');
  const [isBound, setIsBound] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session?.user?.id) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  const handleBind = () => {
    if (telegramUsername.trim()) {
      setIsBound(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white">
      <Header />

      <main className="flex-grow max-w-2xl mx-auto w-full px-6 py-16">
        {/* Верхний блок с кнопкой назад и заголовком */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Назад в личный кабинет
          </a>

          <h1 className="text-3xl font-bold text-white">Настройки профиля</h1>
        </div>

        {/* Telegram блок */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Привязка Telegram</h2>

          {isBound ? (
            <div className="text-green-400 font-medium">
              ✅ Telegram успешно привязан: <span className="underline">@{telegramUsername}</span>
            </div>
          ) : (
            <>
              <p className="text-white/80 mb-2">Укажите ваш Telegram username (без @):</p>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="your_username"
                className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#b44cff] mb-4"
              />
              <button
                onClick={handleBind}
                className="bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Привязать
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}



