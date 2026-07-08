import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = {
  'Neural Mainframes': [
    { name: 'Discrete Text Diffusion', level: 'ADVANCED', sector: 'AI RESEARCH', metric: 90, description: 'Benchmarking continuous and discrete architectures (SEDD, LLaDA) on custom pipelines.' },
    { name: 'Quantization & fine-tuning', level: 'ADVANCED', sector: 'AI MAIN', metric: 85, description: 'Compressing models to 4-bit/8-bit precision (llama.cpp) and tuning custom physics datasets.' },
    { name: 'PyTorch & Neural Nets', level: 'EXPERT', sector: 'AI DEV', metric: 92, description: 'Designing deep networks, handling training loaders, and discrete optimization loops.' },
    { name: 'LLM Multi-Agent Audits', level: 'ADVANCED', sector: 'AI SAFETY', metric: 88, description: 'Building autonomous dual-LLM systems (Claude + Grok) for regulatory SOC 2 scans.' }
  ],
  'Edge & OSINT': [
    { name: 'Raspberry Pi Clusters', level: 'ADVANCED', sector: 'HARDWARE', metric: 85, description: 'Deploying solar edge arrays running quantized local inference nodes.' },
    { name: 'Computer Vision', level: 'EXPERT', sector: 'GRAPHICS', metric: 90, description: 'Real-time eye-tracking, OpenCV bounds validation, and drowsiness detection pipelines.' },
    { name: 'MapLibre GPU Rendering', level: 'ADVANCED', sector: 'GEOSPATIAL', metric: 82, description: 'Layering active ocean vessel signals, flight matrices, and radar charts in WebGL.' },
    { name: 'API Vulnerability Disclosures', level: 'SPECIALIST', sector: 'CYBERSEC', metric: 95, description: 'API reverse engineering, payload sandboxing execution escaping disclosures.' }
  ],
  'Systems & Web': [
    { name: 'Next.js & React 19', level: 'EXPERT', sector: 'FRONTEND', metric: 94, description: 'State orchestration, Framer Motion graphics, static routing optimizations.' },
    { name: 'Tailwind CSS v4', level: 'EXPERT', sector: 'STYLING', metric: 95, description: 'Responsive layouts, HSL design tokens, dynamic dark mode synchronizations.' },
    { name: 'WebGL & Vector Canvas', level: 'ADVANCED', sector: 'GRAPHICS', metric: 80, description: '60fps visual radar feeds, coordinate HUD rendering, dynamic math graphs.' },
    { name: 'WhatsApp API Integrations', level: 'ADVANCED', sector: 'SYSTEMS', metric: 88, description: 'CareLink WhatsApp automation webhooks, webhook processing queue matrices.' }
  ]
};

const About = ({ isRudraMode, theme }) => {
  const [bounty1Open, setBounty1Open] = useState(false);
  const [bounty2Open, setBounty2Open] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Neural Mainframes');

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isRudraMode ? (
          // Cyberpunk Rudra Mode About
          <motion.section
            key="rudra-about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-16 sm:py-20 text-emerald-400 font-mono"
          >
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 text-shadow-emerald border-b border-emerald-500/20 pb-2">
              SYSTEM_INTEL_REPORT
            </h2>

            <div className="flex flex-col gap-4 text-sm text-emerald-400/70">
              <p>
                <span className="text-emerald-300 font-medium">IDENT:</span> Tanish Anand — Agent of craft. Operating across AI mainframe interfaces, quantized diffusion architectures, and localized Edge compute deployments.
              </p>
              <p>
                <span className="text-emerald-300 font-medium">SECTORS:</span> Distributed neural inference pipelines (Hindi NLP models), 60fps WebGL command grids (Project Rudra), and autonomous dual-LLM audit systems.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-10 flex flex-col gap-5 border-l border-emerald-500/20 pl-5 ml-0.5">
              <div className="relative">
                <div className="absolute -left-[22px] top-[7px] w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-[#020603] pulse-soft" />
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">ACTIVE_PROJECTS</span>
                <p className="text-xs mt-1 leading-relaxed text-emerald-400/60 font-mono">
                  CareLink // Coordinating hardware+WhatsApp orchestrations for tier-2 regions.
                  <br />
                  NLP // Benchmarking discrete text diffusion (SEDD/LLaDA) vs Auto-regressive backbones.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-[22px] top-[7px] w-2 h-2 rounded-full bg-emerald-500/20 ring-[#020603]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500/30">ARCHIVED_LOGS</span>
                <p className="text-xs mt-1 leading-relaxed text-emerald-400/40">
                  Project Rudra (Osiris OSINT Grid) · Text Diffusion · EduCore · PhysicsGPT · ComplianceGuard · Anti-Sleep CV
                </p>
              </div>
            </div>
          </motion.section>
        ) : (
          // Elegant Target-styled White About
          <motion.div
            key="elegant-about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <section id="about" className="px-6 py-12 sm:py-16 relative transition-colors duration-300" data-section="about" itemScope itemType="https://schema.org/Person">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold font-serif text-[var(--foreground)]">Hey there!</h2>
                <div className="mt-5 text-xl text-[var(--foreground)]/90 space-y-4 leading-relaxed">
                  <p>
                    I'm <span className="font-serif font-semibold text-[var(--foreground)]" itemProp="name">Tanish Anand</span>, a builder,{' '}
                    <a
                      href="https://www.stanford.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline transition-all hover:-translate-y-0.5 text-[var(--foreground)]"
                    >
                      <span className="font-normal">wannabe</span>
                      <img src="/block-s-right.avif" alt="Stanford S Logo" width="28" height="28" className="h-7 w-auto inline-block align-middle animate-pulse duration-1000" />
                      <span className="text-[#8C1515] font-serif font-bold">Stanford</span>
                      <span className="font-normal">guy</span>
                    </a>
                    , and currently at{' '}
                    <a
                      href="https://dpsazaadnagarcom/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline transition-all hover:-translate-y-0.5 text-[var(--foreground)]"
                    >
                      <img src="/dps-logo.webp" alt="DPS Logo" width="20" height="20" loading="lazy" decoding="async" className="h-5 w-auto inline-block align-middle rounded-sm" />
                      <span className="text-green-600 font-serif font-bold">DPS</span>
                    </a>
                    .
                  </p>
                  <p>
                    I'm obsessed with understanding intelligence, how to build it, accelerate it, and eventually, define it.
                  </p>
                  <div className={`p-5 sm:p-6 my-6 rounded-2xl border shadow-sm font-playfair italic text-lg leading-relaxed transition-all duration-300 relative overflow-hidden text-left ${theme === 'light'
                      ? 'bg-[#fcf9f2] text-stone-850 border-stone-200/80 shadow-stone-100/50'
                      : 'bg-stone-900/30 text-stone-200 border-stone-850/60 shadow-black/20'
                    }`}>
                    {/* Exquisite left gradient accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/80 to-purple-500/80" />

                    <p className="pl-3">
                      Founder of{' '}
                      <span className="font-serif font-bold text-[var(--foreground)] hover:underline cursor-pointer not-italic">CareLink</span>{' '}
                      and developer of{' '}
                      <span className="font-serif font-bold text-[var(--foreground)] hover:underline not-italic">Project Rudra</span>
                      <span className="not-italic text-[#39FF14] font-black font-serif select-none">.</span> My ultimate goal is to engineer the systems that define the next era of{' '}
                      <a
                        href="https://www.google.com/search?q=Silicon+Valley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 font-bold hover:underline transition-colors not-italic"
                      >
                        Silicon Valley
                      </a>
                      .
                    </p>
                  </div>
                  <p>
                    For fun, I break APIs, win hackathons, reverse engineer android, do research on the{' '}
                    <a
                      href="https://www.simulation-argument.com/simulation.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold text-[#B07D54] hover:text-[#96633D] transition-colors"
                    >
                      Simulation Hypothesis
                    </a>
                    , and play tennis.
                  </p>

                  <div className={`mt-8 flex flex-col gap-4 border-l-2 ${theme === 'light' ? 'border-stone-200' : 'border-stone-850'} pl-4 ml-1`}>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className={`text-sm font-semibold uppercase tracking-wide ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>Now</span>
                      <div className="font-semibold text-[var(--foreground)]" itemProp="description">Building CareLink — care coordination for aging parents in India</div>
                      <div className="mt-1 text-sm text-[var(--foreground)]/70 font-mono">
                        Exploring NLP and benchmarking discrete text diffusion pipelines
                      </div>
                    </div>
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full ${theme === 'light' ? 'bg-stone-300' : 'bg-stone-700'}`}></div>
                      <span className={`text-sm font-semibold uppercase tracking-wide ${theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>DID</span>
                      <div>
                        <span className="font-playfair font-semibold text-[var(--foreground)]">Project Rudra</span>
                        <span className="text-[#39FF14] font-black font-serif select-none">.</span> · EduCore · PhysicsGPT · ComplianceGuard · Anti-Sleep Pilot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 🛠️ Dynamic Tech Arsenal Segmented Grid */}
            <section id="tech-arsenal" className="px-6 py-12 relative border-t border-[var(--border)] transition-colors duration-300">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-[var(--foreground)] text-3xl font-bold font-serif mb-2">Tech Arsenal</h2>
                <p className="text-sm text-[var(--foreground)]/60 mb-6">
                  Quantified system specifications and specialized edge toolkits.
                </p>

                {/* Categorized segment selector */}
                <div className="flex flex-wrap gap-2 p-1 rounded-lg bg-[var(--bg)] border border-[var(--border)] w-fit mb-8 transition-colors duration-300">
                  {['Neural Mainframes', 'Edge & OSINT', 'Systems & Web'].map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-1.5 rounded-md text-xs font-mono font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer ${activeCategory === category
                          ? theme === 'light'
                            ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                            : 'bg-stone-800 text-stone-100 border border-stone-700'
                          : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Category Grid */}
                <motion.div
                  layout
                  className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {skillsData[activeCategory].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${theme === 'light'
                            ? 'bg-stone-50/50 border-stone-200/60 hover:bg-stone-50'
                            : 'bg-stone-900/20 border-stone-850 hover:bg-stone-900/40'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono tracking-wider text-[var(--foreground)]/40 font-semibold uppercase">{skill.level}</span>
                            <span className="text-[10px] font-mono text-indigo-500 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase">{skill.sector}</span>
                          </div>
                          <h3 className="text-lg font-semibold font-serif text-[var(--foreground)] mb-1">{skill.name}</h3>
                          <p className="text-xs text-[var(--foreground)]/60 leading-relaxed mb-4">{skill.description}</p>
                        </div>

                        {/* Metric bar */}
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-[var(--foreground)]/40 mb-1">
                            <span>OPERATIONAL_STAT</span>
                            <span>{skill.metric}%</span>
                          </div>
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-stone-200' : 'bg-stone-800'}`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.metric}%` }}
                              transition={{ duration: 0.8, delay: index * 0.05 }}
                              className="h-full bg-indigo-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </section>

            {/* Highlights list from comfest-2025 */}
            <section id="highlights" className="px-6 pb-12 sm:pb-16 relative border-t border-[var(--border)] transition-colors duration-300">
              <div className="max-w-5xl mx-auto">
                <p className="text-xl text-[var(--foreground)]/90 mb-2">Here are the coolest things I've done:</p>
                <div className={`w-16 h-0.5 ${theme === 'light' ? 'bg-stone-200' : 'bg-stone-850'} mb-6`}></div>
                <ul className="gap-3 flex flex-col text-lg text-[var(--foreground)]/90">
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-base leading-none transition-all ${theme === 'light' ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-950/60 text-yellow-300 border border-yellow-900/30'
                        }`}>
                        🦄
                      </div>
                    </span>
                    <span>
                      <span className={`font-bold ${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'}`}>#1</span> across 3,500+, India's <span className="font-bold">Top Young Founder of the Year '26</span> at <a href="https://uniform2unicorn.polariscampus.com/" target="_blank" rel="noopener noreferrer" className={`font-bold hover:underline ${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'}`}>Uniform2Unicorn</a> won ₹1,00,000 + ₹10,00,000 in credits & an exclusive dinner with <a href="https://www.google.com/search?q=iqlipse+nova" target="_blank" rel="noopener noreferrer" className={`font-medium transition-colors underline decoration-stone-400/50 ${theme === 'light' ? 'text-stone-500 hover:text-stone-750' : 'text-stone-400 hover:text-stone-200'}`}>Iqlipse Nova</a> <span className={`text-sm font-normal ${theme === 'light' ? 'text-stone-450' : 'text-stone-500'}`}>(special thanks to the team: Aditya Bhatia & Pavitra Kushwaha)</span>
                    </span>                                    
                  </li>                                                                        
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-950/60 text-blue-300 border border-blue-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.15V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
                        </svg>
                      </div>
                    </span>                                   
                    <span>                                                                                 
                      Research Fellow at IIT Kanpur under <a href="http://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Prof. Adithya Vadapalli</a> (CSE Dept.)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[13px] leading-none shrink-0 font-sans transition-all ${theme === 'light' ? 'bg-[#FF6600] text-white' : 'bg-[#FF6600]/10 text-[#FF6600] border border-[#FF6600]/30'
                        }`}>
                        Y
                      </div>
                    </span>
                    <span>
                      Selected for <a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer" className="text-[#FF6600] font-bold hover:underline">Y Combinator</a> Startup School.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <img src="/vibecon-logo.png" alt="VibeCon Logo" width="24" height="24" loading="lazy" decoding="async" className="h-6 w-auto object-contain rounded-sm" />
                    </span>
                    <span>
                      Ranked in the top 20 builders across India out of 20,000+ applicants at{' '}
                      <a href="https://vibecon.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:underline">
                        VIBECON
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-purple-100 text-purple-700' : 'bg-purple-950/60 text-purple-300 border border-purple-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                      </div>
                    </span>
                    <span>
                      Pitched real-time computer vision drowsiness detection systems at HACKSHODH 2026.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-950/60 text-red-300 border border-red-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                      </div>
                    </span>
                    <span>
                      Independently identified a significant API security vulnerability in an AI platform{' '}
                      <button
                        onClick={() => setBounty1Open(!bounty1Open)}
                        className="text-indigo-500 hover:text-indigo-600 font-bold focus:outline-none cursor-pointer align-baseline text-lg"
                        title="Click to toggle bounty details"
                      >
                        $
                      </button>
                      <AnimatePresence>
                        {bounty1Open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={`text-sm p-2.5 rounded-md mt-1.5 border transition-all ${theme === 'light'
                                ? 'text-green-700 bg-green-50 border-green-200'
                                : 'text-green-300 bg-green-950/40 border-green-900/30'
                              }`}
                          >
                            Responsible disclosure submitted successfully. Secured sandbox execution escape through a prompt injection flaw. Private bounty awarded.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-950/60 text-green-300 border border-green-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
                        </svg>
                      </div>
                    </span>
                    <span>
                      Discovered a pricing logic vulnerability in a major quick-commerce API{' '}
                      <button
                        onClick={() => setBounty2Open(!bounty2Open)}
                        className="text-indigo-500 hover:text-indigo-600 font-bold focus:outline-none cursor-pointer align-baseline text-lg"
                        title="Click to toggle bounty details"
                      >
                        $
                      </button>
                      <AnimatePresence>
                        {bounty2Open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={`text-sm p-2.5 rounded-md mt-1.5 border transition-all ${theme === 'light'
                                ? 'text-green-700 bg-green-50 border-green-200'
                                : 'text-green-300 bg-green-950/40 border-green-900/30'
                              }`}
                          >
                            Vulnerability disclosed to the vendor under strict guidelines. The flaw allowed unauthorized cart value alterations in the state checkout endpoint. Fixed immediately.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-950/60 text-yellow-300 border border-yellow-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                        </svg>
                      </div>
                    </span>
                    <span>
                      Won 15+ hackathons across North India in the last 2 months.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 w-6 h-6 flex-shrink-0 flex items-center justify-center text-xl">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-all ${theme === 'light' ? 'bg-rose-100 text-rose-700' : 'bg-rose-950/60 text-rose-300 border border-rose-900/30'
                        }`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z" />
                        </svg>
                      </div>
                    </span>
                    <span>
                      Built decentralized local LLM assistants using quantized Phi-3 Mini models.
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
