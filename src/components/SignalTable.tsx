"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useSignals } from "@/contexts/SignalContext";

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Strong Buy"];

export default function SignalTable() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { tableSignals, isRefreshing } = useSignals();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      // Third click removes sort
      setSortConfig(null);
      return;
    }
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedSignals = useMemo(() => {
    let result = [...tableSignals];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(s => s.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by category
    if (activeFilter !== "All") {
      if (activeFilter === "Strong Buy") {
        result = result.filter(s => s.type === "BUY" && s.trend === "Strong");
      } else {
        const filterMap: Record<string, string> = {
          "Stocks": "Stock",
          "Commodities": "Commodity"
        };
        const mappedFilter = filterMap[activeFilter] || activeFilter;
        result = result.filter(s => s.market === mappedFilter);
      }
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        
        if (sortConfig.key === 'accuracy' || sortConfig.key === 'rank') {
          valA = Number(valA);
          valB = Number(valB);
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tableSignals, activeFilter, searchQuery, sortConfig]);

  const displayedSignals = processedSignals.slice(0, visibleCount);

  return (
    <section className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Live Signal Feed</h2>
          <p className="text-slate-400 mt-1">Real-time updates across monitored assets</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search symbol..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-blue text-sm text-foreground"
            />
          </div>
          <button 
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            title="Advanced Filters"
          >
            <Filter className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? "bg-brand-blue text-white font-medium" 
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('rank')}>
                  <div className="flex items-center gap-1">Rank <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('symbol')}>
                  <div className="flex items-center gap-1">Symbol <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('market')}>
                  <div className="flex items-center gap-1">Market <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('type')}>
                  <div className="flex items-center gap-1">Action <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 font-medium">Entry</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">Stop Loss</th>
                <th className="px-6 py-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('accuracy')}>
                  <div className="flex items-center gap-1">Accuracy <ArrowUpDown className="w-3 h-3"/></div>
                </th>
                <th className="px-6 py-4 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-white/5 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
              {displayedSignals.length > 0 ? (
                displayedSignals.map((signal) => (
                  <motion.tr 
                    key={signal.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-slate-400">{signal.rank}</td>
                    <td className="px-6 py-4 font-bold group-hover:text-brand-neon transition-colors">{signal.symbol}</td>
                    <td className="px-6 py-4 text-slate-400">{signal.market}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        signal.type === 'BUY' ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-red/20 text-brand-red'
                      }`}>
                        {signal.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">{signal.entry}</td>
                    <td className="px-6 py-4 font-mono text-brand-green">{signal.target}</td>
                    <td className="px-6 py-4 font-mono text-brand-red">{signal.stopLoss}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${signal.accuracy > 85 ? 'bg-brand-green' : 'bg-brand-blue'}`} 
                            style={{ width: `${signal.accuracy}%` }}
                          />
                        </div>
                        <span className="font-mono">{signal.accuracy}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{signal.updated}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-slate-400">
                    No signals found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {visibleCount < processedSignals.length && (
          <div className="p-4 border-t border-white/10 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="text-brand-blue hover:text-brand-neon font-medium text-sm transition-colors px-4 py-2"
            >
              Load More Signals
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
