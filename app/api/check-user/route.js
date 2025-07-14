import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  let exists = false;
  let page = 1;
  const perPage = 50;

  try {
    // --- Вот сюда! ---
    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage,
      });

      // Логируем, что реально приходит от сервера!
      console.log(`Page ${page}, users:`, data?.users?.map(u => u.email));

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!data?.users?.length) {
        break;
      }

      if (data.users.some((u) => u.email === email)) {
        exists = true;
        break;
      }

      page++;
    }
    // --- До сюда! ---

    return NextResponse.json({ exists }, { status: 200 });

  } catch (e) {

    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });

  }

}



