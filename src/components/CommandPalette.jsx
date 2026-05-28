import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = ({ isOpen, onClose, onRudraToggle, isRudraMode, onThemeToggle, theme }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const actions = [
    {
      id: 'projects',
      title: 'Jump to Projects',
      subtitle: 'View my featured engineering works',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 17V7a2 2 0 0 1 2-2h4l2 3h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
        </svg>
      ),
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'about',
      title: 'Jump to About',
      subtitle: 'Read my story and background',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
      ),
      action: () => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      title: 'Jump to Contact',
      subtitle: 'Get in touch or hire me',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      ),
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'theme',
      title: 'Toggle Theme',
      subtitle: 'Switch between dark and light modes',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
      action: () => {
        onThemeToggle();
        onClose();
      },
    },
    {
      id: 'rudra',
      title: isRudraMode ? 'Deactivate Rudra Mode' : 'Activate Project Rudra HUD Mode',
      subtitle: isRudraMode ? 'Return to the sleek classic layout' : 'Transform the UI into a tactical hacking HUD',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isRudraMode ? "text-emerald-400" : ""}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      action: () => {
        onRudraToggle();
        onClose();
      },
    },
    {
      id: 'email',
      title: 'Copy Email Address',
      subtitle: 'atanish920@gmail.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      action: () => {
        navigator.clipboard.writeText('atanish920@gmail.com');
        alert('Copied atanish920@gmail.com to clipboard!');
        onClose();
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/Tanish-Anand1',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      action: () => {
        window.open('https://github.com/Tanish-Anand1', '_blank');
        onClose();
      },
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/tanish-anand24',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
        </svg>
      ),
      action: () => {
        window.open('https://www.linkedin.com/in/tanish-anand24/', '_blank');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  // Click outside to close
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-[4px]"
        >
          <motion.div
            initial={{ scale: 0.96, y: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -8, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            ref={containerRef}
            className={`w-full max-w-[540px] rounded-xl overflow-hidden shadow-2xl border ${
              isRudraMode 
                ? 'bg-zinc-950/95 border-emerald-500/20 shadow-[0_0_30px_rgba(57,255,20,0.05)] text-emerald-400' 
                : theme === 'light'
                  ? 'bg-white/95 border-stone-200 shadow-stone-200/50 text-stone-850'
                  : 'bg-stone-900/95 border-stone-800 shadow-black/80 text-stone-100'
            } backdrop-blur-xl`}
          >
            {/* Input bar */}
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b relative ${
              isRudraMode 
                ? 'border-emerald-500/10' 
                : theme === 'light'
                  ? 'border-stone-100'
                  : 'border-stone-800'
            }`}>
              <svg 
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={
                  isRudraMode 
                    ? "text-emerald-400" 
                    : theme === 'light'
                      ? "text-stone-400"
                      : "text-stone-500"
                }
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder={isRudraMode ? "System command matrix..." : "Search actions, sections, or links..."}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className={`w-full bg-transparent border-0 outline-none text-[14px] font-sans ${
                  isRudraMode 
                    ? 'text-emerald-300 placeholder-emerald-850' 
                    : theme === 'light'
                      ? 'text-stone-900 placeholder-stone-400'
                      : 'text-stone-100 placeholder-stone-500'
                }`}
              />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isRudraMode 
                  ? 'text-emerald-500/40 border-emerald-500/20 bg-emerald-500/5' 
                  : theme === 'light'
                    ? 'text-stone-400 border-stone-250 bg-stone-50'
                    : 'text-stone-500 border-stone-800 bg-stone-850'
              }`}>
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-[320px] overflow-y-auto py-2 px-2 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className={`py-8 text-center text-xs font-mono ${
                  isRudraMode ? 'text-emerald-500/40' : theme === 'light' ? 'text-stone-400' : 'text-stone-500'
                }`}>
                  No matching operations found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? isRudraMode 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : theme === 'light'
                              ? 'bg-stone-100 text-stone-900'
                              : 'bg-stone-800 text-stone-100'
                          : isRudraMode
                            ? 'text-emerald-500/60'
                            : theme === 'light'
                              ? 'text-stone-600 hover:text-stone-800'
                              : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md transition-colors ${
                        isSelected 
                          ? isRudraMode 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : theme === 'light'
                              ? 'bg-stone-200 text-stone-900'
                              : 'bg-stone-700 text-stone-100'
                          : isRudraMode 
                            ? 'bg-emerald-500/5 text-emerald-500/40' 
                            : theme === 'light'
                              ? 'bg-stone-50 text-stone-450'
                              : 'bg-stone-850/50 text-stone-500'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium transition-colors">
                          {item.title}
                        </div>
                        <div className={`text-[11px] truncate mt-0.5 ${
                          isSelected 
                            ? isRudraMode 
                              ? 'text-emerald-400/60' 
                              : theme === 'light'
                                ? 'text-stone-550'
                                : 'text-stone-300'
                            : isRudraMode 
                              ? 'text-emerald-500/30' 
                              : theme === 'light'
                                ? 'text-stone-400'
                                : 'text-stone-500'
                        }`}>
                          {item.subtitle}
                        </div>
                      </div>
                      {isSelected && (
                        <span className={`text-[10px] font-mono shrink-0 uppercase tracking-widest ${
                          isRudraMode 
                            ? 'text-emerald-500/60' 
                            : theme === 'light'
                              ? 'text-stone-400'
                              : 'text-stone-500'
                        }`}>
                          Select ↵
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
            
            {/* Command palette footer */}
            <div className={`px-4 py-2.5 border-t text-[10px] font-mono flex justify-between items-center ${
              isRudraMode 
                ? 'border-emerald-500/10 bg-emerald-500/[0.01] text-emerald-500/40' 
                : theme === 'light'
                  ? 'border-stone-100 bg-stone-50/50 text-stone-400'
                  : 'border-stone-850 bg-stone-900/50 text-stone-500'
            }`}>
              <div className="flex gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div>
                <span>{isRudraMode ? "[RUDRA V6.6.6]" : "Command Palette"}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
