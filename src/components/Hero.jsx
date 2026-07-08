import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RudraTerminal from './RudraTerminal';

const Hero = ({ isRudraMode, onRudraClose }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Lazy-load the video after the page becomes interactive
  useEffect(() => {
    if (isRudraMode) return;

    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = '/hero-bg.mp4';
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setVideoLoaded(true);
      }
    }, 1500); // Delay video loading to prioritize LCP

    return () => clearTimeout(timer);
  }, [isRudraMode]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isRudraMode ? (
          // Cyberpunk Rudra Mode Hero
          <motion.section
            key="rudra-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-24 pb-16 sm:pt-32 sm:pb-20 text-emerald-400"
          >
            <div className="flex flex-col">
              {/* Availability badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1.5 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full pulse-soft bg-emerald-400" />
                  Rudra mainframe active // all systems operational
                </span>
              </div>

              {/* Name */}
              <h1
                className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-emerald-400 text-shadow-emerald font-mono"
                itemProp="name"
              >
                Tanish Anand
              </h1>

              {/* Subtitle */}
              <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-[540px] text-emerald-400/60 font-mono">
                Developer & engineer building at the intersection of
                <span className="text-emerald-300 font-medium"> AI</span>,
                <span className="text-emerald-300 font-medium"> hardware</span>, and
                <span className="text-emerald-300 font-medium"> the web</span>.
              </p>

              {/* Interactive Tactical Terminal */}
              <div className="overflow-hidden w-full relative z-20 mt-6">
                <RudraTerminal onClose={onRudraClose} />
              </div>
            </div>
          </motion.section>
        ) : (
          // Elegant Target-styled Hero
          <motion.div
            key="elegant-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <section
              className="relative px-6 sm:px-12 pt-32 pb-24 text-white bg-stone-950 overflow-hidden"
              itemScope
              itemType="https://schema.org/Person"
              data-person="Tanish Anand"
            >
              <div className="max-w-5xl mx-auto pt-12 relative z-10">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-bold text-5xl md:text-6xl font-serif text-white tracking-tight"
                  itemProp="name"
                >
                  Tanish Anand
                </motion.h1>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 text-xl sm:text-2xl leading-snug font-mono text-gray-300"
                  itemProp="jobTitle"
                >
                  developer • builder • researcher @ IIT Kanpur
                </motion.h2>
                {/* Hidden microdata for crawlers — visible only to bots */}
                {/* Removed aria-hidden to fix: [aria-hidden="true"] elements contain focusable descendants */}
                <div className="sr-only">
                  <span itemProp="description">Tanish Anand is a developer, founder, and researcher building at the intersection of AI, hardware, and the web. Founder of CareLink, creator of Project Rudra, Research Fellow at IIT Kanpur.</span>
                  <span itemProp="email">atanish920@gmail.com</span>
                  <span itemProp="url">https://tanish.gg</span>
                  <span itemProp="sameAs">https://github.com/Tanish-Anand1</span>
                  <span itemProp="sameAs">https://www.linkedin.com/in/tanish-anand24/</span>
                  <span itemProp="sameAs">https://x.com/sullaxive</span>
                  <span itemProp="sameAs">https://twitter.com/sullaxive</span>
                  <span itemProp="nationality">India</span>
                  <span itemProp="knowsAbout">Artificial Intelligence</span>
                  <span itemProp="knowsAbout">Machine Learning</span>
                  <span itemProp="knowsAbout">Natural Language Processing</span>
                  <span itemProp="knowsAbout">Cybersecurity</span>
                  <span itemProp="knowsAbout">WebGL</span>
                  <span itemProp="knowsAbout">React</span>
                  <span itemProp="knowsAbout">OSINT</span>
                  <div itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization">
                    <span itemProp="name">IIT Kanpur</span>
                  </div>
                  <div itemProp="alumniOf" itemScope itemType="https://schema.org/EducationalOrganization">
                    <span itemProp="name">Delhi Public School Azaad Nagar</span>
                  </div>
                  <div itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">CareLink</span>
                  </div>
                </div>
              </div>

              {/* Black overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0 pointer-events-none"></div>

              {/* Poster image for fast LCP, then lazy-loaded video on top */}
              <img
                src="/hero-poster.webp"
                alt=""
                role="presentation"
                width="1280"
                height="720"
                fetchPriority="high"
                className={`absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-75 transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-75'}`}
              />

              {/* Looping video background — lazy loaded after page interactive */}
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/hero-poster.webp"
                width="1280"
                height="720"
                className={`absolute top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-700 ${videoLoaded ? 'opacity-75' : 'opacity-0'}`}
              >
                {/* Source is set dynamically via JS for lazy loading */}
                <track kind="captions" src="/captions.vtt" srcLang="en" label="English" default />
              </video>
            </section>

            {/* Premium organic curved divider */}
            <svg
              className="fill-[var(--surface)] transition-colors duration-300 -mt-6 sm:-mt-12 h-6 sm:h-12 w-full relative z-20 pointer-events-none"
              width="100%"
              height="100"
              viewBox="0 0 1152 59"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 59.5105V60.0001H1152V12.5105C1152 5.68705 1146.32 0.236812 1139.5 0.520875L11.5004 47.5209C5.07291 47.7887 0 53.0774 0 59.5105Z"
              ></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
