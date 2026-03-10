import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star } from 'lucide-react';

interface Student {
  name: string;
  skills: string;
  score: number;
  ranking: number;
}

export default function Leaderboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" size={32} />;
      case 2: return <Medal className="text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.5)]" size={32} />;
      case 3: return <Medal className="text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.5)]" size={32} />;
      default: return <span className="text-gray-500 font-black text-xl">{rank}</span>;
    }
  };

  return (
    <section id="leaderboard" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            Rankings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter"
          >
            Top <span className="text-emerald-500">Performers</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-8 rounded-[2rem] border flex flex-col md:flex-row items-center justify-between transition-all duration-500 group ${
                    index < 3 
                      ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/50' 
                      : 'bg-zinc-900 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="w-16 h-16 flex items-center justify-center bg-black/50 rounded-2xl border border-white/5">
                      {getRankIcon(student.ranking)}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-black text-white group-hover:text-emerald-500 transition-colors uppercase tracking-tighter">
                        {student.name}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                        {student.skills.split(',').map(skill => (
                          <span key={skill} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-gray-500 rounded-full border border-white/5">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12 mt-8 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                    <div className="text-center md:text-right">
                      <div className="text-4xl font-black text-white flex items-center gap-2 justify-center md:justify-end">
                        {student.score}
                        <Star size={20} className="text-emerald-500 fill-emerald-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mt-1">Interview Score</div>
                    </div>
                    
                    <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                    
                    <button className="px-6 py-3 bg-white/5 text-white font-black rounded-xl border border-white/10 text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all">
                      View Profile
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
