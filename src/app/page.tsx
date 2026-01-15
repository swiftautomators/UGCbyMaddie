"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import CaseStudy from "@/components/CaseStudy";
import Services from "@/components/Services";
import { Globe, Mail, ArrowRight } from "lucide-react";

// Lazy load sections for better initial performance
const StrategyAI = dynamic(() => import('@/components/StrategyAI'), {
  loading: () => <div className="h-[400px] flex items-center justify-center animate-pulse bg-white/5 rounded-3xl mx-6">Loading AI Brain...</div>
});

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <div className="h-[600px] flex items-center justify-center animate-pulse bg-white/5 rounded-3xl mx-6">Loading Performance Library...</div>
});

const IntakeForm = dynamic(() => import('@/components/IntakeForm'), {
  loading: () => <div className="h-[500px] flex items-center justify-center animate-pulse bg-white/5 rounded-3xl mx-6">Loading Applications...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StrategyAI />
      <CaseStudy />
      <Portfolio />
      <Services />
      <IntakeForm />

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-2xl font-heading font-black mb-6">UGC by Maddie</div>
            <p className="text-gray-400 max-w-sm mb-8">
              A performance-driven UGC strategist focusing on data-backed creative that scales TikTok Shop & Paid Ads revenue.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Globe size={18} />
              </a>
              <a href="mailto:Maddie@UGCbyMaddie.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-between">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Work with me</h4>
              <p className="text-gray-400">Ready to boost your direct-response ROI?</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300">
                Inquire Now <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-12 md:mt-0 text-sm text-gray-600">
              © {new Date().getFullYear()} UGC by Maddie. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
