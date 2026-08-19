import React, { useState, useRef, useEffect } from 'react';
import type { ProjectCategory } from '../types';

interface CategoryFilterDropdownProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  filteredCount?: number;
}

export const CategoryFilterDropdown: React.FC<CategoryFilterDropdownProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  filteredCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeItem = categories.find((c) => c.id === activeCategory) || categories[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative z-30 inline-block text-left font-mono">
      {/* ── DROPDOWN TRIGGER BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 select-none cursor-pointer ${
          isOpen || activeCategory !== 'all'
            ? 'bg-bg-surface text-brand-primary border-brand-primary shadow-[0_0_15px_rgba(255,69,0,0.15)]'
            : 'bg-bg-surface/80 text-txt-secondary hover:text-brand-primary border-border-default hover:border-brand-primary'
        }`}
      >
        <span className="text-[10px] text-txt-muted uppercase tracking-wider group-hover:text-txt-secondary">
          FILTER:
        </span>
        <span className="uppercase tracking-wider">
          {activeItem ? activeItem.label : 'ALL'}
        </span>
        {filteredCount !== undefined && (
          <span className="px-1.5 py-0.2 rounded bg-bg-muted text-[10px] text-brand-primary font-bold">
            0{filteredCount}
          </span>
        )}
        <span
          className={`text-brand-primary text-xs font-bold transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▾
        </span>
      </button>

      {/* ── DROPDOWN MENU POPUP ── */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 sm:w-60 bg-[#121212] border border-border-default rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.95)] py-1.5 z-50 animate-scale-up backdrop-blur-md overflow-hidden">
          <div className="px-3 py-2 border-b border-border-subtle text-[10px] font-bold text-txt-muted uppercase tracking-widest">
            SELECT DISCIPLINE
          </div>

          <div className="flex flex-col py-1">
            {categories.map((cat) => {
              const isSelected = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors select-none cursor-pointer ${
                    isSelected
                      ? 'bg-brand-primary/10 text-brand-primary'
                      : 'text-txt-secondary hover:text-txt-primary hover:bg-bg-surface'
                  }`}
                >
                  <span className="uppercase tracking-wider">{cat.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
