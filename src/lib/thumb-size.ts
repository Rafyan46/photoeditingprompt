// Real width and height of a card thumbnail, read once at build time, so the browser reserves the right
// space before the picture loads (needed for the varied-height gallery) and the page does not jump.
import sharp from 'sharp';
import { existsSync } from 'node:fs';
const cache = new Map<string, { w: number; h: number } | null>();
export async function thumbSize(url?: string): Promise<{ w: number; h: number } | null> {
  if (!url) return null;
  if (cache.has(url)) return cache.get(url)!;
  const file = `public${url}`;
  let out: { w: number; h: number } | null = null;
  try {
    if (existsSync(file)) { const m = await sharp(file).metadata(); if (m.width && m.height) out = { w: m.width, h: m.height }; }
  } catch { /* fall back to 3:4 */ }
  cache.set(url, out);
  return out;
}
