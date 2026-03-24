import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Book', href: '#book' },
  { name: 'Leaderboard', href: '#leaderboard' },
  { name: 'Partners', href: '#partners' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Demo', href: '#demo' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  user: any;
  onViewChange: (view: 'landing' | 'dashboard') => void;
  currentView: 'landing' | 'dashboard';
}

export default function Navbar({ user, onViewChange, currentView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (currentView !== 'landing') {
      onViewChange('landing');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'bg-black/40 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.button
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
            onViewChange('landing');
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-black tracking-tighter text-white flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500">
            <span className="text-white text-[10px] font-black">INT</span>
          </div>
          <span className="uppercase">INT <span className="text-blue-500 group-hover:blue-glow transition-all duration-500">AI</span></span>
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          <div className="flex items-center space-x-8 px-8 py-3 glass border border-white/5 rounded-2xl">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-blue-500 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
          
          {user ? (
            <motion.button
              onClick={() => {
                if (location.pathname !== '/') navigate('/');
                onViewChange(currentView === 'landing' ? 'dashboard' : 'landing');
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 glass text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/10 blue-glow"
            >
              {currentView === 'landing' ? 'Dashboard' : 'Back to Home'}
            </motion.button>
          ) : (
            <Link to="/auth">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)", y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
              >
                Get Started
              </motion.button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2 bg-white/5 rounded-xl border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {user ? (
                <button 
                  onClick={() => {
                    if (location.pathname !== '/') navigate('/');
                    onViewChange(currentView === 'landing' ? 'dashboard' : 'landing');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-5 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-white/10"
                >
                  {currentView === 'landing' ? 'Go to Dashboard' : 'Back to Home'}
                </button>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full py-5 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
