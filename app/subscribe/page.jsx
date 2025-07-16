"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* 🔹 Тариф 7 дней */}
          <div className="group bg-gradient-to-br from-[#2a0050] to-[#6e1bb3] border border-[#b44cff]/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-white transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(180,76,255,0.25)] hover:scale-[1.03]">
            <p className="text-2xl font-bold mb-2">7 дней — 999₽</p>
            <p className="text-sm text-white/70 mb-6 text-center">
              Доступ к закрытому AI-контенту: ежедневно 3 аналитических разбора
              событий на основе открытых данных. Вся информация — прямо в вашем
              личном кабинете на сайте или в боте.
            </p>
            <button
              onClick={() => handleSubscribeClick("https://your-7day-payment-link.ru")}
              className="w-full bg-gradient-to-r from-[#b44cff] to-[#34ace4] hover:from-[#a23be0] hover:to-[#2fa0d1] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg hover:scale-105"
            >
              Перейти к оплате
            </button>
          </div>

          {/* 🔹 Тариф 30 дней */}
          <div className="group bg-gradient-to-br from-[#2a0050] to-[#6e1bb3] border border-[#b44cff]/30 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-white transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(180,76,255,0.25)] hover:scale-[1.03]">
            <p className="text-2xl font-bold mb-2">30 дней — 3.499₽</p>
            <p className="text-sm text-white/70 mb-6 text-center">
              Долгосрочный доступ к аналитике. Идеально для постоянных
              пользователей, которые хотят экономить на подписке.
            </p>
            <button
              onClick={() => handleSubscribeClick("https://your-30day-payment-link.ru")}
              className="w-full bg-gradient-to-r from-[#b44cff] to-[#34ace4] hover:from-[#a23be0] hover:to-[#2fa0d1] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg hover:scale-105"
            >
              Перейти к оплате
            </button>
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
            className={`relative bg-gradient-to-br from-[#1e0035] to-[#5e1ab3] text-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-200 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white hover:text-gray-200 text-2xl transition"
              aria-label="Закрыть модалку"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Войдите или зарегистрируйтесь
            </h2>
            <p className="text-white/80 text-center mb-8">
              Чтобы оплатить подписку, необходимо войти в аккаунт.
            </p>
            <button
              onClick={handleModalConfirm}
              className="w-full bg-gradient-to-r from-[#b44cff] to-[#34ace4] hover:from-[#a23be0] hover:to-[#2fa0d1] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg hover:scale-105"
            >
              Перейти к авторизации
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

