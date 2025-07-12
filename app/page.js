"use client";

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import BrandLogo from "./components/BrandLogo";
import Link from "next/link";
import Image from "next/image";
import FAQ from "./components/FAQ";
import Header from "./components/Header";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header />

      <main>
        {/* Hero */}
        <section className="w-full flex justify-center items-center py-16">
          <div className="w-full max-w-6xl rounded-3xl p-10 md:p-16 relative overflow-hidden bg-gradient-to-br from-[#422d6a] via-[#6333b8] to-[#a974ee] shadow-2xl border border-[#b44cff]/50">
            {/* Абстрактный SVG-паттерн */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="800" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#b44cff" />
                  <stop offset="1" stopColor="#34ace4" />
                </linearGradient>
              </defs>
              <path d="M0 320 Q200 240 400 320 T800 320" stroke="url(#grad1)" strokeWidth="48" fill="none" />
              <circle cx="200" cy="100" r="60" fill="url(#grad1)" opacity="0.13" />
              <rect x="500" y="30" width="180" height="90" rx="40" fill="url(#grad1)" opacity="0.10" />
            </svg>
            {/* Контент */}
            <div className="relative z-10 flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                AI‑платформа для спортивной аналитики
              </h1>
              <p className="text-lg md:text-2xl text-white/90 mb-4">
                Veltrix помогает получать аналитику и прогнозы на спортивные события — быстро, удобно и без лишних сложностей.
              </p>
              <a
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="mt-4 w-fit px-8 py-4 rounded-2xl border border-white/40 font-bold text-lg text-white hover:bg-white/10 transition flex items-center gap-2"
              >
                {isAuthenticated ? "Перейти в личный кабинет" : "Войти в личный кабинет"}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

 {/* Карточки */}
<section className="w-full flex flex-col items-center py-12 font-sans">
  <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
    Почему выбирают нас?
  </h2>
  <div className="text-lg text-[#c7b8ee] font-medium mb-8 text-center">
    Veltrix — ваш надежный AI‑партнер
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl px-2">
    {/* Современные AI‑технологии */}
    <div className="bg-[#22064b]/90 rounded-2xl px-6 py-8 flex flex-col items-center border border-[#b44cff]/10 shadow-xl max-w-[320px] w-full mx-auto">
      {/* AI Icon (нейросеть) */}
      <svg width={56} height={56} viewBox="0 0 56 56" fill="none" className="mb-4">
        <circle cx="28" cy="28" r="25" stroke="#b44cff" strokeWidth="2.5"/>
        <circle cx="18" cy="20" r="3" fill="#b44cff" />
        <circle cx="38" cy="20" r="3" fill="#b44cff" />
        <circle cx="28" cy="36" r="3" fill="#b44cff" />
        <path d="M18 20 Q28 8 38 20" stroke="#b44cff" strokeWidth="1.5"/>
        <path d="M18 20 Q28 28 38 20" stroke="#b44cff" strokeWidth="1.5"/>
        <path d="M18 20 Q28 45 28 36" stroke="#b44cff" strokeWidth="1.5"/>
        <path d="M38 20 Q28 45 28 36" stroke="#b44cff" strokeWidth="1.5"/>
      </svg>
      <h3 className="text-xl font-bold text-[#b44cff] mb-3 text-center">Современные AI‑технологии</h3>
      <p className="text-base text-white/90 text-center">
        Мощные алгоритмы анализируют данные<br />и работают для вас 24/7
      </p>
    </div>
    {/* Доступ к аналитике */}
    <div className="bg-[#22064b]/90 rounded-2xl px-6 py-8 flex flex-col items-center border border-[#b44cff]/10 shadow-xl max-w-[320px] w-full mx-auto">
      {/* Check Icon */}
      <svg width={56} height={56} fill="none" stroke="#b44cff" strokeWidth={2.5} viewBox="0 0 48 48" className="mb-4">
        <circle cx="24" cy="24" r="20" stroke="#b44cff" strokeWidth={2.5} fill="none"/>
        <path d="M17 25l5 5 9-9" stroke="#b44cff" strokeWidth={2.5} strokeLinecap="round"/>
      </svg>
      <h3 className="text-xl font-bold text-[#b44cff] mb-3 text-center">Доступ к аналитике</h3>
      <p className="text-base text-white/90 text-center">
        Регулярное обновление информации<br />по спортивным событиям через бота и личный кабинет.
      </p>
    </div>
    {/* Личный кабинет */}
    <div className="bg-[#22064b]/90 rounded-2xl px-6 py-8 flex flex-col items-center border border-[#b44cff]/10 shadow-xl max-w-[320px] w-full mx-auto">
      {/* Lock Icon */}
      <svg width={56} height={56} fill="none" stroke="#b44cff" strokeWidth={2.5} viewBox="0 0 48 48" className="mb-4">
        <circle cx="24" cy="24" r="20" stroke="#b44cff" strokeWidth={2.5} fill="none"/>
        <rect x="16" y="28" width="16" height="8" rx="3" stroke="#b44cff" strokeWidth={2.5}/>
        <path d="M18 28v-4a6 6 0 1112 0v4" stroke="#b44cff" strokeWidth={2.5}/>
      </svg>
      <h3 className="text-xl font-bold text-[#b44cff] mb-3 text-center">Личный кабинет</h3>
      <p className="text-base text-white/90 text-center">
        Управление подпиской и настройками осуществляется<br />на сайте в удобном интерфейсе.
      </p>
    </div>
    {/* Служба поддержки */}
    <div className="bg-[#22064b]/90 rounded-2xl px-6 py-8 flex flex-col items-center border border-[#b44cff]/10 shadow-xl max-w-[320px] w-full mx-auto">
      {/* Support Icon */}
      <svg width={56} height={56} fill="none" stroke="#b44cff" strokeWidth={2.5} viewBox="0 0 48 48" className="mb-4">
        <circle cx="24" cy="24" r="20" stroke="#b44cff" strokeWidth={2.5} fill="none"/>
        <path d="M24 32v-8m0 0l6-6m-6 6l-6-6" stroke="#b44cff" strokeWidth={2.5} strokeLinecap="round"/>
      </svg>
      <h3 className="text-xl font-bold text-[#b44cff] mb-3 text-center">Служба поддержки</h3>
      <p className="text-base text-white/90 text-center">
        Ответим на любые вопросы<br />и поможем с настройкой сервиса.
      </p>
    </div>
  </div>
</section>

      {/* About */}
<section className="relative w-full max-w-6xl mx-auto my-20">
  {/* Абстрактный SVG ФОН (очень soft, поверх background, под контентом) */}
  <svg
    viewBox="0 0 1400 500"
    fill="none"
    className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none select-none"
  >
    <defs>
      <linearGradient id="veltrix-bg2" x1="0" y1="0" x2="1400" y2="500" gradientUnits="userSpaceOnUse">
        <stop stopColor="#b44cff" stopOpacity="0.09" />
        <stop offset="0.6" stopColor="#34ace4" stopOpacity="0.04" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.03" />
      </linearGradient>
    </defs>
    {/* Лёгкая геометрия */}
    <polygon points="0,90 1200,0 1400,130 100,260" fill="url(#veltrix-bg2)" />
    <rect x="200" y="360" width="700" height="40" fill="#fff" opacity="0.04" />
    <rect x="950" y="160" width="300" height="25" fill="#b44cff" opacity="0.06" />
    <rect x="400" y="70" width="500" height="24" fill="#34ace4" opacity="0.045" />
    <circle cx="1200" cy="450" r="100" fill="#34ace4" opacity="0.015" />
  </svg>

 {/* Контентный блок, с мягким градиентом и border */}
<div className="relative z-10 flex flex-col items-center justify-center py-16 px-6 md:px-24 rounded-3xl border border-[#b44cff]/50 bg-white/0 backdrop-blur-[2px] shadow-2xl">
  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#b44cff] to-[#34ace4] bg-clip-text text-transparent drop-shadow-lg leading-tight">
    Ваш быстрый старт с <span className="text-[#34ace4]">AI-аналитикой</span>
    <br />на платформе <span className="text-[#34ace4]">Veltrix</span>
  </h2>
  <p className="text-lg md:text-2xl text-white/90 opacity-90 mb-10 max-w-2xl text-center">
    Все решения для спортивной аналитики и AI — в одном личном кабинете. Современные алгоритмы, поддержка 24/7 и максимальная простота.
  </p>
  <a
    href={isAuthenticated ? "/dashboard" : "/register"}
    className="mt-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#b44cff] via-[#7127e2] to-[#34ace4] font-bold text-xl shadow-xl hover:scale-105 transition-all duration-200 text-white flex items-center gap-3"
  >
    {isAuthenticated ? "Перейти в кабинет" : "Зарегистрироваться"}
    <svg width={24} height={24} fill="none" stroke="white" strokeWidth={2.2} viewBox="0 0 24 24">
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
</div>
</section> 

    {/* Карточки */}
<section className="w-full py-16 bg-transparent flex flex-col items-center font-sans">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
    Как работает сервис?
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
    {/* Шаг 1 */}
    <div className="bg-[#2c1452]/80 rounded-3xl p-8 flex flex-col items-center border border-[#b44cff]/20 shadow-xl min-h-[360px] relative overflow-visible">
      <span className="text-lg font-semibold text-[#b44cff] mb-1">1 шаг</span>
      <h3 className="text-2xl font-bold text-white mb-3 text-center">Регистрация</h3>
      <p className="text-base text-white/90 text-center mb-10">
        Создайте аккаунт на платформе Veltrix, чтобы получить доступ к AI-аналитике.
      </p>
      {/* Два кружка + иконка */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center justify-center">
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "#b44cff2b", // внешний полупрозрачный круг
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "#b44cff", // внутренний круг
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <img
              src="/profile-user-svgrepo-com.svg"
              alt="Регистрация"
              style={{
                width: 36, height: 36,
                filter: "brightness(0) invert(1)",
                display: "block"
              }}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Шаг 2 */}
    <div className="bg-[#2c1452]/80 rounded-3xl p-8 flex flex-col items-center border border-[#b44cff]/20 shadow-xl min-h-[360px] relative overflow-visible">
      <span className="text-lg font-semibold text-[#b44cff] mb-1">2 шаг</span>
      <h3 className="text-2xl font-bold text-white mb-3 text-center">Оформление подписки</h3>
      <p className="text-base text-white/90 text-center mb-10">
        Оплатите подписку для доступа ко всем функциям и персональным прогнозам.
      </p>
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center justify-center">
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "#b44cff2b",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "#b44cff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <img
              src="/banking_cards-1024.webp"
              alt="Оплата"
              style={{
                width: 36, height: 36,
                filter: "brightness(0) invert(1)",
                display: "block"
              }}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Шаг 3 */}
    <div className="bg-[#2c1452]/80 rounded-3xl p-8 flex flex-col items-center border border-[#b44cff]/20 shadow-xl min-h-[360px] relative overflow-visible">
      <span className="text-lg font-semibold text-[#b44cff] mb-1">3 шаг</span>
      <h3 className="text-2xl font-bold text-white mb-3 text-center">Получение аналитики</h3>
      <p className="text-base text-white/90 text-center mb-10">
        Получайте свежую аналитику по спортивным событиям и используйте рекомендации для принятия решений.
      </p>
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center justify-center">
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "#b44cff2b",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: "50%",
            background: "#b44cff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <img
              src="/plane.png"
              alt="Telegram plane"
              style={{
                width: 36, height: 36,
                display: "block"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FAQ */}

<section id="faq" className="mt-20 scroll-mt-24">
      <section className="w-full py-16 bg-transparent flex flex-col items-center font-sans">
  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
    Ответы на вопросы
  </h2>
  </section>
 </section>

<FAQ />

       {/* Футер */}
<Footer />
</main>
</div>
  );
}