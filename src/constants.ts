import { AvatarGradient, BioProfile, PageTheme, ThemeGlowStyle } from './types.ts';

export const AVATAR_GRADIENTS: AvatarGradient[] = [
  {
    id: 'violet-pink',
    name: 'Indigo Violet',
    gradientClass: 'from-indigo-500 to-purple-500',
    textClass: 'text-white',
  },
  {
    id: 'sunset-amber',
    name: 'Rose Coral',
    gradientClass: 'from-rose-400 to-orange-400',
    textClass: 'text-white',
  },
  {
    id: 'emerald-teal',
    name: 'Emerald Cyan',
    gradientClass: 'from-emerald-400 to-cyan-400',
    textClass: 'text-white',
  },
  {
    id: 'amber-gold',
    name: 'Amber Glow',
    gradientClass: 'from-amber-200 to-yellow-500',
    textClass: 'text-slate-900',
  },
  {
    id: 'midnight-slate',
    name: 'Slate Indigo',
    gradientClass: 'from-slate-800 to-slate-950',
    textClass: 'text-white',
  },
];

export const PAGE_THEMES: PageTheme[] = [
  {
    id: 'sunset',
    name: 'Sunset Rose',
    bgGradient: 'bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50',
    phoneBg: 'bg-gradient-to-b from-rose-100/90 via-amber-50 to-orange-100/80',
    buttonClass: 'bg-white/95 text-slate-800 shadow-xs hover:shadow-md border border-rose-100/80 hover:bg-white',
    buttonText: 'text-slate-800',
    textPrimary: 'text-slate-900',
    textMuted: 'text-slate-600',
    tagClass: 'bg-rose-100/80 text-rose-800 border-rose-200',
    swatchGradient: 'from-rose-200 via-amber-100 to-orange-200',
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    bgGradient: 'bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50',
    phoneBg: 'bg-gradient-to-b from-sky-100/90 via-cyan-50 to-blue-100/80',
    buttonClass: 'bg-white/95 text-slate-800 shadow-xs hover:shadow-md border border-sky-100/80 hover:bg-white',
    buttonText: 'text-slate-800',
    textPrimary: 'text-slate-900',
    textMuted: 'text-slate-600',
    tagClass: 'bg-sky-100/80 text-sky-800 border-sky-200',
    swatchGradient: 'from-sky-200 via-cyan-100 to-blue-200',
  },
  {
    id: 'midnight',
    name: 'Midnight Slate',
    bgGradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
    phoneBg: 'bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950',
    buttonClass: 'bg-slate-800/90 text-slate-100 shadow-xs hover:shadow-md border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600',
    buttonText: 'text-slate-100',
    textPrimary: 'text-white',
    textMuted: 'text-slate-400',
    tagClass: 'bg-indigo-900/60 text-indigo-200 border-indigo-700/60',
    swatchGradient: 'from-slate-900 via-indigo-950 to-slate-950',
  },
  {
    id: 'mint',
    name: 'Fresh Mint',
    bgGradient: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50',
    phoneBg: 'bg-gradient-to-b from-emerald-100/90 via-teal-50 to-green-100/80',
    buttonClass: 'bg-white/95 text-slate-800 shadow-xs hover:shadow-md border border-emerald-100/80 hover:bg-white',
    buttonText: 'text-slate-800',
    textPrimary: 'text-slate-900',
    textMuted: 'text-slate-600',
    tagClass: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    swatchGradient: 'from-emerald-200 via-teal-100 to-green-200',
  },
];

export const THEME_GLOW_STYLES: Record<string, ThemeGlowStyle> = {
  sunset: {
    orb1: 'from-rose-400/25 to-amber-300/25',
    orb2: 'from-orange-400/20 to-pink-400/20',
    stageBorder: 'border-rose-200/50',
    stageBg: 'bg-rose-50/30',
  },
  ocean: {
    orb1: 'from-sky-400/25 to-cyan-300/25',
    orb2: 'from-blue-400/20 to-teal-400/20',
    stageBorder: 'border-sky-200/50',
    stageBg: 'bg-sky-50/30',
  },
  midnight: {
    orb1: 'from-indigo-600/25 to-purple-600/20',
    orb2: 'from-blue-600/20 to-slate-700/25',
    stageBorder: 'border-slate-800/80',
    stageBg: 'bg-slate-900/40',
  },
  mint: {
    orb1: 'from-emerald-400/25 to-teal-300/25',
    orb2: 'from-green-400/20 to-cyan-400/20',
    stageBorder: 'border-emerald-200/50',
    stageBg: 'bg-emerald-50/30',
  },
};

export const POPULAR_EMOJIS: string[] = [
  '📷', '📹', '🌐', '✍️', '💼', '🎵', '🎙️', '☕', '⚡', '🔗', '📱', '✉️', '🚀', '💻', '🎨'
];

export const INITIAL_PROFILE: BioProfile = {
  name: 'Alex Rivera',
  bio: 'Product Designer & Creator building digital experiences & creative tools.',
  avatarGradientId: 'violet-pink',
  themeId: 'sunset',
  links: [
    {
      id: 'demo-1',
      label: 'Portfolio & Case Studies',
      url: 'https://alexrivera.design',
      emoji: '🌐',
    },
    {
      id: 'demo-2',
      label: 'Design Tutorials & Vlogs',
      url: 'https://youtube.com/@alexrivera',
      emoji: '📹',
    },
    {
      id: 'demo-3',
      label: 'Daily Visual Inspiration',
      url: 'https://instagram.com/alexrivera',
      emoji: '📷',
    },
    {
      id: 'demo-4',
      label: 'Weekly Design Letter',
      url: 'https://alexrivera.substack.com',
      emoji: '✍️',
    },
  ],
};
