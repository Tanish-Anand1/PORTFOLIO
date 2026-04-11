import { motion, useMotionTemplate, useMotionValue, useSpring as useFramerSpring } from 'framer-motion';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSoundEffect } from '../hooks/useSoundEffect';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'CareLink',
    category: 'Health MVP',
    description: 'Care coordination platform for aging parents in tier-2 Indian cities whose adult children have relocated to metros. Zero-code WhatsApp + Google Sheets.',
    tech: ['WhatsApp', 'Google Sheets', 'No-code'],
    status: 'Actively building — customer discovery',
    imageColor: 'from-green-500/20 to-emerald-900/40',
    accentColor: 'text-emerald-400',
    link: '#'
  },
  {
    title: 'EduCore',
    category: 'Hardware-AI',
    description: 'Solar-powered offline adaptive AI learning device for rural Indian students. Runs quantized Phi-3 Mini via llama.cpp locally with NCERT data.',
    tech: ['Raspberry Pi', 'llama.cpp', 'Phi-3 Mini', 'Python'],
    status: 'Hardware BOM complete — IRIS paper',
    imageColor: 'from-orange-500/20 to-red-900/40',
    accentColor: 'text-orange-400',
    link: '#'
  },
  {
    title: 'PhysicsGPT',
    category: 'AI Tutor',
    description: 'Offline AI tutor fine-tuned on CBSE Physics curriculum, deployable on a Raspberry Pi. Built as a core project for EV and Non Trivial grants.',
    tech: ['Raspberry Pi', 'LLM Fine-tuning', 'Python'],
    status: 'Grant application',
    imageColor: 'from-purple-500/20 to-indigo-900/40',
    accentColor: 'text-purple-400',
    link: '#'
  },
  {
    title: 'ComplianceGuard',
    category: 'AI Agent',
    description: 'Dual-LLM autonomous compliance agent. Grok handles fast scanning; Claude performs deep audit reasoning for SOC 2, HIPAA, GDPR, ISO 27001.',
    tech: ['Grok', 'Claude API', 'OpenClaw', 'Python'],
    status: 'Completed',
    imageColor: 'from-blue-500/20 to-cyan-900/40',
    accentColor: 'text-blue-400',
    link: '#'
  },
  {
    title: 'Anti-Sleep Pilot',
    category: 'AI Vision',
    description: 'AI-powered real-time drowsiness detection system using computer vision. Built and pitched at HACKSHODH 2026 at CSJMU, Kanpur.',
    tech: ['Computer Vision', 'Python', 'OpenCV'],
    status: 'Hackathon Submission',
    imageColor: 'from-red-500/20 to-rose-900/40',
    accentColor: 'text-red-400',
    link: '#'
  }
];

const accomplishments = [
  { text: "TheResidency \n Selected for Summer Cohort", delay: 0.1 },
  { text: "Y Combinator Startup School \n Applied", delay: 0.2 },
  { text: "VibeCon \n Applied", delay: 0.3 }
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useFramerSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useFramerSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;
  
  const { playBlip } = useSoundEffect();

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max rotation is 15 degrees
    x.set(((mouseX / width) - 0.5) * 20);
    y.set(((mouseY / height) - 0.5) * -20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-[85vw] sm:w-[85vw] md:w-[450px] h-[60vh] min-h-[420px] max-h-[480px] sm:max-h-[520px] md:max-h-none md:h-[550px] flex-shrink-0 perspective-[2000px] snap-center px-1 sm:px-4" onMouseEnter={playBlip}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-[40px] overflow-hidden glass border border-white/5 hover:border-white/20 transition-colors duration-500 will-change-transform flex flex-col"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.imageColor} opacity-20 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen`}></div>
        
        <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] transform-gpu" style={{ transform: "translateZ(-50px)" }}></div>

        <div className="relative z-10 p-5 sm:p-7 md:p-10 flex flex-col justify-between flex-grow transform-gpu" style={{ transform: "translateZ(60px)" }}>
          <div>
            <div className="flex justify-between items-start mb-4 sm:mb-8">
              <span className={`text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] ${project.accentColor} px-3 sm:px-4 py-1 sm:py-1.5 bg-white/5 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
                {project.category}
              </span>
            </div>
            
            <h3 className="text-2xl xs:text-3xl sm:text-4xl font-display font-black mb-2 sm:mb-4 text-white drop-shadow-md leading-tight">
              {project.title}
            </h3>
            
            <p className="text-gray-300 text-xs sm:text-[16px] leading-relaxed sm:mb-6 font-sans line-clamp-4 sm:line-clamp-none">
              {project.description}
            </p>
          </div>
          
          <div>
            <div className="flex gap-2 mb-4 sm:mb-8 flex-wrap" style={{ transform: "translateZ(20px)" }}>
              {project.tech.map((tech) => (
                <span 
                  key={tech} 
                  className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-black/40 text-gray-300 border border-white/5 shadow-inner"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-6">
              <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                <span className="truncate">{project.status}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // GSAP Horizontal Scrolling that guarantees scrolling past
  useGSAP(() => {
    // Only apply horizontal scroll on desktop/larger screens naturally
    const mql = window.matchMedia("(min-width: 768px)");
    
    let scrollTween;
    
    const initScroll = () => {
      // Clear previous instances
      if (scrollTween) scrollTween.kill();
      
      if (mql.matches && trackRef.current && sectionRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xToScroll = -(trackWidth - viewportWidth);

        // We use absolute math to ensure the ScrollTrigger knows exactly where things end
        scrollTween = gsap.to(trackRef.current, {
          x: xToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 2.5,
            end: () => `+=${trackWidth}`,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          }
        });
      } else {
         // Reset transform for mobile natively scrolling
         gsap.set(trackRef.current, { x: 0 });
      }
    };

    initScroll();
    
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
      initScroll();
    });

    return () => {
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', initScroll);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="h-[100svh] w-full relative z-10 bg-transparent flex flex-col justify-center overflow-x-hidden md:overflow-visible mix-blend-screen pointer-events-auto">
      
      <div className="absolute top-8 sm:top-10 left-4 sm:left-6 md:left-20 z-20 pointer-events-none pr-4">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black tracking-tighter mix-blend-overlay opacity-80 text-white leading-tight break-words">
          ENGINEERING //<br className="hidden sm:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple opacity-100">ARCHIVE</span>
        </h2>
      </div>

      <div className="absolute top-[30%] left-[5%] w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[200px] pointer-events-none transform-gpu"></div>

      {/* The Horizontal Track - On mobile we use a native scroll-snap container if GSAP is skipped */}
      <div 
        ref={trackRef} 
        className="flex items-center w-full md:w-fit h-full px-2 sm:px-4 md:px-[10vw] pt-32 sm:pt-36 md:pt-32 pb-6 md:pb-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scroll-smooth"
      >
        {/* Banner accomplishments inline before projects */}
        <div className="w-[85vw] sm:w-[85vw] md:w-[450px] h-[60vh] min-h-[420px] max-h-[480px] sm:max-h-[520px] md:max-h-none md:h-[550px] flex-shrink-0 flex flex-col gap-3 sm:gap-6 mr-2 sm:mr-6 md:mr-10 justify-center snap-center px-1 sm:px-4">
            {accomplishments.map((acc, i) => (
              <div
                key={i}
                className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 flex items-center justify-center text-center shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              >
                <p className="font-mono text-xs sm:text-sm leading-relaxed text-gray-300">
                  {acc.text.includes("TheResidency") ? (
                    <span className="text-neon-cyan font-bold block mb-1 sm:mb-2 text-base sm:text-lg md:text-xl tracking-widest">SELECTED</span>
                  ) : acc.text.includes("VibeCon") ? (
                    <span className="text-neon-blue font-bold block mb-1 sm:mb-2 text-base sm:text-lg md:text-xl tracking-widest">PITCHING</span>
                  ) : (
                    <span className="text-neon-purple font-bold block mb-1 sm:mb-2 text-base sm:text-lg md:text-xl tracking-widest">APPLIED</span>
                  )}
                  {acc.text.split('\n').map((line, idx) => <span key={idx} className="block mt-1 font-sans">{line}</span>)}
                </p>
              </div>
            ))}
        </div>

        {/* 5 Horizontal project cards */}
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
        
        {/* Ask User CTA for the rest of projects attached directly to the track */}
        <div className="w-[85vw] sm:w-[85vw] md:w-[450px] h-[60vh] min-h-[420px] max-h-[480px] sm:max-h-[520px] md:max-h-none md:h-[550px] flex-shrink-0 perspective-[2000px] snap-center px-1 sm:px-4 md:pr-[10vw]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group relative h-full rounded-[40px] overflow-hidden glass border border-neon-cyan/30 hover:border-neon-cyan transition-colors duration-500 flex flex-col items-center justify-center text-center p-6 sm:p-10 cursor-pointer shadow-[0_0_30px_rgba(34,211,238,0.05)] hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/10 to-neon-cyan/10 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full border border-neon-cyan/50 flex items-center justify-center text-neon-cyan group-hover:scale-125 transition-transform duration-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white mb-2">Want to see all 11+ projects?</h3>
                <p className="text-gray-400 font-sans text-sm sm:text-base">Including Telebot Agents, Edge Computes, GameDev, and more hardware schematics.</p>
              </div>
              <button className="mt-4 px-8 py-4 bg-white text-dark-bg font-bold rounded-full hover:bg-neon-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
                <a href="https://github.com/Tanish-Anand1">Unlock Full Archive</a>
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );  
};

export default Projects;
