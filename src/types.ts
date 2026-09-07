export interface LinkItem {
  id: string;
  label: string;
  url: string;
  emoji: string;
}

export interface BioProfile {
  name: string;
  bio: string;
  avatarGradientId: string;
  themeId: string;
  links: LinkItem[];
  updatedAt?: number;
}

export interface AvatarGradient {
  id: string;
  name: string;
  gradientClass: string; // tailwind "from-x to-y" fragment
  textClass: string; // text color for initials, contrast-matched
}

export interface PageTheme {
  id: string;
  name: string;
  bgGradient: string;
  phoneBg: string;
  buttonClass: string;
  buttonText: string;
  textPrimary: string;
  textMuted: string;
  tagClass: string;
  swatchGradient: string;
}

export interface ThemeGlowStyle {
  orb1: string;
  orb2: string;
  stageBorder: string;
  stageBg: string;
}
