'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Link from 'next/link';
import Script from 'next/script';
import Toast from '../components/Toast';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();

  const passwordValidations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-ZА-Я]/.test(password),
    hasSymbol: /[!@#$%^&*()\-_=+\[\]{};:'"\\|,.<>/?`~]/.test(password),
  };

  useEffect(() => {
    window.onTelegramAuth = function (user) {
      console.log('Telegram user:', user);
      localStorage.setItem('token', JSON.stringify(user));
      router.push('/dashboard');
    };
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setToastMessage('📩 Подтвердите регистрацию через email');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#160029] to-[#6e1bb3] px-4">
      <Header />

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
          <Script
            src="https://telegram.org/js/telegram-widget.js?7"
            data-telegram-login="BetLyticBot"
            data-size="large"
            data-userpic="false"
            data-lang="ru"
            data-request-access="write"
            data-onauth="onTelegramAuth(user)"
            strategy="afterInteractive"
            data-auth-url="http://localhost:3000/api/auth/telegram"
          />
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
}


