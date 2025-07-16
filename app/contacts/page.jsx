'use client';

import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SubscribeButton from '../components/SubscribeButton';

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
            Свяжитесь с нашей командой или подпишитесь на наши соцсети, чтобы быть в курсе новостей и получать поддержку.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Email */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#b44cff] via-[#34ace4] to-[#b44cff] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <svg width={32} height={32} fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="12" fill="#b44cff" opacity="0.15"/>
                    <path d="M4 8l8 6 8-6" stroke="#b44cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="8" width="16" height="8" rx="2" stroke="#b44cff" strokeWidth="2"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">support@veltrix-bot.ru</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Для вопросов и поддержки</p>
                <SubscribeButton as="a" href="mailto:support@veltrix-bot.ru">
                  Написать →
                </SubscribeButton>
              </div>
            </div>

            {/* Telegram канал */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#34ace4] via-[#b44cff] to-[#34ace4] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <svg width={32} height={32} viewBox="0 0 240 240" fill="none">
                    <circle cx="120" cy="120" r="120" fill="#34ace4" opacity="0.15"/>
                    <path d="M180 60L60 105.3l34.1 9.7L157.5 78.5l-44.6 52.2v0l.1.1-.1.1v0l17.8 53.1 22.6-30.5 36.1 10z" fill="#34ace4"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@Veltrix_ai</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Официальный Telegram-канал</p>
                <SubscribeButton as="a" href="https://t.me/Veltrix_ai" target="_blank" rel="noopener noreferrer">
                  Перейти →
                </SubscribeButton>
              </div>
            </div>

            {/* Telegram бот */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#b44cff] via-[#34ace4] to-[#b44cff] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  {/* Новая иконка робота */}
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="7" width="20" height="12" rx="6" fill="#b44cff" opacity="0.15"/>
                    <rect x="6" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="16" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="9" y="15" width="6" height="2" rx="1" fill="#b44cff"/>
                    <circle cx="12" cy="7" r="2" fill="#b44cff"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@BetLyticBot</h2>
                <p className="text-sm text-white/70 mb-4 text-center">AI-бот платформы Veltrix</p>
                <SubscribeButton as="a" href="https://t.me/BetLyticBot" target="_blank" rel="noopener noreferrer">
                  Открыть →
                </SubscribeButton>
              </div>
            </div>

            {/* TikTok */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#ff0050] via-[#000] to-[#00f2ea] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  {/* TikTok SVG */}
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#fff" opacity="0.08"/>
                    <path d="M22.5 13.5c-1.7 0-3.1-1.4-3.1-3.1V8h-2.2v10.2c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2c.2 0 .4 0 .6.1v-2.3c-.2 0-.4-.1-.6-.1-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5v-3.2c.7.5 1.6.8 2.5.8v-2.2z" fill="#ff0050"/>
                    <path d="M22.5 13.5c-1.7 0-3.1-1.4-3.1-3.1V8h-2.2v10.2c0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2 1-2.2 2.2-2.2c.2 0 .4 0 .6.1v-2.3c-.2 0-.4-.1-.6-.1-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5v-3.2c.7.5 1.6.8 2.5.8v-2.2z" fill="#00f2ea" fillOpacity="0.7"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@veltrix_tiktok</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Наш TikTok — коротко о главном</p>
                <SubscribeButton as="a" href="https://tiktok.com/@veltrix_tiktok" target="_blank" rel="noopener noreferrer">
                  Смотреть →
                </SubscribeButton>
              </div>
            </div>

            {/* YouTube */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#ff0000] via-[#fff] to-[#282828] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  {/* YouTube SVG */}
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#fff" opacity="0.08"/>
                    <rect x="10" y="12" width="12" height="8" rx="3" fill="#ff0000"/>
                    <polygon points="16,15 19,16.5 16,18" fill="#fff"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Veltrix YouTube</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Видео-аналитика и обзоры</p>
                <SubscribeButton as="a" href="https://youtube.com/@veltrix" target="_blank" rel="noopener noreferrer">
                  Смотреть →
                </SubscribeButton>
              </div>
            </div>

            {/* Instagram */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#fd5949] via-[#d6249f] to-[#285AEB] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  {/* Instagram SVG */}
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#fff" opacity="0.08"/>
                    <radialGradient id="ig" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fd5949"/>
                      <stop offset="50%" stopColor="#d6249f"/>
                      <stop offset="100%" stopColor="#285AEB"/>
                    </radialGradient>
                    <rect x="10" y="10" width="12" height="12" rx="4" fill="url(#ig)"/>
                    <circle cx="16" cy="16" r="3" fill="#fff"/>
                    <circle cx="21" cy="11" r="1" fill="#fff"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@veltrix_insta</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Фото и новости в Instagram</p>
                <SubscribeButton as="a" href="https://instagram.com/veltrix_insta" target="_blank" rel="noopener noreferrer">
                  Смотреть →
                </SubscribeButton>
              </div>
            </div>
          </div>

          {/* Telegram Widget */}
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
