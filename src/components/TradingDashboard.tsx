"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Settings, Wallet, TrendingUp, Cpu, History, AlertCircle, Loader2, X, Shield, Activity, BarChart3 } from "lucide-react";
import { useSignals } from "@/contexts/SignalContext";

export default function TradingDashboard() {
  const { isBinanceConnected, accountType, setAccountType, isAgentActive, setIsAgentActive, tradeLogs, balance, fetchLiveBalance } = useSignals();
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [leverage, setLeverage] = useState(10);
  const [riskPerTrade, setRiskPerTrade] = useState(2);

  // Simulate balance fetching when account type changes
  useEffect(() => {
    setIsFetchingBalance(true);
    fetchLiveBalance().then(() => setIsFetchingBalance(false));
  }, [accountType]);

  if (!isBinanceConnected) return null;

  return (
    <section id="trading-dashboard" className="py-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-[2rem] p-8 border border-brand-blue/20 bg-gradient-to-br from-brand-blue/5 to-transparent relative overflow-hidden"
      >
        {/* Animated Background Pulse for Active Agent */}
        {isAgentActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute inset-0 bg-brand-blue animate-pulse pointer-events-none"
          />
        )}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green" /> BINANCE LIVE
              </div>
              {isAgentActive && (
                <div className="px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-bold flex items-center gap-1 animate-pulse">
                  <Cpu className="w-3 h-3" /> AGENT EXECUTING
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold">Trading Control Center</h2>
            <p className="text-slate-400 mt-2">Managing your high-frequency automated strategies.</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setAccountType('demo')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${accountType === 'demo' ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Futures Demo
            </button>
            <button 
              onClick={() => setAccountType('real')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${accountType === 'real' ? 'bg-brand-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Futures Real
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/2">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-brand-blue/10 text-brand-blue">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">Available Balance</span>
                {isFetchingBalance ? (
                  <div className="flex items-center justify-end gap-2 text-white">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                    <span className="text-2xl font-bold opacity-50">Fetching...</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-white transition-all">
                    ${balance}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Shield className="w-3 h-3 text-brand-green" /> 
              {accountType === 'demo' ? 'Paper trading environment' : 'Secured via Binance API'}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/2">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-brand-purple/10 text-brand-purple">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">Today's Total PnL</span>
                <span className="text-2xl font-bold text-brand-green">
                  {isAgentActive ? '+$482.50' : '+$0.00'}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isAgentActive ? '70%' : '0%' }}
                className="h-full bg-brand-green rounded-full" 
              />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/2 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-bold flex items-center gap-2">
                AI Strategy <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-blue">V2.4</span>
              </h4>
              <p className="text-xs text-slate-400">Multi-Indicator Alpha Trend</p>
            </div>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-blue transition-all group"
            >
              <Settings className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
              <button 
                onClick={() => setIsAgentActive(!isAgentActive)}
                disabled={isFetchingBalance}
                className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isAgentActive 
                    ? 'bg-brand-red/10 text-brand-red border border-brand-red/30 hover:bg-brand-red/20' 
                    : 'bg-brand-green text-white shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 disabled:opacity-50'
                }`}
              >
                {isAgentActive ? <><Pause className="w-6 h-6 fill-current" /> Stop AI Agent</> : <><Play className="w-6 h-6 fill-current" /> Start AI Agent</>}
              </button>
              
              <div className="flex-1 text-center sm:text-left">
                <p className="text-slate-200 font-medium text-lg">
                  {isAgentActive 
                    ? 'AI Agent is actively scanning markets...' 
                    : 'AI Agent is idle. Click start to launch automation.'}
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  {isAgentActive ? 'Win Rate: 94.2% | Active Trades: 2' : 'Highest win-rate algorithm selected'}
                </p>
              </div>
            </div>

            {/* Live Trade Logs */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/2">
                <h4 className="font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-blue" />
                  Live Execution Log
                </h4>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Auto-Updating</div>
              </div>
              <div className="h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {!isAgentActive && tradeLogs.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                    <BarChart3 className="w-8 h-8 opacity-20" />
                    <p className="text-sm">No active logs. Start the agent to see real-time trades.</p>
                  </div>
                )}
                {tradeLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono">{log.time}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${log.type === 'BUY' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-red/10 text-brand-red'}`}>
                        {log.type}
                      </span>
                      <span className="font-bold text-white">{log.asset}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-brand-blue font-bold">{log.status}</span>
                      <span className="text-brand-green font-bold">{log.profit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel w-full max-w-md rounded-3xl overflow-hidden border border-white/10"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-blue/5">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="w-5 h-5 text-brand-blue" />
                    Agent Settings
                  </h3>
                  <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <label className="flex justify-between text-sm font-medium text-slate-400 mb-4">
                      <span>Leverage (Futures)</span>
                      <span className="text-brand-blue font-bold">{leverage}x</span>
                    </label>
                    <input 
                      type="range" min="1" max="100" value={leverage} 
                      onChange={(e) => setLeverage(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm font-medium text-slate-400 mb-4">
                      <span>Risk Per Trade</span>
                      <span className="text-brand-purple font-bold">{riskPerTrade}%</span>
                    </label>
                    <input 
                      type="range" min="0.5" max="10" step="0.5" value={riskPerTrade} 
                      onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                    />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-Stop Loss</span>
                      <div className="w-10 h-5 bg-brand-blue rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trail Profit</span>
                      <div className="w-10 h-5 bg-white/10 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="w-full py-4 rounded-2xl bg-brand-blue text-white font-bold hover:bg-brand-blue/80 transition-all shadow-lg"
                  >
                    Save Algorithm Settings
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
