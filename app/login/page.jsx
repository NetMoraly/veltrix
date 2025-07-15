'use client';

import Link from "next/link";
import Header from "../components/Header";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Image from "next/image";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [telegramLoading, setTelegramLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const router = useRouter();

  const supabase = createClientComponentClient();


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Введите email и пароль");
      return;
    }

    setLoading(true);

    try {
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      

      router.push("/dashboard");
    } catch (error) {
      setToastMessage(error.message || "Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramLogin = () => {
    setTelegramLoading(true);
    // Простой и надежный редирект
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=write&return_to=${encodeURIComponent('/dashboard')}`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] pt-[96px]">
        <div className="relative flex-grow flex items-center justify-center px-4">
          <div className="absolute inset-0 z-0">
            <div className="absolute w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl top-10 left-10 animate-pulse" />
            <div className="absolute w-[250px] h-[250px] bg-purple-400/10 rounded-full blur-2xl bottom-20 right-20 animate-pulse" />
          </div>

          <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Вход</h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/60 hover:text-white text-sm"
                >
                  {showPassword ? "Скрыть" : "Показать"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
              >
                {loading ? "Вход..." : "Войти"}
              </button>
            </form>

             <div className="mt-3">
          <button
            onClick={handleTelegramLogin}
            disabled={telegramLoading}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition relative cursor-pointer"
          >
            <Image src="/plane.png" alt="Telegram Icon" width={20} height={20} />
            {telegramLoading ? "Вход через Telegram..." : "Войти через Telegram"}
          </button>
        </div>


            <div className="mt-4 text-sm text-white/60 text-center space-y-2">
              <p>
                Нет аккаунта?{' '}
                <Link href="/register" className="text-white hover:underline">
                  Зарегистрироваться
                </Link>
              </p>
              <p>
                <Link href="/forgot-password" className="text-violet-300 hover:underline">
                  Забыли пароль?
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-15">
          <Footer />
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </>
  );
  
}








