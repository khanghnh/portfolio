import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useLiveClock, useInView, useClipboard, useMousePosition } from '../hooks';
import { smoothScrollTo } from '../utils/smoothScroll';
import ctaData from '../data/cta.json';
import siteConfig from '../data/siteConfig.json';
import type { CtaData, SiteConfig } from '../types';

export const CtaSection: React.FC = () => {
  const { dateStr, fullTimeStr } = useLiveClock();
  const cta: CtaData = ctaData as CtaData;
  const config: SiteConfig = siteConfig as SiteConfig;

  // Modular custom hooks for in-view detection, magnetic cursor, and clipboard copy
  const [headlineRef, isHeadlineInView] = useInView<HTMLDivElement>({ threshold: 0.15, triggerOnce: true });
  const { position: cursorPos, handleMouseMove } = useMousePosition();
  const { copied, copy } = useClipboard(2500);
  const [isHoveringEmail, setIsHoveringEmail] = useState<boolean>(false);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(document.body);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    copy(cta.email || 'khanghuynh6587@gmail.com');
  };

  // Helper to render character-by-character kinetic spring entrance
  const renderKineticText = (text: string, baseDelayMs: number, staggerStepMs: number = 20, extraClass: string = '') => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden align-top">
        <span
          className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHeadlineInView
              ? 'translate-y-0 opacity-100 scale-100 filter-none'
              : 'translate-y-[120%] opacity-0 scale-90 blur-[1px]'
          } ${extraClass}`}
          style={{
            transitionDelay: `${baseDelayMs + i * staggerStepMs}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));
  };

  return (
    <section id="contact" className="w-full bg-bg-main text-txt-primary pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 relative overflow-hidden">

      {/* Floating Solid Circle Cursor Badge with EMAIL inside (White circle, Black text) */}
      <div
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-[#060606] flex items-center justify-center font-mono font-black text-xs sm:text-sm tracking-widest shadow-[0_0_35px_rgba(255,255,255,0.75)] transition-transform duration-75 ease-out select-none ${
          isHoveringEmail ? 'w-20 h-20 sm:w-24 sm:h-24 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
        }}
      >
        <span>EMAIL</span>
      </div>

      {/* Structural Brutalist Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col gap-8 sm:gap-12">

        <ScrollReveal>
          {/* ── BORDERLESS BRUTALIST CTA CONTAINER ── */}
          <div className="w-full flex flex-col gap-6 sm:gap-10">

            {/* Top Control Strip with Live Clock + Timezone */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle font-mono text-[11px] sm:text-xs text-txt-muted">
              
              {/* Left Status */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-bold text-txt-primary uppercase tracking-widest">
                  {cta.controlStrip.tag}
                </span>
                <span className="hidden sm:inline">/</span>
                <span className="text-brand-primary font-bold">{cta.controlStrip.status}</span>
              </div>

              {/* Right Location & Time */}
              <div className="flex items-center gap-2 sm:gap-2.5 text-txt-secondary font-medium select-none">
                <span className="text-txt-primary font-bold">{config.location}</span>
                <span className="text-txt-muted/60">/</span>
                <span className="hidden lg:inline">{dateStr || config.defaultDate}</span>
                <span className="hidden lg:inline text-txt-muted/60">/</span>
                <span className="text-brand-primary font-mono font-bold tracking-wider">
                  {fullTimeStr || config.defaultTime}
                </span>
              </div>

            </div>

            {/* Monumental Headline Area */}
            <div ref={headlineRef} className="flex flex-col gap-3 sm:gap-6 lg:gap-8 select-none">

              {/* Mobile / Touch Tap Indicator */}
              <div className="flex lg:hidden items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-primary font-bold">
                <span>[ TAP TO SEND EMAIL ↗ ]</span>
              </div>

              {/* Big Kinetic Headline as Interactive Mailto Trigger */}
              <a
                href={`mailto:${cta.email || 'khanghuynh6587@gmail.com'}`}
                onMouseEnter={() => setIsHoveringEmail(true)}
                onMouseLeave={() => setIsHoveringEmail(false)}
                onMouseMove={handleMouseMove}
                className="group/email flex flex-col font-['Anton'] uppercase leading-[0.88] sm:leading-[0.84] tracking-tight text-txt-primary cursor-none select-none active:opacity-80 active:scale-[0.99] transition-all"
                title="Click to send an email"
                aria-label="Click to send an email"
              >
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-x-4 sm:gap-x-8">
                  {/* Word 1: LET'S WORK */}
                  <div className="text-[13vw] sm:text-[10vw] md:text-[9vw] lg:text-[120px] xl:text-[155px] 2xl:text-[180px] group-hover/email:text-brand-primary transition-colors duration-300 whitespace-nowrap">
                    {renderKineticText(cta.headline.word1, 100, 20)}
                  </div>

                  {/* Word 2: TOGETHER. with mobile arrow indicator */}
                  <div className="flex items-baseline text-[13vw] sm:text-[10vw] md:text-[9vw] lg:text-[120px] xl:text-[155px] 2xl:text-[180px] text-brand-primary mt-0.5 lg:mt-0 whitespace-nowrap">
                    <span>{renderKineticText(cta.headline.word2, 320, 20)}</span>
                    <span className="inline-block lg:hidden font-mono text-[10vw] sm:text-[7vw] text-brand-primary animate-pulse ml-1 align-baseline">
                      ↗
                    </span>
                  </div>
                </div>
              </a>

              {/* Elegant Italic Subtitle with Inline "Back to Top" Button */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div
                  style={{
                    transitionDuration: '800ms',
                    transitionDelay: '580ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`font-['Instrument_Serif',serif] italic font-normal text-2xl sm:text-4xl md:text-5xl lg:text-[56px] text-txt-secondary leading-tight max-w-4xl transition-all ${
                    isHeadlineInView
                      ? 'opacity-100 translate-y-0 filter-none'
                      : 'opacity-0 translate-y-6 blur-[1px]'
                  }`}
                >
                  {cta.subtitle}
                </div>

                {/* Medium-Size, Borderless Inline "Back to Top" Action (Inline with Elegant Subtitle) */}
                <button
                  type="button"
                  onClick={handleScrollToTop}
                  className="group font-mono text-sm sm:text-base md:text-lg uppercase tracking-wider font-bold text-txt-muted hover:text-brand-primary transition-all flex items-center gap-2 pb-1 lg:pb-3 cursor-pointer select-none self-start lg:self-end flex-shrink-0"
                  title="Scroll back to top"
                  aria-label="Scroll back to top"
                >
                  <span className="group-hover:text-txt-primary transition-colors">{cta.backToTop.label}</span>
                  <span className="text-brand-primary group-hover:-translate-y-1 transition-transform font-bold text-lg sm:text-2xl">
                    {cta.backToTop.arrow}
                  </span>
                </button>
              </div>

            </div>

            {/* Direct Communication Strip: Clean, Compact Text-Only Copy Email Action */}
            <div className="flex items-center pt-5 sm:pt-6 border-t border-border-subtle font-mono text-xs sm:text-sm">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center gap-2 text-txt-muted hover:text-brand-primary transition-colors cursor-pointer select-none"
                title="Click to copy email address"
              >
                <span className="bracket-left text-txt-muted group-hover:text-brand-primary transition-transform group-hover:-translate-x-1">[</span>
                <span className={copied ? 'text-brand-primary font-bold' : 'text-txt-secondary group-hover:text-txt-primary'}>
                  {copied ? cta.copyEmail.copiedText : cta.copyEmail.defaultText}
                </span>
                <span className="text-brand-primary group-hover:scale-115 transition-transform font-bold">
                  {copied ? '✓' : cta.copyEmail.icon}
                </span>
                <span className="bracket-right text-txt-muted group-hover:text-brand-primary transition-transform group-hover:translate-x-1">]</span>
              </button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
