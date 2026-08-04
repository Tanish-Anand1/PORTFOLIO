export const writingPosts = [
  {
    slug: 'text-diffusion-hindi',
    year: '2025',
    title: 'Text Diffusion for Hindi NLP',
    summary:
      'what happens when you stop generating hindi left to right and start denoising the whole sentence at once. notes from research that still feels half-finished.',
    dateLabel: 'Oct 2025',
    dateISO: '2025-10-01',
    body: [
      "i used to think language models were basically just very patient typists. left to right. token after token. that story works until you spend enough time with hindi and notice how often the model has to commit before it knows what the sentence is actually doing.",
      "at iit kanpur, under prof. adithya vadapalli, i started looking at discrete text diffusion — models like sedd and llada that begin from a fully masked sequence and denoise everything in parallel. no next-token roulette. the whole string gets a chance to agree with itself.",
      "the early benchmarks were not the clean win anyone wants for a blog post. autoregressive models still sound more fluent when you let them ramble. diffusion was better at the boring, unforgiving parts — morphological agreement, reconstructing structure, the kind of grammatical debt hindi collects quietly over a long context.",
      "what i keep coming back to is not novelty. it is latency. if you care about edge deployment — the same constraint educore has to live inside — parallel denoisers start looking less like a research curiosity and more like a product bet.",
      "still refining noise schedules. still arguing with vocabularies. still early. but once you see a sentence assemble itself instead of being typed out, it is hard to unsee.",
    ],
  },
  {
    slug: 'rudra-camera-ingest',
    year: '2025',
    title: 'Reverse-Engineering Camera Streams for Rudra',
    summary:
      'how project rudra stopped being a dashboard and started feeling like a place you could actually watch the world move.',
    dateLabel: 'Aug 2025',
    dateISO: '2025-08-01',
    body: [
      "rudra was supposed to be a map. somehow it became an argument with browsers, codecs, and my own patience.",
      "i did not want another dashboard that polls every few seconds and pretends that is live. i wanted one picture of the world — public camera streams, ads-b, ais — updating fast enough that the sphere felt alive. if the frame hitching, the whole idea collapsed into theater.",
      "standard api polling was out immediately. maplibre and webgl will run at 60fps until you feed them something stupid. the hard part was the bridge: take messy public rtsp sources, decode them, repackage them, and get them into the browser without turning the main thread into a crime scene.",
      "the ingest path ended up as a dedicated worker. raw streams in. lightweight fragmented mp4 out. video on one path, telemetry on another, both landing as gpu-friendly buffers so thousands of nodes could move without rebuilding the dom like it owed me rent.",
      "most of the pain was memory. chrome will punish you if every aircraft allocation becomes garbage-collection theater. each active vector had to live as a dynamic vertex in a custom buffer, or the sphere stuttered and reminded you that elegance is optional but frame time is not.",
      "the goal was simple, even when the stack was not: the map should feel alive. when it does, osint stops being a pile of tabs and starts being one place you can actually think.",
    ],
  },
];

export function getPostBySlug(slug) {
  return writingPosts.find((post) => post.slug === slug) || null;
}
