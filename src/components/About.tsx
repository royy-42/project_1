import { motion } from 'motion/react';
import { Target, Zap, Users, Shield, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Zap className="text-blue-500" size={32} />,
    title: 'AI-Powered Practice',
    description: 'Get instant feedback and performance metrics from our advanced AI interview system.'
  },
  {
    icon: <Users className="text-blue-500" size={32} />,
    title: 'Human Connection',
    description: 'Connect with industry professionals for live online or offline mock interviews.'
  },
  {
    icon: <Target className="text-blue-500" size={32} />,
    title: 'Direct Placement',
    description: 'Top performers are directly recommended to our network of partner companies.'
  },
  {
    icon: <Shield className="text-blue-500" size={32} />,
    title: 'Privacy First',
    description: 'Your data is secure. We only share performance metrics with companies you approve.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Our Mission
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mt-4 leading-tight uppercase tracking-tighter"
          >
            Bridging the Gap Between <br />
            <span className="text-blue-500">Talent and Opportunity</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 p-12 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden group hover:bg-white/[0.07] transition-colors duration-500"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <Zap size={40} className="text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">AI-Powered Practice</h3>
              <p className="text-gray-400 text-xl max-w-2xl leading-relaxed font-medium mb-10">
                Get instant feedback and performance metrics from our advanced AI interview system. 
                Our algorithms analyze your speech, content, and body language to provide actionable insights.
              </p>
              <div className="flex items-center gap-4 text-blue-500 font-black uppercase tracking-widest text-xs group-hover:gap-6 transition-all cursor-pointer">
                Explore AI Features <ArrowRight size={16} />
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-500" />
          </motion.div>

          {/* Side Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 p-12 bg-blue-500 rounded-[3rem] flex flex-col justify-between group relative overflow-hidden shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mb-10 group-hover:-rotate-12 transition-transform duration-500">
                <Users size={40} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-black mb-6 uppercase tracking-tighter">Human Connection</h3>
                <p className="text-black/80 font-bold leading-tight text-lg">
                  Connect with industry professionals for live online or offline mock interviews.
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-3xl" />
          </motion.div>

          {/* Side Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 p-12 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/[0.07] transition-colors duration-500"
          >
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
              <Target size={40} className="text-blue-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Direct Placement</h3>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Top performers are directly recommended to our network of partner companies.
            </p>
          </motion.div>

          {/* Bottom Feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 p-12 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 group hover:bg-white/[0.07] transition-colors duration-500"
          >
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                <Shield size={64} className="text-blue-500 relative z-10" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Privacy First</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
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
