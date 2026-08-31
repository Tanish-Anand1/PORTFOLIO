# Portfolio content record

Reviewed 2026-08-31.

## Direction

Compact black research portfolio. Geist and Geist Mono, a narrow reading column, small institution marks, real hardware photographs, and an interactive mathematical model. Design dials: variance 5, motion 3, density 4. Motion only acknowledges interaction. Anti-references: oversized slogan heroes and generic dashboard-card portfolios.

The user explicitly requested a full overhaul, black backgrounds, multipage technical content, bold brand names with favicons, and no em dashes or formulaic contrast copy. Those requirements take priority over the design skill's generic image-generation, dual-theme, and hero templates. Real portfolio artifacts are used instead of generated evidence.

## Sources and attribution

- User brief: age 16; Founder/CTO of Vivacity; Research Fellow at IIT Kanpur; Google DeepMind robotics; IIT Bombay International Robowars 2025 winner in 8 kg; work with xAI on Grok OSS; Inflection grant; bare-metal firmware project for Anduril, details redacted.
- These personal affiliations are author-provided. No employment title, employment dates, merged pull request, publication, or endorsement has been inferred. Organization links are context links, not evidence of the personal affiliation.
- [Vivacity](https://www.tryvivacity.com/): inspected live with browser on 2026-08-31. Current positioning: simulation runtime for AI agents, persistent state, observations, actions, forks, rollback, simulation routing, verification, commit, rendering. CTO/research role appears in the public team section. The original portfolio's video-generation positioning is superseded.
- Vivacity's Docs link was observed redirecting to its homepage. The portfolio uses the accessible public product contract, not invented SDK endpoints or backend integration claims.
- Existing `src/components/EssayHome.jsx`, `src/components/Projects.jsx`, and `src/content/writing.js`: project scope, status, technologies, public links, photos, and four existing articles. Historical writing is retained as historical writing. AIRIS hardware is still in progress; EduCore BOM is complete; Anti-Sleep remains a hackathon prototype.
- [SEDD](https://arxiv.org/abs/2310.16834): Aaron Lou, Chenlin Meng, Stefano Ermon. Source for the background model family, not a publication by Tanish.
- [LLaDA](https://arxiv.org/abs/2502.09992): Shen Nie et al. Source for the background model family, not a publication by Tanish.
- [Inflection Grants](https://www.inflectiongrants.com/): a plausible matching program. Program identity still needs author confirmation. No grant amount, NVIDIA affiliation, Jensen Huang connection, or award date is stated. Its favicon is provisional pending confirmation.
- Design references: [Aayam Bansal](https://www.aayambansal.com/) for concise introduction and deep links; [Harish Ashok](https://harishashok.com/) for simple navigation and real project media. Original prose and layouts were not copied.

## Asset provenance

Brand assets are local files under `public/brands`, fetched 2026-08-31:

- Vivacity: https://www.tryvivacity.com/favicon.svg
- Google DeepMind: https://storage.googleapis.com/gdm-deepmind-com-prod-public/icons/google_deepmind_2x_96dp.png
- Anduril: https://www.anduril.com/assets/favicon/favicon.xxQR7xb3fo.svg
- IIT Kanpur: https://www.iitk.ac.in/main/themes/iitk/favicon.ico
- Inflection: https://cdn.prod.website-files.com/6282ecb3cd9bb02c968283ff/62acbf4a8b13235aa3e574fc_favicon.png
- xAI and IIT Bombay: Google's favicon cache for x.ai and iitb.ac.in respectively. Their direct sites blocked access or had certificate trouble; no certificate checks were disabled.
- Robot photographs: existing `public/story` archive. Captions do not assert that every photograph depicts the 2025 IIT Bombay event.
- OSIRIS screenshot: existing `public/artifacts/rudra-live.png`, copied to tracked `public/portfolio/rudra-live.png` because the old artifacts directory is ignored by Git.

## Simulation boundary

Independent client-side explainer, not a production Vivacity API integration. Dimensionless two-body gravity, velocity Verlet, 1,600 steps at dt=0.0125, explicit surface stop, analytic periapsis and numerical energy-drift checks. No external network, credentials, analytics, or user-data collection. Parent state and forks live only in the current page session.

## Deliberately excluded

Unverified funding/traction metrics from the old hero, NDA details, implied paper authorship, imagined DeepMind model contributions, guessed Grok PRs, flight-readiness claims, and NVIDIA affiliation. Further detail can be added when the author supplies it.

## Follow-up: OSIRIS and the simulation workbench

The author requested OSIRIS as the project name, `tanishanand@paxus.in` as the contact address, and these destinations: https://cal.com/tanishanand, https://x.com/sullaxive, https://linkedin.com/in/tanish-anand24. The old project and article URLs redirect to the renamed routes. The original archive image filename is retained.

Additional locally cached PNG marks use Google's favicon service for github.com, x.com, linkedin.com, cal.com, prolearn.app, palantir.com, claude.ai, raspberrypi.com, google.com, amd.com, youtube.com, vedantu.com, pw.live, timhortons.com, shell.com, gradcapital.in, and microsoft.com. These mark organizations and products already mentioned in the portfolio; they imply no additional affiliation. [ProLearn's own site](https://prolearn.app/privacy-policy) identifies Ravneet Singh Kathuria and establishes the matching company domain. Fetched 2026-08-31.

The orbital workbench still uses the same independent normalized model. Playback, vector readouts, velocity arrows, energy residuals, and JSON traces derive from the actual solver samples. The inclined camera projects the orbital plane; the alternate view is face-on. Camera scale fits the parent and branch trajectories. The energy plot explicitly uses automatic vertical scaling. Branch impulses are limited to ±50%. Playback starts only on request, pauses when the document is hidden or motion preferences change, and has a static scrub alternative. The JSON panel exposes the full trace on request without adding it to initial HTML. No separate lab, production API connection, deployment metric, or benchmark has been invented.
