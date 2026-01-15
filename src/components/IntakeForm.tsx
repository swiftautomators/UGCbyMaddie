"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { submitInquiryAction } from '@/app/actions';

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  brandName: z.string().min(2, "Brand/Website name is required"),
  budget: z.enum(['$1500-$3000', '$3000-$5000', '>$5000'], {
    errorMap: () => ({ message: "Please select a budget tier" }),
  }),
  projectType: z.enum(['TikTok Shop', 'Paid Ads', 'Organic Growth'], {
    errorMap: () => ({ message: "Please select a project type" }),
  }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const IntakeForm: React.FC = React.memo(() => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: 'TikTok Shop'
    }
  });

  const selectedProjectType = watch('projectType');

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      await submitInquiryAction({
        email: data.email,
        project_type: data.projectType,
        budget_tier: data.budget,
        details: {
          name: data.name,
          brand_name: data.brandName,
          message: data.message
        }
      });
      setStatus('success');
      reset();
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center" aria-live="polite">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-[2.5rem] border-emerald-500/20"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold mb-4">Application Received!</h2>
          <p className="text-gray-400 mb-8">
            Thanks for reaching out! I&apos;ve received your brand details and will review your funnel strategy.
            Expect a response in your inbox within 24-48 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Submit Another
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            LET&apos;S WORK TOGETHER
          </div>
          <h2 id="contact-heading" className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Apply to the Roster</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            I only take on a limited number of clients monthly to ensure premium results. Tell me about your brand goals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8"
          aria-live="polite"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-400 ml-1">Full Name *</label>
            <input
              {...register('name')}
              id="name"
              placeholder="Maddie Thompson"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors`}
            />
            {errors.name && <p id="name-error" className="text-xs text-red-500 mt-1 ml-1" role="alert">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-bold text-gray-400 ml-1">Email Address *</label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="brand@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors`}
            />
            {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1 ml-1" role="alert">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="brandName" className="text-sm font-bold text-gray-400 ml-1">Brand/Website URL *</label>
            <input
              {...register('brandName')}
              id="brandName"
              placeholder="www.yourbrand.com"
              aria-invalid={errors.brandName ? "true" : "false"}
              aria-describedby={errors.brandName ? "brand-error" : undefined}
              className={`w-full bg-white/5 border ${errors.brandName ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors`}
            />
            {errors.brandName && <p id="brand-error" className="text-xs text-red-500 mt-1 ml-1" role="alert">{errors.brandName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-bold text-gray-400 ml-1">Budget Tier *</label>
            <select
              {...register('budget')}
              id="budget"
              aria-invalid={errors.budget ? "true" : "false"}
              aria-describedby={errors.budget ? "budget-error" : undefined}
              className={`w-full bg-white/5 border ${errors.budget ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors appearance-none`}
            >
              <option value="" className="bg-black">Select Tier</option>
              <option value="$1500-$3000" className="bg-black">$1,500 - $3,000</option>
              <option value="$3000-$5000" className="bg-black">$3,000 - $5,000</option>
              <option value=">$5000" className="bg-black">$5,000+</option>
            </select>
            {errors.budget && <p id="budget-error" className="text-xs text-red-500 mt-1 ml-1" role="alert">{errors.budget.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Primary Strategy *</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Select primary strategy">
              {['TikTok Shop', 'Paid Ads', 'Organic Growth'].map((type) => (
                <button
                  type="button"
                  key={type}
                  role="radio"
                  aria-checked={selectedProjectType === type}
                  onClick={() => setValue('projectType', type as any)}
                  className={`py-3 rounded-xl text-sm font-bold border transition-all ${selectedProjectType === type
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-gray-400 ml-1">Project Details</label>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              placeholder="Tell me about your current struggles or project requirements..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 max-w-[250px]">
              By clicking submit, you agree to receive follow-up emails regarding your inquiry.
            </div>
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto px-10 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-white/5 disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
                Send Application
              </button>
              {status === 'error' && <p className="text-xs text-red-500 mt-1" role="alert">{errorMessage}</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
});

IntakeForm.displayName = 'IntakeForm';

export default IntakeForm;
