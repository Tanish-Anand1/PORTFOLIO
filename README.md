# Tanish Anand

A black, multipage portfolio for research, AI systems, and robotics. Built with React and Vite, prerendered to static HTML, with self-hosted Geist fonts and a local orbital simulation.

## Development

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## Verification

```sh
npm run lint:portfolio
npm run test:portfolio
npm run build
npm run preview -- --host 127.0.0.1 --port 4280
node scripts/verify-site.mjs
```

## Source

- `src/portfolio/PortfolioApp.jsx`: homepage, indexes, case studies, research, work, and writing.
- `src/portfolio/content.js`: project descriptions, route metadata, and preserved writing.
- `src/portfolio/OrbitSimulation.jsx`: interactive fork, verify, commit, rollback workflow.
- `src/portfolio/OrbitViewport.jsx`: trajectory playback, camera projections, live telemetry, and residual chart.
- `src/portfolio/SimulationRange.jsx`: synchronized pointer and keyboard scrubbing.
- `src/portfolio/TraceArtifact.jsx`: inspectable, copyable simulation JSON.
- `src/portfolio/Brand.jsx`: consistent local company marks in headings, links, and prose.
- `src/portfolio/orbit.js`: two-body model and verification rules.
- `src/portfolio/portfolio.css`: responsive design and accessibility states.
- `scripts/prerender.mjs`: generates 19 HTML pages, metadata, sitemap, and 404 document.

The earlier portfolio components remain in the repository but are not imported by the active site.

## Notes

- [Run and deployment details](docs/portfolio-overhaul.md)
- [Content sources and asset provenance](docs/portfolio-content-sources.md)
- [Verification results and limits](docs/portfolio-qa.md)

The simulation runs locally in the browser. It illustrates Vivacity's runtime loop and does not connect to the production API. The live domain has not been updated by this redesign task.
