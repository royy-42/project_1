import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Support
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                activeIndex === index ? 'bg-zinc-900 border-emerald-500/30' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left transition-colors"
              >
                <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${activeIndex === index ? 'text-emerald-500' : 'text-white'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${activeIndex === index ? 'bg-emerald-500 text-black rotate-180' : 'bg-white/5 text-gray-500'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 text-gray-400 leading-relaxed font-medium border-t border-white/5 pt-6">
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
