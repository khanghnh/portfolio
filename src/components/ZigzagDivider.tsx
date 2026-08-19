import React from 'react';

interface ZigzagDividerProps {
  className?: string;
  color?: string;
  toothWidth?: number;
  toothHeight?: number;
}

export const ZigzagDivider: React.FC<ZigzagDividerProps> = ({
  className = '',
  color = 'rgba(255, 255, 255, 0.35)',
  toothWidth = 56,
  toothHeight = 24,
}) => {
  const halfWidth = toothWidth / 2;

  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none flex items-center py-3 sm:py-4 ${className}`}>
      <svg
        className="w-full opacity-85"
        width="100%"
        height={toothHeight}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`sawtooth-${toothWidth}-${toothHeight}`}
            width={toothWidth}
            height={toothHeight}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M0 ${toothHeight - 3} L${halfWidth} 3 L${toothWidth} ${toothHeight - 3}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height={toothHeight}
          fill={`url(#sawtooth-${toothWidth}-${toothHeight})`}
        />
      </svg>
    </div>
  );
};
