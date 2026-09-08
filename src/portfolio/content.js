import { writingPosts } from "../content/writing.js";

export const site = {
  name: "Tanish Anand",
  url: "https://tanishanand.com",
  email: "tanishanand@paxus.in",
  emailUrl: "mailto:tanishanand@paxus.in",
  booking: "https://cal.com/tanishanand",
  github: "https://github.com/Tanish-Anand1",
  twitter: "https://x.com/sullaxive",
  linkedin: "https://linkedin.com/in/tanish-anand24",
  vivacity: "https://www.tryvivacity.com/",
  vivacityDemo: "https://www.tryvivacity.com/demo",
  argus: "https://osirisai.live",
  sameAs: [
    "https://github.com/Tanish-Anand1",
    "https://linkedin.com/in/tanish-anand24",
    "https://x.com/sullaxive",
    "https://cal.com/tanishanand",
  ],
  metadataLinks: [
    "https://tanishanand.com/",
    "mailto:tanishanand@paxus.in",
    "https://github.com/Tanish-Anand1",
    "https://linkedin.com/in/tanish-anand24",
    "https://x.com/sullaxive",
    "https://cal.com/tanishanand",
    "https://www.tryvivacity.com/",
    "https://www.tryvivacity.com/demo",
    "https://osirisai.live",
  ],
};

// Attribution is kept in docs/portfolio-content-sources.md. Never infer an
// employment title, a paper, or a model contribution from an institution name.
export const highlights = [
  {
    name: "Google DeepMind",
    logo: "deepmind",
    detail: "Robotics",
    href: "/work#deepmind",
  },
  {
    name: "IIT Bombay",
    logo: "iitb",
    detail: "International Robowars ’25. 8 kg winner.",
    href: "/projects/robowars",
  },
  {
    name: "Inflection",
    logo: "inflection",
    detail: "Grant recipient",
    href: "/work#inflection",
  },
  {
    name: "Anduril",
    logo: "anduril",
    detail: "Bare-metal firmware. Project redacted.",
    href: "/work#anduril",
  },
];

export const projects = [
  {
    slug: "robowars",
    title: "Robowars",
    category: "Hardware",
    year: "2025",
    subtitle: "8 kg. One arena.",
    summary:
      "Combat robotics. Winner of the 8 kg category at IIT Bombay’s International Robowars 2025.",
    role: "Builder & competitor",
    status: "Competition winner",
    tech: ["Mechanical design", "Embedded systems", "Robotics"],
    image: "/story/robot-later-build.jpg",
    alt: "Combat robot from Tanish’s build archive",
    sections: [
      {
        title: "Building for contact",
        body: [
          "I won the 8 kg category at IIT Bombay’s International Robowars in 2025. Robotics took my work from software into motors, batteries, mechanical tolerances, and repair.",
          "The weight limit makes every part a trade-off. Structure, drive, power, and protection share the same budget. The design has to survive impact while remaining controllable.",
        ],
      },
      {
        title: "The build archive",
        body: [
          "These photographs follow the work from an early concept to assembled robots and arena testing. The iteration happened across builds: assemble, test, inspect the damage, change the design.",
          "The photographs are from my robotics archive. They show the broader build process and are not all from the same competition.",
        ],
      },
    ],
    gallery: [
      "/story/robot-concept.jpg",
      "/story/robot-build.jpg",
      "/story/robowar-arena.jpg",
      "/story/robowar-team.jpg",
    ],
  },
  {
    slug: "osiris",
    title: "ARGUS",
    category: "Systems",
    year: "2026",
    subtitle: "A world of signals, in one view.",
    summary:
      "A WebGL interface for flight, maritime, camera, seismic, and broadcast data.",
    role: "Builder",
    status: "Public project",
    tech: ["TypeScript", "Next.js", "MapLibre GL", "WebGL"],
    sections: [
      {
        title: "The ingest problem",
        body: [
          "ARGUS brings ADS-B flight data, AIS maritime positions, camera feeds, seismic events, and live broadcasts into a geographic interface. The work sits across data ingestion, stream handling, and GPU rendering.",
          "Different feeds arrive at different rates. Video streams need reconnect logic and browser-compatible formats. Position packets need timestamps that remain meaningful when they are displayed beside a video observation.",
        ],
      },
      {
        title: "Keeping the renderer responsive",
        body: [
          "The camera-ingest work uses a worker to reconnect and remux incoming streams. Reusing typed arrays reduces allocation churn during continuous decoding. The map is rendered through WebGL, keeping geographic interaction separate from feed handling.",
          "Feed availability depends on the upstream providers, which is basically the polite way of saying the internet can be a little dubass sometimes.",
        ],
      },
    ],
    relatedPost: "osiris-camera-ingest",
  },
  {
    slug: "airis",
    title: "AIRIS",
    category: "Hardware",
    year: "2026",
    subtitle: "Firmware at the hardware boundary.",
    summary:
      "Bare-metal STM32F405 flight-computer firmware for a hybrid-rocket avionics project.",
    role: "Firmware developer",
    status: "Hardware build in progress",
    tech: ["STM32F405", "Bare metal", "IMU", "Barometer", "DFU"],
    sections: [
      {
        title: "Avionics",
        body: [
          "I wrote the flight-computer firmware for AIRIS on an STM32F405, including IMU and barometer driver integration. The image was flashed and checked through DFU. The hardware build remains in progress.",
          "This work is at the boundary between sensor measurements and the software that consumes them. Device configuration, sampling, and interpreting measurements belong to the firmware layer.",
        ],
      },
      {
        title: "Current state",
        body: [
          "Firmware and device integration are the completed portion. The hardware build is still in progress.",
        ],
      },
    ],
  },
  {
    slug: "educore",
    title: "EduCore",
    category: "AI",
    year: "2025",
    subtitle: "Inference without an internet connection.",
    summary:
      "A solar-powered learning-device project for rural India, built around quantized Phi-3 Mini on Raspberry Pi.",
    role: "Builder",
    status: "Hardware BOM complete",
    tech: ["Raspberry Pi", "llama.cpp", "Phi-3 Mini", "Python"],
    sections: [
      {
        title: "Local inference",
        body: [
          "EduCore explores an adaptive learning device that can operate offline. Its hardware plan combines a Raspberry Pi, solar power, and a quantized Phi-3 Mini model.",
          "The constraint is the whole system: model memory, response time, energy use, and the learning interface have to fit on one device. Quantization reduces the memory needed to hold model weights.",
        ],
      },
      {
        title: "Project state",
        body: [
          "The hardware bill of materials is complete. Device testing and evaluation with students are the next questions for the project.",
        ],
      },
    ],
  },
  {
    slug: "physicsgpt",
    title: "PhysicsGPT",
    category: "AI",
    year: "2025",
    subtitle: "A physics tutor that runs locally.",
    summary:
      "An offline language-model tutor focused on the CBSE Physics curriculum and edge deployment.",
    role: "Builder",
    status: "Project archive",
    tech: ["Python", "Fine-tuning", "Edge inference"],
    sections: [
      {
        title: "A bounded curriculum",
        body: [
          "PhysicsGPT is an offline AI tutor fine-tuned around the CBSE Physics curriculum. Its target environment is edge hardware, where memory and inference speed constrain the model.",
          "A subject-specific tutor needs to handle units, equations, and intermediate reasoning consistently. That makes curriculum alignment and evaluation central to the project.",
        ],
      },
      {
        title: "Engineering questions",
        body: [
          "The useful questions are concrete: can a smaller model explain a derivation, keep units consistent, and remain responsive on local hardware?",
        ],
      },
    ],
  },
  {
    slug: "complianceguard",
    title: "ComplianceGuard",
    category: "AI",
    year: "2025",
    subtitle: "Two models, one review workflow.",
    summary:
      "An assisted review workflow that separates rapid document triage from deeper audit reasoning.",
    role: "Builder",
    status: "Prototype",
    tech: ["Claude API", "Python", "OpenClaw"],
    sections: [
      {
        title: "Review pipeline",
        body: [
          "ComplianceGuard separates an initial document-triage pass from deeper reasoning with Claude. The project explores review workflows around SOC 2, HIPAA, GDPR, and ISO 27001.",
          "Splitting the workflow makes the initial pass and the detailed review separately inspectable. Findings still require the source material and a human reviewer to establish what they mean.",
        ],
      },
      {
        title: "Scope",
        body: [
          "This is a software prototype for assisted review. It does not issue certifications, establish legal compliance, or replace professional assessment.",
        ],
      },
    ],
  },
  {
    slug: "anti-sleep",
    title: "Anti-Sleep Pilot",
    category: "AI",
    year: "2026",
    subtitle: "Reading fatigue through a camera.",
    summary:
      "A computer-vision drowsiness-detection prototype built and pitched at HACKSHODH 2026.",
    role: "Builder",
    status: "Hackathon prototype",
    tech: ["Python", "OpenCV", "Computer vision"],
    sections: [
      {
        title: "Vision loop",
        body: [
          "Anti-Sleep Pilot explores real-time drowsiness detection from camera input. I built and pitched the project at HACKSHODH 2026.",
          "The task connects a stream of visual observations to a time-dependent signal. Lighting, head pose, occlusion, and camera placement all affect the reliability of that signal.",
        ],
      },
      {
        title: "Prototype boundary",
        body: [
          "The project is a hackathon prototype. It has not been validated as a safety system and should not be relied on to prevent accidents.",
        ],
      },
    ],
  },
  {
    slug: "byteforge",
    title: "ByteForge",
    category: "Community",
    year: "Ongoing",
    subtitle: "A place to build together.",
    summary:
      "A hardware and AI builder community I co-founded with Pavitra Kushwaha.",
    role: "Co-founder & VP",
    status: "Community",
    tech: ["Robotics", "Embedded systems", "Applied AI"],
    sections: [
      {
        title: "Peer-led engineering",
        body: [
          "Pavitra Kushwaha and I co-founded ByteForge in Class 9. It brings students together for workshops, project sprints, and hands-on work in hardware and AI.",
          "The projects span embedded systems, robotics, and applied AI. Building with other people creates a useful feedback loop: someone tries your system, finds the part that breaks, and helps you fix it.",
        ],
      },
    ],
  },
];

const cleanText = (text) =>
  text.replace(/[\u2014\u2013]/g, ", ").replace(/\s+,/g, ",");
export const posts = writingPosts.map((post) => ({
  ...post,
  title: cleanText(post.title),
  summary: cleanText(post.summary),
  body: post.body.map(cleanText),
}));

export const workNotes = [
  {
    slug: "inflection",
    title: "inflection grant",
    subtitle: "$2k from edge city. the pool was jensen huang's leather jacket after sotheby's hit $960k.",
    date: "2026",
    role: "Grant",
    views: "214 views",
    body: [
      "i got an inflection grant from edge city. it is $2k for builders under 25 who have something early enough that a small amount of money can still bend the path.",
      "the funny part is the pool. jensen huang signed one of his black leather jackets, sotheby's sold it for $960k, and the proceeds went to the edge institute programs that support these grants and fellowships.",
      "a jacket changed hands in new york and some of that money reached a 16 year old building a runtime in kanpur. hwahwhahwa. i put mine back into vivacity."
    ]
  },
  {
    slug: "deepmind",
    title: "google deepmind",
    subtitle: "how I got into the robotics accelerator.",
    date: "2026",
    role: "Robotics",
    views: "1,402 views",
    body: [
      "getting into the Google DeepMind Robotics Accelerator started with the least glamorous part: making the work impossible to ignore. not a glossy robot render, not a linkedin essay about the future, but actual systems that had to ingest messy signals, survive weird edge cases, and keep moving when the demo gods were being absolute assholes.",
      "the accelerator is built for early-stage robotics startups working on physical AI. it is three months, equity-free, and very much not a participation trophy: the program looks for a serious technical team, a real AI core, and a product that can move robotics from cool prototype to something people can actually use. that was the lane I was building toward.",
      "what helped was showing the whole loop. robotics is not just a model that vibes in simulation. it is data collection, sensors, latency, deployment, failure recovery, and the painfully human bit of figuring out what the system should do next. I came in with that mindset, with enough technical work behind it to make the conversation concrete, and with a very clear reason for wanting Google DeepMind in the room.",
      "the useful lesson is simple: if you want into a program like this, do not cosplay as a robotics company. build the thing, document what broke, show why AI is central, and make it obvious that mentorship will compound the work. the rest is timing, proof, and a frankly unreasonable amount of persistence."
    ]
  },
  {
    slug: "anduril",
    title: "anduril",
    subtitle: "built bare-metal firmware for an anduril project. details are redacted.",
    date: "2026",
    role: "Firmware",
    views: "3,110 views",
    body: [
      "writing firmware at the lowest levels is fundamentally different from building web services or even training models. memory isn't free, timing is critical, and a crash isn't just a 500 error, it's a physical failure.",
      "the details of the project are redacted, but the experience solidified my appreciation for systems that cannot fail.",
      "when you build hardware, the software has to be as robust as the titanium it controls."
    ]
  }
];

export const routeList = [
  "/",
  "/vivacity",
  "/projects",
  "/research",
  "/work",
  "/writing",
  ...projects.map((p) => `/projects/${p.slug}`),
  ...posts.map((p) => `/writing/${p.slug}`),
  ...workNotes.map((n) => `/work/${n.slug}`),
];

// This page is intentionally omitted from navigation and the sitemap. It is a
// authenticated writing desk backed by the publishing API.
export const privateRouteList = ["/admin"];

export function routeMeta(path) {
  const project = projects.find((p) => path === `/projects/${p.slug}`);
  const post = posts.find((p) => path === `/writing/${p.slug}`);
  const base = {
    "/": [
      "Tanish Anand",
      "16. Founder & CTO of Vivacity. Research Fellow at IIT Kanpur. AI systems, simulation infrastructure, and robotics.",
    ],
    "/vivacity": [
      "Vivacity",
      "Building a simulation runtime for AI agents. Persistent state, branching, backend routing, and verification. Explore an interactive orbital model.",
    ],
    "/projects": [
      "Projects",
      "Software, robotics, embedded systems, and AI projects by Tanish Anand.",
    ],
    "/research": [
      "Research",
      "Discrete text diffusion, Hindi NLP, MPC, and cryptography. Research notes by Tanish Anand.",
    ],
    "/work": [
      "Work & background",
      "Robotics, open-source AI, firmware, and research. Tanish Anand’s work and background.",
    ],
    "/writing": [
      "Writing",
      "Notes on research, systems, robotics, and building Vivacity.",
    ],
    "/admin": [
      "Writer desk",
      "A private editor for drafting, revising, and publishing writing.",
    ],
  };
  const meta = project
    ? [project.title, project.summary]
    : post
      ? [post.title, post.summary]
      : workNotes.find((n) => path === `/work/${n.slug}`)
        ? [workNotes.find((n) => path === `/work/${n.slug}`).title, workNotes.find((n) => path === `/work/${n.slug}`).subtitle]
        : base[path] || ["Page not found", "This page could not be found."];
  return {
    title:
      path === "/"
        ? "Tanish Anand | Research, systems, robotics"
        : `${meta[0]} | Tanish Anand`,
    description: meta[1],
  };
}
