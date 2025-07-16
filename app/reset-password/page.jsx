'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '../components/Header';
import Toast from '../components/Toast';
import PrimaryButton from '../components/PrimaryButton';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
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
      setIsError(true);
      return;
    }

    if (password !== repeatPassword) {
      setToastMessage('Пароли не совпадают');
      setIsError(true);
      return;
    }

    if (!validatePassword(password)) {
      setToastMessage('Пароль должен быть не менее 8 символов, содержать заглавную букву и спецсимвол');
      setIsError(true);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setToastMessage(error.message);
      setIsError(true);
    } else {
      setToastMessage('Пароль успешно изменен');
      setIsError(false);
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
            {showPasswordRules && (
              <div className="flex gap-2 mt-1 mb-4 flex-wrap">
                <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  ${password.length >= 8 ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}
                `}>
                  <svg width="16" height="16" fill="none" className="inline-block">
                    {password.length >= 8 ? (
                      <path d="M4 8.5l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
                    )}
                  </svg>
                  Не менее 8 символов
                </span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  ${/[A-Z]/.test(password) ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}
                `}>
                  <svg width="16" height="16" fill="none" className="inline-block">
                    {/[A-Z]/.test(password) ? (
                      <path d="M4 8.5l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
                    )}
                  </svg>
                  1 заглавная буква
                </span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
                  {/[^a-zA-Z0-9]/.test(password) ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}
                `}>
                  <svg width="16" height="16" fill="none" className="inline-block">
                    {/[^a-zA-Z0-9]/.test(password) ? (
                      <path d="M4 8.5l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
                    )}
                  </svg>
                  1 спецсимвол
                </span>
              </div>
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

            <PrimaryButton type="submit" loading={loading}>
              Сменить пароль
            </PrimaryButton>
          </form>
        ) : (
          <p className="text-xl text-red-400">Ошибка: недействительная ссылка</p>
        )}
      </main>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} type={isError ? "error" : "success"} />
      )}
    </div>
  );
}








