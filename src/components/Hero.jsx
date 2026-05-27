import { motion, AnimatePresence } from 'framer-motion';
import RudraTerminal from './RudraTerminal';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const Hero = ({ isRudraMode, onRudraClose }) => {
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        {/* Availability badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className={`inline-flex items-center gap-2 text-xs font-medium border rounded-full px-3 py-1.5 transition-all duration-300 ${
            isRudraMode 
              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400/80' 
              : 'bg-dark-surface border-dark-border text-white/40'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full pulse-soft ${isRudraMode ? "bg-emerald-400" : "bg-emerald-400"}`} />
            {isRudraMode ? "Rudra mainframe active // all systems operational" : "Open to opportunities"}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          variants={fadeUp}
          className={`text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400 text-shadow-emerald' : 'text-white'
          }`}
        >
          Tanish Anand
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={fadeUp}
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-[540px] transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400/60' : 'text-white/45'
          }`}
        >
          Developer & engineer building at the intersection of
          <span className={isRudraMode ? "text-emerald-300 font-medium" : "text-white/70"}> AI</span>,
          <span className={isRudraMode ? "text-emerald-300 font-medium" : "text-white/70"}> hardware</span>, and
          <span className={isRudraMode ? "text-emerald-300 font-medium" : "text-white/70"}> the web</span>.
        </motion.p>

        {/* Social links */}
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-1">
          {[
            {
              href: 'https://github.com/Tanish-Anand1',
              label: 'GitHub',
              icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
              fill: true,
            },
            {
              href: 'https://www.linkedin.com/in/tanish-anand24/',
              label: 'LinkedIn',
              icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
              fill: true,
            },
            {
              href: 'mailto:atanish920@gmail.com',
              label: 'Email',
              icon: <><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" strokeWidth="1.5"/></>,
              fill: false,
            },
          ].map(social => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                isRudraMode 
                  ? 'text-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-500/5' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
              aria-label={social.label}
              title={social.label}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={social.fill ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round">
                {social.icon}
              </svg>
            </a>
          ))}
        </motion.div>

        {/* Interactive Tactical Terminal */}
        <AnimatePresence>
          {isRudraMode && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden w-full relative z-20"
            >
              <RudraTerminal onClose={onRudraClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Hero;
