'use client';

import Link from "next/link";
import Header from "../components/Header";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import GoogleButton from '../components/GoogleButton';
import AnimatedLogo from '../components/AnimatedLogo';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router, supabase]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage("Введите email и пароль");
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        router.push("/dashboard");
      } else {
        setToastMessage("Ошибка авторизации. Попробуйте ещё раз.");
        setIsError(true);
      }

    } catch (error) {
      setToastMessage(error.message || "Неверный логин или пароль");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setToastMessage('Ошибка входа через Google: ' + error.message);
        setIsError(true);
        setGoogleLoading(false);
      }
      // Не сбрасываем loading здесь, так как произойдет редирект
    } catch (error) {
      setToastMessage('Ошибка входа через Google: ' + error.message);
      setIsError(true);
      setGoogleLoading(false);
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

          <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Вход</h2>

            {(loading || googleLoading) ? (
              <div className="flex flex-col items-center gap-6 py-12">
                <AnimatedLogo />
                <p className="text-white text-center">
                  {loading ? "Входим в систему..." : "Открываем Google..."}
                </p>
              </div>
            ) : (
              <>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-violet-400 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
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

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg py-3 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-violet-700/60 ${
                      loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {loading && (
                      <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    )}
                    Войти
                  </button>
                </form>

                <div className="mt-4">
                  <GoogleButton
                    onClick={handleGoogleLogin}
                    iconSrc="/google-icon.svg"
                    iconAlt="Google Icon"
                    loading={googleLoading}
                  >
                    Войти через Google
                  </GoogleButton>
                </div>

                <div className="mt-4 text-sm text-white/60 text-center space-y-2">
                  <p>
                    Нет аккаунта?{' '}
                    <Link href="/register" className="text-white hover:underline">
                      Зарегистрироваться
                    </Link>
                  </p>
                  <p>
                    <Link href="/forgot-password" className="text-violet-300 hover:underline">
                      Забыли пароль?
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-15">
          <Footer />
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} type={isError ? "error" : "success"} />
      )}
    </>
  );
}
