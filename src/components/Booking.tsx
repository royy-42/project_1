import { useState } from 'react';
import { motion } from 'motion/react';
import { Bot, User, MapPin, CheckCircle2 } from 'lucide-react';

const interviewTypes = [
  {
    id: 'ai',
    title: 'AI Online Interview',
    icon: <Bot size={24} />,
    description: 'Automated technical and behavioral rounds with instant AI feedback.',
    color: 'emerald'
  },
  {
    id: 'human-online',
    title: 'Human Online Interview',
    icon: <User size={24} />,
    description: 'Live 1-on-1 session with an industry professional via video call.',
    color: 'blue'
  },
  {
    id: 'human-offline',
    title: 'Human Offline Interview',
    icon: <MapPin size={24} />,
    description: 'In-person mock interview at one of our partner centers.',
    color: 'purple'
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

  return (
    <section id="book" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Get Started
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Book Your <span className="text-emerald-500">Interview</span>
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Interview Types */}
          <div className="lg:w-1/2 space-y-4">
            {interviewTypes.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-8 rounded-[2rem] border cursor-pointer transition-all duration-500 ${
                  selectedType === type.id
                    ? 'bg-emerald-500 text-black border-emerald-500'
                    : 'bg-zinc-900 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl ${selectedType === type.id ? 'bg-black text-emerald-500' : 'bg-white/5 text-white'}`}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black mb-2 uppercase tracking-tighter ${selectedType === type.id ? 'text-black' : 'text-white'}`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed ${selectedType === type.id ? 'text-black/70' : 'text-gray-500'}`}>
                      {type.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden h-full"
            >
              {isSuccess ? (
                <div className="text-center py-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/20 rounded-full mb-8"
                  >
                    <CheckCircle2 size={56} className="text-emerald-500" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Booking Confirmed!</h3>
                  <p className="text-gray-400 mb-10 font-medium">We've sent the details to your email. Get ready to shine!</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-10 py-4 bg-emerald-500 text-black font-black rounded-2xl uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Phone Number</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Preferred Date</label>
                      <input
                        required
                        name="date"
                        type="date"
                        className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Time Slot</label>
                      <select
                        required
                        name="timeSlot"
                        className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium appearance-none"
                      >
                        <option value="">Select a slot</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
