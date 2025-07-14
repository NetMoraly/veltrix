'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '../components/Header';
import Toast from '../components/Toast';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();
  

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('[DEBUG] session:', data.session);
      if (data.session) {
        setHasSession(true);
      } else {
        setToastMessage('Ссылка устарела или недействительна');
      }
      setCheckingToken(false);
    };

    checkSession();
  }, []);

  const validatePassword = (pass) => {
    return /[A-Z]/.test(pass) && /[^a-zA-Z0-9]/.test(pass) && pass.length >= 8;
  };

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
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setToastMessage(error.message);
    } else {
      setToastMessage('Пароль успешно изменен');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  const showPasswordRules = password.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        {checkingToken ? (
          <p className="text-xl">Проверка токена...</p>
        ) : hasSession ? (
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
                <li className={password.length >= 8 ? 'text-green-400' : ''}>
                  • Не менее 8 символов
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>
                  • Минимум 1 заглавная буква
                </li>
                <li className={/[^a-zA-Z0-9]/.test(password) ? 'text-green-400' : ''}>
                  • Минимум 1 спецсимвол
                </li>
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
        ) : (
          <p className="text-xl text-red-400">Ошибка: недействительная ссылка</p>
        )}
      </main>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}








