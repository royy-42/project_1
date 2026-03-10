import { motion } from 'motion/react';
import { Play, Video, Image as ImageIcon } from 'lucide-react';

const demoItems = [
  {
    title: 'AI Interview Session',
    type: 'video',
    image: 'https://picsum.photos/seed/ai-demo/800/450',
    description: 'Watch how our AI interacts with students in real-time.'
  },
  {
    title: 'Live Mentor Feedback',
    type: 'image',
    image: 'https://picsum.photos/seed/mentor-demo/800/450',
    description: 'Mentors providing detailed performance analysis.'
  },
  {
    title: 'Offline Center Experience',
    type: 'image',
    image: 'https://picsum.photos/seed/center-demo/800/450',
    description: 'Students attending mock interviews at our partner centers.'
  }
];

export default function Demo() {
  return (
    <section id="demo" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Showcase
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Experience the <span className="text-emerald-500">Platform</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden m-4 rounded-[1.5rem]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                  >
                    {item.type === 'video' ? <Play size={40} fill="black" /> : <ImageIcon size={40} />}
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl flex items-center gap-2 border border-white/10">
                  {item.type === 'video' ? <Video size={16} className="text-emerald-500" /> : <ImageIcon size={16} className="text-emerald-500" />}
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.type}</span>
                </div>
              </div>
              <div className="p-8 pt-4">
                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
