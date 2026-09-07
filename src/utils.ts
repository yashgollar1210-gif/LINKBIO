import { BioProfile } from './types.ts';
import { INITIAL_PROFILE } from './constants.ts';

/**
 * Returns initials for avatar display.
 * - Empty string -> "LB"
 * - Single word -> First 2 letters in uppercase (e.g. "Alex" -> "AL")
 * - Multiple words -> First letter of first & last word (e.g. "Alex Rivera" -> "AR")
 */
export function getInitials(name?: string): string {
  if (!name || !name.trim()) return 'LB';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    const word = parts[0].replace(/[^a-zA-Z0-9]/g, '');
    return word.slice(0, 2).toUpperCase() || 'LB';
  }
  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return (first + last).toUpperCase() || 'LB';
}

/**
 * Converts a string into a clean URL-friendly slug.
 */
export function slugify(text?: string): string {
  if (!text) return 'my-linkbio';
  const clean = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric
    .replace(/[\s_]+/g, '-') // spaces to dashes
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-+|-+$/g, ''); // trim outer dashes
  return clean || 'my-linkbio';
}

/**
 * UTF-8 safe base64 encoder for BioProfile data in URL hashes
 */
export function encodeProfileToHash(profile?: BioProfile): string {
  if (!profile) return '';
  try {
    const json = JSON.stringify(profile);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (err) {
    console.error('Error encoding profile to hash:', err);
    return '';
  }
}

/**
 * UTF-8 safe base64 decoder for BioProfile data from URL hashes
 */
export function decodeProfileFromHash(encoded?: string): BioProfile | null {
  if (!encoded || !encoded.trim()) return null;
  try {
    const cleanEncoded = decodeURIComponent(encoded.trim());
    const binary = atob(cleanEncoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === 'object' && typeof parsed.name === 'string' && Array.isArray(parsed.links)) {
      return parsed as BioProfile;
    }
    return null;
  } catch (err) {
    console.warn('Error decoding profile from hash:', err);
    return null;
  }
}

const DRAFT_KEY = 'linkbio_current_draft';
const PROFILE_KEY_PREFIX = 'linkbio_profile_';
const ALL_SLUGS_KEY = 'linkbio_all_slugs';

/**
 * Persists current in-progress editor draft to localStorage
 */
export function saveDraft(profile: BioProfile): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save draft to localStorage', e);
  }
}

/**
 * Loads current in-progress editor draft from localStorage, fallback to INITIAL_PROFILE
 */
export function loadDraft(): BioProfile {
  try {
    const item = localStorage.getItem(DRAFT_KEY);
    if (item) {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed.name === 'string' && Array.isArray(parsed.links)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load draft from localStorage', e);
  }
  return INITIAL_PROFILE;
}

/**
 * Persists a published profile to localStorage mirror cache and updates recent slugs list
 */
export function saveProfile(slug: string, profile: BioProfile): void {
  try {
    const dataToSave: BioProfile = {
      ...profile,
      updatedAt: Date.now(),
    };
    localStorage.setItem(PROFILE_KEY_PREFIX + slug, JSON.stringify(dataToSave));

    // Update slug list (max 20)
    const slugsRaw = localStorage.getItem(ALL_SLUGS_KEY);
    let slugs: string[] = [];
    if (slugsRaw) {
      try {
        slugs = JSON.parse(slugsRaw);
      } catch {
        slugs = [];
      }
    }
    slugs = [slug, ...slugs.filter((s) => s !== slug)].slice(0, 20);
    localStorage.setItem(ALL_SLUGS_KEY, JSON.stringify(slugs));
  } catch (e) {
    console.warn('Failed to save profile cache to localStorage', e);
  }
}

/**
 * Extracts data= encoded parameter from hash or query string
 */
function extractDataFromUrl(): string | null {
  // Check hash for data= (e.g. #data=... or #/u/slug#data=... or #/u/slug?data=...)
  const hash = window.location.hash || '';
  if (hash.includes('data=')) {
    const match = hash.match(/[#&?]data=([^&]+)/);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Check search query for data=
  const search = window.location.search || '';
  if (search.includes('data=')) {
    const params = new URLSearchParams(search);
    const dataVal = params.get('data');
    if (dataVal) {
      return dataVal;
    }
  }

  return null;
}

/**
 * Resolves a profile to render on the public page with priority-ordered checks:
 * 1. #data=<encoded> hash on URL (self-contained, portable)
 * 2. ?data=<encoded> query parameter
 * 3. localStorage under linkbio_profile_<slug>
 * 4. Current in-progress draft if slug matches
 * 5. INITIAL_PROFILE if slug is demo slug ('alex-rivera' / 'my-linkbio')
 * 6. Fallback to draft if present, else INITIAL_PROFILE.
 */
export function getProfile(slug: string): BioProfile {
  // 1 & 2: Check URL-embedded portable data
  const encodedFromUrl = extractDataFromUrl();
  if (encodedFromUrl) {
    const decoded = decodeProfileFromHash(encodedFromUrl);
    if (decoded) {
      // Mirror to local cache for instant future loads
      saveProfile(slug, decoded);
      return decoded;
    }
  }

  // 3: Check localStorage profile cache
  try {
    const cached = localStorage.getItem(PROFILE_KEY_PREFIX + slug);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed.name === 'string' && Array.isArray(parsed.links)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cached profile from localStorage', e);
  }

  // 4: Check current draft if slug matches
  const draft = loadDraft();
  if (slugify(draft.name) === slug) {
    return draft;
  }

  // 5: Demo slug fallback
  if (slug === 'alex-rivera' || slug === 'my-linkbio') {
    return INITIAL_PROFILE;
  }

  // 6: Final fallback
  return draft || INITIAL_PROFILE;
}

/**
 * Builds a portable shareable URL carrying the full encoded profile
 */
export function generateShareUrl(slug: string, profile?: BioProfile): string {
  const origin = window.location.origin;
  const pathSlug = slug || 'my-linkbio';
  if (profile) {
    const encoded = encodeProfileToHash(profile);
    return `${origin}/u/${pathSlug}#data=${encoded}`;
  }
  return `${origin}/u/${pathSlug}`;
}

/**
 * Generates an SEO & Social Graph (Open Graph, Twitter/X, Discord, LinkedIn) meta tag snippet
 */
export function generateMetaSnippet(slug: string, profile: BioProfile, shareUrl: string): string {
  const name = profile.name || 'My Profile';
  const bio = profile.bio || `Connect with ${name} and explore all important links, projects, and social channels.`;
  const sanitizedBio = bio.replace(/"/g, '&quot;');
  const url = shareUrl;

  return `<!-- Primary Meta Tags -->
<title>${name} | LinkBio</title>
<meta name="title" content="${name} | LinkBio" />
<meta name="description" content="${sanitizedBio}" />

<!-- Open Graph / Facebook / LinkedIn / Discord -->
<meta property="og:type" content="profile" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${name} | LinkBio" />
<meta property="og:description" content="${sanitizedBio}" />
<meta property="og:site_name" content="LinkBio" />

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${name} | LinkBio" />
<meta property="twitter:description" content="${sanitizedBio}" />`;
}
