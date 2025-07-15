'use client';

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Toast from '../components/Toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import GoogleButton from '../components/GoogleButton';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const passwordValidations = {
    minLength: password.length >= 8,
    hasUppercase: /[A-ZА-Я]/.test(password),
    hasSymbol: /[!@#$%^&*()\-_=+\[\]{};:'"\\|,.<>/?`~]/.test(password),
  };

const handleGoogleRegister = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    alert('Ошибка регистрации через Google: ' + error.message);
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== repeatPassword) {

        setToastMessage('Пароли не совпадают');
        setLoading(false);
        return;
      }

      if (!passwordValidations.minLength || !passwordValidations.hasUppercase || !passwordValidations.hasSymbol) {
        setToastMessage('Пароль не соответствует требованиям');
        setLoading(false);
        return;
      }

      const checkResponse = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!checkResponse.ok) {
        throw new Error('Ошибка проверки email');
      }

      const { exists } = await checkResponse.json();

      if (exists) {

        throw new Error('Этот email уже зарегистрирован');

      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      setToastMessage('Подтвердите регистрацию через email');
      
    } catch (err) {
      setToastMessage(err.message);
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

          <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-white mt-[-10px]">
            <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

            <form className="space-y-4" onSubmit={handleRegister}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                  required
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
                  1 спецсимвол
                </span>
              </p>

              <div className="relative">
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                  required
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
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
              >
                {loading ? 'Регистрация...' : 'Продолжить'}
              </button>
            </form>

            {/* Вот кнопка Google, ниже формы */}
            <div className="mt-6">
              <GoogleButton
                onClick={handleGoogleRegister}
                iconSrc="/google-icon.svg"
                iconAlt="Google Icon"
              >
                Зарегистрироваться через Google
              </GoogleButton>
            </div>

            <p className="text-sm text-white/60 text-center mt-4">
              Уже есть аккаунт?{' '}
              <Link href="/login" className="text-white hover:underline">
                Войти
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Footer />
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </>
  );

}
