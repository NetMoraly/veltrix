import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Получаем токен из заголовка
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Проверяем токен и получаем пользователя
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Проверяем подписку в базе данных
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('subscription_active, subscription_expires_at')
      .eq('user_id', user.id)
      .eq('subscription_active', true)
      .single();

    if (subError && subError.code !== 'PGRST116') {
      console.error('Ошибка проверки подписки:', subError);
      return NextResponse.json({ 
        hasSubscription: false, 
        expiresAt: null,
        userId: user.id 
      });
    }

    // Проверяем активность подписки
    const hasValidSubscription = subscription && 
      subscription.subscription_expires_at && 
      new Date(subscription.subscription_expires_at) > new Date();

    return NextResponse.json({ 
      hasSubscription: hasValidSubscription,
      expiresAt: subscription?.subscription_expires_at,
      userId: user.id
    });

  } catch (error) {
    console.error('Ошибка сервера:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}