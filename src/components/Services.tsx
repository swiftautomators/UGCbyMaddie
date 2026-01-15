"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Layout, PlayCircle, ShieldCheck } from 'lucide-react';

const packages = [
  {
    title: "The Hook Factory",
    price: "$850",
    features: ["5 Performance-Tested Hooks", "Raw Footage + Text Overlays", "Direct-Response Angles", "3-Day Delivery", "Usage Rights: 30 Days"]
  },
  {
    title: "Ads Library Bundle",
    price: "$1,800",
    features: ["3 Full Edited UGC Clips", "9 Hook Variations (A/B Test)", "Competitor Research", "Scriptwriting Included", "Usage Rights: 90 Days", "Priority Support"],
    recommended: true
  },
  {
    title: "Scale Partner",
    price: "$3.5K/mo",
    features: ["10 Edited Clips Monthly", "Full Funnel Strategy", "Monthly ROI Review", "Unlimited Hook Reshoots", "Perpetual Usage Rights", "Direct Slack Access"]
  }
];

const Services: React.FC = React.memo(() => {
  return (
    <section id="services" className="py-24 px-6 relative" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            SERVICE BLUEPRINTS
          </div>
          <h2 id="services-heading" className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Packages Built for ROI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose a strategy that fits your current stage. All content is built using my high-aesthetic, direct-response framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card p-10 rounded-[2.5rem] relative flex flex-col ${pkg.recommended ? 'border-purple-500/50 shadow-2xl shadow-purple-500/10 z-10 scale-105' : 'border-white/5'}`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold mb-2">{pkg.title}</h3>
                <div className="text-4xl font-heading font-black mb-4">{pkg.price}</div>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex gap-3 text-sm text-gray-400">
                    <CheckCircle2 size={18} className="text-purple-400 shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${pkg.recommended ? 'bg-white text-black hover:bg-purple-50' : 'bg-white/5 text-white hover:bg-white/10'}`}
                aria-label={`Get started with ${pkg.title} package`}
              >
                Secure My Spot <Zap size={18} aria-hidden="true" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 rounded-3xl border-white/5">
            <h4 className="flex items-center gap-3 text-xl font-bold mb-6">
              <ShieldCheck className="text-purple-400" aria-hidden="true" /> Usage & Rights
            </h4>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>All deliverables include basic usage rights for 12 months across all social platforms.</p>
              <p>Paid advertisement whitelisting and perpetual usage rights are available via custom scale packages.</p>
            </div>
          </div>
          <div className="flex gap-4 p-8 glass-card rounded-3xl border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <PlayCircle className="text-indigo-400" size={32} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Creative Velocity</h4>
              <p className="text-gray-400 text-sm">We provide rapid creative testing cycles to ensure your ads never hit fatigue. New hooks delivered every 14 days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
