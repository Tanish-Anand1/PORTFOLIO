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

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
        
        {/* Extreme Parallax Image/Graphic Container */}
        <motion.div 
          style={{ y: y1, scale }}
          className="relative perspective-[1000px] order-2 lg:order-1 max-w-[280px] sm:max-w-sm mx-auto w-full lg:max-w-none"
        >
          {/* Decorative rotating frames */}
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-neon-purple/30 to-neon-cyan/30 rounded-full blur-[80px] -z-10"
          ></motion.div>
          <div className="absolute inset-0 border border-white/10 rounded-3xl transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6"></div>
          <div className="absolute inset-0 border border-neon-cyan/20 rounded-3xl transform -rotate-3 scale-100 transition-transform duration-500 hover:-rotate-6"></div>
          
          <div className="aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/20 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.02] transition-transform duration-500">
             {/* Dynamic Scanline Effect */}
             <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)] z-20 pointer-events-none"></div>
             
             <div className="w-full h-full bg-[#0a0f1c] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-purple/10 to-dark-bg z-10"></div>
                
                {/* Core Abstract Visual */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                  className="w-[80%] h-[80%] rounded-full border-[1px] border-neon-cyan/30 absolute flex items-center justify-center"
                >
                  <div className="w-[80%] h-[80%] rounded-full border-[1px] border-neon-purple/40 border-dashed animate-spin-slow"></div>
                </motion.div>

                <div className="flex flex-col items-center justify-center z-20 gap-2">
                  <span className="text-white/40 font-mono text-xs tracking-[0.3em] font-bold">IDENTITY_MATRIX</span>
                  <div className="w-12 h-[1px] bg-neon-cyan/50"></div>
                  <span className="text-neon-cyan font-display text-2xl font-black mt-2">TANISH ANAND</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Staggered Bio */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2"
        >
          <div className="flex flex-col gap-2">
            <span className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-2">SYSTEM_BIO</span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight break-words">
              Bridging the gap <br />
              between <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Aesthetics</span> & <br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Architecture</span>
            </h2>
          </div>
          
          <div className="h-[1px] w-24 bg-gradient-to-r from-neon-cyan to-transparent"></div>
          
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light">
            I'm <span className="text-white font-bold tracking-wide">Tanish Anand</span>. My journey revolves around crafting digital solutions that perform flawlessly at scale while leaving a lasting, undeniable visual impact. 
          </p>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light">
            Currently, I focus on integrating cutting-edge technologies like Generative AI, engineering custom edge hardware, and building immersive experiences that redefine standard web interfaces.
          </p>
          
          <div className="flex gap-2 sm:gap-4 mt-4 md:mt-8 flex-wrap">
            <motion.div whileHover={{ y: -5 }} className="flex-1 min-w-[140px] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl glass border border-white/10 flex flex-col items-start shadow-[0_0_20px_rgba(34,211,238,0.05)]">
               <span className="text-2xl xs:text-3xl sm:text-4xl font-display font-black text-neon-blue mb-1">2+</span>
               <span className="text-[9px] xs:text-[10px] text-gray-500 font-mono tracking-[0.2em] font-bold">YEARS EXP.</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex-1 min-w-[140px] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl glass border border-white/10 flex flex-col items-start shadow-[0_0_20px_rgba(168,85,247,0.05)]">
               <span className="text-2xl xs:text-3xl sm:text-4xl font-display font-black text-neon-purple mb-1">11</span>
               <span className="text-[9px] xs:text-[10px] text-gray-500 font-mono tracking-[0.2em] font-bold">CORE PROJECTS</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="w-full sm:flex-1 sm:min-w-[140px] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl glass border border-white/10 flex flex-col items-start shadow-[0_0_20px_rgba(34,211,238,0.05)]">
               <span className="text-2xl xs:text-3xl sm:text-4xl font-display font-black text-neon-cyan mb-1">∞</span>
               <span className="text-[9px] xs:text-[10px] text-gray-500 font-mono tracking-[0.2em] font-bold">POSSIBILITIES</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
