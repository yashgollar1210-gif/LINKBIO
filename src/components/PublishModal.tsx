import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Copy,
  Check,
  Download,
  ExternalLink,
  X,
  QrCode,
  Globe,
  Code2,
  Share2,
  Eye,
} from 'lucide-react';
import { BioProfile } from '../types.ts';
import { generateShareUrl, generateMetaSnippet, getInitials } from '../utils.ts';
import { AVATAR_GRADIENTS } from '../constants.ts';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  profile: BioProfile;
  onVisitLive: (shareUrl: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  slug,
  profile,
  onVisitLive,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeSnippetView, setActiveSnippetView] = useState<'snippet' | 'preview'>('snippet');
  const [socialPlatform, setSocialPlatform] = useState<'x' | 'discord' | 'linkedin'>('x');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingQr, setIsGeneratingQr] = useState(true);

  // Compute the single source-of-truth self-contained shareable URL
  const fullShareUrl = generateShareUrl(slug, profile);
  const metaSnippet = generateMetaSnippet(slug, profile, fullShareUrl);

  const activeAvatarGradient =
    AVATAR_GRADIENTS.find((g) => g.id === profile.avatarGradientId) ||
    AVATAR_GRADIENTS[0];

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGeneratingQr(true);

    QRCode.toDataURL(fullShareUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a', // slate-900
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGeneratingQr(false);
        }
      })
      .catch((err) => {
        console.error('QR code generation failed:', err);
        if (isMounted) {
          setIsGeneratingQr(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, fullShareUrl]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, onSuccess: () => void) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      onSuccess();
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleCopyLink = () => {
    copyToClipboard(fullShareUrl, () => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleCopySnippet = () => {
    copyToClipboard(metaSnippet, () => {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2500);
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `linkbio-${slug || 'page'}-qr.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hostName = typeof window !== 'undefined' ? window.location.host : 'linkbio.app';
  const previewTitle = `${profile.name || 'My Profile'} | LinkBio`;
  const previewBio =
    profile.bio || `Connect with ${profile.name || 'Alex'} and explore all key links and social channels.`;

  return (
    <div
      id="publish-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="publish-modal-card"
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/10">
              <Globe className="w-4.5 h-4.5 text-slate-200" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">Your Bio Page is Ready!</h2>
              <p className="text-xs text-slate-400">
                Self-contained link, QR code & social preview meta-tags
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* SECTION 1: Share URL */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Shareable Bio Link
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={fullShareUrl}
                  id="input-shareable-url"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 select-all focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
                />
              </div>
              <button
                type="button"
                id="btn-copy-share-url"
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs shrink-0 ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.98]'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              ✨ Embedded data link. Anyone opening this URL sees your real-time configured bio instantly.
            </p>
          </div>

          {/* SECTION 2: QR Code */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
            <div className="w-32 h-32 bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
              {isGeneratingQr ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <QrCode className="w-7 h-7 animate-pulse text-slate-400" />
                  <span className="text-[10px]">Generating QR...</span>
                </div>
              ) : qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${slug}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-xs text-slate-400">QR Unavailable</span>
              )}
            </div>

            <div className="space-y-2.5 text-center sm:text-left flex-1">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">QR Code for Print & Displays</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Great for business cards, resumes, posters, stickers, or packaging.
                </p>
              </div>

              <button
                type="button"
                id="btn-download-qr"
                onClick={handleDownloadQR}
                disabled={!qrDataUrl || isGeneratingQr}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-2xs disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: Social Media Preview & Meta-Snippet */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-slate-700" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Social Media Preview & Meta-Snippet
                </h4>
              </div>

              {/* Toggle snippet vs preview */}
              <div className="flex bg-slate-200/70 p-0.5 rounded-lg text-[11px] font-medium self-start sm:self-auto">
                <button
                  type="button"
                  id="btn-view-meta-snippet"
                  onClick={() => setActiveSnippetView('snippet')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    activeSnippetView === 'snippet'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  <span>HTML Tags</span>
                </button>
                <button
                  type="button"
                  id="btn-view-meta-preview"
                  onClick={() => setActiveSnippetView('preview')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                    activeSnippetView === 'preview'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Card Preview</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Paste these Open Graph and Twitter card meta tags into your HTML <code className="px-1 py-0.5 bg-slate-200/60 rounded text-[11px] font-mono text-slate-800">&lt;head&gt;</code> to display rich cards when shared on X, LinkedIn, or Discord.
            </p>

            {activeSnippetView === 'snippet' ? (
              <div className="space-y-2">
                <div className="relative group">
                  <pre
                    id="meta-snippet-code"
                    className="w-full bg-slate-900 text-slate-200 text-[11px] font-mono leading-relaxed p-3.5 rounded-xl border border-slate-800 overflow-x-auto max-h-44 scrollbar-thin select-all"
                  >
                    <code>{metaSnippet}</code>
                  </pre>
                  <button
                    type="button"
                    id="btn-copy-meta-snippet-floating"
                    onClick={handleCopySnippet}
                    className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 backdrop-blur-xs transition-colors shadow-xs"
                    title="Copy meta tags snippet"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Supports OpenGraph, Twitter Cards, Discord embeds & LinkedIn.
                  </span>
                  <button
                    type="button"
                    id="btn-copy-meta-snippet"
                    onClick={handleCopySnippet}
                    className="text-xs font-semibold text-slate-900 hover:text-indigo-600 underline transition-colors"
                  >
                    {copiedSnippet ? 'Snippet copied to clipboard!' : 'Copy full snippet'}
                  </button>
                </div>
              </div>
            ) : (
              /* Social Card Interactive Preview */
              <div className="space-y-2.5">
                {/* Platform Selector Tabs */}
                <div className="flex gap-1.5 border-b border-slate-200 pb-1.5">
                  <button
                    type="button"
                    id="tab-preview-x"
                    onClick={() => setSocialPlatform('x')}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      socialPlatform === 'x'
                        ? 'bg-slate-900 text-white font-medium'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    X / Twitter
                  </button>
                  <button
                    type="button"
                    id="tab-preview-discord"
                    onClick={() => setSocialPlatform('discord')}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      socialPlatform === 'discord'
                        ? 'bg-[#5865F2] text-white font-medium'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    Discord
                  </button>
                  <button
                    type="button"
                    id="tab-preview-linkedin"
                    onClick={() => setSocialPlatform('linkedin')}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                      socialPlatform === 'linkedin'
                        ? 'bg-[#0a66c2] text-white font-medium'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    LinkedIn
                  </button>
                </div>

                {/* Simulated Social Card */}
                {socialPlatform === 'x' && (
                  <div className="bg-black text-white rounded-2xl overflow-hidden border border-slate-800 shadow-sm">
                    <div
                      className={`h-24 bg-gradient-to-tr ${activeAvatarGradient.gradientClass} flex items-center justify-center p-3 relative`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold text-lg border border-white/40 shadow-xs">
                        {getInitials(profile.name)}
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/90">
                        LinkBio
                      </span>
                    </div>
                    <div className="p-3 space-y-1 bg-[#16181c]">
                      <div className="text-[11px] text-slate-400 font-mono truncate">{hostName}</div>
                      <div className="text-xs font-semibold text-white truncate">{previewTitle}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {previewBio}
                      </div>
                    </div>
                  </div>
                )}

                {socialPlatform === 'discord' && (
                  <div className="bg-[#2b2d31] text-[#dbdee1] p-3 rounded-xl border-l-4 border-indigo-500 shadow-xs space-y-1.5">
                    <div className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">
                      LinkBio Profile
                    </div>
                    <div className="text-xs font-bold text-[#00a8fc] hover:underline cursor-pointer">
                      {previewTitle}
                    </div>
                    <div className="text-[11px] text-[#dbdee1] leading-relaxed">
                      {previewBio}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono pt-0.5">
                      {fullShareUrl.slice(0, 45)}...
                    </div>
                  </div>
                )}

                {socialPlatform === 'linkedin' && (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div
                      className={`h-20 bg-gradient-to-tr ${activeAvatarGradient.gradientClass} flex items-center justify-center`}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm border border-white/40">
                        {getInitials(profile.name)}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 space-y-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{previewTitle}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-2">{previewBio}</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                        {hostName}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            id="btn-keep-editing"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition-colors text-center"
          >
            Keep Editing
          </button>

          <button
            type="button"
            id="btn-visit-live"
            onClick={() => onVisitLive(fullShareUrl)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xs"
          >
            <span>Visit Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
