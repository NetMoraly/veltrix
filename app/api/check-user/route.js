import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  try {
    // Проверка на переменные окружения
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.admin.listUsers({ email });

    if (error) {
      // Возвращаем ошибку и логируем её на сервере
      console.error("Supabase admin error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const exists = data?.users?.length > 0;
    return NextResponse.json({ exists }, { status: 200 });

  } catch (e) {
    // Логируем и возвращаем текст ошибки
    console.error("API /api/check-user CATCH error:", e);
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}

