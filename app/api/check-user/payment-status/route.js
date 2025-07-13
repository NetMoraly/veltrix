import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.formData();

  const m_orderid = data.get('m_orderid');
  const m_amount = data.get('m_amount');
  const m_curr = data.get('m_curr');
  const m_desc = data.get('m_desc');
  const m_sign = data.get('m_sign');

  const m_key = process.env.PAYEER_SECRET_KEY;
  const m_shop = process.env.PAYEER_SHOP_ID;

  const hashArray = [
    m_shop,
    m_orderid,
    m_amount,
    m_curr,
    m_desc,
    m_key
  ];

  const expectedSign = hashArray.join(':');
  const calculatedSign = require('crypto')
    .createHash('sha256')
    .update(expectedSign)
    .digest('hex')
    .toUpperCase();

  if (calculatedSign !== m_sign) {
    return new NextResponse('INVALID SIGNATURE', { status: 400 });
  }

  // ✅ Здесь добавь свою бизнес-логику:
  // Например, отметить заказ как "оплаченный" в БД
  console.log('✅ Платёж подтверждён:', m_orderid);

  return new NextResponse('OK');
}
