
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, TrendingUp, DollarSign } from 'lucide-react';

const CaseStudy: React.FC = () => {
  return (
    <section id="results" className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            LIVE CASE STUDY
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-8 leading-tight">
            How I Generated <span className="text-emerald-400">$30,142</span> in TikTok Shop GMV in 30 Days.
          </h2>
          
          <div className="space-y-6 mb-10">
            <FeatureItem title="The Challenge" desc="Client had great products but 'Ad-fatigued' creatives resulting in high CPCs and zero organic lift." />
            <FeatureItem title="The Strategy" desc="Implemented a '3-Second Hook Rotation' combined with native TikTok Shop CTA overlays." />
            <FeatureItem title="The Execution" desc="Produced 12 high-aesthetic native clips focused on consideration stage comparison." />
          </div>

          <a href="#contact" className="inline-flex items-center gap-3 font-bold text-white group">
            See the exact content plan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative">
          <div className="absolute -top-4 -right-4 bg-emerald-500 text-black px-4 py-2 rounded-xl font-bold text-sm rotate-6 shadow-xl">
            ROI: 512%
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Sales (GMV)</div>
                <div className="text-4xl font-heading font-black text-emerald-400">$30,142.88</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1">
                  <TrendingUp size={16} /> +124%
                </div>
                <div className="text-xs text-gray-500">MoM Growth</div>
              </div>
            </div>

            <div className="h-48 w-full flex items-end gap-2">
              {[40, 55, 30, 80, 65, 95, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-400 rounded-t-lg transition-all hover:brightness-125" style={{ height: `${h}%` }} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-tighter">Hook Rate</div>
                <div className="text-xl font-heading font-bold">38.4%</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-tighter">Add To Cart</div>
                <div className="text-xl font-heading font-bold">12.1%</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-gray-400 text-sm italic">
              "Maddie’s content didn’t just look pretty—it fundamentally changed our bottom line. Our CPAs dropped by 40% in two weeks." — Marketing Lead at GlowTech
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <div className="w-5 h-5 rounded-full bg-purple-600/20 border border-purple-600/50 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
      </div>
    </div>
    <div>
      <div className="font-bold text-white mb-1">{title}</div>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default CaseStudy;
