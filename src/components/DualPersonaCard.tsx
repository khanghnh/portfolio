import React from 'react';
import { Button } from './Button';
import { TechIcon } from './TechIcon';
import { DualMorphChars, DualMorphWords } from './MorphText';
import { smoothScrollTo } from '../utils/smoothScroll';
import heroJson from '../data/hero.json';
import type { HeroData } from '../types';

interface DualPersonaCardProps {
  personaMode: 'developer' | 'designer';
  onToggle: (target?: 'developer' | 'designer') => void;
}

export const DualPersonaCard: React.FC<DualPersonaCardProps> = ({
  personaMode,
  onToggle,
}) => {
  const isDev = personaMode === 'developer';
  const heroData: HeroData = heroJson as HeroData;
  const { developer: dev, designer: des } = heroData.personas;
  const actions = heroData.actions;

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(actions.worksTarget);
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(actions.contactTarget);
  };

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#EA4335] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(234,67,53,0.6)] transition-all duration-200" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case 'github':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#f0f6fc] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-200" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case 'behance':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0057ff] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(0,87,255,0.6)] transition-all duration-200" fill="currentColor">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.254 0-5.625-3.323-5.625-5.945 0-3.352 2.006-6.055 5.766-6.055 4.004 0 5.234 3.016 4.961 6.314h-8.172c.039 1.957 1.055 3.633 3.438 3.633 1.836 0 2.875-.852 3.328-1.947h1.405zm-7.984-4.5h5.594c-.062-1.688-.891-3.055-2.734-3.055-1.922 0-2.797 1.344-2.86 3.055zm-11.742-7.5h4.945c2.406 0 4.055 1.109 4.055 3.125 0 1.203-.641 2.148-1.742 2.656 1.484.492 2.195 1.633 2.195 3.094 0 2.375-1.938 3.625-4.516 3.625h-4.938v-12.5zm2.5 4.875h2.156c1.172 0 1.953-.453 1.953-1.422 0-.93-.75-1.391-1.922-1.391h-2.188v2.813zm0 5.563h2.375c1.328 0 2.188-.531 2.188-1.625 0-1.078-.891-1.594-2.203-1.594h-2.359v3.219z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0A66C2] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(10,102,194,0.6)] transition-all duration-200" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E4405F] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(228,64,95,0.6)] transition-all duration-200" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1877F2] group-hover:scale-120 group-hover:drop-shadow-[0_0_12px_rgba(24,119,242,0.6)] transition-all duration-200" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10 py-2 sm:py-4 z-10">

      {/* ── TOP ZONE: PERSPECTIVE TAG & "I ALSO" BUTTON ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-primary font-bold">
          <DualMorphChars
            textA={dev.perspectiveTag}
            textB={des.perspectiveTag}
            activeA={isDev}
            staggerMs={10}
          />
        </div>

        {/* Re-introduced "I ALSO" Toggle Button */}
        <button
          type="button"
          onClick={() => onToggle()}
          className="group font-mono text-xs sm:text-sm uppercase font-bold text-txt-secondary hover:text-brand-primary transition-all duration-300 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full border border-border-default hover:border-brand-primary bg-bg-surface/80 hover:bg-bg-surface hover:shadow-[0_0_16px_rgba(255,69,0,0.2)] cursor-pointer select-none"
          title="Click to toggle perspective"
          aria-label="Toggle between Developer and Designer perspectives"
        >
          <span className="text-txt-muted group-hover:text-txt-secondary transition-colors">I ALSO :</span>
          <span className="text-brand-primary font-bold transition-transform duration-200 group-hover:translate-x-0.5">
            {isDev ? dev.toggleButtonText : des.toggleButtonText}
          </span>
        </button>
      </div>

      {/* ── MIDDLE ZONE: MONUMENTAL KINETIC HEADLINES ── */}
      <div className="w-full flex flex-col select-none border-b border-border-subtle pb-5 sm:pb-6 relative">
        {/* Line 1 */}
        <h1 className="leading-[0.92] tracking-tight">
          <DualMorphChars
            textA={dev.headlineWord1}
            textB={des.headlineWord1}
            activeA={isDev}
            classNameA="font-['Anton'] text-5xl sm:text-7xl md:text-8xl lg:text-[84px] xl:text-[102px] uppercase text-txt-primary"
            classNameB="font-['Instrument_Serif',serif] italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[106px] text-txt-primary"
            staggerMs={20}
          />
        </h1>

        {/* Line 2 */}
        <h1 className="leading-[0.92] tracking-tight mt-1 sm:mt-2">
          <DualMorphChars
            textA={dev.headlineWord2}
            textB={des.headlineWord2}
            activeA={isDev}
            classNameA="font-['Anton'] text-5xl sm:text-7xl md:text-8xl lg:text-[84px] xl:text-[102px] uppercase text-brand-primary drop-shadow-[0_0_25px_rgba(255,69,0,0.25)]"
            classNameB="font-['Instrument_Serif',serif] italic font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[106px] text-brand-primary drop-shadow-[0_0_25px_rgba(255,69,0,0.25)]"
            staggerMs={20}
          />
        </h1>
      </div>

      {/* ── CORE PUNCHLINE (CLEAN & CONCISE) ── */}
      <div className="flex flex-col gap-3.5 sm:gap-4">
        <p className="font-['Space_Grotesk'] text-lg sm:text-xl md:text-2xl text-txt-primary font-medium leading-relaxed max-w-2xl">
          <DualMorphWords
            textA={dev.tagline}
            textB={des.tagline}
            activeA={isDev}
            staggerMs={12}
          />
        </p>

        {/* ── SUBTLE STACK FOCUS LOGOS (ICON ONLY, BORDERLESS) ── */}
        <div className="flex items-center gap-3 sm:gap-4 select-none flex-wrap pt-1">
          <span className="font-mono text-[10px] sm:text-[11px] text-txt-muted/70 uppercase tracking-widest font-semibold mr-1">
            STACK //
          </span>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {(isDev ? dev.highlightStack : des.highlightStack).map((tech) => (
              <div
                key={tech}
                className="group flex items-center justify-center transition-transform duration-200 hover:scale-115 cursor-default"
                title={tech}
              >
                <TechIcon
                  name={tech}
                  size={20}
                  showTooltip={true}
                  className="opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM ZONE: ACTION CTA & BORDERLESS SOCIALS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border-subtle/50">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            href={actions.worksTarget}
            variant="primary"
            size="md"
            className="flex-1 sm:flex-none text-center justify-center shadow-lg shadow-brand-primary/15"
            onClick={handleScrollToWorks}
          >
            {actions.worksButtonText}
          </Button>

          <Button
            href={actions.contactTarget}
            variant="outline"
            size="md"
            className="flex-1 sm:flex-none text-center justify-center"
            onClick={handleScrollToContact}
          >
            {actions.contactButtonText}
          </Button>
        </div>

        {/* Borderless Brand Color Social Icons */}
        {heroData.socials && (
          <div className="flex items-center gap-1.5 sm:gap-2 select-none">
            {heroData.socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.url.startsWith('mailto') ? undefined : '_blank'}
                rel={item.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group p-2.5 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:bg-bg-surface rounded-full cursor-pointer"
                title={item.platform}
                aria-label={item.platform}
              >
                {getSocialIcon(item.type)}
              </a>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
