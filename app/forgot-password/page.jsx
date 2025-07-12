'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setToastMessage('Введите email');
      return;
    }

    let supabase;
    if (typeof window !== "undefined") {
      // ⚡️ Импорт только на клиенте!
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
    } else {
      setToastMessage("Supabase доступен только на клиенте");
      return;
    }

    const redirectUrl = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setToastMessage(error.message);
    } else {
      setToastMessage('📩 Письмо с восстановлением отправлено');
    }
  };

  return (
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
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
          >
            Отправить ссылку
          </button>
        </form>
      </main>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}



