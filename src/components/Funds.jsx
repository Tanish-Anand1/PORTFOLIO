import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Funds = ({ isRudraMode, theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ledger breakdown data from ref
  const ledgerItems = [
    {
      name: 'Y Combinator',
      amountUsd: '$25,000',
      amountInr: '₹20,87,500',
      tags: ['Cohort Grant', 'Selected'],
      description: 'Seed funding received through selection into the Y Combinator Startup School cohort.'
    },
    {
      name: 'Redacted',
      amountUsd: '$9,750',
      amountInr: '₹8,14,125',
      tags: ['Pre-seed Angel', 'Committed (NDA)'],
      description: 'Private pre-seed backing from prominent angel investors and operators in the AI ecosystem.'
    },
    {
      name: 'Uniform2Unicorn',
      amountUsd: '$15,569',
      amountInr: '₹13,00,000',
      tags: ['Seed Funding', 'Awarded'],
      description: "Seed grant awarded for securing the #1 position as India's Top Young Founder of the Year '26."
    },
    {
      name: 'SparkX IIT Bombay',
      amountUsd: '$600',
      amountInr: '₹50,000',
      tags: ['Pitch Prize', 'Awarded'],
      description: 'Startup pitch competition prize money won under LumenSeed at IIT Bombay.'
    }
  ];

  return (
    <>
      <div className="relative">
        <AnimatePresence mode="wait">
          {isRudraMode ? (
            <motion.section
              key="rudra-funds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-16 sm:py-20 text-emerald-400 font-mono border-t border-emerald-500/20"
            >
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-400 text-shadow-emerald font-mono">
                  CAPITAL_RESERVES
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full text-left group block p-6 sm:p-8 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 bg-[#070e09] transition-all duration-300 relative overflow-hidden z-10 shadow-emerald-500/[0.01] cursor-pointer"
              >
                <div className="absolute right-4 top-4 text-[9px] font-mono text-emerald-500/30 uppercase tracking-widest">
                  VERIFIED // LEDGER
                </div>
                <span className="font-mono text-xs text-emerald-500/50 uppercase tracking-widest block mb-4">Total Funding &amp; Grants</span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-4xl font-bold font-mono text-emerald-400 tracking-tight sm:text-6xl">$43,015</span>
                  <span className="hidden sm:inline text-emerald-500/30 text-4xl">/</span>
                  <span className="text-2xl font-semibold text-emerald-500/60 tracking-tight sm:text-4xl">₹35.9 Lakhs</span>
                </div>
                <p className="font-mono text-sm text-emerald-500/40 mt-4 leading-relaxed font-mono">
                  across incubators, grants &amp; angel rounds.
                </p>
                <div className="mt-6 flex items-center gap-2 text-emerald-500/40 font-mono text-sm group-hover:text-emerald-300 group-hover:gap-3 transition-all duration-300">
                  <span>QUERY LEDGER</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </button>
            </motion.section>
          ) : (
            <motion.section
              key="elegant-funds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              id="funds"
              className="px-6 py-12 sm:py-16 relative border-t border-[var(--border)] transition-colors duration-300"
            >
              <div className="max-w-5xl mx-auto">
                <h1 className="text-[var(--foreground)] text-3xl font-bold font-serif mb-2">Capital Raised</h1>
                <div className={`w-16 h-0.5 ${theme === 'light' ? 'bg-stone-200' : 'bg-stone-850'} mb-8`}></div>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full text-left border rounded-2xl p-6 sm:p-10 transition-all duration-300 relative cursor-pointer group ${
                    theme === 'light'
                      ? 'border-stone-200 bg-stone-50/60 hover:bg-stone-50 hover:border-stone-300 shadow-sm'
                      : 'border-stone-850 bg-stone-900/20 hover:bg-stone-900/40 hover:border-stone-700 shadow-md'
                  }`}
                >
                  <span className="font-mono text-xs text-[var(--foreground)]/45 uppercase tracking-widest block mb-4">Total Funding &amp; Grants</span>
                  
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="text-4xl font-bold font-serif text-[var(--foreground)] tracking-tight sm:text-6xl">$43,015</span>
                    <span className={`hidden sm:inline font-serif text-4xl ${theme === 'light' ? 'text-stone-300' : 'text-stone-700'}`}>/</span>
                    <span className={`text-2xl font-semibold font-sans tracking-tight sm:text-4xl ${theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>₹35.9 Lakhs</span>
                  </div>
                  
                  <p className="font-mono text-sm text-[var(--foreground)]/50 mt-4 leading-relaxed">
                    across incubators, grants &amp; angel rounds.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-stone-400 font-mono text-sm group-hover:text-indigo-500 group-hover:gap-3 transition-all duration-300">
                    <span>view ledger</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Ledger Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-[10px] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-[840px] my-6 rounded-3xl shadow-2xl border overflow-hidden flex flex-col relative z-20 ${
                isRudraMode
                  ? 'bg-[#020603] border-emerald-500/30 text-emerald-400 font-mono'
                  : theme === 'light'
                    ? 'bg-[#faf9f6] border-stone-200/80 text-stone-850'
                    : 'bg-[#0f0e0d] border-stone-850/80 text-stone-100'
              }`}
            >
              {/* Modal Header */}
              <div className={`flex items-center justify-between border-b px-6 py-4 bg-transparent backdrop-blur-sm relative z-10 transition-colors duration-300 ${
                isRudraMode ? 'border-emerald-500/20' : theme === 'light' ? 'border-stone-200' : 'border-stone-850'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isRudraMode ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${isRudraMode ? 'text-emerald-500/80' : theme === 'light' ? 'text-stone-600' : 'text-stone-300'}`}>
                    {isRudraMode ? 'FINANCIALS_LEDGER // SECURE_REPORT' : 'Funding Ledger // Capital Report'}
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={`p-2 rounded-xl text-lg cursor-pointer border transition-all duration-200 ${
                    isRudraMode
                      ? 'border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500'
                      : theme === 'light'
                        ? 'border-stone-200 hover:bg-stone-200/50 text-stone-500 hover:text-stone-900'
                        : 'border-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 sm:p-10 overflow-y-auto max-h-[78vh] flex flex-col md:flex-row gap-10 sm:gap-14 text-left">
                {/* Stats Summary Column */}
                <div className="flex-1 flex flex-col gap-8 md:max-w-[280px]">
                  <div>
                    <h3 className={`text-xs tracking-[0.2em] font-mono mb-3 uppercase ${isRudraMode ? 'text-emerald-500/40' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>
                      CUMULATIVE FUNDS
                    </h3>
                    <div className={`font-bold text-3xl sm:text-4xl ${isRudraMode ? 'text-emerald-400' : `font-serif ${theme === 'light' ? 'text-stone-900' : 'text-stone-100'}`}`}>
                      $43,015 USD
                    </div>
                    <div className={`font-mono text-base mt-1.5 ${isRudraMode ? 'text-emerald-500/70' : theme === 'light' ? 'text-stone-500' : 'text-stone-400'}`}>
                      ₹35.9 Lakhs INR
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-xs tracking-[0.2em] font-mono mb-3 uppercase ${isRudraMode ? 'text-emerald-500/40' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>
                      TOTAL POOL
                    </h3>
                    <div className={`font-bold text-3xl sm:text-4xl ${isRudraMode ? 'text-emerald-400' : `font-serif ${theme === 'light' ? 'text-stone-900' : 'text-stone-100'}`}`}>
                      $50,919 USD
                    </div>
                    <div className={`font-mono text-base mt-1.5 ${isRudraMode ? 'text-emerald-500/70' : theme === 'light' ? 'text-stone-500' : 'text-stone-400'}`}>
                      ₹42.5 Lakhs INR
                    </div>
                    <p className={`text-[10px] font-mono mt-3 leading-normal ${isRudraMode ? 'text-emerald-500/30' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>
                      * Includes competitive grants, angel commitments, cohort rewards, and developer prize funds.
                    </p>
                  </div>

                  <div className={`pt-4 border-t ${isRudraMode ? 'border-emerald-500/10' : theme === 'light' ? 'border-stone-200' : 'border-stone-850'}`}>
                    <h3 className={`text-xs tracking-[0.2em] font-mono mb-2 uppercase ${isRudraMode ? 'text-emerald-500/40' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>
                      CONVERSION
                    </h3>
                    <div className={`text-[11px] font-mono ${isRudraMode ? 'text-emerald-500/55' : theme === 'light' ? 'text-stone-500' : 'text-stone-400'}`}>
                      1 USD = 83.5 INR (Fixed Index Rate)
                    </div>
                  </div>
                </div>

                {/* Ledger Items List Column */}
                <div className="flex-1 w-full">
                  <h3 className={`text-xs tracking-[0.2em] font-mono mb-6 uppercase ${isRudraMode ? 'text-emerald-500/40' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'}`}>
                    LEDGER BREAKDOWN
                  </h3>
                  <ul className="flex flex-col gap-6 font-mono text-sm">
                    {ledgerItems.map((item, idx) => (
                      <li 
                        key={idx} 
                        className={`pb-6 last:pb-0 border-b last:border-0 ${
                          isRudraMode ? 'border-emerald-500/10' : theme === 'light' ? 'border-stone-200' : 'border-stone-850'
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-4 mb-1.5">
                          <span className={`font-bold text-base ${isRudraMode ? 'text-emerald-400' : `font-serif ${theme === 'light' ? 'text-stone-900' : 'text-stone-100'}`}`}>
                            {item.name}
                          </span>
                          <span className={`text-xs shrink-0 font-medium ${isRudraMode ? 'text-emerald-400/80' : theme === 'light' ? 'text-stone-800' : 'text-stone-300'}`}>
                            {item.amountUsd} / {item.amountInr}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                isRudraMode 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : theme === 'light'
                                    ? 'bg-stone-200/50 text-stone-600 border border-stone-250'
                                    : 'bg-stone-850 text-stone-400 border border-stone-800'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className={`font-sans text-xs leading-relaxed ${isRudraMode ? 'text-emerald-500/50' : theme === 'light' ? 'text-stone-600' : 'text-stone-400'}`}>
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Funds;
