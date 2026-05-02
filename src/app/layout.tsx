import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { SignalProvider } from "@/contexts/SignalContext";

const outfit = Outfit({
  variable: "--font-inter", // keeping variable name the same for simplicity
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SignalX Pro | Premium AI Trading Signals",
  description: "AI-powered trading signals for Crypto, Forex, Stocks, and Commodities. Next-generation predictive market algorithms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased bg-brand-darker text-slate-200 min-h-screen flex flex-col`}>
        <SignalProvider>
          {children}
        </SignalProvider>
      </body>
    </html>
  );
}
