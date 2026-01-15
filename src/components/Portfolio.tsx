"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Filter, ChevronRight, Video } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Organic Hook Strategy",
    category: "TikTok Shop",
    stats: "+24% CTR",
    image: "/assets/beauty-thumb.png",
    description: "Beauty brand scale using pattern-interrupt hooks."
  },
  {
    id: 2,
    title: "Paid Ads Creative",
    category: "DTC Paid",
    stats: "3.2x ROAS",
    image: "/assets/home-thumb.png",
    description: "High-retention creative for Facebook and TikTok ads."
  },
  {
    id: 3,
    title: "Product Showcase",
    category: "Organic",
    stats: "1.2M Views",
    image: "/assets/beauty-thumb.png",
    description: "Educational storytelling for viral product discovery."
  },
  {
    id: 4,
    title: "Direct Response",
    category: "TikTok Shop",
    stats: "$12K GMV",
    image: "/assets/home-thumb.png",
    description: "Conversion-optimized shop affiliate content."
  }
];

const categories = ["All", "TikTok Shop", "DTC Paid", "Organic"];

const Portfolio: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-24 px-6 bg-black/30" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb997e]/10 border border-[#cb997e]/20 text-[#cb997e] text-xs font-bold uppercase tracking-wider mb-6">
              <Video size={14} className="fill-current" /> PORTFOLIO
            </div>
            <h2 id="portfolio-heading" className="text-4xl md:text-6xl font-heading font-extrabold text-white">
              Creative That <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cb997e] to-[#a5a58d]">Commands Action.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === cat
                  ? 'bg-[#6b705c] text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative glass-card rounded-[2rem] overflow-hidden flex flex-col h-full"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <Play className="text-white fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#cb997e] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {project.stats}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[#a5a58d] text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 flex-grow">{project.description}</p>

                  <button className="w-full flex items-center justify-between group/btn text-sm font-bold text-gray-300 hover:text-white transition-colors">
                    Watch Breakdown <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-[#cb997e]/10 to-transparent border border-[#cb997e]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#cb997e] flex items-center justify-center shadow-lg shadow-[#cb997e]/20">
              <TrendingUp className="text-white" size={32} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-white mb-1">Average Hook Rate: 42%</h3>
              <p className="text-gray-400">My videos stop the scroll and keep the attention.</p>
            </div>
          </div>
          <a href="#contact" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2">
            Get My Strategy <Filter size={18} />
          </a>
        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;