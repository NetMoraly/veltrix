"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/AuthContext";
import BrandLogo from "./BrandLogo";

export default function Header({ onOpenProfileSettings }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { authenticated, loading, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (loading) return null;

  return (
    <header className="w-full px-8 py-4 bg-gradient-to-r from-[#160029] via-[#2d004d] to-[#6e1bb3] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <BrandLogo />

        <nav className="flex items-center gap-6 text-white">
          <Link href="/#faq" className="hover:text-[#b44cff] transition">
            FAQ
          </Link>
          <Link href="/subscribe" className="hover:text-[#b44cff] transition">
            Подписка
          </Link>
          <Link href="/contacts" className="hover:text-[#b44cff] transition">
            Контакты
          </Link>

          {authenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow hover:scale-105 transition cursor-pointer"
                type="button"
              >
                Личный кабинет
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2a0145]/90 text-white rounded-xl shadow-xl py-2 z-50 backdrop-blur border border-white/10 transition-all duration-200 ease-out">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-white/10 transition cursor-pointer"
                  >
                    Профиль
                  </Link>
                
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition cursor-pointer"
                    type="button"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b44cff] to-[#34ace4] font-bold text-white shadow hover:scale-105 transition"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

