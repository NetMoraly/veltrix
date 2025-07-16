'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SubscribeButton from '../components/SubscribeButton';
import TikTokButton from '../components/TikTokButton';
import YouTubeButton from '../components/YouTubeButton';
import InstagramButton from '../components/InstagramButton';

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
                  <img src="/placeholder-email.svg" alt="Email" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">support@veltrix-bot.ru</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Для вопросов и поддержки</p>
                <SubscribeButton
                  as="a"
                  href="mailto:support@veltrix-bot.ru"
                  className="hover:scale-105 cursor-pointer transition-all duration-200"
                >
                  Написать →
                </SubscribeButton>
              </div>
            </div>

            {/* Telegram канал */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#34ace4] via-[#b44cff] to-[#34ace4] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <img src="/placeholder-telegram.svg" alt="Telegram" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@Veltrix_ai</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Официальный Telegram-канал</p>
                <SubscribeButton
                  as="a"
                  href="https://t.me/Veltrix_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 cursor-pointer transition-all duration-200"
                >
                  Перейти →
                </SubscribeButton>
              </div>
            </div>

            {/* Telegram бот */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#b44cff] via-[#34ace4] to-[#b44cff] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <img src="/placeholder-bot.svg" alt="Bot" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@BetLyticBot</h2>
                <p className="text-sm text-white/70 mb-4 text-center">AI-бот платформы Veltrix</p>
                <SubscribeButton
                  as="a"
                  href="https://t.me/BetLyticBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 cursor-pointer transition-all duration-200"
                >
                  Открыть →
                </SubscribeButton>
              </div>
            </div>

            {/* TikTok */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#ff0050] via-[#000] to-[#00f2ea] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <img src="/placeholder-tiktok.svg" alt="TikTok" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@veltrix_tiktok</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Наш TikTok — коротко о главном</p>
                <TikTokButton href="https://tiktok.com/@veltrix_tiktok">
                  Смотреть →
                </TikTokButton>
              </div>
            </div>

            {/* YouTube */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#ff0000] via-[#fff] to-[#282828] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <img src="/placeholder-youtube.svg" alt="YouTube" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">Veltrix YouTube</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Видео-аналитика и обзоры</p>
                <YouTubeButton href="https://youtube.com/@veltrix">
                  Смотреть →
                </YouTubeButton>
              </div>
            </div>

            {/* Instagram */}
            <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#fd5949] via-[#d6249f] to-[#285AEB] shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 mb-4 shadow-lg">
                  <img src="/placeholder-instagram.svg" alt="Instagram" className="h-8 w-8 opacity-60" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">@veltrix_insta</h2>
                <p className="text-sm text-white/70 mb-4 text-center">Фото и новости в Instagram</p>
                <InstagramButton href="https://instagram.com/veltrix_insta">
                  Смотреть →
                </InstagramButton>
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
                allow="transparent"
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
