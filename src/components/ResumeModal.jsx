import { motion, AnimatePresence } from 'framer-motion';

const ResumeModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Stagger animation configurations for premium entrance feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-[10px] overflow-y-auto">
        
        {/* Style block to ensure perfect print outputs onto a single standard PDF page */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-resume-sheet, #printable-resume-sheet * {
              visibility: visible !important;
            }
            #printable-resume-sheet {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
              background: white !important;
              color: black !important;
            }
            /* Reset dark mode components, glass borders and badges for paper printing */
            .print-border-reset {
              border: 1px solid rgba(0, 0, 0, 0.1) !important;
              border-radius: 8px !important;
              background: transparent !important;
              box-shadow: none !important;
            }
            .print-text-black {
              color: black !important;
            }
            .print-text-muted {
              color: rgba(0, 0, 0, 0.6) !important;
            }
            .print-bg-reset {
              background: transparent !important;
              border: 1px solid rgba(0, 0, 0, 0.1) !important;
            }
            .print-timeline-dot {
              background-color: black !important;
              border: none !important;
              box-shadow: none !important;
            }
            .print-timeline-line {
              border-left: 1px solid rgba(0, 0, 0, 0.15) !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}} />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-[880px] my-6 rounded-3xl shadow-2xl border overflow-hidden flex flex-col relative z-20 ${
            theme === 'light'
              ? 'bg-[#faf9f6] border-stone-200/80 text-stone-850'
              : 'bg-[#0f0e0d] border-stone-850/80 text-stone-100'
          }`}
        >
          {/* Subtle geometric glowing background mesh (On-screen only) */}
          <div className="no-print absolute inset-0 -z-10 pointer-events-none overflow-hidden opacity-30">
            <div className="absolute -top-[10%] -left-[10%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>

          {/* Top floating bar - No print */}
          <div className="no-print flex items-center justify-between border-b border-[var(--border)] px-6 py-4 bg-[var(--surface)]/70 backdrop-blur-sm relative z-10 transition-colors duration-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--foreground)]/65">
                Curriculum Vitae // Core System Interface
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl text-xs font-mono font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/25 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                PRINT / EXPORT PDF
              </button>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-stone-200/50 dark:hover:bg-stone-800 text-[var(--foreground)]/50 hover:text-[var(--foreground)] cursor-pointer border border-[var(--border)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Printable resume sheet */}
          <motion.div 
            id="printable-resume-sheet"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 sm:p-10 font-sans overflow-y-auto max-h-[82vh] print:max-h-none print:overflow-visible flex flex-col gap-6"
            style={{ backgroundColor: theme === 'light' ? '#faf9f6' : '#0f0e0d' }}
          >
            {/* Header / Brand */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 border-b pb-6 print:border-black/10 border-[var(--border)]"
            >
              <div>
                <h1 className="text-4xl font-extrabold font-serif tracking-tight text-[var(--foreground)] print:text-black">
                  Tanish Anand
                </h1>
                <div className="text-xs font-mono font-bold tracking-widest text-indigo-500 print:text-indigo-600 uppercase mt-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 no-print animate-pulse" />
                  Builder • Engineer • Security Researcher
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-col gap-x-4 gap-y-1.5 sm:text-right font-mono text-[11px] text-[var(--foreground)]/65 print:text-black/60 items-start sm:items-end justify-start sm:justify-end">
                <a href="mailto:atanish920@gmail.com" className="hover:text-indigo-500 hover:underline flex items-center gap-1.5 transition-colors">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  atanish920@gmail.com
                </a>
                <a href="https://github.com/Tanish-Anand1" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 hover:underline flex items-center gap-1.5 transition-colors">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  github.com/Tanish-Anand1
                </a>
                <a href="https://linkedin.com/in/tanish-anand24" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 hover:underline flex items-center gap-1.5 transition-colors">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  linkedin.com/in/tanish-anand24
                </a>
                <div className="flex items-center gap-1.5 text-[var(--foreground)]/50 print:text-black/50">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                  Kanpur, India
                </div>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              
              {/* Left Column: Education & Tech Arsenal */}
              <div className="md:col-span-1 space-y-6">
                
                {/* Education section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 print:text-indigo-750 uppercase mb-4 flex items-center gap-2 border-b pb-2 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                    </svg>
                    Education & Research
                  </h2>
                  <div className="space-y-4 font-sans text-xs">
                    
                    <div className="relative pl-4 border-l-2 border-indigo-500/20 print:border-black/10 print:border-l-[1px]">
                      <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 border-indigo-500 bg-[var(--surface)] print:bg-black print:border-black no-print" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">
                        IIT Kanpur
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/65 print:text-black/60 flex items-center gap-1.5 mt-0.5 font-bold">
                        RESEARCH FELLOW
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-500 font-bold px-1 py-0.2 rounded uppercase tracking-wider scale-95 origin-left print:border print:border-black/10">NLP</span>
                      </div>
                      <div className="text-[10px] font-sans text-[var(--foreground)]/60 print:text-black/50 mt-1 leading-normal font-medium">
                        CSE Dept. / Working under <a href="http://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline font-bold">Prof. Adithya Vadapalli</a>
                      </div>
                      <div className="text-[9px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1 font-semibold">2026 - Present</div>
                    </div>

                    <div className="relative pl-4 border-l-2 border-stone-200/20 dark:border-stone-850/30 print:border-black/10 print:border-l-[1px]">
                      <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 border-stone-400 bg-[var(--surface)] print:bg-black print:border-black no-print" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">
                        DPS Azaad Nagar
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/65 print:text-black/60 flex items-center gap-1.5 mt-0.5 font-bold">
                        CLASS XII STUDENT
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 font-bold px-1 py-0.2 rounded uppercase tracking-wider scale-95 origin-left print:border print:border-black/10 font-bold">TOP 20</span>
                      </div>
                      <div className="text-[9px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1 font-semibold">2026 Grad</div>
                    </div>

                    <div className="relative pl-4 border-l-2 border-stone-200/20 dark:border-stone-850/30 print:border-black/10 print:border-l-[1px]">
                      <div className="absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 border-stone-400 bg-[var(--surface)] print:bg-black print:border-black no-print" />
                      <div className="font-serif font-bold text-sm text-[var(--foreground)] print:text-black">
                        Stanford University
                      </div>
                      <div className="text-[10px] font-mono text-[var(--foreground)]/65 print:text-black/60 flex items-center gap-1.5 mt-0.5 font-bold">
                        WANNABE
                        <span className="text-[9px] bg-rose-500/10 text-rose-500 font-bold px-1 py-0.2 rounded uppercase tracking-wider scale-95 origin-left print:border print:border-black/10 font-bold">ASPIRANT</span>
                      </div>
                      <div className="text-[9px] font-mono text-[var(--foreground)]/45 print:text-black/45 mt-1 font-semibold">Target 2030</div>
                    </div>

                  </div>
                </motion.div>

                {/* Toolkits section */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 print:text-indigo-700 uppercase mb-4 flex items-center gap-2 border-b pb-2 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    Technical Core
                  </h2>
                  <div className="space-y-3 font-sans text-xs">
                    
                    <div className="p-3 rounded-xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/20 hover:bg-[var(--surface)]/40 transition-all duration-300">
                      <span className="font-mono font-bold block text-[var(--foreground)] print:text-black mb-1 flex items-center justify-between">
                        AI & NLP
                        <span className="text-[8px] border border-indigo-500/20 bg-indigo-500/5 px-1 py-0.2 rounded text-indigo-500 font-mono no-print">01</span>
                      </span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px] leading-relaxed block">
                        Discrete diffusion architectures (SEDD, LLaDA), PyTorch pipelines, LLM agent audits, model quantization (llama.cpp).
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/20 hover:bg-[var(--surface)]/40 transition-all duration-300">
                      <span className="font-mono font-bold block text-[var(--foreground)] print:text-black mb-1 flex items-center justify-between">
                        Edge Systems
                        <span className="text-[8px] border border-indigo-500/20 bg-indigo-500/5 px-1 py-0.2 rounded text-indigo-500 font-mono no-print">02</span>
                      </span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px] leading-relaxed block">
                        Raspberry Pi edge clusters, real-time Computer Vision pipelines, OpenCV models, localized solar node telemetry.
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/20 hover:bg-[var(--surface)]/40 transition-all duration-300">
                      <span className="font-mono font-bold block text-[var(--foreground)] print:text-black mb-1 flex items-center justify-between">
                        Full-Stack Dev
                        <span className="text-[8px] border border-indigo-500/20 bg-indigo-500/5 px-1 py-0.2 rounded text-indigo-500 font-mono no-print">03</span>
                      </span>
                      <span className="text-[var(--foreground)]/60 print:text-black/60 font-mono text-[10px] leading-relaxed block">
                        React 19, Next.js setups, WebGL rendering (MapLibre), Tailwind CSS v4 design tokens, high-performance API engineering.
                      </span>
                    </div>

                  </div>
                </motion.div>

              </div>
              
              {/* Right Column: Experience, Disclosures, & Projects */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Founding Experience */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 print:text-indigo-700 uppercase mb-4 flex items-center gap-2 border-b pb-2 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    Founding Initiative
                  </h2>
                  <div>
                    <div className="p-4 rounded-2xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/25 hover:bg-[var(--surface)]/50 transition-all duration-300 relative shadow-sm">
                      <div className="flex justify-between items-baseline mb-2">
                        <div>
                          <h3 className="font-serif font-extrabold text-base text-[var(--foreground)] print:text-black flex flex-wrap items-center gap-2">
                            Founder, CareLink
                            <span className="text-[9px] bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-2 py-0.5 rounded border border-green-500/20 font-mono tracking-wide no-print flex items-center gap-1 shrink-0">
                              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                              ACTIVE IN FIELD
                            </span>
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/45 font-bold">2026 - PRES.</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        Coordinating edge hardware and automated WhatsApp-orchestrated care matrices for aging parents in tier-2 Indian regions. Built and launched a robust zero-code MVP serving families, running automated spreadsheet databases and immediate alert routing pipelines.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Responsible Security Disclosures */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 print:text-indigo-700 uppercase mb-4 flex items-center gap-2 border-b pb-2 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Responsible Security Disclosures
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4 font-sans">
                    
                    <div className="p-4 rounded-2xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/20 hover:bg-[var(--surface)]/45 transition-all duration-300 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded no-print">CVSS 9.8</span>
                          <span className="text-[9px] font-mono text-[var(--foreground)]/40 print:text-black/40 font-bold font-bold">FEB 2026</span>
                        </div>
                        <h3 className="font-serif font-bold text-[14px] text-[var(--foreground)] print:text-black">AI Host Sandbox Escape</h3>
                        <p className="text-xs text-[var(--foreground)]/60 print:text-black/65 mt-1.5 leading-relaxed font-sans">
                          Secured prompt injection execution escape by identifying and disclosing a significant sandbox runtime vulnerability to a major AI platform. Private bounty awarded.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/20 hover:bg-[var(--surface)]/45 transition-all duration-300 flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded no-print">CVSS 8.4</span>
                          <span className="text-[9px] font-mono text-[var(--foreground)]/40 print:text-black/40 font-bold font-bold">DEC 2025</span>
                        </div>
                        <h3 className="font-serif font-bold text-[14px] text-[var(--foreground)] print:text-black">Commerce API Mutability</h3>
                        <p className="text-xs text-[var(--foreground)]/60 print:text-black/65 mt-1.5 leading-relaxed font-sans">
                          Identified and successfully patched a critical price-tampering cart valuation flaw in a major quick-commerce checkout endpoint, preventing pricing logic bypass.
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* Key Projects */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xs font-mono font-black tracking-widest text-indigo-500 print:text-indigo-700 uppercase mb-4 flex items-center gap-2 border-b pb-2 border-[var(--border)] print:border-black/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500 shrink-0">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                    </svg>
                    Key Projects & Hackathons
                  </h2>
                  <div className="space-y-4">
                    
                    <div className="p-4 rounded-2xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/25 hover:bg-[var(--surface)]/50 transition-all duration-300 relative shadow-sm">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-serif font-extrabold text-sm text-[var(--foreground)] print:text-black flex flex-wrap items-center gap-2">
                          Project Rudra OSINT Core
                          <span className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-0.5 rounded border border-indigo-500/20 font-mono tracking-wide no-print">60FPS WEBGL</span>
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/45 font-bold">2026</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        GPU-accelerated global OSINT monitoring console combining live aircraft radar positions, active marine vessels, seismic sensor frequencies, and real-time streams inside an interactive WebGL-mapped matrix.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl border border-[var(--border)] print-border-reset bg-[var(--surface)]/25 hover:bg-[var(--surface)]/50 transition-all duration-300 relative shadow-sm">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-serif font-extrabold text-sm text-[var(--foreground)] print:text-black flex flex-wrap items-center gap-2">
                          Hackathon Champion
                          <span className="text-[9px] bg-amber-500/10 text-amber-600 font-bold px-2 py-0.5 rounded border border-amber-500/20 font-mono tracking-wide no-print">15+ MEDALS</span>
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--foreground)]/50 print:text-black/45 font-bold">2026</span>
                      </div>
                      <p className="text-xs text-[var(--foreground)]/70 print:text-black/70 leading-relaxed font-sans">
                        Won 15+ major hackathons across North India in a 2-month burst. Designed, engineered, and successfully pitched complex edge AI hardware products (such as Anti-Sleep Pilot CV & solar-powered EduCore learning nodes) to panels of expert juries.
                      </p>
                    </div>

                  </div>
                </motion.div>

              </div>

            </div>

            {/* Footer citation */}
            <motion.div 
              variants={itemVariants}
              className="border-t pt-5 text-center text-[9px] font-mono text-[var(--foreground)]/45 print:text-black/40 mt-3 uppercase tracking-widest font-bold"
            >
              Cryptographically Verified // System Node [tanish.gg] // SECURE MAIN FRAME PREVIEW
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
