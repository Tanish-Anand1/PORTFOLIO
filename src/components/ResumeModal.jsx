import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-[8px] overflow-y-auto">
        
        {/* Style block to ensure perfect print outputs onto a single standard PDF page */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-resume-sheet, #printable-resume-sheet * {
              visibility: visible;
            }
            #printable-resume-sheet {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              max-width: 100%;
              box-shadow: none;
              border: none;
              padding: 0;
              margin: 0;
              background: white !important;
              color: black !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`w-full max-w-[850px] my-8 rounded-2xl shadow-2xl border overflow-hidden flex flex-col ${
            theme === 'light'
              ? 'bg-white border-stone-200 text-stone-850'
              : 'bg-stone-900 border-stone-800 text-stone-100'
          }`}
        >
          {/* Top floating bar - No print */}
          <div className="no-print flex items-center justify-between border-b border-[var(--border)] px-6 py-4 bg-[var(--surface)] relative z-10 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Curriculum Vitae // Previewer</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                PRINT / SAVE PDF
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 text-[var(--foreground)]/50 hover:text-[var(--foreground)] cursor-pointer border border-[var(--border)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Printable resume sheet */}
          <div 
            id="printable-resume-sheet"
            className="p-8 sm:p-10 font-sans overflow-y-auto max-h-[80vh] print:max-h-none print:overflow-visible flex flex-col gap-6"
            style={{ backgroundColor: theme === 'light' ? 'white' : '#1c1917' }}
          >
            {/* Header / Brand */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 print:border-black/10 border-[var(--border)]">
              <div>
                <h1 className="text-3xl font-extrabold font-serif tracking-tight text-[var(--foreground)] print:text-black">Tanish Anand</h1>
                <div className="text-xs font-mono font-bold tracking-widest text-indigo-500 uppercase mt-1">
                  Builder • Engineer • Security Researcher
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-col gap-x-4 gap-y-1 sm:text-right font-mono text-[11px] text-[var(--foreground)]/60 print:text-black/60 items-start sm:items-end justify-start sm:justify-end">
                <a href="mailto:atanish920@gmail.com" className="hover:underline flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  atanish920@gmail.com
                </a>
                <a href="https://github.com/Tanish-Anand1" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  github.com/Tanish-Anand1
                </a>
                <a href="https://linkedin.com/in/tanish-anand24" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  linkedin.com/in/tanish-anand24
                </a>
                <div className="flex items-center gap-1 text-[var(--foreground)]/45 print:text-black/45">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                  Kanpur, India
                </div>
              </div>
            </div>

            {/* Content Columns */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              
              {/* Left Column: Education & Tech Arsenal */}
              <div className="md:col-span-1 space-y-6">
                <div>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 uppercase mb-3 flex items-center gap-1.5 border-b pb-1.5 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                    </svg>
                    Education & Research
                  </h2>
                  <div className="space-y-4 font-sans text-xs">
                    <div className="relative pl-3 border-l border-indigo-500/30 print:border-black/10">
                      <span className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 print:bg-black" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">IIT Kanpur</div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/60 print:text-black/60 flex items-center gap-1.5 mt-0.5">
                        RESEARCH FELLOW
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-500 font-bold px-1 rounded uppercase tracking-wider scale-90 origin-left">NLP</span>
                      </div>
                      <div className="text-[10px] font-sans text-[var(--foreground)]/50 print:text-black/50 mt-1 leading-normal">
                        CSE Dept. / Working under <span className="text-blue-600 dark:text-blue-400 font-bold">Prof. Adithya Vadapalli</span>
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1">Present</div>
                    </div>

                    <div className="relative pl-3 border-l border-stone-200/30 print:border-black/5">
                      <span className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 print:bg-black" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">DPS Azaad Nagar</div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/60 print:text-black/60 flex items-center gap-1.5 mt-0.5">
                        CLASS XII STUDENT
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-1 rounded uppercase tracking-wider scale-90 origin-left">VIBECON TOP 20</span>
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1">2026</div>
                    </div>

                    <div className="relative pl-3 border-l border-stone-200/30 print:border-black/5">
                      <span className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 print:bg-black" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">Stanford University</div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/60 print:text-black/60 flex items-center gap-1.5 mt-0.5">
                        WANNABE
                        <span className="text-[9px] bg-[#8C1515]/10 text-[#8C1515] dark:text-rose-400 font-bold px-1 rounded uppercase tracking-wider scale-90 origin-left">ASPIRING</span>
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1">Aspiring 2030</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 uppercase mb-3 flex items-center gap-1.5 border-b pb-1.5 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Core Toolkits
                  </h2>
                  <div className="space-y-2.5 text-xs font-sans">
                    <div>
                      <span className="font-semibold block text-[var(--foreground)] print:text-black">AI & NLP:</span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px]">SEDD, LLaDA, PyTorch, discrete text diffusion, quantized edge inference.</span>
                    </div>
                    <div>
                      <span className="font-semibold block text-[var(--foreground)] print:text-black">Edge Hardware:</span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px]">Raspberry Pi setups, OpenCV computer vision, local inference deployment.</span>
                    </div>
                    <div>
                      <span className="font-semibold block text-[var(--foreground)] print:text-black">Web Engineering:</span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px]">React 19, Next.js, WebGL vector mapping, Tailwind CSS, API architectures.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Experience, Disclosures, & Projects */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 uppercase mb-3 flex items-center gap-1.5 border-b pb-1.5 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    Founding Experience
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-[var(--border)] print:border-black/10 bg-[var(--surface)]/30 print:bg-transparent relative transition-colors duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-base text-[var(--foreground)] print:text-black flex items-center gap-2">
                          Founder, CareLink
                          <span className="text-[9px] bg-green-500/10 text-green-500 font-bold px-1.5 py-0.5 rounded border border-green-500/20 font-mono tracking-wider">ACTIVE MVP</span>
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/40">2026 - PRES.</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        Coordinating hardware and WhatsApp-orchestrated care matrices for aging parents in tier-2 Indian regions. Built and launched a zero-code MVP serving localized family networks. Orchestrated automated sheets databases and care tracking signals.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 uppercase mb-3 flex items-center gap-1.5 border-b pb-1.5 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Responsible Security Disclosures
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 font-sans">
                    <div className="p-3.5 rounded-xl border border-[var(--border)] print:border-black/10 bg-[var(--surface)]/20 print:bg-transparent flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-mono font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">CVSS 9.8</span>
                          <span className="text-[9px] font-mono text-[var(--foreground)]/40 print:text-black/40">FEB 2026</span>
                        </div>
                        <h3 className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">Sandbox Escape</h3>
                        <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 mt-1 leading-relaxed">
                          Secured prompt injection execution escape by disclosing a sandbox runtime vulnerability to a major AI platform. Private bounty awarded.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[var(--border)] print:border-black/10 bg-[var(--surface)]/20 print:bg-transparent flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded">CVSS 8.4</span>
                          <span className="text-[9px] font-mono text-[var(--foreground)]/40 print:text-black/40">DEC 2025</span>
                        </div>
                        <h3 className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">API Logic Bypass</h3>
                        <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 mt-1 leading-relaxed">
                          Identified and patched a critical cart valuation mutability flaw in a major quick-commerce checkout API, preventing price tampering.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 uppercase mb-3 flex items-center gap-1.5 border-b pb-1.5 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                    </svg>
                    Key Projects & Hackathons
                  </h2>
                  <div className="space-y-3.5">
                    <div className="p-4 rounded-xl border border-[var(--border)] print:border-black/10 bg-[var(--surface)]/30 print:bg-transparent relative transition-colors duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black flex items-center gap-2">
                          Project Rudra OSINT Core
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono tracking-wider">60FPS WEBGL</span>
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/40">2026</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        GPU-accelerated global OSINT command grid integrating flight tracks, seismic sensors, marine channels, and live camera vectors inside an interactive WebGL matrix.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--border)] print:border-black/10 bg-[var(--surface)]/30 print:bg-transparent relative transition-colors duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black flex items-center gap-2">
                          Hackathon Champion
                          <span className="text-[9px] bg-amber-500/10 text-amber-600 font-bold px-1.5 py-0.5 rounded border border-amber-500/20 font-mono tracking-wider">15+ GOLD MEDALS</span>
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/40">2026</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        Swept 15+ major hackathons across North India in a 2-month burst. Designed, engineered, and pitched edge AI products (such as Anti-Sleep Pilot CV & EduCore solar device) to venture panels and expert juries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer citation */}
            <div className="border-t pt-4 text-center text-[10px] font-mono text-[var(--foreground)]/40 print:text-black/40 mt-4 uppercase">
              Generated via Portfolio Mainframe // Verified cryptographic print signature // tanish.gg
            </div>
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
