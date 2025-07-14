'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Toast from '../components/Toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function RegisterPage() {
 const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [repeatPassword, setRepeatPassword] = useState('');
const [toastMessage, setToastMessage] = useState('');
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showRepeatPassword, setShowRepeatPassword] = useState(false);

const router = useRouter();
const pathname = usePathname();

const passwordValidations = {
  minLength: password.length >= 8,
  hasUppercase: /[A-ZА-Я]/.test(password),
  hasSymbol: /[!@#$%^&*()\-_=+\[\]{};:'"\\|,.<>/?`~]/.test(password),
};


  useEffect(() => {
    window.onTelegramAuth = function (user) {
      localStorage.setItem('token', JSON.stringify(user));
      router.push('/dashboard');
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
  }, [pathname]);

  const supabase = createClientComponentClient();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== repeatPassword) {
        setToastMessage('Пароли не совпадают');
        setLoading(false);
        return;
      }

      const checkResponse = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!checkResponse.ok) {
        setToastMessage('Ошибка проверки email. Попробуйте позже.');
        setLoading(false);
        return;
      }

      const { exists } = await checkResponse.json();

      if (exists) {
        setToastMessage('Этот email уже зарегистрирован. Попробуйте войти.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setToastMessage('Ошибка при регистрации: ' + error.message);
      } else {
        setToastMessage(' Подтвердите регистрацию через email');
      }

    } catch (err) {
      setToastMessage('Непредвиденная ошибка: ' + err.message);
    } finally {
      setLoading(false);
    }
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

          <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white">
            <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

            <form className="space-y-4" onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
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
                  {showPassword ? 'Скрыть' : 'Показать'}
                </button>
              </div>

              <p className="text-sm mt-1 pl-1">
                <span className={passwordValidations.minLength ? 'text-green-400' : 'text-white/60'}>
                  Не менее 8 символов
                </span>,{' '}
                <span className={passwordValidations.hasUppercase ? 'text-green-400' : 'text-white/60'}>
                  1 заглавная буква
                </span>,{' '}
                <span className={passwordValidations.hasSymbol ? 'text-green-400' : 'text-white/60'}>
                  1 символ
                </span>
              </p>

              <div className="relative">
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/60 hover:text-white text-sm"
                >
                  {showRepeatPassword ? 'Скрыть' : 'Показать'}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
              >
                {loading ? 'Регистрация...' : 'Продолжить'}
              </button>
            </form>

            <p className="text-sm text-white/60 text-center mt-4">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-white hover:underline">
                Войти
              </Link>
            </p>

            <div className="mt-6 text-center">
              <p className="text-white/60 mb-2">Или зарегистрируйтесь через Telegram:</p>
             <div className="mt-6">
  <p className="text-white/60 mb-2 text-center">Или войдите через Telegram:</p>
  <div className="flex justify-center mt-4">
    /<button
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
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />
        )}
      </div>
    </>
  );
}
