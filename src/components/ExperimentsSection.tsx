import React, { useState } from 'react';
import type { ExperimentProject, ProjectCategory, WorkProject } from '../types';
import { TechIcon } from './TechIcon';
import { Button } from './Button';
import { ScrollReveal } from './ScrollReveal';
import { CaseStudyModal } from './CaseStudyModal';
import { CategoryFilterDropdown } from './CategoryFilterDropdown';
import categoriesData from '../data/projectCategories.json';

interface ExperimentsSectionProps {
  experiments: ExperimentProject[];
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({ experiments }) => {
  const categories: ProjectCategory[] = categoriesData as ProjectCategory[];
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter experiments by active discipline category
  const filteredExperiments = experiments.filter((exp) => {
    if (activeCategory === 'all') return true;
    return exp.kind === activeCategory;
  });

  // Store expanded experiment ID
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Modal state: active project/experiment for deep breakdown modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<WorkProject | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenDetail = (exp: ExperimentProject) => {
    const experimentAsWork: WorkProject = {
      id: exp.id,
      slug: exp.id,
      title: exp.title,
      company: exp.company,
      kind: exp.kind,
      tagline: `${exp.tag} · ${exp.category}`,
      role: exp.company || 'Lab Researcher & Developer',
      year: exp.date,
      timeline: 'Lab Prototype',
      status: 'production',
      category: exp.category,
      summary: exp.description,
      detailedParagraphs: [
        exp.description,
        `Built as an exploratory prototype investigating ${exp.technologies.join(', ')} performance constraints, hardware acceleration boundaries, and tactile micro-interaction patterns.`
      ],
      problemStatement: `Exploratory research into optimizing real-time rendering pipelines and responsive interaction physics without framework bloat.`,
      solution: `Engineered an isolated prototype using pure ${exp.technologies[0] || 'TypeScript'} and modular event dispatchers.`,
      deliverables: [
        exp.tag,
        'Interactive Physics Pipeline',
        'Modular Test Architecture'
      ],
      stack: exp.technologies,
      coverImage: exp.image,
      altText: exp.altText,
      featured: true,
      links: [
        ...(exp.previewUrl && exp.previewUrl !== '#' ? [{ label: 'Check it out', url: exp.previewUrl, type: 'live' }] : []),
        ...(exp.githubUrl ? [{ label: 'Source Code', url: exp.githubUrl, type: 'github' }] : [])
      ]
    };
    setSelectedCaseStudy(experimentAsWork);
  };

  return (
    <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t-2 border-border-subtle flex flex-col gap-10 sm:gap-12">

      {/* ── SECTION HEADER & DYNAMIC CATEGORY FILTER DROPDOWN ── */}
      <ScrollReveal className="relative z-30">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-border-subtle pb-5">
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <span className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-brand-primary font-bold">
              03 // LAB &amp; PROTOTYPES
            </span>
            <h2 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-txt-primary">
              Experiments
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-xs text-txt-muted uppercase hidden lg:inline-block">
              CLICK ROW TO EXPAND PREVIEW
            </span>

            {/* Dynamic Category Filter Dropdown */}
            <CategoryFilterDropdown
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              filteredCount={filteredExperiments.length}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* ── INTERACTIVE EXPANDABLE ACCORDION ROWS ── */}
      <div className="flex flex-col border-t border-border-subtle">
        {filteredExperiments.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs sm:text-sm text-txt-muted">
            NO EXPERIMENTS FOUND FOR CURRENT FILTER.
          </div>
        ) : (
          filteredExperiments.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            const linkUrl = exp.previewUrl && exp.previewUrl !== '#' ? exp.previewUrl : exp.githubUrl;

            return (
              <ScrollReveal key={exp.id} delay={idx * 50}>
                <div className="border-b border-border-subtle transition-colors duration-200">

                  {/* ── CONCISE ROW (DEFAULT STATE) ── */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(exp.id)}
                    aria-expanded={isExpanded}
                    className={`w-full text-left py-5 sm:py-7 px-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 group cursor-pointer select-none rounded-xl ${
                      isExpanded
                        ? 'bg-bg-surface text-txt-primary'
                        : 'hover:bg-bg-surface/80 hover:translate-x-1.5'
                    }`}
                  >
                    {/* Left: Thumbnail Preview + Title */}
                    <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                      {/* Small Inline Preview Thumbnail */}
                      {exp.image && (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-bg-muted border border-border-subtle group-hover:border-brand-primary/60 transition-all duration-300 shadow-sm">
                          <img
                            src={exp.image}
                            alt={exp.altText || exp.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <span className="font-['DM_Sans'] font-black text-lg sm:text-2xl md:text-3xl uppercase tracking-tight text-txt-primary group-hover:text-brand-primary transition-colors truncate">
                        {exp.title}
                      </span>
                    </div>

                    {/* Right: Kind Box, Date & Big Borderless Expand Arrow */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 font-mono text-xs flex-shrink-0">
                      {exp.kind && (
                        <span className="px-2.5 py-0.5 rounded bg-bg-muted/80 border border-border-subtle text-[10px] text-txt-muted uppercase font-bold hidden md:inline-block">
                          {exp.kind.replace('-', ' ')}
                        </span>
                      )}

                      <span className="text-txt-muted">{exp.date}</span>

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

                  {/* ── EXPANDED DETAILS ACCORDION CONTAINER (MATCHES WORKS DESIGN & 50/50 PROPORTION) ── */}
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
                            <span className="font-bold text-txt-primary truncate">LAB // {exp.tag}</span>
                            <span>{exp.date}</span>
                          </div>

                          <div className="w-full aspect-[16/10] relative overflow-hidden bg-bg-muted">
                            {exp.image ? (
                              <img
                                src={exp.image}
                                alt={exp.altText || exp.title}
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
                            <span>{exp.company || 'Lab Prototype'}</span>
                            <span className="text-brand-primary font-bold">PROTOTYPE</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: 50% In-Depth Description Breakdown */}
                      <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
                        <div className="flex items-center gap-3 font-mono text-xs text-brand-primary font-bold">
                          <span>PROTOTYPE {exp.id.toUpperCase()}</span>
                          <span>/</span>
                          <span className="text-txt-muted">{exp.date}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <h3 className="font-['DM_Sans'] font-black text-2xl sm:text-3xl uppercase tracking-tight text-txt-primary">
                            {exp.title}
                          </h3>
                          <p className="font-['Space_Grotesk'] text-base sm:text-lg text-brand-primary font-medium">
                            {exp.tag} · {exp.category}
                          </p>
                        </div>

                        <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-txt-secondary leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Technologies Explored */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-border-subtle">
                          <span className="font-mono text-[11px] font-bold text-txt-muted uppercase tracking-wider">
                            Technologies Explored:
                          </span>
                          <div className="flex items-center gap-3">
                            {exp.technologies.map((tech) => (
                              <TechIcon key={tech} name={tech} size={22} />
                            ))}
                          </div>
                        </div>

                        {/* Action Links: ONLY 2 BUTTONS ("Detail" and "Check it out") */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <Button
                            onClick={() => handleOpenDetail(exp)}
                            variant="primary"
                            size="sm"
                          >
                            Detail →
                          </Button>
                          {linkUrl && (
                            <Button
                              href={linkUrl}
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
