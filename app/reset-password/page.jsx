'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.debug('[DEBUG] session:', session);

      if (!session) {
        setError('Ссылка недействительна. Пожалуйста, открой её напрямую из письма, в том же браузере.');
        setLoading(false);
        return;
      }

      setSession(session);
      setLoading(false);
    };

    checkSession();
  }, [supabase]);

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('[ERROR] Смена пароля:', error);
      setError('Ошибка при смене пароля. Попробуйте снова.');
    } else {
      setSuccess('Пароль успешно обновлён! Сейчас вы будете перенаправлены...');
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Проверка токена...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1E003E] to-[#330056] text-white px-4">
      <div className="bg-[#24004A] p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Сброс пароля</h1>

        <div className="mb-4 text-left">
          <label className="block text-sm mb-2">Новый пароль</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#330066] text-white focus:outline-none"
              placeholder="Введите новый пароль"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-300"
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm mb-2">Повторите пароль</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#330066] text-white focus:outline-none"
              placeholder="Повторите новый пароль"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-300"
            >
              {showConfirmPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        <button
          onClick={handleResetPassword}
          className="w-full bg-[#A259FF] hover:bg-[#8e3dfd] transition py-2 rounded-xl font-semibold"
        >
          Сменить пароль
        </button>

        <p className="text-sm text-center text-gray-400 mt-5 max-w-xs mx-auto">
          ⚠️ Если сброс не работает — открой ссылку прямо из письма, <br />
          в том же браузере, где ты её запрашивал.
        </p>
      </div>
    </div>
  );
}









