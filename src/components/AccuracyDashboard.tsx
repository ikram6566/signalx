"use client";
import { motion } from "framer-motion";
import { PieChart, LineChart, Activity, CheckCircle, BarChart3 } from "lucide-react";

export default function AccuracyDashboard() {
  return (
    <section id="performance" className="py-20 relative z-10 bg-black/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Proven <span className="text-gradient">Performance</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our AI models don't just guess. We track every signal's outcome to provide full transparency on win rates and profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Win Rate (30D)", value: "84.2%", icon: PieChart, color: "text-brand-neon" },
            { label: "Avg Profit / Trade", value: "+4.8%", icon: LineChart, color: "text-brand-green" },
            { label: "Total Signals (30D)", value: "1,248", icon: Activity, color: "text-brand-purple" },
            { label: "Best Market", value: "Crypto", icon: BarChart3, color: "text-amber-400" },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-green" /> Recent Wins
            </h3>
            <div className="space-y-4">
              {[
                { asset: "BTC/USDT", profit: "+8.4%", duration: "14 hours" },
                { asset: "AAPL", profit: "+3.2%", duration: "2 days" },
                { asset: "EUR/USD", profit: "+1.1%", duration: "4 hours" },
                { asset: "SOL/USDT", profit: "+12.5%", duration: "1 day" },
              ].map((win, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <span className="font-bold text-white block">{win.asset}</span>
                    <span className="text-xs text-slate-400">Duration: {win.duration}</span>
                  </div>
                  <span className="text-brand-green font-mono font-bold">{win.profit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-center relative overflow-hidden">
             {/* Simulated Chart Background */}
             <div className="absolute inset-0 opacity-20 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                 <path d="M0,150 L50,120 L100,140 L150,80 L200,90 L250,40 L300,60 L350,20 L400,30" fill="none" stroke="url(#gradient)" strokeWidth="4" strokeLinejoin="round" />
                 <defs>
                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#8b5cf6" />
                   </linearGradient>
                 </defs>
               </svg>
             </div>
             
             <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Simulated ROI</h3>
              <p className="text-slate-400 mb-8 max-w-sm">
                If you traded every Top 3 signal with $1,000 per trade over the last 30 days.
              </p>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">
                +$4,250
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-8 px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium">
                Back to Top
              </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
