
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  Menu, 
  X,
  Target,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';

import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';
import Services from './components/Services';
import IntakeForm from './components/IntakeForm';
import StrategyAI from './components/StrategyAI';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Case Study', href: '#results' },
    { name: 'Services', href: '#services' },
    { name: 'Strategy AI', href: '#ai' },
    { name: 'Inquire', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl rotate-3 group-hover:rotate-0 transition-transform">
              M
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">UGC by Maddie</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-heading font-bold"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-4 bg-purple-600 text-white rounded-full font-bold"
            >
              Book Strategy Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main>
        <Hero />
        <Portfolio />
        <CaseStudy />
        <StrategyAI />
        <Services />
        <IntakeForm />
      </main>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">M</div>
              <span className="font-heading font-bold text-lg">UGC by Maddie</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Transforming brands into TikTok Shop powerhouses through high-aesthetic content that actually converts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Globe size={18} />
              </a>
              <a href="mailto:Maddie@UGCbyMaddie.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="md:text-right flex flex-col md:items-end justify-between">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Work with me</h4>
              <p className="text-gray-400">Ready to boost your direct-response ROI?</p>
              <a href="#contact" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300">
                Inquire Now <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-12 md:mt-0 text-sm text-gray-600">
              © {new Date().getFullYear()} UGC by Maddie. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
