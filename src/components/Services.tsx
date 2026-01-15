"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Layout, PlayCircle } from 'lucide-react';
import { ServicePackage } from '@/types';

const packages: ServicePackage[] = [
  {
    title: "The Starter Hook",
    price: "$1,500",
    features: ["3 High-Output Hooks", "Raw Footage Included", "1 Round of Revisions", "7-Day Delivery"]
  },
  {
    title: "Retention Retainer",
    price: "$3,500",
    features: ["8 Fully Edited Videos", "Script Writing", "Creator Sourcing", "Monthly Performance Audit"],
    recommended: true
  },
  {
    title: "The Scale Engine",
    price: "Custom",
    features: ["Unlimited Hooks", "Paid Ads Strategy", "Whitelist Rights", "24/7 Dedicated Support"]
  }
];

const Services: React.FC = React.memo(() => {
  return (
    <section id="services" className="py-24 px-6 relative" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 id="services-heading" className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Service Blueprints</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transparent pricing designed for brands ready to scale beyond the $100k/mo mark.
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
              className={`glass-card p-10 rounded-[2.5rem] relative ${pkg.recommended ? 'border-purple-500/50 shadow-2xl shadow-purple-500/10' : 'border-white/5'}`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest" aria-hidden="true">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-heading font-bold mb-2">{pkg.title}</h3>
              <div className="text-4xl font-heading font-black mb-8">{pkg.price}</div>

              <div className="space-y-4 mb-10">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex gap-3 text-sm text-gray-400">
                    <CheckCircle2 size={18} className="text-purple-400 shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${pkg.recommended ? 'bg-purple-600 hover:bg-purple-500' : 'bg-white/5 hover:bg-white/10'}`}
                aria-label={`Get started with ${pkg.title} package`}
              >
                Get Started <Zap size={18} aria-hidden="true" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 rounded-3xl border-emerald-500/20">
            <h4 className="flex items-center gap-3 text-xl font-bold mb-6">
              <Layout className="text-emerald-400" aria-hidden="true" /> Usage & Rights
            </h4>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>Standard packages include organic utilization rights for 12 months across all social platforms.</p>
              <p>Paid advertisement whitelisting and perpetual usage rights available via custom scale packages.</p>
            </div>
          </div>
          <div className="flex gap-4 p-8 glass-card rounded-3xl border-indigo-500/20">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <PlayCircle className="text-indigo-400" size={32} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Creative Velocity</h4>
              <p className="text-gray-400 text-sm">We provide rapid creative testing cycles ensure your ads never hit fatigue. New hooks delivered every 14 days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
