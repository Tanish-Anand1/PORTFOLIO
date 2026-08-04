import { motion, AnimatePresence } from 'framer-motion';

/**
 * ATS-friendly resume:
 * - single column
 * - standard section headings
 * - plain English, no em dashes
 * - no multi-column grids, badges, or decorative chrome in the printable sheet
 */
const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 overflow-y-auto">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @media print {
            body * { visibility: hidden; }
            #printable-resume-sheet, #printable-resume-sheet * { visibility: visible !important; }
            #printable-resume-sheet {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: 8.5in !important;
              margin: 0 !important;
              padding: 0.5in !important;
              box-shadow: none !important;
              border: none !important;
              background: #fff !important;
              color: #000 !important;
              font-size: 11pt !important;
            }
            .no-print { display: none !important; }
          }
        `,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-[820px] my-6 bg-white text-black rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        >
          <div className="no-print flex items-center justify-between border-b border-stone-200 px-5 py-3 bg-stone-50">
            <span className="text-xs font-mono text-stone-600 uppercase tracking-wide">
              Resume | ATS format
            </span>
            <div className="flex items-center gap-2">
              <a
                href="/Tanish_Anand_Resume.txt"
                download
                className="px-3 py-1.5 text-xs font-mono border border-stone-300 hover:bg-stone-100"
              >
                Download .txt
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-mono bg-black text-white hover:bg-stone-800"
              >
                Print / PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-mono border border-stone-300 hover:bg-stone-100"
                aria-label="Close resume"
              >
                Close
              </button>
            </div>
          </div>

          <div
            id="printable-resume-sheet"
            className="p-8 sm:p-10 overflow-y-auto max-h-[82vh] print:max-h-none print:overflow-visible bg-white text-black font-sans leading-snug"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          >
            <header className="text-center border-b border-black pb-3 mb-4">
              <h1 className="text-[22pt] font-bold tracking-tight m-0">TANISH ANAND</h1>
              <p className="text-[10.5pt] mt-1 mb-0">Engineer, Founder, Research Fellow</p>
              <p className="text-[10pt] mt-1.5 mb-0">
                Kanpur, India · atanish920@gmail.com ·{' '}
                <a href="https://github.com/Tanish-Anand1" className="text-black underline">
                  github.com/Tanish-Anand1
                </a>{' '}
                ·{' '}
                <a href="https://linkedin.com/in/tanish-anand24" className="text-black underline">
                  linkedin.com/in/tanish-anand24
                </a>{' '}
                ·{' '}
                <a href="https://tanish.gg" className="text-black underline">
                  tanish.gg
                </a>
              </p>
            </header>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Summary
              </h2>
              <p className="text-[10.5pt] m-0">
                Engineer and founder working across AI, video systems, and web software. Currently an
                engineer on the video pipeline at Prolearn, a Bangalore edtech company with $3.2M in
                pre-seed funding. Research Fellow at IIT Kanpur focused on discrete text diffusion for
                Hindi NLP. Founder of CareLink. Background includes WebGL and OSINT systems, edge AI, and
                responsible security disclosure.
              </p>
            </section>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Experience
              </h2>

              <div className="mb-3">
                <div className="flex flex-wrap justify-between gap-x-3 text-[10.5pt]">
                  <p className="m-0 font-bold">Prolearn | Engineer, Video Pipeline</p>
                  <p className="m-0 whitespace-nowrap">2026 to Present</p>
                </div>
                <p className="m-0 text-[10pt] italic">Bangalore, India</p>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Build and maintain video pipeline infrastructure for educational content generation
                    and delivery.
                  </li>
                  <li>
                    Collaborate with Ravneet Singh (Founder of Prolearn and FC.one, former CTO of Vedantu)
                    on production video systems.
                  </li>
                </ul>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap justify-between gap-x-3 text-[10.5pt]">
                  <p className="m-0 font-bold">CareLink | Founder</p>
                  <p className="m-0 whitespace-nowrap">2026 to Present</p>
                </div>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Founded CareLink to help families coordinate care for aging parents in tier-2 Indian
                    cities.
                  </li>
                  <li>
                    Shipped a zero-code MVP using WhatsApp workflows, spreadsheet automation, and alert
                    routing.
                  </li>
                </ul>
              </div>

              <div className="mb-1">
                <div className="flex flex-wrap justify-between gap-x-3 text-[10.5pt]">
                  <p className="m-0 font-bold">IIT Kanpur | Research Fellow, Computer Science</p>
                  <p className="m-0 whitespace-nowrap">2026 to Present</p>
                </div>
                <p className="m-0 text-[10pt] italic">Advisor: Prof. Adithya Vadapalli</p>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Research discrete text diffusion models (SEDD, LLaDA) against autoregressive baselines
                    for Hindi NLP.
                  </li>
                  <li>
                    Study tokenization, noise schedules, and morphological agreement for Devanagari text.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Projects
              </h2>

              <div className="mb-2.5">
                <p className="m-0 text-[10.5pt] font-bold">
                  Project Rudra |{' '}
                  <a href="https://osirisai.live" className="text-black underline font-normal">
                    osirisai.live
                  </a>
                </p>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Built a GPU-accelerated OSINT interface that combines live RTSP camera feeds, ADS-B
                    flight data, and AIS marine tracking in a WebGL and MapLibre view.
                  </li>
                  <li>
                    Designed reconnecting ingest workers, fragmented MP4 remuxing, and typed-array buffer
                    reuse to reduce Chrome garbage-collection stutter on live feeds.
                  </li>
                </ul>
              </div>

              <div className="mb-2.5">
                <p className="m-0 text-[10.5pt] font-bold">EduCore</p>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Built a solar-powered offline learning device that runs quantized local models on a
                    Raspberry Pi for low-connectivity settings.
                  </li>
                </ul>
              </div>

              <div className="mb-1">
                <p className="m-0 text-[10.5pt] font-bold">
                  Additional projects: PhysicsGPT, ComplianceGuard, Anti-Sleep Pilot
                </p>
                <ul className="mt-1 mb-0 pl-5 text-[10.5pt] list-disc">
                  <li>
                    Built an offline physics tutor, a dual-LLM compliance auditor, and a real-time
                    computer vision drowsiness detector for hackathons and field demos.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Security Research
              </h2>
              <ul className="mt-0 mb-0 pl-5 text-[10.5pt] list-disc">
                <li>
                  Independently found and responsibly disclosed a prompt-injection sandbox escape on a
                  major AI inference platform. Received a five-figure bounty. CVSS 9.8.
                </li>
                <li>
                  Found and disclosed a cart valuation and pricing API bypass on a major quick-commerce
                  platform. Received a six-figure bounty. CVSS 8.4. Both issues were patched.
                </li>
              </ul>
            </section>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Education
              </h2>
              <div className="flex flex-wrap justify-between gap-x-3 text-[10.5pt]">
                <p className="m-0 font-bold">Delhi Public School (DPS) Azaad Nagar | Class XII</p>
                <p className="m-0 whitespace-nowrap">Expected 2026</p>
              </div>
              <p className="m-0 text-[10.5pt]">Kanpur, India</p>
            </section>

            <section className="mb-4">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Awards and Honors
              </h2>
              <ul className="mt-0 mb-0 pl-5 text-[10.5pt] list-disc">
                <li>
                  Ranked #1 out of 3,500+ at Uniform2Unicorn. Named India Top Young Founder of the Year
                  2026. Awarded Rs. 1,00,000 cash and Rs. 10,00,000 in credits, plus dinner with Iqlipse
                  Nova. Team: Aditya Bhatia and Pavitra Kushwaha.
                </li>
                <li>Selected for Y Combinator Startup School India (6% acceptance rate).</li>
                <li>Ranked in the top 20 builders in India out of 20,000+ at VIBECON.</li>
                <li>
                  Won 15+ hackathons in a two-month period, including events from Google, OpenAI, and
                  Cursor.
                </li>
                <li>Won International Robowars (8kg) at Techfest 2025, IIT Bombay.</li>
              </ul>
            </section>

            <section className="mb-0">
              <h2 className="text-[11pt] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
                Skills
              </h2>
              <p className="m-0 text-[10.5pt]">
                <span className="font-bold">Languages and frameworks:</span> Python, JavaScript,
                TypeScript, React, Next.js, PyTorch, Node.js
              </p>
              <p className="m-0 text-[10.5pt] mt-1">
                <span className="font-bold">AI and ML:</span> Discrete text diffusion (SEDD, LLaDA), NLP,
                model quantization (llama.cpp), computer vision (OpenCV), multi-agent LLM systems
              </p>
              <p className="m-0 text-[10.5pt] mt-1">
                <span className="font-bold">Systems:</span> WebGL, MapLibre, RTSP and video ingest,
                WebRTC, Raspberry Pi edge deployment, API security
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
