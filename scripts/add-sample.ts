/** Usage: npx tsx scripts/add-sample.ts <slug> <before-image> <after-image>
 *  Converts both pictures to WebP and saves them where the site looks for them. */
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';
const [slug, before, after] = process.argv.slice(2);
if (!slug || !before || !after) { console.error('Usage: npx tsx scripts/add-sample.ts <slug> <before-image> <after-image>'); process.exit(1); }
const out = path.join(process.cwd(), 'public', 'samples'); fs.mkdirSync(out, { recursive: true });
const conv = (src: string, name: string) => sharp(src).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(out, name));
await conv(before, `${slug}-before.webp`); await conv(after, `${slug}-gemini.webp`);
console.log(`Saved public/samples/${slug}-before.webp and ${slug}-gemini.webp`);
