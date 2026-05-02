"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, AlertTriangle, Activity } from "lucide-react";

import { useSignals } from "@/contexts/SignalContext";

export default function TopSignals() {
  const { topSignals, isRefreshing } = useSignals();

  return (
    <section id="signals" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Top 3 <span className="text-gradient">Live Signals</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our highest-confidence setups currently active in the market. Get instant access to 100+ active signals completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSignals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, scale: isRefreshing ? 0.98 : 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-brand-blue/50 transition-all cursor-pointer ${isRefreshing ? 'opacity-50' : ''}`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold">{signal.asset}</h3>
                  <span className="text-sm text-slate-400 bg-white/5 px-2 py-1 rounded-md mt-1 inline-block">
                    {signal.category}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1
                  ${signal.type === 'BUY' ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-red/20 text-brand-red'}`}
                >
                  {signal.type === 'BUY' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {signal.type}
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400">Entry Price</span>
                  <span className="font-mono text-lg">{signal.entry}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/5">
                  <div>
                    <span className="text-slate-400 text-sm block mb-1 flex items-center gap-1">
                      <Target className="w-3 h-3" /> Target 1
                    </span>
                    <span className="font-mono text-brand-green">{signal.target1}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm block mb-1 flex items-center gap-1">
                      <Target className="w-3 h-3" /> Target 2
                    </span>
                    <span className="font-mono text-brand-green">{signal.target2}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Stop Loss
                  </span>
                  <span className="font-mono text-brand-red">{signal.stopLoss}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Confidence</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-blue to-brand-neon" 
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="font-bold text-sm">{signal.confidence}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{signal.time}</span>
                    <span className="text-brand-green font-bold text-sm">Exp: {signal.profit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
