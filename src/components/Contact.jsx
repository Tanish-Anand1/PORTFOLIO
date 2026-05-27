import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = ({ isRudraMode }) => {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.h2 
          variants={fadeUp}
          className={`text-xl sm:text-2xl font-semibold tracking-tight mb-2 transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400 text-shadow-emerald' : 'text-white'
          }`}
        >
          Get in touch
        </motion.h2>
        <motion.p 
          variants={fadeUp} 
          className={`text-sm mb-8 leading-relaxed transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400/40' : 'text-white/35'
          }`}
        >
          Have a question, an idea, or just want to say hello?
        </motion.p>

        {/* Form */}
        <motion.form 
          variants={fadeUp}
          action="https://formsubmit.co/atanish920@gmail.com" 
          method="POST"
          className={`flex flex-col gap-6 p-6 sm:p-8 rounded-xl border bg-dark-surface transition-all duration-300 ${
            isRudraMode 
              ? 'border-emerald-500/15 shadow-emerald-500/[0.01]' 
              : 'border-dark-border'
          }`}
        >
          <input type="hidden" name="_subject" value="New Portfolio Message!" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="contact-name" 
                className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                  isRudraMode ? 'text-emerald-400/30' : 'text-white/25'
                }`}
              >
                Name
              </label>
              <input 
                type="text" 
                id="contact-name"
                name="name"
                required
                placeholder="Your name"
                className={`bg-transparent border-b px-0 py-2.5 text-sm placeholder-white/15 focus:outline-none transition-colors duration-200 ${
                  isRudraMode 
                    ? 'border-emerald-500/10 focus:border-emerald-400 text-emerald-300 placeholder-emerald-500/20' 
                    : 'border-dark-border focus:border-accent text-white'
                }`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="contact-email" 
                className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                  isRudraMode ? 'text-emerald-400/30' : 'text-white/25'
                }`}
              >
                Email
              </label>
              <input 
                type="email" 
                id="contact-email"
                name="email"
                required
                placeholder="you@example.com"
                className={`bg-transparent border-b px-0 py-2.5 text-sm placeholder-white/15 focus:outline-none transition-colors duration-200 ${
                  isRudraMode 
                    ? 'border-emerald-500/10 focus:border-emerald-400 text-emerald-300 placeholder-emerald-500/20' 
                    : 'border-dark-border focus:border-accent text-white'
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label 
              htmlFor="contact-message" 
              className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                isRudraMode ? 'text-emerald-400/30' : 'text-white/25'
              }`}
            >
              Message
            </label>
            <textarea 
              id="contact-message"
              name="message"
              required
              rows="4"
              placeholder="Hello Tanish..."
              className={`bg-transparent border-b px-0 py-2.5 text-sm placeholder-white/15 focus:outline-none transition-colors duration-200 resize-none ${
                isRudraMode 
                  ? 'border-emerald-500/10 focus:border-emerald-400 text-emerald-300 placeholder-emerald-500/20' 
                  : 'border-dark-border focus:border-accent text-white'
              }`}
            />
          </div>

          <div>
            <button 
              type="submit"
              className={`group inline-flex items-center gap-2 mt-1 px-5 py-2.5 text-sm font-medium rounded-lg active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10' 
                  : 'bg-white hover:bg-white/90 text-black shadow-sm'
              }`}
            >
              Send message
              <svg 
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </motion.form>
      </motion.div>

      {/* ── Footer ─────────────────────────── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`mt-20 pb-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
          isRudraMode ? 'border-emerald-500/10' : 'border-dark-border'
        }`}
      >
        <span className={`text-[11px] tracking-wide transition-colors duration-300 ${
          isRudraMode ? 'text-emerald-500/25' : 'text-white/20'
        }`}>
          © {new Date().getFullYear()} Tanish Anand
        </span>
        <div className="flex items-center gap-1">
          {[
            {
              href: 'https://github.com/Tanish-Anand1',
              label: 'GitHub',
              icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
            },
            {
              href: 'https://www.linkedin.com/in/tanish-anand24/',
              label: 'LinkedIn',
              icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
            },
            {
              href: 'mailto:atanish920@gmail.com',
              label: 'Email',
              icon: <><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" strokeWidth="1.5"/></>,
              noFill: true,
            },
          ].map(social => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className={`p-2 rounded-md transition-all duration-200 ${
                isRudraMode 
                  ? 'text-emerald-500/25 hover:text-emerald-300 hover:bg-emerald-500/5' 
                  : 'text-white/20 hover:text-white/50 hover:bg-white/5'
              }`}
              aria-label={social.label}
              title={social.label}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={social.noFill ? 'none' : 'currentColor'} strokeLinecap="round" strokeLinejoin="round">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
