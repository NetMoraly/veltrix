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
            <div className="bg-gradient-to-br from-[#422d6a] to-[#a974ee] rounded-2xl p-8 shadow-2xl flex flex-col items-center border border-[#b44cff]/30">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24" className="mb-4">
                <rect width="24" height="24" rx="12" fill="#b44cff" opacity="0.15"/>
                <path d="M4 8l8 6 8-6" stroke="#b44cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="8" width="16" height="8" rx="2" stroke="#b44cff" strokeWidth="2"/>
              </svg>
              <h2 className="text-xl font-bold mb-2 text-white">support@veltrix-bot.ru</h2>
              <p className="text-sm text-white/70 mb-4 text-center">Для вопросов и поддержки</p>
              <a
                href="mailto:support@veltrix-bot.ru"
                className="inline-block text-[#b44cff] font-semibold hover:underline transition"
              >
                Написать →
              </a>
            </div>

            {/* Telegram канал */}
            <div className="bg-gradient-to-br from-[#422d6a] to-[#a974ee] rounded-2xl p-8 shadow-2xl flex flex-col items-center border border-[#b44cff]/30">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24" className="mb-4">
                <rect width="24" height="24" rx="12" fill="#34ace4" opacity="0.15"/>
                <path d="M21 3L3 10.53l5.09 1.45L17.5 6.5l-6.58 7.72v0l.01.01-.01.01v0l2.09 6.27 2.65-3.6 4.33 1.2z" fill="#34ace4"/>
              </svg>
              <h2 className="text-xl font-bold mb-2 text-white">@Veltrix_ai</h2>
              <p className="text-sm text-white/70 mb-4 text-center">Официальный Telegram-канал</p>
              <a
                href="https://t.me/Veltrix_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#34ace4] font-semibold hover:underline transition"
              >
                Перейти →
              </a>
            </div>

            {/* Telegram бот */}
            <div className="bg-gradient-to-br from-[#422d6a] to-[#a974ee] rounded-2xl p-8 shadow-2xl flex flex-col items-center border border-[#b44cff]/30">
              <svg width={40} height={40} fill="none" viewBox="0 0 24 24" className="mb-4">
                <rect width="24" height="24" rx="12" fill="#b44cff" opacity="0.15"/>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 01-2 0v-2.07a8.001 8.001 0 01-5.93-5.93H7a1 1 0 010-2H4.07A8.001 8.001 0 0111 4.07V7a1 1 0 012 0V4.07a8.001 8.001 0 015.93 5.93H17a1 1 0 010 2h2.07a8.001 8.001 0 01-5.93 5.93z" fill="#b44cff"/>
              </svg>
              <h2 className="text-xl font-bold mb-2 text-white">@BetLyticBot</h2>
              <p className="text-sm text-white/70 mb-4 text-center">AI-бот платформы Veltrix</p>
              <a
                href="https://t.me/BetLyticBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#b44cff] font-semibold hover:underline transition"
              >
                Открыть →
              </a>
            </div>
          </div>

          {/* Telegram Widget */}
          <div className="w-full flex flex-col items-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">Подпишитесь на наш Telegram-канал</h3>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#b44cff]/30 bg-white/5 p-2">
              <iframe
                src="https://t.me/s/Veltrix_ai?embed=1"
                width="340"
                height="400"
                frameBorder="0"
                scrolling="no"
                allowtransparency="true"
                title="Telegram Channel"
                className="rounded-xl"
                style={{ minWidth: 280, background: "transparent" }}
              ></iframe>
            </div>
            <div className="text-white/60 text-xs mt-2">
              Присоединяйтесь к сообществу Veltrix в Telegram!
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
