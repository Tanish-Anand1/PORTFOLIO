import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
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
    className={`transition-all duration-300 ${isActive ? "text-emerald-400 rotate-90" : "text-white/40"}`}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

const navLinks = [
  { href: '#projects', label: 'projects' },
  { href: '#about', label: 'about' },
];

function App() {
  const [theme, setTheme] = useState('light'); // default to light to match stonebg
  const [isRudraMode, setIsRudraMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isRudraSimOpen, setIsRudraSimOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Synchronize dynamic body classes for dark/light/rudra
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('rudra', isRudraMode);
  }, [isRudraMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isRudraMode 
            ? scrolled ? 'bg-zinc-950/85 backdrop-blur-md border-b border-emerald-500/10' : 'bg-transparent'
            : scrolled 
              ? theme === 'light'
                ? 'bg-white/70 backdrop-blur-md border-b border-stone-200/40 shadow-sm'
                : 'bg-stone-900/70 backdrop-blur-md border-b border-stone-850/40 shadow-sm'
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            href="#" 
            className={`text-xl font-bold tracking-tighter hover:underline ${
              isRudraMode ? 'text-emerald-400 font-mono' : theme === 'light' ? 'text-stone-900 font-serif' : 'text-white font-serif'
            }`}
          >
            tanish.gg
            {isRudraMode && <span className="text-[10px] font-mono ml-2 border border-emerald-500/30 px-1 rounded bg-emerald-500/10 text-emerald-400">RUDRA</span>}
          </a>
          
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex gap-7 text-[0.95rem]">
              <a 
                href="#projects" 
                className={`hover:underline underline-offset-4 transition-all ${
                  isRudraMode ? 'text-emerald-400/80 hover:text-emerald-300 font-mono' : theme === 'light' ? 'text-stone-600 hover:text-stone-950 font-mono' : 'text-stone-300 hover:text-white font-mono'
                }`}
              >
                projects
              </a>
              <a 
                href="#about" 
                className={`hover:underline underline-offset-4 transition-all ${
                  isRudraMode ? 'text-emerald-400/80 hover:text-emerald-300 font-mono' : theme === 'light' ? 'text-stone-600 hover:text-stone-950 font-mono' : 'text-stone-300 hover:text-white font-mono'
                }`}
              >
                about
              </a>
              {!isRudraMode && (
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className={`hover:underline underline-offset-4 transition-all cursor-pointer ${
                    theme === 'light' ? 'text-stone-600 hover:text-stone-950 font-mono' : 'text-stone-300 hover:text-white font-mono'
                  }`}
                >
                  cv
                </button>
              )}
            </div>

            <div className={`w-px h-4 ${isRudraMode ? 'bg-emerald-500/10' : theme === 'light' ? 'bg-stone-200' : 'bg-stone-800'} mx-1`} />
            
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/60 hover:border-emerald-500/40 hover:text-emerald-300' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 hover:bg-stone-50 shadow-sm'
                    : 'border-stone-850 bg-stone-900 text-stone-500 hover:border-stone-700 hover:text-stone-200 hover:bg-stone-850'
              }`}
              title="Search and Commands (Ctrl+K)"
            >
              <CommandIcon />
              <span>⌘K</span>
            </button>

            {/* Rudra Tactical HUD toggle */}
            <button 
              onClick={toggleRudraMode}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' 
                  : theme === 'light'
                    ? 'hover:bg-stone-200/50 text-stone-400 hover:text-stone-700'
                    : 'hover:bg-stone-850 text-stone-500 hover:text-stone-200'
              }`}
              title="Toggle Tactical Rudra Mode (Alt+R)"
            >
              <TacticalRadarIcon isActive={isRudraMode} />
            </button>

            {/* Light / Dark Mode Toggle (disabled in Rudra Mode) */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'hover:bg-emerald-500/5 text-emerald-400/30' 
                  : theme === 'light'
                    ? 'hover:bg-stone-200/50 text-stone-400 hover:text-stone-700'
                    : 'hover:bg-stone-850 text-stone-500 hover:text-stone-200'
              }`}
              disabled={isRudraMode}
              title={isRudraMode ? "Theme locked in Tactical HUD mode" : "Toggle theme"}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="sm:hidden flex items-center gap-1">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400/60' : theme === 'light' ? 'text-stone-400 hover:text-stone-700' : 'text-stone-500 hover:text-stone-200'
              }`}
            >
              <CommandIcon />
            </button>
            <button 
              onClick={toggleRudraMode}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400' : theme === 'light' ? 'text-stone-400 hover:text-stone-700' : 'text-stone-500 hover:text-stone-200'
              }`}
            >
              <TacticalRadarIcon isActive={isRudraMode} />
            </button>
            <button 
              onClick={() => setMobileOpen(prev => !prev)}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400' : theme === 'light' ? 'text-stone-400 hover:text-stone-700' : 'text-stone-500 hover:text-stone-200'
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`sm:hidden overflow-hidden border-t ${
                isRudraMode 
                  ? 'border-emerald-500/20 bg-zinc-950/95 text-emerald-400' 
                  : theme === 'light'
                    ? 'border-stone-200 bg-white/95 text-stone-850'
                    : 'border-stone-850 bg-stone-900/95 text-stone-200'
              } backdrop-blur-md`}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                <a 
                  href="#projects" 
                  onClick={() => setMobileOpen(false)} 
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    isRudraMode 
                      ? 'hover:text-emerald-300 hover:bg-emerald-500/5' 
                      : theme === 'light'
                        ? 'hover:bg-stone-100 text-stone-700'
                        : 'hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  projects
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileOpen(false)} 
                  className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                    isRudraMode 
                      ? 'hover:text-emerald-300 hover:bg-emerald-500/5' 
                      : theme === 'light'
                        ? 'hover:bg-stone-100 text-stone-700'
                        : 'hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  about
                </a>
                {!isRudraMode && (
                  <button 
                    onClick={() => { setMobileOpen(false); setIsResumeOpen(true); }}
                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 text-left cursor-pointer ${
                      theme === 'light'
                        ? 'hover:bg-stone-100 text-stone-700'
                        : 'hover:bg-stone-800 text-stone-300'
                    }`}
                  >
                    cv
                  </button>
                )}
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
