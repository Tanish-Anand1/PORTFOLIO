export const writingPosts = [
  {
    slug: 'text-diffusion-hindi',
    year: '2025',
    title: 'getting sedd and llada to work on hindi',
    summary:
      'discrete text diffusion models are trained and benchmarked almost entirely in english. running them on hindi breaks in ways papers don\'t mention.',
    dateLabel: 'Oct 2025',
    dateISO: '2025-10-01',
    body: [
      "prof. adithya vadapalli's lab at iitk was looking at discrete diffusion for text, mostly sedd and llada style setups. the pitch is simple: instead of generating left to right like every autoregressive model, you denoise the whole sequence at once. sounds great until you point it at hindi.",
      "first problem is the tokenizer. every checkpoint we pulled was trained on an english-heavy corpus, so devanagari gets chopped into garbage subword pieces. the model spends half its capacity just learning to spell before it can learn anything about grammar.",
      "second problem is noise scheduling. the diffusion process corrupts tokens randomly and learns to reverse it, but hindi has way more morphological variation per word than english. the same schedule that works fine on english destroys hindi sentences faster, so early denoising steps give you almost nothing useful.",
      "we ended up retraining a hindi-specific tokenizer and tuning the noise schedule by hand, checkpoint by checkpoint, watching loss curves that didn't behave like the paper said they would. no shortcut. run it, read the output, adjust.",
      "still not done. hindi nlp is underfunded compared to english, and diffusion text models are new enough that half the tooling assumes things that don't hold outside english. that gap is basically the whole research problem.",
    ],
  },
  {
    slug: 'rudra-camera-ingest',
    year: '2025',
    title: "building rudra's camera ingest pipeline",
    summary:
      'project rudra pulls in rtsp feeds, ads-b, and ais data and renders it live in webgl. the ingest side alone took longer than the renderer.',
    dateLabel: 'Aug 2025',
    dateISO: '2025-08-01',
    body: [
      "rudra (osirisai.live) fuses live camera feeds with ads-b flight data and ais ship tracking into one webgl view. the idea is simple on a whiteboard. the actual ingest pipeline is where all the time went.",
      "rtsp streams from real cameras are inconsistent. some send h264, some send weird proprietary mp4 fragments, some just drop frames when the network hiccups. i wrote a worker that reconnects on failure and re-muxes whatever comes in into something the browser can actually decode, instead of trusting the stream to behave.",
      "ads-b and ais are the opposite problem: not video, just a firehose of small packets from planes and ships. easy to parse, hard to keep in sync with the video timestamp so a plane doesn't appear five seconds after it flew through frame.",
      "chrome gc was the sneaky bottleneck. every frame decode was allocating new buffers, and after a few minutes of a live feed the garbage collector would pause long enough to visibly stutter the render. switched to reusing typed arrays instead of allocating per frame and the stutter went away.",
      "none of this is glamorous. just workers, buffers, and reconnect logic. but it's the difference between a demo that looks good for thirty seconds and a feed that stays up.",
    ],
  },
];

export function getPostBySlug(slug) {
  return writingPosts.find((post) => post.slug === slug) || null;
}
