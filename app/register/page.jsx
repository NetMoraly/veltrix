"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Toast from "../components/Toast";
// УДАЛИ: import { supabase } from '../lib/supabaseClient';
import Link from "next/link";
import Script from "next/script";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();

  // Импортируй createClient только внутри компонента!
  let supabase = null;
  if (typeof window !== "undefined") {
    // Импорт внутри функции (важно!)
    const { createClient } = require("@supabase/supabase-js");
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== repeatPassword) {
      setToastMessage("Пароли не совпадают");
      setLoading(false);
      return;
    }

    // Проверка: существует ли такой email (оставь как у тебя было)
    const checkResponse = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const { exists } = await checkResponse.json();

    if (exists) {
      setToastMessage("Этот email уже зарегистрирован. Попробуйте войти.");
      setLoading(false);
      return;
    }

    // Регистрация через Supabase (вызов через динамический клиент)
    if (!supabase) {
      setToastMessage("Ошибка инициализации Supabase.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setToastMessage("Ошибка при регистрации: " + error.message);
      setLoading(false);
      return;
    }

    setToastMessage("📩 Подтвердите регистрацию через email");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#160029] to-[#6e1bb3]">
      <Header />
      {/* форма и остальное */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
