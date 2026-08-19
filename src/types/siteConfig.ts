export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SiteAuthor {
  name: string;
  title: string;
  location: string;
  year: string;
}

export interface SiteConfig {
  logoText: string;
  logoTitle: string;
  location: string;
  timezone: string;
  defaultTime: string;
  defaultDate: string;
  navLinks: NavItem[];
  author: SiteAuthor;
}
