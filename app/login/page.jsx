'use client';

import Link from "next/link";
import Header from "../components/Header";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onTelegramAuth = function (user) {
        localStorage.setItem("token", JSON.stringify(user));
        router.push("/dashboard");
      };
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Введите email и пароль");
      return;
    }
    setLoading(true);

    const { createClient } = await import("@supabase/supabase-js");
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setLoading(false);
      setToastMessage("Ошибка: supabase env-переменные не найдены");
      return;
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setToastMessage("Неверный логин или пароль");
      return;
    }

    if (!data.session?.user?.email_confirmed_at) {
      setToastMessage("Подтвердите email перед входом");
      return;
    }

    localStorage.setItem("token", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] pt-[96px]">
      <Header />

      <div className="relative flex-grow flex items-center justify-center px-4 overflow-hidden">
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
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>

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

          <div className="mt-6 text-center">
            <p className="text-white/60 mb-2">Или войдите через Telegram:</p>
            {typeof window !== "undefined" && (
              <Script
                src="https://telegram.org/js/telegram-widget.js?7"
                data-telegram-login="BetLyticBot"
                data-size="large"
                data-userpic="false"
                data-lang="ru"
                data-request-access="write"
                data-onauth="onTelegramAuth(user)"
                strategy="afterInteractive"
                data-auth-url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/telegram`}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}






