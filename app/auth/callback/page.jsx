"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login?verified=true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#160029] to-[#6e1bb3] text-white text-xl font-semibold">
      Подтверждение успешно! Перенаправляем на страницу входа...
    </div>
  );
}
