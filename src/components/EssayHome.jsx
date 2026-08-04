import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const projects = [
  { name: 'CareLink', href: null, note: 'founded' },
  { name: 'Project Rudra', href: 'https://osirisai.live', note: 'live' },
  { name: 'Text Diffusion', href: null, note: 'iitk' },
  { name: 'EduCore', href: null, note: null },
  { name: 'PhysicsGPT', href: null, note: null },
  { name: 'ComplianceGuard', href: null, note: null },
  { name: 'Anti-Sleep Pilot', href: null, note: null },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const EssayHome = ({ onResumeOpen, onOpenWriting }) => {
  const [bountyOpen, setBountyOpen] = useState(false);

  return (
    <main className="studio">
      <header className="studio-top">
        <a href="#top" className="studio-mark" id="top">
          tanish
        </a>
        <nav className="studio-nav" aria-label="Primary">
          <button type="button" onClick={onOpenWriting}>
            writing
          </button>
          <a href="#proof">proof</a>
          <a href="#built">builds</a>
          <button type="button" className="studio-cta" onClick={onResumeOpen}>
            resume
          </button>
        </nav>
      </header>

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
            engineer at prolearn. research at iit kanpur. founder of carelink. builds across ai, hardware, and the web.
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

      <div className="studio-shell">
        <motion.p className="studio-now" {...fade}>
          <span>now</span>
          building the video pipeline at <strong>Prolearn</strong> · discrete text diffusion at{' '}
          <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
            IIT Kanpur
          </a>
        </motion.p>

        <motion.section className="studio-section" {...fade}>
          <h2 className="studio-h2">who</h2>
          <div className="studio-prose">
            <p>
              high school at{' '}
              <a href="https://dpsazaadnagar.com/" target="_blank" rel="noopener noreferrer">
                <img src="/dps-logo.webp" alt="" width="16" height="16" className="studio-inline-icon" />
                DPS
              </a>
              . research at{' '}
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
              : discrete text diffusion and hindi nlp. mostly reading sedd / llada papers and trying to get them to work on a language nobody benchmarks.
            </p>
            <p>
              founded <strong>CareLink</strong>. learned more from debugging it at 2am than from any class.
            </p>
            <p>
              right now i'm an engineer at <strong>Prolearn</strong>, a bangalore edtech that raised $3.2m pre-seed. building the video pipeline with{' '}
              <a
                href="https://www.google.com/search?q=Ravneet+Singh+Prolearn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ravneet Singh
              </a>
              , who also runs FC.one and was cto at Vedantu before this. also built{' '}
              <a href="https://osirisai.live" target="_blank" rel="noopener noreferrer">
                Project Rudra
              </a>
              .
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

        <motion.section className="studio-section" id="proof" {...fade}>
          <h2 className="studio-h2">proof</h2>
          <ol className="studio-proof">
            <li>
              <span className="studio-idx">01</span>
              <p>
                currently building the video pipeline at <strong>Prolearn</strong> ($3.2M pre-seed, bangalore edtech) as an engineer, working with Ravneet Singh (founder of Prolearn and FC.one, former CTO of Vedantu)
              </p>
            </li>
            <li>
              <span className="studio-idx">02</span>
              <p>
                research fellow at{' '}
                <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
                  IIT Kanpur
                </a>
                , working on discrete text diffusion and hindi nlp under Prof. Adithya Vadapalli (cse dept.)
              </p>
            </li>
            <li>
              <span className="studio-idx">03</span>
              <p>
                ranked <strong>#1</strong> across 3,500+ at{' '}
                <a
                  href="https://uniform2unicorn.polariscampus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Uniform2Unicorn
                </a>
                , india's top young founder of the year '26. won ₹1,00,000 cash, ₹10,00,000 in credits, and an exclusive dinner with{' '}
                <a
                  href="https://www.google.com/search?q=iqlipse+nova"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Iqlipse Nova
                </a>{' '}
                <span className="studio-muted">(team: aditya bhatia &amp; pavitra kushwaha)</span>
              </p>
            </li>
            <li>
              <span className="studio-idx">04</span>
              <p>
                selected for{' '}
                <a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer">
                  Y Combinator
                </a>{' '}
                startup school india, 6% acceptance rate
              </p>
            </li>
            <li>
              <span className="studio-idx">05</span>
              <p>
                top 20 builder in india out of 20,000+ at{' '}
                <a href="https://vibecon.com" target="_blank" rel="noopener noreferrer">
                  VIBECON
                </a>
              </p>
            </li>
            <li>
              <span className="studio-idx">06</span>
              <p>won 15+ hackathons in the last 2 months, including ones from google, openai, and cursor</p>
            </li>
            <li>
              <span className="studio-idx">07</span>
              <p>
                won international robowars 8kg at techfest '25 (iit bombay)
                <span className="studio-muted"> (shoutout pavitra)</span>
              </p>
            </li>
            <li>
              <span className="studio-idx">08</span>
              <p>
                independently found two significant security vulnerabilities: one in a major ai platform, one in a major quick-commerce platform's pricing api{' '}
                <button
                  type="button"
                  className="studio-bounty"
                  onClick={() => setBountyOpen((v) => !v)}
                >
                  [$]
                </button>{' '}
                a 5-figure and a 6-figure bounty, respectively.
                <AnimatePresence>
                  {bountyOpen && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="studio-bounty-detail"
                    >
                      {' '}
                      responsible disclosures submitted and patched. prompt-injection sandbox escape on an ai inference platform; cart valuation logic bypass in a quick-commerce checkout api. their engineering teams had mixed feelings.
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </li>
            <li>
              <span className="studio-idx">09</span>
              <p>
                built Project Rudra, EduCore, PhysicsGPT, ComplianceGuard, and Anti-Sleep Pilot. most of these broke at least once before they worked.
              </p>
            </li>
          </ol>
        </motion.section>

        <motion.section className="studio-section" id="built" {...fade}>
          <h2 className="studio-h2">builds</h2>
          <ul className="studio-builds">
            {projects.map((project) => (
              <li key={project.name}>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  <span>{project.name}</span>
                )}
                {project.note ? <em>{project.note}</em> : null}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="studio-section" id="writing" {...fade}>
          <h2 className="studio-h2">writing</h2>
          <p className="studio-prose">
            i write build logs when something breaks in an interesting way.
          </p>
          <button type="button" className="studio-text-link" onClick={onOpenWriting}>
            all writing →
          </button>
        </motion.section>

        <motion.section className="studio-section studio-contact" id="contact" {...fade}>
          <h2 className="studio-h2">contact</h2>
          <p className="studio-prose">
            if you want to talk video pipelines, text diffusion, or why your rtsp stream keeps dropping frames, email is fastest.
          </p>
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
