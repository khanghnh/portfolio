export interface HeroPortrait {
  imageUrl: string;
  alt: string;
  tagTop: string;
  tagBottomLeft: string;
  tagBottomRight: string;
}

export interface Persona {
  perspectiveTag: string;
  toggleButtonText: string;
  headlineWord1: string;
  headlineWord2: string;
  tagline: string;
  highlightStack: string[];
}

export interface HeroActions {
  worksButtonText: string;
  worksTarget: string;
  contactButtonText: string;
  contactTarget: string;
  footnoteBadge?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  type: 'github' | 'behance' | 'linkedin' | 'email' | string;
}

export interface HeroData {
  portrait: HeroPortrait;
  personas: {
    developer: Persona;
    designer: Persona;
  };
  actions: HeroActions;
  socials: SocialLink[];
}
