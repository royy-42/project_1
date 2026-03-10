import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

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
  onOpenAuth: () => void;
  onViewChange: (view: 'landing' | 'dashboard') => void;
  currentView: 'landing' | 'dashboard';
}

export default function Navbar({ user, onOpenAuth, onViewChange, currentView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      onViewChange('landing');
      // Small delay to allow landing to render before scrolling
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.button
          onClick={() => onViewChange('landing')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter text-white"
        >
          INT <span className="text-emerald-500">AI</span>
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-sm font-medium text-gray-400 hover:text-emerald-500 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          
          {user ? (
            <motion.button
              onClick={() => onViewChange(currentView === 'landing' ? 'dashboard' : 'landing')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-2 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all transform hover:scale-105 border border-white/10"
            >
              {currentView === 'landing' ? 'Dashboard' : 'Back to Home'}
            </motion.button>
          ) : (
            <motion.button
              onClick={onOpenAuth}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-all transform hover:scale-105"
            >
              Get Started
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-xl font-medium text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {user ? (
                <button 
                  onClick={() => {
                    onViewChange(currentView === 'landing' ? 'dashboard' : 'landing');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-white/10 text-white font-bold rounded-xl border border-white/10"
                >
                  {currentView === 'landing' ? 'Go to Dashboard' : 'Back to Home'}
                </button>
              ) : (
                <button 
                  onClick={() => {
                    onOpenAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
