import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultLines = [
  'RUDRA OSINT CORE // ONLINE // REVERSE_STREAM_ONLINE',
  'Initializing vector telemetry scans...',
  'All channels online. Type "help" to list available diagnostic vectors.'
];

const RudraSimulatorModal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState(defaultLines);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    let response = [];
    if (command === 'help') {
      response = [
        '--- DIAGNOSTIC VECTORS ---',
        '  probe --flights     Scan local aerospace telemetry.',
        '  scan --live-cctv    Ping active closed-circuit video feeds.',
        '  query --all         Request aggregate OSINT system diagnostics.',
        '  clear               Clear system logs.',
        '  exit                Close simulation.'
      ];
    } else if (command === 'probe --flights') {
      response = [
        'PROBING AIRSPACE TELEMETRY...',
        '  [AI-409] ALTITUDE: 32,000ft // LAT: 26.449 // LON: 80.331 // SPEED: 480kt // EN-ROUTE [DEL -> BOM]',
        '  [IB-912] ALTITUDE: 15,200ft // LAT: 26.512 // LON: 80.245 // SPEED: 210kt // APPROACH [KNP_EDGE]',
        'Telemetry scan complete. 2 vectors locked.'
      ];
    } else if (command === 'scan --live-cctv') {
      response = [
        'PINGING ACTIVE CAMERA VECTORS...',
        '  VECTOR_CCTV_01: STATUS_OK // AZAAD_NAGAR_CROSSING // RES: 1080p @ 60fps',
        '  VECTOR_CCTV_02: STATUS_OK // IIT_KANPUR_GATE // RES: 1440p @ 30fps',
        '  VECTOR_CCTV_03: ACCESS_REDACTED // MILITARY_BASE_OUTPOST',
        'Total active streams: 2/3 ping successfully.'
      ];
    } else if (command === 'query --all') {
      response = [
        'REQUESTING SYSTEM LOGS...',
        '  OSINT_MATRIX: ACTIVE',
        '  WEBGL_ACCELERATOR: ONLINE (FPS: 60)',
        '  LATENCY: 12ms // BUFFER: OK',
        '  INTEGRITY_SHIELD: 98.4% SECURE',
        'Diagnostics finished. Core parameters operating inside normal boundaries.'
      ];
    } else if (command === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (command === 'exit') {
      onClose();
      return;
    } else {
      response = [`Command not recognized: "${inputVal}". Type "help" for vectors.`];
    }

    setHistory(prev => [...prev, `tanis.gg/rudra> ${inputVal}`, ...response]);
    setInputVal('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-[6px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[640px] rounded-xl overflow-hidden border border-emerald-500/30 bg-[#020603] shadow-[0_0_35px_rgba(57,255,20,0.15)] relative font-mono text-emerald-400"
        >
          {/* Scanline & CRT Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.5)_100%)] z-20" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-20 animate-scanline" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 px-4 py-3 bg-[#030d06] relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wider">PROJECT_RUDRA // MISSION_COMMAND</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-emerald-500/10 text-emerald-500/60 hover:text-emerald-400 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Output log */}
          <div className="h-96 overflow-y-auto p-4 text-xs space-y-2 leading-relaxed custom-scrollbar relative z-10">
            {history.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {line.startsWith('tanis.gg') ? (
                  <span className="text-emerald-300 font-bold">{line}</span>
                ) : (
                  line
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input field */}
          <form onSubmit={handleCommand} className="border-t border-emerald-500/20 px-4 py-3 bg-[#030d06] flex items-center gap-2 relative z-10">
            <span className="text-emerald-300 font-bold shrink-0">tanis.gg/rudra&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-emerald-300 text-xs font-mono caret-emerald-300 placeholder-emerald-800"
              placeholder='Type "help" for system vectors...'
              autoFocus
            />
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RudraSimulatorModal;
