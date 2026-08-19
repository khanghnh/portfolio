import React from 'react';
import {
  PhotoshopIcon,
  IllustratorIcon,
  LightroomIcon,
  PremiereIcon,
  AfterEffectsIcon,
} from './AdobeIcons';
import {
  siReact,
  siNestjs,
  siTypescript,
  siJavascript,
  siNodedotjs,
  siTailwindcss,
  siGit,
  siGithub,
  siFigma,
  siVite,
  siNextdotjs,
  siPrisma,
  siPostgresql,
  siRedis,
  siHtml5
} from 'simple-icons';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  showTooltip?: boolean;
}

// Adobe app icon component map
const adobeComponentMap: Record<string, { label: string; Component: React.FC<{ size?: number; className?: string }> }> = {
  photoshop:      { label: 'Photoshop',   Component: PhotoshopIcon },
  ps:             { label: 'Photoshop',   Component: PhotoshopIcon },
  lightroom:      { label: 'Lightroom',   Component: LightroomIcon },
  lr:             { label: 'Lightroom',   Component: LightroomIcon },
  illustrator:    { label: 'Illustrator', Component: IllustratorIcon },
  ai:             { label: 'Illustrator', Component: IllustratorIcon },
  premiere:       { label: 'Premiere Pro', Component: PremiereIcon },
  'premiere pro': { label: 'Premiere Pro', Component: PremiereIcon },
  pr:             { label: 'Premiere Pro', Component: PremiereIcon },
  aftereffects:   { label: 'After Effects', Component: AfterEffectsIcon },
  'after effects':{ label: 'After Effects', Component: AfterEffectsIcon },
  ae:             { label: 'After Effects', Component: AfterEffectsIcon },
};

const simpleIconsMap: Record<string, { svg: string; color: string }> = {
  react: { svg: siReact.svg, color: '#61DAFB' },
  reactjs: { svg: siReact.svg, color: '#61DAFB' },
  'react 19': { svg: siReact.svg, color: '#61DAFB' },
  nestjs: { svg: siNestjs.svg, color: '#E0234E' },
  nest: { svg: siNestjs.svg, color: '#E0234E' },
  typescript: { svg: siTypescript.svg, color: '#3178C6' },
  ts: { svg: siTypescript.svg, color: '#3178C6' },
  javascript: { svg: siJavascript.svg, color: '#F7DF1E' },
  js: { svg: siJavascript.svg, color: '#F7DF1E' },
  nodejs: { svg: siNodedotjs.svg, color: '#5FA04E' },
  node: { svg: siNodedotjs.svg, color: '#5FA04E' },
  'node.js': { svg: siNodedotjs.svg, color: '#5FA04E' },
  tailwind: { svg: siTailwindcss.svg, color: '#06B6D4' },
  tailwindcss: { svg: siTailwindcss.svg, color: '#06B6D4' },
  'tailwind css': { svg: siTailwindcss.svg, color: '#06B6D4' },
  git: { svg: siGit.svg, color: '#F05032' },
  github: { svg: siGithub.svg, color: '#FFFFFF' },
  figma: { svg: siFigma.svg, color: '#F24E1E' },
  vite: { svg: siVite.svg, color: '#646CFF' },
  nextjs: { svg: siNextdotjs.svg, color: '#FFFFFF' },
  'next.js': { svg: siNextdotjs.svg, color: '#FFFFFF' },
  prisma: { svg: siPrisma.svg, color: '#2D3748' },
  postgresql: { svg: siPostgresql.svg, color: '#4169E1' },
  redis: { svg: siRedis.svg, color: '#FF4438' },
  canvas: { svg: siHtml5.svg, color: '#FF4500' },
};

export const TechIcon: React.FC<TechIconProps> = ({ 
  name, 
  className = '', 
  size = 28,
  showTooltip = true 
}) => {
  const normalized = name.toLowerCase().replace(/[\s._/-]/g, '');

  // 1. Check Adobe Suite — official inline SVG components (2022-2024 design)
  const adobeEntry = adobeComponentMap[normalized] || adobeComponentMap[name.toLowerCase()];
  if (adobeEntry) {
    const { label, Component } = adobeEntry;
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110 select-none ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={showTooltip ? label : undefined}
      >
        <Component size={size} className="w-full h-full" />
      </div>
    );
  }

  // 2. Check Simple Icons SVG
  const matched = simpleIconsMap[normalized] || simpleIconsMap[name.toLowerCase()];
  if (matched && matched.svg) {
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-110 select-none ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        title={showTooltip ? name : undefined}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill={matched.color}
          dangerouslySetInnerHTML={{ __html: matched.svg.replace(/^<svg[^>]*>|<\/svg>$/g, '') }}
        />
      </div>
    );
  }

  // Fallback
  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 font-mono text-[11px] font-bold text-txt-primary border border-border-subtle rounded select-none uppercase px-1.5 py-0.5 ${className}`}
      title={showTooltip ? name : undefined}
    >
      {name}
    </div>
  );
};
