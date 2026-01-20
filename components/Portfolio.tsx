
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Target, MessageSquare, ShoppingBag } from 'lucide-react';
import { FunnelStage, PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<FunnelStage | 'All'>('All');

  const items: PortfolioItem[] = [
    {
      id: '1',
      title: 'Derm-Recommended Skincare Hook',
      stage: FunnelStage.AWARENESS,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=11',
      results: '1.2M Views'
    },
    {
      id: '2',
      title: 'TikTok Shop Showcase - Tech Gadget',
      stage: FunnelStage.TRANSACTION,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=12',
      results: '$12K GMV'
    },
    {
      id: '3',
      title: 'Problem/Solution Kitchen Hack',
      stage: FunnelStage.CONSIDERATION,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=13',
      results: '30% CTR'
    },
    {
      id: '4',
      title: 'Wellness Morning Routine Vibe',
      stage: FunnelStage.AWARENESS,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=14',
      results: '200K Shares'
    },
    {
      id: '5',
      title: 'Flash Sale Urgent CTA',
      stage: FunnelStage.TRANSACTION,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=15',
      results: '8.2x ROAS'
    },
    {
      id: '6',
      title: 'Product Comparison (A/B Test)',
      stage: FunnelStage.CONSIDERATION,
      videoUrl: '#',
      thumbnail: 'https://picsum.photos/600/800?random=16',
      results: '15% CVR'
    },
  ];

  const filteredItems = filter === 'All' ? items : items.filter(i => i.stage === filter);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-heading font-extrabold mb-4">The Performance Library</h2>
          <p className="text-gray-400 max-w-xl">
            Sorted by funnel stage to show you exactly how my content moves customers from "What's this?" to "Buy Now."
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
          {['All', ...Object.values(FunnelStage)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === cat ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card cursor-pointer"
            >
              <img 
                src={item.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1 bg-black/40 backdrop-blur-sm ${
                  item.stage === FunnelStage.AWARENESS ? 'border-indigo-500/50 text-indigo-300' :
                  item.stage === FunnelStage.CONSIDERATION ? 'border-purple-500/50 text-purple-300' :
                  'border-emerald-500/50 text-emerald-300'
                }`}>
                  {item.stage === FunnelStage.AWARENESS && <Target size={12} />}
                  {item.stage === FunnelStage.CONSIDERATION && <MessageSquare size={12} />}
                  {item.stage === FunnelStage.TRANSACTION && <ShoppingBag size={12} />}
                  {item.stage}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xl font-heading font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform">{item.title}</div>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                  <div className="text-sm text-emerald-400 font-bold flex items-center gap-1">
                    <Play size={14} className="fill-current" /> {item.results}
                  </div>
                  <div className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <ExternalLink size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
