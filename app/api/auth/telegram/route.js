import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';


const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  // Получаем токен бота из таблицы secrets
  const { data: secret, error: tokenError } = await supabase
    .from('secure.secrets')
    .select('value')
    .eq('name', 'telegram_bot_token')
    .single();

  if (tokenError || !secret?.value) {
    console.error('Ошибка получения токена Telegram:', tokenError);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const TELEGRAM_BOT_TOKEN = secret.value;

  // Проверка подписи Telegram
  const { searchParams } = new URL(request.url);
  const data = Object.fromEntries(searchParams.entries());

  const secretKey = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const checkString = Object.keys(data)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${data[key]}`)
    .join('\n');

  const hash = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

  if (hash !== data.hash) {
    return NextResponse.json({ error: 'Invalid Telegram auth data' }, { status: 401 });
  }

  // Формируем данные
  const userData = {
    telegram_id: data.id,
    first_name: data.first_name,
    last_name: data.last_name || '',
    username: data.username || '',
  };

  const telegramEmail = `${userData.telegram_id}@telegram`;
  const generatedPassword = crypto.createHash('sha256')
    .update(`${userData.telegram_id}:${TELEGRAM_BOT_TOKEN}`)
    .digest('hex');

  // Проверка существования в Supabase Auth
  const { data: existingUser } = await supabase.auth.admin.getUserByEmail(telegramEmail);

  if (!existingUser?.user) {
    const { error: createError } = await supabase.auth.admin.createUser({
      email: telegramEmail,
      password: generatedPassword,
      email_confirm: true,
      user_metadata: {
        telegram_id: userData.telegram_id,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      }
    });

    if (createError) {
      console.error('Ошибка создания пользователя:', createError);
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }
  }

  // Вход в Supabase Auth
  const { data: auth, error: authError } = await supabase.auth.signInWithPassword({
    email: telegramEmail,
    password: generatedPassword,
  });

  if (authError) {
    console.error('Ошибка входа:', authError);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }

  // Установка токенов в куки
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, 302);

  response.cookies.set('sb-access-token', auth.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  response.cookies.set('sb-refresh-token', auth.session.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  return response;
}

