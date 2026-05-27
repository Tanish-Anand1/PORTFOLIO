import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RudraTerminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { text: 'RUDRA SECURE TERMINAL v6.6.6 [ACTIVE]', type: 'system' },
    { text: 'ISRO CARTOSAT-3 SAT-NET CONNECTION STABLE', type: 'system' },
    { text: 'Type "help" to list available mainframe sub-routines.', type: 'info' },
    { text: '', type: 'blank' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const args = trimmed.split(' ');
    const primaryCmd = args[0];

    const newHistory = [...history, { text: `Tanish@Rudra:~$ ${cmdStr}`, type: 'user' }];

    if (!trimmed) {
      setHistory([...newHistory, { text: '', type: 'blank' }]);
      return;
    }

    switch (primaryCmd) {
      case 'help':
        setHistory([
          ...newHistory,
          { text: 'Available Command Matrices:', type: 'header' },
          { text: '  sys        - Display RUDRA command grid telemetry & specs', type: 'info' },
          { text: '  whoami     - Access personal dossier of Agent Tanish Anand', type: 'info' },
          { text: '  projects   - Query engineering works index', type: 'info' },
          { text: '  skills     - Access tech stack mapping database', type: 'info' },
          { text: '  matrix     - Activate cyber digital rain stream', type: 'info' },
          { text: '  clear      - Clear terminal screen buffers', type: 'info' },
          { text: '  exit       - Terminate terminal session', type: 'info' }
        ]);
        break;

      case 'sys':
        setHistory([
          ...newHistory,
          { text: '==================================================', type: 'system' },
          { text: 'SYSTEM INTERFACE STATUS: APOCALYPSE DOOMSDAY SHIELD v6.6.6', type: 'system' },
          { text: '==================================================', type: 'system' },
          { text: 'HOST STATE: c:\\PROJECTS\\GOTHAM (Online)', type: 'info' },
          { text: 'OSINT CORRELATOR: MapLibre GL GPU WebGL Engine', type: 'info' },
          { text: 'ACTIVE THREAT CODES: 13 Tension Zones Monitor Stable', type: 'info' },
          { text: 'CCTV RELAY NETWORK: 2,000+ CCTV Camera Feeds Active', type: 'info' },
          { text: 'DATABASE NODES: Prisma Client / PostgreSQL Active', type: 'info' },
          { text: 'MODEL RATIO: Zero-Shot to Agentic AI matrix validated', type: 'info' },
          { text: 'VRAM USAGE: 24GB Peak CUDA capability operational', type: 'system' }
        ]);
        break;

      case 'whoami':
        setHistory([
          ...newHistory,
          { text: 'ACCESSING DOSSIER FOR: TANISH ANAND', type: 'header' },
          { text: '--------------------------------------------------', type: 'system' },
          { text: 'DESIGNATION: Creative Full-Stack Engineer / AI Specialist', type: 'info' },
          { text: 'CORE DIRECTIVE: Solve complex multi-disciplinary problems across software and hardware boundaries.', type: 'info' },
          { text: 'OPERATIONAL FOCUS:', type: 'info' },
          { text: '  - Scalable Web Applications & GPU-accelerated graphics (Vite, Next.js)', type: 'info' },
          { text: '  - Edge Computing & Hardware integration (Raspberry Pi, Quantized Models)', type: 'info' },
          { text: '  - Natural Language Processing & Text Diffusion Architectures', type: 'info' }
        ]);
        break;

      case 'projects':
        setHistory([
          ...newHistory,
          { text: 'PROJECT MAIN-GRID RECORDS:', type: 'header' },
          { text: '1. Project Rudra [OSIRIS] - GPU Global OSINT Command Dashboard (Next.js, MapLibre GL, WebGL)', type: 'system' },
          { text: '2. Text Diffusion vs AR - PhD Research bench-marking SEDD/LLaDA (Python, PyTorch, NLP)', type: 'system' },
          { text: '3. CareLink - Care coordination system for aging parents (WhatsApp + Google Sheets)', type: 'system' },
          { text: '4. EduCore - Quantized Phi-3 Mini solar offline learning device (Raspberry Pi, llama.cpp)', type: 'system' },
          { text: 'Type "project <num>" (e.g. "project 1") for specialized dossier.', type: 'info' }
        ]);
        break;

      case 'project':
        const num = parseInt(args[1]);
        if (num === 1) {
          setHistory([
            ...newHistory,
            { text: 'DOSSIER: PROJECT RUDRA [OSIRIS]', type: 'header' },
            { text: 'A GPU-powered OSINT threat assessment suite that aggregates commercial/military flights, maritime checkpoints, active fire hotspots, live CCTV cameras, and 24/7 global broadcasts into a custom WebGL MapLibre container. 100% keyless data resolution.', type: 'info' }
          ]);
        } else if (num === 2) {
          setHistory([
            ...newHistory,
            { text: 'DOSSIER: TEXT DIFFUSION VS AUTO-REGRESSIVE MODELS', type: 'header' },
            { text: 'A rigorous comparative study comparing discrete (SEDD, D3PM) and masked (LLaDA) text diffusion models against auto-regressive models (Mistral, LLaMA) on Indic language NLP tasks (summarization, judicial bail prediction, and translation).', type: 'info' }
          ]);
        } else if (num === 3) {
          setHistory([
            ...newHistory,
            { text: 'DOSSIER: CARELINK', type: 'header' },
            { text: 'A zero-code platform engineered for elderly parent care coordination in tier-2 Indian cities, leveraging simple interfaces like WhatsApp and Google Sheets to drive immediate usability and low technical friction.', type: 'info' }
          ]);
        } else if (num === 4) {
          setHistory([
            ...newHistory,
            { text: 'DOSSIER: EDUCORE', type: 'header' },
            { text: 'An offline-first, solar-powered learning hub for rural Indian classrooms. Hosts a fully quantized locally running Microsoft Phi-3 Mini model running on a Raspberry Pi using llama.cpp.', type: 'info' }
          ]);
        } else {
          setHistory([
            ...newHistory,
            { text: 'Invalid project index. Try "projects" to view indices.', type: 'error' }
          ]);
        }
        break;

      case 'skills':
        setHistory([
          ...newHistory,
          { text: 'TECHNOLOGY MAP SPECTRUM:', type: 'header' },
          { text: 'React/Next.js/TS  [========================] 96%', type: 'info' },
          { text: 'Python/PyTorch     [======================] 88%', type: 'info' },
          { text: 'WebGL/MapLibre     [====================] 80%', type: 'info' },
          { text: 'Edge Comp/RaspPi   [==================] 75%', type: 'info' },
          { text: 'NLP/Model FineTune [====================] 82%', type: 'info' }
        ]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'matrix':
        setHistory([
          ...newHistory,
          { text: '01010101010101010101010101010101010101010101010101010101010', type: 'system' },
          { text: '10011001100110011001100110011001100110011001100110011001100', type: 'system' },
          { text: 'TANISH_ANAND_MAINFRAME_SYSTEM_INTEGRATION_HACK_DETECTION_PASS', type: 'header' },
          { text: '01100110011001100110011001100110011001100110011001100110011', type: 'system' }
        ]);
        break;

      case 'exit':
        onClose();
        break;

      default:
        setHistory([
          ...newHistory,
          { text: `Rudra Command not recognized: "${trimmed}". Type "help" for mainframe command codes.`, type: 'error' }
        ]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputValue);
    setInputValue('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full rounded-xl border border-emerald-500/30 bg-black/90 p-4 font-mono shadow-2xl relative overflow-hidden rudra-glow"
      style={{ borderColor: 'rgba(57, 255, 20, 0.25)' }}
    >
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_100%)] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10 animate-scanline" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 text-xs text-emerald-400/60 mb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
          <span>SYS_GRID_CONSOLE // tanish_anand</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleCommand('help')}
            className="hover:text-emerald-300 transition-colors"
          >
            [HELP]
          </button>
          <button 
            onClick={onClose}
            className="hover:text-red-400 transition-colors text-red-500/80 ml-2"
          >
            [X_EXIT]
          </button>
        </div>
      </div>

      {/* Screen logs */}
      <div className="h-[240px] overflow-y-auto pr-1 flex flex-col gap-1 text-[13px] custom-scrollbar z-20 relative">
        {history.map((log, index) => {
          let style = 'text-emerald-400/85';
          if (log.type === 'system') style = 'text-emerald-400 font-bold';
          if (log.type === 'user') style = 'text-emerald-300 font-bold';
          if (log.type === 'header') style = 'text-emerald-300 font-extrabold tracking-wide uppercase border-b border-emerald-500/10 pb-0.5 mt-1';
          if (log.type === 'error') style = 'text-red-400/90 font-semibold';
          if (log.type === 'info') style = 'text-emerald-400/60';

          return (
            <div key={index} className={`${style} whitespace-pre-wrap leading-relaxed`}>
              {log.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick click suggestions (perfect for mobile or rapid checks!) */}
      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-emerald-500/10 select-none z-20 relative">
        {['sys', 'whoami', 'projects', 'skills', 'matrix', 'clear'].map(suggestion => (
          <button
            key={suggestion}
            onClick={() => handleCommand(suggestion)}
            className="text-[11px] px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400/60 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-2 pt-1.5 select-none z-20 relative">
        <span className="text-emerald-300 font-bold text-[13px]">Tanish@Rudra:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-[13px] caret-emerald-300"
          autoFocus
          placeholder="Enter command code..."
        />
        <button type="submit" className="hidden" />
      </form>
    </motion.div>
  );
};

export default RudraTerminal;
