"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Users, Zap } from 'lucide-react';

const Hero: React.FC = React.memo(() => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      {/* Background Montage (Simulated) */}
      <div className="absolute inset-0 z-0 bg-[#0a0a08]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#0a0a08] z-10" />
        <div className="absolute inset-0 opacity-30 h-full scale-105">
          <Image
            src="/assets/hero-montage.png"
            fill
            className="object-cover"
            alt="Brand success content montage"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb997e]/10 border border-[#cb997e]/20 text-[#cb997e] text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} className="fill-current" /> PERFORMANCE UGC STRATEGIST
          </div>

          <h1 className="text-5xl md:text-8xl font-heading font-extrabold tracking-tight mb-8 leading-[1.1]">
            Where High-Aesthetic Creative Meets <span className="text-gradient">Direct-Response</span> Results.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I help TikTok Shop affiliates and DTC brands scale past 7-figures using
            data-backed content strategies and conversion-optimized hooks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-white/5">
              View Strategy Packages
            </a>
            <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 glass-card text-white font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Explore Portfolio
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatCard icon={<TrendingUp className="text-[#a5a58d]" />} label="GMV Generated" value="$30.1K+" subtext="September 2024" />
            <StatCard icon={<BarChart3 className="text-[#cb997e]" />} label="Total Impressions" value="2.7M+" subtext="Across Clients" />
            <StatCard icon={<Users className="text-[#b7b7a4]" />} label="Avg. ROAS" value="4.8x" subtext="TikTok Shop Ads" />
            <StatCard icon={<Zap className="text-[#ddbea9]" />} label="Hook Rate" value="42%" subtext="Average Boost" />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const StatCard = React.memo(({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext: string }) => (
  <div className="glass-card p-6 rounded-3xl text-left hover:border-white/20 transition-colors">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="text-sm font-medium text-gray-400 mb-1">{label}</div>
    <div className="text-2xl font-heading font-bold mb-1">{value}</div>
    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{subtext}</div>
  </div>
));

Hero.displayName = 'Hero';
StatCard.displayName = 'StatCard';

export default Hero;
