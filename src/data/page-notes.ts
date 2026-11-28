// Hand-written notes that only one prompt page has: what that page's sample result actually shows, which photo
// to upload for that scene, which dropdown picks work, and a follow-up message for the problem that scene is most
// likely to hit. They make each top page's text its own instead of the shared prompt blocks.
// Only write `tested` from a real run with a real photo, with its date. Describe samples from the image itself.

export interface PageNote {
  look: string;        // what the sample result shows
  photo: string;       // best photo to upload for this scene
  picks?: string;      // dropdown advice
  note?: string;       // something specific worth knowing about this prompt
  tested?: string;     // a real test with a real photo (never invented)
  fix: { problem: string; message: string };
}

export const PAGE_NOTES: Record<string, PageNote> = {
  // ---------------- 1980s ----------------
  '1980s-studio-portrait-painted-backdrop': {
    look: 'A seated studio portrait in front of a hand-painted garden backdrop with a balustrade, a pillar and flowers. Our sample wears a floral salwar kameez under direct flash, and the print has worn, curled edges like a photo kept in an album for forty years.',
    photo: 'A clear, front-facing photo in even light. Your hair is restyled into an 80s look, so a well-lit face matters more than your hairstyle in the photo.',
    picks: 'The garden backdrop with the salwar kameez or the polyester saree looks most like a real 80s studio print. The palace backdrop suits the safari suit.',
    fix: { problem: 'Looks too clean or too modern?', message: 'Make it look older: more fading, yellowed whites, visible film grain and worn, curled edges, like a 1985 print. Keep my face exactly the same.' },
  },
  '1980s-indian-cinema-hero-poster-look': {
    look: 'A full-length hero shot in a white wide-collar suit against a warm sunset hill, with painted-poster colour, a soft glow and heavy grain.',
    photo: 'A half-body or full-body photo, because the pose is standing and full-length.',
    note: 'Our sample added a red vintage car behind the hero, which the prompt does not ask for. If you want the car, paste the prompt, then type "with a red vintage car parked behind me" at the end before you send it.',
    fix: { problem: 'Face looks too smooth or plastic?', message: 'Keep the 1980s film look, but bring back my real skin texture and my exact face shape. Less glow on the face, same grain.' },
  },
  '1980s-college-campus-candid': {
    look: 'A family-album snapshot outside a colonial college building: books held against the chest, a bicycle in front, students walking behind and a slightly overexposed sky.',
    photo: 'A smiling photo works better than a serious one, because the scene asks for a smile.',
    picks: 'The bicycle with the cotton salwar kameez gives the most real college look. The Ambassador car suits the checked shirt and high-waisted trousers.',
    fix: { problem: 'Too many students in the background?', message: 'Keep the same image, but blur the people in the background and keep only two or three of them.' },
  },
  '1980s-hill-station-holiday-snapshot': {
    look: 'A holiday print at a viewpoint railing with misty blue hills, a hand-knitted sweater and muffler, a light leak on one side and an orange date stamp in the bottom-right corner (26 12 \'85 in our sample).',
    photo: 'An outdoor daylight photo matches the squinting-in-the-sun look best.',
    note: 'The date stamp is part of the look. For your own date, paste the prompt, then type "the date stamp reads 14 05 \'86" (any date) at the end before you send it.',
    fix: { problem: 'Date stamp missing or misspelled?', message: 'Add a small orange digital date stamp in the bottom-right corner, like an 80s film camera, reading 26 12 \'85. Change nothing else.' },
  },
  '1980s-wedding-reception-flash-photo': {
    look: 'The two of you standing in front of a marigold-and-tinsel stage under harsh flash, in a safari suit and a silk saree, with a white album border.',
    photo: 'One photo with both of you side by side, facing the camera at eye level.',
    picks: 'The heavy silk saree with the safari suit is the most 80s. The red bridal saree with the cream sherwani turns it into your own wedding photo.',
    fix: { problem: 'One face does not match?', message: 'Keep this image exactly the same. Change only the man\'s face (or the woman\'s face) to match the reference photo exactly. Do not change anything else.' },
  },
  '1980s-scooter-street-portrait': {
    look: 'Sitting sideways on a sky-blue scooter outside a tea stall with hand-painted chai and samosa pictures, in a printed shirt and flared trousers.',
    photo: 'A half-body or full-body photo, since the sitting pose shows your whole build.',
    picks: 'Sky blue with the printed shirt is the classic combination. Cream suits the white safari suit.',
    note: 'The prompt asks for tinted sunglasses. Our sample put them up on the head, which keeps your eyes visible and your face more accurate.',
    fix: { problem: 'Sunglasses hiding your eyes?', message: 'Move the sunglasses up onto my head so my eyes are visible. Keep everything else the same.' },
  },
  '1980s-saree-garden-polaroid': {
    look: 'An instant photo with a wide bottom border: a pink chiffon saree, a flower in the hair, flowering plants and a whitewashed house behind, soft washed-out colours.',
    photo: 'A photo where your hair is clearly visible, so its texture stays right.',
    note: 'The prompt asks for a long plait, but our sample kept loose curly hair. If you want the plait, ask for it in a follow-up.',
    fix: { problem: 'Want the 80s plait?', message: 'Change my hair into one long plait with a flower tucked in, 1980s style. Keep my face and everything else the same.' },
  },
  '1980s-disco-party-flash': {
    look: 'Mid-dance under a mirror ball with one arm raised, a shiny gold satin shirt, coloured lights and dancers blurred behind.',
    photo: 'A smiling or laughing photo. The scene is mid-laugh, and turning a serious face into a laugh can change it.',
    picks: 'The satin shirt and the sequin top catch the flash best.',
    fix: { problem: 'Motion blur on your face?', message: 'Keep the dancing pose but make my face completely sharp. Only the background may have motion blur.' },
  },
  '1980s-passport-studio-photo': {
    look: 'Head and shoulders on a pale-blue backdrop in a wide-collar shirt, with flat light, slightly yellowed paper and a thin white border.',
    photo: 'Your most straight-on, neutral photo, like a real passport photo. A big smile will not match the neutral expression.',
    note: 'Our sample added a small bindi. The prompt now tells the AI not to add one unless the scene asks, so if you want one, type "with a small bindi" at the end after you paste the prompt.',
    fix: { problem: 'Smiling instead of neutral?', message: 'Make the expression neutral with a closed mouth, like a real passport photo. Keep my face shape exactly the same.' },
  },
  '1980s-diwali-home-snapshot': {
    look: 'Lighting a clay diya on a verandah under direct flash, in a silk saree with a gold border, against a dark background with sparkler streaks and a white album border.',
    photo: 'A front-facing, smiling photo. The flash lights your face, so the light in your photo matters less.',
    picks: 'The silk saree gives the most nostalgic look. Pick the kurta-pyjama for men.',
    fix: { problem: 'Too dark?', message: 'Make the flash a little brighter on my face and add two or three more lit diyas on the floor. Keep the 1980s look.' },
  },

  // ---------------- Boys ----------------
  'boy-motorcycle-mountain-road': {
    look: 'A low-angle, full-body shot on a classic cruiser on a winding mountain road, in a black leather jacket and boots, with snow peaks and golden light behind.',
    photo: 'A full-body photo, because the shot shows your whole build and your legs on the bike.',
    picks: 'Golden hour matches our sample. Blue hour is moodier.',
    fix: { problem: 'Bike looks bent or broken?', message: 'Redraw the motorcycle as one complete, realistic cruiser with both wheels on the road. Keep me and the background the same.' },
  },
  'boy-formal-suit-studio-headshot': {
    look: 'A chest-up studio portrait in a navy suit with an open white shirt on a dark grey backdrop, with soft light from the left and a gentle rim light.',
    photo: 'Your sharpest, best-lit face photo. This is a close-up, so face detail matters most.',
    picks: 'For LinkedIn or a resume, pick the black suit or the black bandhgala with the dark grey backdrop.',
    fix: { problem: 'Skin looks airbrushed?', message: 'Keep this exact image, but make my skin texture natural, not smoothed, and keep my real face shape.' },
  },
  'boy-street-style-neon-night': {
    look: 'Standing in a narrow lane lit by pink and blue neon, in a black hoodie with hands in pockets, with wet ground reflecting the light.',
    photo: 'A photo with your face in clear, neutral light. Neon colour can hide your real skin tone, so start from a well-lit face.',
    note: 'The scene says "looking slightly away". The prompt keeps your face toward the camera so it stays accurate; only your eyes may look away.',
    fix: { problem: 'Skin turned pink or blue?', message: 'Keep the neon colours on the walls and the ground, but keep my skin tone natural, as in my photo.' },
  },
  'boy-traditional-kurta-haveli': {
    look: 'Standing in a haveli courtyard with carved wooden doors and arches, in a white kurta, adjusting the sleeve cuff, in warm side light.',
    photo: 'A half-body or full-body photo, because the pose shows your arms and build.',
    picks: 'A white or cream kurta suits Eid and Diwali posts. Pick the ivory sherwani for weddings.',
    fix: { problem: 'Hands look odd?', message: 'Fix my hands: five fingers on each, one hand adjusting the other sleeve cuff naturally. Keep everything else the same.' },
  },
  'boy-rain-street-umbrella-cinematic': {
    look: 'Standing on a rainy street at dusk in a long dark coat, holding a black umbrella, with headlights blurred behind and raindrops caught in the light.',
    photo: 'Any clear, front-facing photo. The coat covers your body, so your build matters less here.',
    note: 'The scene says walking and looking ahead. Our sample faces the camera, which keeps your face accurate.',
    fix: { problem: 'Face too dark under the umbrella?', message: 'Add soft light on my face from a street lamp so my face is clearly visible under the umbrella. Keep the rain and the colours.' },
  },
  'boy-sherwani-wedding-guest': {
    look: 'A waist-up portrait at a wedding venue with marigold strings and fairy lights, in an ivory sherwani, adjusting a watch, with guests blurred behind.',
    photo: 'A smiling, front-facing photo. This is a waist-up shot, so your face is large in the frame.',
    picks: 'The navy bandhgala suits a reception. Pick the white veshti and silk shirt for a South Indian wedding.',
    fix: { problem: 'Hands or watch look wrong?', message: 'Fix the hands and the watch: one hand adjusting a watch on the other wrist, five fingers on each hand. Keep everything else the same.' },
  },
  'boy-beach-white-shirt-sunset': {
    look: 'Full-length on the shoreline at sunset in a white linen shirt with rolled sleeves and beige trousers, with waves around the ankles and the sun low behind.',
    photo: 'A full-body photo, because this is a full-length shot.',
    note: 'The scene says "looking out to sea". The prompt keeps your face toward the camera so it stays accurate.',
    fix: { problem: 'Face too dark against the sunset?', message: 'Keep the sunset behind me, but light my face softly from the front so it is clearly visible.' },
  },
  'boy-vintage-car-roadside': {
    look: 'Leaning on a red vintage car on an empty tree-lined road, arms folded, in a leather jacket over a white tee, with long golden-hour shadows.',
    photo: 'A full-body photo, because this is a full-length shot.',
    picks: 'The red car with the leather jacket is the classic look. The cream car with a linen shirt and sunglasses is softer.',
    fix: { problem: 'Car looks bent or split?', message: 'Redraw the car as one complete vintage car parked beside me, front and rear lined up, with no badges and no readable number plate. Keep me the same.' },
  },

  // ---------------- Couple ----------------
  'couple-pre-wedding-palace-steps': {
    look: 'Seated on sandstone steps under carved arches, one of you a step higher, hands joined on a lap, in a red lehenga and an ivory sherwani, in warm light, framed from the knees up.',
    photo: 'One photo of both of you facing the camera, ideally taken by someone else at eye level.',
    tested: 'We ran this prompt on 27 Nov 2026 with a real couple selfie taken from below, not a model photo. ChatGPT kept both faces, her nose pin and his full beard, framed from the knees up. Gemini kept both faces recognisable, but framed the couple full-length, so the faces came out smaller.',
    fix: { problem: 'Faces too small in Gemini?', message: 'Same image, but closer: crop from the waist up so both faces are bigger. Keep everything else the same.' },
  },
  'couple-golden-hour-field-walk': {
    look: 'Walking toward the camera through tall golden grass, holding hands, in a white dress and a beige linen shirt, with the low sun behind giving a warm rim of light on the hair.',
    photo: 'One photo of both of you facing the camera at eye level.',
    picks: 'The pastel saree with a white kurta gives a traditional version. Matching white outfits feel more like a pre-wedding shoot.',
    fix: { problem: 'Hands not holding?', message: 'Make our hands clearly held together at waist height, with five fingers on each hand. Keep everything else the same.' },
  },
  'couple-rain-umbrella-street': {
    look: 'Under one red umbrella on a rainy night street, in long coats, one of you holding the umbrella over both, with the wet road reflecting city lights.',
    photo: 'One photo of both of you standing close and facing the camera.',
    picks: 'The red umbrella stands out most at night. The transparent one shows more of the rain.',
    fix: { problem: 'Faces too dark?', message: 'Light both our faces softly from a street lamp in front of us. Keep the rain, the umbrella and the colours.' },
  },
  'couple-beach-sunset-silhouette': {
    look: 'Barefoot side by side on the sand at sunset, holding hands, in white outfits, with the orange sun low over the sea. The faces are lit from the front, not turned into silhouettes.',
    photo: 'A half-body or full-body photo of both of you.',
    picks: 'White beachwear matches our sample. The light saree with a white shirt gives a desi version.',
    fix: { problem: 'Faces dark like silhouettes?', message: 'Keep the sunset, but light both faces softly from the front so we are clearly recognisable.' },
  },
  'couple-cafe-window-coffee-date': {
    look: 'Side by side at a round wooden table by a window, holding coffee cups, in sweaters, with a croissant and a muffin on the table and plants and bookshelves behind.',
    photo: 'One photo of both of you facing the camera, ideally sitting.',
    picks: 'Casual sweaters suit a winter post. The kurti and casual shirt give an everyday look.',
    fix: { problem: 'Cups or hands look odd?', message: 'Fix our hands: each of us holds one cup naturally, with five fingers on each hand. Keep everything else the same.' },
  },

  // ---------------- Christmas ----------------
  'christmas-tree-fairy-lights-portrait': {
    look: 'Beside a decorated tree with red baubles and fairy-light bokeh, in a red cable-knit sweater, holding a wrapped gift.',
    photo: 'A smiling, front-facing photo. The prompt adds the warm indoor light itself.',
    picks: 'The red sweater is the classic look. The red saree with a gold border gives a desi Christmas photo.',
    fix: { problem: 'Skin looks too orange?', message: 'Keep the warm Christmas mood, but make my skin tone natural, as in my photo.' },
  },
  'christmas-couple-star-lantern-balcony': {
    look: 'On a balcony with a large glowing paper star, one of you reaching up to hold it, in matching red Christmas-pattern sweaters, with string lights along the railing.',
    photo: 'One photo of both of you facing the camera.',
    picks: 'Matching red and white sweaters copy our sample. The red saree with a white shirt gives a desi version.',
    fix: { problem: 'Star missing or too small?', message: 'Make the paper star lantern bigger and glowing warmly between us, with one of us holding it. Keep our faces the same.' },
  },
  'santa-hat-cafe-window-portrait': {
    look: 'At a cafe window in a red Santa hat and a cream turtleneck, both hands around a hot chocolate, with a wreath and a poinsettia nearby and reflections in the glass.',
    photo: 'A front-facing photo with your hair visible. The hat sits on top of your own hairstyle.',
    note: 'The scene says "looking out of the window". The prompt keeps your face toward the camera, with your eyes glancing outside.',
    fix: { problem: 'Reflection shows a different face?', message: 'Remove my reflection from the window glass, or make it a soft, blurred shape. Keep everything else the same.' },
  },
  'snowy-street-christmas-market-walk': {
    look: 'Full-length on a snowy cobbled lane lined with lit wooden stalls, in a long black overcoat and a checked scarf, with snowflakes caught in the light.',
    photo: 'A full-body photo, because this is a full-length shot.',
    note: 'The scene says "looking back over my shoulder". The prompt keeps your face toward the camera so it stays accurate.',
    fix: { problem: 'Snow covering your face?', message: 'Keep the falling snow, but keep my face clear of snowflakes and sharp.' },
  },

  // ---------------- New Year ----------------
  'new-year-rooftop-fireworks-portrait': {
    look: 'On a rooftop at midnight with fireworks bursting behind, in a black blazer, holding a lit sparkler, with city lights below.',
    photo: 'A laughing or smiling photo, because the scene asks for a laugh.',
    picks: 'The black blazer or the shimmering black saree works best against the night sky.',
    fix: { problem: 'Sparkler glare on your face?', message: 'Keep the sparkler, but tone down its glare so my face is evenly lit and sharp.' },
  },
  'new-year-couple-midnight-countdown': {
    look: 'Side by side at a rooftop party with your arms around each other, in black party wear, with fireworks and fairy lights overhead and guests blurred behind.',
    photo: 'One photo of both of you facing the camera.',
    picks: 'The red dress with the black suit stands out most against the night.',
    fix: { problem: 'Guests too sharp?', message: 'Blur the guests in the background more so we stand out. Keep our faces the same.' },
  },
  'happy-new-year-2027-balloon-frame': {
    look: 'In front of a party wall with large gold foil balloons spelling 2027, one fist raised, in a black shirt, with confetti falling.',
    photo: 'Any clear, front-facing photo.',
    note: 'AI tools sometimes get numbers wrong. Check that the balloons read 2027 before you post.',
    fix: { problem: 'Wrong number on the balloons?', message: 'Fix the balloons so they spell 2027 exactly once, in this order: 2, 0, 2, 7. Change nothing else.' },
  },
};
