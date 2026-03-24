import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
             transformOrigin: 'top'
           }} 
      />

      <div className="relative flex flex-col items-center">
        {/* Animated 3D Logo Container */}
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateX: [0, 10, 0, -10, 0],
          }}
          transition={{ 
            rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-32 h-32 mb-12"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute inset-0 border-4 border-blue-500/50 rounded-2xl flex items-center justify-center transform-gpu">
            <span className="text-4xl font-black text-white tracking-tighter">INT <span className="text-blue-500">AI</span></span>
          </div>
          
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-20, 20, -20],
                x: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{ 
                duration: 2 + i,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-center gap-2">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500"
          >
            {progress}% Loading Neural Core
          </motion.span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
    </motion.div>
  );
}
