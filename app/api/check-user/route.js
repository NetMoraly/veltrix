import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {

  console.log('>>> [API] /api/check-user вызван');


  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { email } = await req.json();


  console.log('>>> Email для проверки:', email);

  if (!email) {
    console.log('>>> [API] Не указан email');
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  let exists = false;
  let page = 1;
  const perPage = 50;

  try {

    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage,
      });

      console.log(`>>> Page ${page}, users:`, data?.users?.map(u => u.email));

      if (error) {
        console.log('>>> [API] Ошибка Supabase:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!data?.users?.length) {
        console.log('>>> [API] Нет больше пользователей');
        break;
      }

      const found = data.users.some((u) => u.email === email);
      if (found) {
        console.log('>>> [API] Email найден в базе:', email);
        exists = true;
        break;
      }

      page++;
    }


    console.log('>>> [API] Проверка завершена, exists:', exists);
    return NextResponse.json({ exists }, { status: 200 });

  } catch (e) {
    
    console.log('>>> [API] Exception:', e);
    return NextResponse.json(
      { error: e.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
