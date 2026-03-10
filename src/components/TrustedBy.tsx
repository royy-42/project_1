import { motion } from 'motion/react';

const companies = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-zinc-900/50 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-center text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">
          Trusted by the world's most innovative companies
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-12"
        >
          {[...companies, ...companies].map((company, index) => (
            <div key={`${company.name}-${index}`} className="flex items-center justify-center min-w-[120px]">
              <img
                src={company.logo}
                alt={company.name}
                className={`h-8 md:h-10 w-auto object-contain transition-all duration-300 hover:scale-110 ${company.name === 'Apple' ? 'invert' : ''}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
