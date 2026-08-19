import React from 'react';

interface DualMorphCharsProps {
  textA: string;
  textB: string;
  activeA: boolean;
  classNameA?: string;
  classNameB?: string;
  staggerMs?: number;
}

/**
 * Morphs between textA and textB on a per-character staggered basis.
 * Both layers exist simultaneously in a grid overlay so they cross-fade/morph
 * with zero font jump and zero blank delay.
 */
export const DualMorphChars: React.FC<DualMorphCharsProps> = ({
  textA,
  textB,
  activeA,
  classNameA = '',
  classNameB = '',
  staggerMs = 20,
}) => {
  const charsA = textA.split('');
  const charsB = textB.split('');

  return (
    <span className="grid grid-cols-1 grid-rows-1 inline-grid align-baseline">
      {/* Layer A */}
      <span
        className={`col-start-1 row-start-1 inline-block ${
          activeA ? 'pointer-events-auto' : 'pointer-events-none select-none'
        } ${classNameA}`}
        aria-hidden={!activeA}
      >
        {charsA.map((char, i) => (
          <span
            key={i}
            className={`morph-item ${
              activeA ? 'morph-item--active' : 'morph-item--inactive-up'
            }`}
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Layer B */}
      <span
        className={`col-start-1 row-start-1 inline-block ${
          !activeA ? 'pointer-events-auto' : 'pointer-events-none select-none'
        } ${classNameB}`}
        aria-hidden={activeA}
      >
        {charsB.map((char, i) => (
          <span
            key={i}
            className={`morph-item ${
              !activeA ? 'morph-item--active' : 'morph-item--inactive-down'
            }`}
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
};

interface DualMorphWordsProps {
  textA: string;
  textB: string;
  activeA: boolean;
  classNameA?: string;
  classNameB?: string;
  staggerMs?: number;
}

/**
 * Morphs between two sentences word-by-word with staggered spring transitions.
 */
export const DualMorphWords: React.FC<DualMorphWordsProps> = ({
  textA,
  textB,
  activeA,
  classNameA = '',
  classNameB = '',
  staggerMs = 15,
}) => {
  const wordsA = textA.split(' ');
  const wordsB = textB.split(' ');

  return (
    <span className="grid grid-cols-1 grid-rows-1 inline-grid w-full">
      {/* Layer A */}
      <span
        className={`col-start-1 row-start-1 ${
          activeA ? 'pointer-events-auto' : 'pointer-events-none select-none'
        } ${classNameA}`}
        aria-hidden={!activeA}
      >
        {wordsA.map((word, i) => (
          <span
            key={i}
            className={`morph-item ${
              activeA ? 'morph-item--active' : 'morph-item--inactive-up'
            }`}
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {word}
            {i < wordsA.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>

      {/* Layer B */}
      <span
        className={`col-start-1 row-start-1 ${
          !activeA ? 'pointer-events-auto' : 'pointer-events-none select-none'
        } ${classNameB}`}
        aria-hidden={activeA}
      >
        {wordsB.map((word, i) => (
          <span
            key={i}
            className={`morph-item ${
              !activeA ? 'morph-item--active' : 'morph-item--inactive-down'
            }`}
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {word}
            {i < wordsB.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </span>
  );
};

interface DualMorphBlockProps {
  nodeA: React.ReactNode;
  nodeB: React.ReactNode;
  activeA: boolean;
  className?: string;
  classNameA?: string;
  classNameB?: string;
}

/**
 * Morphs between two arbitrary React nodes with simultaneous dual-layer cross-fade.
 */
export const DualMorphBlock: React.FC<DualMorphBlockProps> = ({
  nodeA,
  nodeB,
  activeA,
  className = '',
  classNameA = '',
  classNameB = '',
}) => {
  return (
    <div className={`grid grid-cols-1 grid-rows-1 ${className}`}>
      <div
        className={`morph-layer ${
          activeA ? 'morph-layer--active' : 'morph-layer--inactive-up'
        } ${classNameA}`}
        aria-hidden={!activeA}
      >
        {nodeA}
      </div>
      <div
        className={`morph-layer ${
          !activeA ? 'morph-layer--active' : 'morph-layer--inactive-down'
        } ${classNameB}`}
        aria-hidden={activeA}
      >
        {nodeB}
      </div>
    </div>
  );
};
