import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'CareLink',
    description: 'Care coordination platform for aging parents in tier-2 Indian cities. WhatsApp + Google Sheets, zero-code MVP.',
    tech: ['WhatsApp', 'Google Sheets', 'No-code'],
    status: 'Building',
    year: '2026',
    link: '#',
    glowColor: 'rgba(16, 185, 129, 0.06)',
    image: '/projects/carelink.png',
  },
  {
    title: 'Project Rudra',
    description: 'GPU-accelerated global OSINT command grid. Integrates real-time flight tracking, marine channels, active CCTV networks, seismic activity, and live global broadcasts in a 60fps WebGL interface.',
    tech: ['Next.js', 'MapLibre GL', 'WebGL', 'TypeScript', 'TailwindCSS'],
    status: 'Completed',
    year: '2026',
    link: 'https://osirisai.live',
    glowColor: 'rgba(57, 255, 20, 0.08)',
    image: '/projects/rudra.png',
  },
  {
    title: 'Text Diffusion vs. AR Models',
    description: 'Research project benchmarking discrete and continuous text diffusion architectures (SEDD, LLaDA) against auto-regressive LLMs on Hindi NLP pipelines.',
    tech: ['Python', 'PyTorch', 'SEDD', 'LLaDA', 'NLP'],
    status: 'Research',
    year: '2026',
    link: '#',
    glowColor: 'rgba(139, 92, 246, 0.08)',
    image: '/projects/diffusion.png',
  },
  {
    title: 'EduCore',
    description: 'Solar-powered offline adaptive AI learning device for rural Indian students. Runs quantized Phi-3 Mini locally on a Raspberry Pi.',
    tech: ['Raspberry Pi', 'llama.cpp', 'Phi-3 Mini', 'Python'],
    status: 'Hardware BOM complete',
    year: '2025',
    link: '#',
    glowColor: 'rgba(245, 158, 11, 0.06)',
    image: '/projects/educore.png',
  },
  {
    title: 'PhysicsGPT',
    description: 'Offline AI tutor fine-tuned on CBSE Physics curriculum, deployable on edge hardware.',
    tech: ['Raspberry Pi', 'LLM Fine-tuning', 'Python'],
    status: 'Grant application',
    year: '2025',
    link: '#',
    glowColor: 'rgba(59, 130, 246, 0.06)',
    image: '/projects/physicsgpt.png',
  },
  {
    title: 'ComplianceGuard',
    description: 'Dual-LLM autonomous compliance agent. Grok handles fast scanning, Claude performs deep audit reasoning for SOC 2, HIPAA, GDPR, ISO 27001.',
    tech: ['Grok', 'Claude API', 'OpenClaw', 'Python'],
    status: 'Completed',
    year: '2025',
    link: '#',
    glowColor: 'rgba(239, 68, 68, 0.06)',
    image: '/projects/compliance.png',
  },
  {
    title: 'Anti-Sleep Pilot',
    description: 'Real-time drowsiness detection system using computer vision. Built and pitched at HACKSHODH 2026.',
    tech: ['Computer Vision', 'Python', 'OpenCV'],
    status: 'Hackathon',
    year: '2026',
    link: '#',
    glowColor: 'rgba(249, 115, 22, 0.06)',
    image: '/projects/antisleep.png',
  },
];

const RudraProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientX - rect.top; // Fixed to ClientY on implementation
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
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
      className="group block p-5 sm:p-6 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 bg-[#070e09] transition-all duration-300 relative overflow-hidden z-10 shadow-emerald-500/[0.01]"
      style={{
        '--card-hover-color': 'rgba(23, 147, 209, 0.05)',
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 120px at var(--x, 50%) var(--y, 50%), var(--card-hover-color), transparent 100%)`
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-5 items-stretch">
        {project.image && (
          <div className="w-full md:w-32 lg:w-40 h-32 md:h-auto shrink-0 rounded-lg overflow-hidden border border-emerald-500/10 group-hover:border-emerald-500/30 bg-black/40 relative">
            <img 
              src={project.image} 
              alt={project.title} 
              width="320"
              height="256"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-50 group-hover:opacity-85 group-hover:scale-105 transition-all duration-300"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[15px] font-medium text-emerald-400 group-hover:text-emerald-300 font-mono">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-emerald-500/30">{project.year}</span>
                <svg 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="text-white/0 group-hover:text-emerald-400/50 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                >
                  <path d="M7 17L17 7"/><path d="M7 7h10v10"/>
                </svg>
              </div>
            </div>

            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-emerald-400/70 font-mono">
                <span className="w-1 h-1 rounded-full bg-emerald-400 pulse-soft" />
                {project.status}
              </span>
            </div>

            <p className="text-sm leading-relaxed mb-4 text-emerald-400/50 group-hover:text-emerald-400/60 font-mono">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-emerald-500/10 text-emerald-400/35 group-hover:text-emerald-400/50 group-hover:border-emerald-500/25 bg-emerald-500/[0.02]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const Projects = ({ isRudraMode, theme, onRudraSimOpen }) => {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isRudraMode ? (
          <motion.section
            key="rudra-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-16 sm:py-20"
          >
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-400 text-shadow-emerald font-mono">
                ACTIVE_DEPLOYMENTS
              </h2>
              <a
                href="https://github.com/Tanish-Anand1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400/35 hover:text-emerald-400/70 font-mono"
              >
                query --all
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {projects.map((project, index) => (
                <RudraProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="elegant-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            id="projects"
            className="px-6 py-12 sm:py-16 relative border-t border-[var(--border)] transition-colors duration-300"
            itemScope
            itemType="https://schema.org/ItemList"
            data-section="projects"
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[var(--foreground)] text-5xl font-bold font-serif">Projects</h2>
              <p className="mt-2 text-2xl text-[var(--foreground)]/80 leading-normal">
                Here's a collection of some of my favorite work!
              </p>

              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => {
                  const isExternalLink = project.link !== '#';
                  const TagName = isExternalLink ? 'a' : 'div';
                  const linkProps = isExternalLink ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  } : {
                    role: 'article',
                  };
                  return (
                  <motion.div
                    key={project.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    itemScope
                    itemType="https://schema.org/SoftwareApplication"
                    itemProp="itemListElement"
                    data-project={project.title}
                    data-status={project.status}
                    data-year={project.year}
                  >
                  <TagName
                    {...linkProps}
                    className={`rounded-xl relative group shadow-md hover:shadow-xl h-64 sm:h-72 border flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 block ${
                      theme === 'light'
                        ? 'border-stone-200 bg-stone-50'
                        : 'border-stone-850 bg-stone-900/40 hover:bg-stone-900/60'
                    }`}
                  >
                    {project.image && (
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          width="400"
                          height="288"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
                          theme === 'light' 
                            ? 'from-transparent via-stone-50/40 to-stone-50/90' 
                            : 'from-transparent via-stone-950/40 to-stone-950/90'
                        }`} />
                      </div>
                    )}

                    <div className="absolute top-0 right-0 group-hover:opacity-30 transition pr-4 pt-3.5 z-10">
                      <span className="text-lg text-yellow-500">★</span>
                    </div>

                    <div className="absolute top-0 left-0 p-3 text-left z-10">
                      <span className={`font-serif text-xs px-2 py-0.5 rounded-md border shadow-sm font-semibold transition-all duration-300 ${
                        theme === 'light'
                          ? 'bg-white border-stone-200 text-stone-700'
                          : 'bg-stone-900 border-stone-800 text-stone-300'
                      }`}>
                        {project.year}
                      </span>
                    </div>

                    <div className={`absolute bottom-2.5 left-2.5 p-4 text-left rounded-lg border shadow-md right-2.5 z-10 group-hover:-translate-y-1.5 transition-all duration-300 ${
                      theme === 'light'
                        ? 'bg-white text-stone-850 border-stone-200/60'
                        : 'bg-stone-900/95 text-stone-100 border-stone-850 shadow-xl'
                    }`}>
                      <h3 className={`text-lg sm:text-xl font-bold font-serif leading-tight transition-colors ${
                        theme === 'light' ? 'text-stone-900 group-hover:text-indigo-600' : 'text-stone-100 group-hover:text-indigo-400'
                      }`} itemProp="name">
                        {project.title}
                      </h3>
                      <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed transition-colors ${
                        theme === 'light' ? 'text-stone-600' : 'text-stone-400'
                      }`} itemProp="description">
                        {project.description}
                      </p>
                      
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} className={`text-[9px] font-mono font-semibold uppercase tracking-wider rounded px-1 py-0.5 transition-colors ${
                            theme === 'light'
                              ? 'text-stone-500 bg-stone-100 border border-stone-200/40'
                              : 'text-stone-400 bg-stone-800 border border-stone-750/60'
                          }`}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.title === 'Project Rudra' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onRudraSimOpen) onRudraSimOpen();
                          }}
                          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-2.5 py-1.5 rounded-md transition-all cursor-pointer w-fit"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          LAUNCH OSINT CONSOLE
                        </button>
                      )}
                    </div>

                    <div className={`absolute inset-0 bg-gradient-to-tr group-hover:scale-105 transition-all duration-500 z-0 ${
                      theme === 'light'
                        ? 'from-stone-200/40 to-stone-50/20'
                        : 'from-stone-900/40 to-stone-950/20'
                    } ${project.image ? 'hidden' : ''}`}></div>
                  </TagName>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
