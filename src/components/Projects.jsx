import { useRef } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'CareLink',
    description: 'Care coordination platform for aging parents in tier-2 Indian cities. WhatsApp + Google Sheets, zero-code MVP.',
    tech: ['WhatsApp', 'Google Sheets', 'No-code'],
    status: 'Building',
    year: '2026',
    link: '#',
    glowColor: 'rgba(16, 185, 129, 0.06)',
  },
  {
    title: 'Project Rudra',
    description: 'GPU-accelerated global OSINT command grid. Integrates real-time flight tracking, marine channels, active CCTV networks, seismic activity, and live global broadcasts in a 60fps WebGL interface.',
    tech: ['Next.js', 'MapLibre GL', 'WebGL', 'TypeScript', 'TailwindCSS'],
    status: 'Completed',
    year: '2026',
    link: 'https://osirisai.live',
    glowColor: 'rgba(57, 255, 20, 0.08)',
  },
  {
    title: 'Text Diffusion vs. AR Models',
    description: 'PhD research project benchmarking discrete and continuous text diffusion architectures (SEDD, LLaDA) against auto-regressive LLMs on multi-task Hindi NLP pipelines.',
    tech: ['Python', 'PyTorch', 'SEDD', 'LLaDA', 'NLP'],
    status: 'Research',
    year: '2026',
    link: '#',
    glowColor: 'rgba(139, 92, 246, 0.08)',
  },
  {
    title: 'EduCore',
    description: 'Solar-powered offline adaptive AI learning device for rural Indian students. Runs quantized Phi-3 Mini locally on a Raspberry Pi.',
    tech: ['Raspberry Pi', 'llama.cpp', 'Phi-3 Mini', 'Python'],
    status: 'Hardware BOM complete',
    year: '2025',
    link: '#',
    glowColor: 'rgba(245, 158, 11, 0.06)',
  },
  {
    title: 'PhysicsGPT',
    description: 'Offline AI tutor fine-tuned on CBSE Physics curriculum, deployable on edge hardware.',
    tech: ['Raspberry Pi', 'LLM Fine-tuning', 'Python'],
    status: 'Grant application',
    year: '2025',
    link: '#',
    glowColor: 'rgba(59, 130, 246, 0.06)',
  },
  {
    title: 'ComplianceGuard',
    description: 'Dual-LLM autonomous compliance agent. Grok handles fast scanning, Claude performs deep audit reasoning for SOC 2, HIPAA, GDPR, ISO 27001.',
    tech: ['Grok', 'Claude API', 'OpenClaw', 'Python'],
    status: 'Completed',
    year: '2025',
    link: '#',
    glowColor: 'rgba(239, 68, 68, 0.06)',
  },
  {
    title: 'Anti-Sleep Pilot',
    description: 'Real-time drowsiness detection system using computer vision. Built and pitched at HACKSHODH 2026.',
    tech: ['Computer Vision', 'Python', 'OpenCV'],
    status: 'Hackathon',
    year: '2026',
    link: '#',
    glowColor: 'rgba(249, 115, 22, 0.06)',
  },
];

const ProjectCard = ({ project, index, isRudraMode }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group block p-5 sm:p-6 rounded-xl border bg-dark-surface transition-all duration-300 relative overflow-hidden z-10 ${
        isRudraMode 
          ? 'border-emerald-500/10 hover:border-emerald-500/30 shadow-emerald-500/[0.01]' 
          : 'border-dark-border hover:border-dark-border-hover'
      }`}
      style={{
        '--card-hover-color': isRudraMode ? 'rgba(57, 255, 20, 0.05)' : project.glowColor,
      }}
    >
      {/* Magnetic Cursor Track Spotlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), var(--card-hover-color), transparent 100%)`
        }}
      />

      <div className="relative z-10">
        {/* Top row: title + year */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className={`text-[15px] font-medium transition-colors duration-200 ${
            isRudraMode ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-white group-hover:text-accent'
          }`}>
            {project.title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`text-xs font-mono transition-colors duration-200 ${
              isRudraMode ? 'text-emerald-500/30' : 'text-white/20'
            }`}>{project.year}</span>
            <svg 
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={`text-white/0 group-hover:text-white/40 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 ${
                isRudraMode ? 'group-hover:text-emerald-400/50' : 'group-hover:text-accent/60'
              }`}
            >
              <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
            </svg>
          </div>
        </div>

        {/* Status */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider ${
            project.status === 'Building' || project.status === 'Research' ? 'text-emerald-400/70' :
            project.status === 'Completed' ? 'text-blue-400/70' :
            'text-white/25'
          }`}>
            {(project.status === 'Building' || project.status === 'Research') && <span className="w-1 h-1 rounded-full bg-emerald-400 pulse-soft" />}
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-4 transition-colors duration-200 ${
          isRudraMode ? 'text-emerald-400/50 group-hover:text-emerald-400/60' : 'text-white/40'
        }`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className={`text-[11px] font-mono px-2 py-0.5 rounded-md border transition-colors duration-200 ${
                isRudraMode 
                  ? 'bg-emerald-500/[0.02] border-emerald-500/10 text-emerald-400/35 group-hover:text-emerald-400/50 group-hover:border-emerald-500/25' 
                  : 'bg-white/[0.01] border-dark-border text-white/30 group-hover:text-white/40'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

const Projects = ({ isRudraMode }) => {
  return (
    <section id="projects" className="py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-baseline justify-between mb-8">
          <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400 text-shadow-emerald' : 'text-white'
          }`}>
            Projects
          </h2>
          <a
            href="https://github.com/Tanish-Anand1"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs transition-colors duration-200 ${
              isRudraMode ? 'text-emerald-400/35 hover:text-emerald-400/70' : 'text-white/25 hover:text-white/60'
            }`}
          >
            View all
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isRudraMode={isRudraMode} />
          ))}
        </div>

        {/* Mobile GitHub CTA */}
        <div className="mt-6 text-center sm:hidden">
          <a
            href="https://github.com/Tanish-Anand1"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs transition-colors duration-200 ${
              isRudraMode ? 'text-emerald-400/40 hover:text-emerald-400/70' : 'text-white/30 hover:text-white/60'
            }`}
          >
            View all projects on GitHub
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
