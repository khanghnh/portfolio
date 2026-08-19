import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useLiveClock } from '../hooks';
import { smoothScrollTo } from '../utils/smoothScroll';
import siteConfigData from '../data/siteConfig.json';
import type { SiteConfig } from '../types';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath: _currentPath = '/' }) => {
  const { dateStr, fullTimeStr } = useLiveClock();
  const location = useLocation();
  const navigate = useNavigate();
  const config: SiteConfig = siteConfigData as SiteConfig;
  const logoChars = (config.logoText || 'khanghuynh.').split('');
  const isHome = location.pathname === '/';

  // Real-time active section tracker ('#works' | '#cta' | '')
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash || '';
    }
    return '';
  });

  // Mobile hamburger menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Real-time scroll observation to dynamically activate button hover/active state
  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setActiveSection('');
        return;
      }

      const scrollPosition = window.scrollY + 200;
      const worksElem = document.getElementById('works');
      const ctaElem = document.getElementById('cta');

      if (ctaElem && scrollPosition >= ctaElem.offsetTop) {
        setActiveSection('#cta');
      } else if (worksElem && scrollPosition >= worksElem.offsetTop) {
        setActiveSection('#works');
      } else {
        setActiveSection('');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [isHome]);

  // Close mobile drawer when route/location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // ESC key listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Logo Click: always return to / at top section
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
      setActiveSection('');
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (isHome) {
        smoothScrollTo(href);
      } else {
        navigate(`/${href}`);
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle/30 bg-bg-main/80 backdrop-blur-lg transition-colors">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">

          {/* ── LEFT ZONE: LIVE CLOCK (CLEAN MONOSPACE) ── */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-[10px] sm:text-xs text-txt-secondary font-medium tracking-tight select-none flex-shrink-0">
            {/* Desktop Full Date */}
            <span className="hidden lg:inline-flex items-center gap-1.5 text-txt-primary font-bold">
              {dateStr || config.defaultDate}
            </span>
            <span className="hidden lg:inline text-txt-muted/60">/</span>

            {/* Live Dynamic Time */}
            <span className="text-brand-primary font-mono font-bold tracking-wider">
              {fullTimeStr || config.defaultTime}
            </span>
          </div>

          {/* ── CENTER ZONE: SMOOTH MORPHING LOGO (CLICK TO RETURN HOME TOP) ── */}
          <div className="flex-1 flex justify-center px-1 sm:px-2 min-w-0">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="logo-morph-link text-base sm:text-2xl md:text-3xl lg:text-4xl tracking-tight select-none truncate cursor-pointer"
              title="Return to top of page"
            >
              {logoChars.map((char, i) => (
                <span key={i} className="logo-char-wrapper">
                  <span className="logo-char-primary">{char}</span>
                  <span className="logo-char-serif">{char}</span>
                </span>
              ))}
            </Link>
          </div>

          {/* ── RIGHT ZONE 1: DESKTOP/TABLET BRACKET BUTTONS (>= md) ── */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 md:gap-4 font-mono text-xs flex-shrink-0">
            {config.navLinks.map((item) => {
              const isCurrent = isHome && (
                activeSection === item.href ||
                (activeSection === '#work' && item.href === '#works') ||
                (activeSection === '#works' && item.href === '#works') ||
                (activeSection === '#cta' && item.href === '#cta')
              );

              return (
                <Button
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  variant="text-bracket"
                  size="sm"
                  className={`transition-all ${
                    isCurrent
                      ? 'active !text-white'
                      : 'text-txt-muted hover:text-txt-primary'
                  }`}
                >
                  <span className="text-xs tracking-wider">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* ── RIGHT ZONE 2: MOBILE BRUTALIST BRACKET TRIGGER (< md) ── */}
          <div className="flex md:hidden items-center flex-shrink-0">
            <Button
              variant="text-bracket"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="!px-0 cursor-pointer select-none"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="text-brand-primary font-bold text-xs">
                {isMobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
              </span>
            </Button>
          </div>

        </div>
      </header>

      {/* ── MOBILE FULLSCREEN NAVIGATION DRAWER (< md) ── */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 text-txt-primary animate-fadeIn"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="logo-morph-link text-2xl tracking-tight select-none cursor-pointer"
            >
              {logoChars.map((char, i) => (
                <span key={i} className="logo-char-wrapper">
                  <span className="logo-char-primary">{char}</span>
                  <span className="logo-char-serif">{char}</span>
                </span>
              ))}
            </Link>

            {/* Brutalist Bracket Close Button */}
            <Button
              variant="text-bracket"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="!px-0 cursor-pointer"
            >
              <span className="text-brand-primary font-bold text-xs">CLOSE ✕</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 my-auto py-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-primary font-bold">
              00 // DIRECTORY INDEX
            </div>

            <div className="flex flex-col gap-3">
              {config.navLinks.map((item, idx) => {
                const isCurrent = isHome && (
                  activeSection === item.href ||
                  (activeSection === '#work' && item.href === '#works') ||
                  (activeSection === '#works' && item.href === '#works') ||
                  (activeSection === '#cta' && item.href === '#cta')
                );

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group flex items-baseline justify-between py-2.5 border-b border-border-subtle/50 transition-all hover:translate-x-1 cursor-pointer select-none ${
                      isCurrent ? 'text-brand-primary' : 'text-txt-primary hover:text-brand-primary'
                    }`}
                  >
                    <span className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-tight">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-brand-primary font-bold">
                      0{idx + 1} // ↗
                    </span>
                  </a>
                );
              })}

              <Link
                to="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2.5 border-b border-border-subtle/50 text-txt-muted hover:text-txt-primary transition-all hover:translate-x-1 cursor-pointer select-none"
              >
                <span className="font-['DM_Sans'] font-bold text-lg sm:text-xl uppercase tracking-tight">
                  Privacy Policy
                </span>
                <span className="font-mono text-xs text-txt-muted">03 //</span>
              </Link>

              <Link
                to="/terms"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2.5 border-b border-border-subtle/50 text-txt-muted hover:text-txt-primary transition-all hover:translate-x-1 cursor-pointer select-none"
              >
                <span className="font-['DM_Sans'] font-bold text-lg sm:text-xl uppercase tracking-tight">
                  Terms of Service
                </span>
                <span className="font-mono text-xs text-txt-muted">04 //</span>
              </Link>

              <Link
                to="/licenses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2.5 border-b border-border-subtle/50 text-txt-muted hover:text-txt-primary transition-all hover:translate-x-1 cursor-pointer select-none"
              >
                <span className="font-['DM_Sans'] font-bold text-lg sm:text-xl uppercase tracking-tight">
                  Licenses &amp; OSS
                </span>
                <span className="font-mono text-xs text-txt-muted">05 //</span>
              </Link>
            </div>
          </div>

          {/* Drawer Footer Status & Action */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border-subtle font-mono text-xs">
            <div className="flex items-center justify-between text-txt-muted">
              <span>{config.location}</span>
              <span className="text-brand-primary font-bold">{fullTimeStr}</span>
            </div>

            <Button
              href="mailto:khanghuynh6587@gmail.com"
              variant="primary"
              size="md"
              className="w-full justify-center text-center shadow-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start a project →
            </Button>
          </div>

        </div>
      )}
    </>
  );
};
