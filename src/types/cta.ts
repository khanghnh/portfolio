export interface CtaControlStrip {
  tag: string;
  status: string;
}

export interface CtaHeadline {
  word1: string;
  word2: string;
}

export interface CtaCopyEmail {
  defaultText: string;
  copiedText: string;
  icon: string;
}

export interface CtaBackToTop {
  label: string;
  arrow: string;
}

export interface CtaData {
  controlStrip: CtaControlStrip;
  headline: CtaHeadline;
  subtitle: string;
  email: string;
  copyEmail: CtaCopyEmail;
  backToTop: CtaBackToTop;
}
