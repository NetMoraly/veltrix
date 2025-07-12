'use client';

export default function EnvDebug() {
  return (
    <div>
      <h1>DEBUG ENV</h1>
      <div>
        SUPABASE_URL: <b>{String(process.env.NEXT_PUBLIC_SUPABASE_URL)}</b><br />
        SUPABASE_ANON_KEY: <b>{String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}</b>
      </div>
    </div>
  );
}
