import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import Terminal from './components/Terminal';
import { useSoundEffect } from './hooks/useSoundEffect';
import { Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [hacked, setHacked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { playBlip } = useSoundEffect();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Show instruction toast slightly after load
      setTimeout(() => setShowToast(true), 1500);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~' || e.key === 'k')) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogoClick = () => {
    playBlip();
    setClickCount(c => {
      const newCount = c + 1;
      
      if (newCount === 5) {
        triggerHack(true);
      } else if (newCount === 10) {
        triggerHack(false);
        return 0; // Reset after successfully restoring
      }
      
      return newCount;
    });
  };

  const triggerHack = (enableHack) => {
    setHacked(enableHack);
    if (enableHack) {
      document.body.classList.add('hacked');
    } else {
      document.body.classList.remove('hacked');
    }
    setIsTerminalOpen(false);
    
    // Screen flash glitch
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = 'white';
    flash.style.zIndex = '9999';
    flash.style.mixBlendMode = 'difference';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 100);
    setTimeout(() => document.body.appendChild(flash), 150);
    setTimeout(() => flash.remove(), 200);
  };

  return (
    <div className={`w-full min-h-screen text-white font-sans selection:bg-neon-purple/30 selection:text-white overflow-x-hidden ${hacked ? 'bg-[#0a0000]' : 'bg-dark-bg'}`}>
      <CustomCursor />
      
      {!loading && <CanvasBackground />}
      
      {/* Interactive Features Toast Notification */}
      <AnimatePresence>
        {showToast && !loading && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] max-w-sm glass border ${hacked ? 'border-red-500/30 shadow-[0_0_20px_rgba(255,0,0,0.1)]' : 'border-neon-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]'} rounded-2xl p-4 sm:p-5 backdrop-blur-xl`}
          >
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className={`p-2 rounded-full ${hacked ? 'bg-red-500/20 text-red-500' : 'bg-neon-cyan/20 text-neon-cyan'} mt-1 shrink-0`}>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">System Guide</h4>
                  <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-white text-lg leading-none ml-4 cursor-pointer shrink-0">&times;</button>
                </div>
                <ul className="text-xs text-gray-300 space-y-1.5 sm:space-y-2 font-mono">
                  <li><span className={`${hacked ? 'text-red-400' : 'text-neon-cyan'}`}>[AUDIO]</span> Synthesizers embedded. Unmute your device &amp; hover/type anywhere.</li>
                  <li><span className={`${hacked ? 'text-red-400' : 'text-neon-cyan'}`}>[OS]</span> Boot the interactive Terminal via the navigation button.</li>
                  <li><span className={`${hacked ? 'text-red-400' : 'text-neon-cyan'}`}>[SECRET]</span> Click the "TA." logo 5 times for Hacker Red Mode.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)', scale: 1.2 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[100] h-screen w-full flex justify-center items-center bg-dark-bg overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_50%)]"></div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center relative z-10"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-24 h-24 border-[3px] border-dark-surfaces border-t-neon-cyan border-b-neon-purple rounded-full shadow-[0_0_40px_rgba(34,211,238,0.2)] mb-8"
                ></motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-2 border-[2px] border-transparent border-l-neon-blue rounded-full"
                ></motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: 50, rotateX: -90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ delay: 0.2, duration: 1, type: "spring", bounce: 0.5 }}
                  style={{ transformPerspective: 500, transformOrigin: "bottom" }}
                  className="font-display text-white text-xl xs:text-2xl sm:text-3xl md:text-5xl tracking-[0.2em] sm:tracking-[0.5em] uppercase font-black break-words"
                >
                  SYSTEM_INIT
                </motion.h2>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "120%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent mt-4"
              ></motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} onHack={() => triggerHack(true)} />

      {!loading && (
        <div className={`relative z-10 ${hacked ? 'animate-pulse' : ''}`}>
          <motion.nav 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full p-4 sm:p-6 lg:px-12 flex justify-between items-center z-50 mix-blend-difference text-white"
          >
            <div 
              onClick={handleLogoClick}
              className="font-display font-black text-2xl tracking-wider cursor-pointer hover:text-neon-cyan transition-colors select-none group relative"
            >
              TA<span className="text-neon-cyan">.</span>
              <span className="absolute -bottom-4 left-0 text-[8px] font-mono opacity-0 group-hover:opacity-50 transition-opacity tracking-widest whitespace-nowrap hidden md:block">
                [{clickCount}/5] GLITCH
              </span>
            </div>
            {/* Desktop nav links */}
            <div className="flex gap-4 sm:gap-8 font-mono text-sm tracking-widest items-center">
              <div className="hidden md:flex gap-8">
                <a href="#about" onMouseEnter={playBlip} className="hover:text-neon-cyan transition-colors relative group">
                  ABOUT
                  <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-neon-cyan transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:right-auto"></span>
                </a>
                <a href="#projects" onMouseEnter={playBlip} className="hover:text-neon-purple transition-colors relative group">
                  WORK
                  <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-neon-purple transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:right-auto"></span>
                </a>
                <a href="#contact" onMouseEnter={playBlip} className="hover:text-neon-blue transition-colors relative group">
                  CONTACT
                  <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:right-auto"></span>
                </a>
              </div>
              <button 
                onClick={() => { playBlip(); setIsTerminalOpen(true); }}
                onMouseEnter={playBlip}
                className="px-3 sm:px-4 py-1.5 border border-white/20 rounded-full font-mono text-[10px] sm:text-xs hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
              >
                [ &gt;_ OS ]
              </button>
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
              </button>
            </div>
          </motion.nav>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="fixed top-[60px] left-0 right-0 z-40 md:hidden glass border-b border-white/10 backdrop-blur-xl px-6 py-6 flex flex-col gap-6 font-mono text-sm tracking-widest text-white"
              >
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neon-cyan transition-colors">ABOUT</a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neon-purple transition-colors">WORK</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-neon-blue transition-colors">CONTACT</a>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex flex-col min-h-screen">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
