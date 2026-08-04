import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import EssayHome from './components/EssayHome';
import WritingIndex from './components/WritingIndex';
import WritingPost from './components/WritingPost';
import SEOMetadata from './components/SEOMetadata';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Blog = lazy(() => import('./components/Blog'));
const GithubContributions = lazy(() => import('./components/GithubContributions'));
const Funds = lazy(() => import('./components/Funds'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const RudraSimulatorModal = lazy(() => import('./components/RudraSimulatorModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === '') return { view: 'home' };
  if (raw === 'writing') return { view: 'writing' };
  if (raw.startsWith('writing/')) {
    return { view: 'post', slug: raw.slice('writing/'.length) };
  }
  return { view: 'home' };
}

function App() {
  const [isRudraMode, setIsRudraMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRudraSimOpen, setIsRudraSimOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [route, setRoute] = useState(() =>
    typeof window !== 'undefined' ? parseHash() : { view: 'home' }
  );

  useEffect(() => {
    document.body.classList.toggle('rudra', isRudraMode);
    document.body.classList.toggle('light', !isRudraMode);
    document.body.classList.toggle('essay-mode', !isRudraMode);
  }, [isRudraMode]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.altKey && e.key === 'r') {
        e.preventDefault();
        setIsRudraMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
  }, []);

  const toggleRudraMode = useCallback(() => {
    setIsRudraMode((prev) => !prev);
  }, []);

  const essayView = (() => {
    if (route.view === 'writing') {
      return (
        <WritingIndex
          onBack={() => navigate('')}
          onOpenPost={(slug) => navigate(`writing/${slug}`)}
        />
      );
    }
    if (route.view === 'post') {
      return (
        <WritingPost
          slug={route.slug}
          onBack={() => navigate('')}
          onWriting={() => navigate('writing')}
        />
      );
    }
    return (
      <EssayHome
        onResumeOpen={() => setIsResumeOpen(true)}
        onOpenWriting={() => navigate('writing')}
      />
    );
  })();

  return (
    <div
      className={
        isRudraMode
          ? 'min-h-screen bg-[#020603] text-emerald-400 font-mono relative'
          : 'min-h-screen bg-transparent text-[#14181c] relative'
      }
      itemScope
      itemType="https://schema.org/ProfilePage"
    >
      <SEOMetadata />

      <Suspense fallback={null}>
        {isRudraMode ? (
          <main className="w-full max-w-[1024px] mx-auto px-6 pt-14 relative z-10">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setIsRudraMode(false)}
                className="text-xs border border-emerald-500/30 px-3 py-1.5 rounded text-emerald-400/70 hover:text-emerald-300"
              >
                exit rudra
              </button>
            </div>
            <Hero isRudraMode={isRudraMode} onRudraClose={() => setIsRudraMode(false)} theme="dark" />
            <About isRudraMode={isRudraMode} theme="dark" />
            <Blog isRudraMode={isRudraMode} theme="dark" />
            <Projects
              isRudraMode={isRudraMode}
              theme="dark"
              onRudraSimOpen={() => setIsRudraSimOpen(true)}
            />
            <GithubContributions isRudraMode={isRudraMode} theme="dark" />
            <Funds isRudraMode={isRudraMode} theme="dark" />
            <Contact isRudraMode={isRudraMode} theme="dark" />
          </main>
        ) : (
          essayView
        )}
      </Suspense>

      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onRudraToggle={toggleRudraMode}
          isRudraMode={isRudraMode}
          onThemeToggle={() => {}}
          theme="light"
        />
        <RudraSimulatorModal isOpen={isRudraSimOpen} onClose={() => setIsRudraSimOpen(false)} />
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
          theme="light"
        />
      </Suspense>
    </div>
  );
}

export default App;
