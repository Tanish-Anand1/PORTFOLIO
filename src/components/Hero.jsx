import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Specialized function to split text into characters for stagger reveals
const SplitText = ({ text, delayOffset = 0 }) => {
  const chars = text.split("");
  return (
    <span className="inline-block overflow-hidden pb-4">
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ y: 150, rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: delayOffset + index * 0.05,
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effects tied directly to native smooth scrolling via Lenis
  const yText = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden mix-blend-screen"
    >
      <motion.div 
        style={{ y: yText, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-20 w-full pointer-events-none"
      >
        <div className="mb-6 sm:mb-8 overflow-hidden pointer-events-auto">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ scale: 1.05 }}
            className="inline-block py-1.5 px-4 rounded-full border border-dark-border bg-dark-surfaces/50 glass text-neon-cyan text-xs sm:text-sm tracking-widest uppercase font-mono shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            Engineering The Future
          </motion.div>
        </div>
        
        {/* Extreme Character Staggered Headline */}
        <h1 
          className="text-[13vw] xs:text-[12vw] sm:text-[10vw] md:text-8xl lg:text-[140px] font-display font-black tracking-tighter mb-4 sm:mb-6 leading-[0.85] text-white perspective-[1000px] flex flex-col items-center"
        >
          <SplitText text="TANISH" delayOffset={3.0} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple drop-shadow-[0_0_80px_rgba(34,211,238,0.5)] !pb-2">
            <SplitText text="ANAND" delayOffset={3.3} />
          </span>
        </h1>
        
        <div className="overflow-hidden mt-4 sm:mt-6 mb-8 sm:mb-12 pointer-events-auto px-4 sm:px-2">
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3.8, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-2xl text-sm xs:text-base sm:text-lg md:text-2xl text-gray-300 font-sans font-light leading-relaxed"
          >
            Award-winning Architect of <span className="text-white font-bold tracking-wide">Hardware & AI</span>. <br className="hidden md:block" />
            Breaking limits of edge compute and interfaces.
          </motion.p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 sm:gap-6 pointer-events-auto px-6 sm:px-0 max-w-sm sm:max-w-none mx-auto">
          <motion.a 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4.2, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(255,255,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects" 
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white text-dark-bg font-bold rounded-full transition-all duration-300 transform-gpu text-center text-sm sm:text-base"
          >
            Explore Projects
          </motion.a>
          <motion.a 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4.4, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full border border-white/20 glass transition-all duration-300 relative overflow-hidden group text-center"
          >
            <span className="relative z-10 font-bold text-white tracking-widest uppercase text-xs sm:text-sm">Initiate Contact</span>
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-neon-purple/40 to-neon-cyan/40 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
          </motion.a>
        </div>
      </motion.div>

      {/* Extreme smooth scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.8, duration: 1.5, ease: "easeOut" }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center Mix-blend-difference"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-mono mb-4 text-neon-cyan font-bold">Scroll Down</span>
        <div className="w-[2px] h-[80px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div 
            animate={{ y: [-80, 80] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: [0.76, 0, 0.24, 1] }} // Brutal ease
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-neon-cyan to-transparent absolute top-0 shadow-[0_0_10px_rgba(34,211,238,1)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
