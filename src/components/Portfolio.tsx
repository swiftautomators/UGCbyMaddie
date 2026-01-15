"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Filter } from 'lucide-react';
import Image from 'next/image';
import { PortfolioItem } from '@/types';

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Eco-Friendly Cleaning",
    category: "Awareness",
    thumbnail: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=800",
    stats: "1.2M Views",
    link: "#"
  },
  {
    id: "2",
    title: "Premium Skincare",
    category: "Conversion",
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    stats: "$12K Sales",
    link: "#"
  },
  {
    id: "3",
    title: "Tech Accessories",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800",
    stats: "45% CTR",
    link: "#"
  },
  {
    id: "4",
    title: "Fitness Apparel",
    category: "Awareness",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    stats: "800K Views",
    link: "#"
  },
  {
    id: "5",
    title: "Home Decor",
    category: "Conversion",
    thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    stats: "ROAS 4.5x",
    link: "#"
  },
  {
    id: "6",
    title: "Gourmet Snacks",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1599490659223-ef52e3d53aa6?auto=format&fit=crop&q=80&w=800",
    stats: "20% Reorder",
    link: "#"
  }
];

const Portfolio: React.FC = React.memo(() => {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
              PORTFOLIO
            </div>
            <h2 id="portfolio-heading" className="text-4xl md:text-6xl font-heading font-extrabold">The Performance Library</h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio items">
            {['All', 'Awareness', 'Education', 'Conversion'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-label={`Filter by ${cat}`}
                aria-pressed={filter === cat}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === cat
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                role="listitem"
                aria-label={`View details for ${item.title}`}
                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-card border-white/5"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-purple-400 text-xs font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">{item.title}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                      <Play size={14} fill="white" aria-hidden="true" />
                      <span className="text-sm font-bold">{item.stats}</span>
                    </div>
                    <a
                      href={item.link}
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                      aria-label="Open project link"
                    >
                      <ExternalLink size={20} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
