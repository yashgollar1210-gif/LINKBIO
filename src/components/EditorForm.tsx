import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  ChevronUp,
  ChevronDown,
  X,
  ExternalLink,
  Code2,
  Smile,
  Globe2,
} from 'lucide-react';
import { BioProfile, LinkItem } from '../types.ts';
import { AVATAR_GRADIENTS, PAGE_THEMES, POPULAR_EMOJIS, INITIAL_PROFILE } from '../constants.ts';
import { detectPlatform, PRESET_BRAND_ICONS, LeetCodeLogo, GfgLogo, CodilioLogo } from '../platformIcons.tsx';

interface EditorFormProps {
  profile: BioProfile;
  onChange: (updated: BioProfile) => void;
}

export const EditorForm: React.FC<EditorFormProps> = ({ profile, onChange }) => {
  const [activeEmojiPickerIndex, setActiveEmojiPickerIndex] = useState<number | null>(null);
  const [customEmojiInput, setCustomEmojiInput] = useState('');
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Close emoji popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setActiveEmojiPickerIndex(null);
      }
    }
    if (activeEmojiPickerIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeEmojiPickerIndex]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...profile,
      name: e.target.value,
    });
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.slice(0, 80);
    onChange({
      ...profile,
      bio: text,
    });
  };

  const handleAvatarGradientSelect = (id: string) => {
    onChange({
      ...profile,
      avatarGradientId: id,
    });
  };

  const handleThemeSelect = (id: string) => {
    onChange({
      ...profile,
      themeId: id,
    });
  };

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      label: '',
      url: 'https://',
      emoji: '🔗',
    };
    onChange({
      ...profile,
      links: [...profile.links, newLink],
    });
  };

  const handleUpdateLink = (index: number, updates: Partial<LinkItem>) => {
    const newLinks = [...profile.links];
    newLinks[index] = { ...newLinks[index], ...updates };
    onChange({
      ...profile,
      links: newLinks,
    });
  };

  const handleRemoveLink = (index: number) => {
    if (activeEmojiPickerIndex === index) {
      setActiveEmojiPickerIndex(null);
    }
    const newLinks = profile.links.filter((_, i) => i !== index);
    onChange({
      ...profile,
      links: newLinks,
    });
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= profile.links.length) return;
    const newLinks = [...profile.links];
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;
    onChange({
      ...profile,
      links: newLinks,
    });
  };

  const handleResetSample = () => {
    const confirmed = window.confirm(
      'Reset profile to sample demo data? Your current changes will be replaced.'
    );
    if (confirmed) {
      onChange(INITIAL_PROFILE);
      setActiveEmojiPickerIndex(null);
    }
  };

  const bioLength = profile.bio ? profile.bio.length : 0;
  const isNearLimit = bioLength >= 75;

  return (
    <div id="editor-form-card" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span>Profile Editor</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Live Preview Active
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure your bio identity, visual theme, and custom link tree.
          </p>
        </div>
        <button
          id="btn-reset-sample"
          type="button"
          onClick={handleResetSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
          title="Reset to demo profile"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Sample</span>
        </button>
      </div>

      <div className="p-6 space-y-7">
        {/* SECTION 1: Profile Information */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Profile Information
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-display-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                Display Name
              </label>
              <input
                id="input-display-name"
                type="text"
                value={profile.name}
                onChange={handleNameChange}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="input-bio-tagline" className="block text-xs font-medium text-slate-700">
                  Bio / Tagline
                </label>
                <span
                  id="bio-char-counter"
                  className={`text-[11px] font-mono ${
                    isNearLimit
                      ? 'text-amber-600 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {bioLength}/80
                </span>
              </div>
              <textarea
                id="input-bio-tagline"
                rows={2}
                value={profile.bio}
                onChange={handleBioChange}
                maxLength={80}
                placeholder="Add a brief tagline or bio for your audience..."
                className="w-full px-3.5 py-2 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: Appearance */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Appearance & Theming
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Avatar Gradient Picker */}
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <label className="block text-xs font-medium text-slate-700">
                Avatar Gradient
              </label>
              <div className="flex flex-wrap gap-2.5 items-center">
                {AVATAR_GRADIENTS.map((ag) => {
                  const isSelected = profile.avatarGradientId === ag.id;
                  return (
                    <button
                      key={ag.id}
                      id={`btn-avatar-${ag.id}`}
                      type="button"
                      onClick={() => handleAvatarGradientSelect(ag.id)}
                      className={`relative w-9 h-9 rounded-full bg-gradient-to-tr ${ag.gradientClass} flex items-center justify-center transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-xs'
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                      title={ag.name}
                      aria-label={`Select avatar gradient ${ag.name}`}
                    >
                      <span className={`text-[10px] font-bold ${ag.textClass}`}>
                        Aa
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {AVATAR_GRADIENTS.find((g) => g.id === profile.avatarGradientId)?.name || 'Custom'}
              </p>
            </div>

            {/* Page Theme Picker */}
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <label className="block text-xs font-medium text-slate-700">
                Page Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PAGE_THEMES.map((theme) => {
                  const isSelected = profile.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      id={`btn-theme-${theme.id}`}
                      type="button"
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`h-11 rounded-lg bg-gradient-to-br ${theme.swatchGradient} border border-slate-200 flex flex-col items-center justify-center p-1 transition-all ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-slate-900 scale-105 shadow-xs'
                          : 'opacity-75 hover:opacity-100 hover:scale-102'
                      }`}
                      title={theme.name}
                      aria-label={`Select theme ${theme.name}`}
                    >
                      <span
                        className={`text-[9px] font-semibold leading-tight text-center truncate w-full ${
                          theme.id === 'midnight' ? 'text-indigo-200' : 'text-slate-700'
                        }`}
                      >
                        {theme.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {PAGE_THEMES.find((t) => t.id === profile.themeId)?.name || 'Default'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Your Links */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Your Links ({profile.links.length})
              </h3>
            </div>
            <button
              id="btn-add-link"
              type="button"
              onClick={handleAddLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Link</span>
            </button>
          </div>

          {/* Links List */}
          {profile.links.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800">No links added yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                Add your social media profiles, portfolio, shop, or newsletter to your bio.
              </p>
              <button
                type="button"
                onClick={handleAddLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Link</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {profile.links.map((link, index) => {
                const platformInfo = detectPlatform(link.url, link.emoji);
                const isEmojiPickerOpen = activeEmojiPickerIndex === index;

                return (
                  <div
                    key={link.id}
                    id={`link-item-${index}`}
                    className="group relative bg-slate-50/60 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3 transition-all shadow-2xs hover:shadow-xs"
                  >
                    <div className="flex items-start gap-3">
                      {/* Left: Interactive Icon / Emoji Picker */}
                      <div className="relative pt-0.5">
                        <button
                          type="button"
                          id={`btn-link-icon-${index}`}
                          onClick={() => {
                            if (isEmojiPickerOpen) {
                              setActiveEmojiPickerIndex(null);
                            } else {
                              setActiveEmojiPickerIndex(index);
                              setCustomEmojiInput('');
                            }
                          }}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                            platformInfo.isKnown
                              ? `${platformInfo.iconBgClass} ${platformInfo.iconTextClass} shadow-2xs`
                              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400 shadow-2xs'
                          }`}
                          title={
                            platformInfo.isKnown
                              ? `Detected: ${platformInfo.name}`
                              : 'Click to choose custom emoji icon'
                          }
                        >
                          {platformInfo.renderIcon('w-4.5 h-4.5')}
                        </button>

                        {/* Custom Emoji / Logo Picker Popover */}
                        {isEmojiPickerOpen && (
                          <div
                            ref={emojiPickerRef}
                            className="absolute left-0 top-11 z-40 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-150"
                          >
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <div>
                                <span className="text-xs font-bold text-slate-900 block">
                                  Choose Icon Emoji
                                </span>
                                <span className="text-[10px] text-slate-500">
                                  Select coding logos, social brands, or emojis
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveEmojiPickerIndex(null)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Section 1: Developer & Coding Logos (LeetCode, GFG, Codilio) */}
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                                <Code2 className="w-3 h-3 text-indigo-600" />
                                <span>Coding Platforms</span>
                              </div>

                              <div className="grid grid-cols-3 gap-1.5">
                                {/* LeetCode */}
                                <button
                                  type="button"
                                  id={`btn-choose-leetcode-${index}`}
                                  onClick={() => {
                                    handleUpdateLink(index, { emoji: 'icon:leetcode' });
                                    setActiveEmojiPickerIndex(null);
                                  }}
                                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center group ${
                                    link.emoji === 'icon:leetcode' || (detectPlatform(link.url).name === 'LeetCode' && !link.emoji)
                                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-400 hover:shadow-xs'
                                  }`}
                                >
                                  <div className="w-7 h-7 rounded-lg bg-[#262626] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-1">
                                    <LeetCodeLogo className="w-4 h-4" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-800">
                                    LeetCode
                                  </span>
                                </button>

                                {/* GeeksforGeeks (GFG) */}
                                <button
                                  type="button"
                                  id={`btn-choose-gfg-${index}`}
                                  onClick={() => {
                                    handleUpdateLink(index, { emoji: 'icon:gfg' });
                                    setActiveEmojiPickerIndex(null);
                                  }}
                                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center group ${
                                    link.emoji === 'icon:gfg' || (detectPlatform(link.url).name === 'GeeksforGeeks' && !link.emoji)
                                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xs'
                                  }`}
                                >
                                  <div className="w-7 h-7 rounded-lg bg-[#2F8D46] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-1">
                                    <GfgLogo className="w-4 h-4" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-800">
                                    GFG
                                  </span>
                                </button>

                                {/* Codilio / Codolio */}
                                <button
                                  type="button"
                                  id={`btn-choose-codilio-${index}`}
                                  onClick={() => {
                                    handleUpdateLink(index, { emoji: 'icon:codilio' });
                                    setActiveEmojiPickerIndex(null);
                                  }}
                                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center group ${
                                    link.emoji === 'icon:codilio' || link.emoji === 'icon:codolio' || (detectPlatform(link.url).name === 'Codilio' && !link.emoji)
                                      ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-indigo-500 hover:shadow-xs'
                                  }`}
                                >
                                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform mb-1">
                                    <CodilioLogo className="w-4 h-4" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-800">
                                    Codilio
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* Section 2: Other Popular Brand Icons */}
                            <div className="space-y-1.5 pt-1 border-t border-slate-100">
                              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                                Social & Platforms
                              </span>
                              <div className="grid grid-cols-6 gap-1.5">
                                {PRESET_BRAND_ICONS.filter(
                                  (p) => p.id !== 'icon:leetcode' && p.id !== 'icon:gfg' && p.id !== 'icon:codilio'
                                ).map((preset) => (
                                  <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => {
                                      handleUpdateLink(index, { emoji: preset.id });
                                      setActiveEmojiPickerIndex(null);
                                    }}
                                    title={preset.name}
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 transition-all ${
                                      link.emoji === preset.id
                                        ? 'bg-slate-900 text-white shadow-xs'
                                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300'
                                    }`}
                                  >
                                    {preset.renderIcon('w-4 h-4')}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Section 3: Popular Emojis Grid */}
                            <div className="space-y-1.5 pt-1 border-t border-slate-100">
                              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                                Popular Emojis
                              </span>
                              <div className="grid grid-cols-5 gap-1.5">
                                {POPULAR_EMOJIS.map((emoji) => (
                                  <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => {
                                      handleUpdateLink(index, { emoji });
                                      setActiveEmojiPickerIndex(null);
                                    }}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base hover:scale-110 transition-all ${
                                      link.emoji === emoji
                                        ? 'bg-indigo-50 border border-indigo-300'
                                        : 'hover:bg-slate-100'
                                    }`}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Section 4: Custom Emoji Input & Auto-detect Reset */}
                            <div className="pt-2 border-t border-slate-100 space-y-2">
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  maxLength={4}
                                  placeholder="Type any emoji..."
                                  value={customEmojiInput}
                                  onChange={(e) => setCustomEmojiInput(e.target.value)}
                                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (customEmojiInput.trim()) {
                                      handleUpdateLink(index, { emoji: customEmojiInput.trim() });
                                      setActiveEmojiPickerIndex(null);
                                    }
                                  }}
                                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                                >
                                  Set
                                </button>
                              </div>

                              {link.emoji && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleUpdateLink(index, { emoji: '' });
                                    setActiveEmojiPickerIndex(null);
                                  }}
                                  className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 transition-colors py-0.5"
                                >
                                  Reset to auto-detect from URL
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Middle: Stacked Label & URL Inputs */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            id={`input-link-label-${index}`}
                            value={link.label}
                            onChange={(e) =>
                              handleUpdateLink(index, { label: e.target.value })
                            }
                            placeholder="Link title (e.g. My Newsletter, Instagram, Shop)"
                            className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                          />
                          {platformInfo.isKnown && (
                            <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                              {platformInfo.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            id={`input-link-url-${index}`}
                            value={link.url}
                            onChange={(e) =>
                              handleUpdateLink(index, { url: e.target.value })
                            }
                            placeholder="https://..."
                            className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-700 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                          />
                        </div>
                      </div>

                      {/* Right: Reorder & Remove Actions */}
                      <div className="flex flex-col items-center gap-1 pt-0.5">
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleMoveLink(index, 'up')}
                            disabled={index === 0}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                            title="Move link up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveLink(index, 'down')}
                            disabled={index === profile.links.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
                            title="Move link down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          id={`btn-remove-link-${index}`}
                          onClick={() => handleRemoveLink(index)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete this link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
