import React from 'react';
import {
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Twitch,
  Figma,
  Dribbble,
  Facebook,
  Send,
  BookOpen,
  Mail,
  Code,
} from 'lucide-react';

export interface PlatformInfo {
  isKnown: boolean;
  name: string;
  brandColor: string;
  iconBgClass: string;
  iconTextClass: string;
  borderLeftClass: string;
  renderIcon: (className?: string) => React.ReactNode;
}

export interface PresetIconOption {
  id: string;
  name: string;
  category: 'coding' | 'social' | 'creative';
  renderIcon: (className?: string) => React.ReactNode;
}

// 1. LeetCode Icon
export function LeetCodeLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fill="#FFA116"
        d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.21 5.21 0 0 0-3.85-1.472 5.21 5.21 0 0 0-3.851 1.472l-4.32 4.38C2.33 11.238 1.8 12.59 1.8 14.282s.53 3.044 1.543 4.095l4.332 4.363a5.534 5.534 0 0 0 3.865 1.46c1.472 0 2.824-.53 3.85-1.46l2.698-2.607c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9-.039z"
      />
      <path
        fill="currentColor"
        d="M10.8 14.5h9.4c.7 0 1.3-.6 1.3-1.3s-.6-1.3-1.3-1.3h-9.4c-.7 0-1.3.6-1.3 1.3s.6 1.3 1.3 1.3z"
      />
    </svg>
  );
}

// 2. GeeksforGeeks (GFG) Logo
export function GfgLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor">
      <path d="M15.3 12.4c-.2-.6-.6-1.2-1.2-1.6-.7-.5-1.6-.8-2.6-.8-1.4 0-2.7.6-3.6 1.6-.9 1-1.4 2.3-1.4 3.8 0 1.4.5 2.8 1.4 3.8.9 1 2.2 1.6 3.6 1.6 1.1 0 2.1-.4 2.8-1.1.7-.7 1.1-1.6 1.2-2.7h-4.2v-2.2h6.7c.1.4.1.9.1 1.3 0 1.8-.7 3.4-1.9 4.6-1.2 1.3-2.9 2-4.7 2-2 0-3.9-.8-5.3-2.3C4.8 19 4 17.1 4 14.9s.8-4.1 2.2-5.6C7.6 7.8 9.5 7 11.5 7c1.7 0 3.2.6 4.4 1.7l-1.6 2.1c-.3.4-.6.9-1 1.2v.4zM26.7 18.2c-.7.7-1.7 1.1-2.8 1.1-1.4 0-2.7-.6-3.6-1.6-.9-1-1.4-2.4-1.4-3.8 0-1.5.5-2.8 1.4-3.8.9-1 2.2-1.6 3.6-1.6 1 0 1.9.3 2.6.8.6.4 1 1 1.2 1.6l1-1.6c-1.2-1.1-2.7-1.7-4.4-1.7-2 0-3.9.8-5.3 2.3-1.4 1.5-2.2 3.4-2.2 5.6s.8 4.1 2.2 5.6c1.4 1.5 3.3 2.3 5.3 2.3 1.8 0 3.5-.7 4.7-2 1.2-1.2 1.9-2.8 1.9-4.6 0-.4 0-.9-.1-1.3h-6.7v2.2h4.2c-.1 1.1-.5 2-1.2 2.7z" />
    </svg>
  );
}

// 3. Codilio / Codolio Logo
export function CodilioLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"
        fill="currentColor"
        fillOpacity="0.25"
      />
      <polyline points="8 10 5 12 8 14" strokeWidth="2.2" />
      <polyline points="16 10 19 12 16 14" strokeWidth="2.2" />
      <line x1="10.5" y1="15" x2="13.5" y2="9" strokeWidth="2.2" />
    </svg>
  );
}

// Preset brand icons selectable in the Choose Icon Emoji modal
export const PRESET_BRAND_ICONS: PresetIconOption[] = [
  {
    id: 'icon:leetcode',
    name: 'LeetCode',
    category: 'coding',
    renderIcon: (className = 'w-4.5 h-4.5') => <LeetCodeLogo className={className} />,
  },
  {
    id: 'icon:gfg',
    name: 'GeeksforGeeks',
    category: 'coding',
    renderIcon: (className = 'w-4.5 h-4.5') => <GfgLogo className={className} />,
  },
  {
    id: 'icon:codilio',
    name: 'Codilio / Codolio',
    category: 'coding',
    renderIcon: (className = 'w-4.5 h-4.5') => <CodilioLogo className={className} />,
  },
  {
    id: 'icon:github',
    name: 'GitHub',
    category: 'coding',
    renderIcon: (className = 'w-4.5 h-4.5') => <Github className={className} />,
  },
  {
    id: 'icon:linkedin',
    name: 'LinkedIn',
    category: 'social',
    renderIcon: (className = 'w-4.5 h-4.5') => <Linkedin className={className} />,
  },
  {
    id: 'icon:x',
    name: 'X (Twitter)',
    category: 'social',
    renderIcon: (className = 'w-4.5 h-4.5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'icon:youtube',
    name: 'YouTube',
    category: 'social',
    renderIcon: (className = 'w-4.5 h-4.5') => <Youtube className={className} />,
  },
  {
    id: 'icon:instagram',
    name: 'Instagram',
    category: 'social',
    renderIcon: (className = 'w-4.5 h-4.5') => <Instagram className={className} />,
  },
  {
    id: 'icon:discord',
    name: 'Discord',
    category: 'social',
    renderIcon: (className = 'w-4.5 h-4.5') => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    id: 'icon:figma',
    name: 'Figma',
    category: 'creative',
    renderIcon: (className = 'w-4.5 h-4.5') => <Figma className={className} />,
  },
];

export function detectPlatform(rawUrl: string, fallbackEmoji?: string): PlatformInfo {
  const url = (rawUrl || '').toLowerCase().trim();
  const explicitIcon = (fallbackEmoji || '').trim().toLowerCase();

  // Handle explicit icon choices from the Choose Icon Emoji picker
  if (explicitIcon === 'icon:leetcode' || explicitIcon === 'leetcode') {
    return {
      isKnown: true,
      name: 'LeetCode',
      brandColor: '#FFA116',
      iconBgClass: 'bg-[#262626]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#FFA116]',
      renderIcon: (className = 'w-4.5 h-4.5') => <LeetCodeLogo className={className} />,
    };
  }

  if (explicitIcon === 'icon:gfg' || explicitIcon === 'gfg' || explicitIcon === 'geeksforgeeks') {
    return {
      isKnown: true,
      name: 'GeeksforGeeks',
      brandColor: '#2F8D46',
      iconBgClass: 'bg-[#2F8D46]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#2F8D46]',
      renderIcon: (className = 'w-4.5 h-4.5') => <GfgLogo className={className} />,
    };
  }

  if (
    explicitIcon === 'icon:codilio' ||
    explicitIcon === 'icon:codolio' ||
    explicitIcon === 'codilio' ||
    explicitIcon === 'codolio'
  ) {
    return {
      isKnown: true,
      name: 'Codilio',
      brandColor: '#6366F1',
      iconBgClass: 'bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#6366F1]',
      renderIcon: (className = 'w-4.5 h-4.5') => <CodilioLogo className={className} />,
    };
  }

  if (explicitIcon === 'icon:github') {
    return {
      isKnown: true,
      name: 'GitHub',
      brandColor: '#24292E',
      iconBgClass: 'bg-[#24292E]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#24292E]',
      renderIcon: (className = 'w-4 h-4') => <Github className={className} />,
    };
  }

  if (explicitIcon === 'icon:linkedin') {
    return {
      isKnown: true,
      name: 'LinkedIn',
      brandColor: '#0A66C2',
      iconBgClass: 'bg-[#0A66C2]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#0A66C2]',
      renderIcon: (className = 'w-4 h-4') => <Linkedin className={className} />,
    };
  }

  if (explicitIcon === 'icon:x' || explicitIcon === 'icon:twitter') {
    return {
      isKnown: true,
      name: 'X (Twitter)',
      brandColor: '#000000',
      iconBgClass: 'bg-black',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-black',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    };
  }

  if (explicitIcon === 'icon:youtube') {
    return {
      isKnown: true,
      name: 'YouTube',
      brandColor: '#FF0000',
      iconBgClass: 'bg-[#FF0000]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#FF0000]',
      renderIcon: (className = 'w-4 h-4') => <Youtube className={className} />,
    };
  }

  if (explicitIcon === 'icon:instagram') {
    return {
      isKnown: true,
      name: 'Instagram',
      brandColor: '#E1306C',
      iconBgClass: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#e1306c]',
      renderIcon: (className = 'w-4 h-4') => <Instagram className={className} />,
    };
  }

  if (explicitIcon === 'icon:discord') {
    return {
      isKnown: true,
      name: 'Discord',
      brandColor: '#5865F2',
      iconBgClass: 'bg-[#5865F2]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#5865F2]',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  };
  }

  if (explicitIcon === 'icon:figma') {
    return {
      isKnown: true,
      name: 'Figma',
      brandColor: '#A259FF',
      iconBgClass: 'bg-[#A259FF]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#A259FF]',
      renderIcon: (className = 'w-4 h-4') => <Figma className={className} />,
    };
  }

  // 1. LeetCode (via URL)
  if (url.includes('leetcode.com') || url.includes('leetcode.cn')) {
    return {
      isKnown: true,
      name: 'LeetCode',
      brandColor: '#FFA116',
      iconBgClass: 'bg-[#262626]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#FFA116]',
      renderIcon: (className = 'w-4.5 h-4.5') => <LeetCodeLogo className={className} />,
    };
  }

  // 2. GeeksforGeeks / GFG (via URL)
  if (url.includes('geeksforgeeks.org') || url.includes('gfg.dev') || url.includes('gfg.to')) {
    return {
      isKnown: true,
      name: 'GeeksforGeeks',
      brandColor: '#2F8D46',
      iconBgClass: 'bg-[#2F8D46]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#2F8D46]',
      renderIcon: (className = 'w-4.5 h-4.5') => <GfgLogo className={className} />,
    };
  }

  // 3. Codilio / Codolio (via URL)
  if (
    url.includes('codolio.com') ||
    url.includes('codilio.com') ||
    url.includes('codio.com') ||
    url.includes('codility.com')
  ) {
    return {
      isKnown: true,
      name: 'Codilio',
      brandColor: '#6366F1',
      iconBgClass: 'bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#6366F1]',
      renderIcon: (className = 'w-4.5 h-4.5') => <CodilioLogo className={className} />,
    };
  }

  // 4. Instagram
  if (url.includes('instagram.com') || url.includes('instagr.am')) {
    return {
      isKnown: true,
      name: 'Instagram',
      brandColor: '#E1306C',
      iconBgClass: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#e1306c]',
      renderIcon: (className = 'w-4 h-4') => <Instagram className={className} />,
    };
  }

  // 5. YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return {
      isKnown: true,
      name: 'YouTube',
      brandColor: '#FF0000',
      iconBgClass: 'bg-[#FF0000]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#FF0000]',
      renderIcon: (className = 'w-4 h-4') => <Youtube className={className} />,
    };
  }

  // 6. X / Twitter
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return {
      isKnown: true,
      name: 'X (Twitter)',
      brandColor: '#000000',
      iconBgClass: 'bg-black',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-black',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    };
  }

  // 7. LinkedIn
  if (url.includes('linkedin.com')) {
    return {
      isKnown: true,
      name: 'LinkedIn',
      brandColor: '#0A66C2',
      iconBgClass: 'bg-[#0A66C2]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#0A66C2]',
      renderIcon: (className = 'w-4 h-4') => <Linkedin className={className} />,
    };
  }

  // 8. GitHub
  if (url.includes('github.com')) {
    return {
      isKnown: true,
      name: 'GitHub',
      brandColor: '#24292E',
      iconBgClass: 'bg-[#24292E]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#24292E]',
      renderIcon: (className = 'w-4 h-4') => <Github className={className} />,
    };
  }

  // 9. TikTok
  if (url.includes('tiktok.com')) {
    return {
      isKnown: true,
      name: 'TikTok',
      brandColor: '#000000',
      iconBgClass: 'bg-black',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-black',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.99-4.47V8.65a8.28 8.28 0 0 0 4.78 1.5V6.7c-.33 0-.67-.01-1-.01z" />
        </svg>
      ),
    };
  }

  // 10. Spotify
  if (url.includes('spotify.com')) {
    return {
      isKnown: true,
      name: 'Spotify',
      brandColor: '#1DB954',
      iconBgClass: 'bg-[#1DB954]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#1DB954]',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.624.624 0 1 1-.278-1.218c3.811-.871 7.077-.497 9.713 1.118a.624.624 0 0 1 .207.857zm1.225-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.781.781 0 0 1-.453-1.496c3.633-1.103 8.147-.568 11.233 1.333a.78.78 0 0 1 .257 1.072zm.105-2.835C14.693 8.94 9.385 8.762 6.305 9.697a.936.936 0 1 1-.546-1.791c3.535-1.073 9.404-.862 13.14 1.356a.936.936 0 0 1-.983 1.604z" />
        </svg>
      ),
    };
  }

  // 11. Substack
  if (url.includes('substack.com')) {
    return {
      isKnown: true,
      name: 'Substack',
      brandColor: '#FF6719',
      iconBgClass: 'bg-[#FF6719]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#FF6719]',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      ),
    };
  }

  // 12. Twitch
  if (url.includes('twitch.tv')) {
    return {
      isKnown: true,
      name: 'Twitch',
      brandColor: '#9146FF',
      iconBgClass: 'bg-[#9146FF]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#9146FF]',
      renderIcon: (className = 'w-4 h-4') => <Twitch className={className} />,
    };
  }

  // 13. Discord
  if (url.includes('discord.gg') || url.includes('discord.com')) {
    return {
      isKnown: true,
      name: 'Discord',
      brandColor: '#5865F2',
      iconBgClass: 'bg-[#5865F2]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#5865F2]',
      renderIcon: (className = 'w-4 h-4') => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    };
  }

  // 14. Figma
  if (url.includes('figma.com')) {
    return {
      isKnown: true,
      name: 'Figma',
      brandColor: '#A259FF',
      iconBgClass: 'bg-[#A259FF]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#A259FF]',
      renderIcon: (className = 'w-4 h-4') => <Figma className={className} />,
    };
  }

  // 15. Dribbble
  if (url.includes('dribbble.com')) {
    return {
      isKnown: true,
      name: 'Dribbble',
      brandColor: '#EA4C89',
      iconBgClass: 'bg-[#EA4C89]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#EA4C89]',
      renderIcon: (className = 'w-4 h-4') => <Dribbble className={className} />,
    };
  }

  // 16. Facebook
  if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.me')) {
    return {
      isKnown: true,
      name: 'Facebook',
      brandColor: '#1877F2',
      iconBgClass: 'bg-[#1877F2]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#1877F2]',
      renderIcon: (className = 'w-4 h-4') => <Facebook className={className} />,
    };
  }

  // 17. Telegram
  if (url.includes('t.me') || url.includes('telegram.org') || url.includes('telegram.me')) {
    return {
      isKnown: true,
      name: 'Telegram',
      brandColor: '#24A1DE',
      iconBgClass: 'bg-[#24A1DE]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#24A1DE]',
      renderIcon: (className = 'w-4 h-4') => <Send className={className} />,
    };
  }

  // 18. Medium
  if (url.includes('medium.com')) {
    return {
      isKnown: true,
      name: 'Medium',
      brandColor: '#02B875',
      iconBgClass: 'bg-black',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#02B875]',
      renderIcon: (className = 'w-4 h-4') => <BookOpen className={className} />,
    };
  }

  // 19. Email
  if (url.startsWith('mailto:') || url.includes('gmail.com') || url.includes('outlook.com')) {
    return {
      isKnown: true,
      name: 'Email',
      brandColor: '#EA4335',
      iconBgClass: 'bg-[#EA4335]',
      iconTextClass: 'text-white',
      borderLeftClass: 'border-l-4 border-l-[#EA4335]',
      renderIcon: (className = 'w-4 h-4') => <Mail className={className} />,
    };
  }

  // Fallback
  return {
    isKnown: false,
    name: 'Website',
    brandColor: '#64748B',
    iconBgClass: 'bg-slate-100 dark:bg-slate-800',
    iconTextClass: 'text-slate-700 dark:text-slate-300',
    borderLeftClass: '',
    renderIcon: (className = 'text-sm') => (
      <span className={`inline-flex items-center justify-center select-none ${className}`}>
        {fallbackEmoji || '🔗'}
      </span>
    ),
  };
}

