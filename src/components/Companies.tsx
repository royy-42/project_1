import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, CheckCircle, ArrowRight, Briefcase, Mail, User } from 'lucide-react';

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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.3em] uppercase text-[10px] mb-6"
            >
              For Companies
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mt-6 mb-8 leading-[0.9] uppercase tracking-tighter">
              Hire the Best <br />
              <span className="text-blue-500">Without the Hassle</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium max-w-xl">
              Stop sifting through thousands of resumes. Our platform provides you with a pre-vetted pool of top-performing candidates who have already proven their skills in rigorous interview simulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-[10px] group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <CheckCircle className="text-blue-500 group-hover:text-white" size={16} />
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
            <div className="glass rounded-[3.5rem] p-10 md:p-14 relative overflow-hidden blue-glow">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl -mr-20 -mt-20" />
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-16"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="inline-flex items-center justify-center w-32 h-32 bg-blue-500/20 rounded-[2.5rem] mb-10"
                    >
                      <Building2 size={64} className="text-blue-500" />
                    </motion.div>
                    <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Request Received!</h3>
                    <p className="text-gray-400 mb-12 font-medium text-lg">Our partnership team will reach out to you within 24 hours.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSuccess(false)}
                      className="px-12 py-5 bg-blue-500 text-white font-black rounded-2xl uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
                    >
                      Submit Another Request
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
                          <Building2 size={14} className="text-blue-500" />
                          Company Name
                        </label>
                        <input
                          required
                          name="companyName"
                          type="text"
                          placeholder="Acme Inc."
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
                          <User size={14} className="text-blue-500" />
                          Contact Person
                        </label>
                        <input
                          required
                          name="contactPerson"
                          type="text"
                          placeholder="Jane Smith"
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
                        <Mail size={14} className="text-blue-500" />
                        Work Email
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="jane@acme.com"
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">
                        <Briefcase size={14} className="text-blue-500" />
                        Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your hiring needs..."
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all resize-none font-medium placeholder:text-gray-700"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-6 bg-blue-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-50 uppercase tracking-[0.3em] text-sm"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        <>
                          Partner With Us
                          <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
