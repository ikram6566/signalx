"use client";
import React, { createContext, useContext, useState } from 'react';

const assets = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'EUR/USD', 'GBP/JPY', 'XAU/USD', 'AAPL', 'TSLA', 'NVDA', 'AMZN'];
const markets = ['Crypto', 'Crypto', 'Crypto', 'Forex', 'Forex', 'Commodity', 'Stock', 'Stock', 'Stock', 'Stock'];

const realisticPrices: Record<string, number> = {
  'BTC/USDT': 64200,
  'ETH/USDT': 3450,
  'SOL/USDT': 145.5,
  'EUR/USD': 1.0850,
  'GBP/JPY': 192.30,
  'XAU/USD': 2340.50,
  'AAPL': 178.20,
  'TSLA': 185.40,
  'NVDA': 124.80,
  'AMZN': 182.50
};

const formatPrice = (price: number, asset: string) => {
  if (asset === 'EUR/USD') return price.toFixed(4);
  if (asset === 'GBP/JPY') return price.toFixed(2);
  if (price > 1000) return `$${price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  return `$${price.toFixed(2)}`;
};

export const generateTopSignals = () => {
  return Array.from({ length: 3 }, (_, i) => {
    const isBuy = Math.random() > 0.5;
    const asset = assets[i];
    // Generate an entry price within 0.5% of the realistic current price
    const basePrice = realisticPrices[asset] * (1 + (Math.random() * 0.01 - 0.005));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      asset: asset,
      category: markets[i],
      type: isBuy ? "BUY" : "SELL",
      entry: formatPrice(basePrice, asset),
      target1: formatPrice(basePrice * (isBuy ? 1.02 : 0.98), asset),
      target2: formatPrice(basePrice * (isBuy ? 1.05 : 0.95), asset),
      stopLoss: formatPrice(basePrice * (isBuy ? 0.98 : 1.02), asset),
      confidence: Math.floor(Math.random() * 15) + 85,
      risk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      profit: `+${(Math.random() * 5 + 1).toFixed(1)}%`,
      time: "Just now"
    };
  });
};

export const generateTableSignals = () => {
  return Array.from({ length: 15 }, (_, i) => {
    const isBuy = Math.random() > 0.5;
    const assetIdx = i % assets.length;
    const asset = assets[assetIdx];
    const basePrice = realisticPrices[asset] * (1 + (Math.random() * 0.01 - 0.005));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      rank: i + 4,
      symbol: asset,
      market: markets[assetIdx],
      type: isBuy ? 'BUY' : 'SELL',
      entry: formatPrice(basePrice, asset).replace('$', ''),
      target: formatPrice(basePrice * (isBuy ? 1.03 : 0.97), asset).replace('$', ''),
      stopLoss: formatPrice(basePrice * (isBuy ? 0.98 : 1.02), asset).replace('$', ''),
      accuracy: Math.floor(Math.random() * 20) + 75,
      trend: Math.random() > 0.5 ? 'Strong' : 'Weak',
      updated: "Just now"
    };
  });
};

type SignalContextType = {
  topSignals: any[];
  tableSignals: any[];
  isRefreshing: boolean;
  refreshSignals: () => Promise<void>;
  lastRefreshed: Date;
  isBinanceConnected: boolean;
  setBinanceConnected: (val: boolean) => void;
  accountType: 'demo' | 'real';
  setAccountType: (type: 'demo' | 'real') => void;
  isAgentActive: boolean;
  setIsAgentActive: (val: boolean) => void;
  tradeLogs: any[];
  addTradeLog: (log: any) => void;
  balance: string;
  fetchLiveBalance: () => Promise<void>;
};

export const SignalContext = createContext<SignalContextType | null>(null);

export const SignalProvider = ({ children }: { children: React.ReactNode }) => {
  // Use lazy initialization to avoid hydration mismatch
  const [topSignals, setTopSignals] = useState<any[]>([]);
  const [tableSignals, setTableSignals] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  const [isBinanceConnected, setBinanceConnected] = useState(false);
  const [accountType, setAccountType] = useState<'demo' | 'real'>('demo');
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [tradeLogs, setTradeLogs] = useState<any[]>([]);
  const [balance, setBalance] = useState('0.00');

  const fetchLiveBalance = async () => {
    const apiKey = localStorage.getItem('binance_api_key');
    const apiSecret = localStorage.getItem('binance_api_secret');
    
    if (!apiKey || !apiSecret) {
      setBalance(accountType === 'demo' ? '10,000.00' : '1,425.80');
      return;
    }

    try {
      const res = await fetch('/api/binance/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, apiSecret, isTestnet: accountType === 'demo' })
      });
      const data = await res.json();
      if (data.balance) {
        setBalance(data.balance);
      }
    } catch (err) {
      console.error('Balance Fetch Error:', err);
    }
  };

  const addTradeLog = (log: any) => {
    setTradeLogs(prev => [log, ...prev].slice(0, 20));
  };

  React.useEffect(() => {
    setTopSignals(generateTopSignals());
    setTableSignals(generateTableSignals());
    setIsMounted(true);
  }, []);

  // Simulate agent trading when active
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAgentActive && isBinanceConnected) {
      interval = setInterval(() => {
        const assets = ['BTC', 'ETH', 'SOL', 'XAU'];
        const asset = assets[Math.floor(Math.random() * assets.length)];
        const profit = (Math.random() * 50 - 10).toFixed(2);
        addTradeLog({
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toLocaleTimeString(),
          asset,
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          status: 'EXECUTED',
          profit: `${Number(profit) > 0 ? '+' : ''}${profit}%`
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAgentActive, isBinanceConnected]);

  const refreshSignals = async () => {
    setIsRefreshing(true);
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTopSignals(generateTopSignals());
    setTableSignals(generateTableSignals());
    setLastRefreshed(new Date());
    setIsRefreshing(false);
  };

  return (
    <SignalContext.Provider value={{ 
      topSignals, 
      tableSignals, 
      isRefreshing, 
      refreshSignals, 
      lastRefreshed,
      isBinanceConnected,
      setBinanceConnected,
      accountType,
      setAccountType,
      isAgentActive,
      setIsAgentActive,
      tradeLogs,
      addTradeLog,
      balance,
      fetchLiveBalance
    }}>
      {children}
    </SignalContext.Provider>
  );
};

export const useSignals = () => {
  const context = useContext(SignalContext);
  if (!context) throw new Error("useSignals must be used within a SignalProvider");
  return context;
};
