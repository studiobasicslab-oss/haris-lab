import { deflate, inflate } from 'pako';
import QRCode from 'qrcode';
import { GameState } from '../types';
import { INITIAL_STATE } from './storage';

function uint8ArrayToBase64Url(uint8: Uint8Array): string {
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Compresses GameState into a compact, URL-safe base64 string for QR codes.
 * Optimizes payload by retaining current state and the last 14 days of history.
 */
export function generateSyncPayload(state: GameState): string {
  try {
    // Keep up to last 14 history days for compact QR density
    const historyKeys = Object.keys(state.history || {}).sort().slice(-14);
    const compactHistory: typeof state.history = {};
    for (const key of historyKeys) {
      compactHistory[key] = state.history[key];
    }

    const compactState: GameState = {
      ...state,
      history: compactHistory,
    };

    const json = JSON.stringify(compactState);
    const encoded = new TextEncoder().encode(json);
    const deflated = deflate(encoded);
    return uint8ArrayToBase64Url(deflated);
  } catch (err) {
    console.error('Failed to generate sync payload:', err);
    return '';
  }
}

/**
 * Decompresses and validates a sync payload from QR code or URL.
 */
export function parseSyncPayload(payload: string): GameState | null {
  try {
    const bytes = base64UrlToUint8Array(payload.trim());
    const decompressed = inflate(bytes);
    const json = new TextDecoder().decode(decompressed);
    const parsed = JSON.parse(json);

    if (!parsed || !parsed.character || typeof parsed.level !== 'number') {
      return null;
    }

    return {
      ...INITIAL_STATE,
      ...parsed,
    };
  } catch (err) {
    console.error('Failed to parse sync payload:', err);
    return null;
  }
}

/**
 * Generates an SVG Data URL QR code image.
 */
export async function generateQrCodeDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 280,
    margin: 1.5,
    color: {
      dark: '#2d2740',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}
