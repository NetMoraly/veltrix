'use client';

import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ContactsPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
        <main className="flex-grow flex flex-col items-center justify-center gap-10 px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
            Контакты Veltrix
          </h1>
          <p className="text-lg text-[#c7b8ee] mb-8 text-center max-w-2xl">
            Свяжитесь с нашей командой или подпишитесь на наш Telegram-канал, чтобы быть в курсе новостей и получать поддержку.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Email */}
            <div className="bg-white/5 border border-[#b44cff]/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="12" fill="#b44cff" opacity="0.15"/>
                  <path d="M4 8l8 6 8-6" stroke="#b44cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="4" y="8" width="16" height="8" rx="2" stroke="#b44cff" strokeWidth="2"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">support@veltrix-bot.ru</h2>
              <p className="text-sm text-white/70 mb-4 text-center">Для вопросов и поддержки</p>
              <a
                href="mailto:support@veltrix-bot.ru"
                className="inline-block bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white font-semibold px-6 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                Написать →
              </a>
            </div>

            {/* Telegram канал */}
            <div className="bg-white/5 border border-[#b44cff]/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                <svg width={32} height={32} viewBox="0 0 240 240" fill="none">
                  <circle cx="120" cy="120" r="120" fill="#34ace4" opacity="0.15"/>
                  <path d="M180 60L60 105.3l34.1 9.7L157.5 78.5l-44.6 52.2v0l.1.1-.1.1v0l17.8 53.1 22.6-30.5 36.1 10z" fill="#34ace4"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">@Veltrix_ai</h2>
              <p className="text-sm text-white/70 mb-4 text-center">Официальный Telegram-канал</p>
              <a
                href="https://t.me/Veltrix_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#34ace4] to-[#b44cff] text-white font-semibold px-6 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                Перейти →
              </a>
            </div>

            {/* Telegram бот */}
            <div className="bg-white/5 border border-[#b44cff]/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                {/* Иконка робота */}
                <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#b44cff" opacity="0.15"/>
                  <rect x="5" y="9" width="14" height="8" rx="4" fill="#b44cff"/>
                  <rect x="9" y="5" width="6" height="6" rx="3" fill="#b44cff"/>
                  <circle cx="9" cy="13" r="1" fill="#fff"/>
                  <circle cx="15" cy="13" r="1" fill="#fff"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">@BetLyticBot</h2>
              <p className="text-sm text-white/70 mb-4 text-center">AI-бот платформы Veltrix</p>
              <a
                href="https://t.me/BetLyticBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#b44cff] to-[#34ace4] text-white font-semibold px-6 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                Открыть →
              </a>
            </div>
          </div>

          {/* Удаляем Telegram Widget, вместо него можно добавить простой call-to-action */}
          <div className="w-full flex flex-col items-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Подпишитесь на наш Telegram-канал</h3>
            <div className="bg-white/5 border border-[#b44cff]/30 rounded-2xl shadow-2xl p-6 flex flex-col items-center max-w-md w-full transition-all duration-300">
              <iframe
                src="https://t.me/Veltrix_ai?embed=1"
                width="100%"
                height="80"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                className="rounded-xl"
                style={{
                  minWidth: 250,
                  maxWidth: 400,
                  margin: '0 auto',
                  background: 'transparent',
                  transition: 'box-shadow 0.3s',
                }}
                title="Telegram Widget"
              ></iframe>
              <div className="text-white/60 text-xs mt-3 text-center">
                Присоединяйтесь к сообществу Veltrix в Telegram!
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
