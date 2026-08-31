import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import InvestorProjectCard from './InvestorProjectCard';
import SecurityAdvisories from './SecurityAdvisories';
import TractionBar from './TractionBar';

const investorProjects = [
  {
    title: 'Vivacity',
    role: 'Co-founder & CTO',
    dateRange: '2026 to present',
    description:
      'Near-real-time video infrastructure for LLMs. Vivacity turns prompts, documents, and AI answers into mathematically exact, narrated explainer videos through an API-first pipeline for EdTech platforms, AI agents, and creator pipelines. The Scene IR pipeline supports English, Hindi, and Hinglish narration, with short renders around ₹7 (~$0.08) so chatbots can call it at volume.',
    stats: [
      { value: '$95K', label: 'raised to date' },
      { value: 'six-figure', label: 'partnership signed' },
      { value: '₹2L', label: "founders' capital committed" },
    ],
    partners: ['JEE Simplified'],
    press: [{ label: 'try Vivacity', href: 'https://tryvivacity.com/' }],
  },
  {
    title: 'AEGIS',
    role: 'Builder · AIP control plane',
    dateRange: '2026',
    description:
      'Built AEGIS, a terminal user interface for Palantir’s AIP control plane. The project led to an offer of unmetered access to frontier models and a role, which I could not accept because defense contracts cannot clear minors.',
    stats: [
      { value: 'AIP', label: 'control plane' },
      { value: 'TUI', label: 'terminal interface' },
    ],
    partners: ['Palantir'],
  },
  {
    title: 'ByteForge',
    role: 'Co-founder & VP',
    dateRange: '2021 to present',
    description:
      'A hardware and AI builder community co-founded with Pavitra Kushwaha in Class 9. It now connects students across North India through workshops, project sprints, and peer-led builds spanning embedded systems, robotics, and applied AI.',
    stats: [{ value: '4,500+', label: 'students connected' }],
  },
  {
    title: 'AIRIS',
    role: 'Builder · Hybrid rocket avionics',
    dateRange: '2026',
    description:
      'Designed and wrote bare-metal STM32F405 flight-computer firmware from scratch for a paraffin/N2O hybrid rocket, including IMU and barometer driver integration. Flashed and verified via DFU; the hardware build is in progress.',
    stats: [
      { value: 'STM32F405', label: 'flight computer' },
      { value: 'DFU', label: 'flashed and verified' },
      { value: 'in progress', label: 'hardware build' },
    ],
  },
  {
    title: 'Project Rudra',
    role: 'Builder · OSINT command grid',
    dateRange: '2026',
    description:
      'A GPU-accelerated global OSINT command grid integrating flight tracking, marine channels, CCTV networks, seismic activity, and live broadcasts in a 60fps WebGL interface.',
    press: [{ label: 'open live system', href: 'https://osirisai.live' }],
    media: [{ src: '/artifacts/rudra-live.png', alt: 'Project Rudra OSIRIS live interface' }],
  },
  {
    title: 'EduCore',
    role: 'Builder · Edge AI hardware',
    dateRange: '2025',
    description:
      'A solar-powered offline adaptive AI learning device for rural Indian students, running a quantized Phi-3 Mini locally on Raspberry Pi hardware.',
  },
  {
    title: 'PhysicsGPT',
    role: 'Builder · Offline AI tutor',
    dateRange: '2025',
    description:
      'An offline AI tutor fine-tuned on the CBSE Physics curriculum and designed for deployment on edge hardware.',
  },
  {
    title: 'ComplianceGuard',
    role: 'Builder · Autonomous compliance agent',
    dateRange: '2025',
    description:
      'A dual-LLM compliance agent where Grok handles fast scanning and Claude performs deep audit reasoning across SOC 2, HIPAA, GDPR, and ISO 27001 workflows.',
  },
  {
    title: 'Anti-Sleep Pilot',
    role: 'Builder · Computer vision',
    dateRange: '2026',
    description:
      'A real-time drowsiness detection system using computer vision, built and pitched at HACKSHODH 2026.',
  },
];

const fade = {
  // Scroll reveal opacity was causing stale ghost text during fast jumps and anchor navigation.
  // Sections are now stable on first paint; the hero keeps the only entrance motion.
  initial: false,
  animate: { opacity: 1, y: 0 },
};

const EssayHome = ({ onResumeOpen, onOpenWriting }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuTriggerRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--studio-progress', Math.min(progress, 1));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navigateToSection = (event, sectionId) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    closeMobileMenu();
    window.history.pushState(null, '', `#${sectionId}`);
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const navigateToTop = (event) => {
    event.preventDefault();
    closeMobileMenu();
    window.history.pushState(null, '', '#top');
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <main className="studio">
      <div className="studio-progress" aria-hidden="true">
        <span />
      </div>
      <header className="studio-top">
        <a href="#top" className="studio-mark" id="top" onClick={navigateToTop}>
          tanish
        </a>
        <button
          ref={mobileMenuTriggerRef}
          type="button"
          className="studio-mobile-trigger"
          aria-expanded={mobileMenuOpen}
          aria-controls="studio-mobile-navigation"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span>{mobileMenuOpen ? 'close' : 'menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
            <path d={mobileMenuOpen ? 'M5 5l10 10M15 5L5 15' : 'M3 6h14M3 10h14M3 14h14'} />
          </svg>
        </button>
        <nav
          id="studio-mobile-navigation"
          className={`studio-nav${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          <button type="button" onClick={() => { closeMobileMenu(); onOpenWriting(); }}>
            writing
          </button>
          <a href="#traction" onClick={(event) => navigateToSection(event, 'traction')}>traction</a>
          <a href="#projects" onClick={(event) => navigateToSection(event, 'projects')}>projects</a>
          <a href="#research" onClick={(event) => navigateToSection(event, 'research')}>research</a>
          <a href="#origin" onClick={(event) => navigateToSection(event, 'origin')}>origin</a>
          <button type="button" className="studio-cta" onClick={() => { closeMobileMenu(); onResumeOpen(); }}>
            resume
          </button>
        </nav>
      </header>
      <button
        type="button"
        className={`studio-nav-scrim${mobileMenuOpen ? ' is-open' : ''}`}
        aria-label="Close navigation"
        tabIndex={mobileMenuOpen ? 0 : -1}
        onClick={closeMobileMenu}
      />

      <section className="studio-hero" aria-label="Intro">
        <div className="studio-hero-media" aria-hidden="true">
          <video
            className="studio-hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.webp"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="studio-hero-veil" />
        </div>

        <motion.div
          className="studio-hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="studio-kicker">kanpur · bangalore · web</p>
          <h1 className="studio-title">
            tanish
            <br />
            anand
          </h1>
          <p className="studio-lede">
            founder of vivacity. builder of ai, hardware, and systems that have to work outside a demo.
          </p>
          <div className="studio-hero-actions">
            <button type="button" className="studio-cta studio-cta-solid" onClick={onOpenWriting}>
              read writing
            </button>
            <a className="studio-cta studio-cta-ghost" href="mailto:atanish920@gmail.com">
              email me
            </a>
          </div>
        </motion.div>
      </section>

      <TractionBar />

      <div className="studio-shell">
        <motion.p className="studio-now" {...fade}>
          <span>now</span>
          building the video pipeline at <strong>Prolearn</strong> · building <strong>Vivacity</strong> for LLM video infrastructure · mpc and cryptography at{' '}
          <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
            IIT Kanpur
          </a>
        </motion.p>

        <motion.section className="studio-section" id="about" {...fade}>
          <h2 className="studio-h2">about</h2>
          <div className="studio-prose">
            <p>
              I'm Tanish Anand, a builder, developer, and researcher currently at{' '}
              <a href="https://dpsazaadnagar.com/" target="_blank" rel="noopener noreferrer">
                <img src="/dps-logo.webp" alt="" width="16" height="16" className="studio-inline-icon" />
                Delhi Public School (DPS) Azaad Nagar
              </a>
              . I'm the founder of <strong>Vivacity</strong>, which has raised $95K and signed a six-figure partnership with JEE Simplified. I also co-founded <strong>ByteForge</strong>, a hardware and AI builder community now connecting 4,500+ students across North India, and I'm a Research Fellow at{' '}
              <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
                IIT Kanpur
              </a>{' '}
              under{' '}
              <a
                href="http://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prof. Adithya Vadapalli
              </a>
              , working on discrete text diffusion models and Hindi NLP.
            </p>
            <p>
              Right now I'm an engineer at <strong>Prolearn</strong>, building its video pipeline in Bangalore. I build systems that have to work in the real world: offline, messy, and useful.
            </p>
            <p>
              My current technical focus spans AI/ML, applied education, embedded systems, and cryptography. It is the same through-line that started with a Scratch game in lockdown and moved through web development, robotics, and research.
            </p>
            <p>
              outside of work: tennis, breaking apis on purpose, reverse-engineering android apps i shouldn't be looking at, and occasionally arguing that we're in a{' '}
              <a
                href="https://www.simulation-argument.com/simulation.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                simulation
              </a>
              .
            </p>
          </div>

          <div className="studio-social">
            <a href="https://x.com/sullaxive" target="_blank" rel="noopener noreferrer">
              x
            </a>
            <a href="https://github.com/Tanish-Anand1" target="_blank" rel="noopener noreferrer">
              github
            </a>
            <a
              href="https://www.linkedin.com/in/tanish-anand24/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            <a href="mailto:atanish920@gmail.com">email</a>
          </div>
        </motion.section>

        <motion.section className="studio-section" id="origin" {...fade}>
          <h2 className="studio-h2">origin</h2>
          <div className="studio-prose">
            <p>
              i started building during covid, when a laptop in class 3 turned lockdown into a sandbox. first came a scratch game inspired by contra, then a racing game, then an invitation to become a scratchster.
            </p>
            <p>
              my brother showed me python in pycharm; by class 6 i had finished a class 11 python book, moved into web development, and became the first student from my school to win a hackathon for it. robotics came next: robots, robowars, iit bombay, iit kanpur, and the kind of engineering that only works when hardware survives contact with reality.
            </p>
            <p>
              ai/ml is the current medium. the through-line is simple: learn the system, build the thing, test it in public. that's what i bring to vivacity, rudra, iit kanpur research, and prolearn.
            </p>
          </div>
          <button type="button" className="studio-text-link" onClick={onOpenWriting}>
            read the full story →
          </button>
        </motion.section>

        <motion.section className="studio-section" id="proof" {...fade}>
          <h2 className="studio-h2">proof</h2>
          <ol className="studio-proof">
            <li>
              <p>
                currently building the video pipeline at <strong>Prolearn</strong> ($3.2M pre-seed, bangalore edtech) as an engineer, working with Ravneet Singh (founder of Prolearn and FC.one, former CTO of Vedantu)
              </p>
            </li>
            <li>
              <p>
                research fellow at{' '}
                <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
                  IIT Kanpur
                </a>
                , working on mpc and cryptography under Prof. Adithya Vadapalli (cse dept.)
              </p>
            </li>
          </ol>
        </motion.section>

        <motion.section className="studio-section" id="projects" {...fade}>
          <h2 className="studio-h2">projects</h2>
          <p className="studio-builds-intro">
            products, research, and systems that had to work outside a demo. investor context first; the archive follows.
          </p>
          <div className="studio-projects">
            {investorProjects.map((project) => (
              <InvestorProjectCard key={project.title} {...project} />
            ))}
          </div>
        </motion.section>

        <motion.section className="studio-section" id="research" {...fade}>
          <h2 className="studio-h2">research</h2>
          <div className="studio-research-grid">
            <div className="studio-prose">
              <p>
                at <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">IIT Kanpur</a>, I work on discrete text diffusion models and Hindi NLP under Prof. Adithya Vadapalli. The work benchmarks SEDD and LLaDA-style architectures against auto-regressive language models and asks where the assumptions break outside English.
              </p>
            </div>
            <div className="studio-research-meta">
              <span>focus</span>
              <strong>text diffusion · Hindi NLP · MPC · cryptography</strong>
            </div>
          </div>
        </motion.section>

        <motion.section className="studio-section" id="skills" {...fade}>
          <h2 className="studio-h2">skills</h2>
          <div className="studio-skills-grid">
            <div>
              <h3>AI &amp; ML</h3>
              <p>PyTorch · LLMs · text diffusion · Manim · computer vision · Celery/Redis job orchestration</p>
            </div>
            <div>
              <h3>Web &amp; systems</h3>
              <p>React · Next.js · FastAPI · WebGL · Raspberry Pi · Render · Vercel</p>
            </div>
            <div>
              <h3>Hardware</h3>
              <p>STM32 · embedded systems · robotics · Raspberry Pi</p>
            </div>
            <div>
              <h3>Security</h3>
              <p>OSINT · API security · reverse engineering · responsible disclosure</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="studio-section" id="recognition" {...fade}>
          <h2 className="studio-h2">recognition</h2>
          <ul className="studio-recognition">
            <li><strong>2026</strong> · #1 across 3,500+ at Uniform2Unicorn: India&apos;s Top Young Founder of the Year</li>
            <li><strong>2026</strong> · Selected for <a href="https://www.ycombinator.com/" target="_blank" rel="noopener noreferrer">Y Combinator</a> Startup School</li>
            <li><strong>2026</strong> · Top 20 builder at VIBECON out of 20,000+ applicants</li>
            <li><strong>2026</strong> · 15+ hackathon wins across North India</li>
            <li><strong>2025</strong> · International RoboWars wins at IIT Bombay and IIT Kanpur</li>
          </ul>
        </motion.section>

        <SecurityAdvisories theme="light" />

        <motion.section className="studio-section" id="writing" {...fade}>
          <h2 className="studio-h2">writing</h2>
          <p className="studio-prose">
            i write build logs and origin stories from whatever i was building that week.
          </p>
          <button type="button" className="studio-text-link" onClick={onOpenWriting}>
            all writing →
          </button>
        </motion.section>

        <motion.section className="studio-section studio-contact" id="contact" {...fade}>
          <h2 className="studio-h2">contact</h2>
          <p className="studio-prose">
            if you're building something ambitious, let's talk. i'll bring the demos, the failures, and the next thing i'm trying to make work.
          </p>
          <div className="studio-contact-actions">
            <a className="studio-cta studio-cta-solid" href="https://cal.com/tanishanand" target="_blank" rel="noopener noreferrer">
              book a conversation
            </a>
            <a className="studio-cta studio-contact-ghost" href="mailto:atanish920@gmail.com">
              email me
            </a>
          </div>
          <p className="studio-contact-note">30 minutes. direct with founder.</p>
          <p className="studio-contact-line">
            <a href="mailto:atanish920@gmail.com">atanish920@gmail.com</a>
            <span aria-hidden="true">·</span>
            <a href="https://x.com/sullaxive" target="_blank" rel="noopener noreferrer">
              x @sullaxive
            </a>
          </p>
        </motion.section>

        <footer className="studio-footer">
          <span>tanish · 2026</span>
          <button type="button" onClick={onResumeOpen}>
            resume
          </button>
        </footer>
      </div>
    </main>
  );
};

export default EssayHome;
