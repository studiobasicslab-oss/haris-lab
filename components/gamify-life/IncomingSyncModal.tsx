import React from 'react';
import { GameState } from './types';
import { PixelAvatar } from './PixelAvatar';
import { Sparkles, X, ShieldAlert, ArrowDownCircle } from 'lucide-react';

interface IncomingSyncModalProps {
  incomingState: GameState;
  currentState: GameState;
  onConfirm: () => void;
  onCancel: () => void;
}

export const IncomingSyncModal: React.FC<IncomingSyncModalProps> = ({
  incomingState,
  currentState,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#fcf6ea] border-4 border-[#2d2740] shadow-pixel-lg max-w-md w-full p-5 relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
          <span className="text-2xl animate-bounce">📥</span>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
              SAVE DATA DETECTED FROM QR SCAN!
            </h3>
            <span className="font-retro text-[10px] text-[#8a7dc4] font-bold">
              CROSS-DEVICE PEER TRANSFER
            </span>
          </div>
        </div>

        <p className="text-xs font-retro text-[#4c4270] mb-3 leading-relaxed">
          You opened a save link or scanned a QR code from another device. Would you like to load this character?
        </p>

        {/* Incoming Hero Card Preview */}
        <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-3">
          <div className="text-[10px] font-pixel text-[#8a7dc4] uppercase mb-2 flex items-center gap-1">
            <Sparkles size={12} className="text-[#fbbf24]" />
            <span>INCOMING CHARACTER FROM QR</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="shrink-0 p-1 bg-[#fdf6db] border border-[#2d2740]">
              <PixelAvatar avatarId={incomingState.character.avatarId} size={48} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-pixel text-xs text-[#2d2740] truncate">
                  {incomingState.character.name}
                </span>
                <span className="text-[10px] bg-[#fbbf24] px-1 py-0.5 border border-[#2d2740] font-bold">
                  LVL {incomingState.level}
                </span>
              </div>

              <p className="text-[10px] font-retro text-[#8a7dc4] truncate">
                {incomingState.character.title}
              </p>

              <div className="flex items-center gap-2 mt-1 text-[11px] font-retro text-[#2d2740] font-bold">
                <span className="text-[#b45309]">💰 {incomingState.gold}g</span>
                <span>•</span>
                <span className="text-[#3b6f99]">⚡ {incomingState.currentXp} XP</span>
                <span>•</span>
                <span className="text-[#e26b45]">🔥 {incomingState.streak || 0}d Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current State Warning if already played */}
        {currentState.level > 1 || currentState.gold > 0 ? (
          <div className="p-2.5 bg-[#fdf0ed] border border-[#2d2740] text-[11px] font-retro text-[#9c5548] mb-4 flex items-start gap-2">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <div>
              <strong>Note:</strong> Loading this will replace the current hero on this device ({currentState.character.name}, LVL {currentState.level}).
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            <ArrowDownCircle size={16} />
            <span>ACCEPT &amp; LOAD SAVE DATA</span>
          </button>

          <button
            onClick={onCancel}
            className="w-full py-2 bg-white hover:bg-gray-100 text-[#4c4270] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            KEEP CURRENT HERO / CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
