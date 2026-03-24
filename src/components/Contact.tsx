import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Connect
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Get In <span className="text-blue-500">Touch</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            {[
              { icon: <Mail size={28} />, title: "Email Us", info: ["support@intai.com", "partners@intai.com"] },
              { icon: <Phone size={28} />, title: "Call Us", info: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm"] },
              { icon: <MapPin size={28} />, title: "Visit Us", info: ["123 Innovation Drive", "Tech City, CA 94043"] }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 glass border border-white/5 rounded-[2.5rem] group hover:border-blue-500/30 transition-all duration-500 blue-glow"
              >
                <div className="flex items-start gap-8">
                  <div className="p-5 bg-black rounded-2xl text-blue-500 border border-white/5 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{item.title}</h4>
                    {item.info.map((line, j) => (
                      <p key={j} className="text-gray-400 font-medium text-lg">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-blue-500 rounded-[2.5rem] text-white shadow-[0_20px_40px_rgba(59,130,246,0.3)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <h4 className="font-black mb-8 uppercase tracking-widest text-xs relative z-10">Follow Our Journey</h4>
              <div className="flex gap-5 relative z-10">
                {[<Linkedin />, <Twitter />, <Instagram />, <Github />].map((icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.15, rotate: 8, y: -5 }}
                    href="#"
                    className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-20 glass border border-white/5 rounded-[4rem] relative overflow-hidden blue-glow"
            >
              <form className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-2">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-8 py-6 bg-black/50 border border-white/5 rounded-3xl text-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-700 text-lg focus:blue-glow"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-8 py-6 bg-black/50 border border-white/5 rounded-3xl text-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-700 text-lg focus:blue-glow"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-8 py-6 bg-black/50 border border-white/5 rounded-3xl text-white focus:border-blue-500 outline-none transition-all font-medium placeholder:text-gray-700 text-lg focus:blue-glow"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-2">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full px-8 py-6 bg-black/50 border border-white/5 rounded-3xl text-white focus:border-blue-500 outline-none transition-all resize-none font-medium placeholder:text-gray-700 text-lg focus:blue-glow"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-7 bg-blue-500 text-white font-black rounded-3xl hover:bg-blue-400 transition-all uppercase tracking-[0.3em] text-sm shadow-[0_15px_40px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
