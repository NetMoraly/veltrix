import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // нужен сервисный ключ для записи!
)

export async function POST(req) {
  const { code, telegram_id, telegram_username } = await req.json()

  if (!code || !telegram_id) {
    return NextResponse.json({ error: 'Нет кода или telegram_id' }, { status: 400 })
  }

  // Найти пользователя по коду и проверить срок действия
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('tg_code', code)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Код не найден' }, { status: 400 })
  }

  if (new Date(user.tg_code_expires) < new Date()) {
    return NextResponse.json({ error: 'Код просрочен' }, { status: 400 })
  }

  // Привязать telegram_id и username, сбросить код
  const { error: updateError } = await supabase
    .from('users')
    .update({
      telegram_id,
      telegram_username, // <-- сохраняем username
        telegram_linked: true,
      tg_code: null,
      tg_code_expires: null
    })
    .eq('id', user.id)

  if (updateError) {
    return NextResponse.json({ error: 'Ошибка при обновлении' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}