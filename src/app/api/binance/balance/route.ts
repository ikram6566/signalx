import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { apiKey, apiSecret, isTestnet } = await req.json();

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'API Key and Secret are required' }, { status: 400 });
    }

    const baseUrl = isTestnet 
      ? 'https://testnet.binancefuture.com' 
      : 'https://fapi.binance.com';

    const timestamp = Date.now();
    const query = `timestamp=${timestamp}`;
    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(query)
      .digest('hex');

    const url = `${baseUrl}/fapi/v2/balance?${query}&signature=${signature}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-MBX-APIKEY': apiKey,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Find USDT balance for futures
      const usdtBalance = data.find((b: any) => b.asset === 'USDT');
      return NextResponse.json({ 
        balance: usdtBalance ? parseFloat(usdtBalance.balance).toFixed(2) : '0.00',
        rawData: data 
      });
    } else {
      return NextResponse.json({ error: data.msg || 'Failed to fetch balance' }, { status: response.status });
    }
  } catch (error: any) {
    console.error('Binance API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
