import { ALL } from '../lib/prompts';

// Full prompt text for the Copy buttons on cards. Loaded only when someone taps Copy.
export function GET() {
  const out: Record<string, string> = {};
  for (const p of ALL) out[p.s] = p.text;
  return new Response(JSON.stringify(out), { headers: { 'Content-Type': 'application/json' } });
}
