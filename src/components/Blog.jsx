import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blogs = [
  {
    id: 'text-diffusion-hindi',
    date: 'Oct 2025',
    tag: 'NLP RESEARCH',
    title: 'TEXT DIFFUSION VS AUTO-REGRESSIVE LLMS FOR HINDI NLP',
    subtitle: 'Research insights on Discrete Text Diffusion benchmarks (SEDD, LLaDA) from our CSE research group at IIT Kanpur.',
    paragraphs: [
      "Autoregressive language models (like standard GPTs) generate text sequentially, token-by-token from left to right. While this is highly effective for open-ended generation, it suffers from severe exposure bias and limits bidirectional planning. As a Research Fellow at IIT Kanpur working under the guidance of Prof. Adithya Vadapalli (CSE Dept.), I have been exploring a powerful alternative paradigm: Discrete Text Diffusion. Rather than generating text sequentially, discrete diffusion models (such as SEDD and LLaDA) begin with a sequence of completely masked tokens and iteratively denoise and refine all tokens in parallel. This enables bidirectional context awareness at every step, offering exciting advantages in structural constraints, non-monotonic editing, and fill-in-the-blank text synthesis.",
      "Our benchmarks on Hindi NLP datasets reveal that while autoregressive LLMs excel in fluid, open-ended generation, discrete text diffusion pipelines demonstrate superior latency scaling and higher accuracy on structured, grammatical reconstruction tasks. Generating highly grammatical Hindi requires robust syntactic and morphological agreement, which sequential models sometimes drop under long-range contexts. In contrast, parallel denoising resolves dependencies globally, resulting in tighter coherence. We are refining these training pipelines to scale to larger parameter limits.",
      "These findings open up brand-new engineering pathways for edge devices (such as our local EduCore Pi nodes) where low-latency inference is critical. By compressing parallel denoisers, we can build ultra-responsive regional AI models that do not rely on expensive network roundtrips. There is still substantial work to be done in optimizing noise schedules and vocabularies."
    ],
    linkedinCTA: "Discuss this research with me on LinkedIn",
    linkedinLink: "https://www.linkedin.com/in/tanish-anand24/"
  },
  {
    id: 'project-rudra-camera',
    date: 'Aug 2025',
    tag: 'SYSTEMS & OSINT',
    title: 'HOW I REVERSE ENGINEERED LIVE CAMERA STREAMS FOR PROJECT RUDRA...',
    subtitle: 'Establishment of sub-100ms video decoding loops and low-latency multiplexing pipelines directly into a WebGL-based radar sphere.',
    paragraphs: [
      "Project Rudra was born out of a desire to create a unified, high-performance global OSINT (Open Source Intelligence) monitoring matrix. To achieve a fluid, 60fps experience in a WebGL-based MapLibre environment, standard API polling was completely out of the question. We needed true real-time streaming data. The engineering challenge centered around reverse engineering public, unencrypted RTSP (Real-Time Streaming Protocol) camera streams, decoding H.264 video chunks at the edge, and repackaging them for efficient WebSocket multiplexing directly into WebGL canvas textures.",
      "By building a dedicated Node.js and Rust ingest worker, we bridged the gap between raw RTSP streams and the web browser. The ingest layer ingests raw streams, transcodes them on-the-fly into lightweight fragmented MP4 structures, and pushes them down to client browsers via high-concurrency WebRTC channels. In parallel, aerospace and marine telemetry feeds (including ADS-B flight transponders and AIS ship positioning) are processed via customized decoders to render thousands of coordinate nodes on the client-side at sub-100ms latency.",
      "Developing the WebGL coordinates buffer layer required optimizing memory allocations to avoid garbage collection spikes in Chrome. Each active aircraft or marine vector is represented as a dynamic vertex within a custom GPU buffer, allowing instant visual updates without rebuilding the DOM. The result is a unified interactive radar sphere that captures the live, mechanical pulse of our physical world."
    ],
    linkedinCTA: "Let's discuss OSINT telemetry on LinkedIn",
    linkedinLink: "https://www.linkedin.com/in/tanish-anand24/"
  }
];

const Blog = ({ isRudraMode, theme }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  if (isRudraMode) return null; // Rudra mode hides blog to focus on the HUD terminal

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate connection delay for premium feel
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedBlog(null);
    }
  };

  return (
    <section id="blog" className="px-6 py-12 sm:py-16 relative border-t border-[var(--border)] transition-colors duration-300" itemScope itemType="https://schema.org/Blog" data-section="blog">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[var(--foreground)] text-4xl font-bold font-serif">Blog</h2>
        <p className="mt-2 text-lg sm:text-xl text-[var(--foreground)]/70">
          Here's some writing about cool things I've done! Click on any article to read the full research notes.
        </p>
        
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <motion.div 
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-xl relative group overflow-hidden border flex flex-col justify-between min-h-[180px] shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                theme === 'light'
                  ? 'border-violet-200/80 bg-violet-500/[0.02] hover:bg-violet-500/[0.05]'
                  : 'border-violet-850/30 bg-violet-950/[0.04] hover:bg-violet-900/[0.15]'
              }`}
            >
              <div className="text-left flex flex-col gap-2 relative z-10">
                <span className={`text-[10px] font-mono w-fit rounded-md px-2.5 py-0.5 font-bold uppercase tracking-wider transition-all ${
                  theme === 'light'
                    ? 'bg-violet-100 text-violet-800'
                    : 'bg-violet-950/60 text-violet-300 border border-violet-800/30'
                }`} itemProp="datePublished">
                  {blog.date} • {blog.tag}
                </span>
                <h3 className={`text-xl sm:text-2xl font-semibold font-serif leading-tight mt-2.5 group-hover:underline underline-offset-4 decoration-violet-400 transition-colors ${
                  theme === 'light' ? 'text-stone-900' : 'text-stone-100'
                }`} itemProp="headline">
                  {blog.title}
                </h3>
                <p className="text-xs text-[var(--foreground)]/60 line-clamp-2 mt-2 leading-relaxed font-sans" itemProp="description">
                  {blog.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✉️ Premium Substack Newsletter Integration */}
        <div className={`mt-12 p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
          theme === 'light'
            ? 'bg-indigo-50/40 border-indigo-100/80 shadow-sm shadow-indigo-100/30'
            : 'bg-indigo-950/[0.04] border-indigo-900/20 shadow-xl'
        }`}>
          {/* Subtle accent light */}
          <div className="absolute -top-[120px] -right-[120px] w-[240px] h-[240px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <h3 className="text-xl font-bold font-serif text-[var(--foreground)] mb-1">Subscribe to Research Logs</h3>
            <p className="text-xs text-[var(--foreground)]/60 mb-4 leading-relaxed">
              Get raw telemetry, API security breakdowns, and discrete text diffusion research notes directly in your inbox. No spam.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cooper@stanf.gg"
                className={`px-4 py-2 text-xs rounded-lg border outline-none font-mono flex-1 transition-all ${
                  theme === 'light'
                    ? 'bg-white border-stone-200 text-stone-900 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
                    : 'bg-stone-900 border-stone-850 text-stone-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                }`}
              />
              <button
                type="submit"
                disabled={submitting || subscribed}
                className="px-4 py-2 text-xs font-mono font-bold bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition-all cursor-pointer disabled:opacity-75 shrink-0"
              >
                {subscribed ? 'SUBSCRIBED // INBOX_OK' : submitting ? 'CONNECTING...' : 'SUBSCRIBE'}
              </button>
            </form>
            
            <AnimatePresence>
              {subscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-mono text-emerald-500 mt-2 font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connection locked // Telemetry stream active!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 📖 Premium Reading Modal Overlay */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-[8px] overflow-y-auto" onClick={handleBackdropClick}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`w-full max-w-[720px] rounded-2xl shadow-2xl border overflow-hidden flex flex-col my-8 ${
                theme === 'light'
                  ? 'bg-white border-stone-200 text-stone-850'
                  : 'bg-stone-900 border-stone-800 text-stone-100'
              }`}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4 bg-[var(--surface)] relative z-10 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">{selectedBlog.tag} // Research Log</span>
                </div>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-1.5 rounded-lg hover:bg-stone-250/50 dark:hover:bg-stone-800 text-[var(--foreground)]/50 hover:text-[var(--foreground)] cursor-pointer border border-[var(--border)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Main Reading area */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh] flex flex-col gap-5">
                <div className="border-b border-[var(--border)] pb-4">
                  <span className="text-xs font-mono text-[var(--foreground)]/40 font-bold">{selectedBlog.date}</span>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--foreground)] tracking-tight mt-1 leading-tight">{selectedBlog.title}</h1>
                </div>

                <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[var(--foreground)]/80 font-sans">
                  {selectedBlog.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* LinkedIn Action CTA */}
                <div className={`mt-6 p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  theme === 'light'
                    ? 'bg-violet-50/50 border-violet-100'
                    : 'bg-violet-950/10 border-violet-900/30'
                }`}>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-serif text-[var(--foreground)]">Have feedback or want to collaborate?</h4>
                    <p className="text-xs text-[var(--foreground)]/60">Let's discuss next steps and research pathways on LinkedIn.</p>
                  </div>
                  
                  <a
                    href={selectedBlog.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-bold text-white bg-[#0077b5] hover:bg-[#006297] rounded-lg shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                  >
                    {/* LinkedIn icon svg */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    {selectedBlog.linkedinCTA}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
