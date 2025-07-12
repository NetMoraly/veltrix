"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="w-full px-8 py-4 bg-gradient-to-r from-[#160029] via-[#2d004d] to-[#6e1bb3] shadow-lg z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Логотип */}
        <BrandLogo />

        {/* Навигация */}
        <nav className="flex gap-8 text-base items-center text-white relative">
          <Link href="/#faq" className="hover:text-[#b44cff] transition">
            FAQ
          </Link>
          <Link href="/subscribe" className="hover:text-[#b44cff] transition">
            Подписка
          </Link>
          <Link href="/contacts" className="hover:text-[#b44cff] transition">
            Контакты
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="ml-4 px-6 py-2 rounded-2xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow-md hover:scale-105 transition-all duration-150"
              >
                Личный кабинет
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#301250] to-[#44205f] text-white rounded-xl shadow-xl py-2 z-[9999] animate-fadeInDropdown backdrop-blur-lg border border-white/10">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-white/10 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Профиль
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-white/10 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Настройки профиля
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-6 py-2 rounded-2xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow-md hover:scale-105 transition-all duration-150"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeInDropdown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDropdown {
          animation: fadeInDropdown 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

