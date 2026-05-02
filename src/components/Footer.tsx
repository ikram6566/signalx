import { Activity, MessageSquare, Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                SignalX <span className="text-brand-neon">Pro</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering traders with institutional-grade AI signals. Make data-driven decisions with confidence in any market condition.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-blue/20 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-purple/20 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-blue/20 transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Markets</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Cryptocurrency</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Forex</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Stocks & ETFs</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Commodities</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Indices</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Features</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Live Signal Feed</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Accuracy Analytics</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Telegram Alerts</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">API Access</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Auto-Trading Bot</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-brand-neon transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-brand-neon transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SignalX Pro. All rights reserved. Not financial advice.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Risk Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
