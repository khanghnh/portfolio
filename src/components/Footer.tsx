import React from 'react';
import { Link } from 'react-router-dom';
import footerData from '../data/footer.json';
import type { FooterData } from '../types';

export const Footer: React.FC = () => {
  const footer: FooterData = footerData as FooterData;

  return (
    <footer className="w-full bg-[#0a0a0a] py-6 sm:py-8 transition-colors border-t border-border-subtle/40">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs text-txt-muted text-center md:text-left">

        {/* Left: Identity & Copyright */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
          <span className="font-bold text-txt-primary">{footer.brand.name}</span>
          <span className="hidden sm:inline text-txt-muted/60">/</span>
          <span className="text-txt-secondary tracking-wider">
            © {footer.brand.year} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Right: Clean Legal Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-5 gap-y-2">
          {footer.legalLinks.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="text-txt-secondary hover:text-brand-primary transition-colors underline decoration-border-subtle hover:decoration-brand-primary underline-offset-4 tracking-tight"
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
};
