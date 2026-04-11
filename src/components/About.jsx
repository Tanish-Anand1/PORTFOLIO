import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-40 px-4 sm:px-6 relative z-10 flex justify-center bg-dark-bg min-h-screen items-center overflow-hidden">
      
      {/* Background Decorative Typography - hidden on mobile to prevent overflow */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none whitespace-nowrap hidden lg:block"
      >
        <h2 className="text-[200px] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent">
          VISIONARY ARCHITECT
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto w-full flex flex-col relative z-10 px-4">
        
        {/* Staggered Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col gap-6 md:gap-8 items-center text-center"
        >
          <div className="flex flex-col gap-2 items-center">
            <span className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-2">SYSTEM_BIO</span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight break-words">
              Bridging the gap <br />
              between <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">Aesthetics</span> & <br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Architecture</span>
            </h2>
          </div>
          
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
          
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light max-w-2xl">
            I'm <span className="font-bold tracking-wide text-[var(--foreground)]">Tanish Anand</span>. My journey revolves around crafting digital solutions that perform flawlessly at scale while leaving a lasting, undeniable visual impact. 
          </p>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light max-w-2xl">
            Currently, I focus on integrating cutting-edge technologies like Generative AI, engineering custom edge hardware, and building immersive experiences that redefine standard web interfaces.
          </p>
          
          <div className="flex gap-4 sm:gap-6 mt-8 w-full flex-col sm:flex-row justify-center">
            <motion.div whileHover={{ y: -5 }} className="w-full sm:flex-1 px-4 sm:px-6 py-6 sm:py-8 rounded-3xl glass border border-white/10 flex flex-col items-center shadow-[0_0_30px_rgba(34,211,238,0.05)]">
               <span className="text-4xl sm:text-5xl font-display font-black text-neon-blue mb-2">2+</span>
               <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-[0.3em] font-bold">YEARS EXP.</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="w-full sm:flex-1 px-4 sm:px-6 py-6 sm:py-8 rounded-3xl glass border border-white/10 flex flex-col items-center shadow-[0_0_30px_rgba(168,85,247,0.05)]">
               <span className="text-4xl sm:text-5xl font-display font-black text-neon-purple mb-2">11</span>
               <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-[0.3em] font-bold">CORE PROJECTS</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="w-full sm:flex-1 px-4 sm:px-6 py-6 sm:py-8 rounded-3xl glass border border-white/10 flex flex-col items-center shadow-[0_0_30px_rgba(34,211,238,0.05)]">
               <span className="text-4xl sm:text-5xl font-display font-black text-neon-cyan mb-2">∞</span>
               <span className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-[0.3em] font-bold">POSSIBILITIES</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
