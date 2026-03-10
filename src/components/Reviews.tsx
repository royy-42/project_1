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
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Student <span className="text-emerald-500">Success Stories</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] relative group hover:border-emerald-500/30 transition-all duration-500"
            >
              <Quote className="text-emerald-500/10 absolute top-8 right-8 group-hover:text-emerald-500/20 transition-colors" size={64} />
              
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl border-2 border-white/5 object-cover group-hover:border-emerald-500/50 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-black">
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter">{item.name}</h4>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
              
              <p className="text-gray-400 font-medium leading-relaxed italic relative z-10">
                "{item.quote}"
              </p>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-emerald-500 fill-emerald-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
