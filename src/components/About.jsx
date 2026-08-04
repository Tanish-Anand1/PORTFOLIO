import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = ({ isRudraMode, theme }) => {
  const [bountyOpen, setBountyOpen] = useState(false);

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
                <span className="text-emerald-300 font-medium">IDENT:</span> Tanish Anand. Agent of craft. Operating across AI mainframe interfaces, quantized diffusion architectures, and localized Edge compute deployments.
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
                  Prolearn // Video pipeline engineer ($3.2M pre-seed Bangalore edtech) with Ravneet Singh.
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
            <section id="about" className="px-6 py-14 sm:py-20 relative transition-colors duration-300" data-section="about" itemScope itemType="https://schema.org/Person">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-[2.5rem] sm:text-5xl font-semibold font-serif tracking-tight text-[var(--foreground)] leading-[1.1]">Hey there!</h2>
                <div className="mt-6 text-[1.125rem] sm:text-xl text-[var(--foreground)]/85 space-y-5 leading-[1.7] max-w-[42rem]">
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
                      href="https://dpsazaadnagar.com/"
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
                    I'm obsessed with understanding intelligence: how to build it, accelerate it, and eventually define it.
                  </p>
                  <p>
                    Founder of{' '}
                    <span className="font-serif font-semibold text-[var(--foreground)]">CareLink</span>{' '}
                    and developer of{' '}
                    <span className="font-serif font-semibold text-[var(--foreground)]">Project Rudra</span>
                    <span className="text-[#39FF14] font-black font-serif select-none">.</span>{' '}
                    Right now I'm building the video pipeline at{' '}
                    <span className="font-serif font-semibold text-[var(--foreground)]">Prolearn</span>
                    . I build systems that have to work in the real world: offline, messy, and useful.
                  </p>
                  <p>
                    For fun, I break APIs, win hackathons, reverse engineer android, do research on the{' '}
                    <a
                      href="https://www.simulation-argument.com/simulation.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium text-[#B07D54] hover:text-[#96633D] transition-colors"
                    >
                      Simulation Hypothesis
                    </a>
                    , and play tennis.
                  </p>

                  <div className={`mt-10 flex flex-col gap-5 border-l-2 ${theme === 'light' ? 'border-stone-200' : 'border-stone-850'} pl-5 ml-1`}>
                    <div className="relative">
                      <div className="absolute -left-[23px] top-2 w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>Now</span>
                      <div className="font-medium text-[var(--foreground)] mt-1" itemProp="description">Building the video pipeline at Prolearn</div>
                      <div className="mt-1 text-sm text-[var(--foreground)]/65 font-mono">
                        Bangalore edtech · research on discrete text diffusion at IIT Kanpur
                      </div>
                    </div>
                    <div className="relative">
                      <div className={`absolute -left-[23px] top-2 w-2.5 h-2.5 rounded-full ${theme === 'light' ? 'bg-stone-300' : 'bg-stone-700'}`}></div>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>Previously</span>
                      <div className="mt-1 text-[var(--foreground)]/90">
                        <span className="font-serif font-semibold text-[var(--foreground)]">Project Rudra</span>
                        <span className="text-[#39FF14] font-black font-serif select-none">.</span> · EduCore · PhysicsGPT · ComplianceGuard · Anti-Sleep Pilot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* What I've been up to */}
            <section id="highlights" className="px-6 pb-14 sm:pb-20 relative border-t border-[var(--border)] transition-colors duration-300 pt-14 sm:pt-16">
              <div className="max-w-5xl mx-auto">
                <p className="text-[1.25rem] sm:text-2xl font-serif font-semibold tracking-tight text-[var(--foreground)] mb-6">
                  what i've been up to:
                </p>
                <ul className="list-disc pl-5 space-y-4 text-[1.05rem] sm:text-lg text-[var(--foreground)]/90 leading-[1.7] max-w-[42rem] marker:text-[var(--foreground)]/35">
                  <li>
                    currently building the video pipeline at{' '}
                    <span className="font-semibold text-[var(--foreground)]">Prolearn</span>
                    {' '}($3.2M pre-seed, Bangalore edtech) as an engineer, working with Ravneet Singh (founder of Prolearn and FC.one, former CTO of Vedantu)
                  </li>
                  <li>
                    research fellow at{' '}
                    <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      IIT Kanpur
                    </a>
                    , working on discrete text diffusion and Hindi NLP under{' '}
                    <a href="http://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      Prof. Adithya Vadapalli
                    </a>
                    {' '}(CSE dept.)
                  </li>
                  <li>
                    ranked <span className="font-semibold text-[var(--foreground)]">#1</span> across 3,500+ at{' '}
                    <a href="https://uniform2unicorn.polariscampus.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      Uniform2Unicorn
                    </a>
                    , India's Top Young Founder of the Year '26. won ₹1,00,000 cash, ₹10,00,000 in credits, and an exclusive dinner with{' '}
                    <a href="https://www.google.com/search?q=iqlipse+nova" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      Iqlipse Nova
                    </a>
                    {' '}
                    <span className="text-[var(--foreground)]/55">(team: Aditya Bhatia &amp; Pavitra Kushwaha)</span>
                  </li>
                  <li>
                    selected for{' '}
                    <a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      Y Combinator
                    </a>
                    {' '}Startup School India, 6% acceptance rate
                  </li>
                  <li>
                    top 20 builder in India out of 20,000+ at{' '}
                    <a href="https://vibecon.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[var(--foreground)]/25 hover:decoration-[var(--foreground)]/60">
                      VIBECON
                    </a>
                  </li>
                  <li>
                    won 15+ hackathons in the last 2 months, including ones from Google, OpenAI, and Cursor
                  </li>
                  <li>
                    won international robowars 8kg at Techfest '25 (IIT Bombay)
                    <span className="text-[var(--foreground)]/55"> (shoutout pavitra)</span>
                  </li>
                  <li>
                    independently found two significant security vulnerabilities: one in a major AI platform, one in a major quick-commerce platform's pricing API{' '}
                    <button
                      type="button"
                      onClick={() => setBountyOpen((v) => !v)}
                      className="text-indigo-500 hover:text-indigo-600 font-bold focus:outline-none cursor-pointer align-baseline"
                      title="Click to toggle bounty details"
                    >
                      [$]
                    </button>
                    {' '}a 5-figure and a 6-figure bounty, respectively.
                    <AnimatePresence>
                      {bountyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={`text-sm p-3 rounded-md mt-2 border overflow-hidden ${theme === 'light'
                              ? 'text-green-700 bg-green-50 border-green-200'
                              : 'text-green-300 bg-green-950/40 border-green-900/30'
                            }`}
                        >
                          Responsible disclosures submitted and patched. Prompt-injection sandbox escape on an AI inference platform; cart valuation logic bypass in a quick-commerce checkout API. Their engineering teams had mixed feelings.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                  <li>
                    built Project Rudra, EduCore, PhysicsGPT, ComplianceGuard, and Anti-Sleep Pilot: from OSINT grids to offline edge AI
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
