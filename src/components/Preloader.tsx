import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative flex flex-col items-center w-full max-w-md px-6">
        {/* Animated Logo Container */}
        <div className="relative mb-12">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-32 w-32 border-2 border-emerald-500/20 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-24 w-24 border-t-2 border-emerald-500 rounded-full"
            />
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-3xl font-black text-white tracking-tighter">
              INT <span className="text-emerald-500">AI</span>
            </span>
          </motion.div>
        </div>

        {/* Progress Section */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-end">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]"
            >
              Initializing Systems
            </motion.span>
            <span className="text-xl font-mono text-white tabular-nums">
              {progress}%
            </span>
          </div>
          
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
          </div>
          
          <div className="flex justify-between text-[8px] text-gray-500 font-mono uppercase tracking-widest">
            <span>Core_v2.0.4</span>
            <span>Secure_Connection_Established</span>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-emerald-500 rounded-full blur-[1px]"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
