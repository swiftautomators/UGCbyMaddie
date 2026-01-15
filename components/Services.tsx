
import React from 'react';
import { CheckCircle2, Zap, Calendar, FileVideo, ShieldCheck } from 'lucide-react';

const Services: React.FC = () => {
  const packages = [
    {
      title: "The Hook Factory",
      price: "$850",
      description: "Ideal for testing new angles without full production.",
      features: [
        "5 Performance-Tested Hooks",
        "Raw Footage + Text Overlays",
        "Direct-Response Angles",
        "3-Day Delivery",
        "Usage Rights: 30 Days"
      ]
    },
    {
      title: "Ads Library Bundle",
      price: "$1,800",
      description: "The complete toolkit for scaling TikTok Shop campaigns.",
      recommended: true,
      features: [
        "3 Full Edited UGC Clips",
        "9 Hook Variations (A/B Test)",
        "Competitor Research",
        "Scriptwriting Included",
        "Usage Rights: 90 Days",
        "Priority Support"
      ]
    },
    {
      title: "Scale Partner",
      price: "$3.5K/mo",
      description: "A monthly retainer for brands ready for 7-figures.",
      features: [
        "10 Edited Clips Monthly",
        "Full Funnel Strategy",
        "Monthly ROI Review",
        "Unlimited Hook Reshoots",
        "Perpetual Usage Rights",
        "Direct Slack Access"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-extrabold mb-4">Packages Built for ROI</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose a strategy that fits your current stage. All content is built using my high-aesthetic, direct-response framework.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div 
            key={i} 
            className={`relative glass-card p-8 rounded-[2.5rem] flex flex-col ${
              pkg.recommended ? 'border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/10 z-10' : ''
            }`}
          >
            {pkg.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold mb-2">{pkg.title}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black">{pkg.price}</span>
                {pkg.price.includes('/') ? '' : <span className="text-gray-500 text-sm font-medium">Starting</span>}
              </div>
              <p className="text-sm text-gray-500">{pkg.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {pkg.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-purple-500 shrink-0" />
                  {feat}
                </div>
              ))}
            </div>

            <a 
              href="#contact" 
              className={`w-full py-4 rounded-2xl font-bold transition-all text-center ${
                pkg.recommended ? 'bg-white text-black hover:bg-purple-50' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Secure My Spot
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 glass-card p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Usage Rights & Policy</h4>
            <p className="text-gray-400 text-sm max-w-lg">
              All deliverables include basic usage rights. Whitelisting and Perpetual rights are available as add-ons to ensure your brand is fully covered across Meta and TikTok ads.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Questions?</div>
            <div className="text-sm font-bold">Maddie@UGCbyMaddie.com</div>
          </div>
          <a href="mailto:Maddie@UGCbyMaddie.com" className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
            <Calendar />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
