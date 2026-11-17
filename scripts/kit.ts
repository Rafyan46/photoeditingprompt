import fs from 'node:fs';
import { ALL } from '../src/lib/prompts';
const pick: [string, string][] = [
  ['christmas', 'meera'], ['pongal', 'arun'], ['new-year', 'meera'], ['couple', 'coupleA'], ['fix', 'old'],
];
let out = '# 5-sample kit (free, Gemini app)\n\nCast prompts are in SAMPLES.md (Arun, Meera, Couple A, and #8 Old damaged photo).\n\n';
for (const [c] of pick) {
  const p = c === 'fix' ? ALL.find((x) => x.s === 'restore-old-damaged-family-photo')! : ALL.find((x) => x.c === c)!;
  const who = pick.find((x) => x[0] === c)![1];
  out += `## ${p.t}\n- slug: \`${p.s}\`\n- before photo to use: **${who}**\n- paste this prompt:\n\n\`\`\`\n${p.text}\n\`\`\`\n\n- then run: \`npx tsx scripts/add-sample.ts ${p.s} before.png after.png\`\n\n`;
}
fs.writeFileSync('SAMPLE-KIT.md', out);
console.log(out);
