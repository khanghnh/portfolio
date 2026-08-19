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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* ── BACKDROP BLUR OVERLAY ── */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ease-out cursor-pointer ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* ── MODAL CONTAINER (CLEAN & STREAMLINED) ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-2xl max-h-[90vh] bg-[#0e0e0e] border border-border-default rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-txt-primary select-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isActive
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* ── TOP BAR (CENTERED, NO X BUTTON) ── */}
        <div className="flex items-center justify-center px-5 sm:px-7 py-3.5 border-b border-border-subtle bg-bg-surface/80 flex-shrink-0 font-mono text-xs text-center">
          <div className="flex items-center justify-center gap-2">
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
        </div>

        {/* ── CONTENT BODY (CLEAN & CONCISE) ── */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6 flex flex-col gap-5 no-scrollbar">
          
          {/* Cover Image */}
          {project.coverImage && (
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border-subtle bg-bg-muted flex-shrink-0">
              <img
                src={project.coverImage}
                alt={project.altText || project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Tagline */}
          <div className="flex flex-col gap-1">
            <h2
              id="modal-case-study-title"
              className="font-['DM_Sans'] font-black text-2xl sm:text-3xl uppercase tracking-tight text-txt-primary"
            >
              {project.title}
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-brand-primary font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-3 font-['Space_Grotesk'] text-sm sm:text-base text-txt-secondary leading-relaxed">
            {project.detailedParagraphs && project.detailedParagraphs.length > 0 ? (
              project.detailedParagraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))
            ) : (
              <p>{project.summary}</p>
            )}
          </div>

          {/* Technologies Stack */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
              <span className="font-mono text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                Technologies:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {project.stack.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-surface border border-border-subtle font-mono text-xs text-txt-primary"
                  >
                    <TechIcon name={tech} size={15} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── FOOTER ACTIONS ── */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-3.5 border-t border-border-subtle bg-bg-surface/80 flex-shrink-0">
          <div>
            {projectUrl && (
              <Button
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
              >
                Check it out ↗
              </Button>
            )}
          </div>

          <Button onClick={handleClose} variant="ghost" size="sm">
            Close ✕
          </Button>
        </div>

      </div>
    </div>
  );
};
