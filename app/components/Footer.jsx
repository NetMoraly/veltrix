import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-[#15002a]/80 to-transparent text-white px-6 pt-12 pb-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Колонка: Логотип и копирайт */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="Veltrix Logo" width={36} height={36} />
            <span className="text-xl font-semibold tracking-tight">Veltrix</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            ©2025 Veltrix <br />
            Все права защищены
          </p>
        </div>

        {/* Колонка: Информация */}
        <div className="flex flex-col gap-2 text-sm text-white/80">
          <span className="font-medium text-white">Информация</span>
          <Link href="/contacts" className="hover:text-white transition">Контакты</Link>
          <a
            href="https://t.me/Veltrix_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Блог
          </a>
        </div>

        {/* Колонка: Правовая информация */}
        <div className="flex flex-col gap-2 text-sm text-white/80">
          <span className="font-medium text-white">Документы</span>
          <a
            href="/documents/Privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Политика конфиденциальности
          </a>
          <a
            href="/documents/Consent to Personal Data Processing.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Согласие на обработку персональных данных
          </a>
          <a
            href="/documents/User-agreement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </footer>
  );
}




