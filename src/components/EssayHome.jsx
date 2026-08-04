import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const projects = [
  { name: 'CareLink', href: null },
  { name: 'Project Rudra', href: 'https://osirisai.live' },
  { name: 'Text Diffusion', href: null },
  { name: 'EduCore', href: null },
  { name: 'PhysicsGPT', href: null },
  { name: 'ComplianceGuard', href: null },
  { name: 'Anti-Sleep Pilot', href: null },
];

const EssayHome = ({ onResumeOpen, onOpenWriting }) => {
  const [bountyOpen, setBountyOpen] = useState(false);

  return (
    <main className="essay">
      <nav className="essay-nav" aria-label="Primary">
        <button type="button" className="essay-nav-btn" onClick={onOpenWriting}>
          writing
        </button>
        <span className="essay-nav-sep">/</span>
        <a href="#built">things i've built</a>
        <span className="essay-nav-sep">/</span>
        <button type="button" onClick={onResumeOpen} className="essay-nav-btn">
          resume
        </button>
      </nav>

      <article className="essay-body">
        <h1>hey, i'm tanish.</h1>

        <p>
          i'm a founder, builder, and researcher. high school at{' '}
          <a href="https://dpsazaadnagar.com/" target="_blank" rel="noopener noreferrer">
            <img src="/dps-logo.webp" alt="" width="16" height="16" className="essay-inline-icon" />
            DPS
          </a>
          , doing research at{' '}
          <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
            IIT Kanpur
          </a>
          .
        </p>

        <p>
          i build across software, hardware, and the awkward middle where real life refuses to fit a demo script. most of my work starts from a constraint: no reliable internet, no shared family tool, no single view of a messy world.
        </p>

        <p>
          i'm obsessed with understanding intelligence — how to build it, accelerate it, and eventually define it. i founded{' '}
          <strong>CareLink</strong> and built{' '}
          <a href="https://osirisai.live" target="_blank" rel="noopener noreferrer">
            Project Rudra
          </a>
          . the goal is systems that work offline, disclosures done right, and interfaces that feel inevitable.
        </p>

        <p>
          for fun: tennis, breaking APIs, reverse-engineering android, and researching the{' '}
          <a
            href="https://www.simulation-argument.com/simulation.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            simulation hypothesis
          </a>{' '}
          at unreasonable hours.
        </p>

        <div className="essay-social">
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

        <p className="essay-section-label">what i've been up to:</p>

        <ul className="essay-list">
          <li>
            currently building <strong>CareLink</strong> — care coordination for aging parents in tier-2 indian cities — and shipping systems across ai, hardware, and the web
          </li>
          <li>
            research fellow at{' '}
            <a href="https://www.iitk.ac.in/" target="_blank" rel="noopener noreferrer">
              IIT Kanpur
            </a>
            , working on discrete text diffusion and hindi nlp under{' '}
            <a
              href="http://scholar.google.com/citations?user=jeOME6wAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prof. Adithya Vadapalli
            </a>{' '}
            (cse dept.)
          </li>
          <li>
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
            <span className="essay-muted">(team: aditya bhatia &amp; pavitra kushwaha)</span>
          </li>
          <li>
            selected for{' '}
            <a href="https://www.ycombinator.com" target="_blank" rel="noopener noreferrer">
              Y Combinator
            </a>{' '}
            startup school india, 6% acceptance rate
          </li>
          <li>
            top 20 builder in india out of 20,000+ at{' '}
            <a href="https://vibecon.com" target="_blank" rel="noopener noreferrer">
              VIBECON
            </a>
          </li>
          <li>
            won 15+ hackathons in the last 2 months, including ones from google, openai, and cursor
          </li>
          <li>
            won international robowars 8kg at techfest '25 (iit bombay)
            <span className="essay-muted"> (shoutout pavitra)</span>
          </li>
          <li>
            independently found two significant security vulnerabilities: one in a major ai platform, one in a major quick-commerce platform's pricing api{' '}
            <button
              type="button"
              className="essay-bounty"
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
                  className="essay-bounty-detail"
                >
                  {' '}
                  responsible disclosures submitted and patched. prompt-injection sandbox escape on an ai inference platform; cart valuation logic bypass in a quick-commerce checkout api. their engineering teams had mixed feelings.
                </motion.span>
              )}
            </AnimatePresence>
          </li>
          <li>
            built Project Rudra, EduCore, PhysicsGPT, ComplianceGuard, and Anti-Sleep Pilot — from osint grids to offline edge ai
          </li>
        </ul>

        <p id="built">
          things i've built:{' '}
          {projects.map((project, i) => (
            <span key={project.name}>
              {project.href ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              ) : (
                <strong>{project.name}</strong>
              )}
              {i < projects.length - 2 ? ', ' : i === projects.length - 2 ? ', and ' : ''}
            </span>
          ))}
          .
        </p>

        <p id="writing">
          i write sometimes.{' '}
          <button type="button" className="essay-text-btn" onClick={onOpenWriting}>
            all writing →
          </button>
        </p>

        <p>
          i spend most of my time at the intersection of systems that think and systems that scale. if you care about products that have to work when the network doesn't — or security findings that get disclosed instead of screenshotted — we should talk.
        </p>

        <p id="contact">
          building something ambitious? reach me at{' '}
          <a href="mailto:atanish920@gmail.com">atanish920@gmail.com</a>. for everything else, find me on{' '}
          <a href="https://x.com/sullaxive" target="_blank" rel="noopener noreferrer">
            x @sullaxive
          </a>
          . i reply to interesting things.
        </p>
      </article>

      <footer className="essay-footer">
        <span>v01 2026</span>
        <button type="button" onClick={onResumeOpen}>
          resume
        </button>
      </footer>
    </main>
  );
};

export default EssayHome;
