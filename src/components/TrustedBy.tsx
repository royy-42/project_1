import { motion } from 'motion/react';

const companies = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
];

export default function TrustedBy() {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-y border-white/5">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[200px] bg-blue-500/20 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-blue-500/60 font-black uppercase tracking-[0.5em] text-[10px]"
        >
          Trusted by the world's most innovative companies
        </motion.p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-20 md:gap-32 whitespace-nowrap px-12"
        >
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div key={`${company.name}-${index}`} className="flex items-center justify-center min-w-[150px] grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              <img
                src={company.logo}
                alt={company.name}
                className={`h-8 md:h-12 w-auto object-contain transition-all duration-500 hover:scale-125 ${company.name === 'Apple' || company.name === 'Netflix' ? 'invert' : ''}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
