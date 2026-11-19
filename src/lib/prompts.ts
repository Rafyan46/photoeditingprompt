import fs from 'node:fs';
import path from 'node:path';
import { PROMPTS, type RawPrompt } from '../data/prompts';
import { COLLECTIONS, NAMES, PATTERN, type Collection, type Lang } from '../data/site';

// Every prompt is built from labelled blocks, so the AI gets precise, separate
// instructions: who must not change, the scene, the camera, the finish, what to avoid.
// The SCENE block is the prompt body from src/data/prompts.ts; the rest is added here,
// so one edit below upgrades every prompt on the site.
type Lock = RawPrompt['lock'];
type Blocks = { identity: string; sceneLabel: string; camera: string; finish: string; avoid: string };

const PERSON_CAMERA =
  'Follow the framing described in the scene. Full-frame camera look with natural perspective and no wide-angle distortion of the face. POSE RULE, which overrides any head or gaze instruction in the scene: keep my head straight and level exactly as in my photo, with the chin in a neutral position (not raised, not tucked), no head tilt, and no head turn of more than about 10 degrees, so my real face shape stays accurate. BODY RULE: natural human proportions, with a normal neck length and width; never stretch or elongate the neck, shoulders or face. Unless the scene needs otherwise, I look straight into the camera lens. The face must be large enough in the frame to be clearly recognisable, even in a full-body shot. Eyes in sharp focus, realistic depth of field, background detail falling off naturally. Light on the subject must come from the same direction, colour and softness as the light in the scene, with matching shadows and reflections.';
const PERSON_FINISH =
  'Photorealistic photograph, not an illustration or 3D render (if the scene asks for a toy, figurine or drawn stickers, photograph those realistically). Real skin texture with visible pores, natural under-eye detail and fine hair strands. Fabric shows real weave, folds and weight. Correct hands with five fingers, natural body proportions, consistent white balance between subject and background. High resolution and clean detail, unless the scene asks for grain, flash or a film look. No over-sharpening.';
const PERSON_AVOID =
  'a changed or generic face, smoothed or plastic skin, lightened skin tone, altered age or body shape, a stretched or elongated neck, extra or missing fingers, warped hands, duplicated people, floating objects, a cut-out look around the hair, text, logos, borders or watermarks unless the scene asks for them.';

const BLOCKS: Record<Lock, Blocks> = {
  single: {
    identity:
      'Use my uploaded photo as the only identity reference. Keep my exact face: face shape, eyes, eyebrows, nose, lips, jawline, skin tone, facial hair, moles and marks, and my real age. Keep my exact hair texture, length, parting and hairline, and my body proportions, as they are. Do not beautify, slim, lighten, smooth or age my face, and do not replace it with a similar-looking person. If I wear glasses in the photo, keep them.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: PERSON_CAMERA, finish: PERSON_FINISH,
    avoid: PERSON_AVOID + ' No extra people.',
  },
  couple: {
    identity:
      'Use the uploaded photo of the two of us as the only identity reference. Keep both exact faces: face shape, eyes, nose, lips, jawline, skin tone, facial hair and real age for each person. Keep both hairstyles, our height difference and our body proportions. Do not blend, swap, beautify or lighten our faces, and keep each person on the same side as in the photo unless the scene says otherwise.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: PERSON_CAMERA + ' Both faces equally sharp and equally well lit.', finish: PERSON_FINISH,
    avoid: PERSON_AVOID + ' No face blending between the two of us, no extra people.',
  },
  family: {
    identity:
      'Use the uploaded group photo as the only identity reference. First count every person in it (babies, children, parents and elders included) and keep that exact number. Keep every person in it, each with their own exact face, age, skin tone, hairstyle, height and build. The number of people must be exactly the same as in the photo, whether that is two or twenty. If the group is large, arrange them in tidy staggered rows (eldest seated in the centre, children in front, the rest around them) so that every single face is visible and nobody is hidden or cropped. Do not add, remove, merge, duplicate or swap anyone, and do not make faces look alike. Keep glasses, beards and head coverings as they are in the photo.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: PERSON_CAMERA + ' Deep enough focus that every face is sharp, front row and back row alike; nobody hidden behind another person.', finish: PERSON_FINISH,
    avoid: PERSON_AVOID + ' No missing or invented family members, no identical-looking faces.',
  },
  era: {
    identity:
      'Use my uploaded photo as the only identity reference. Keep my exact face: face shape, eyes, nose, lips, jawline, skin tone, moles and marks, and my real age. Only my hairstyle, clothing and accessories may change to suit the era. Do not beautify, lighten or replace my face with a period-looking stranger.',
    sceneLabel: 'ERA, SCENE AND STYLING',
    camera: 'Follow the framing described in the scene. It must look as if it was taken with a camera and film stock of that time: period-correct lens softness, mild vignetting and natural film grain, with the light source typical of that era. Light on me must match the scene. POSE RULE, which overrides any head or gaze instruction in the scene: keep my head straight and level exactly as in the photo, with the chin neutral (not raised, not tucked), no head tilt, and no head turn of more than about 10 degrees, so my real face shape stays accurate. Unless the scene needs otherwise, I look straight into the camera lens. My face must be large enough to be clearly recognisable.',
    finish: 'It must pass as a real photograph or print from that time, scanned today: period-correct colour or black-and-white tones, grain, slight fading and paper texture where the scene asks for it. Real skin texture under the grain. Every object, vehicle, sign and fabric in the frame must belong to that era.',
    avoid: 'modern objects, phones, modern cars, modern logos or fabrics, a clean digital look, HDR, smoothed or plastic skin, lightened skin tone, a changed face, extra or missing fingers, extra people, text or watermarks unless the scene asks for them.',
  },
  eraCouple: {
    identity:
      'Use the uploaded photo of the two of us as the only identity reference. Keep both exact faces: face shape, eyes, nose, lips, jawline, skin tone and real age for each person, and our height difference. Only our hairstyles, clothing and accessories may change to suit the era. Do not blend, swap, beautify or lighten our faces.',
    sceneLabel: 'ERA, SCENE AND STYLING',
    camera: 'Follow the framing described in the scene. It must look as if it was taken with a camera and film stock of that time: period-correct lens softness, mild vignetting and natural film grain. Both faces equally sharp, with light that matches the scene. POSE RULE, which overrides any head or gaze instruction in the scene: keep both heads straight and level exactly as in the photo, with the chin neutral (not raised, not tucked), no head tilt, and no head turn of more than about 10 degrees, so each real face shape stays accurate. Unless the scene needs otherwise, everyone looks straight into the camera lens. Each face must be large enough to be clearly recognisable.',
    finish: 'It must pass as a real photograph or print from that time, scanned today: period-correct tones, grain, slight fading and paper texture where the scene asks for it. Real skin texture under the grain. Every object, vehicle, sign and fabric in the frame must belong to that era.',
    avoid: 'modern objects, phones, modern cars, modern logos or fabrics, a clean digital look, HDR, smoothed skin, lightened skin tone, blended or swapped faces, extra or missing fingers, extra people, text or watermarks unless the scene asks for them.',
  },
  fix: {
    identity:
      'Edit the uploaded photo; do not generate a new one. Keep every person\'s face, expression, pose, age and identity exactly as in the original. Do not redraw, regenerate, beautify or re-light any face beyond what the edit below needs. Keep the original framing and aspect ratio unless the edit says otherwise.',
    sceneLabel: 'THE EDIT',
    camera: 'Keep the original camera angle, perspective and composition. Any new or repaired area must match the original light direction, colour temperature, grain and sharpness, so the edit cannot be spotted.',
    finish: 'Natural, believable result at the highest resolution available. Real skin texture and fine detail preserved, clean edges around hair and clothing, no halos, no banding, no over-sharpening or over-smoothing.',
    avoid: 'changed faces or expressions, invented facial details, plastic skin, altered body shape, cropped-off heads or limbs, colour casts, halos around edges, added objects, added text or watermarks.',
  },
  car: {
    identity:
      'Use my uploaded car photo as the base and edit it; do not generate a different car. Keep the car\'s exact make, model, generation, body shape, proportions, number of doors, lights and glass, and keep the camera angle and the background exactly as they are. Change only what is described below.',
    sceneLabel: 'THE MODIFICATION',
    camera: 'Keep the original camera angle, lens perspective and framing. New parts must sit correctly on the body with true panel gaps, wheel-arch clearance and ground contact, and must pick up the same light direction, reflections and shadows as the rest of the car.',
    finish: 'Photorealistic automotive photograph. Paint, metal, rubber, glass and carbon each reflect light correctly; reflections of the surroundings continue across the changed panels; a soft, correct contact shadow under the car. High resolution, crisp edges.',
    avoid: 'a different car model, a changed body shape or stretched proportions, warped or oval wheels, mismatched wheels, melted panel lines, paint on glass or tyres, a readable number plate, brand logos that were not on the car, people who were not in the photo, text or watermarks.',
  },
};

// Brand signature added to every prompt. It is the one piece of text that is always allowed.
const SIGNATURE =
  'Add \u201cphotoeditingprompt.com\u201d in the bottom-left corner, as a handwritten signature-style mark with thin cursive strokes, small size and subtle premium elegance, in white or soft off-white. It is always allowed and overrides any \u201cno text\u201d instruction elsewhere in this prompt (other text appears only if the scene asks for it); it must be spelled exactly photoeditingprompt.com, must not cover faces or key details, and should look like an elegant photographer\u2019s signature.';

function build(lock: Lock, body: string, collage = false) {
  let b = BLOCKS[lock];
  // The signature is the one allowed text, so the avoid list must not forbid all text.
  b = { ...b, avoid: b.avoid.replace(/(?<![\w-])(text|logos)(,| or)/, 'other $1$2').replace(/\bwatermarks\b/, 'other watermarks') };
  // A collage repeats the same person in several frames, so that is not a fault there.
  if (collage) b = { ...b, avoid: b.avoid.replace('duplicated people, ', '') + ' Every frame must show the same person or people from my photo, with the same face in each frame; no misspelled captions.' };
  return [
    `IDENTITY LOCK: ${b.identity}`,
    `${b.sceneLabel}: ${body}`,
    `CAMERA AND LIGHT: ${b.camera}`,
    `FINISH: ${b.finish}`,
    `AVOID: ${b.avoid}`,
    `TEXT / SIGNATURE: ${SIGNATURE}`,
  ].join('\n\n');
}

export interface Prompt extends RawPrompt {
  collection: Collection;
  template: string; // full prompt with {name} tokens
  text: string; // full prompt with default options filled in
  url: string;
  sample: { before?: string; chatgpt?: string; gemini?: string };
}

const SAMPLE_DIR = path.join(process.cwd(), 'public', 'samples');
function sampleFor(slug: string) {
  const out: Prompt['sample'] = {};
  for (const [key, suffix] of [['before', 'before'], ['chatgpt', 'chatgpt'], ['gemini', 'gemini']] as const) {
    for (const ext of ['webp', 'avif', 'jpg', 'png']) {
      const file = `${slug}-${suffix}.${ext}`;
      if (fs.existsSync(path.join(SAMPLE_DIR, file))) { out[key] = `/samples/${file}`; break; }
    }
  }
  return out;
}

export function fill(template: string, vars: Record<string, string[]> = {}) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k]?.[0] ?? `{${k}}`));
}

const byId = new Map(COLLECTIONS.map((c) => [c.id, c]));

export const ALL: Prompt[] = PROMPTS.map((r) => {
  const collection = byId.get(r.c);
  if (!collection) throw new Error(`Prompt "${r.s}" uses unknown collection "${r.c}"`);
  const template = build(r.lock, r.p, r.c === 'collage' || /collage|panel/.test(r.s));
  for (const m of template.matchAll(/\{(\w+)\}/g)) {
    if (!r.v?.[m[1]]) throw new Error(`Prompt "${r.s}" uses {${m[1]}} but has no options for it`);
  }
  return { ...r, collection, template, text: fill(template, r.v), url: `/prompt/${r.s}/`, sample: sampleFor(r.s) };
});

const slugs = new Set<string>();
for (const p of ALL) { if (slugs.has(p.s)) throw new Error(`Duplicate prompt slug: ${p.s}`); slugs.add(p.s); }

/** Collections that have at least one prompt, in the order defined in site.ts */
export const LIVE: Collection[] = COLLECTIONS.filter((c) => ALL.some((p) => p.c === c.id));
/** Collections with their own page (everything except the festival-hub sections) */
export const PAGES: Collection[] = LIVE.filter((c) => !c.hub);
export const HUB: Collection[] = LIVE.filter((c) => c.hub);
export const inCollection = (id: string) => ALL.filter((p) => p.c === id);
export const homeUrl = (lang: Lang = 'en') => (lang === 'en' ? '/' : `/${lang}/`);
export const colUrl = (c: Collection, lang: Lang = 'en') =>
  c.hub ? `/festivals/#${c.id}` : lang === 'en' ? `/${c.path}/` : `/${lang}/${c.path}/`;
export const label = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

// ---------- Translated collection text ----------
export function cName(c: Collection, lang: Lang = 'en') {
  return lang === 'en' ? c.name : NAMES[lang]?.[c.id] ?? c.name;
}
export function cH1(c: Collection, lang: Lang = 'en') {
  if (lang === 'en') return c.h1;
  if (lang === 'ta' && c.h1Ta) return c.h1Ta;
  return PATTERN[lang].h1(cName(c, lang));
}
export function cIntro(c: Collection, lang: Lang = 'en') {
  if (lang === 'en') return c.intro;
  if (lang === 'ta' && c.introTa) return c.introTa;
  return PATTERN[lang].intro(cName(c, lang));
}

/** Shorten text for a meta description without cutting through a word. */
export function metaDesc(text: string, max = 150) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}
