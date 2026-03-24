import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, LogOut, Briefcase, Award, ChevronRight, Star } from 'lucide-react';

interface Booking {
  id: number;
  interview_type: string;
  date: string;
  time_slot: string;
  status: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface DashboardProps {
  user: UserData;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/user-bookings?email=${user.email}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, [user.email]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 glass border border-white/5 rounded-[3rem] sticky top-32 blue-glow"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="relative group">
                  <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-[0_10px_30px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500">
                    {user.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black border-2 border-blue-500 rounded-xl flex items-center justify-center text-blue-500">
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{user.name}</h2>
                  <p className="text-blue-500/60 text-xs font-black uppercase tracking-widest mt-1">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-3">
                {[
                  { icon: User, label: 'Profile', active: true },
                  { icon: Briefcase, label: 'My Interviews', active: false },
                  { icon: Award, label: 'Certifications', active: false },
                ].map((item, i) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 group ${
                      item.active 
                        ? 'bg-blue-500 text-white shadow-[0_10px_20px_rgba(59,130,246,0.2)]' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={18} />
                      {item.label}
                    </div>
                    <ChevronRight size={14} className={`group-hover:translate-x-1 transition-transform ${item.active ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
                
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-transparent hover:border-red-500/20"
                  >
                    <LogOut size={18} />
                    Logout Account
                  </button>
                </div>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { label: 'Interviews', value: bookings.length, icon: Briefcase },
                { label: 'Avg. Score', value: '--', icon: Star },
                { label: 'Rank', value: '--', icon: Award },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 glass border border-white/5 rounded-[2.5rem] group hover:border-blue-500/30 transition-all duration-500 blue-glow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                    <stat.icon size={16} className="text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-10 md:p-12 glass border border-white/5 rounded-[3.5rem] blue-glow"
            >
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Upcoming <span className="text-blue-500">Interviews</span></h3>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">
                  <Calendar size={20} />
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                  <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-widest animate-pulse">Syncing Data...</p>
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking, idx) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-blue-500/20 transition-all duration-500"
                    >
                      <div className="flex items-center gap-8">
                        <div className="p-5 bg-blue-500/10 text-blue-500 rounded-[1.5rem] group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                          <Calendar size={28} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-white capitalize tracking-tighter mb-2">
                            {booking.interview_type.replace('-', ' ')}
                          </h4>
                          <div className="flex items-center gap-6">
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                              <Calendar size={14} className="text-blue-500" />
                              {booking.date}
                            </span>
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                              <Clock size={14} className="text-blue-500" />
                              {booking.time_slot}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                          booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                        }`}>
                          {booking.status}
                        </span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500 transition-all duration-500"
                        >
                          <ChevronRight size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] group hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-gray-600 mx-auto mb-6 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500">
                    <Briefcase size={32} />
                  </div>
                  <p className="text-gray-500 font-black uppercase tracking-widest text-xs mb-6">No interviews scheduled yet.</p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-5 bg-blue-500 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
                  >
                    Book your first interview
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
