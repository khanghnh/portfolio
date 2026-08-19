import React, { useState } from 'react';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';
import { TechIcon } from './TechIcon';
import { CaseStudyModal } from './CaseStudyModal';
import { CategoryFilterDropdown } from './CategoryFilterDropdown';
import categoriesData from '../data/projectCategories.json';
import type { WorkProject, ProjectCategory } from '../types';

interface SelectedWorksSectionProps {
  works: WorkProject[];
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({ works }) => {
  const categories: ProjectCategory[] = categoriesData as ProjectCategory[];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter projects by active discipline category
  const filteredWorks = works.filter((w) => {
    if (activeCategory === 'all') return true;
    return w.kind === activeCategory;
  });

  // Accordion state: ID of currently expanded project (or null)
  const [expandedId, setExpandedId] = useState<string | null>(works[0]?.id || null);
  // Modal state: active project for deep breakdown modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<WorkProject | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 flex flex-col gap-10 sm:gap-12">

      {/* ── SECTION HEADER & DYNAMIC CATEGORY FILTER DROPDOWN ── */}
      <ScrollReveal className="relative z-30">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-border-subtle pb-5">
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <span className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-brand-primary font-bold">
              02 // MAJOR CASE STUDIES
            </span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-txt-primary">
              Selected Works
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-xs text-txt-muted uppercase hidden lg:inline-block">
              CLICK ROW TO EXPAND BREAKDOWN
            </span>

            {/* Dynamic Category Filter Dropdown */}
            <CategoryFilterDropdown
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              filteredCount={filteredWorks.length}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* ── INTERACTIVE EXPANDABLE ACCORDION ROWS ── */}
      <div className="flex flex-col border-t border-border-subtle">
        {filteredWorks.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs sm:text-sm text-txt-muted">
            NO PROJECTS FOUND FOR CURRENT FILTER.
          </div>
        ) : (
          filteredWorks.map((work, index) => {
            const isExpanded = expandedId === work.id;

            return (
              <ScrollReveal key={work.id} delay={index * 60}>
                <div className="border-b border-border-subtle transition-colors duration-200">

                  {/* ── CONCISE ROW (RE-DESIGNED: BIG NUMBER, THIN COMPANY, RECTANGLE KIND, BORDERLESS ARROW) ── */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(work.id)}
                    aria-expanded={isExpanded}
                    className={`w-full text-left py-5 sm:py-7 px-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 group cursor-pointer select-none rounded-xl ${
                      isExpanded
                        ? 'bg-bg-surface text-txt-primary'
                        : 'hover:bg-bg-surface/80 hover:translate-x-1.5'
                    }`}
                  >
                    {/* Left: Thumbnail Preview + Title + Thin Company Name */}
                    <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                      {/* Small Inline Preview Thumbnail */}
                      {work.coverImage && (
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-bg-muted border border-border-subtle group-hover:border-brand-primary/60 transition-all duration-300 shadow-sm">
                          <img
                            src={work.coverImage}
                            alt={work.altText || work.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Title & Thin Company text */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 truncate">
                        <span className="font-['DM_Sans'] font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-txt-primary group-hover:text-brand-primary transition-colors truncate">
                          {work.title}
                        </span>

                        {/* Thin text: Name of the company */}
                        {work.company && (
                          <span className="font-['Space_Grotesk'] font-light text-txt-muted group-hover:text-txt-secondary text-xs sm:text-sm md:text-base transition-colors flex-shrink-0">
                            / {work.company}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Rectangle Box (Kind of Project) + Year + Big Borderless Arrow */}
                    <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 flex-shrink-0">
                      {/* Rectangle Box for Kind of Project */}
                      <span className="px-3 py-1 bg-bg-muted/90 rounded border border-border-subtle font-mono text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-wider flex-shrink-0">
                        {work.kind ? work.kind.replace('-', ' ') : work.category}
                      </span>

                      {/* Year */}
                      <span className="font-mono text-xs text-txt-muted hidden sm:inline-block">
                        {work.year}
                      </span>

                      {/* Big Borderless Arrow */}
                      <span
                        className={`text-2xl sm:text-3xl font-bold transition-transform duration-300 ease-out select-none ${
                          isExpanded
                            ? 'rotate-180 text-brand-primary'
                            : 'text-txt-muted group-hover:text-brand-primary group-hover:translate-y-0.5'
                        }`}
                      >
                        ↓
                      </span>
                    </div>
                  </button>

                  {/* ── EXPANDED DROP-DOWN DETAILS CONTAINER ── */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded ? 'max-h-[2500px] opacity-100 py-6 sm:py-8 px-2 sm:px-6' : 'max-h-0 opacity-0 py-0'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start pt-2">

                      {/* Left Column: 50% Visual Image Canvas */}
                      <div className="lg:col-span-6">
                        <div className="w-full bg-bg-surface border border-border-default rounded-2xl overflow-hidden hover:border-brand-primary transition-all group flex flex-col shadow-md">
                          <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-border-subtle font-mono text-[11px] text-txt-muted bg-bg-surface/80">
                            <span className="font-bold text-txt-primary truncate">CASE STUDY // {work.id}</span>
                            <span>{work.year}</span>
                          </div>

                          <div className="w-full aspect-[16/10] relative overflow-hidden bg-bg-muted">
                            {work.coverImage ? (
                              <img
                                src={work.coverImage}
                                alt={work.altText || work.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-mono text-xs text-txt-muted">
                                Visual Asset Pending
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-t border-border-subtle font-mono text-[11px] text-txt-muted bg-bg-surface/80">
                            <span className="truncate">{work.role}</span>
                            <span className="text-brand-primary font-bold">{work.status.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: 50% In-Depth Description Breakdown */}
                      <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
                        <div className="flex items-center gap-3 font-mono text-xs text-brand-primary font-bold">
                          <span>PROJECT {work.id}</span>
                          <span>/</span>
                          <span className="text-txt-muted">{work.timeline}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <h3 className="font-['DM_Sans'] font-black text-2xl sm:text-3xl uppercase tracking-tight text-txt-primary">
                            {work.title}
                          </h3>
                          <p className="font-['Space_Grotesk'] text-base sm:text-lg text-brand-primary font-medium">
                            {work.tagline}
                          </p>
                        </div>

                        <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-txt-secondary leading-relaxed">
                          {work.summary}
                        </p>

                        {/* Deliverables / Architectural Focus */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
                          <span className="font-mono text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                            Key Deliverables &amp; Architectural Highlights:
                          </span>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {work.deliverables.map((item, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2.5 py-1 rounded bg-bg-surface border border-border-subtle font-mono text-[11px] sm:text-xs text-txt-primary"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack Icons */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
                          <span className="font-mono text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                            Stack &amp; Frameworks:
                          </span>
                          <div className="flex items-center gap-3">
                            {work.stack.map((tech) => (
                              <TechIcon key={tech} name={tech} size={22} />
                            ))}
                          </div>
                        </div>

                        {/* Action Links: ONLY 2 BUTTONS ("Detail" and "Check it out") */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <Button
                            onClick={() => setSelectedCaseStudy(work)}
                            variant="primary"
                            size="sm"
                          >
                            Detail →
                          </Button>
                          {work.links && work.links.length > 0 && (
                            <Button
                              href={work.links.find((l) => l.type === 'live')?.url || work.links[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="secondary"
                              size="sm"
                            >
                              Check it out ↗
                            </Button>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              </ScrollReveal>
            );
          })
        )}
      </div>

      {/* ── CASE STUDY DETAILED MODAL ── */}
      <CaseStudyModal
        project={selectedCaseStudy}
        isOpen={Boolean(selectedCaseStudy)}
        onClose={() => setSelectedCaseStudy(null)}
      />

    </section>
  );
};
