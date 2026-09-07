import React, { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  Sparkles,
  CheckCircle2,
  Eye,
  Sliders,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { BioProfile } from './types.ts';
import { INITIAL_PROFILE } from './constants.ts';
import {
  loadDraft,
  saveDraft,
  saveProfile,
  slugify,
  encodeProfileToHash,
} from './utils.ts';
import { EditorForm } from './components/EditorForm.tsx';
import { PhonePreview } from './components/PhonePreview.tsx';
import { PublishModal } from './components/PublishModal.tsx';
import { PublicPageView } from './components/PublicPageView.tsx';

/**
 * Extracts slug from location pathname (/u/<slug>), hash (#/u/<slug>), or query (?u=<slug>)
 */
function getSlugFromLocation(): string | null {
  // 1. Check pathname
  const path = window.location.pathname;
  const pathMatch = path.match(/^\/u\/([^\/#?]+)/);
  if (pathMatch && pathMatch[1]) {
    return pathMatch[1];
  }

  // 2. Check hash
  const hash = window.location.hash;
  const hashMatch = hash.match(/^#\/?u\/([^\/#?]+)/);
  if (hashMatch && hashMatch[1]) {
    return hashMatch[1];
  }

  // 3. Check query param
  const params = new URLSearchParams(window.location.search);
  const uParam = params.get('u');
  if (uParam) {
    return uParam;
  }

  return null;
}

export default function App() {
  const [profile, setProfile] = useState<BioProfile>(() => loadDraft());
  const [currentSlug, setCurrentSlug] = useState<string | null>(() =>
    getSlugFromLocation()
  );
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string>('alex-rivera');
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'preview'>(
    'editor'
  );
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Synchronize route changes on popstate & hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const slug = getSlugFromLocation();
      setCurrentSlug(slug);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update profile and persist draft synchronously
  const handleProfileChange = useCallback((updated: BioProfile) => {
    setSaveStatus('saving');
    setProfile(updated);
    saveDraft(updated);
    setTimeout(() => {
      setSaveStatus('saved');
    }, 200);
  }, []);

  const currentSlugPreview = slugify(profile.name);

  const handlePublish = () => {
    const slug = slugify(profile.name);
    setPublishedSlug(slug);
    saveProfile(slug, profile);
    setIsPublishModalOpen(true);
  };

  const handleVisitLiveFromModal = (shareUrl: string) => {
    setIsPublishModalOpen(false);
    const slug = slugify(profile.name);
    setCurrentSlug(slug);
    // Push new state
    window.history.pushState({}, '', shareUrl);
  };

  const handleBackToEditor = () => {
    setCurrentSlug(null);
    window.history.pushState({}, '', '/');
  };

  // If URL resolves to a public slug view, render PublicPageView directly
  if (currentSlug) {
    return (
      <PublicPageView
        slug={currentSlug}
        onBackToEditor={handleBackToEditor}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4.5 h-4.5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-slate-900">
                  LinkBio
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80">
                  /u/{currentSlugPreview}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Mobile Editor/Preview Segmented Switcher */}
          <div className="flex lg:hidden bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              id="btn-tab-editor"
              onClick={() => setActiveMobileTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMobileTab === 'editor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              id="btn-tab-preview"
              onClick={() => setActiveMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMobileTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Right: Autosave Status & Publish Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60">
              <span className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
              <span>{saveStatus === 'saved' ? 'Draft saved' : 'Saving changes...'}</span>
            </div>

            <button
              type="button"
              id="btn-publish-page"
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <Globe className="w-4 h-4 text-slate-300" />
              <span>Publish Page</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Editor Form (Columns 1-7 on desktop) */}
          <div
            className={`lg:col-span-7 ${
              activeMobileTab === 'editor' ? 'block' : 'hidden lg:block'
            }`}
          >
            <EditorForm
              profile={profile}
              onChange={handleProfileChange}
            />
          </div>

          {/* Column 2: Sticky Phone Preview (Columns 8-12 on desktop) */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 ${
              activeMobileTab === 'preview' ? 'block' : 'hidden lg:block'
            }`}
          >
            <PhonePreview profile={profile} />
          </div>
        </div>
      </main>

      {/* Publish Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        slug={publishedSlug}
        profile={profile}
        onVisitLive={handleVisitLiveFromModal}
      />
    </div>
  );
}
