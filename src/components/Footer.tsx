import { motion } from 'motion/react';

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
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="#home" className="text-3xl font-bold tracking-tighter text-white mb-6 inline-block">
              INT <span className="text-emerald-500">AI</span>
            </a>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Empowering the next generation of talent through performance-based interview preparation and direct company connections.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors">
                <span className="text-xs font-bold">FB</span>
              </div>
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors">
                <span className="text-xs font-bold">TW</span>
              </div>
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors">
                <span className="text-xs font-bold">LI</span>
              </div>
              <div className="h-10 w-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-500 transition-colors">
                <span className="text-xs font-bold">IG</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} INT AI Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
