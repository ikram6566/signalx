"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Menu, X, Sun, Moon, Wallet } from "lucide-react";
import Link from "next/link";
import BinanceModal from "./BinanceModal";
import { useSignals } from "@/contexts/SignalContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isBinanceConnected } = useSignals();

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              SignalX <span className="text-brand-neon">Pro</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="#signals" className="text-slate-300 hover:text-white transition-colors">Signals</Link>
            <Link href="#performance" className="text-slate-300 hover:text-white transition-colors">Performance</Link>
            <Link href="#api" className="text-slate-300 hover:text-white transition-colors">API Access</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!isBinanceConnected && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] active:scale-95"
              >
                <Wallet className="w-4 h-4" /> Connect Binance
              </button>
            )}
            {isBinanceConnected && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-bold">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Linked to Binance
              </div>
            )}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel border-t border-white/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="#signals" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Signals</Link>
            <Link href="#performance" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Performance</Link>
          </div>
        </motion.div>
      )}

      <BinanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
