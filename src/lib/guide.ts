import type { RawPrompt } from '../data/prompts';

// Practical advice shown on collection and prompt pages, by the kind of photo a prompt needs.
export interface Guide { upload: string[]; fixes: { problem: string; fix: string }[] }

const FACE_FIXES = [
  { problem: 'The face looks like a different person', fix: 'Upload a sharper, front-facing photo with no sunglasses or heavy filter, then run the same prompt again. Add: "The face must match my photo exactly."' },
  { problem: 'Skin looks smooth or plastic', fix: 'Add: "Keep real skin texture with pores; no smoothing or beauty filter."' },
  { problem: 'Hands or fingers look wrong', fix: 'Run it again, or change the pose in the prompt so the hands are in pockets or out of frame.' },
  { problem: 'Skin tone came out lighter', fix: 'Add: "Match my skin tone to the uploaded photo exactly. Do not lighten."' },
];

export const GUIDE: Record<RawPrompt['lock'], Guide> = {
  single: {
    upload: ['One clear photo of you alone, face towards the camera.', 'Even daylight is best; avoid strong shadows across the face.', 'For full-body scenes, upload a photo that shows your build, not only a tight selfie.'],
    fixes: FACE_FIXES,
  },
  era: {
    upload: ['One clear, front-facing photo of you alone.', 'A neutral expression gives the most believable old-photo result.', 'Remove sunglasses and caps; modern accessories can leak into the era look.'],
    fixes: [...FACE_FIXES.slice(0, 2), { problem: 'It looks like a modern photo in costume', fix: 'Add: "Stronger film grain, faded colour and print texture, like a scanned photo from that decade."' }, { problem: 'A modern object appears in the frame', fix: 'Name it and ask for its removal: "Remove the phone and the modern car."' }],
  },
  couple: {
    upload: ['One photo with both of you in it gives the most natural result.', 'Both faces should be sharp, similar in size and not overlapping.', 'If you use two separate photos, say who is on the left and who is on the right.'],
    fixes: [{ problem: 'The two faces look blended or swapped', fix: 'Add: "The person on the left stays on the left. Do not mix our features." Then run again.' }, { problem: 'Our height difference changed', fix: 'Add: "Keep our real height difference from the photo."' }, ...FACE_FIXES.slice(1, 3)],
  },
  eraCouple: {
    upload: ['One photo with both of you, both faces sharp and unobstructed.', 'Neutral or soft smiles suit old-photo looks best.', 'Avoid modern accessories such as smartwatches and earbuds.'],
    fixes: [{ problem: 'The two faces look blended or swapped', fix: 'Add: "Do not mix our features; keep each face exactly as in the photo."' }, { problem: 'It looks too clean and modern', fix: 'Add: "More grain, softer focus and faded tones, like a real print from that time."' }],
  },
  family: {
    upload: ['One group photo where every face is visible and roughly the same size.', 'Up to five or six people works best. Split larger groups into two edits.', 'Nobody should be half-hidden behind another person.'],
    fixes: [{ problem: 'Someone is missing or an extra person appeared', fix: 'Add the exact count: "There are exactly five people. Keep all five; add nobody."' }, { problem: 'One face changed', fix: 'Point at them: "Keep the woman on the far right exactly as in the photo." Then run again.' }, { problem: 'Faces at the edges are blurry', fix: 'Crop the original closer and upload at the highest resolution you have.' }, { problem: 'Children look older or adults look younger', fix: 'Add: "Keep every person\'s real age."' }],
  },
  fix: {
    upload: ['Upload the original file, not a screenshot or a forwarded copy.', 'For old prints, photograph or scan them flat with no glare.', 'Tell the AI anything it cannot know, such as the real colour of an outfit.'],
    fixes: [{ problem: 'The AI redrew a face', fix: 'Add: "Do not regenerate faces. Only clean, sharpen and repair what is already there."' }, { problem: 'The photo was cropped or reframed', fix: 'Add: "Keep the original framing and aspect ratio."' }, { problem: 'Colours look unnatural', fix: 'Add: "Natural, realistic colours with neutral white balance."' }],
  },
  car: {
    upload: ['A clear side or three-quarter photo of your own car in daylight.', 'The whole car in the frame, with nothing blocking the wheels.', 'A plain background makes the change easier to judge.'],
    fixes: [{ problem: 'It turned into a different car', fix: 'Add your model: "This is a 2019 Maruti Swift. Keep it a 2019 Maruti Swift."' }, { problem: 'Wheels look warped or oval', fix: 'Run again, or use a photo taken more side-on.' }, { problem: 'The background changed', fix: 'Add: "Do not change the background, the road or the sky."' }],
  },
};
