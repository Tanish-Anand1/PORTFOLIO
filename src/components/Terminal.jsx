import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoundEffect } from '../hooks/useSoundEffect';

const Terminal = ({ isOpen, onClose, onHack }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'TanishOS v2.4.1 (Web Assembly Core)' },
    { type: 'system', text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { playTerminalType, playWoosh } = useSoundEffect();

  useEffect(() => {
    if (isOpen) {
      playWoosh();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, playWoosh]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'input', text: `root@tanish-os:~$ ${trimmed}` }]);

    let output = [];
    const command = trimmed.toLowerCase();

    if (command === 'help') {
      output = [
        'Available commands:',
        '  sudo whoami     - Display identity information',
        ' sudo show projects   - List hardware/AI active logs',
        ' sudo robotics - List Robotics active logs',
        '  clear      - Clear terminal output',
        '  exit       - Close TanishOS session',
      ];
    } else if (command === 'sudo whoami') {
      output = ['Tanish Anand. Hardware Hacker, Edge AI Architect, Game Developer.'];
    } else if (command === 'sudo show projects') {
      output = [
        'Fetching active deployment logs...',
        '==================================',
        '[SYS.01] CareLink        - Health MVP via WhatsApp Node',
        '[SYS.02] EduCore         - Offline Edge-LLM (Phi-3) hardware device',
        '[SYS.03] ComplianceGuard - Dual-LLM Audit Agent (Claude + Grok)',
        '[SYS.04] ORBIS 2045      - Low-cost inference architecture'
      ];
    } else if (command === 'clear') {
      setHistory([]);
      return;
    } else if (command === 'exit') {
      onClose();
      return;
    } else if (command === 'sudo rm -rf /' || command === 'sudo rm -rf') {
      output = ['FATAL_SYS_ERROR: Core architectural breach detected. Commencing lockdown...'];
      setTimeout(onHack, 1000);

    } else if (command === 'sudo robotics') {
      output = [
        'Fetching active deployment logs...',
        '==================================',
        '[SYS.01] Robowars        - Built with Precision  and Conquered the entire City',
        '[SYS.02] RoboSoccer         - #1 Team of RoboSoccer -- UNDEFEATED'
      ];
    } else {
      output = [`t-bash: ${trimmed}: command not found`];
    }

    setHistory(prev => [
      ...prev,
      ...output.map(text => ({ type: 'output', text }))
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      playTerminalType();
    } else if (e.key.length === 1) {
      playTerminalType();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-bg/60 backdrop-blur-md"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl h-[75vh] sm:h-[60vh] bg-[#0a0a0a] border border-white/20 rounded-xl shadow-[0_0_50px_rgba(34,211,238,0.1)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">root@tanishOS:~</span>
              <div className="w-12"></div>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm md:text-base text-neon-cyan leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="scanlines absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50"></div>

              {history.map((line, i) => (
                <div
                  key={i}
                  className={`mb-1 ${line.type === 'system' ? 'text-gray-400' : line.type === 'input' ? 'text-white' : 'text-neon-cyan/80'}`}
                >
                  {line.text}
                </div>
              ))}

              <div className="flex items-center mt-2">
                <span className="text-white mr-2">root@tanish-os:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none border-none flex-1 text-neon-cyan w-full font-mono caret-white"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
