import { motion } from 'motion/react';
import { Play, Video, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

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
    <section id="demo" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Showcase
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Experience the <span className="text-blue-500">Platform</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {demoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[3rem] glass border border-white/5 hover:border-blue-500/30 transition-all duration-500 blue-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[2rem]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-blue-500 text-white rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  >
                    {item.type === 'video' ? <Play size={40} fill="white" /> : <ArrowUpRight size={40} />}
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl flex items-center gap-2 border border-white/10">
                  {item.type === 'video' ? <Video size={16} className="text-blue-500" /> : <ImageIcon size={16} className="text-blue-500" />}
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.type}</span>
                </div>
              </div>
              <div className="p-10 pt-4">
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-blue-500 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
