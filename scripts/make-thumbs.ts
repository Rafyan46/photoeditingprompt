/** Makes a small card thumbnail for every sample picture: <name>-thumb.webp
 *  Runs automatically before every build (see package.json). Skips thumbnails that are already up to date. */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'samples');
if (!fs.existsSync(dir)) process.exit(0);

let made = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.webp') || f.endsWith('-thumb.webp')) continue;
  const src = path.join(dir, f);
  const out = path.join(dir, f.replace(/\.webp$/, '-thumb.webp'));
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
  // short side = 400 px (a card is about 190 px wide on a phone, so 400 still looks sharp on 2x screens), never enlarge
  await sharp(src).resize({ width: 400, height: 400, fit: 'outside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
  made++;
}
console.log(`make-thumbs: created ${made} thumbnail(s)`);
