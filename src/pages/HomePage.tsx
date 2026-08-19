import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import myWorksData from '../data/myworks.json';
import myExperimentsData from '../data/myexperiments.json';
import heroJson from '../data/hero.json';
import type { WorkProject, ExperimentProject, HeroData } from '../types';
import {
  Navbar,
  SelectedWorksSection,
  ExperimentsSection,
  Footer,
  DualPersonaCard,
  CtaSection,
  ZigzagDivider
} from '../components';

export default function HomePage() {
  const location = useLocation();

  // Strongly typed JSON datasets
  const selectedWorks: WorkProject[] = myWorksData as WorkProject[];
  const experiments: ExperimentProject[] = myExperimentsData as ExperimentProject[];
  const heroData: HeroData = heroJson as HeroData;

  // Active persona mode: 'developer' | 'designer'
  const [personaMode, setPersonaMode] = useState<'developer' | 'designer'>('developer');

  const togglePersona = (targetMode?: 'developer' | 'designer') => {
    const nextMode = targetMode || (personaMode === 'developer' ? 'designer' : 'developer');
    if (nextMode === personaMode) return;
    setPersonaMode(nextMode);
  };

  // 1. Auto-scroll on initial load or cross-page navigation with hash
  useEffect(() => {
    if (location.hash) {
      const targetHash = location.hash;
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(targetHash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // 2. Real-time section observation to update URL hash on scroll
  useEffect(() => {
    const sectionElements = document.querySelectorAll<HTMLElement>('#hero, #works, #cta');
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            if (sectionId === 'hero') {
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
              }
            } else if (sectionId && window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, '', `#${sectionId}`);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sectionElements.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-bg-main text-txt-primary flex flex-col selection:bg-brand-primary selection:text-white relative overflow-x-clip">

      {/* ── HEADER NAVIGATION ── */}
      <Navbar currentPath="/" />

      {/* ── SECTION 1: HERO (EDITORIAL PORTRAIT + DUAL PERSONA CARD) ── */}
      <section
        id="hero"
        className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 sm:py-12 lg:py-14 relative overflow-hidden scroll-mt-0"
      >
        <main className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 flex flex-col justify-center flex-1 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch h-full">
            
            {/* Col 1: Portrait (Frameless & Borderless, loaded from hero.json) */}
            <div className="lg:col-span-4 flex flex-col h-full min-h-[420px] sm:min-h-[480px] lg:min-h-0">
              <div className="w-full h-full flex-1 relative rounded-2xl sm:rounded-3xl overflow-hidden group min-h-[420px] sm:min-h-[480px] lg:min-h-0 bg-bg-surface/50 border border-border-subtle/50 shadow-2xl">
                <img
                  src={heroData.portrait.imageUrl}
                  alt={heroData.portrait.alt}
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Contrast overlay for top and bottom tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/50 pointer-events-none" />
                
                {/* Minimal Floating Metadata */}
                <div className="absolute top-4 left-4 font-mono text-[11px] text-white/90 uppercase tracking-widest font-bold drop-shadow-md z-10">
                  {heroData.portrait.tagTop}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/95 drop-shadow-md z-10">
                  <span>{heroData.portrait.tagBottomLeft}</span>
                  <span className="text-brand-primary font-bold">
                    {heroData.portrait.tagBottomRight}
                  </span>
                </div>
              </div>
            </div>

            {/* Col 2 & 3: Modular Dual Persona Card */}
            <div className="lg:col-span-8 h-full flex flex-col justify-center">
              <DualPersonaCard
                personaMode={personaMode}
                onToggle={togglePersona}
              />
            </div>

          </div>
        </main>
      </section>

      {/* ── SAWTOOTH ZIGZAG DIVIDER: HERO -> WORKS ── */}
      <ZigzagDivider />

      {/* ── SECTION 2: WORKS (SELECTED WORKS & EXPERIMENTS) ── */}
      <section
        id="works"
        className="w-full bg-[#0a0a0a] pb-16 sm:pb-24 scroll-mt-0"
      >
        {/* Selected Works Accordion Section */}
        <SelectedWorksSection works={selectedWorks} />

        {/* Experiments & Lab Section */}
        <ExperimentsSection experiments={experiments} />
      </section>

      {/* ── SAWTOOTH ZIGZAG DIVIDER: WORKS -> CTA ── */}
      <ZigzagDivider />

      {/* ── SECTION 3: CTA TRANSMISSION ── */}
      <section id="cta" className="w-full bg-bg-main scroll-mt-0">
        <CtaSection />
      </section>

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
}
