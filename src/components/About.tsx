import { motion } from 'motion/react';
import { Target, Zap, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-emerald-500" size={32} />,
    title: 'AI-Powered Practice',
    description: 'Get instant feedback and performance metrics from our advanced AI interview system.'
  },
  {
    icon: <Users className="text-emerald-500" size={32} />,
    title: 'Human Connection',
    description: 'Connect with industry professionals for live online or offline mock interviews.'
  },
  {
    icon: <Target className="text-emerald-500" size={32} />,
    title: 'Direct Placement',
    description: 'Top performers are directly recommended to our network of partner companies.'
  },
  {
    icon: <Shield className="text-emerald-500" size={32} />,
    title: 'Privacy First',
    description: 'Your data is secure. We only share performance metrics with companies you approve.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Our Mission
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mt-4 leading-tight uppercase tracking-tighter"
          >
            Bridging the Gap Between <br />
            <span className="text-emerald-500">Talent and Opportunity</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500">
                <Zap size={32} className="text-black" />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">AI-Powered Practice</h3>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed font-medium">
                Get instant feedback and performance metrics from our advanced AI interview system. 
                Our algorithms analyze your speech, content, and body language to provide actionable insights.
              </p>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px]" />
          </motion.div>

          {/* Side Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 p-10 bg-emerald-500 rounded-[2.5rem] flex flex-col justify-between group"
          >
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-12 transition-transform duration-500">
              <Users size={32} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter">Human Connection</h3>
              <p className="text-black/70 font-bold leading-tight">
                Connect with industry professionals for live online or offline mock interviews.
              </p>
            </div>
          </motion.div>

          {/* Side Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] group"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Target size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Direct Placement</h3>
            <p className="text-gray-500 font-medium">
              Top performers are directly recommended to our network of partner companies.
            </p>
          </motion.div>

          {/* Bottom Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 p-10 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 group"
          >
            <div className="w-full md:w-1/3">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Shield size={40} className="text-emerald-500" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Privacy First</h3>
              <p className="text-gray-500 font-medium">
                Your data is secure. We only share performance metrics with companies you approve. 
                We believe in ethical AI and data sovereignty.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
