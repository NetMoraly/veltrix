'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import PrimaryButton from '../components/PrimaryButton';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setToastMessage('Введите email');
      setIsError(true);
      return;
    }

    const redirectUrl = `${window.location.origin}/reset-password`;

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    setLoading(false);

    if (error) {
      setToastMessage(error.message);
      setIsError(true);
    } else {
      setToastMessage('Письмо с восстановлением отправлено');
      setIsError(false);
    }
  };

  return (
    <>
      <Head>
        <title>Восстановление пароля | Veltrix</title>
        <meta name="description" content="Сбросьте пароль для входа на платформу Veltrix." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <form
            onSubmit={handleReset}
            className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Восстановление пароля</h2>
            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            {/* Кнопка отправки ссылки в стиле GoogleButton */}
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
              Отправить ссылку
            </button>

            <p className="text-xs text-white/60 mt-6 text-center leading-snug">
              Если сброс не работает — открой ссылку прямо из письма,
              <br />
              в том же браузере, где ты её запрашивал.
            </p>
          </form>
        </main>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} type={isError ? "error" : "success"} />
        )}
      </div>
    </>
  );
}




