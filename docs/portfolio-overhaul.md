# Running the redesigned portfolio

Source: `C:\PROJECTS\portfolio`. The Codex-attached directory at `C:\Users\Tanish Anand\Documents\ChatGPT\portfolio` was empty.

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run test:portfolio
npm run lint:portfolio
npm run build
npm run preview -- --host 127.0.0.1 --port 4280
node scripts/verify-site.mjs
```

The active entry point is `src/main.jsx`, importing the new site from `src/portfolio/`. Previous components and CSS remain in place so uncommitted prior work is preserved. The new design does not import the old theme or terminal mode.

The production build prerenders every route into `dist/<route>.html`. Each page contains readable HTML, a unique title, description, canonical URL, and Open Graph tags. No server runtime is needed in production. `vercel.json` enables clean URLs and basic security headers. Unknown routes use `dist/404.html`.

Pages: home, Vivacity, project index, research, work, writing, nine project pages, and four existing articles. Legacy `#writing` URLs redirect to their new paths. Native page navigation supports browser back/forward without a custom navigation state machine.

Simulation: fork, select a branch, verify, commit, rollback, reset. Larger positive impulses can produce escape trajectories; negative impulses can produce a surface collision. Both fail verification. Commit is unavailable before successful verification. The diagram and metrics are derived from the same simulated state.

Content sourcing and the few author-confirmation items are recorded in `portfolio-content-sources.md`. The Inflection program identity remains provisional. This redesign has not been published to the production domain.

The existing global lint script includes legacy components. `lint:portfolio` checks the complete active site and entry point without concealing unrelated historical lint errors.

See `portfolio-qa.md` for browser evidence and remaining verification limits.
