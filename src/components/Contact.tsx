import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Connect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Get In <span className="text-emerald-500">Touch</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-6">
            {[
              { icon: <Mail size={24} />, title: "Email Us", info: ["support@intai.com", "partners@intai.com"] },
              { icon: <Phone size={24} />, title: "Call Us", info: ["+1 (555) 123-4567", "Mon-Fri, 9am-6pm"] },
              { icon: <MapPin size={24} />, title: "Visit Us", info: ["123 Innovation Drive", "Tech City, CA 94043"] }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-zinc-900 border border-white/5 rounded-[2rem] group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-black rounded-2xl text-emerald-500 border border-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{item.title}</h4>
                    {item.info.map((line, j) => (
                      <p key={j} className="text-gray-500 font-medium">{line}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 bg-emerald-500 rounded-[2rem] text-black"
            >
              <h4 className="font-black mb-6 uppercase tracking-widest text-xs">Follow Our Journey</h4>
              <div className="flex gap-4">
                {[<Linkedin />, <Twitter />, <Instagram />, <Github />].map((icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href="#"
                    className="w-12 h-12 flex items-center justify-center bg-black/10 rounded-xl hover:bg-black/20 transition-all"
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
              className="p-10 md:p-16 bg-zinc-900 border border-white/5 rounded-[3rem] relative overflow-hidden"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full px-6 py-5 bg-black border border-white/5 rounded-2xl text-white focus:border-emerald-500 outline-none transition-all resize-none font-medium placeholder:text-gray-700"
                  />
                </div>
                <button className="w-full py-6 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
