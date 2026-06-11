import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Funds from './components/Funds';
import Blog from './components/Blog';
import Projects from './components/Projects';
import GithubContributions from './components/GithubContributions';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import SecurityAdvisories from './components/SecurityAdvisories';
import RudraSimulatorModal from './components/RudraSimulatorModal';
import ResumeModal from './components/ResumeModal';

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const CommandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TacticalRadarIcon = ({ isActive }) => (
  <svg 
    width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    className={`transition-all duration-300 ${isActive ? "text-emerald-400 rotate-90" : "rotate-0"}`}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

const navLinks = [
  { id: 'projects', label: 'projects' },
  { id: 'about', label: 'about' },
];

function App() {
  const [theme, setTheme] = useState('light'); // default to light to match stonebg
  const [isRudraMode, setIsRudraMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isRudraSimOpen, setIsRudraSimOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Scroll-spy tracking active section
  useEffect(() => {
    const sections = ['projects', 'about'];
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isRudraMode]);

  // Synchronize dynamic body classes for dark/light/rudra
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('rudra', isRudraMode);
  }, [isRudraMode]);



  // Keyboard shortcut listener: Cmd/Ctrl + K (Palette) & Alt + R (Rudra Mode)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.altKey && e.key === 'r') {
        e.preventDefault();
        setIsRudraMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    // If turning on light mode, deactivate Rudra mode for readability
    if (theme === 'dark') {
      setIsRudraMode(false);
    }
  }, [theme]);

  const toggleRudraMode = useCallback(() => {
    setIsRudraMode(prev => {
      const next = !prev;
      if (next) {
        setTheme('dark'); // Rudra requires dark mode
      } else {
        setTheme('light'); // Restore to standard light stonebg
      }
      return next;
    });
  }, []);

  return (
    <div className={`min-h-screen ${isRudraMode ? 'bg-[#020603] text-emerald-400 font-mono' : 'bg-[var(--bg)] text-[var(--foreground)] font-sans'} relative transition-colors duration-500`}>
      {/* ── Nav ─────────────────────────────── */}
      <motion.nav
        layout
        initial={{ y: -40, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto min-w-[300px] sm:min-w-[480px] md:min-w-[560px] border backdrop-blur-lg transition-colors duration-300 shadow-lg ${
          mobileOpen ? 'rounded-2xl p-4' : 'rounded-full py-1.5 pl-5 pr-2'
        } ${
          isRudraMode 
            ? 'bg-[#070e09]/85 border-emerald-500/20 shadow-[0_8px_32px_rgba(57,255,20,0.06)] text-emerald-400 font-mono' 
            : theme === 'light'
              ? 'bg-white/75 border-stone-200/60 shadow-[0_12px_30px_rgba(0,0,0,0.03)] text-stone-800 font-sans'
              : 'bg-stone-950/75 border-stone-850/60 shadow-[0_12px_32px_rgba(0,0,0,0.25)] text-stone-200 font-sans'
        }`}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between w-full h-9">
          <a 
            href="#" 
            className={`text-base font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1.5 ${
              isRudraMode ? 'text-emerald-400 font-mono' : theme === 'light' ? 'text-stone-900 font-serif' : 'text-white font-serif'
            }`}
          >
            <span>tanish.gg</span>
            {isRudraMode && <span className="text-[8px] font-mono border border-emerald-500/30 px-1 rounded bg-emerald-500/10 text-emerald-400 shrink-0">RUDRA</span>}
          </a>
          
          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-1">
            {[
              { id: 'projects', label: 'projects', action: null },
              { id: 'about', label: 'about', action: null },
              ...(!isRudraMode ? [{ id: 'cv', label: 'cv', action: () => setIsResumeOpen(true) }] : [])
            ].map((link, idx) => {
              const isScrollLink = link.id !== 'cv';
              const isActive = isScrollLink && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={isScrollLink ? `#${link.id}` : undefined}
                  onClick={link.action ? (e) => { e.preventDefault(); link.action(); } : undefined}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-350 cursor-pointer text-xs font-mono select-none ${
                    isActive 
                      ? isRudraMode 
                        ? 'text-emerald-300 font-bold font-mono' 
                        : 'text-[var(--foreground)] font-semibold'
                      : isRudraMode
                        ? 'text-emerald-500/60 hover:text-emerald-300'
                        : theme === 'light'
                          ? 'text-stone-500 hover:text-stone-900'
                          : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {hoveredIdx === idx && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isRudraMode 
                          ? 'bg-emerald-500/10 border border-emerald-500/20' 
                          : theme === 'light'
                            ? 'bg-stone-200/50'
                            : 'bg-stone-850/60'
                      }`}
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  {isActive && !isRudraMode && (
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      theme === 'light' ? 'bg-stone-900' : 'bg-white'
                    }`} />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Controls & Mobile Toggle */}
          <div className="flex items-center gap-1.5 pl-2">
            {/* Search (Cmd+K) */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`p-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/60 hover:border-emerald-500/40 hover:text-emerald-300' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 hover:bg-stone-50 shadow-sm'
                    : 'border-stone-850 bg-stone-900/60 text-stone-500 hover:border-stone-700 hover:text-stone-200 hover:bg-stone-850'
              }`}
              title="Search and Commands (Ctrl+K)"
            >
              <CommandIcon />
            </button>

            {/* Radar (Alt+R) */}
            <button 
              onClick={toggleRudraMode}
              className={`p-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white hover:border-stone-300 text-stone-400 hover:text-stone-700 shadow-sm'
                    : 'border-stone-850 bg-stone-900/60 hover:border-stone-700 text-stone-500 hover:text-stone-200 hover:bg-stone-850'
              }`}
              title="Toggle Tactical Rudra Mode (Alt+R)"
            >
              <TacticalRadarIcon isActive={isRudraMode} />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/10 text-emerald-400/20 cursor-not-allowed' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white hover:border-stone-300 text-stone-400 hover:text-stone-700 shadow-sm'
                    : 'border-stone-850 bg-stone-900/60 hover:border-stone-700 text-stone-500 hover:text-stone-200 hover:bg-stone-850'
              }`}
              disabled={isRudraMode}
              title={isRudraMode ? "Theme locked in Tactical HUD mode" : "Toggle theme"}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(prev => !prev)}
              className={`sm:hidden p-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white text-stone-400 hover:border-stone-750 hover:bg-stone-50 shadow-sm'
                    : 'border-stone-850 bg-stone-900/60 text-stone-500 hover:border-stone-250'
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer inside capsule */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`sm:hidden overflow-hidden w-full mt-3 border-t ${
                isRudraMode ? 'border-emerald-500/15' : theme === 'light' ? 'border-stone-200' : 'border-stone-850'
              }`}
            >
              <div className="flex flex-col gap-1 pt-3 pb-1 text-sm font-mono">
                {[
                  { id: 'projects', label: 'projects', action: null },
                  { id: 'about', label: 'about', action: null },
                  ...(!isRudraMode ? [{ id: 'cv', label: 'cv', action: () => setIsResumeOpen(true) }] : [])
                ].map((link) => (
                  <a 
                    key={link.id}
                    href={link.id !== 'cv' ? `#${link.id}` : undefined} 
                    onClick={link.action ? () => { setMobileOpen(false); link.action(); } : () => setMobileOpen(false)} 
                    className={`px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isRudraMode 
                        ? 'hover:text-emerald-300 hover:bg-emerald-500/5' 
                        : theme === 'light'
                          ? 'hover:bg-stone-100 text-stone-700 hover:text-stone-950'
                          : 'hover:bg-stone-850 text-stone-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Command Palette Menu overlay */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onRudraToggle={toggleRudraMode}
        isRudraMode={isRudraMode}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      {/* ── Main Content ───────────────────── */}
      {isRudraMode ? (
        <main className="w-full max-w-[1024px] mx-auto px-6 pt-14 relative z-10">
          <Hero isRudraMode={isRudraMode} onRudraClose={() => setIsRudraMode(false)} theme={theme} />
          <About isRudraMode={isRudraMode} theme={theme} />
          <Blog isRudraMode={isRudraMode} theme={theme} />
          <Projects isRudraMode={isRudraMode} theme={theme} />
          <GithubContributions isRudraMode={isRudraMode} theme={theme} />
          <Funds isRudraMode={isRudraMode} theme={theme} />
          <Contact isRudraMode={isRudraMode} theme={theme} />
        </main>
      ) : (
        <main className="w-full max-w-[1024px] mx-auto pt-20 pb-16 px-4 sm:px-6 relative z-10 transition-all duration-300">
          <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
            <Hero isRudraMode={isRudraMode} onRudraClose={() => setIsRudraMode(false)} theme={theme} />
            <About isRudraMode={isRudraMode} theme={theme} />
            <Blog isRudraMode={isRudraMode} theme={theme} />
            <Projects isRudraMode={isRudraMode} theme={theme} onRudraSimOpen={() => setIsRudraSimOpen(true)} />
            <SecurityAdvisories theme={theme} />
            <GithubContributions isRudraMode={isRudraMode} theme={theme} />
            <Funds isRudraMode={isRudraMode} theme={theme} />
            <Contact isRudraMode={isRudraMode} theme={theme} />
          </div>
        </main>
      )}

      {/* Modals & Simulation Overlays */}
      <RudraSimulatorModal isOpen={isRudraSimOpen} onClose={() => setIsRudraSimOpen(false)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} theme={theme} />
    </div>
  );
}

export default App;
