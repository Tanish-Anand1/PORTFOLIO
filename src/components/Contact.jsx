import { motion, AnimatePresence } from 'framer-motion';

const Contact = ({ isRudraMode, theme }) => {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isRudraMode ? (
          // Cyberpunk Rudra Mode Footer
          <motion.footer
            key="rudra-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-20 pb-8 pt-6 border-t border-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-emerald-500/40"
          >
            <span className="text-[11px] tracking-wide">
              © {new Date().getFullYear()} Tanish Anand // SECURE_STATION_ROOT
            </span>
            <div className="flex items-center gap-4 text-xs">
              <a href="mailto:atanish920@gmail.com" className="hover:text-emerald-300 hover:underline">
                EMAIL
              </a>
              <a href="https://github.com/Tanish-Anand1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 hover:underline">
                GITHUB
              </a>
              <a href="https://www.linkedin.com/in/tanish-anand24/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 hover:underline">
                LINKEDIN
              </a>
              <a href="https://x.com/sullaxive" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 hover:underline">
                X
              </a>
            </div>
          </motion.footer>
        ) : (
          // Elegant Target-styled White Minimal Footer
          <motion.div
            key="elegant-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pb-12 pt-8 relative border-t border-[var(--border)] transition-colors duration-300"
            itemScope
            itemType="https://schema.org/Person"
            data-section="contact"
          >
            <div className="mx-5">
              <div className={`max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t ${theme === 'light' ? 'border-stone-200/80' : 'border-stone-850'} pt-8`}>
                <div className="text-lg text-[var(--foreground)] font-serif font-semibold">
                  © 2026 Tanish Anand
                </div>
                <div className="flex gap-6 font-serif text-lg text-[var(--foreground)]/70">
                  <a
                    href="mailto:atanish920@gmail.com"
                    className={`hover:underline transition-colors ${
                      theme === 'light' ? 'hover:text-indigo-600' : 'hover:text-indigo-400'
                    }`}
                  >
                    Email
                  </a>
                  <a
                    href="https://github.com/Tanish-Anand1"
                    target="_blank"
                    rel="me noopener noreferrer"
                    itemProp="sameAs"
                    className={`hover:underline transition-colors ${
                      theme === 'light' ? 'hover:text-indigo-600' : 'hover:text-indigo-400'
                    }`}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tanish-anand24/"
                    target="_blank"
                    rel="me noopener noreferrer"
                    itemProp="sameAs"
                    className={`hover:underline transition-colors ${
                      theme === 'light' ? 'hover:text-indigo-600' : 'hover:text-indigo-400'
                    }`}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/sullaxive"
                    target="_blank"
                    rel="me noopener noreferrer"
                    itemProp="sameAs"
                    className={`hover:underline transition-colors ${
                      theme === 'light' ? 'hover:text-indigo-600' : 'hover:text-indigo-400'
                    }`}
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
