"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    <header className="w-full px-8 py-4 bg-gradient-to-r from-[#160029] via-[#2d004d] to-[#6e1bb3] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <BrandLogo />

        <nav className="flex items-center gap-6 text-white">
          <Link href="/#faq" className="hover:text-[#b44cff] transition">FAQ</Link>
          <Link href="/subscribe" className="hover:text-[#b44cff] transition">Подписка</Link>
          <Link href="/contacts" className="hover:text-[#b44cff] transition">Контакты</Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow hover:scale-105 transition"
              >
                Личный кабинет
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2a0145]/90 text-white rounded-xl shadow-xl py-2 z-50 backdrop-blur border border-white/10">
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-white/10 transition">Профиль</Link>
                  <Link href="/settings" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-white/10 transition">Настройки</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-white/10 transition">Выйти</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow hover:scale-105 transition">
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

