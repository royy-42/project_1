import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Anjali Sharma',
    role: 'Software Engineer @ Google',
    image: 'https://picsum.photos/seed/anjali/100/100',
    quote: 'INT AI was a game-changer for me. The AI interviews helped me identify my weak spots, and the feedback was incredibly detailed. I landed my dream job within 2 months!'
  },
  {
    name: 'Rahul Verma',
    role: 'Frontend Developer @ Meta',
    image: 'https://picsum.photos/seed/rahul/100/100',
    quote: 'The human mock interviews felt so real. The mentors are industry experts who actually know what companies are looking for. Highly recommended for every fresher.'
  },
  {
    name: 'Priya Patel',
    role: 'Data Scientist @ Amazon',
    image: 'https://picsum.photos/seed/priya/100/100',
    quote: 'Being on the leaderboard got me direct interview calls from three top companies. I didnt even have to apply! This platform is revolutionary.'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Student <span className="text-blue-500">Success Stories</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 md:p-12 glass border border-white/5 rounded-[3rem] relative group hover:border-blue-500/30 transition-all duration-500 blue-glow"
            >
              <Quote className="text-blue-500/5 absolute top-10 right-10 group-hover:text-blue-500/10 transition-colors duration-500" size={80} />
              
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-[1.5rem] border-2 border-white/5 object-cover group-hover:border-blue-500/50 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)]"
                  >
                    <Star size={14} fill="currentColor" />
                  </motion.div>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{item.name}</h4>
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
              
              <p className="text-gray-400 font-medium leading-relaxed italic relative z-10 text-lg">
                "{item.quote}"
              </p>
              
              <div className="mt-10 pt-10 border-t border-white/5 flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-blue-500 fill-blue-500" />
                ))}
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-2">Verified Review</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
