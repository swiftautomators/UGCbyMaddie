"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

const FeatureItem = React.memo(({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#cb997e]/30 transition-colors group">
    <div className="w-12 h-12 rounded-xl bg-[#cb997e]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
      <Icon className="text-[#cb997e]" size={24} aria-hidden="true" />
    </div>
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
));
FeatureItem.displayName = 'FeatureItem';

const CaseStudy: React.FC = React.memo(() => {
  return (
    <section id="results" className="py-24 px-6 relative overflow-hidden" aria-labelledby="results-heading">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a5a58d]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a5a58d]/10 border border-[#a5a58d]/20 text-[#a5a58d] text-xs font-bold uppercase tracking-wider mb-6">
              Case Study: $30K GMV in 21 Days
            </div>
            <h2 id="results-heading" className="text-4xl md:text-6xl font-heading font-extrabold mb-8 leading-tight">
              Scaling a Pet Brand <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cb997e] to-[#a5a58d]">Through UGC Strategy</span>
            </h2>

            <div className="space-y-4 mb-10">
              <FeatureItem
                icon={TrendingUp}
                title="Conversion Optimization"
                description="Redesigned the first 3 seconds of all creative to exploit 'Pattern Interrupt' hooks."
              />
              <FeatureItem
                icon={Users}
                title="Creator Selection"
                description="Hand-picked creators based on brand-affinity data rather than just follower counts."
              />
              <FeatureItem
                icon={Target}
                title="Direct Response Hooks"
                description="Implemented a 3-part funnel: Awareness (Hook), Education (Body), Conversion (CTA)."
              />
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-lg font-bold text-white hover:text-[#cb997e] transition-colors group"
              aria-label="View the exact content plan for this case study"
            >
              See the exact content plan <ArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-[2.5rem] border-white/10 overflow-hidden">
              <div className="flex justify-between items-end mb-12">
                <div role="region" aria-label="Key Performance Indicators chart">
                  <p className="text-gray-400 text-sm font-medium mb-1">Total GMV Generated</p>
                  <p className="text-4xl font-heading font-black text-white">$31,248.50</p>
                </div>
                <div className="text-right">
                  <p className="text-[#a5a58d] text-sm font-bold flex items-center justify-end gap-1">
                    <TrendingUp size={16} aria-hidden="true" /> +412%
                  </p>
                  <p className="text-gray-500 text-xs">vs Previous Month</p>
                </div>
              </div>

              <div className="h-48 flex items-end gap-3 mb-8" role="img" aria-label="Bar chart showing growth over time">
                {[40, 65, 45, 90, 70, 100, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className={`flex-1 rounded-t-lg ${i === 5 ? 'bg-gradient-to-t from-[#6b705c] to-[#cb997e]' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              <blockquote className="p-6 rounded-2xl bg-white/5 border-l-4 border-[#6b705c] italic text-gray-300">
                &ldquo;I couldn&apos;t believe the speed of results. Maddie helped us scale from $2k to $30k GMV in just 21 days with 3 key videos.&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

CaseStudy.displayName = 'CaseStudy';

export default CaseStudy;
