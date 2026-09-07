import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { BioProfile } from '../types.ts';
import { AVATAR_GRADIENTS, PAGE_THEMES } from '../constants.ts';
import { detectPlatform } from '../platformIcons.tsx';
import { getInitials, getProfile, generateShareUrl } from '../utils.ts';

interface PublicPageViewProps {
  slug: string;
  onBackToEditor: () => void;
}

export const PublicPageView: React.FC<PublicPageViewProps> = ({
  slug,
  onBackToEditor,
}) => {
  const [profile, setProfile] = useState<BioProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const resolved = getProfile(slug);
      setProfile(resolved);
    } catch (e) {
      console.error('Failed to resolve profile', e);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const handleCopyShare = async () => {
    if (!profile) return;
    const shareUrl = generateShareUrl(slug, profile);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy share url:', err);
    }
  };

  const sanitizeUrl = (rawUrl: string): string => {
    const trimmed = (rawUrl || '').trim();
    if (!trimmed) return '#';
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
        <p className="text-sm text-slate-400">Loading bio page...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
          The requested bio page for &ldquo;{slug}&rdquo; could not be resolved. It may have expired or the link is invalid.
        </p>
        <button
          type="button"
          onClick={onBackToEditor}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Create or Edit LinkBio</span>
        </button>
      </div>
    );
  }

  const currentTheme =
    PAGE_THEMES.find((t) => t.id === profile.themeId) || PAGE_THEMES[0];
  const currentAvatarGradient =
    AVATAR_GRADIENTS.find((g) => g.id === profile.avatarGradientId) ||
    AVATAR_GRADIENTS[0];

  const initials = getInitials(profile.name);
  const displayName = profile.name.trim() || 'Anonymous';
  const displayBio = profile.bio.trim();

  return (
    <div
      id="public-page-container"
      className={`min-h-screen ${currentTheme.bgGradient} flex flex-col items-center justify-between p-4 sm:p-8 transition-colors duration-500 relative`}
    >
      {/* Top Floating Utility Bar */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between py-2 mb-6">
        <button
          type="button"
          id="btn-public-back-editor"
          onClick={onBackToEditor}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-semibold shadow-xs border border-white/80 backdrop-blur-xs transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          type="button"
          id="btn-public-share"
          onClick={handleCopyShare}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs border backdrop-blur-xs transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white/80 hover:bg-white text-slate-700 border-white/80'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Share Page</span>
            </>
          )}
        </button>
      </div>

      {/* Center Profile Container */}
      <main className="w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center py-4">
        {/* Avatar, Name, Bio */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-24 h-24 rounded-full bg-gradient-to-tr ${currentAvatarGradient.gradientClass} border-4 border-white/95 shadow-xl flex items-center justify-center relative overflow-hidden`}
          >
            <span
              className={`text-3xl font-bold tracking-wider ${currentAvatarGradient.textClass} select-none`}
            >
              {initials}
            </span>
          </motion.div>

          <div className="space-y-2 max-w-sm px-4">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${currentTheme.textPrimary} break-words`}
            >
              {displayName}
            </motion.h1>

            {displayBio && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className={`text-sm sm:text-base leading-relaxed ${currentTheme.textMuted} break-words`}
              >
                {displayBio}
              </motion.p>
            )}
          </div>
        </div>

        {/* Links Stack */}
        <div className="w-full space-y-3.5 px-2">
          {profile.links.length === 0 ? (
            <div className="py-12 px-6 text-center rounded-2xl bg-white/40 border border-dashed border-slate-300">
              <p className={`text-sm ${currentTheme.textMuted}`}>
                No links shared yet.
              </p>
            </div>
          ) : (
            profile.links.map((link, index) => {
              const platform = detectPlatform(link.url, link.emoji);
              const linkLabel = link.label.trim() || platform.name;
              const cleanHref = sanitizeUrl(link.url);

              return (
                <motion.a
                  key={link.id || index}
                  href={cleanHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2 + index * 0.06,
                  }}
                  className={`group relative w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                    currentTheme.buttonClass
                  } ${platform.borderLeftClass || ''}`}
                >
                  {/* Left Brand Icon */}
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                        platform.isKnown
                          ? `${platform.iconBgClass} ${platform.iconTextClass}`
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {platform.renderIcon('w-4 h-4')}
                    </div>

                    <span className="text-sm font-semibold truncate text-left">
                      {linkLabel}
                    </span>
                  </div>

                  {/* Right Glyph */}
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all shrink-0" />
                </motion.a>
              );
            })
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-md mx-auto py-8 text-center">
        <button
          type="button"
          onClick={onBackToEditor}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/80 shadow-2xs backdrop-blur-xs text-xs font-medium transition-all"
        >
          <Sparkles className="w-3 h-3 text-indigo-600" />
          <span>Created with LinkBio — Create Yours Free</span>
        </button>
      </footer>
    </div>
  );
};
