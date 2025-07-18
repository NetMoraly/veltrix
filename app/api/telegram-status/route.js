import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const user_id = searchParams.get('user_id')

  if (!user_id) {
    return NextResponse.json({ error: 'Нет user_id' }, { status: 400 })
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('telegram_id')
    .eq('id', user_id)
    .single()

  if (error || !user) {
    return NextResponse.json({ linked: false })
  }

  return NextResponse.json({ linked: !!user.telegram_id, telegram_id: user.telegram_id })
}