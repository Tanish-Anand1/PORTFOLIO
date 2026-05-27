import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

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
  { href: '#contact', label: 'contact' },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [isRudraMode, setIsRudraMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      }
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
      {/* Dynamic Backgrounds */}
      <div className="bg-grid-pattern" />
      <div className="ambient-glow" />

      {/* ── Nav ─────────────────────────────── */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-dark-bg/85 backdrop-blur-md border-b border-dark-border shadow-sm' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[720px] mx-auto px-6 h-14 flex items-center justify-between">
          <a 
            href="#" 
            className={`text-[15px] font-semibold tracking-tight transition-all duration-200 ${
              isRudraMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-white hover:opacity-60'
            }`}
          >
            tanish.
            {isRudraMode && <span className="text-[10px] font-mono ml-2 border border-emerald-500/30 px-1 rounded bg-emerald-500/10 text-emerald-400">RUDRA</span>}
          </a>
          
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1.5">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className={`px-2.5 py-1.5 text-[13px] rounded-md transition-all duration-200 ${
                  isRudraMode 
                    ? 'text-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-500/5' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-4 bg-dark-border mx-1.5" />
            
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] font-mono border transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400/60 hover:border-emerald-500/40 hover:text-emerald-300' 
                  : 'border-white/5 bg-white/[0.02] text-white/30 hover:border-white/10 hover:text-white/55'
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
                  : 'hover:bg-white/5 text-white/40 hover:text-white'
              }`}
              title="Toggle Tactical Rudra Mode (Alt+R)"
            >
              <TacticalRadarIcon isActive={isRudraMode} />
            </button>

            {/* Light / Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode 
                  ? 'hover:bg-emerald-500/5 text-emerald-400/30' 
                  : 'hover:bg-white/5 text-white/40 hover:text-white'
              }`}
              disabled={isRudraMode} // Rudra Mode locks dark environment
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
                isRudraMode ? 'text-emerald-400/60' : 'text-white/40 hover:text-white'
              }`}
            >
              <CommandIcon />
            </button>
            <button 
              onClick={toggleRudraMode}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400' : 'text-white/40 hover:text-white'
              }`}
            >
              <TacticalRadarIcon isActive={isRudraMode} />
            </button>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400/30' : 'text-white/40 hover:text-white'
              }`}
              disabled={isRudraMode}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button 
              onClick={() => setMobileOpen(prev => !prev)}
              className={`p-2 rounded-md transition-all duration-200 cursor-pointer ${
                isRudraMode ? 'text-emerald-400' : 'text-white/40 hover:text-white'
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
                  : 'border-dark-border bg-dark-bg/95 text-white'
              } backdrop-blur-md`}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setMobileOpen(false)} 
                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                      isRudraMode 
                        ? 'hover:text-emerald-300 hover:bg-emerald-500/5' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
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
      />

      {/* ── Main Content ───────────────────── */}
      <main className="max-w-[720px] mx-auto px-6 pt-14 relative z-10">
        <Hero isRudraMode={isRudraMode} onRudraClose={() => setIsRudraMode(false)} />
        <div className="section-divider" />
        <Projects isRudraMode={isRudraMode} />
        <div className="section-divider" />
        <About isRudraMode={isRudraMode} />
        <div className="section-divider" />
        <Contact isRudraMode={isRudraMode} />
      </main>
    </div>
  );
}

export default App;
