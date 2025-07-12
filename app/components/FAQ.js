"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  { q: 'Что такое SmartAI Insights?', a: 'SmartAI Insights — это бот который ежедневно анализирует тысячи спортивных прогнозов, сравниваю их, отбираю самые точные и передает их вам в удобной форме.' },
  { q: 'Какие подписки бывают?', a: 'Подписки рассчитываются в зависимости от выбранного тарифа и тематики. В данный момента доступна лишь одна подписка, списко будет пополняться.' },
  { q: 'Какие способы оплаты вы поддерживаете?', a: 'Для пользователей доступны оплаты банковскими картами, СБП и через электронные кошельки, а также криптовалюта. После оплаты доступ выдается автоматически.' },
  { q: 'Какие преимущества?', a: 'Проверенная статистика — мы ведем открытую историю. Автоматический доступ после оплаты. Только чёткие рекомендации и разбор.' },
  { q: 'Как вы обеспечиваете гарантию?', a: 'Вся статистика открыта — никаких формальных гарантий, только честность, поддержка и то, что реально работает.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-4">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            animate={{
              boxShadow: isOpen
                ? "0px 12px 30px rgba(0, 0, 0, 0.15)"
                : "0px 0px 0px rgba(0, 0, 0, 0)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex justify-between items-center w-full text-left text-white font-medium text-[17px] hover:text-white/80 transition-colors cursor-pointer"
            >
              {item.q}

              {/* Анимация вращения иконки */}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-2xl font-bold"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden text-sm text-white/70 mt-3 leading-relaxed"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}