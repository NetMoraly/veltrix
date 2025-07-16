"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SubscribeButton from "../components/SubscribeButton";

export default function SubscribePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubscribeClick = async (link) => {
    const { data } = await supabase.auth.getSession();
    const session = data?.session;

    if (session?.user?.id) {
      window.location.href = link;
    } else {
      setShowModal(true);
      setTimeout(() => setAnimateModal(true), 10);
    }
  };

  const handleModalClose = () => {
    setAnimateModal(false);
    setTimeout(() => setShowModal(false), 200);
  };

  const handleModalConfirm = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-start px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 mt-10 text-center">
          Оформить подписку
        </h1>
        <p className="text-white/70 text-center mb-10">
          Выберите подходящий вам план подписки
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-stretch">
          {/* Тариф 7 дней */}
          <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#b44cff] via-[#34ace4] to-[#b44cff] shadow-[0_8px_32px_0_rgba(180,76,255,0.15)] hover:shadow-[0_8px_32px_0_rgba(52,172,228,0.18)] transition-all duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
              <p className="text-2xl font-bold mb-2 text-white">7 дней — 999₽</p>
              <p className="text-sm text-white/70 mb-6 text-center">
                Доступ к закрытому AI-контенту: ежедневно 3 аналитических разбора
                событий на основе открытых данных. Вся информация — прямо в вашем
                личном кабинете на сайте или в боте.
              </p>
              <div className="mt-auto w-full flex justify-center">
                <SubscribeButton
                  onClick={() => handleSubscribeClick("https://your-7day-payment-link.ru")}
                  className="
                    hover:scale-105 cursor-pointer transition-all duration-200 w-full max-w-xs
                    bg-white/10 border border-transparent
                    hover:bg-gradient-to-r hover:from-[#3a8d6e] hover:via-[#4caf80] hover:to-[#2f6e58]
                    hover:border-transparent
                    text-white
                  "
                >
                  Перейти к оплате
                </SubscribeButton>
              </div>
            </div>
          </div>

          {/* Тариф 30 дней */}
          <div className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-[#34ace4] via-[#b44cff] to-[#34ace4] shadow-[0_8px_32px_0_rgba(52,172,228,0.15)] hover:shadow-[0_8px_32px_0_rgba(180,76,255,0.18)] transition-all duration-300 flex flex-col h-full">
            <div className="bg-gradient-to-br from-[#1a0033]/90 to-[#6e1bb3]/80 rounded-2xl p-8 flex flex-col items-center h-full">
              <p className="text-2xl font-bold mb-2 text-white">30 дней — 3.499₽</p>
              <p className="text-sm text-white/70 mb-6 text-center">
                Долгосрочный доступ к аналитике. Идеально для постоянных
                пользователей, которые хотят экономить на подписке.
              </p>
              <div className="mt-auto w-full flex justify-center">
                <SubscribeButton
                  onClick={() => handleSubscribeClick("https://your-30day-payment-link.ru")}
                  className="
                    hover:scale-105 cursor-pointer transition-all duration-200 w-full max-w-xs
                    bg-white/10 border border-transparent
                    hover:bg-gradient-to-r hover:from-[#3a8d6e] hover:via-[#4caf80] hover:to-[#2f6e58]
                    hover:border-transparent
                    text-white
                  "
                >
                  Перейти к оплате
                </SubscribeButton>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/50 mt-10 text-sm text-center max-w-md">
          После оплаты вы получите доступ к аналитике спортивных событий на срок
          действия подписки.
        </p>

        {/* Современный блок иконок оплаты */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center items-center">
          {[
            { src: "/mir.svg", alt: "МИР" },
            { src: "/mastercard.svg", alt: "Mastercard" },
            { src: "/visa.svg", alt: "Visa" },
            { src: "/crypto.svg", alt: "Криптовалюта" },
            { src: "/sbp.svg", alt: "СБП" },
          ].map(({ src, alt }) => (
            <div
              key={alt}
              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            >
              <img src={src} alt={alt} className="h-8 w-auto" />
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* 🔹 Модалка */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            className={`relative bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white rounded-3xl p-8 max-w-md w-full shadow-[0_8px_32px_rgba(109,27,179,0.4)] transform transition-all duration-200 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white hover:text-white transition text-3xl leading-none select-none"
              aria-label="Закрыть модалку"
            >
              &times;
            </button>

            <h2 className="text-3xl font-extrabold text-center mb-5 drop-shadow-md">
              Войдите или зарегистрируйтесь
            </h2>
            <p className="text-white/80 text-center mb-8 text-lg">
              Чтобы оплатить подписку, необходимо войти в аккаунт.
            </p>
            <button
              onClick={handleModalConfirm}
              className="w-full bg-gradient-to-r from-[#b44cff] via-[#6e1bb3] to-[#34ace4] hover:from-[#9a30e0] hover:via-[#5a0fa3] hover:to-[#2791d3] text-white font-semibold py-3 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Перейти к авторизации
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


