import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Is the platform really free for students?',
    answer: 'Yes, absolutely! All interview simulations (AI, Online, and Offline) are completely free for students and freshers. Our mission is to help you prepare without any financial burden.'
  },
  {
    question: 'How does the AI interview work?',
    answer: 'Our AI system uses advanced natural language processing to ask technical and behavioral questions based on your skills. It analyzes your responses, tone, and confidence to provide instant feedback.'
  },
  {
    question: 'How can I get on the leaderboard?',
    answer: 'The leaderboard is based on your performance in the interview simulations. High scores in technical accuracy, communication, and problem-solving will boost your ranking.'
  },
  {
    question: 'Do companies really hire through this platform?',
    answer: 'Yes! We partner with numerous companies who use our leaderboard to find top-tier talent. High-ranking students are directly recommended to these companies for actual job interviews.'
  },
  {
    question: 'Can I book multiple interviews?',
    answer: 'Yes, you can book multiple sessions to practice different skills or formats. However, we recommend giving yourself time to implement the feedback between sessions.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Support
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Frequently Asked <span className="text-blue-500">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-[2.5rem] overflow-hidden transition-all duration-500 glass border ${
                activeIndex === index ? 'border-blue-500/30 blue-glow' : 'border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-8 md:p-10 flex items-center justify-between text-left transition-colors"
              >
                <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors duration-300 ${activeIndex === index ? 'text-blue-500' : 'text-white'}`}>
                  {faq.question}
                </span>
                <motion.div 
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-500'}`}
                >
                  {activeIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-10 pb-10 text-gray-400 leading-relaxed font-medium border-t border-white/5 pt-8 text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
