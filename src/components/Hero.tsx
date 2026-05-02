"use client";
import { motion } from "framer-motion";
import { TrendingUp, Clock, ShieldCheck, Zap, RefreshCw } from "lucide-react";
import { useSignals } from "@/contexts/SignalContext";

export default function Hero() {
  const { isRefreshing, refreshSignals, lastRefreshed } = useSignals();

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-blue/30 text-brand-neon text-sm font-semibold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-neon animate-ping" />
            <span className="flex h-2 w-2 rounded-full bg-brand-neon absolute" />
            Live Market Algorithms Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Next-Gen Trading Signals <br className="hidden md:block" />
            <span className="text-gradient">Powered by AI</span>
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
             Institutional-grade market analysis for Crypto, Forex, and Stocks. 
             Uncover high-probability setups refreshed every 15 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button onClick={() => document.getElementById('signals')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" /> View Live Signals
            </button>
            <button onClick={() => document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" /> View Past Results
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-8 mt-12 text-left">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4 text-brand-neon" /> Next Refresh In
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white font-mono">
                  {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <button 
                  onClick={refreshSignals} 
                  disabled={isRefreshing}
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-brand-blue"
                  title="Force Refresh Signals"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <TrendingUp className="w-4 h-4 text-brand-green" /> Signals Today
              </div>
              <div className="text-2xl font-bold text-white">124</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <ShieldCheck className="w-4 h-4 text-brand-purple" /> Accuracy Rate
              </div>
              <div className="text-2xl font-bold text-white">83.4%</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Zap className="w-4 h-4 text-amber-400" /> Active Markets
              </div>
              <div className="text-2xl font-bold text-white">Crypto + Forex</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
