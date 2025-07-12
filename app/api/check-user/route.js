import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  // ✅ Внутри функции — переменные читаются корректно
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);
  const { email } = await req.json();

  const { data, error } = await supabase.auth.admin.listUsers({ email });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const exists = data?.users?.length > 0;

  return new Response(JSON.stringify({ exists }), { status: 200 });
}
