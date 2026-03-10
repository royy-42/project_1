import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, LogOut, Briefcase, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl sticky top-24"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black font-bold text-2xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl font-bold">
                  <User size={20} />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl font-bold transition-all">
                  <Briefcase size={20} />
                  My Interviews
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-xl font-bold transition-all">
                  <Award size={20} />
                  Certifications
                </button>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl font-bold transition-all"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Interviews</p>
                <p className="text-3xl font-bold text-white">{bookings.length}</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Avg. Score</p>
                <p className="text-3xl font-bold text-white">--</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Rank</p>
                <p className="text-3xl font-bold text-white">--</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Upcoming Interviews</h3>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 bg-black border border-white/5 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-6">
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white capitalize">
                            {booking.interview_type.replace('-', ' ')}
                          </h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar size={14} />
                              {booking.date}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock size={14} />
                              {booking.time_slot}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                          booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                  <p className="text-gray-500 mb-4">No interviews scheduled yet.</p>
                  <button 
                    onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-emerald-500 font-bold hover:underline"
                  >
                    Book your first interview
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
