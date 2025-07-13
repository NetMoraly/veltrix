'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

 const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setToastMessage('Введите новый пароль');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password }); // <-- используешь этого клиента
    setLoading(false);

    if (error) {
      setToastMessage(error.message);
    } else {
      setToastMessage('✅ Пароль успешно изменен');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleChangePassword}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Сброс пароля</h2>
          <input
            type="password"
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? 'Сохраняем...' : 'Сменить пароль'}
          </button>
        </form>
      </main>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

