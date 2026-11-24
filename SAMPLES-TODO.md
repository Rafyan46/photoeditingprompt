# Sample images still to make (Birthday and Cinematic, added 25 Nov 2026)

For each prompt: open the prompt page on the site, tap Copy, upload the cast photo named below
into ChatGPT, paste, and save the result as `public/samples/<slug>-chatgpt.webp`.
The "before" photo is picked up automatically from the cast, so only the "after" image is needed.
Then run `npx tsx scripts/make-thumbs.ts`.

| Prompt slug | Upload this cast photo |
| --- | --- |
| birthday-candle-glow-portrait-girl | woman |
| birthday-pastel-balloon-arch-girl | woman |
| birthday-diya-flowers-saree-girl | woman |
| birthday-sparkler-night-boy | man |
| birthday-cake-cutting-rooftop-boy | man |
| birthday-confetti-burst-studio | woman |
| birthday-couple-surprise-cake | couple |
| birthday-family-cake-table-celebration | family |
| cinematic-rain-noir-street-boy | man |
| cinematic-neon-alley-night-portrait | woman |
| cinematic-golden-hour-desert-wide | man |
| cinematic-rainy-window-moody-girl | woman |
| cinematic-foggy-forest-film-still | woman |
| cinematic-railway-platform-couple | couple |
| cinematic-rooftop-teal-orange-skyline-boy | man |
| cinematic-candlelit-period-drama-girl | woman |
| cinematic-double-exposure-forest-portrait | man |
| cinematic-black-white-film-noir-portrait | man |

Not in the list: `birthday-kid-girl-princess-balloons` and `birthday-kid-boy-safari-party`.
These need a child reference photo that is not a real child's photo; make an AI child
character first, then save the result as `<slug>-before.webp` and `<slug>-chatgpt.webp`.
