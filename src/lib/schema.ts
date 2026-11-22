import { SITE, type Collection } from '../data/site';
import type { Prompt } from './prompts';
const abs = (p: string) => new URL(p, SITE.url).href;

export const breadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })),
});
export const itemList = (name: string, prompts: Prompt[]) => ({
  '@context': 'https://schema.org', '@type': 'ItemList', name, numberOfItems: prompts.length,
  itemListElement: prompts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.t, url: abs(p.url) })),
});
export const faqPage = (c: Collection) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: (c.faqs ?? []).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
export const article = (p: Prompt, desc: string) => ({
  '@context': 'https://schema.org', '@type': 'Article', headline: p.t, description: desc,
  mainEntityOfPage: abs(p.url), inLanguage: 'en-IN', dateModified: new Date().toISOString().slice(0, 10),
  author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/icon-512.png` } },
  ...(p.sample.chatgpt || p.sample.gemini ? { image: abs((p.sample.chatgpt ?? p.sample.gemini)!) } : {}),
});
