import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, CheckCircle, ArrowRight, Briefcase } from 'lucide-react';

const benefits = [
  'Access to pre-vetted top 1% candidates',
  'Detailed interview performance reports',
  'Reduce hiring time by up to 70%',
  'Direct connection with high-potential freshers',
  'Customized assessment rounds for your needs',
  'Zero cost for initial candidate discovery'
];

export default function Companies() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/company-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partners" className="py-32 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-black tracking-[0.3em] uppercase text-[10px]"
            >
              For Companies
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-black text-white mt-6 mb-8 leading-[0.9] uppercase tracking-tighter">
              Hire the Best <br />
              <span className="text-emerald-500">Without the Hassle</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              Stop sifting through thousands of resumes. Our platform provides you with a pre-vetted pool of top-performing candidates who have already proven their skills in rigorous interview simulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[10px]"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle className="text-emerald-500" size={14} />
                  </div>
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="p-10 md:p-12 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16" />
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/20 rounded-full mb-8">
                    <Building2 size={56} className="text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Request Received!</h3>
                  <p className="text-gray-400 mb-10 font-medium">Our partnership team will reach out to you within 24 hours.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-10 py-4 bg-emerald-500 text-black font-black rounded-full uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Company Name</label>
                      <div className="relative group">
                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                          required
                          name="companyName"
                          type="text"
                          placeholder="Acme Inc."
                          className="w-full pl-14 pr-6 py-5 bg-black border border-white/10 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Contact Person</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                          required
                          name="contactPerson"
                          type="text"
                          placeholder="Jane Smith"
                          className="w-full pl-14 pr-6 py-5 bg-black border border-white/10 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Work Email</label>
                    <div className="relative group">
                      <ArrowRight className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="jane@acme.com"
                        className="w-full pl-14 pr-6 py-5 bg-black border border-white/10 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Message (Optional)</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your hiring needs..."
                      className="w-full px-6 py-5 bg-black border border-white/10 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all resize-none font-medium"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-6 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Partner With Us'}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
