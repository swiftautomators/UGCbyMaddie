"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const StrategyAI: React.FC = React.memo(() => {
  const [productInfo, setProductInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);

  const generateStrategy = async () => {
    if (!productInfo.trim()) return;
    setIsLoading(true);
    setStrategy(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-strategy', {
        body: { product: productInfo },
      });

      if (error) throw error;
      setStrategy(data.strategy);
    } catch (error) {
      console.error('Error generating strategy:', error);
      setStrategy('Failed to generate strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 px-6 relative" aria-labelledby="ai-heading">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-10 md:p-16 rounded-[3rem] border-[#6b705c]/20 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#cb997e]/10 rounded-full blur-[80px]" />

          <div className="relative z-10 text-center mb-12">
            <div className="w-16 h-16 bg-[#6b705c]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#a5a58d]">
              <Brain size={32} aria-hidden="true" />
            </div>
            <h2 id="ai-heading" className="text-3xl md:text-5xl font-heading font-black mb-6">
              AI Hook Architect
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Test my creative brain. Enter your product details, and my AI strategist will build a conversion-optimized hook for your brand.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={productInfo}
                onChange={(e) => setProductInfo(e.target.value)}
                placeholder="e.g., An eco-friendly protein powder for busy moms"
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#cb997e] focus:outline-none transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && generateStrategy()}
              />
              <button
                onClick={generateStrategy}
                disabled={isLoading || !productInfo.trim()}
                className="px-8 py-4 bg-[#6b705c] text-white font-bold rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                ) : (
                  <>
                    Build Strategy <Sparkles size={20} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {strategy && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative mt-8 p-8 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="absolute top-4 right-4 opacity-20">
                  <Brain size={48} />
                </div>
                <div className="flex items-center gap-2 text-[#cb997e] font-black text-xs uppercase tracking-widest mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#cb997e] animate-pulse" />
                  Generated Hook Strategy
                </div>
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap font-medium">
                  {strategy}
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-[#a5a58d] font-bold hover:text-white transition-colors"
                  >
                    Implement this with Maddie <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => { setStrategy(null); setProductInfo(''); }}
                    className="p-2 text-gray-500 hover:text-white transition-colors"
                    aria-label="Refresh and try another product"
                  >
                    <RefreshCw size={18} aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

StrategyAI.displayName = 'StrategyAI';

export default StrategyAI;