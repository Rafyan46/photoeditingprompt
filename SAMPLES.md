# AUTOMATIC way (recommended): no sitting, no manual testing

1. Get a billing-enabled key at https://aistudio.google.com/apikey
2. In the VS Code terminal (Windows PowerShell):
   `$env:GEMINI_API_KEY="your-key"`
   `npm install`
   `npx tsx scripts/generate-samples.ts 5`   (trial: 5 prompts)
3. Open `public/samples/` and look at the pictures. Happy? Run it without the 5:
   `npx tsx scripts/generate-samples.ts`
4. It makes the 10 model photos once (saved in `scripts/cast/`), then a before + after
   picture for each prompt. Stop and re-run any time; it skips finished ones.
   If the free daily limit stops it, run it again the next day.
5. Free limits: it tries 3 Gemini image models in turn (`GEMINI_MODELS`, comma separated, to change the list).
   You can also give several keys from DIFFERENT Google projects: `$env:GEMINI_API_KEY="key1,key2"`.
   When one model or key is used up it switches to the next by itself. A model your key can't use is skipped.
6. Delete any bad picture (and its `-before` twin) and re-run to redo that one.

The rest of this file is the manual method, only if you prefer it.

---

# How to make the before / after pictures

Every prompt page can show a before/after slider. The pictures must come from
actually running the prompt, so visitors see what the prompt really does.

## Step 1: make your cast (once)

Do not use photos of real people. Make 7 "model" photos with AI and reuse them
across the site. Paste each prompt below into ChatGPT or Gemini and save the
result. These are your BEFORE photos.

Add this sentence to the end of every cast prompt:

> A fictional adult who does not resemble any real or famous person. Plain, everyday phone photo, natural skin texture, no retouching, no text.

1. **Arun (boy):** A casual phone selfie of a 25-year-old South Indian man with short black hair and a light stubble, wearing a plain grey t-shirt, standing in a living room in daylight, relaxed smile, looking at the camera.
2. **Kabir (boy):** A casual phone photo of a 30-year-old North Indian man with a neat beard and medium-length hair, wearing a plain navy shirt, standing on a balcony in daylight, looking at the camera.
3. **Meera (girl):** A casual phone selfie of a 24-year-old South Indian woman with long black hair, wearing a plain blue kurti, standing near a window in daylight, gentle smile, looking at the camera.
4. **Anjali (girl):** A casual phone photo of a 29-year-old Indian woman with shoulder-length hair and glasses, wearing a plain white top, sitting on a sofa in daylight, looking at the camera.
5. **Couple A:** A casual phone photo of an Indian couple in their late twenties standing side by side in a park in daylight, both in plain everyday clothes, both smiling at the camera, the man slightly taller.
6. **Couple B:** A casual phone photo of an Indian married couple in their thirties sitting together on a sofa at home, both in simple everyday clothes, both looking at the camera.
7. **Family:** A casual phone photo of an Indian family of five adults standing together in a living room: a couple in their fifties, their adult son and daughter in their twenties, and a grandmother in her seventies. Everyone in simple everyday clothes, everyone looking at the camera.

For the "Fix my photo" collection you also need problem photos:

8. **Old damaged photo:** A scan of a black-and-white Indian family studio portrait from the 1960s with scratches, a fold line, stains and faded corners.
9. **Blurry photo:** A slightly blurry, noisy, underexposed phone photo of a man standing in a dim room at night.
10. **Busy background:** A phone photo of a woman standing on a crowded street with strangers, wires and a parked scooter behind her.

Use the same cast photo for both tools so the comparison is fair.

## Step 2: run each prompt

For each prompt on the site:

1. Open the prompt page and tap **Copy prompt**.
2. In ChatGPT: upload the matching cast photo, paste, send. Save the result.
3. In Gemini: do the same in a new chat. Save the result.
4. If the face changed or the scene is wrong, note it. That prompt needs fixing before it gets the Tested badge.

Which cast photo to use: prompts for boys use Arun or Kabir, girls use Meera or
Anjali, couple prompts use Couple A or B, family prompts use Family.

## Step 3: add the pictures

Convert to WebP at about 1000 px wide (squoosh.app does this free), then name
them after the prompt's slug, which is the last part of its URL:

```
public/samples/<slug>-before.webp
public/samples/<slug>-chatgpt.webp
public/samples/<slug>-gemini.webp
```

Example for /prompt/holi-colour-splash-white-kurta/:

```
public/samples/holi-colour-splash-white-kurta-before.webp
public/samples/holi-colour-splash-white-kurta-chatgpt.webp
public/samples/holi-colour-splash-white-kurta-gemini.webp
```

Then add `tested: true` to that prompt in `src/data/prompts.ts`.

## How long it takes

About 10 minutes per prompt for both tools, so roughly 25 hours for all 150.
Do the nearest festivals first: Christmas, New Year, Pongal.
