
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const IntakeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandName: '',
    budget: '',
    goal: 'awareness',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.brandName) {
      alert("Please fill in all required fields.");
      return;
    }

    setStatus('loading');
    
    // Simulate Supabase API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submission saved to Supabase:', formData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-[2.5rem] border-emerald-500/20"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold mb-4">Application Received!</h2>
          <p className="text-gray-400 mb-8">
            Thanks for reaching out! I've received your brand details and will review your funnel strategy. 
            Expect a response in your inbox within 24-48 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 bg-white text-black font-bold rounded-xl"
          >
            Submit Another
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
            LET'S WORK TOGETHER
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Apply to the Roster</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            I only take on a limited number of clients monthly to ensure premium results. Tell me about your brand goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Full Name *</label>
            <input 
              required
              type="text" 
              placeholder="Maddie Thompson"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Email Address *</label>
            <input 
              required
              type="email" 
              placeholder="brand@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Brand/Website URL *</label>
            <input 
              required
              type="text" 
              placeholder="www.yourbrand.com"
              value={formData.brandName}
              onChange={(e) => setFormData({...formData, brandName: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Budget Tier</label>
            <select 
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors appearance-none"
            >
              <option value="" disabled className="bg-black">Select Tier</option>
              <option value="under-2k" className="bg-black">$1,000 - $2,000</option>
              <option value="2k-5k" className="bg-black">$2,000 - $5,000</option>
              <option value="5k-plus" className="bg-black">$5,000+</option>
              <option value="retainer" className="bg-black">Monthly Retainer</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Primary Goal</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Awareness', 'Traffic', 'Conversions', 'TikTok Shop'].map((goal) => (
                <button
                  type="button"
                  key={goal}
                  onClick={() => setFormData({...formData, goal: goal.toLowerCase()})}
                  className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                    formData.goal === goal.toLowerCase() 
                      ? 'bg-purple-600 border-purple-500 text-white' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-gray-400 ml-1">Project Details</label>
            <textarea 
              rows={4}
              placeholder="Tell me about your current struggles or project requirements..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-xs text-gray-500 max-w-[250px]">
              By clicking submit, you agree to receive follow-up emails regarding your inquiry.
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-white/5 disabled:opacity-50"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              Send Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default IntakeForm;
