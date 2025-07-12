"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SubscribePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubscribeClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      window.location.href = "https://your-payment-link.ru";
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
    handleModalClose();
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col items-center text-white">
            <p className="text-xl font-semibold mb-2">7 дней — 999₽</p>
            <p className="text-sm text-white/60 mb-4 text-center">
              Доступ к закрытому AI-контенту: ежедневно 3 аналитических разбора событий на основе
              открытых данных. Вся информация — прямо в вашем личном кабинете на сайте или в боте.
            </p>
            <button
              onClick={handleSubscribeClick}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              Перейти к оплате
            </button>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col items-center text-white opacity-50 cursor-not-allowed"
            >
              <p className="text-xl font-semibold mb-2">В разработке</p>
              <p className="text-sm text-white/60 mb-4 text-center">
                Этот тариф скоро будет доступен
              </p>
              <button
                disabled
                className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold cursor-not-allowed"
              >
                Недоступно
              </button>
            </div>
          ))}
        </div>

        <p className="text-white/50 mt-10 text-sm text-center max-w-md">
          После оплаты вы получите доступ к аналитике спортивных событий на срок действия подписки.
        </p>
      </div>

      <Footer />

      {/* 🔹 Модалка с анимацией */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            className={`relative bg-gradient-to-br from-[#1e0035] to-[#5e1ab3] text-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-200 ${
              animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3 text-white hover:text-gray-300 text-xl"
              aria-label="Закрыть модалку"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Войдите или зарегистрируйтесь
            </h2>
            <p className="text-white/80 text-center mb-6">
              Чтобы оплатить подписку, необходимо войти в аккаунт.
            </p>
            <button
              onClick={handleModalConfirm}
              className="bg-[#b517f5] hover:bg-[#9f11db] text-white py-2 px-6 rounded-xl font-semibold w-full transition"
            >
              Перейти к авторизации
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
