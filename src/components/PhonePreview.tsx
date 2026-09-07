import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { BioProfile } from '../types.ts';
import { AVATAR_GRADIENTS, PAGE_THEMES, THEME_GLOW_STYLES } from '../constants.ts';
import { detectPlatform } from '../platformIcons.tsx';
import { getInitials } from '../utils.ts';

interface PhonePreviewProps {
  profile: BioProfile;
}

export const PhonePreview: React.FC<PhonePreviewProps> = ({ profile }) => {
  const currentTheme =
    PAGE_THEMES.find((t) => t.id === profile.themeId) || PAGE_THEMES[0];
  const currentAvatarGradient =
    AVATAR_GRADIENTS.find((g) => g.id === profile.avatarGradientId) ||
    AVATAR_GRADIENTS[0];
  const glowStyle =
    THEME_GLOW_STYLES[profile.themeId] || THEME_GLOW_STYLES.sunset;

  const displayName = profile.name.trim() || 'Your Name';
  const displayBio =
    profile.bio.trim() || 'Add a brief bio or tagline here to introduce yourself.';
  const initials = getInitials(profile.name);

  return (
    <div className="relative flex flex-col items-center justify-center py-6 px-4">
      {/* Dynamic Ambient Background Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div
          className={`absolute -top-10 -left-10 w-72 h-72 rounded-full bg-gradient-to-br ${glowStyle.orb1} blur-3xl animate-ambient-glow-1 transition-all duration-700`}
        />
        <div
          className={`absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-tl ${glowStyle.orb2} blur-3xl animate-ambient-glow-2 transition-all duration-700`}
        />
      </div>

      {/* Outer Preview Stage Frame */}
      <div
        className={`relative z-10 w-full max-w-[370px] p-5 rounded-3xl border ${glowStyle.stageBorder} ${glowStyle.stageBg} backdrop-blur-xs flex flex-col items-center justify-center transition-colors duration-500 shadow-sm`}
      >
        {/* Device Stage Badge */}
        <div className="mb-3 flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Phone Simulation</span>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/80 border border-slate-200/80 text-slate-600 shadow-2xs">
            {currentTheme.name}
          </span>
        </div>

        {/* Realistic Mobile Phone Mockup */}
        <div
          id="mock-phone-frame"
          className="relative w-[320px] h-[630px] rounded-[3rem] bg-slate-900 p-3 shadow-2xl shadow-slate-900/40 border-4 border-slate-800 flex flex-col overflow-hidden"
        >
          {/* Top Notch / Dynamic Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-24 h-4.5 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-950/90 ml-auto mr-3 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-indigo-900/60" />
            </div>
          </div>

          {/* Inner Phone Screen */}
          <div
            className={`relative w-full h-full rounded-[2.3rem] ${currentTheme.phoneBg} overflow-y-auto custom-scrollbar flex flex-col justify-between px-5 pt-10 pb-6 transition-colors duration-500`}
          >
            {/* Main Content Area */}
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Avatar Circle */}
              <motion.div
                key={`avatar-${profile.avatarGradientId}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className={`w-20 h-20 rounded-full bg-gradient-to-tr ${currentAvatarGradient.gradientClass} border-3 border-white/95 shadow-md flex items-center justify-center relative overflow-hidden`}
              >
                <span
                  className={`text-2xl font-bold tracking-wider ${currentAvatarGradient.textClass} select-none`}
                >
                  {initials}
                </span>
              </motion.div>

              {/* Identity & Bio */}
              <div className="space-y-1.5 w-full">
                <motion.h1
                  key={`name-${displayName}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  className={`text-lg font-bold tracking-tight ${currentTheme.textPrimary} break-words`}
                >
                  {displayName}
                </motion.h1>

                <motion.p
                  key={`bio-${displayBio}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.18 }}
                  className={`text-xs leading-relaxed ${currentTheme.textMuted} max-w-[240px] mx-auto break-words`}
                >
                  {displayBio}
                </motion.p>
              </div>

              {/* Links Stack */}
              <div className="w-full space-y-2.5 pt-2">
                {profile.links.length === 0 ? (
                  <div className="py-8 px-4 text-center rounded-2xl border border-dashed border-slate-300/60 bg-white/40">
                    <p className={`text-xs ${currentTheme.textMuted}`}>
                      No links added yet.
                    </p>
                  </div>
                ) : (
                  profile.links.map((link, index) => {
                    const platform = detectPlatform(link.url, link.emoji);
                    const linkLabel = link.label.trim() || platform.name;

                    return (
                      <motion.a
                        key={link.id}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.22 + index * 0.06,
                        }}
                        className={`group relative w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                          currentTheme.buttonClass
                        } ${platform.borderLeftClass || ''}`}
                      >
                        {/* Left Icon Pill */}
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${
                              platform.isKnown
                                ? `${platform.iconBgClass} ${platform.iconTextClass}`
                                : 'bg-slate-100/90 text-slate-700'
                            }`}
                          >
                            {platform.renderIcon('w-3.5 h-3.5')}
                          </div>

                          {/* Link Title */}
                          <span className="text-xs font-semibold truncate text-left">
                            {linkLabel}
                          </span>
                        </div>

                        {/* Right Glyph */}
                        <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </motion.a>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Watermark Badge */}
            <div className="pt-6 pb-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-xs border border-white/80 shadow-2xs text-[10px] font-medium text-slate-600">
                <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
                <span>LinkBio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
