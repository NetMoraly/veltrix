'use client';

import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Toast from '../components/Toast';
import GoogleButton from '../components/GoogleButton';
import AnimatedLogo from '../components/AnimatedLogo';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const passwordValidations = [
    {
      label: "Не менее 8 символов",
      valid: password.length >= 8,
    },
    {
      label: "1 заглавная буква",
      valid: /[A-ZА-Я]/.test(password),
    },
    {
      label: "1 спецсимвол",
      valid: /[!@#$%^&*()\-_=+\[\]{};:'\"\\|,.<>/?`~]/.test(password),
    },
  ];

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

      if (!checkResponse.ok) throw new Error('Ошибка проверки email');

      const { exists } = await checkResponse.json();
      if (exists) throw new Error('Этот email уже зарегистрирован');

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

            {loading ? (
              <div className="flex flex-col items-center gap-6 py-12">
                <AnimatedLogo />
                <p className="text-white text-center">Создаём аккаунт...</p>
              </div>
            ) : (
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                    tabIndex={-1}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path d="M3 3l18 18M10.5 10.5a3 3 0 104.24 4.24M17.94 17.94A9.77 9.77 0 0021 12c-1.73-4-5.07-7-9-7a9.77 9.77 0 00-4.94 1.44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <ellipse cx="12" cy="12" rx="9" ry="7" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Современный блок требований к паролю */}
                <div className="flex gap-2 mt-1 mb-2">
                  {passwordValidations.map((rule, idx) => (
                    <span
                      key={idx}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                        ${rule.valid ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}
                      `}
                    >
                      <svg width="16" height="16" fill="none" className="inline-block">
                        {rule.valid ? (
                          <path d="M4 8.5l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : (
                          <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
                        )}
                      </svg>
                      {/* Для третьего столбца (1 спецсимвол) выравнивание по центру */}
                      {idx === 2 ? (
                        <span className="w-full text-center block">1 спецсимвол</span>
                      ) : (
                        rule.label
                      )}
                    </span>
                  ))}
                </div>

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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                    tabIndex={-1}
                    aria-label={showRepeatPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showRepeatPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path d="M3 3l18 18M10.5 10.5a3 3 0 104.24 4.24M17.94 17.94A9.77 9.77 0 0021 12c-1.73-4-5.07-7-9-7a9.77 9.77 0 00-4.94 1.44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <ellipse cx="12" cy="12" rx="9" ry="7" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Кнопка регистрации в стиле GoogleButton */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-3 text-gray-800 font-semibold text-base hover:bg-gray-100 transition-colors ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-gray-400 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                  )}
                  Зарегистрироваться
                </button>
              </form>
            )}
            <div className="mt-4">
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
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
          type={isError ? "error" : "success"}
        />
      )}
    </>
  );
}
