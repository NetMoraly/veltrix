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
          <h1 className="text-4xl font-bold text-white">Контакты</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            <div className="bg-[#3c0c64] rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-2 text-white">support@veltrix-bot.ru</h2>
              <p className="text-sm text-gray-300 mb-4">Для вопросов и поддержки</p>
              <a
                href="mailto:support@veltrix-bot.ru"
                className="inline-block text-white font-semibold hover:text-[#b44cff] transition"
              >
                Написать →
              </a>
            </div>

            <div className="bg-[#3c0c64] rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-2 text-white">@Veltrix_ai</h2>
              <p className="text-sm text-gray-300 mb-4">Официальный Telegram-канал</p>
              <a
                href="https://t.me/Veltrix_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-semibold hover:text-[#b44cff] transition"
              >
                Перейти →
              </a>
            </div>

            <div className="bg-[#3c0c64] rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-2 text-white">@BetLyticBot</h2>
              <p className="text-sm text-gray-300 mb-4">AI-бот платформы Veltrix</p>
              <a
                href="https://t.me/BetLyticBot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-semibold hover:text-[#b44cff] transition"
              >
                Открыть →
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
