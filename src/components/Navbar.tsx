import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useLiveClock } from '../hooks';
import { smoothScrollTo } from '../utils/smoothScroll';
import siteConfigData from '../data/siteConfig.json';
import type { SiteConfig } from '../types';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const { dateStr, fullTimeStr } = useLiveClock();
  const location = useLocation();
  const navigate = useNavigate();
  const config: SiteConfig = siteConfigData as SiteConfig;
  const logoChars = (config.logoText || 'khanghuynh.').split('');
  const isHome = location.pathname === '/';

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (isHome) {
        smoothScrollTo(href);
      } else {
        navigate(`/${href}`);
      }
    }
  };

  return (
    <header className="w-full border-b border-border-subtle bg-transparent transition-colors">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">

        {/* Left Live Clock: DATE | TIME + TIMEZONE (Responsive Typography) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-[10px] sm:text-xs text-txt-secondary font-medium tracking-tight select-none flex-shrink-0">
          <span className="hidden md:inline-flex items-center gap-1.5 text-txt-primary font-bold">
            {dateStr || config.defaultDate}
          </span>
          <span className="hidden md:inline text-txt-muted/60">/</span>
          <span className="text-brand-primary font-mono font-bold tracking-wider">
            {fullTimeStr || config.defaultTime}
          </span>
        </div>

        {/* Center Lowercase Smooth Morphing Logo */}
        <div className="flex-1 flex justify-center px-2">
          <Link
            to="/"
            className="logo-morph-link text-xl sm:text-3xl md:text-4xl tracking-tight select-none"
            title={config.logoTitle}
          >
            {logoChars.map((char, i) => (
              <span key={i} className="logo-char-wrapper">
                <span className="logo-char-primary">{char}</span>
                <span className="logo-char-serif">{char}</span>
              </span>
            ))}
          </Link>
        </div>

        {/* Right Navigation Actions (Works & Contact) */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs flex-shrink-0">
          {config.navLinks.map((item) => (
            <Button
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              variant="text-bracket"
              size="sm"
              className={currentPath === item.href ? 'active !text-white' : ''}
            >
              <span>{item.label}</span>
            </Button>
          ))}
        </div>

      </div>
    </header>
  );
};
