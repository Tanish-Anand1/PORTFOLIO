import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const disclosures = [
  {
    id: 'ADV-2026-001',
    title: 'Prompt Injection Sandbox Escape on AI Inference Mainframe',
    severity: 'CRITICAL',
    score: '9.8',
    status: 'RESOLVED',
    date: 'Feb 2026',
    disclosure: 'CONFIDENTIAL',
    outcome: 'NOT DISCLOSED',
    summary: 'Identified a prompt injection flaw that bypassed the host executor sandbox. This allowed escaping localized python runtime cages and accessing private environment tokens on the parent host.',
    poc: 'SYSTEM_COMMANDS_EXECUTE // bypass_agent_rules=true'
  },
  {
    id: 'ADV-2025-004',
    title: 'Cart Valuation Logic Bypass in Quick-Commerce Checkout API',
    severity: 'HIGH',
    score: '8.4',
    status: 'RESOLVED',
    date: 'Dec 2025',
    disclosure: 'PUBLIC',
    outcome: 'AWARDED',
    summary: 'Discovered a state mutation flow where cart totals could be arbitrarily manipulated by injecting negative float values into secondary item arrays on final payment checkout webhooks.',
    poc: 'POST /checkout { payload: [{ item_id: "X", price: -500.00 }] }'
  },
  {
    id: 'ADV-2025-002',
    title: 'OpenCV Frame Skip Bypass in Driver Drowsiness Detector',
    severity: 'MEDIUM',
    score: '6.1',
    status: 'PATCHED',
    date: 'Oct 2025',
    disclosure: 'PUBLIC',
    outcome: 'COMMUNITY',
    summary: 'Bypassed face boundary state tracker metrics by injecting rapid sequence frames which crashed sleep detection algorithms, resetting internal alert state parameters.',
    poc: 'FRAME_REFRESH_RATE_BURST // boundary_reset=1'
  }
];

const SecurityAdvisories = ({ theme }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="security" className="px-6 py-12 relative border-t border-[var(--border)] transition-colors duration-300" data-section="security-advisories" itemScope itemType="https://schema.org/ItemList">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
          <h2 className="text-[var(--foreground)] text-3xl font-bold font-serif">Security Advisories</h2>
          <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-0.5 w-fit uppercase font-semibold">
            SYSTEM_INTEGRITY: SECURE
          </span>
        </div>
        <p className="text-sm text-[var(--foreground)]/60 mb-8">
          Responsible vulnerability disclosures submitted and patched across external APIs and local sandboxes.
        </p>

        <div className="flex flex-col gap-4">
          {disclosures.map((adv) => {
            const isExpanded = expandedId === adv.id;
            const isCritical = adv.severity === 'CRITICAL';
            const isHigh = adv.severity === 'HIGH';

            return (
              <div 
                key={adv.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  theme === 'light'
                    ? 'bg-stone-50/50 border-stone-200/60 hover:bg-stone-50'
                    : 'bg-stone-900/20 border-stone-850 hover:bg-stone-900/40'
                }`}
              >
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(adv.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`advisory-${adv.id}`}
                  aria-label={`${adv.title}: ${adv.severity} ${adv.score}`}
                  className="w-full min-h-[44px] text-left p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--foreground)]/50 font-semibold">{adv.id}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black tracking-wide ${
                        isCritical
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : isHigh
                            ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {adv.severity} {adv.score}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded uppercase font-semibold">{adv.status}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--foreground)] group-hover:underline">{adv.title}</h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                    <div className="text-right font-mono text-xs">
                      <div className="text-[var(--foreground)]/40">OUTCOME</div>
                      <div className="font-semibold text-emerald-500">{adv.outcome}</div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="text-[var(--foreground)]/40">DISCLOSURE</div>
                      <div className="text-[var(--foreground)]">{adv.disclosure}</div>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div className="text-[var(--foreground)]/40">DISCLOSED</div>
                      <div className="text-[var(--foreground)]">{adv.date}</div>
                    </div>
                    <div className={`p-1.5 rounded-md border border-[var(--border)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      id={`advisory-${adv.id}`}
                      className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]/30"
                    >
                      <div className="p-5 font-mono text-xs space-y-4">
                        <div>
                          <span className="text-[var(--foreground)]/40 uppercase block mb-1">Impact Summary</span>
                          <p className="text-[var(--foreground)]/80 leading-relaxed font-sans text-sm">{adv.summary}</p>
                        </div>
                        <div>
                          <span className="text-red-400 uppercase block mb-1">Redacted proof of concept</span>
                          <pre className="p-3 rounded-lg bg-black text-red-500/80 border border-red-500/10 overflow-x-auto text-[11px] font-semibold leading-relaxed">
                            {adv.poc}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityAdvisories;
