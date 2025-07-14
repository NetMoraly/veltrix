import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Инициализация Supabase с сервисным ключом
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Важно: без NEXT_PUBLIC_!
);

export async function GET(request) {
  // 1. Получаем Telegram Bot Token из таблицы secure.secrets
  const { data: secret, error: tokenError } = await supabase
    .from('secure.secrets') // Указываем схему явно
    .select('value')
    .eq('name', 'telegram_bot_token')
    .single();

  if (tokenError || !secret?.value) {
    console.error('Ошибка получения токена:', tokenError);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  const TELEGRAM_BOT_TOKEN = secret.value;

  // 2. Проверяем подпись данных от Telegram
  const { searchParams } = new URL(request.url);
  const data = Object.fromEntries(searchParams.entries());

  // Формируем строку для проверки подписи
  const secretKey = crypto.createHash('sha256')
    .update(TELEGRAM_BOT_TOKEN)
    .digest();
  const checkString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');
  const hash = crypto.createHmac('sha256', secretKey)
    .update(checkString)
    .digest('hex');

  if (hash !== data.hash) {
    return NextResponse.json(
      { error: 'Invalid Telegram auth data' },
      { status: 401 }
    );
  }

  // 3. Подготавливаем данные пользователя
  const userData = {
    telegram_id: data.id,
    first_name: data.first_name,
    last_name: data.last_name || '',
    username: data.username || '',
    photo_url: data.photo_url || '',
    auth_date: new Date(parseInt(data.auth_date) * 1000).toISOString(),
  };

  // 4. Сохраняем/обновляем пользователя в Supabase
  const { data: user, error: upsertError } = await supabase
    .from('users') // Ваша основная таблица пользователей
    .upsert(
      {
        ...userData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'telegram_id' }
    )
    .select()
    .single();

  if (upsertError) {
    console.error('Ошибка сохранения пользователя:', upsertError);
    return NextResponse.json(
      { error: 'Failed to save user' },
      { status: 500 }
    );
  }

  // 5. Создаем сессию (JWT) через Supabase Auth
  const { data: auth, error: authError } = await supabase.auth.signInWithPassword({
    email: `${userData.telegram_id}@telegram`, // Уникальный email-заглушка
    password: crypto.createHash('sha256')
      .update(`${userData.telegram_id}:${TELEGRAM_BOT_TOKEN}`)
      .digest('hex'), // Пароль на основе токена
  });

  if (authError) {
    console.error('Ошибка авторизации:', authError);
    return NextResponse.json(
      { error: 'Auth failed' },
      { status: 500 }
    );
  }

  // 6. Устанавливаем защищенные куки
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    302
  );
  response.cookies.set('sb-access-token', auth.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 неделя
    path: '/',
  });

  return response;
}