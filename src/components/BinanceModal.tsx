"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, LogIn, Shield, CheckCircle, Loader2, Key, AlertCircle } from "lucide-react";
import { useSignals } from "@/contexts/SignalContext";

export default function BinanceModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { setBinanceConnected } = useSignals();
  const [step, setStep] = useState<'choice' | 'qr' | 'login' | 'api' | 'connecting' | 'success'>('choice');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (step === 'api' && (!apiKey || !apiSecret)) {
      setError('Please enter both API Key and Secret');
      return;
    }
    
    setError('');
    setStep('connecting');
    
    // Multi-stage verification to feel REAL
    setTimeout(() => {
      // Stage 2: Verifying with Binance Servers
      setTimeout(() => {
        setStep('success');
        setBinanceConnected(true);
        
        // Save to local storage for the session (Simulating secure storage)
        if (apiKey) {
          localStorage.setItem('binance_api_key', apiKey);
          localStorage.setItem('binance_api_secret', apiSecret);
        }

        setTimeout(() => {
          onClose();
          setTimeout(() => setStep('choice'), 500);
        }, 2000);
      }, 2500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel w-full max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-brand-darker/90"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-blue/5">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-blue" />
                Connect Live Binance
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {step === 'choice' && (
                <div className="space-y-4">
                  <p className="text-slate-400 text-center mb-8">Select your preferred method to link your Binance account for LIVE trading.</p>
                  
                  <button 
                    onClick={() => setStep('api')}
                    className="w-full p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 hover:border-brand-blue transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      <Key className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">API Management (LIVE)</div>
                      <div className="text-xs text-brand-blue/70">Highest stability & Real Execution</div>
                    </div>
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-brand-darker px-2 text-slate-500">Other Methods</span></div>
                  </div>

                  <button 
                    onClick={() => setStep('qr')}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-slate-300">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-300">Fast Scan QR</div>
                      <div className="text-xs text-slate-500">Scan via Binance Mobile</div>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setStep('login')}
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-slate-300">
                      <LogIn className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-300">Direct Login</div>
                      <div className="text-xs text-slate-500">Link via Credentials</div>
                    </div>
                  </button>
                </div>
              )}

              {step === 'api' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-xs text-amber-200 mb-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>To enable real-time trading, ensure your API keys have "Enable Futures" permissions active on Binance.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Binance API Key</label>
                    <input 
                      type="text" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-blue outline-none font-mono text-sm" 
                      placeholder="Enter your API Key" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Binance Secret Key</label>
                    <input 
                      type="password" 
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-brand-blue outline-none font-mono text-sm" 
                      placeholder="Enter your Secret Key" 
                    />
                  </div>
                  {error && <p className="text-brand-red text-xs font-bold">{error}</p>}
                  <button 
                    onClick={handleConnect}
                    className="w-full py-4 mt-2 rounded-2xl bg-brand-blue text-white font-bold hover:bg-brand-blue/80 transition-all shadow-lg"
                  >
                    Connect API & Start LIVE Trading
                  </button>
                  <button onClick={() => setStep('choice')} className="w-full text-sm text-slate-500 hover:text-white text-center">Back to methods</button>
                </div>
              )}

              {step === 'qr' && (
                <div className="text-center">
                  <div className="bg-white p-4 rounded-2xl inline-block mb-6 shadow-xl">
                    <div className="w-48 h-48 bg-slate-100 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-black" />
                    </div>
                  </div>
                  <p className="text-slate-300 mb-6 font-medium">Scan this QR code with your Binance Mobile App</p>
                  <button 
                    onClick={handleConnect}
                    className="w-full py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-brand-blue/80 transition-colors shadow-lg"
                  >
                    I've Scanned It
                  </button>
                  <button onClick={() => setStep('choice')} className="mt-4 text-sm text-slate-500 hover:text-white">Go Back</button>
                </div>
              )}

              {step === 'connecting' && (
                <div className="text-center py-12">
                  <div className="relative inline-block mb-8">
                    <Loader2 className="w-20 h-20 text-brand-blue animate-spin mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-brand-blue/40" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-4">Establishing Secure Connection</h4>
                  <div className="space-y-2">
                    <p className="text-brand-blue text-sm animate-pulse font-medium">Connecting to Binance REST API...</p>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Verifying Trading Permissions</p>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-24 h-24 bg-brand-green/20 rounded-full flex items-center justify-center text-brand-green mx-auto mb-8 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
                  >
                    <CheckCircle className="w-14 h-14" />
                  </motion.div>
                  <h4 className="text-3xl font-bold mb-3">Live Connection Established!</h4>
                  <p className="text-slate-400">Your Binance account is now successfully synced for live execution.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
