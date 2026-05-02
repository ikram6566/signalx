import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopSignals from "@/components/TopSignals";
import SignalTable from "@/components/SignalTable";
import AccuracyDashboard from "@/components/AccuracyDashboard";
import TradingDashboard from "@/components/TradingDashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-brand-purple/30 selection:text-brand-purple">
      {/* Background gradients */}
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-dark/40 via-brand-darker to-brand-darker"></div>
      
      <Navbar />
      <Hero />
      <TradingDashboard />
      <TopSignals />
      <SignalTable />
      <AccuracyDashboard />
      <Footer />
    </main>
  );
}
