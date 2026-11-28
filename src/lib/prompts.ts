import fs from 'node:fs';
import path from 'node:path';
import { PROMPTS, type RawPrompt } from '../data/prompts';
import cast from '../data/cast.json';
import { COLLECTIONS, NAMES, PATTERN, type Collection, type Lang } from '../data/site';

// Every prompt is built from labelled blocks, so the AI gets precise, separate
// instructions: who must not change, the scene, the camera, the finish, what to avoid.
// The SCENE block is the prompt body from src/data/prompts.ts; the rest is added here,
// so one edit below upgrades every prompt on the site.
type Lock = RawPrompt['lock'];
type Blocks = { identity: string; sceneLabel: string; camera: string; finish: string; avoid: string };

// Family prompts still use this camera block; single and couple prompts use the face rules below.
const PERSON_CAMERA =
  'Follow the framing described in the scene. Full-frame camera look with natural perspective and no wide-angle distortion of the face. POSE RULE, which overrides any head or gaze instruction in the scene: keep my head straight and level exactly as in my photo, with the chin in a neutral position (not raised, not tucked), no head tilt, and no head turn of more than about 10 degrees, so my real face shape stays accurate. BODY RULE: natural human proportions, with a normal neck length and width; never stretch or elongate the neck, shoulders or face. Unless the scene needs otherwise, I look straight into the camera lens. The face must be large enough in the frame to be clearly recognisable, even in a full-body shot. Eyes in sharp focus, realistic depth of field, background detail falling off naturally. Light on the subject must come from the same direction, colour and softness as the light in the scene, with matching shadows and reflections.';

// Image models copy a face best when it is big, facing the camera and at the same angle as the
// uploaded photo. A turned head or a tiny face in a wide shot makes the model invent the face.
// These rules come first, so a scene's framing or gaze can never shrink or turn the faces away.
const FACE_RULE_SINGLE =
  'FACE RULE, which comes before any head or framing instruction in the scene: my face is turned toward the camera, straight on or turned no more than about 15 degrees, never a side profile unless the scene itself asks for a profile. My head is level with a neutral chin (not raised, not tucked) and at most a slight natural tilt, so my real face shape stays accurate. My eyes may follow the gaze the scene describes; otherwise I look into the camera lens. My face must be large and clearly recognisable, at least about one-tenth of the image height even in a full-body shot, unless the scene itself says I am small in the frame; then my face must still be sharp, well lit and toward the camera.';
const FACE_RULE_COUPLE =
  'FACE RULE, which comes before any head, gaze or framing instruction in the scene: both faces are turned toward the camera, straight on or turned no more than about 15 degrees, never side profiles unless the scene itself asks for a profile. Heads level with neutral chins (not raised, not tucked) and at most a slight natural tilt, so each real face shape stays accurate. We both look into the camera lens unless the scene gives a different gaze. Closeness between us comes from our bodies leaning in and touching, not from turning our faces away from the camera. Both faces must be large and clearly recognisable, each at least about one-tenth of the image height even in a full-body shot; if a wide view would make the faces smaller, frame closer.';
const BODY_RULE =
  'BODY RULE: natural human proportions, with a normal neck length and width; never stretch or elongate the neck, shoulders or face.';
const SINGLE_CAMERA =
  `Follow the framing described in the scene. Full-frame camera look with natural perspective and no wide-angle distortion of the face. ${FACE_RULE_SINGLE} ${BODY_RULE} Eyes in sharp focus, realistic depth of field, background detail falling off naturally. Light on me must come from the same direction, colour and softness as the light in the scene, with matching shadows and reflections.`;
const COUPLE_CAMERA =
  `Follow the framing described in the scene. Full-frame camera look with natural perspective and no wide-angle distortion of either face. ${FACE_RULE_COUPLE} ${BODY_RULE} Eyes in sharp focus, realistic depth of field, background detail falling off naturally. Light on both of us must come from the same direction, colour and softness as the light in the scene, with matching shadows and reflections. Both faces equally sharp and equally well lit.`;
const PERSON_FINISH =
  'Photorealistic photograph, not an illustration or 3D render (if the scene asks for a toy, figurine or drawn stickers, photograph those realistically). Real skin texture with visible pores, natural under-eye detail and fine hair strands. Fabric shows real weave, folds and weight. Correct hands with five fingers, natural body proportions, consistent white balance between subject and background. High resolution and clean detail, unless the scene asks for grain, flash or a film look. No over-sharpening.';
const PERSON_AVOID =
  'a changed or generic face, smoothed or plastic skin, lightened skin tone, altered age or body shape, a stretched or elongated neck, extra or missing fingers, warped hands, duplicated people, floating objects, a cut-out look around the hair, text, logos, borders or watermarks unless the scene asks for them.';
const FACE_AVOID =
  'a changed or generic face, a slimmed, narrowed or lengthened face, a thinner or reshaped beard, smoothed or plastic skin, lightened skin tone, altered age or body shape, faces too small to recognise, side profiles the scene did not ask for, a stretched or elongated neck, extra or missing fingers, warped hands, duplicated people, floating objects, a cut-out look around the hair, text, logos, borders or watermarks unless the scene asks for them.';

const BLOCKS: Record<Lock, Blocks> = {
  single: {
    identity:
      'Use my uploaded photo as the only identity reference. Keep my exact face: face shape and width, cheek fullness, jawline, chin, eyes, eyebrows, nose, lips, skin tone, facial hair density and outline, moles and marks, a nose pin if I wear one, and my real age. Keep my exact hair texture, length, parting and hairline, and my body build, as they are. Do not slim, narrow, lengthen, beautify, lighten, smooth or age my face, and do not replace it with a similar-looking person. Do not add a bindi, tilak or other face marks or face jewellery that are not in my photo, unless the scene asks for them. Keep my skin tone exactly as in the photo, not lighter and not shifted orange or grey by the light in the scene. If I wear glasses in the photo, keep them.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: SINGLE_CAMERA, finish: PERSON_FINISH,
    avoid: FACE_AVOID + ' No extra people.',
  },
  couple: {
    identity:
      'Use the uploaded photo of the two of us as the only identity reference. Keep both faces exactly, each person separately: face shape and width, cheek fullness, jawline, chin, eyes, eyebrows, nose, lips, skin tone, facial hair density and outline, moles and marks, a nose pin if worn, and real age. Keep both hairstyles, our height difference and our body builds. Do not slim, narrow, lengthen, beautify, lighten, blend or swap our faces, and do not replace either of us with a similar-looking person. Do not add a bindi, tilak or other face marks or face jewellery that are not in the photo, unless the scene asks for them. Keep each skin tone exactly as in the photo, not lighter and not shifted orange or grey by the light in the scene. Keep each person on the same side as in the photo unless the scene says otherwise.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: COUPLE_CAMERA, finish: PERSON_FINISH,
    avoid: FACE_AVOID + ' No face blending between the two of us, no extra people.',
  },
  family: {
    identity:
      'Use the uploaded group photo as the only identity reference. First count every person in it (babies, children, parents and elders included) and keep that exact number. Keep every person in it, each with their own exact face, age, skin tone, hairstyle, height and build. The number of people must be exactly the same as in the photo, whether that is two or twenty. If the group is large, arrange them in tidy staggered rows (eldest seated in the centre, children in front, the rest around them) so that every single face is visible and nobody is hidden or cropped. Do not add, remove, merge, duplicate or swap anyone, and do not make faces look alike. Keep glasses, beards and head coverings as they are in the photo. Do not add a bindi, tilak or other face marks or face jewellery that are not in the photo, unless the scene asks for them.',
    sceneLabel: 'SCENE, POSE AND STYLING', camera: PERSON_CAMERA + ' Deep enough focus that every face is sharp, front row and back row alike; nobody hidden behind another person.', finish: PERSON_FINISH,
    avoid: PERSON_AVOID + ' No missing or invented family members, no identical-looking faces.',
  },
  era: {
    identity:
      'Use my uploaded photo as the only identity reference. Keep my exact face: face shape and width, cheek fullness, jawline, chin, eyes, nose, lips, skin tone, facial hair density, moles and marks, and my real age. Only my hairstyle, clothing and accessories may change to suit the era. Do not slim, narrow, beautify, lighten or replace my face with a period-looking stranger. Do not add a bindi, tilak or other face marks or face jewellery that are not in my photo, unless the scene asks for them.',
    sceneLabel: 'ERA, SCENE AND STYLING',
    camera: `Follow the framing described in the scene. It must look as if it was taken with a camera and film stock of that time: period-correct lens softness, mild vignetting and natural film grain, with the light source typical of that era. Light on me must match the scene. ${FACE_RULE_SINGLE}`,
    finish: 'It must pass as a real photograph or print from that time, scanned today: period-correct colour or black-and-white tones, grain, slight fading and paper texture where the scene asks for it. Real skin texture under the grain. Every object, vehicle, sign and fabric in the frame must belong to that era.',
    avoid: 'modern objects, phones, modern cars, modern logos or fabrics, a clean digital look, HDR, smoothed or plastic skin, lightened skin tone, a changed, slimmed or narrowed face, extra or missing fingers, extra people, text or watermarks unless the scene asks for them.',
  },
  eraCouple: {
    identity:
      'Use the uploaded photo of the two of us as the only identity reference. Keep both faces exactly, each person separately: face shape and width, cheek fullness, jawline, chin, eyes, nose, lips, skin tone, facial hair density and real age, and our height difference. Only our hairstyles, clothing and accessories may change to suit the era. Do not slim, narrow, blend, swap, beautify or lighten our faces. Do not add a bindi, tilak or other face marks or face jewellery that are not in the photo, unless the scene asks for them.',
    sceneLabel: 'ERA, SCENE AND STYLING',
    camera: `Follow the framing described in the scene. It must look as if it was taken with a camera and film stock of that time: period-correct lens softness, mild vignetting and natural film grain. Both faces equally sharp, with light that matches the scene. ${FACE_RULE_COUPLE}`,
    finish: 'It must pass as a real photograph or print from that time, scanned today: period-correct tones, grain, slight fading and paper texture where the scene asks for it. Real skin texture under the grain. Every object, vehicle, sign and fabric in the frame must belong to that era.',
    avoid: 'modern objects, phones, modern cars, modern logos or fabrics, a clean digital look, HDR, smoothed skin, lightened skin tone, slimmed, narrowed, blended or swapped faces, extra or missing fingers, extra people, text or watermarks unless the scene asks for them.',
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

// Handles any kind of input photo, and keeps the result faithful to the scene as written.
const INPUT_PERSON =
  'Works with any photo. My photo may be a close-up, a selfie, a half-body or full-body shot, a side angle, a cropped group photo, in low light, a little blurry or low resolution, or have sunglasses, a mask, a hand or hair covering part of the face. Whatever it is, still create the complete scene described below. If the photo shows only the face or upper body, extend the body, clothes, pose and background naturally to match the scene and my real build. Never copy the photo\u2019s own background, clothes, filter or lighting unless the scene says so; re-light my face to match the new scene while keeping it the same face. If my face is turned or partly covered, use only the features that are visible, keep the same side of the face, and do not invent a different person. If the photo is low resolution, rebuild clean detail without changing who I am. Follow the scene exactly as written: every outfit, prop, pose, setting and framing it names must appear, and nothing it does not name should be added. Produce one single finished image.';
// Most visitors upload phone selfies: close, often from below, with a wide lens that stretches
// the nose and chin. These versions undo that before the face is copied.
const INPUT_SINGLE =
  'Works with any photo. My photo may be a selfie, a close-up, a half-body or full-body shot, a side angle, a cropped group photo, in low light, a little blurry or low resolution, or have sunglasses, a mask, a hand or hair covering part of the face. Whatever it is, still create the complete scene described below. If the photo is a selfie or was taken from a low or high angle, rebuild my face as it would look at eye level from about two metres away, with the same proportions and none of the selfie lens stretch on the nose, chin or jaw. If the photo shows only the face or upper body, extend the body, clothes and pose naturally to match the scene and my real build. Never copy the photo’s own background, clothes, filter or lighting unless the scene says so; re-light my face to match the new scene while keeping it the same face. If my face is turned or partly covered, use only the features that are visible, keep the same side of the face, and do not invent a different person. If the photo is low resolution, rebuild clean detail without changing who I am. Follow the scene as written: every outfit, prop, pose and setting it names must appear, and nothing it does not name should be added. Produce one single finished image.';
const INPUT_COUPLE =
  'Works with any photo of the two of us. It may be a selfie, a close-up, a half-body or full-body shot, a side angle, cropped from a group photo, in low light, a little blurry or low resolution, or have sunglasses, a mask, a hand or hair covering part of a face. Whatever it is, still create the complete scene described below. If the photo is a selfie or was taken from a low or high angle, rebuild both faces as they would look at eye level from about two metres away, with the same proportions and none of the selfie lens stretch on the nose, chin or jaw. If the photo shows only our faces or upper bodies, extend our bodies, clothes and pose naturally to match the scene and our real builds. Never copy the photo’s own background, clothes, filter or lighting unless the scene says so; re-light both faces to match the new scene while keeping them the same faces. If a face is turned or partly covered, use only the features that are visible and do not invent a different person. If the photo is low resolution, rebuild clean detail without changing who we are. Follow the scene as written: every outfit, prop, pose and setting it names must appear, and nothing it does not name should be added. Produce one single finished image.';
const INPUT_FIX =
  'Works with any photo: portrait or landscape, colour or black and white, old, torn, faded, blurry, dark or low resolution. Judge what is wrong from the photo itself and apply only the edit named below, and nothing more. Produce one single finished image.';
const INPUT_CAR =
  'Works with any car photo: front, side, rear or three-quarter angle, day or night, parked or on the road, even if the car is partly cropped or dirty. Keep the angle and background as they are, and apply only the modification named below. Produce one single finished image.';
const INPUT: Record<Lock, string> = {
  single: INPUT_SINGLE, couple: INPUT_COUPLE, family: INPUT_PERSON, era: INPUT_SINGLE, eraCouple: INPUT_COUPLE,
  fix: INPUT_FIX, car: INPUT_CAR,
};

// Brand signature added to every prompt. It is the one piece of text that is always allowed.
const SIGNATURE =
  'Add \u201cphotoeditingprompt.com\u201d in the bottom-left corner only, never centred and no wider than about one-third of the image width, in a friendly, clean, rounded sans-serif font (not cursive, not decorative), regular weight, about 6 percent of the image height, easy on the eyes and instantly readable, in white or soft off-white with a faint soft shadow so it stays readable on any background, every letter distinct. It is always allowed and overrides any \u201cno text\u201d instruction elsewhere in this prompt (other text appears only if the scene asks for it); it must be spelled exactly photoeditingprompt.com, must not cover faces or key details, and should look tidy and professional.';

// Poster art lives or dies by its camera angle, so for game-art the angle in the scene wins.
const ART_CAMERA =
  'Use exactly the camera angle, height and framing described in the scene as \u201cCamera angle\u201d; it overrides any generic framing. Strong poster perspective with clear foreground, middle ground and background, and the horizon placed to suit that angle. Keep the face accurate at that angle: natural face proportions with no stretching, no wide-angle distortion of the face or neck, my head straight and level on the body with a neutral chin, no head tilt, and my face large and clearly recognisable. Light on me matches the scene: warm sunset rim light and soft shadows. VEHICLE RULE: any car, bike or helicopter is drawn as one complete, physically correct vehicle. Its front, wheels and rear line up and it faces one clear direction. A person standing or crouching in front of a vehicle must never split it into two halves that do not match; if a vehicle would be hidden behind a person, move it to one side so it stays whole.';

const ART_FINISH =
  'A finished piece of illustrated poster art, not a photograph: painterly brush texture with clean confident edges, rich saturated colour, smooth believable skin shading that keeps my real skin tone, detailed fabric folds, correct hands with five fingers and natural body proportions. Crisp, high resolution, with no blur and no over-smoothing.';

function build(lock: Lock, body: string, collage = false, art = false) {
  let b = BLOCKS[lock];
  if (art) b = { ...b, finish: ART_FINISH, camera: ART_CAMERA + (lock === 'couple' ? ' Both faces equally sharp and equally well lit.' : '') };
  // The signature is the one allowed text, so the avoid list must not forbid all text.
  b = { ...b, avoid: b.avoid.replace(/(?<![\w-])(text|logos)(,| or)/, 'other $1$2').replace(/\bwatermarks\b/, 'other watermarks') };
  // A collage repeats the same person in several frames, so that is not a fault there.
  if (collage) b = { ...b, avoid: b.avoid.replace('duplicated people, ', '') + ' Every frame must show the same person or people from my photo, with the same face in each frame; no misspelled captions.' };
  return [
    `IDENTITY LOCK: ${b.identity}`,
    `INPUT PHOTO: ${INPUT[lock]}`,
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
// Family and group prompts share one "before": the five-person family photo they were all made from.
const SHARED_BEFORE: Record<string, string> = {
  family: '/samples/cast-family-before.webp',
  man: '/samples/viral-red-studio-cinematic-portrait-before.webp',
  woman: '/samples/viral-meet-my-younger-self-before.webp',
  couple: '/samples/wedding-couple-varmala-moment-before.webp',
};
function sampleFor(slug: string) {
  const out: Prompt['sample'] = {};
  for (const [key, suffix] of [['before', 'before'], ['chatgpt', 'chatgpt'], ['gemini', 'gemini']] as const) {
    for (const ext of ['webp', 'avif', 'jpg', 'png']) {
      const file = `${slug}-${suffix}.${ext}`;
      if (fs.existsSync(path.join(SAMPLE_DIR, file))) { out[key] = `/samples/${file}`; break; }
    }
  }
  // Prompts without their own "before" use the shared cast photo that their result was made from.
  const shared = SHARED_BEFORE[(cast as Record<string, string>)[slug]];
  if (!out.before && shared && fs.existsSync(path.join(SAMPLE_DIR, shared.slice('/samples/'.length)))) out.before = shared;
  return out;
}

export function fill(template: string, vars: Record<string, string[]> = {}) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k]?.[0] ?? `{${k}}`));
}

const byId = new Map(COLLECTIONS.map((c) => [c.id, c]));

// Stylish Portraits prompts stay unpublished (draft) until their sample image exists.
const isDraft = (slug: string) => /^(stylish|guru-nanak)-/.test(slug) && !fs.existsSync(path.join(SAMPLE_DIR, `${slug}-chatgpt.webp`));
export const ALL: Prompt[] = PROMPTS.filter((r) => !isDraft(r.s)).map((r) => {
  const collection = byId.get(r.c);
  if (!collection) throw new Error(`Prompt "${r.s}" uses unknown collection "${r.c}"`);
  const template = build(r.lock, r.p, r.c === 'collage' || /collage|panel/.test(r.s), r.c === 'game-art');
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
/** Short name for a long option, so dropdowns stay readable. The full text is still what goes into the prompt. */
export function shortOpt(o: string, max = 34) {
  let t = o.split(':')[0].split(/, | with | and the | so /)[0].trim();
  t = t.charAt(0).toUpperCase() + t.slice(1);
  if (t.length > max) { t = t.slice(0, max); t = t.slice(0, t.lastIndexOf(' ')) + '…'; }
  return t;
}
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
