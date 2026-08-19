import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import legalData from '../data/legalPolicies.json';
import type { LegalPoliciesData } from '../types';
import { Navbar, Footer, ScrollReveal } from '../components';

interface LegalPageProps {
  initialDocId?: string;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialDocId }) => {
  const { docId: paramDocId } = useParams<{ docId?: string }>();
  const navigate = useNavigate();

  const data: LegalPoliciesData = legalData as LegalPoliciesData;
  const availableDocs = Object.values(data.documents);

  // Active document ID resolution
  const activeId = initialDocId || paramDocId || 'privacy';
  const currentDoc = data.documents[activeId] || data.documents['privacy'];

  // Scroll to top on navigation/document switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeId]);

  return (
    <div className="bg-bg-main text-txt-primary min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">
      <Navbar currentPath={`/${activeId}`} />

      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 flex-1 flex flex-col gap-10">
        
        {/* ── BREADCRUMB & BACK TO HOME ── */}
        <ScrollReveal>
          <div className="flex items-center justify-between gap-4 flex-wrap pb-6 border-b border-border-subtle">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-mono text-xs text-txt-muted hover:text-brand-primary transition-colors cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>BACK TO PORTFOLIO</span>
            </Link>

            <div className="font-mono text-xs text-txt-muted">
              LAST UPDATED: <span className="text-txt-primary font-bold">{currentDoc.lastUpdated}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── DOCUMENT SWITCHER TABS ── */}
        <ScrollReveal delay={50}>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap border-b border-border-subtle pb-4">
            {availableDocs.map((doc) => {
              const isActive = doc.id === currentDoc.id;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => navigate(`/${doc.slug}`)}
                  className={`px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full font-mono text-xs font-bold transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                      : 'bg-bg-surface border border-border-subtle text-txt-muted hover:text-txt-primary hover:border-brand-primary/50'
                  }`}
                >
                  {doc.title}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── DOCUMENT HEADER ── */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-primary font-bold">
              LEGAL // {currentDoc.id.toUpperCase()}
            </span>
            <h1 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-txt-primary">
              {currentDoc.title}
            </h1>
          </div>
        </ScrollReveal>

        {/* ── DOCUMENT CLAUSES & SECTIONS ── */}
        <div className="flex flex-col gap-8 sm:gap-10 pt-4">
          {currentDoc.sections.map((section, idx) => (
            <ScrollReveal key={section.id} delay={200 + idx * 50}>
              <article className="flex flex-col gap-3 pb-8 border-b border-border-subtle/60">
                <h2 className="font-['DM_Sans'] font-bold text-xl sm:text-2xl text-txt-primary">
                  {section.heading}
                </h2>
                
                <div className="flex flex-col gap-3 font-['Space_Grotesk'] text-sm sm:text-base text-txt-secondary leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="flex flex-col gap-2 pt-2 list-disc list-inside font-['Space_Grotesk'] text-sm sm:text-base text-txt-secondary">
                    {section.bulletPoints.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};
