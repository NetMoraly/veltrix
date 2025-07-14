'use client';

import Link from "next/link";
import Header from "../components/Header";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClientComponentClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onTelegramAuth = function (user) {
        localStorage.setItem("token", JSON.stringify(user));
        router.push("/dashboard");
      };

      const existing = document.querySelector('script[src*="telegram-widget"]');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?7';
      script.async = true;
      script.setAttribute('data-telegram-login', 'BetLyticBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-userpic', 'false');
      script.setAttribute('data-lang', 'ru');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-auth-url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/telegram`);

      document.getElementById('telegram-login-btn')?.appendChild(script);
    }
  }, [router, pathname]);



  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Введите email и пароль");
      return;
    }
    setLoading(true);

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



    router.push("/dashboard");
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
         <div className="mt-6">
  <p className="text-white/60 mb-2 text-center">Или войдите через Telegram:</p>
  <div className="flex justify-center mt-4">
    <button
  onClick={() => {
    const botName = 'BetLyticBot';
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/telegram`;
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}&origin=${process.env.NEXT_PUBLIC_BASE_URL}&embed=1&request_access=write&redirect_uri=${redirectUrl}`;
  }}
  className="flex items-center justify-center gap-2 px-4 py-3 w-full bg-[#229ED9] hover:bg-[#1e8cbe] text-white font-medium rounded-lg transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 240 240"
    fill="white"
  >
    <path d="M120,0C53.729,0,0,53.729,0,120s53.729,120,120,120s120-53.729,120-120S186.271,0,120,0z M174.775,84.775 l-22.5,106.25c-1.25,5.625-4.375,7.5-8.75,4.375l-24.25-17.875l-11.75,11.25c-1.25,1.25-2.5,2.5-5,2.5l1.875-26.25l47.5-43.125 c2.5-2.5-0.625-3.75-3.75-1.25l-58.75,36.875l-25-7.5c-5-1.25-5-5-1.25-6.25l97.5-37.5 C171.025,76.275,176.025,79.4,174.775,84.775z" />
  </svg>
  Войти через Telegram
</button>

  </div>
</div>

            </div>
          </div>
        </div>

        <div className="mt-12">
          <Footer />
        </div>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </div>
    </>
  );
  
}



