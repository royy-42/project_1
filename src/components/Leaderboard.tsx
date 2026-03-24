import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, X, User, Briefcase, GraduationCap, Github, Linkedin, Globe } from 'lucide-react';

interface Student {
  name: string;
  skills: string;
  score: number;
  ranking: number;
}

export default function Leaderboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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
      case 1: return <Trophy className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]" size={32} />;
      case 2: return <Medal className="text-gray-400 drop-shadow-[0_0_15px_rgba(156,163,175,0.6)]" size={32} />;
      case 3: return <Medal className="text-amber-600 drop-shadow-[0_0_15px_rgba(217,119,6,0.6)]" size={32} />;
      default: return <span className="text-gray-500 font-black text-xl">{rank}</span>;
    }
  };

  return (
    <section id="leaderboard" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4"
          >
            Rankings
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
          >
            Top <span className="text-blue-500">Performers</span>
          </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {students.map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`p-8 rounded-[2.5rem] border flex flex-col md:flex-row items-center justify-between transition-all duration-500 group relative overflow-hidden ${
                    index < 3 
                      ? 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/50' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  {index < 3 && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                  )}
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="w-20 h-20 flex items-center justify-center bg-black/50 rounded-3xl border border-white/5 group-hover:border-blue-500/30 transition-colors">
                      {getRankIcon(student.ranking)}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-3xl font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tighter">
                        {student.name}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        {student.skills.split(',').map(skill => (
                          <span key={skill} className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-white/5 text-gray-400 rounded-full border border-white/5 group-hover:border-blue-500/20 transition-colors">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-12 mt-8 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-8 md:pt-0">
                    <div className="text-center md:text-right">
                      <div className="text-5xl font-black text-white flex items-center gap-2 justify-center md:justify-end tracking-tighter">
                        {student.score}
                        <Star size={24} className="text-blue-500 fill-blue-500 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black mt-2">Interview Score</div>
                    </div>
                    
                    <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
                    
                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedStudent(student)}
                      className="px-8 py-4 bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden blue-glow"
            >
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-12">
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-12">
                  <div className="w-32 h-32 bg-blue-500/10 border-2 border-blue-500/20 rounded-[2.5rem] flex items-center justify-center relative group">
                    <User size={64} className="text-blue-500" />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center border-4 border-zinc-900">
                      <span className="text-white font-black text-xs">#{selectedStudent.ranking}</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">{selectedStudent.name}</h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 text-gray-400">
                        <Briefcase size={16} className="text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-widest">Software Engineer</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 text-gray-400">
                        <GraduationCap size={16} className="text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-widest">IIT Delhi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Top Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skills.split(',').map(skill => (
                        <span key={skill} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white font-medium">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Performance</h4>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Interview Score</span>
                        <span className="text-3xl font-black text-white">{selectedStudent.score}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedStudent.score}%` }}
                          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:justify-start gap-6 pt-8 border-t border-white/5">
                  <button className="p-4 bg-white/5 rounded-2xl border border-white/5 text-gray-400 hover:text-blue-500 hover:border-blue-500/30 transition-all">
                    <Github size={20} />
                  </button>
                  <button className="p-4 bg-white/5 rounded-2xl border border-white/5 text-gray-400 hover:text-blue-500 hover:border-blue-500/30 transition-all">
                    <Linkedin size={20} />
                  </button>
                  <button className="p-4 bg-white/5 rounded-2xl border border-white/5 text-gray-400 hover:text-blue-500 hover:border-blue-500/30 transition-all">
                    <Globe size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
