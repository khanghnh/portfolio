export interface FooterBrand {
  name: string;
  role: string;
  year: string;
}

export interface LegalLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterData {
  brand: FooterBrand;
  legalLinks: LegalLink[];
}
