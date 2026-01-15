"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import CaseStudy from '@/components/CaseStudy';
import Services from '@/components/Services';
import { Globe, Mail, ArrowRight } from 'lucide-react';

// Lazy load non-critical sections for performance
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
    loading: () => <div className="h-96 flex items-center justify-center bg-black/5 rounded-3xl animate-pulse">Loading Portfolio...</div>
});

const StrategyAI = dynamic(() => import('@/components/StrategyAI'), {
    loading: () => <div className="h-96 flex items-center justify-center bg-black/5 rounded-3xl animate-pulse">Loading AI Strategist...</div>
});

const IntakeForm = dynamic(() => import('@/components/IntakeForm'), {
    loading: () => <div className="h-96 flex items-center justify-center bg-black/5 rounded-3xl animate-pulse">Loading Application...</div>
});

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
            {/* Critical Path: LCP Priority */}
            <Hero />

            <div className="space-y-0">
                {/* Data Proof */}
                <CaseStudy />

                {/* Secondary: Service Packages */}
                <Services />

                {/* Interactive: AI Preview (Lazy) */}
                <Suspense fallback={<div className="h-96" />}>
                    <StrategyAI />
                </Suspense>

                {/* Heavy: Portfolio Grid (Lazy) */}
                <Suspense fallback={<div className="h-96" />}>
                    <Portfolio />
                </Suspense>

                {/* Conversion: Intake Form (Lazy) */}
                <Suspense fallback={<div className="h-96" />}>
                    <IntakeForm />
                </Suspense>
            </div>

            {/* Premium Footer */}
            <footer className="py-20 px-6 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">M</div>
                            <span className="font-heading font-bold text-lg">UGC by Maddie</span>
                        </div>
                        <p className="text-gray-400 max-w-sm mb-8">
                            Transforming brands into TikTok Shop powerhouses through high-aesthetic content that actually converts.
                        </p>
                        <div className="flex gap-4">
                            <a href="/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors" aria-label="Back to home">
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
                        <div className="mt-12 text-xs text-gray-600">
                            © {new Date().getFullYear()} UGC by Maddie. Built for Performance.
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
