'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardClient() {
  const router = useRouter();
  const { session, loading, supabase } = useAuth();

  // ⬇️ Обновлять только при первом заходе за сессию
  useEffect(() => {
    if (typeof window !== "undefined") {
      const refreshed = sessionStorage.getItem('dashboard_refreshed');
      if (!refreshed) {
        sessionStorage.setItem('dashboard_refreshed', '1');
        window.location.reload();
      }
    }
  }, []);
  // ⬆️

  const [daysLeft, setDaysLeft] = useState(3);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false); // новое состояние
  const [telegramLinked, setTelegramLinked] = useState(false);

  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [tgCode, setTgCode] = useState('------');
  const [tgStatusMsg, setTgStatusMsg] = useState('');

  // Замените useEffect с проверкой подписки:
  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.id) {
        setHasActiveSubscription(false);
        setDaysLeft(0);
        setSubscriptionLoading(false);
        return;
      }

      setSubscriptionLoading(true);

      try {
        // Прямая проверка через supabase клиент
        const { data: subscription, error } = await supabase
          .from('subscriptions')
          .select('subscription_active, subscription_expires_at')
          .eq('user_id', session.user.id)
          .single();

        console.log('Проверка подписки:', { subscription, error, userId: session.user.id });

        if (error) {
          console.log('Подписка не найдена, создаём запись для пользователя');
          // Создаём запись если её нет
          const { error: insertError } = await supabase
            .from('subscriptions')
            .insert([{ 
              user_id: session.user.id, 
              subscription_active: false,
              subscription_expires_at: null 
            }]);
          
          if (insertError) {
            console.error('Ошибка создания записи подписки:', insertError);
          }
          
          setHasActiveSubscription(false);
          setDaysLeft(0);
          setSubscriptionLoading(false);
          return;
        }

        const hasValidSubscription = subscription.subscription_active && 
          subscription.subscription_expires_at && 
          new Date(subscription.subscription_expires_at) > new Date();

        setHasActiveSubscription(hasValidSubscription);
        console.log('Статус подписки:', hasValidSubscription);

        if (hasValidSubscription && subscription.subscription_expires_at) {
          const now = new Date();
          const expires = new Date(subscription.subscription_expires_at);
          const diffMs = expires.getTime() - now.getTime();
          const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
          setDaysLeft(diffDays);
        } else {
          setDaysLeft(0);
        }

      } catch (error) {
        console.error('Ошибка проверки подписки:', error);
        setHasActiveSubscription(false);
        setDaysLeft(0);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    checkSubscription();
    
    // Проверяем каждые 30 секунд
    const interval = setInterval(checkSubscription, 30000);

    return () => clearInterval(interval);
  }, [session, supabase]);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [loading, session, router]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape для закрытия модалок (работает всегда)
      if (e.key === 'Escape') {
        setSelectedForecast(null);
        setSelectedHistoryItem(null);
        setShowFullHistory(false);
        return;
      }

      // Блокировка DevTools только для неподписанных
      if (!hasActiveSubscription && !subscriptionLoading) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
          return false;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasActiveSubscription, subscriptionLoading]);



  // Защита от обхода через DevTools
  useEffect(() => {
    if (!hasActiveSubscription && !subscriptionLoading) {
      // Блокируем правый клик
      const handleContextMenu = (e) => e.preventDefault();
      
      // Более мягкая защита - только консоль, без редиректа
      let devtools = { open: false };
      const threshold = 200; // Увеличен порог
      
      const detectDevTools = () => {
        if (window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            console.warn('DevTools detection - но редиректа нет');
            // Убираем router.push('/subscribe') - не выгоняем пользователей
          }
        } else {
          devtools.open = false;
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      // Убираем resize listener - он слишком агрессивный
      // window.addEventListener('resize', detectDevTools);
      
      // Периодическая проверка только в консоли
      const devToolsInterval = setInterval(detectDevTools, 5000); // Реже проверяем

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        // window.removeEventListener('resize', detectDevTools);
        clearInterval(devToolsInterval);
      };
    }
  }, [hasActiveSubscription, subscriptionLoading]);

  // Новый useEffect для проверки статуса Telegram
  useEffect(() => {
    const checkTelegramStatus = async () => {
      if (session?.user?.id && supabase) {
        const { data } = await supabase
          .from('profiles')
          .select('telegram_linked')
          .eq('id', session.user.id)
          .single();
        if (data?.telegram_linked) {
          setTelegramLinked(true);
        } else {
          setTelegramLinked(false);
        }
      }
    };

    checkTelegramStatus();
  }, [session, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Загрузка...
      </div>
    );
  }

  if (!session) return null;

  
  const stats = [
    { day: 'Пн', value: 2 },
    { day: 'Вт', value: 1 },
    { day: 'Ср', value: 3 },
    { day: 'Чт', value: 2 },
    { day: 'Пт', value: 1 },
    { day: 'Сб', value: 2 },
    { day: 'Вс', value: 3 },
  ];

  const forecasts = [
    {
      match: 'Team A vs Team B',
      time: '18:00',
      analysis:
        'Команда A демонстрирует уверенную домашнюю игру с высоким xG (1.8) и выиграла последние 3 матча подряд. Команда B испытывает сложности с мотивацией и нестабильна. Погодные условия прохладные, что может повлиять на темп игры. Для итогового прогноза и оценки переходите в нашего Telegram-бота.',
    },
    {
      match: 'Team C vs Team D',
      time: '21:00',
      analysis:
        'Команды показывают разный стиль: Team C фокусируется на атаке, Team D — на защите. Последние встречи были результативными, однако мотивация у обеих на высоком уровне. Дополнительные детали и прогноз доступны в боте.',
    },
    {
      match: 'Team E vs Team F',
      time: '23:30',
      analysis:
        'Команды стабильно забивают, но имеют слабые защитные линии. Холодная погода может снизить интенсивность игры. Итоговую оценку и рекомендации вы найдёте в нашем Telegram-боте.',
    },
  ];

  const historyData = [
    {
      match: 'Team A vs Team B',
      time: '12.07, 18:00',
      analysis: 'Команда A выглядела предпочтительнее по статистике xG и владению мячом.',
      success: true,
    },
    {
      match: 'Team C vs Team D',
      time: '13.07, 20:00',
      analysis: 'Матч получился закрытым, обороны играли строго, исход был неожиданным.',
      success: false,
    },
    {
      match: 'Team E vs Team F',
      time: '14.07, 21:45',
      analysis: 'Игра шла на встречных курсах, обе команды создавали моменты.',
      success: true,
    },
  ];

  const fullHistoryData = Array.from({ length: 21 }).map((_, i) => ({
    match: `Команда ${String.fromCharCode(65 + (i % 6))} vs Команда ${String.fromCharCode(66 + (i % 6))}`,
    time: `0${Math.floor(i / 3) + 10}.07, ${18 + (i % 3) * 2}:00`,
    // убрали recommendation
    success: i % 2 === 0,
  }));

  const handleOpenProfileSettings = async () => {
    setShowSettingsModal(true);
    if (session?.user?.id && supabase) {
      // Получаем профиль пользователя
      const { data, error } = await supabase
        .from('profiles')
        .select('telegram_linked')
        .eq('id', session.user.id)
        .single();

      if (data?.telegram_linked) {
        setTelegramLinked(true);
      } else {
        setTelegramLinked(false);
        const code = await generateAndSaveTgCode(session.user.id, supabase);
        if (code) setTgCode(code);
      }
    }
  };

  // Добавь функцию здесь:
  const checkTelegramStatus = async () => {
    if (session?.user?.id && supabase) {
      const { data } = await supabase
        .from('profiles')
        .select('telegram_linked')
        .eq('id', session.user.id)
        .single();
      if (data?.telegram_linked) {
        setTelegramLinked(true);
        setTgStatusMsg('Telegram успешно привязан!');
      } else {
        setTelegramLinked(false);
        setTgStatusMsg('Ваш Telegram ещё не привязан. Попробуйте позже.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header /> {/* ← Добавь эту строку */}
      <main className="flex-grow px-4 py-10 text-white max-w-5xl w-full mx-auto">

        <div className="mb-10 bg-white/5 p-6 rounded-2xl shadow-lg backdrop-blur-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-lg">
            Осталось дней подписки: <span className="font-bold">{daysLeft} дней</span>
          </div>
          <div className="flex gap-4">
        <div className="flex gap-4">
  <button
    onClick={() => router.push('/subscribe')}
    className="bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white px-6 py-2 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
  >
    Продлить
  </button>
  <button
    onClick={handleOpenProfileSettings}
    className="bg-white/10 border border-white/20 px-5 py-2 rounded-xl text-white font-medium hover:bg-white/20 transition cursor-pointer"
  >
    Настройки профиля
  </button>
</div>

          </div>
        </div>
<section className="mb-10 relative">
  <h2 className="text-2xl font-semibold mb-6">Аналитика предстоящих событий</h2>

  <div
    className={`grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300 ${
      !hasActiveSubscription ? "filter blur-sm pointer-events-none select-none" : ""
    }`}
  >
    {forecasts.map((forecast, idx) => (
      <div
        key={idx}
        className="p-6 rounded-2xl bg-white/10 shadow-lg backdrop-blur-xl text-white flex flex-col justify-between"
      >
        <div>
          <h3 className="text-lg font-bold mb-1">{forecast.match}</h3>
          <p className="text-sm text-white/70 mb-4">Время: {forecast.time}</p>
          <p className="text-white/90 line-clamp-4">{forecast.analysis}</p>
        </div>
        <button
          onClick={() => setSelectedForecast(forecast)}
          className="mt-4 self-start bg-gradient-to-r from-[#b44cff] to-[#34ace4] px-5 py-2 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
          type="button"
        >
          Подробнее
        </button>
      </div>
    ))}
  </div>

  {!hasActiveSubscription && (
    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-4 p-6 bg-[#1a0033]/60 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]">
      <p className="text-white text-lg font-semibold text-center max-w-xs">
        Чтобы получить доступ к аналитике, пожалуйста, оформите подписку.
      </p>
      <button
        onClick={() => router.push('/subscribe')}
        className="bg-white/10 border border-transparent hover:bg-gradient-to-r hover:from-[#3a8d6e] hover:via-[#4caf80] hover:to-[#2f6e58] hover:border-transparent text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 cursor-pointer"
        type="button"
      >
        Перейти к оплате
      </button>
    </div>
  )}
</section>



        <section className="mb-10 rounded-2xl p-6 shadow-lg bg-white/5 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold mb-6 text-white">Точность модели за 7 дней</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(31, 0, 51, 0.9)', borderRadius: 8, color: '#fff' }}
                labelStyle={{ color: '#b44cff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#gradient)"
                strokeWidth={3}
                dot={{ stroke: '#b44cff', strokeWidth: 2, fill: '#6e1bb3' }}
                activeDot={{ r: 8 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#b44cff" />
                  <stop offset="100%" stopColor="#34ace4" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-white/70">
            AI-модель анализирует события и показывает, сколько рекомендаций совпали с результатом.
          </p>
        </section>

        <section className="rounded-2xl p-6 shadow-lg bg-white/5 backdrop-blur-xl mt-10">
          <h3 className="text-xl font-semibold mb-2 text-white">Статистический отчёт за 7 дней</h3>
          <p className="text-sm text-white/70 mb-4">
            AI-модель анализировала события и сравнила результаты с собственными наблюдениями.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-white/90">
              <thead className="text-xs uppercase text-white/60 border-b border-white/20">
                <tr>
                  <th className="px-4 py-2">Событие</th>
                  <th className="px-4 py-2">Время</th>
                  <th className="px-4 py-2">Совпадение</th>
                  {/* Колонка "Детали" убрана */}
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/10 transition">
                    <td className="px-4 py-3">{item.match}</td>
                    <td className="px-4 py-3">{item.time}</td>
                    <td className="px-4 py-3">
                      {item.success ? (
                        <span className="text-green-400 font-semibold">Да</span>
                      ) : (
                        <span className="text-red-400 font-semibold">Нет</span>
                      )}
                    </td>
                    {/* Кнопка "Подробнее" убрана */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setShowFullHistory(true)}
            className="mt-6 px-5 py-2 bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
            type="button"
          >
            Показать полную таблицу
          </button>
        </section>
      </main>

      {selectedForecast && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedForecast(null);
          }}
        >
         <div className="animate-fadeInScale bg-white/10 backdrop-blur-2xl text-white px-8 py-10 rounded-2xl shadow-2xl max-w-md w-full relative transition-all duration-300 flex flex-col">

            <button
              onClick={() => setSelectedForecast(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition transform hover:scale-125 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedForecast.match}</h3>
            <p className="text-sm text-white/70 mb-2">Время: {selectedForecast.time}</p>
            <p className="text-white/90 mb-6">{selectedForecast.analysis}</p>
            <a
              href="https://t.me/VeltrixInsightsBot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block text-center bg-gradient-to-r from-[#b44cff] to-[#34ace4] py-3 rounded-xl font-semibold text-white hover:scale-105 transition cursor-pointer"
              aria-label="Решение модели по событию"
            >
              Решение модели по событию
            </a>
          </div>
        </div>
      )}

      {selectedHistoryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedHistoryItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-fadeInScale bg-white/10 backdrop-blur-2xl text-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative transition-all duration-300"
          >
            <button
              onClick={() => setSelectedHistoryItem(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition transform hover:scale-125 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">{selectedHistoryItem.match}</h3>
            <p className="text-sm text-white/70 mb-2">Время: {selectedHistoryItem.time}</p>
            <p className="text-white/90 whitespace-pre-line">{selectedHistoryItem.analysis}</p>
          </div>
        </div>
      )}

      {showFullHistory && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFullHistory(false);
          }}
        >
          <div className="animate-fadeInScale bg-white/10 backdrop-blur-2xl text-white p-6 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative flex flex-col">
            <button
              onClick={() => setShowFullHistory(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition transform hover:scale-125 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6">Статистический отчёт за 7 дней (полная таблица)</h3>
            <table className="min-w-full text-sm text-left text-white/90">
              <thead className="text-xs uppercase text-white/60 border-b border-white/20">
                <tr>
                  <th className="px-4 py-2">Событие</th>
                  <th className="px-4 py-2">Время</th>
                  {/* Колонка "Рекомендация" убрана */}
                  <th className="px-4 py-2">Совпадение</th>
                </tr>
              </thead>
              <tbody>
                {fullHistoryData.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/10 transition">
                    <td className="px-4 py-3">{item.match}</td>
                    <td className="px-4 py-3">{item.time}</td>
                    <td className="px-4 py-3">
                      {item.success ? (
                        <span className="text-green-400 font-semibold">Да</span>
                      ) : (
                        <span className="text-red-400 font-semibold">Нет</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Модалка настроек */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSettingsModal(false);
          }}
        >
          <div className="animate-fadeInScale bg-white/10 backdrop-blur-2xl text-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative flex flex-col">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition transform hover:scale-125 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6">Настройки профиля</h3>
            {/* Поле для кода и кнопка Telegram */}
            <div className="mb-6">
              <span className="block mb-2 text-white/90 font-semibold">Привязка Telegram</span>
              {telegramLinked ? (
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <img src="/plane.png" alt="Telegram Icon" width={20} height={20} />
                  Telegram успешно привязан!
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={tgCode}
                      readOnly
                      className="w-32 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white font-mono text-lg tracking-widest text-center select-all"
                      style={{ letterSpacing: "0.2em" }}
                    />
                    <a
                      href="https://t.me/VeltrixInsightsBot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b44cff] to-[#34ace4] rounded-xl font-semibold text-white hover:scale-105 transition cursor-pointer"
                    >
                      <img src="/plane.png" alt="Telegram Icon" width={20} height={20} />
                      Привязать Telegram
                    </a>
                    <button
                      onClick={checkTelegramStatus}
                      className="ml-2 px-5 py-2 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition cursor-pointer"
                      type="button"
                    >
                      Проверить статус
                    </button>
                  </div>
                  {/* Вот здесь выводим уведомление */}
                  {tgStatusMsg && (
                    <div className="text-xs text-white/80 mt-1">{tgStatusMsg}</div>
                  )}
                </div>
              )}
              {!telegramLinked && (
                <p className="text-xs text-white/60 mt-1">
                  Скопируйте код и отправьте его нашему Telegram-боту для привязки аккаунта. Код действует 5 минут.
                </p>
              )}
            </div>
            {/* Сброс пароля */}
            <div className="mb-2">
              <span className="block mb-2 text-white/90 font-semibold">Сброс пароля</span>
              <ResetPasswordInline email={session?.user?.email} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}




async function generateAndSaveTgCode(userId, supabase) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 минут

  // Исправь users -> profiles
  const { error } = await supabase
    .from('profiles')
    .update({ tg_code: code, tg_code_expires: expires })
    .eq('id', userId);

  if (error) {
    console.error('Ошибка сохранения кода Telegram:', error);
    return null;
  }
  return code;
}

function ResetPasswordInline({ email }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleReset = async () => {
    if (!email) {
      setStatus('Не удалось определить email пользователя');
      return;
    }
    setLoading(true);
    setStatus('');
    const redirectUrl = typeof window !== "undefined"
      ? `${window.location.origin}/reset-password`
      : '';
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) {
      setStatus('Ошибка: ' + error.message);
    } else {
      setStatus('Письмо для сброса пароля отправлено на ' + email);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        value={email || ''}
        readOnly
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60"
      />
      <button
        type="button"
        onClick={handleReset}
        disabled={loading}
        className="w-full bg-gradient-to-r from-[#b44cff] to-[#34ace4] rounded-xl font-semibold text-white py-2 hover:scale-105 transition cursor-pointer disabled:opacity-60"
      >
        {loading ? 'Отправка...' : 'Сбросить пароль'}
      </button>
      {status && (
        <span className="text-xs text-white/70">{status}</span>
      )}
    </div>
  );
}


