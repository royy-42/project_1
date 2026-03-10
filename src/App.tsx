import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Booking from './components/Booking';
import Leaderboard from './components/Leaderboard';
import Companies from './components/Companies';
import Reviews from './components/Reviews';
import Demo from './components/Demo';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ThreeBackground from './components/ThreeBackground';
import AuthModal from './components/AuthModal';
import TrustedBy from './components/TrustedBy';
import Dashboard from './components/Dashboard';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('int_ai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('int_ai_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('int_ai_user');
    setView('landing');
  };

  return (
    <div className="relative bg-black text-white selection:bg-emerald-500 selection:text-black">
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleLogin}
      />

      {!loading && (
        <>
          <ThreeBackground />
          <Navbar 
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)} 
            onViewChange={setView}
            currentView={view}
          />
          <main>
            {view === 'landing' ? (
              <>
                <Hero />
                <TrustedBy />
                <About />
                <Booking />
                <Leaderboard />
                <Companies />
                <Reviews />
                <Demo />
                <FAQ />
                <Contact />
              </>
            ) : (
              <Dashboard user={user} onLogout={handleLogout} />
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
