/**
 * Makes the before/after sample pictures automatically with the Gemini API.
 *   GEMINI_API_KEY=xxxx npx tsx scripts/generate-samples.ts          (all prompts)
 *   GEMINI_API_KEY=xxxx npx tsx scripts/generate-samples.ts 5        (first 5 only, a trial)
 *   GEMINI_API_KEY=xxxx npx tsx scripts/generate-samples.ts cast     (only the model photos)
 * Safe to stop and re-run: it skips pictures that already exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ALL } from '../src/lib/prompts';

// Keys: one or many, comma separated (use keys from DIFFERENT Google projects, each has its own free quota).
const KEYS = (process.env.GEMINI_API_KEY || '').split(',').map((k) => k.trim()).filter(Boolean);
if (!KEYS.length) { console.error('Set GEMINI_API_KEY first (free key: aistudio.google.com/apikey). Several keys: key1,key2'); process.exit(1); }
// Models are tried in this order; when one runs out of free quota the next is used.
const MODELS = (process.env.GEMINI_MODELS || 'gemini-2.5-flash-image,gemini-2.0-flash-preview-image-generation,gemini-3-pro-image-preview')
  .split(',').map((m) => m.trim()).filter(Boolean);
type Combo = { key: string; model: string; name: string; deadUntil: number; fails: number };
const POOL: Combo[] = KEYS.flatMap((key, i) => MODELS.map((model) => ({ key, model, name: `key${i + 1}/${model}`, deadUntil: 0, fails: 0 })));
const OUT = path.join(process.cwd(), 'public', 'samples');
const CAST_DIR = path.join(process.cwd(), 'scripts', 'cast');
fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(CAST_DIR, { recursive: true });

const FICTION = ' A fictional adult who does not resemble any real or famous person. Plain, everyday phone photo, natural skin texture, no retouching, no text.';
const CAST: Record<string, string> = {
  arun: 'A casual phone selfie of a 25-year-old South Indian man with short black hair and a light stubble, wearing a plain grey t-shirt, standing in a living room in daylight, relaxed smile, looking at the camera.',
  kabir: 'A casual phone photo of a 30-year-old North Indian man with a neat beard and medium-length hair, wearing a plain navy shirt, standing on a balcony in daylight, looking at the camera.',
  meera: 'A casual phone selfie of a 24-year-old South Indian woman with long black hair, wearing a plain blue kurti, standing near a window in daylight, gentle smile, looking at the camera.',
  anjali: 'A casual phone photo of a 29-year-old Indian woman with shoulder-length hair and glasses, wearing a plain white top, sitting on a sofa in daylight, looking at the camera.',
  coupleA: 'A casual phone photo of an Indian couple in their late twenties standing side by side in a park in daylight, both in plain everyday clothes, both smiling at the camera, the man slightly taller.',
  coupleB: 'A casual phone photo of an Indian married couple in their thirties sitting together on a sofa at home, both in simple everyday clothes, both looking at the camera.',
  family: 'A casual phone photo of an Indian family of five adults standing together in a living room: a couple in their fifties, their adult son and daughter in their twenties, and a grandmother in her seventies. Everyone in simple everyday clothes, everyone looking at the camera.',
  old: 'A scan of a black-and-white Indian family studio portrait from the 1960s with scratches, a fold line, stains and faded corners. Fictional people, no text.',
  blurry: 'A slightly blurry, noisy, underexposed phone photo of an Indian man standing in a dim room at night. Fictional person, no text.',
  busy: 'A phone photo of an Indian woman standing on a crowded street with strangers, wires and a parked scooter behind her. Fictional person, no text.',
};
const SKIP = new Set(['remove-glare-from-glasses','open-closed-eyes-group-photo','product-photo-white-background','straighten-crop-document-photo','remove-date-stamp-from-photo']);
const FIXMAP: Record<string, string> = {
  'restore-old-damaged-family-photo': 'old', 'old-wedding-photo-restore-colour': 'old', 'colourise-black-and-white-photo': 'old',
  'sharpen-blurry-low-quality-photo': 'blurry', 'fix-lighting-dark-underexposed-photo': 'blurry',
  'change-photo-background-natural': 'busy', 'remove-people-objects-from-background': 'busy',
};
let flip = 0;
function castFor(p: (typeof ALL)[number]) {
  if (FIXMAP[p.s]) return FIXMAP[p.s];
  const n = flip++ % 2;
  if (p.a === 'couple') return n ? 'coupleB' : 'coupleA';
  if (p.a === 'family') return 'family';
  if (p.a === 'boy') return n ? 'kabir' : 'arun';
  if (p.a === 'girl') return n ? 'anjali' : 'meera';
  return n ? 'arun' : 'meera';
}

class AllExhausted extends Error {}
async function gemini(parts: any[]): Promise<Buffer> {
  for (let round = 0; round < 40; round++) {
    const now = Date.now();
    const c = POOL.find((x) => x.deadUntil <= now);
    if (!c) {
      const next = Math.min(...POOL.map((x) => x.deadUntil));
      if (next === Infinity || next - now > 5 * 60 * 1000) throw new AllExhausted();
      console.log(`  all models busy, waiting ${Math.ceil((next - now) / 1000)}s`);
      await new Promise((s) => setTimeout(s, next - now + 500));
      continue;
    }
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${c.model}:generateContent`, {
        method: 'POST', headers: { 'x-goog-api-key': c.key, 'content-type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ['IMAGE', 'TEXT'] } }),
      });
      if (r.status === 429) {
        c.fails++;
        const body = (await r.text()).replace(/\s+/g, ' ');
        console.log(`  GOOGLE SAYS (${c.name}): ${body.slice(0, 500)}`);
        // first hit: maybe a per-minute limit, wait 70s. Hit again soon after: daily limit, drop it for this run.
        c.deadUntil = c.fails >= 2 ? Infinity : Date.now() + 70000;
        console.log(`  ${c.name} limit reached${c.fails >= 2 ? ' (out for today)' : ''}, switching`);
        continue;
      }
      if (r.status === 404 || r.status === 403 || r.status === 400) {
        const txt = (await r.text()).slice(0, 160);
        c.deadUntil = Infinity;
        console.log(`  ${c.name} not usable (${r.status}): ${txt}`);
        continue;
      }
      if (r.status >= 500) { c.deadUntil = Date.now() + 20000; continue; }
      const j: any = await r.json();
      const img = j.candidates?.[0]?.content?.parts?.find((x: any) => x.inlineData || x.inline_data);
      const d = img?.inlineData?.data ?? img?.inline_data?.data;
      if (!d) { console.log(`  ${c.name} returned no image (maybe blocked), trying next`); c.deadUntil = Date.now() + 5000; continue; }
      c.fails = 0;
      return Buffer.from(d, 'base64');
    } catch (e) {
      console.log(`  ${c.name} error: ${(e as Error).message}`);
      c.deadUntil = Date.now() + 20000;
    }
  }
  throw new Error('gave up on this image');
}
const webp = (b: Buffer, f: string) => sharp(b).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 82 }).toFile(f);

const arg = process.argv[2];
for (const [id, text] of Object.entries(CAST)) {
  const f = path.join(CAST_DIR, `${id}.png`);
  if (fs.existsSync(f)) continue;
  console.log('cast', id);
  try { fs.writeFileSync(f, await gemini([{ text: text + (id === 'old' || id === 'blurry' || id === 'busy' ? '' : FICTION) }])); }
  catch (e) { console.log('Out of quota while making model photos. Run again later.'); process.exit(0); }
}
if (arg === 'cast') process.exit(0);

const limit = Number(arg) || Infinity; let done = 0, failed: string[] = [];
for (const p of ALL) {
  if (done >= limit) break;
  if (SKIP.has(p.s)) continue;
  const after = path.join(OUT, `${p.s}-gemini.webp`);
  if (fs.existsSync(after)) continue;
  const cast = castFor(p);
  const src = fs.readFileSync(path.join(CAST_DIR, `${cast}.png`));
  console.log(`[${done + 1}] ${p.s}  (${cast})`);
  try {
    const out = await gemini([{ text: p.text }, { inlineData: { mimeType: 'image/png', data: src.toString('base64') } }]);
    await webp(src, path.join(OUT, `${p.s}-before.webp`));
    await webp(out, after);
    done++;
  } catch (e) {
    if (e instanceof AllExhausted) { console.log('\nEvery model/key is out of free quota for now. Run the same command again later (tomorrow) and it will carry on.'); break; }
    failed.push(p.s); console.log('  FAILED', p.s);
  }
  await new Promise((s) => setTimeout(s, 6000));
}
console.log(`\nDone: ${done} made. Failed: ${failed.length ? failed.join(', ') : 'none'}`);
