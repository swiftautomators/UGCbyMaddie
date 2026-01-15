"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Zap, AlertCircle } from 'lucide-react';
import { generateStrategyAction } from '@/app/actions';
import { useQuery } from '@tanstack/react-query';

const StrategyAI: React.FC = React.memo(() => {
  const [product, setProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: strategy, isLoading, error } = useQuery({
    queryKey: ['strategy', searchTerm],
    queryFn: async () => {
      // Let the exception propagate so useQuery sets an actual error state
      return await generateStrategyAction(searchTerm);
    },
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: false // Disable retries for AI generation to avoid multiple API calls on failure
  });

  const handleGenerate = () => {
    if (!product.trim()) return;
    setSearchTerm(product);
  };

  return (
    <section id="ai" className="py-24 px-6 bg-gradient-to-b from-transparent to-purple-900/10" aria-labelledby="ai-heading">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border-purple-500/20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-4">
                <Sparkles size={14} aria-hidden="true" /> AI Strategy Preview
              </div>
              <h2 id="ai-heading" className="text-3xl font-heading font-extrabold mb-4">Maddie&apos;s AI Brain</h2>
              <p className="text-gray-400 mb-8">
                Curious how I&apos;d tackle your niche? Enter your product below to get an instant AI-powered performance hook and angle inspired by my $30K GMV framework.
              </p>

              <div className="relative group">
                <input
                  type="text"
                  id="product-input"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Electric Spin Scrubber for cleaning"
                  aria-label="Enter your product niche"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors group-hover:border-white/20"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  aria-label="Generate AI strategy"
                  className="absolute right-2 top-2 h-[calc(100%-1rem)] px-6 bg-purple-600 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-500 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Zap size={18} aria-hidden="true" />}
                  Generate
                </button>
              </div>
            </div>

            <div
              className="w-full md:w-80 min-h-[300px] glass-card rounded-2xl p-6 bg-black/40 border-purple-500/10 relative flex flex-col items-center justify-center overflow-hidden"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {!strategy && !isLoading && !error && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="text-purple-400/50" aria-hidden="true" />
                    </div>
                    <p className="text-sm text-gray-500 px-4">Enter your product to see the blueprint</p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <Loader2 className="animate-spin text-purple-400 mb-4" size={32} aria-hidden="true" />
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-widest animate-pulse">Analyzing Funnel Stage...</p>
                  </motion.div>
                )}

                {error && !isLoading && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="text-red-400" size={24} aria-hidden="true" />
                    </div>
                    <p className="text-sm font-bold text-red-400 mb-2">Generation Failed</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {(error as any).message || "Could not connect to Maddie's AI brain. Please try again."}
                    </p>
                  </motion.div>
                )}

                {strategy && !isLoading && !error && (
                  <motion.div
                    key="strategy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 w-full"
                  >
                    {strategy.isFallback && (
                      <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md mb-2">
                        <p className="text-[10px] text-amber-400 font-bold uppercase">Dev Mode Enabled</p>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-black text-purple-400 uppercase mb-1">Winning Hook</div>
                      <div className="text-sm font-medium text-white italic">&ldquo;{strategy.hook}&rdquo;</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-purple-400 uppercase mb-1">Direct Angle</div>
                      <div className="text-sm font-medium text-white">{strategy.angle}</div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-[10px] font-black text-emerald-400 uppercase mb-1">Conversion Logic</div>
                      <div className="text-xs text-gray-400 leading-relaxed">{strategy.why}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

StrategyAI.displayName = 'StrategyAI';

export default StrategyAI;
