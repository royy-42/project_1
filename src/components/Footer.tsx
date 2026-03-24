import { motion } from 'motion/react';
import { Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Book Interview', href: '#book' },
      { name: 'Leaderboard', href: '#leaderboard' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { name: 'For Companies', href: '#partners' },
      { name: 'Success Stories', href: '#reviews' },
      { name: 'Platform Demo', href: '#demo' },
      { name: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Contact Us', href: '#contact' },
    ],
  },
];

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black pt-32 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <motion.a 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              href="#home" 
              className="text-4xl font-black tracking-tighter text-white mb-8 inline-block uppercase"
            >
              INT <span className="text-blue-500">AI</span>
            </motion.a>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-sm mb-10 leading-relaxed text-lg"
            >
              Empowering the next generation of talent through performance-based interview preparation and direct company connections.
            </motion.p>
            <div className="flex items-center gap-5">
              {[
                { icon: Facebook, name: 'FB' },
                { icon: Twitter, name: 'TW' },
                { icon: Linkedin, name: 'LI' },
                { icon: Instagram, name: 'IG' },
                { icon: Github, name: 'GH' }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  href="#"
                  className="h-12 w-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-500 group"
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">{section.title}</h4>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium uppercase tracking-wider"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-xs font-medium uppercase tracking-widest"
          >
            © {new Date().getFullYear()} INT AI Platform. Engineered for Excellence.
          </motion.p>
          <div className="flex items-center gap-10">
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
