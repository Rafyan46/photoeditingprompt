// Site-wide settings, collections and translations.
// To add a collection: add an entry to COLLECTIONS, then add prompts that use its `id`.
// A collection only appears on the site once it has at least one prompt.

export const SITE_UPDATED = '27 Nov 2026'; // change this when new prompts or copy go live

export const SITE = {
  name: 'PhotoEditingPrompt.com',
  domain: 'photoeditingprompt.com',
  url: 'https://photoeditingprompt.com',
  email: 'contact@photoeditingprompt.com',
  tagline: 'Copy-paste photo editing prompts for ChatGPT and Gemini',
};

import { SEO_COPY } from './seo-copy';

export { T, LANGS, OTHER_LANGS, NAMES, PATTERN, type Lang } from './i18n';

export interface Collection {
  id: string;
  path: string; // URL path without leading/trailing slash
  festival?: boolean;
  /** hub: true = no page of its own yet; shown as a section of /festivals/ */
  hub?: boolean;
  when?: string;
  emoji: string;
  tint: string; // card background gradient
  name: string;
  nameTa?: string;
  h1: string;
  h1Ta?: string;
  title?: string; // <title>, keep under 60 characters
  desc?: string; // meta description, keep under 155 characters
  intro: string;
  introTa?: string;
  faqs?: { q: string; a: string }[];
  /** ids of related categories, shown as links on the page */
  related?: string[];
}

const FACE_FAQ = {
  q: 'Will the edited photo still look like me?',
  a: 'Every prompt here starts with a face-lock line that tells the AI to keep your face, skin tone and features unchanged. If the face still drifts, upload a clearer, front-facing photo and run the prompt again.',
};
const TOOL_FAQ = {
  q: 'Do these prompts work in both ChatGPT and Gemini?',
  a: 'Yes. They are written in plain language that both ChatGPT and Google Gemini understand. Upload your photo first, then paste the prompt.',
};
const FREE_FAQ = {
  q: 'Are these prompts free?',
  a: 'Yes. Every prompt on this site is free to copy and use. You only need a ChatGPT or Gemini account, and both have free plans that can edit photos.',
};

const BASE_COLLECTIONS: Collection[] = [
  {
    id: 'viral', path: 'viral-photo-prompts', emoji: '🔥',
    tint: 'linear-gradient(135deg,#ffcfb8,#ffd1e0)',
    name: 'Viral now', nameTa: 'இப்போது வைரல்',
    h1: 'Viral AI Photo Prompts Right Now',
    title: 'Viral AI Photo Prompts Now: ChatGPT & Gemini',
    desc: 'The AI photo trends going viral right now, as free copy-paste prompts: petrol pump bike, glow portrait, 3-panel collage, action figure and more.',
    intro: 'These are the edits filling Instagram and WhatsApp status right now: the midnight petrol pump bike shot, the backlit glow portrait, the harsh-sunlight three-panel collage, the action figure in a box, and more. Each trend is rewritten here as an original, detailed prompt that keeps your real face. This list was last checked on 16 November 2026 and is refreshed as trends change.',
    faqs: [
      { q: 'How do you pick the trends?', a: 'We check what Indian creators and news sites are sharing each week, then write our own prompt for each look and test it. We do not copy other sites\' prompts.' },
      { q: 'Why is there no cartoon-studio or film-character style here?', a: 'Styles that copy a named studio, film or character are left out. The toy, chibi and poster prompts here are original looks that do not use anyone else\'s characters.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'game-art', path: 'open-world-game-art-prompts', emoji: '🎮',
    tint: 'linear-gradient(135deg,#ffd6a5,#ff9ecb)',
    name: 'Open-world game art', 
    h1: 'Open-World Game Art Photo Prompts',
    title: 'Open-World Game Art Prompts: Turn Your Photo Into Game Art',
    desc: 'Free ChatGPT and Gemini prompts that turn your photo into an original open-world, neon-city game poster style. Keeps your face. Not affiliated with any game studio.',
    intro: 'Turn yourself into the hero of an original open-world crime-city game poster: sunset beaches, neon streets, loading-screen art and character cards. These prompts are our own style and are not affiliated with, or endorsed by, Rockstar Games or any game studio; they use no logos, names or artwork from any game. Pick the outfit and setting, copy, and paste with your photo.',
    faqs: [
      { q: 'Is this affiliated with GTA or Rockstar Games?', a: 'No. These prompts describe a general stylised open-world game-art look in our own words. They contain no studio logos, titles or copied artwork and are not affiliated with or endorsed by any game company.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'movies', path: 'movie-star-photo-prompts', emoji: '🎬',
    tint: 'linear-gradient(135deg,#ffb4a2,#b5838d)',
    name: 'Movie stars', nameTa: 'சினிமா ஸ்டார்',
    h1: 'Movie Star Photo Prompts: Be the Hero of Your Own Film',
    title: 'Movie Star Photo Prompts: Bollywood & South Looks',
    desc: 'Free ChatGPT and Gemini prompts that make you the hero of your own film: Bollywood poster, mass-hero entry, 90s film star and red carpet. Keeps your face.',
    intro: 'Be the star of your own film. These prompts turn your photo into a Bollywood-style poster, a South-cinema mass-hero entry, a 90s film-star portrait, a red-carpet premiere shot or a director-on-set frame. They describe the look of the genre in our own words, so they never copy a real actor, film or studio, and your face stays yours. Pick the outfit and setting, copy, and paste with your photo.',
    faqs: [
      { q: 'Can I make myself look like a particular film star?', a: 'No. These prompts create a film-star style (the lighting, costume, colour and poster layout of a genre) on your own face. They never use a real actor\'s name or likeness, which also makes them work more reliably in ChatGPT and Gemini, since both can refuse prompts about real people.' },
      { q: 'Do the prompts use real film posters or titles?', a: 'No. Any text on a poster is a made-up title or a blank. We do not use real film names, studio logos or artwork.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'couple', path: 'couple-photo-prompts', emoji: '💑',
    tint: 'linear-gradient(135deg,#ffd6e0,#ffe9c9)',
    name: 'Couple', nameTa: 'ஜோடி',
    h1: 'AI Couple Photo Prompts (Romantic, Copy & Paste)', h1Ta: 'ஜோடி புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Couple Prompt for ChatGPT Photo Editing (Copy & Paste)',
    desc: 'Free AI couple photo prompts for ChatGPT and Gemini: romantic, pre-wedding, cinematic and travel edits that keep both faces. Copy and paste.',
    intro: 'Couple edits are the hardest for AI, because it has to keep two faces right at once. Each prompt below opens with a line that locks both faces, skin tones and your height difference before it describes the scene. Upload one photo of you together, or one photo each, pick your outfit and setting from the dropdowns, and copy.',
    introTa: 'ஜோடி எடிட்கள் AI-க்கு கடினமானவை, ஏனெனில் இரண்டு முகங்களையும் ஒரே நேரத்தில் சரியாக வைத்திருக்க வேண்டும். கீழே உள்ள ஒவ்வொரு ப்ராம்ப்டும் முதலில் இருவரின் முகம், நிறம், உயர வித்தியாசத்தை மாற்றாமல் வைக்கச் சொல்கிறது. உங்கள் புகைப்படத்தைப் பதிவேற்றி, உடை மற்றும் இடத்தைத் தேர்ந்தெடுத்து, நகலெடுக்கவும்.',
    faqs: [
      { q: 'What is the best AI prompt for a couple photo?', a: 'The best couple prompt locks both faces first, then describes one clear scene: a romantic golden-hour walk, a pre-wedding shoot, a travel frame or a cinematic night street. Every prompt on this page follows that order and is free to copy for ChatGPT or Gemini.' },
      { q: 'What is a good romantic couple prompt for ChatGPT or Gemini?', a: 'A romantic couple prompt describes one tender scene, such as a rain umbrella, a sunset walk or a candlelit dinner, and keeps both faces unchanged. Many people search for it as a lovers prompt or a prompt for a romantic couple scene (often typed "scene" as "seen"). All of those are covered by the prompts on this page.' },
      { q: 'Is there a Gemini couple prompt I can copy and paste?', a: 'Yes. Every couple prompt on this page works in Gemini and in ChatGPT. Upload one clear photo of the two of you, paste the prompt, and send. Use the Open in Gemini button on any prompt.' },
      { q: 'Are there prompts for husband and wife photos?', a: 'Yes. Pick the wedding, anniversary, festival or travel prompts here and keep the outfit dropdowns for husband and wife. All of them lock both faces first, so you stay recognisable.' },
      { q: 'What are the trending couple prompts right now?', a: 'The newest couple looks are at the top of this page: golden-hour walks, rainy umbrella scenes, pre-wedding shoots and cinematic night streets. See also the Trending page for the viral couple edits.' },
      { q: 'Should I upload one photo or two?', a: 'Either works. One clear photo of both of you gives the most natural result. If you use two separate photos, add a line saying who is on the left and who is on the right.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'eighties', path: '1980s-photo-prompts', emoji: '📼',
    tint: 'linear-gradient(135deg,#ffe2b8,#f7c59f)',
    name: '1980s look', nameTa: '1980கள் லுக்',
    h1: '1980s Photo Prompts', h1Ta: '1980கள் புகைப்பட ப்ராம்ப்ட்கள்',
    title: '1980s Photo Prompt for ChatGPT: Free 80s Trend Look',
    desc: 'Free 1980s photo prompts for ChatGPT and Gemini: the 80s look and trend prompt, retro Indian cinema and faded film prints. Keeps your real face.',
    intro: 'A good 80s edit is about the film, not only the clothes. These prompts ask for faded colour, soft grain and the slightly warm print look of a 1980s photo lab, and then change your outfit and hair to match the decade. Your face stays yours; only the era changes.',
    introTa: 'நல்ல 80கள் எடிட் என்பது உடை மட்டுமல்ல, அந்தக் கால ஃபிலிம் தோற்றமும் தான். இந்த ப்ராம்ப்ட்கள் மங்கிய நிறம், மென்மையான கிரெயின், பழைய புகைப்பட அச்சின் தோற்றத்தைக் கேட்கின்றன. உங்கள் முகம் மாறாது; காலம் மட்டும் மாறும்.',
    faqs: [
      { q: 'What is the 1980 prompt or 80s look prompt that is trending?', a: 'It is a photo prompt that turns your picture into a 1980s print: faded colour, grain, retro hair and clothes, with your own face kept. The trending 80s prompts on this page also work as a prompt for an 80s photo in Gemini, and each is free to copy and paste.' },
      { q: 'How do I see what I would look like in the 80s with ChatGPT?', a: 'Upload one clear photo, paste any prompt on this page and send. Each one changes your hair, outfit and photo texture to a 1980s look, and keeps your face. This is the same 80s trend going around Instagram.' },
      { q: 'Why does my 80s photo look like a modern photo in costume?', a: 'The prompt is missing the film look. Make sure it asks for faded colour, visible grain and a printed-photo texture, as the prompts on this page do.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'boys', path: 'photo-prompts-for-boys', emoji: '🧑',
    tint: 'linear-gradient(135deg,#cfe4ff,#d9d6ff)',
    name: 'Boys', nameTa: 'ஆண்கள்',
    h1: 'Photo Prompts for Boys & Men', h1Ta: 'ஆண்களுக்கான புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Boys Prompt for Gemini & ChatGPT: AI Photo Prompts for Men',
    desc: 'Free Gemini and ChatGPT prompts for boys and men: bike, street style, formal and cinematic portraits that keep your real face. Copy and paste.',
    intro: 'Portrait prompts for boys and men: bikes, street style, formal looks and cinematic lighting. None of them describe a particular face, beard or hairstyle, so they work on your photo as it is. Change the outfit and location from the dropdowns before you copy.',
    introTa: 'ஆண்களுக்கான போர்ட்ரெய்ட் ப்ராம்ப்ட்கள்: பைக், ஸ்ட்ரீட் ஸ்டைல், ஃபார்மல் மற்றும் சினிமாட்டிக் லுக். இவை எந்த குறிப்பிட்ட முகத்தையும் தாடியையும் விவரிக்காது, எனவே உங்கள் புகைப்படத்தில் அப்படியே வேலை செய்யும்.',
    faqs: [
      { q: 'What is the best AI prompt for men?', a: 'The best prompt for men names the outfit, the place, the camera angle and the light, and tells the AI to keep your real face, beard and hairstyle. Every prompt on this page is a free prompt for men that you can copy into ChatGPT or Gemini, with a photo prompt for men in each style: bike, street, formal and cinematic.' },
      { q: 'What is a good Gemini AI prompt for a boy photo?', a: 'A good Gemini prompt for boys names the outfit, the location, the camera angle and the light, and tells the AI to keep your real face. Pick a style from this page, upload one clear photo to Gemini, paste and send.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'girls', path: 'photo-prompts-for-girls', emoji: '👩',
    tint: 'linear-gradient(135deg,#ffd9ec,#e6d6ff)',
    name: 'Girls', nameTa: 'பெண்கள்',
    h1: 'Photo Prompts for Girls', h1Ta: 'பெண்களுக்கான புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'AI Photo Prompts for Girls & Women: ChatGPT, Gemini',
    desc: 'Free AI prompts for girls and women: saree, aesthetic, cafe and cinematic portraits for ChatGPT and Gemini that keep your real face. Copy and paste.',
    intro: 'Portrait prompts for girls and women: saree looks, soft aesthetic frames, cafe and golden-hour portraits. Each one keeps your own face and skin tone and avoids the over-smoothed "AI skin" look. Pick the outfit colour and setting, then copy.',
    introTa: 'பெண்களுக்கான போர்ட்ரெய்ட் ப்ராம்ப்ட்கள்: புடவை லுக், அழகியல் ஃப்ரேம்கள், கஃபே மற்றும் கோல்டன் ஹவர் படங்கள். ஒவ்வொன்றும் உங்கள் முகத்தையும் நிறத்தையும் மாற்றாமல் வைத்திருக்கும்.',
    faqs: [
      { q: 'Which ChatGPT photo prompts work best for women?', a: 'Prompts that name the light, the outfit and the setting work best, and that keep your own skin texture and face. The saree, cafe and golden-hour prompts on this page do that, and each one is free to copy for ChatGPT or Gemini.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'aesthetic', path: 'aesthetic-photo-prompts', emoji: '🌅',
    tint: 'linear-gradient(135deg,#ffe3c2,#ffd6e8)',
    name: 'Aesthetic', nameTa: 'அழகியல்',
    h1: 'Aesthetic Photo Prompts',
    title: 'Aesthetic Photo Prompts for ChatGPT & Gemini',
    desc: 'Free aesthetic photo prompts for ChatGPT and Gemini: golden hour, window shadows, neon glow, rainy window and cosy cafe looks that keep your real face.',
    intro: 'Aesthetic edits live or die on light. Each prompt here names the light source, where it falls on your face, the lens and the colour grade, so the result looks like a planned photograph and not a filter. Pick the outfit and details from the dropdowns, copy, and paste with a clear photo of yourself.',
    faqs: [
      { q: 'What is an aesthetic prompt?', a: 'An aesthetic prompt describes a mood and a look, such as golden hour, soft window shadows or neon glow, instead of one fixed scene. Pick one here, change the outfit in the dropdown, and copy it into ChatGPT or Gemini with your photo.' },
      { q: 'What is a cinematic photography prompt?', a: 'A cinematic prompt asks for film-style light, a wide lens, a colour grade and a still-from-a-movie mood. The golden-hour, neon and rainy window prompts on this page are cinematic image prompts you can copy for ChatGPT or Gemini.' },
      { q: 'Which photo should I upload for aesthetic edits?', a: 'A sharp, front-facing photo in soft daylight works best. Avoid heavy filters and sunglasses, because the AI needs to see your real skin tone and eyes.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'collage', path: 'photo-collage-prompts', emoji: '🖼️',
    tint: 'linear-gradient(135deg,#d6e8ff,#e9dcff)',
    name: 'Collage', nameTa: 'கொலாஜ்',
    h1: 'Photo Collage Prompts',
    title: 'Photo Collage Prompts for ChatGPT & Gemini',
    desc: 'Free photo collage prompts for ChatGPT and Gemini: mood grids, film contact sheets, polaroid walls, photobooth strips and lookbooks from one photo.',
    intro: 'One photo in, a whole collage out. These prompts ask for a single image laid out as a grid, film strip, polaroid wall or magazine spread, with you in every frame. Each one says exactly how many frames, what happens in each, and to keep your face the same person throughout.',
    faqs: [
      { q: 'My face looks different in some frames. How do I fix it?', a: 'Collages are harder for AI because your face is drawn several times. Run the prompt again, or lower the number of frames in the text. Fewer, larger frames keep the face more accurate.' },
      { q: 'Can I add text or dates to the collage?', a: 'The prompts ask for no text because AI often misspells it. Add names and dates afterwards in any photo editor.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'family', path: 'family-group-photo-prompts', emoji: '👨‍👩‍👧‍👦',
    tint: 'linear-gradient(135deg,#ffe9c9,#d6f5e3)',
    name: 'Family & group', nameTa: 'குடும்பம் & குழு',
    h1: 'Family and Group Photo Prompts', 
    title: 'Family & Group Photo Prompts for ChatGPT & Gemini',
    desc: 'Free family and group photo prompts for ChatGPT and Gemini. Three-generation, festival, wedding, friends and college group edits that keep every face.',
    intro: 'Group photos are the hardest edit, because the AI must keep every face, age and height right at once. Each prompt here starts with a line that locks every person and tells the AI not to add, remove or merge anyone. Upload one clear group photo where all faces are visible, pick the outfits from the dropdown, then copy.',
    faqs: [
      { q: 'What is a good family prompt for Gemini AI?', a: 'A good family prompt counts every person in your photo first, keeps each face, age and height, and then describes one clear scene. The prompts on this page do that and work in Gemini and ChatGPT. Upload one sharp group photo and paste.' },
      { q: 'How many people can be in the photo?', a: 'Any number. The prompts tell the AI to count everyone in your photo and keep the same people. Very large groups can blur faces at the edges, so use a sharp photo taken a little closer, or edit the group in two smaller batches.' },
      { q: 'One face keeps changing. What should I do?', a: 'Use a higher-resolution photo where that person is clearly visible and facing the camera, then run the prompt again. Adding "keep the person on the far left exactly as in the photo" can help.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'supercars', path: 'supercar-photo-prompts', emoji: '🏎️',
    tint: 'linear-gradient(135deg,#ffd1d1,#ffe9b8)',
    name: 'Supercars', nameTa: 'சூப்பர்கார்கள்',
    h1: 'Supercar Photo Prompts With Characters',
    title: 'Supercar Photo Prompts for ChatGPT & Gemini',
    desc: 'Free supercar photo prompts for ChatGPT and Gemini. Pick a character like The Boss or The Drifter and a Lamborghini or Ferrari. Keeps your face.',
    intro: 'Put yourself next to a supercar, as a named character. Every prompt here is a small story: The Midnight Racer, The Billionaire, The Drifter, The Boss and more. Choose the car and your outfit from the dropdowns, copy, and upload your photo. Your face and body stay exactly as they are; only the scene changes.',
    faqs: [
      { q: 'Can I change the car?', a: 'Yes. Every prompt has a car dropdown with several supercars. You can also edit the copied text and type any car you like.' },
      { q: 'Why is the number plate blurred or blank?', a: 'The prompts ask for an unreadable plate so the image does not show a real registration. Keep that line if you plan to share the picture.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'car-poses', path: 'car-photo-prompts-for-boys', emoji: '🚙',
    tint: 'linear-gradient(135deg,#d9d9d9,#ffe1c2)',
    name: 'Car poses for boys', nameTa: 'கார் போஸ்',
    h1: 'Car Photo Prompts for Boys',
    title: 'Car Prompt for Boys: Thar, SUV & Vintage Photo Edits',
    desc: 'Free car prompts for boys for ChatGPT and Gemini: Thar bonnet sit, SUV phone pose, vintage car lean, black and white and sunset horse shots. Keeps your face.',
    intro: 'Stand beside your favourite SUV and look like a cover shot. These car photo prompts for boys cover a Thar bonnet sit, a black-and-white SUV pose, a vintage car lean, a rainy night fuel-station portrait and a sunset shot with a horse. Pick the car and your outfit from the dropdowns, copy, and paste with your photo. Your face stays yours; only the scene changes.',
    faqs: [
      { q: 'Can I use my own car?', a: 'Yes. Upload a photo of yourself, change the car in the dropdown or type your own car\'s model into the copied text, and keep the line about the number plate not being readable.' },
      { q: 'Which camera angle looks best?', a: 'Low angles make the car look big and you look tall. Each prompt already names its camera angle, so keep that sentence and the pose will match the picture.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'genz', path: 'gen-z-photo-prompts', emoji: '✨',
    tint: 'linear-gradient(135deg,#e6d6ff,#c9f2ff)',
    name: 'Gen Z style', nameTa: 'ஜென் Z ஸ்டைல்',
    h1: 'Gen Z Style Photo Prompts',
    title: 'Gen Z Photo Prompts: Flash, Y2K, Coquette',
    desc: 'Free Gen Z photo prompts for ChatGPT and Gemini: flash digicam, Y2K mirror selfie, coquette, streetwear, old money and dark academia. Keeps your face.',
    intro: 'The looks that fill your feed, as prompts: harsh-flash digicam, Y2K chrome mirror selfies, coquette bows, streetwear, quiet luxury and dark academia. Each one keeps your own face and skin texture and only changes the style, outfit and setting. Pick the outfit from the dropdown, copy, and paste with your photo.',
    faqs: [
      { q: 'How do I get the grainy flash look?', a: 'Keep the flash, grain and "slightly blown highlights" lines in the prompt. If the image looks too clean, run it again and add the words "more noise and harsher flash".' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'stylish', path: 'stylish-portrait-prompts', emoji: '🕶️',
    tint: 'linear-gradient(135deg,#d9d9e8,#f0d4d4)',
    name: 'Stylish Portraits', nameTa: 'ஸ்டைலிஷ்',
    h1: 'Stylish Portrait Prompts for ChatGPT & Gemini',
    title: 'Stylish Portrait Prompts: Black and White, Sunglasses, Motion Blur',
    desc: 'Free stylish portrait prompts for ChatGPT and Gemini: black and white sunglasses, red rim light, motion blur, misty forest, car window and New Year 2027 looks. Keeps your face.',
    intro: 'These stylish portrait prompts are for the moody, fashion-style photos you see on Instagram: black and white studio shots, red rim light, long-exposure motion blur, a misty forest walk and a lakeside summer look. Each prompt names the light, the lens and the colour grade and keeps your own face, so you can paste it into ChatGPT or Gemini with one clear photo.',
  },
  {
    id: 'cinematic', path: 'cinematic-photo-prompts', emoji: '🎞️',
    tint: 'linear-gradient(135deg,#c9d6ff,#ffd9b8)',
    name: 'Cinematic', nameTa: 'சினிமாட்டிக்',
    h1: 'Cinematic Photo Prompts for ChatGPT & Gemini',
    title: 'Cinematic Photo Prompt: AI Film-Look Portraits',
    desc: 'Free cinematic photo prompts for ChatGPT and Gemini: rainy noir street, neon alley, golden hour, double exposure and film-still portraits. Keeps your face.',
    intro: 'Turn one photo into a still from a film. These cinematic image prompts name the lens, the light, the colour grade and the film frame, which is what separates a movie look from a filter. You will find a rainy noir street, a neon alley, a golden-hour desert, a railway platform for couples, a candlelit period portrait, a double exposure and a black and white film noir. None uses a real film, actor or studio. Pick the outfit and setting, copy, and paste with your photo.',
    faqs: [
      { q: 'What is a cinematic photo prompt?', a: 'A cinematic photo prompt describes a photo like a film frame: a wide or anamorphic lens, one strong light source, a colour grade such as teal and orange, a little grain, and a mood. Every prompt on this page is written that way for ChatGPT and Gemini.' },
      { q: 'How do I get a cinematic image from my own photo?', a: 'Upload one clear, front-facing photo, paste the prompt, and send. The prompt asks the AI to keep your real face, then rebuilds the lighting and background around you in a film style.' },
      { q: 'Do these prompts copy a real film or actor?', a: 'No. They describe genres of film light and colour in our own words, with no film titles, actors, studios or logos, so they also work more reliably in ChatGPT and Gemini.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'birthday', path: 'birthday-ai-photo-prompts', emoji: '🎂',
    tint: 'linear-gradient(135deg,#ffe0f0,#fff1c9)',
    name: 'Birthday', nameTa: 'பிறந்தநாள்',
    h1: 'Birthday AI Photo Prompts for ChatGPT & Gemini',
    title: 'Birthday Prompt for ChatGPT: AI Birthday Photoshoot',
    desc: 'Free birthday photo prompts for ChatGPT and Gemini: cake and candle glow, balloon arch, sparklers, couple surprise, family and kids. Keeps your face.',
    intro: 'Make your own birthday photoshoot from one photo. These birthday prompts for ChatGPT and Gemini cover a candle-glow cake portrait, a balloon arch, a saree and diya look, a sparkler night, a couple surprise, a family cake table and two first-birthday-style shoots for kids. Each one keeps the real faces, and none puts letters or numbers on cakes or balloons, which AI often gets wrong. Pick the cake and outfit from the dropdowns, copy, and paste with your photo.',
    faqs: [
      { q: 'What is the best birthday prompt for ChatGPT?', a: 'A good birthday prompt names the light (candles, string lights or daylight), the cake, the outfit and the camera framing, and tells the AI to keep your real face. Every prompt on this page follows that pattern and is free to copy for ChatGPT or Gemini.' },
      { q: 'Can I make a birthday photo of my child?', a: 'Yes. Use the little girl or little boy prompts, upload one clear, front-facing photo of your child, and keep the face-lock line. The prompts ask the AI to keep the child\'s face, age and size as they are.' },
      { q: 'Why is there no Happy Birthday text on the cake or banner?', a: 'AI image tools often misspell words or draw wrong numbers. The prompts leave lettering out, so you can add a name, age or Happy Birthday message afterwards in any photo editor.' },
      FACE_FAQ, TOOL_FAQ, FREE_FAQ,
    ],
  },
  {
    id: 'fix', path: 'fix-photo-prompts', emoji: '🛠️',
    tint: 'linear-gradient(135deg,#d6f5e3,#cfeeff)',
    name: 'Fix my photo', nameTa: 'புகைப்படத்தைச் சரிசெய்',
    h1: 'Prompts to Fix and Improve a Photo', h1Ta: 'புகைப்படத்தைச் சரிசெய்யும் ப்ராம்ப்ட்கள்',
    title: 'Photo Fix Prompts: Restore, Enhance, Change Background',
    desc: 'Free prompts to restore old photos, sharpen blurry ones, change the background and make passport or LinkedIn photos with ChatGPT and Gemini.',
    intro: 'Practical edits you need all year: restore an old family photo, sharpen a blurry one, swap the background, or turn a selfie into a passport or LinkedIn photo. These prompts tell the AI to repair the photo and leave the people alone.',
    introTa: 'ஆண்டு முழுவதும் தேவைப்படும் எடிட்கள்: பழைய குடும்பப் புகைப்படத்தை மீட்டெடுப்பது, மங்கலான படத்தைத் தெளிவாக்குவது, பின்னணியை மாற்றுவது, பாஸ்போர்ட் அல்லது LinkedIn புகைப்படம் உருவாக்குவது.',
    faqs: [
      { q: 'Can AI restore a very damaged old photo?', a: 'It can remove scratches, fix fading and add colour. Where a face is badly damaged the AI has to guess, so compare the result with the original and with family members who knew the person.' },
      { q: 'Can I use an AI-made passport photo for an official application?', a: 'Rules differ by country and office, and many do not accept edited faces. Use these prompts for the background and lighting only, and check the official photo rules before you submit.' },
      TOOL_FAQ,
    ],
  },
  {
    id: 'christmas', path: 'festivals/christmas', festival: true, emoji: '🎄',
    tint: 'linear-gradient(135deg,#d7f0dc,#ffd9d6)',
    name: 'Christmas', nameTa: 'கிறிஸ்துமஸ்',
    h1: 'Christmas Photo Prompts', h1Ta: 'கிறிஸ்துமஸ் புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Christmas AI Photo Prompts for ChatGPT & Gemini',
    desc: 'Free Christmas AI photo prompts for ChatGPT and Gemini. Tree, lights, church and family frames for boys, girls and couples. Copy and paste.',
    intro: 'Christmas frames for your own photo: fairy lights, a decorated tree, midnight mass and cosy family portraits. The prompts suit Indian homes and churches as well as snowy scenes, and each one keeps your face unchanged.',
    introTa: 'உங்கள் புகைப்படத்திற்கான கிறிஸ்துமஸ் ஃப்ரேம்கள்: விளக்குகள், அலங்கரிக்கப்பட்ட மரம், நள்ளிரவு ஆராதனை மற்றும் குடும்பப் படங்கள். ஒவ்வொரு ப்ராம்ப்டும் உங்கள் முகத்தை மாற்றாமல் வைத்திருக்கும்.',
    faqs: [FACE_FAQ, TOOL_FAQ, FREE_FAQ],
  },
  {
    id: 'new-year', path: 'festivals/new-year', festival: true, emoji: '🎆',
    tint: 'linear-gradient(135deg,#d9dcff,#ffe7b8)',
    name: 'New Year', nameTa: 'புத்தாண்டு',
    h1: 'New Year 2027 Photo Prompts', h1Ta: 'புத்தாண்டு 2027 புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'New Year 2027 AI Photo Prompts for ChatGPT & Gemini',
    desc: 'Free New Year 2027 AI photo prompts for ChatGPT and Gemini. Fireworks, rooftop, party and "Happy New Year" frames. Copy and paste.',
    intro: 'Welcome 2027 with a photo that looks like it was taken at the best party in town. Rooftop fireworks, sparklers, balloons and clean "Happy New Year 2027" frames for status and stories.',
    introTa: '2027-ஐ வரவேற்க சிறந்த புகைப்படங்கள்: மாடியில் வாணவேடிக்கை, மத்தாப்பு, பலூன்கள் மற்றும் ஸ்டேட்டஸுக்கான "Happy New Year 2027" ஃப்ரேம்கள்.',
    faqs: [
      { q: 'How do I get the text "2027" to appear correctly?', a: 'Put the exact text in quotation marks in the prompt, as the prompts here do, and ask for it once. If the numbers come out wrong, run the prompt again; text is the part AI most often gets wrong.' },
      FACE_FAQ, TOOL_FAQ,
    ],
  },
  {
    id: 'pongal', path: 'festivals/pongal', festival: true, emoji: '🌾',
    tint: 'linear-gradient(135deg,#fff0b8,#ffd9b0)',
    name: 'Pongal & Sankranti', nameTa: 'பொங்கல்',
    h1: 'Pongal and Sankranti Photo Prompts', h1Ta: 'பொங்கல் புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Pongal & Sankranti AI Photo Prompts (ChatGPT, Gemini)',
    desc: 'Free Pongal, Makar Sankranti and Lohri AI photo prompts for ChatGPT and Gemini. Kolam, pongal pot, kites and bonfire frames. Copy and paste.',
    intro: 'Harvest festival frames for January: the pongal pot boiling over, kolam at the doorstep, sugarcane, kites for Sankranti and the Lohri bonfire. Traditional dress is set in the dropdowns, so choose veshti, saree, half-saree or kurta before you copy.',
    introTa: 'தை மாத அறுவடைத் திருநாளுக்கான ஃப்ரேம்கள்: பொங்கும் பொங்கல் பானை, வாசலில் கோலம், கரும்பு, சங்கராந்தி பட்டம், லோஹ்ரி நெருப்பு. வேட்டி, புடவை, தாவணி அல்லது குர்தாவைத் தேர்ந்தெடுத்து நகலெடுக்கவும்.',
    faqs: [FACE_FAQ, TOOL_FAQ, FREE_FAQ],
  },
  {
    id: 'wedding', path: 'wedding-photo-prompts', emoji: '💍',
    tint: 'linear-gradient(135deg,#ffe3c2,#ffd0d0)',
    name: 'Wedding', nameTa: 'திருமணம்',
    h1: 'Wedding and Pre-Wedding Photo Prompts', h1Ta: 'திருமண புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Wedding & Pre-Wedding AI Photo Prompts',
    desc: 'Free wedding and pre-wedding AI photo prompts for ChatGPT and Gemini. Haldi, mehndi, bride, groom and couple frames. Copy and paste.',
    intro: 'Haldi, mehndi, the wedding day and the pre-wedding shoot, as frames for your own photos. Bride, groom and couple prompts all lock your faces first, then change the outfits, jewellery and setting. Choose the outfit and location, then copy.',
    introTa: 'ஹல்தி, மெஹந்தி, திருமண நாள் மற்றும் ப்ரீ-வெட்டிங் படங்களுக்கான ப்ராம்ப்ட்கள். ஒவ்வொன்றும் முதலில் உங்கள் முகங்களை மாற்றாமல் வைத்து, பின்னர் உடை, நகை, இடத்தை மாற்றும்.',
    faqs: [FACE_FAQ, TOOL_FAQ, FREE_FAQ],
  },
  {
    id: 'valentines', path: 'festivals/valentines-day', festival: true, emoji: '❤️',
    tint: 'linear-gradient(135deg,#ffd0d8,#ffe1ee)',
    name: "Valentine's Day", nameTa: 'காதலர் தினம்',
    h1: "Valentine's Day Photo Prompts", h1Ta: 'காதலர் தின புகைப்பட ப்ராம்ப்ட்கள்',
    title: "Valentine's Day AI Photo Prompts for Couples",
    desc: "Free Valentine's Day AI photo prompts for ChatGPT and Gemini. Romantic couple frames that keep both faces. Copy and paste.",
    intro: "Romantic frames for 14 February: roses, candlelight, a proposal and a quiet walk together. Every prompt keeps both faces and your height difference, so the picture still looks like the two of you.",
    introTa: 'பிப்ரவரி 14-க்கான காதல் ஃப்ரேம்கள்: ரோஜாக்கள், மெழுகுவர்த்தி வெளிச்சம், ப்ரொபோசல். ஒவ்வொரு ப்ராம்ப்டும் இருவரின் முகத்தையும் மாற்றாமல் வைத்திருக்கும்.',
    faqs: [FACE_FAQ, TOOL_FAQ, FREE_FAQ],
  },
  {
    id: 'republic-day', path: 'festivals/republic-day', festival: true, emoji: '🇮🇳',
    tint: 'linear-gradient(135deg,#ffe0c2,#d8f2d8)',
    name: 'Republic Day', nameTa: 'குடியரசு தினம்',
    h1: 'Republic Day Photo Prompts', h1Ta: 'குடியரசு தின புகைப்பட ப்ராம்ப்ட்கள்',
    title: 'Republic Day AI Photo Prompts for ChatGPT & Gemini',
    desc: 'Free Republic Day AI photo prompts for ChatGPT and Gemini. Tricolour portraits for boys, girls and families. Copy and paste.',
    intro: 'Portraits for 26 January: the tricolour, a flag hoisting, and saffron, white and green styling for status pictures. The prompts keep the flag respectful and correctly drawn, and your face unchanged.',
    introTa: 'ஜனவரி 26-க்கான படங்கள்: மூவர்ணக் கொடி, கொடியேற்றம் மற்றும் ஸ்டேட்டஸுக்கான காவி, வெள்ளை, பச்சை ஸ்டைல். உங்கள் முகம் மாறாது.',
    faqs: [FACE_FAQ, TOOL_FAQ, FREE_FAQ],
  },

  // ---- Festival hub: these share the /festivals/ page until they have 8+ prompts.
  // To give one its own page, remove `hub: true`, set `path: 'festivals/<name>'`
  // and add title, desc and faqs like the collections above.
  { id: 'shivratri', path: 'festivals', festival: true, hub: true, when: 'About March 2027', emoji: '🔱',
    tint: 'linear-gradient(135deg,#dfe3ff,#e9ddff)', name: 'Maha Shivratri', h1: 'Maha Shivratri Photo Prompts', intro: 'Night-long prayer, temple lamps and bilva leaves.' },
  { id: 'eid', path: 'festivals', festival: true, hub: true, when: 'About March 2027', emoji: '🌙',
    tint: 'linear-gradient(135deg,#d9f2e6,#fff3c9)', name: 'Eid al-Fitr', h1: 'Eid al-Fitr Photo Prompts', intro: 'Crescent-moon nights, new clothes and Eid greetings.' },
  { id: 'holi', path: 'festivals', festival: true, hub: true, when: 'March 2027', emoji: '🎨',
    tint: 'linear-gradient(135deg,#ffd6ec,#d6f0ff)', name: 'Holi', h1: 'Holi Photo Prompts', intro: 'Clouds of gulal, white kurtas and colour-splashed smiles.' },
  { id: 'ugadi', path: 'festivals', festival: true, hub: true, when: 'April 2027', emoji: '🌿',
    tint: 'linear-gradient(135deg,#e2f5cf,#fff0b8)', name: 'Ugadi, Tamil New Year, Vishu and Baisakhi', h1: 'Ugadi, Tamil New Year, Vishu and Baisakhi Photo Prompts', intro: 'The regional new years of April, from mango-leaf doorways to wheat fields.' },
  { id: 'bakrid', path: 'festivals', festival: true, hub: true, when: 'About May 2027', emoji: '🕌',
    tint: 'linear-gradient(135deg,#e0f0e8,#f6ead0)', name: 'Eid al-Adha (Bakrid)', h1: 'Eid al-Adha (Bakrid) Photo Prompts', intro: 'Morning prayers, family gatherings and festive dress.' },
  { id: 'independence-day', path: 'festivals', festival: true, hub: true, when: '15 August 2027', emoji: '🇮🇳',
    tint: 'linear-gradient(135deg,#ffe0c2,#d8f2d8)', name: 'Independence Day', h1: 'Independence Day Photo Prompts', intro: 'Tricolour portraits for 15 August.' },
  { id: 'raksha-bandhan', path: 'festivals', festival: true, hub: true, when: 'August 2027', emoji: '🧵',
    tint: 'linear-gradient(135deg,#ffe1d0,#ffd6e6)', name: 'Raksha Bandhan', h1: 'Raksha Bandhan Photo Prompts', intro: 'Brother and sister frames with rakhi, thali and sweets.' },
  { id: 'janmashtami', path: 'festivals', festival: true, hub: true, when: 'About August 2027', emoji: '🪈',
    tint: 'linear-gradient(135deg,#d8e6ff,#fff1c2)', name: 'Janmashtami', h1: 'Janmashtami Photo Prompts', intro: 'Peacock feathers, flutes and dahi handi.' },
  { id: 'ganesh-chaturthi', path: 'festivals', festival: true, hub: true, when: 'About September 2027', emoji: '🐘',
    tint: 'linear-gradient(135deg,#ffe3c2,#ffd0d0)', name: 'Ganesh Chaturthi', h1: 'Ganesh Chaturthi Photo Prompts', intro: 'Welcoming Ganpati at home and the visarjan procession.' },
  { id: 'onam', path: 'festivals', festival: true, hub: true, when: 'About September 2027', emoji: '🌼',
    tint: 'linear-gradient(135deg,#fff3c2,#dff3d0)', name: 'Onam', h1: 'Onam Photo Prompts', intro: 'Pookalam, kasavu sarees and the sadya feast.' },
  { id: 'navratri', path: 'festivals', festival: true, hub: true, when: 'About October 2027', emoji: '💃',
    tint: 'linear-gradient(135deg,#ffd9e0,#ffe9c2)', name: 'Navratri, Durga Puja and Dussehra', h1: 'Navratri, Durga Puja and Dussehra Photo Prompts', intro: 'Garba nights, pandal visits and Vijayadashami.' },
  { id: 'karwa-chauth', path: 'festivals', festival: true, hub: true, when: 'About October 2027', emoji: '🌕',
    tint: 'linear-gradient(135deg,#ffd9d9,#ffe8c9)', name: 'Karwa Chauth', h1: 'Karwa Chauth Photo Prompts', intro: 'Moonrise, the sieve and the thali.' },
  { id: 'mothers-day', path: 'festivals', festival: true, hub: true, when: 'About May 2027', emoji: '💐',
    tint: 'linear-gradient(135deg,#ffe0ec,#fff0c9)', name: "Mother's Day", h1: "Mother's Day Photo Prompts", intro: 'Garden hugs and breakfast surprises with your mother.' },
  { id: 'fathers-day', path: 'festivals', festival: true, hub: true, when: 'About June 2027', emoji: '👔',
    tint: 'linear-gradient(135deg,#d9e6ff,#ffe9c9)', name: "Father's Day", h1: "Father's Day Photo Prompts", intro: 'Terrace chai and golden-hour walks with your father.' },
  { id: 'friendship-day', path: 'festivals', festival: true, hub: true, when: 'August 2027', emoji: '🤝',
    tint: 'linear-gradient(135deg,#ffe8c9,#d6f0ff)', name: 'Friendship Day', h1: 'Friendship Day Photo Prompts', intro: 'Best-friend frames with friendship bands, cafes and rooftops.' },
  { id: 'diwali', path: 'festivals', festival: true, hub: true, when: 'About October–November 2027', emoji: '🪔',
    tint: 'linear-gradient(135deg,#ffe6b8,#ffd3c2)', name: 'Diwali and Chhath', h1: 'Diwali and Chhath Photo Prompts', intro: 'Diyas, rangoli, sparklers and the Chhath ghat at sunrise.' },
  { id: 'gurpurab', path: 'festivals', festival: true, hub: true, when: 'About November 2027', emoji: '🙏',
    tint: 'linear-gradient(135deg,#ffe9c2,#fff7dc)', name: 'Guru Nanak Jayanti (Gurpurab)', h1: 'Guru Nanak Jayanti Photo Prompts', intro: 'Gurdwara mornings, lit diyas and the golden light of Gurpurab.' },
];

// Search copy (title, description, intro, FAQs, related links) for each category page lives in seo-copy.ts.
export const COLLECTIONS: Collection[] = BASE_COLLECTIONS.map((c) => (SEO_COPY[c.id] ? { ...c, ...SEO_COPY[c.id] } : c));



/** Homepage questions (English). Also used for the FAQPage schema on the homepage. */
export const HOME_FAQ = [
  { q: 'How do I use a photo editing prompt in ChatGPT or Gemini?', a: 'Tap Copy prompt on any card, open ChatGPT or Gemini, upload a clear, front-facing photo of yourself, paste the prompt and send. If the first result is off, run it again.' },
  { q: 'What is an AI photo editor prompt?', a: 'It is a block of text you paste into ChatGPT or Gemini together with your photo, and the AI edits the photo for you. An AI image editing prompt names the scene, the outfit, the light and what must stay the same, such as your face.' },
  { q: 'What are the best editing prompts for photos?', a: 'The best editing prompts say exactly what to change (outfit, place, light, camera angle) and what must stay the same (your face). Every photo editing prompt on this site is written that way, as a plain-text prompt you can paste into ChatGPT or Gemini, and you can copy AI prompts from any card.' },
  { q: 'What is a photo prompt, and where do I find new prompts?', a: 'A photo prompt is the text you give an AI image tool to edit or create a picture. New photo editing prompts are added to this site every few days. Open the Trending page to see the newest first, or search by style, such as couple, men, women, family or birthday.' },
  { q: 'Where can I copy ChatGPT photo editing prompts as text?', a: 'Every prompt on this site is plain text. Tap Copy prompt on any card, then paste it into ChatGPT or Gemini. You can edit the words before you send them.' },
  { q: 'What is the trending prompt right now?', a: 'The newest trending prompts are listed first on the Trending page: couple edits, 80s looks, festival looks and viral Instagram styles. Each is a free copy-and-paste prompt for ChatGPT or Gemini, and new ones are added every few days.' },
  { q: 'Are these prompts free?', a: 'Yes. Every prompt on this site is free to copy and use. You only need a ChatGPT or Gemini account, and both have free plans that can edit photos.' },
  { q: 'Will the edited photo still look like me?', a: 'Every prompt starts with a face-lock instruction that tells the AI to keep your face, skin tone and features unchanged. If the face still drifts, upload a clearer, front-facing photo.' },
  { q: 'Do these prompts work in both ChatGPT and Gemini?', a: 'Yes. They are written in plain language that both ChatGPT and Google Gemini understand.' },
  { q: 'Can I get GTA 6 style or movie-star style photos?', a: 'Yes. The GTA 6 Style and Movie Stars collections create original game-poster and film-star looks on your own face. They are not affiliated with any game studio or film company, and they never use a real actor\'s name or likeness.' },
  { q: 'Where can I copy AI photo prompts and ChatGPT image prompts?', a: 'Right here. Every prompt on this site is free plain text for ChatGPT and Gemini: tap Copy prompt on any card, then paste it with your photo. There is no coin system and no ad before the copy button, so you can copy prompts as often as you like.' },
  { q: 'What is the best prompt for photo editing in ChatGPT?', a: 'The best prompt for photo editing says what to change (outfit, place, light, camera angle) and what must stay (your face). Start with a Couple, Girls, Boys, Birthday or Cinematic prompt, because each is written in that order. If you ask "give me a prompt for ChatGPT for photo editing", this is the page to copy from.' },
  { q: 'Is there a ChatGPT photo prompt generator?', a: 'Most prompts have dropdowns for the outfit, place or colour. Change them and the prompt text rewrites itself, so each prompt works as a small photo prompt generator before you copy it.' },
  { q: 'ChatGPT se photo edit karne ke liye prompt kaise use karein?', a: 'Pehle ChatGPT mein apni ek clear, front-facing photo upload karein, phir koi bhi prompt copy karke paste karein aur send karein. Prompt English mein hi rehta hai, aur AI aapka face same rakhta hai. Hindi aur Tamil pages bhi site par available hain.' },
  { q: 'What are the ChatGPT photo editing trends for 2027?', a: 'The big ones are the 80s look, couple and pre-wedding edits, cinematic film-still portraits, birthday photoshoots, aesthetic and stylish Instagram portraits, and festival looks. Open the Trending page for the newest viral photo prompts first.' },
  { q: 'Can I ask for an 8K photo editing prompt?', a: 'You can ask for sharp, high-detail results, and our prompts do. The real pixel size depends on the tool and your plan, and ChatGPT and Gemini do not truly output 8K. For the cleanest result, upload a sharp original photo.' },
  { q: 'Which chat gpt prompt for photo editing works best?', a: 'Any chat gpt photo prompt here works: upload one clear photo, paste the prompt, and send. Popular picks are the chat gpt couple prompt, the chat gpt 80s prompt (also searched as 80\'s prompt or 1980s prompt), the chat gpt birthday prompt and the trending chat gpt prompt on our Trending page. People also search for a chat gpt prompt for image editing, a chat gpt edit prompt or a prompt chat gpt link, and they all lead to the same free copy-and-paste library.' },
  { q: 'Are there romantic couple AI prompts for chat gpt and an 80\'s trend prompt?', a: 'Yes. The Couple collection has romantic couple AI prompts for chat gpt, from pre-wedding to rainy-day portraits, and the 80s collection is the 80\'s trend prompt page: retro film looks, 80s pic prompts and 1980\'s style edits you can copy and paste in one tap.' },
];
