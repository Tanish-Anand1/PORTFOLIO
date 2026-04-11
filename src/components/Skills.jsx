import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Cpu, 
  Globe, 
  Layout, 
  Terminal, 
  Server
} from 'lucide-react';

const skills = [
  { name: 'Hardware & Systems', icon: <Cpu className="w-8 h-8" />, items: ['Raspberry Pi', 'PCB Design (KiCad)', 'Flight Controllers', 'Edge AI Inferencing'] },
  { name: 'Artificial Intelligence', icon: <Terminal className="w-8 h-8" />, items: ['LLM Fine-tuning', 'llama.cpp', 'Computer Vision/OpenCV', 'AI Agents (OpenClaw/Claude)'] },
  { name: 'Frontend Architecture', icon: <Layout className="w-8 h-8" />, items: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion & GSAP'] },
  { name: 'Backend & Operations', icon: <Server className="w-8 h-8" />, items: ['Python', 'Node.js', 'n8n Automations', 'Supabase'] }
];

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  // Parallax mapping for the massive background text
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section ref={containerRef} id="skills" className="py-24 md:py-40 relative z-10 bg-dark-surfaces border-y border-white/5 overflow-hidden">
      
      {/* Massive Parallax Typography Background */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap">
        <motion.h2 style={{ x: xLeft }} className="text-[15vw] font-display font-black tracking-tighter leading-none mb-10">
          HARDWARE AI FRONTEND BACKEND
        </motion.h2>
        <motion.h2 style={{ x: xRight }} className="text-[15vw] font-display font-black tracking-tighter leading-none text-transparent border-text">
          FRONTEND BACKEND HARDWARE AI
        </motion.h2>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black mb-4 break-words leading-tight">
              CAPABILITY<wbr/><span className="text-neon-cyan">_MATRIX</span>
            </h2>
            <p className="text-gray-400 font-sans max-w-xl text-lg md:text-xl font-light">
              Bridging low-level hardware design with high-level AI abstractions and interactive web interfaces.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 md:w-24 md:h-24 border border-white/10 rounded-full flex items-center justify-center p-2 relative group hidden sm:flex"
          >
             <div className="absolute inset-0 rounded-full border-t border-neon-purple animate-spin-slow group-hover:border-neon-cyan transition-colors"></div>
             <Globe className="w-6 h-6 md:w-8 md:h-8 text-white/50 group-hover:text-white transition-colors" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1500px]">
          {skills.map((skillGroup, index) => (
            <motion.div 
              key={skillGroup.name}
              initial={{ opacity: 0, rotateX: -15, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
              className="p-6 sm:p-8 md:p-10 lg:p-14 rounded-[30px] glass border border-white/5 hover:border-white/20 transition-all duration-500 relative group overflow-hidden"
            >
              {/* Animated Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 blur-[80px] rounded-full group-hover:bg-neon-cyan/10 transition-colors duration-700 z-0"></div>
              
              <div className="relative z-10 flex gap-6 items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-neon-cyan group-hover:text-neon-purple transition-all duration-500 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] group-hover:scale-110">
                  {skillGroup.icon}
                </div>
                <h3 className="text-2xl xs:text-3xl lg:text-4xl font-display font-black text-white tracking-wide mt-2">
                  {skillGroup.name}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-4 relative z-10">
                {skillGroup.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-4 text-gray-300 font-sans text-lg group/item"
                  >
                    <span className="w-8 h-[1px] bg-white/10 group-hover/item:bg-neon-cyan group-hover/item:w-12 transition-all duration-300"></span>
                    <span className="group-hover/item:text-white transition-colors duration-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Global Bottom border gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  );
};

export default Skills;
