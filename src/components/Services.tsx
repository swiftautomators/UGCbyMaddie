"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, MessageCircle, Clock, Video } from 'lucide-react';

const pricingPackages = [
  {
    name: "Conversion Starter",
    price: "$1,500",
    description: "Perfect for brands launching their first TikTok Shop campaign.",
    features: [
      "3 High-Aesthetic Hook Variations",
      "Raw Footage Access",
      "Data-Driven Scripting",
      "7-Day Delivery"
    ],
    recommended: false
  },
  {
    name: "Performance Pro",
    price: "$3,000",
    description: "The sweet spot for scaling DTC brands on Paid & Organic.",
    features: [
      "8 Custom Video Assets",
      "Full Funnel Strategy",
      "A/B Hook Testing",
      "Usage Rights Included",
      "Voiceover & Trendy Editing"
    ],
    recommended: true
  },
  {
    name: "Retainer Partner",
    price: "Custom",
    description: "Ongoing creative partnership for 7-figure powerhouses.",
    features: [
      "Unlimited Monthly Assets",
      "Real-time Strategy Pivot",
      "Competitor Ad Analysis",
      "Dedicated Slack Channel",
      "Monthly Performance Report"
    ],
    recommended: false
  }
];

const Services: React.FC = React.memo(() => {
  return (
    <section id="services" className="py-24 px-6 relative" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb997e]/10 border border-[#cb997e]/20 text-[#cb997e] text-xs font-bold uppercase tracking-wider mb-6">
            SERVICE BLUEPRINTS
          </div>
          <h2 id="services-heading" className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Simple Pricing, <br />Complex Results.</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No hidden fees. No basic content. Just performance-driven creative designed to scale your GMV.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`glass-card p-10 rounded-[2.5rem] relative flex flex-col ${pkg.recommended ? 'border-[#cb997e]/50 shadow-2xl shadow-[#cb997e]/5 z-10 scale-105' : 'border-white/5'}`}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#cb997e] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  {pkg.price !== "Custom" && <span className="text-gray-500 font-medium">/package</span>}
                </div>
                <p className="text-sm text-gray-400">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow" role="list">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={18} className="text-[#a5a58d] shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${pkg.recommended ? 'bg-[#6b705c] text-white hover:bg-[#a5a58d]' : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                Secure My Spot <ChevronRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-t border-white/5">
          <BenefitItem
            icon={<ShieldCheck className="text-[#a5a58d]" aria-hidden="true" />}
            title="Usage & Rights"
            description="All packages include full organic usage rights."
          />
          <BenefitItem
            icon={<Clock className="text-[#a5a58d]" aria-hidden="true" />}
            title="Rapid Turnaround"
            description="First drafts delivered within 7-10 business days."
          />
          <BenefitItem
            icon={<MessageCircle className="text-[#a5a58d]" aria-hidden="true" />}
            title="Direct Access"
            description="Work directly with me, not a junior account manager."
          />
          <BenefitItem
            icon={<Video className="text-[#a5a58d]" aria-hidden="true" />}
            title="HD Delivery"
            description="All assets delivered in 4K via Frame.io or Drive."
          />
        </div>
      </div>
    </section>
  );
});

const BenefitItem = React.memo(({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex gap-4">
    <div className="shrink-0">{icon}</div>
    <div>
      <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
));

Services.displayName = 'Services';
BenefitItem.displayName = 'BenefitItem';

export default Services;