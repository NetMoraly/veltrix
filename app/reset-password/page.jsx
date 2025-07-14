'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const type = searchParams.get('type');

    console.log('[DEBUG] URLSearchParams:', Object.fromEntries(searchParams.entries()));
    console.log('[DEBUG] token:', token);
    console.log('[DEBUG] type:', type);

    if (token && type === 'recovery') {
      supabase.auth
        .exchangeCodeForSession(token)
        .then(({ data, error }) => {
          if (error) {
            console.error('[ERROR] exchangeCodeForSession:', error.message);
            setToastMessage('Ошибка: ссылка недействительна или устарела');
            return;
          }

          console.log('[SUCCESS] Session получена:', data?.session);
          setHasToken(true);
        })
        .catch((e) => {
          console.error('[CATCH] Ошибка обмена токена:', e);
        });
    } else {
      console.warn('[WARN] Токен не найден в URL или неверный type');
      setToastMessage('Ссылка недействительна');
    }
  }, [supabase]);

  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) && /[^a-zA-Z0-9]/.test(pass) && pass.length >= 8;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!password || !repeatPassword) {
      setToastMessage('Заполните оба поля');
      return;
    }

    if (password !== repeatPassword) {
      setToastMessage('Пароли не совпадают');
      return;
    }

    if (!validatePassword(password)) {
      setToastMessage('Пароль должен быть не менее 8 символов, содержать заглавную букву и спецсимвол');
      return;
    }

    setLoading(true);
    console.log('[ACTION] Обновляем пароль...');

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      console.error('[ERROR] updateUser:', error.message);
      setToastMessage(error.message);
    } else {
      console.log('[SUCCESS] Пароль успешно изменён');
      setToastMessage('Пароль успешно изменен');
    }
  };

  const showPasswordRules = password.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleChangePassword}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Сброс пароля</h2>

          <div className="mb-2 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-white/70"
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>

          {showPasswordRules && (
            <ul className="text-sm text-white/80 mb-4 ml-1 space-y-1">
              <li className={password.length >= 8 ? 'text-green-400' : ''}>• Не менее 8 символов</li>
              <li className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>• Минимум 1 заглавная буква</li>
              <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-400' : ''}>• Минимум 1 спецсимвол</li>
            </ul>
          )}

          <div className="mb-6 relative">
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-3 text-sm text-white/70"
            >
              {showRepeatPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? 'Сохраняем...' : 'Сменить пароль'}
          </button>
        </form>
      </main>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
}



