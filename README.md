# photoeditingprompt.com

A static website of photo editing prompts for ChatGPT and Gemini.
Built with Astro and Tailwind CSS.

## Run it on your computer

You need Node.js 20 or newer (https://nodejs.org).

```
npm install      # once, downloads the tools
npm run dev      # opens the site at http://localhost:4321
npm run build    # makes the final site in the dist/ folder
```

## Add a new prompt

Open `src/data/prompts.ts` and add an entry at the TOP of the list (newest first):

```ts
{ s: 'holi-colour-splash-portrait',        // URL name, lowercase with dashes, must be unique
  t: 'Holi Colour Splash Portrait',        // title
  c: 'girls',                              // collection id from src/data/site.ts
  a: 'girl',                               // girl | boy | couple | family | any
  lock: 'single',                          // single | couple | family | era | eraCouple | fix
  p: 'Show me ... wearing {outfit} ...',   // the prompt; {outfit} becomes a dropdown
  v: { outfit: ['a white kurta', 'a yellow saree'] },   // dropdown options, first = default
},
```

You do NOT write the face-lock sentence. It is added automatically from `lock`
(see `src/lib/prompts.ts`).

## Add before / after pictures

Put images in `public/samples/`, named after the prompt's `s` value:

```
public/samples/<slug>-before.webp     the original photo
public/samples/<slug>-chatgpt.webp    the result from ChatGPT
public/samples/<slug>-gemini.webp     the result from Gemini
```

The site finds them automatically. With a before and an after image, the page
shows a before/after slider. `.jpg`, `.png` and `.avif` also work, but WebP at
about 1000 px wide keeps pages fast.

Only use photos you have the right to publish: your own AI-generated models,
or people who have agreed.

## Mark a prompt as tested

After you have run a prompt in BOTH ChatGPT and Gemini and added the pictures,
add `tested: true` to it. The green "Tested" badge then appears. Do not set it
before testing; the About page promises visitors what the badge means.

## Add a collection or festival

Open `src/data/site.ts` and add an entry to `COLLECTIONS`. A collection stays
hidden until at least one prompt uses its `id`.

Thirteen festivals are marked `hub: true`. They have 2 prompts each and share
the `/festivals/` page. When a festival has 8 or more prompts, give it its own
page: remove `hub: true`, set `path: 'festivals/<name>'`, and add `title`,
`desc` and `faqs` like the other collections.

## Languages

The site is in English plus 10 Indian languages: Hindi, Bengali, Marathi,
Telugu, Tamil, Gujarati, Kannada, Malayalam, Punjabi and Odia. All the
translated text is in `src/data/i18n.ts`. The prompts themselves stay in
English because ChatGPT and Gemini handle English prompts best.

The translations were written without a native review. Ask a native reader
of each language to check its section of `i18n.ts` before launch.

To add a language: add it to `LANGS`, then add its entries to `part`, `rows`
and `PATTERN` in the same file. To remove one, delete it from those four places.

## Sample pictures

See `SAMPLES.md` for how to make the before/after pictures.

## Before launch

- [ ] Replace the contact email in `src/data/site.ts`
- [ ] Read the Privacy Policy and Terms pages and adjust them (they are starting drafts, not legal advice)
- [ ] Update the Privacy Policy when you add Google Analytics or AdSense
- [ ] Have a native reader check each language in `src/data/i18n.ts` (and the Tamil intros in `src/data/site.ts`)
- [ ] Test every prompt and add sample pictures
- [ ] Deploy, then submit `https://photoeditingprompt.com/sitemap-index.xml` in Google Search Console

## Deploy (Cloudflare Pages, free)

1. Put this folder in a GitHub repository.
2. In Cloudflare Pages, create a project from that repository.
3. Build command: `npm run build`. Output folder: `dist`.
4. Add the custom domain `photoeditingprompt.com`.
