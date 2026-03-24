import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, MapPin, CheckCircle2, Calendar, Clock, Phone, Mail, UserCircle } from 'lucide-react';

const interviewTypes = [
  {
    id: 'ai',
    title: 'AI Online Interview',
    icon: <Bot size={24} />,
    description: 'Automated technical and behavioral rounds with instant AI feedback.',
    details: 'Our AI system evaluates your technical skills, communication, and body language in real-time. Perfect for quick practice and skill assessment.',
    features: ['Instant Feedback', '24/7 Availability', 'Technical & Behavioral']
  },
  {
    id: 'human-online',
    title: 'Human Online Interview',
    icon: <User size={24} />,
    description: 'Live 1-on-1 session with an industry professional via video call.',
    details: 'Connect with experts from top tech companies. Get personalized feedback and industry insights to improve your performance.',
    features: ['Expert Mentors', 'Real-world Scenarios', 'Personalized Roadmap']
  },
  {
    id: 'human-offline',
    title: 'Human Offline Interview',
    icon: <MapPin size={24} />,
    description: 'In-person mock interview at one of our partner centers.',
    details: 'Experience the real pressure of an in-person interview. Visit our partner centers for a full professional mock interview experience.',
    features: ['In-person Experience', 'Professional Environment', 'Detailed Report']
  }
];

export default function Booking() {
  const [selectedType, setSelectedType] = useState('ai');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      interviewType: selectedType,
      date: formData.get('date'),
      timeSlot: formData.get('timeSlot')
    };

    try {
      const response = await fetch('/api/bookings', {
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

  const currentType = interviewTypes.find(t => t.id === selectedType);

  return (
    <section id="book" className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            Get Started
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Book Your <span className="text-blue-500">Interview</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Interview Types Selection */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 ml-2">Choose Type</h4>
            {interviewTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all duration-500 group relative overflow-hidden ${
                  selectedType === type.id
                    ? 'bg-blue-500 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`p-4 rounded-2xl transition-colors ${selectedType === type.id ? 'bg-black text-blue-500' : 'bg-white/5 text-white'}`}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-black uppercase tracking-tighter transition-colors ${selectedType === type.id ? 'text-black' : 'text-white'}`}>
                      {type.title}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 transition-colors ${selectedType === type.id ? 'text-black/60' : 'text-gray-500'}`}>
                      {type.id === 'ai' ? 'Automated' : 'Professional'}
                    </p>
                  </div>
                </div>
                {selectedType === type.id && (
                  <motion.div 
                    layoutId="active-bg"
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50"
                  />
                )}
              </motion.div>
            ))}

            {/* Type Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hidden lg:block"
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Details</h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
                  {currentType?.details}
                </p>
                <div className="space-y-3">
                  {currentType?.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden h-full blue-glow"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                      className="inline-flex items-center justify-center w-32 h-32 bg-blue-500/20 rounded-[2.5rem] mb-10"
                    >
                      <CheckCircle2 size={64} className="text-blue-500" />
                    </motion.div>
                    <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Booking Confirmed!</h3>
                    <p className="text-gray-400 mb-12 font-medium max-w-sm mx-auto">We've sent the details to your email. Get ready to shine in your {currentType?.title}!</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSuccess(false)}
                      className="px-12 py-5 bg-blue-500 text-white font-black rounded-2xl uppercase tracking-widest text-sm transition-all"
                    >
                      Book Another Session
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                          <UserCircle size={14} className="text-blue-500" />
                          Full Name
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                          <Phone size={14} className="text-blue-500" />
                          Phone Number
                        </label>
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        <Mail size={14} className="text-blue-500" />
                        Email Address
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium placeholder:text-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                          <Calendar size={14} className="text-blue-500" />
                          Preferred Date
                        </label>
                        <input
                          required
                          name="date"
                          type="date"
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                          <Clock size={14} className="text-blue-500" />
                          Time Slot
                        </label>
                        <select
                          required
                          name="timeSlot"
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all font-medium appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-zinc-900">Select a slot</option>
                          <option value="10:00 AM" className="bg-zinc-900">10:00 AM</option>
                          <option value="11:00 AM" className="bg-zinc-900">11:00 AM</option>
                          <option value="02:00 PM" className="bg-zinc-900">02:00 PM</option>
                          <option value="04:00 PM" className="bg-zinc-900">04:00 PM</option>
                          <option value="06:00 PM" className="bg-zinc-900">06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-6 bg-blue-500 text-white font-black rounded-2xl transition-all disabled:opacity-50 uppercase tracking-[0.3em] text-sm"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : 'Confirm Booking'}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
