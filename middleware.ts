import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Проверка аутентификации
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Для дашборда - проверяем подписку
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('subscription_active, subscription_expires_at')
      .eq('user_id', session.user.id)
      .eq('subscription_active', true)
      .single();

    const hasValidSubscription = subscription && 
      subscription.subscription_expires_at && 
      new Date(subscription.subscription_expires_at) > new Date();

    if (!hasValidSubscription) {
      return NextResponse.redirect(new URL('/subscribe', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

