"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, BarChart3, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const StatCard = React.memo(({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="glass-card p-6 rounded-3xl flex items-center gap-4 border-white/5">
    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
      <Icon className="text-purple-400" size={24} aria-hidden="true" />
    </div>
    <div>
      <div className="text-2xl font-heading font-black">{value}</div>
      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</div>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';

const Hero: React.FC = React.memo(() => {
  const images = useMemo(() => [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1454165833221-d7d1568f2f21?auto=format&fit=crop&q=80&w=400",
  ], []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 via-transparent to-black" />
        <div className="grid grid-cols-4 md:grid-cols-8 gap-1 opacity-20 h-full">
          {images.map((img, i) => (
            <div key={i} className="relative h-full overflow-hidden">
              <Image
                src={img}
                alt=""
                fill
                priority={i < 4}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 animate-pulse-data"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="text-purple-400" size={16} aria-hidden="true" />
              <span className="text-sm font-bold tracking-tight">Performance Tracker: $30K+ GMV Generated This Month</span>
            </div>

            <h1 id="hero-heading" className="text-5xl md:text-8xl font-heading font-black tracking-tighter mb-8 leading-[0.9]">
              Turn Scrollers Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-emerald-400">High-Value Raving Fans</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl">
              I don&apos;t just make &ldquo;pretty&rdquo; videos. I engineer direct-response creative based on consumer psychology to scale your brand at $10k+ daily spend.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-black text-lg font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                aria-label="Secure a spot for a free audit"
              >
                Secure Your Spot <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/5 text-white text-lg font-black border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center"
                aria-label="View portfolio of results"
              >
                View Results
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon={TrendingUp} value="105%" label="Avg. ROAS Lift" />
              <StatCard icon={BarChart3} value="$30K" label="GMV in 21 Days" />
              <StatCard icon={Users} value="250+" label="Videos Produced" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
