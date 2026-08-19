import React, { useEffect, useState, useCallback } from 'react';
import type { WorkProject } from '../types';
import { Button } from './Button';
import { TechIcon } from './TechIcon';

interface CaseStudyModalProps {
  project: WorkProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  // Trigger smooth closing animation before unmounting
  const handleClose = useCallback(() => {
    setIsActive(false);
    setTimeout(() => {
      setIsRendered(false);
      onClose();
    }, 280);
  }, [onClose]);

  // Handle open / close animation sequencing
  useEffect(() => {
    if (isOpen && project) {
      setIsRendered(true);
      const raf = requestAnimationFrame(() => {
        setIsActive(true);
      });
      return () => cancelAnimationFrame(raf);
    } else if (!isOpen && isRendered) {
      setIsActive(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 280);
      return () => clearTimeout(timer);
    }
  }, [isOpen, project, isRendered]);

  // Escape key listener & body scroll lock
  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isRendered, handleClose]);

  if (!isRendered || !project) return null;

  const projectUrl = project.links?.find((l) => l.type === 'live')?.url || project.links?.[0]?.url;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10"
    >
      {/* ── BACKDROP BLUR OVERLAY ── */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out cursor-pointer ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* ── EXPANDABLE MODAL CONTAINER (RESPONSIVE WIDE LAYOUT ON BIG SCREENS) ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[92vh] bg-[#0e0e0e] border border-border-default rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-txt-primary select-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isActive
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* ── TOP BAR (CENTERED CATEGORY META) ── */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-border-subtle bg-bg-surface/80 flex-shrink-0 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold uppercase">
              {project.kind ? project.kind.replace('-', ' ') : project.category}
            </span>
            {project.company && (
              <>
                <span className="text-txt-muted">/</span>
                <span className="text-txt-muted">{project.company}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="font-mono text-xs text-txt-muted hover:text-white transition-colors cursor-pointer select-none"
            aria-label="Close modal"
          >
            [ ESC ✕ ]
          </button>
        </div>

        {/* ── CONTENT BODY (RESPONSIVE GRID: 1-COL MOBILE, 2-COL ON BIG SCREENS) ── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 no-scrollbar">
          
          {/* Left Column: Visual Showcase Cover */}
          {project.coverImage && (
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] rounded-xl sm:rounded-2xl overflow-hidden border border-border-subtle bg-bg-muted flex-shrink-0 shadow-2xl relative group">
                <img
                  src={project.coverImage}
                  alt={project.altText || project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          )}

          {/* Right Column: Editorial Details, Paragraphs & Stack */}
          <div className={`${project.coverImage ? 'lg:col-span-5' : 'lg:col-span-12'} flex flex-col justify-between gap-6`}>
            
            <div className="flex flex-col gap-4">
              {/* Title & Tagline */}
              <div className="flex flex-col gap-1.5 border-b border-border-subtle pb-4">
                <h2
                  id="modal-case-study-title"
                  className="font-['DM_Sans'] font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-txt-primary leading-tight"
                >
                  {project.title}
                </h2>
                <p className="font-['Space_Grotesk'] text-sm sm:text-base text-brand-primary font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Detailed Paragraphs */}
              <div className="flex flex-col gap-3.5 font-['Space_Grotesk'] text-sm sm:text-base text-txt-secondary leading-relaxed">
                {project.detailedParagraphs && project.detailedParagraphs.length > 0 ? (
                  project.detailedParagraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))
                ) : (
                  <p>{project.summary}</p>
                )}
              </div>
            </div>

            {/* Technologies Stack */}
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-4 border-t border-border-subtle">
                <span className="font-mono text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                  TECHNOLOGY STACK //
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] hover:border-brand-primary/40 font-mono text-xs text-txt-primary transition-colors"
                    >
                      <TechIcon name={tech} size={15} showTooltip={false} />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ── FOOTER ACTIONS (CLEAN & MINIMAL) ── */}
        {projectUrl && (
          <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-t border-border-subtle bg-bg-surface/80 flex-shrink-0">
            <Button
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              Check it out ↗
            </Button>
            <span className="font-mono text-[10px] sm:text-[11px] text-txt-muted uppercase tracking-wider hidden sm:inline-block">
              CLICK OUTSIDE OR ESC TO CLOSE
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
