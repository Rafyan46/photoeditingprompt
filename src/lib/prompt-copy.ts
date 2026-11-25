import type { Prompt } from './prompts';
import { label } from './prompts';

// Builds the short "what this edit does" text and the meta description for a prompt page.
// Everything is generated from the prompt's own scene text and options, so every page is different.

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Turn the first-person scene text ("me", "my", "us") into the second person ("you", "your"). */
function secondPerson(s: string, group: boolean) {
  let t = s;
  t = t.replace(/\bI am\b/g, 'you are').replace(/\bI['’]m\b/g, 'you are').replace(/\bI\b/g, 'you');
  t = t.replace(/\b[Ww]e are\b/g, 'you both are').replace(/\b[Ww]e\b/g, 'you both');
  t = t.replace(/\bmyself\b/gi, 'yourself').replace(/\bme\b/gi, 'you').replace(/\bmy\b/gi, 'your');
  t = t.replace(/\bour\b/gi, 'your').replace(/\bourselves\b/gi, 'yourselves');
  t = t.replace(/\bus\b/gi, group ? 'you both' : 'you');
  return t;
}

/** Shorten to at most `max` words, cutting at a comma or a space, never mid-word. */
function clip(s: string, max: number) {
  const w = s.trim().split(/\s+/);
  if (w.length <= max) return s.trim().replace(/[.,;:]+$/, '');
  const cut = w.slice(0, max).join(' ');
  const comma = cut.lastIndexOf(',');
  return (comma > cut.length * 0.55 ? cut.slice(0, comma) : cut).replace(/[.,;:\s]+$/, '');
}

/** The first scene sentence. If it reaches a dropdown placeholder, stop just before it so the text reads cleanly. */
function firstSentence(p: Prompt) {
  const raw = p.p.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s/)[0];
  const at = raw.indexOf('{');
  if (at > 0) {
    let head = raw.slice(0, at).replace(/[\s,;:]+$/, '');
    // drop dangling connectors such as "wearing", "in a", "with"
    head = head.replace(/(\s+(wearing|dressed in|in|a|an|the|with|and|of|holding|on|at|by|my|our|is|am|are|from|to))+$/i, '').replace(/[\s,;:]+$/, '');
    if (head.split(/\s+/).length >= 7) return head;
  }
  return p.p.replace(/\{(\w+)\}/g, (_: string, k: string) => p.v?.[k]?.[0] ?? '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s/)[0];
}

/** "It asks the AI to create a cinematic still of you ..." from the first scene sentence. */
function action(p: Prompt, max: number, subject = 'It') {
  const group = p.lock === 'couple' || p.lock === 'eraCouple' || p.lock === 'family';
  let s = secondPerson(firstSentence(p), group).replace(/[.!?]+$/, '');
  const m = s.match(/^(Create|Show|Turn|Make|Place|Put|Transform|Restore|Remove|Replace|Improve|Convert|Edit|Fix|Brighten|Sharpen|Colourise|Add|Straighten|Crop|Generate|Design|Build|Give|Keep|Change|Clean|Open|Draw|Render|Imagine)\b\s*/);
  if (m) {
    s = s.slice(m[0].length);
    return `${subject} asks the AI to ${m[1].toLowerCase()} ${clip(s, max)}.`;
  }
  if (/^(A|An)\s/.test(s)) return `${subject} asks the AI for ${s.charAt(0).toLowerCase()}${clip(s, max).slice(1)}.`;
  return `${subject === 'It' ? 'The scene' : subject + ', the scene'}: ${clip(s, max)}.`;
}

const LOCK_LINE: Record<Prompt['lock'], string> = {
  single: 'Your face, skin tone, hairstyle and build are locked to your photo, so only the clothes, place and light change.',
  couple: 'Both faces, your height difference and your hairstyles are locked to your photo, so only the clothes, place and light change.',
  family: 'Every person in your group photo is counted and kept, with their own face and age, so nobody is added or lost.',
  era: 'Only your hair, clothes and surroundings follow the era; your own face is kept as it is.',
  eraCouple: 'Only your hair, clothes and surroundings follow the era; both faces are kept as they are.',
  fix: 'It edits your original photo rather than making a new one, and leaves faces and everything outside the edit untouched.',
  car: 'It edits your own car photo, keeping the model, angle and background, and changes only what the prompt names.',
};

const PHOTO_LINE: Record<Prompt['lock'], string> = {
  single: 'Upload one clear, front-facing photo of yourself.',
  couple: 'Upload one clear photo with both of you facing the camera.',
  family: 'Upload one clear photo with every face visible.',
  era: 'Upload one clear, front-facing photo of yourself.',
  eraCouple: 'Upload one clear photo with both of you facing the camera.',
  fix: 'Upload the photo you want repaired or changed.',
  car: 'Upload a clear photo of your car.',
};

/** Which options can be changed, with the first two choices as examples when they are short. */
function optionsLine(p: Prompt) {
  const entries = Object.entries(p.v ?? {});
  if (entries.length === 0) return '';
  const names = entries.map(([k]) => label(k).toLowerCase());
  const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0];
  const [k0, o0] = entries[0];
  const short = (o0 as string[]).slice(0, 2).map((o) => secondPerson(o.split(':')[0].split(/, | with /)[0].trim().replace(/[.,;:]+$/, ''), false));
  const ok = short.length === 2 && short.every((o) => o.split(/\s+/).length <= 6 && !/^(keep|colour|use|make)\b/i.test(o));
  return `Before you copy, change the ${list} from the dropdowns${ok ? `; the ${k0} can be ${short.join(' or ')}, among other choices` : ''}.`;
}

/** 60 to 100 words describing what the edit does, placed above the prompt text. */
export function whatItDoes(p: Prompt) {
  const parts = [action(p, 34, p.t), PHOTO_LINE[p.lock] + ' ' + LOCK_LINE[p.lock], optionsLine(p), p.tip ? `Tip: ${p.tip}` : ''];
  let text = parts.filter(Boolean).join(' ');
  // Too short: add what this collection is for. Too long: let the scene sentence shrink.
  if (words(text) < 60) text += ` It belongs to our ${p.collection.name} collection of free prompts for ChatGPT and Gemini, written to be pasted as it is.`;
  if (words(text) < 60) text += ' Run it again if the first result is slightly off, since each run gives a different version.';
  for (let max = 30; words(text) > 100 && max >= 12; max -= 3) {
    text = [action(p, max, p.t), PHOTO_LINE[p.lock] + ' ' + LOCK_LINE[p.lock], optionsLine(p)].filter(Boolean).join(' ');
  }
  return text;
}

/** Meta description of at most `max` characters that starts with the prompt name and its scene. */
export function metaFor(p: Prompt, max = 155) {
  const tail = ' Free for ChatGPT and Gemini.';
  const head = `${p.t} prompt: `;
  let a = action(p, 40);
  const room = max - head.length - tail.length;
  if (a.length > room) {
    const cut = a.slice(0, room - 1);
    const comma = cut.lastIndexOf(',');
    a = (comma > cut.length * 0.6 ? cut.slice(0, comma) : cut.slice(0, cut.lastIndexOf(' '))).replace(/[.,;:\s]+$/, '');
    a = a.replace(/(\s+(wearing|dressed in|in|a|an|the|with|and|of|on|at|by|to|for|or|from|into))+$/i, '') + '.';
  }
  return `${head}${a}${tail}`;
}
