import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Image with Low Opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Tech Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase bg-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-md"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            The Future of Interview Prep
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9] uppercase">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Interviews</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-medium"
          >
            Free automated AI interviews, live professional sessions, and a direct path to top companies. 
            Empowering students to land their dream jobs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-10 py-5 bg-blue-500 text-white font-black rounded-2xl flex items-center gap-3 transition-all uppercase tracking-wider text-sm"
            >
              Book Your Interview
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 flex items-center gap-3 transition-all uppercase tracking-wider text-sm backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Play size={16} fill="white" className="ml-1" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto pt-12 border-t border-white/5"
        >
          {[
            { label: 'Interviews Done', value: '10K+' },
            { label: 'Students Placed', value: '2.5K+' },
            { label: 'Partner Companies', value: '150+' },
            { label: 'Success Rate', value: '94%' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (i * 0.1) }}
              className="text-center group"
            >
              <div className="text-4xl font-black text-white mb-2 group-hover:text-blue-500 transition-colors">{stat.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
