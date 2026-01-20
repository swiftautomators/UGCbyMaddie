
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const StrategyAI: React.FC = () => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<null | { hook: string, angle: string, why: string }>(null);

  const generateStrategy = async () => {
    if (!product.trim()) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as Maddie, a world-class performance UGC strategist. 
        A brand has approached you with this product: "${product}".
        Create a 3-part UGC strategy for a TikTok Shop video in JSON format.
        JSON keys: "hook" (A 3-second visual/audio hook), "angle" (The performance marketing angle), "why" (Brief explanation of why this will convert).`,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const data = JSON.parse(response.text || '{}');
      setStrategy(data);
    } catch (err) {
      console.error(err);
      // Fallback if API fails
      setStrategy({
        hook: "Show the product in use with a high-impact 'Wait, I didn't know it could do that' sound.",
        angle: "Utility-focused direct response with native TikTok UI overlays.",
        why: "Social proof combined with a pattern interrupt works best for low-ticket affiliate impulse buys."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="py-24 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-[2rem] border-purple-500/20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-4">
                <Sparkles size={14} /> AI Strategy Preview
              </div>
              <h2 className="text-3xl font-heading font-extrabold mb-4">Maddie's AI Brain</h2>
              <p className="text-gray-400 mb-8">
                Curious how I'd tackle your niche? Enter your product below to get an instant AI-powered performance hook and angle inspired by my $30K GMV framework.
              </p>
              
              <div className="relative group">
                <input 
                  type="text" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Electric Spin Scrubber for cleaning"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors group-hover:border-white/20"
                />
                <button 
                  onClick={generateStrategy}
                  disabled={loading}
                  className="absolute right-2 top-2 h-[calc(100%-1rem)] px-6 bg-purple-600 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} />}
                  Generate
                </button>
              </div>
            </div>

            <div className="w-full md:w-80 min-h-[300px] glass-card rounded-2xl p-6 bg-black/40 border-purple-500/10 relative flex flex-col items-center justify-center overflow-hidden">
               <AnimatePresence mode="wait">
                {!strategy && !loading && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="text-purple-400/50" />
                    </div>
                    <p className="text-sm text-gray-500 px-4">Enter your product to see the blueprint</p>
                  </motion.div>
                )}

                {loading && (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <Loader2 className="animate-spin text-purple-400 mb-4" size={32} />
                    <p className="text-xs text-purple-400 font-bold uppercase tracking-widest animate-pulse">Analyzing Funnel Stage...</p>
                  </motion.div>
                )}

                {strategy && !loading && (
                  <motion.div 
                    key="strategy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 w-full"
                  >
                    <div>
                      <div className="text-[10px] font-black text-purple-400 uppercase mb-1">Winning Hook</div>
                      <div className="text-sm font-medium text-white italic">"{strategy.hook}"</div>
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
};

export default StrategyAI;
