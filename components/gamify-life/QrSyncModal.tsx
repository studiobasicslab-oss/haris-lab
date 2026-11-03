import React, { useEffect, useState, useMemo } from 'react';
import { GameState } from './types';
import { generateSyncPayload, generateQrCodeDataUrl, parseSyncPayload } from './utils/qrSync';
import { X, Copy, Check, Smartphone, Share2, Download } from 'lucide-react';

interface QrSyncModalProps {
  state: GameState;
  onRestoreState: (state: GameState) => void;
  onClose: () => void;
  onPlayClickSound: () => void;
}

export const QrSyncModal: React.FC<QrSyncModalProps> = ({
  state,
  onRestoreState,
  onClose,
  onPlayClickSound,
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'link' | 'paste'>('qr');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [pasteInput, setPasteInput] = useState<string>('');
  const [pasteError, setPasteError] = useState<string | null>(null);

  const syncUrl = useMemo(() => {
    try {
      const payload = generateSyncPayload(state);
      if (!payload) return '';

      const origin =
        typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : 'https://haris-lab.vercel.app';

      return `${origin}/gamify-life?sync=${payload}`;
    } catch (err) {
      console.error('Failed to generate sync payload:', err);
      return '';
    }
  }, [state]);

  useEffect(() => {
    if (!syncUrl) return;
    let active = true;

    generateQrCodeDataUrl(syncUrl)
      .then((dataUrl) => {
        if (active) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch((err) => {
        console.error('Failed to generate QR data:', err);
      });

    return () => {
      active = false;
    };
  }, [syncUrl]);

  const handleCopyLink = async () => {
    onPlayClickSound();
    if (!syncUrl) return;
    try {
      await navigator.clipboard.writeText(syncUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleShare = async () => {
    onPlayClickSound();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Gamify Life - Save for ${state.character.name}`,
          text: `Here is my Gamify Your Life progress (Level ${state.level} ${state.character.name}). Open this link to sync:`,
          url: syncUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handlePasteImport = () => {
    onPlayClickSound();
    setPasteError(null);
    let payload = pasteInput.trim();
    if (!payload) {
      setPasteError('Please paste a sync link or code first.');
      return;
    }

    // Check if it's a full URL
    if (payload.includes('sync=')) {
      try {
        const url = new URL(payload);
        payload = url.searchParams.get('sync') || '';
      } catch {
        // Fallback simple query extract
        const match = payload.match(/sync=([^&#]+)/);
        if (match) payload = match[1];
      }
    }

    const imported = parseSyncPayload(payload);
    if (!imported) {
      setPasteError('Invalid or corrupted sync code. Please check the code and try again.');
      return;
    }

    if (
      window.confirm(
        `Load save data for "${imported.character.name}" (Level ${imported.level}, ${imported.gold} Gold)? This will replace your current game on this device.`
      )
    ) {
      onRestoreState(imported);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#fcf6ea] border-4 border-[#2d2740] shadow-pixel-lg max-w-lg w-full p-5 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
          <span className="text-2xl">📱</span>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
              INSTANT QR CODE SYNC
            </h3>
            <span className="font-retro text-[10px] text-[#8a7dc4] font-bold">
              ZERO FILES • SCAN TO PLAY ON ANY DEVICE
            </span>
          </div>
        </div>

        {/* Character Info Pill */}
        <div className="flex items-center justify-between p-2.5 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-4 text-xs font-retro">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-xs text-[#2d2740]">
              {state.character.name}
            </span>
            <span className="text-[10px] bg-[#fbbf24] px-1.5 py-0.5 border border-[#2d2740] font-bold">
              LVL {state.level}
            </span>
          </div>
          <div className="text-[11px] text-[#4c4270] font-bold">
            💰 {state.gold} GOLD • ⚡ {state.currentXp} XP
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          <button
            onClick={() => {
              onPlayClickSound();
              setActiveTab('qr');
            }}
            className={`py-1.5 px-2 font-pixel text-[10px] sm:text-xs border-2 border-[#2d2740] transition ${
              activeTab === 'qr'
                ? 'bg-[#fbbf24] text-[#2d2740] shadow-pixel-sm'
                : 'bg-white hover:bg-[#fdf6db] text-[#4c4270]'
            }`}
          >
            📸 1. SCAN QR
          </button>

          <button
            onClick={() => {
              onPlayClickSound();
              setActiveTab('link');
            }}
            className={`py-1.5 px-2 font-pixel text-[10px] sm:text-xs border-2 border-[#2d2740] transition ${
              activeTab === 'link'
                ? 'bg-[#fbbf24] text-[#2d2740] shadow-pixel-sm'
                : 'bg-white hover:bg-[#fdf6db] text-[#4c4270]'
            }`}
          >
            🔗 2. SEND LINK
          </button>

          <button
            onClick={() => {
              onPlayClickSound();
              setActiveTab('paste');
            }}
            className={`py-1.5 px-2 font-pixel text-[10px] sm:text-xs border-2 border-[#2d2740] transition ${
              activeTab === 'paste'
                ? 'bg-[#fbbf24] text-[#2d2740] shadow-pixel-sm'
                : 'bg-white hover:bg-[#fdf6db] text-[#4c4270]'
            }`}
          >
            📥 3. PASTE CODE
          </button>
        </div>

        {/* TAB 1: SCAN QR CODE */}
        {activeTab === 'qr' && (
          <div className="text-center">
            <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm inline-block mx-auto mb-3">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="Gamify Life Save Data QR Code"
                  width={240}
                  height={240}
                  className="mx-auto block"
                />
              ) : (
                <div className="w-60 h-60 flex items-center justify-center text-xs font-retro text-gray-400">
                  Generating QR Code...
                </div>
              )}
            </div>

            {/* Simple Instructions */}
            <div className="p-3 bg-[#fdf6db] border border-[#2d2740] text-left text-xs font-retro text-[#684a14] space-y-1.5 mb-4">
              <div className="font-bold flex items-center gap-1.5 text-xs text-[#2d2740]">
                <Smartphone size={15} />
                <span>HOW TO SCAN (UNDER 5 SECONDS):</span>
              </div>
              <p>1. Open your smartphone camera (iPhone or Android).</p>
              <p>2. Point it directly at the QR code above.</p>
              <p>3. Tap the yellow banner that appears on your phone screen.</p>
              <p className="font-bold text-[#b45309]">
                &rarr; Your hero &amp; progress will instantly load on your phone!
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-[#eef0fb] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                <span>{copied ? 'LINK COPIED!' : 'COPY SYNC LINK'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Share2 size={14} />
                <span>SHARE LINK...</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SEND LINK */}
        {activeTab === 'link' && (
          <div className="space-y-4">
            <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm">
              <label className="block font-pixel text-xs text-[#2d2740] mb-1.5 uppercase">
                DIRECT SYNC URL
              </label>
              <p className="text-xs font-retro text-[#4c4270] mb-2">
                Send this link to yourself on WhatsApp, Telegram, Apple Notes, or Email. Tapping the link opens Gamify Life with your progress ready to load.
              </p>
              <div className="p-2 bg-gray-50 border border-gray-300 font-mono text-[11px] text-gray-700 break-all select-all max-h-24 overflow-y-auto">
                {syncUrl}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
              >
                {copied ? <Check size={15} className="text-green-700" /> : <Copy size={15} />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY SYNC LINK'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#eef0fb] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
              >
                <Share2 size={15} />
                <span>SHARE</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PASTE SYNC CODE */}
        {activeTab === 'paste' && (
          <div className="space-y-3">
            <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm">
              <label className="block font-pixel text-xs text-[#2d2740] mb-1.5 uppercase">
                PASTE SYNC LINK OR CODE FROM ANOTHER DEVICE
              </label>
              <p className="text-xs font-retro text-[#4c4270] mb-2">
                If you copied the sync link or code from your phone or another computer, paste it below to restore your hero:
              </p>
              <textarea
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                placeholder="Paste link like: https://.../gamify-life?sync=... or paste code"
                rows={3}
                className="w-full p-2 bg-[#fcf6ea] border-2 border-[#2d2740] font-mono text-xs text-[#2d2740] outline-none resize-none focus:bg-white"
              />
            </div>

            {pasteError && (
              <div className="p-2 bg-red-100 border border-red-400 text-red-800 text-xs font-retro">
                ⚠️ {pasteError}
              </div>
            )}

            <button
              onClick={handlePasteImport}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Download size={15} />
              <span>LOAD SAVE FROM CODE</span>
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-dashed border-[#2d2740] flex items-center justify-between text-[10px] font-retro text-gray-500">
          <span>🔒 Safe: Data stays within the QR code payload</span>
          <span>⚡ No login required</span>
        </div>
      </div>
    </div>
  );
};
