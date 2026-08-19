export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export interface LegalDocument {
  id: string;
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalPoliciesData {
  documents: Record<string, LegalDocument>;
}
