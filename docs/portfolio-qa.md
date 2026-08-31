# Portfolio verification

Verified 2026-08-31 against the production build at `http://127.0.0.1:4280`.

## Passed

- Production build: 19 prerendered routes and a 404 document.
- `npm run lint:portfolio`: complete active site and entry point.
- `npm run test:portfolio`: 5 tests covering energy/radius conservation, collision, escape, independent forks, commit gating, and invalid impulse input.
- `node scripts/verify-site.mjs`: 19 real HTTP routes with their own prerendered HTML, unique titles/descriptions, canonical URLs, one h1, local assets, internal destinations, and no em/en dashes in rendered text.
- Browser: homepage fork, branch selection, positive verification, commit, rollback, reset, collision rejection, escape rejection, project filters, search, empty-state recovery, research/writing navigation, and browser back.
- Browser: all 9 project pages and all 4 article pages at 320 px; document width remained inside the viewport. Home and index at 390 px. Desktop homepage and Vivacity inspected visually.
- Clean production hydration and no console errors on the final checked pages.
- Downloaded brand assets render locally. Real project photographs and OSIRIS capture render.
- `npm audit` and production dependency audit: zero known vulnerabilities after compatible fixes.
- `git diff --check`: no whitespace errors in changed tracked files; Windows line-ending warnings only.

## Defect found and fixed

Vite preview served homepage HTML at extensionless routes when the first prerender implementation generated directory indexes. Output now uses `<route>.html`, matching Vite preview and Vercel clean URLs. The HTTP suite checks the title and description from the response body, preventing this from being hidden by client rendering.

## Limits

- Not deployed to the live domain. Local production preview is the verified environment.
- Inflection program identity and favicon attribution need author confirmation. Personal affiliations are author-provided; external company links do not independently verify them.
- Native keyboard activation could not be confirmed through this browser automation surface: controls received focus, but native Enter/range-arrow default actions did not execute. The implementation uses native anchors, buttons, select, and range controls with visible focus. A manual keyboard-only pass remains required; pointer and select interactions were exercised.
- Screen-reader, forced-colors, and OS reduced-motion behavior have not been exercised live. Semantic landmarks, names, status feedback, and CSS fallbacks are implemented.
- Lighthouse and field performance were not measured. Fonts are self-hosted and there is no autoplay video or production API dependency. See the follow-up below for current bundle sizes.
- Legacy `npm run lint` still includes old components and generated artifacts. It is not represented as passing. The active site has its own scoped lint script.
- The local two-body simulation illustrates the runtime contract. It does not connect to Vivacity's production service or implement the other backend families.

## Follow-up verification: OSIRIS, contacts, and workbench

Verified again on 2026-08-31 at the same production preview, port 4280.

- OSIRIS appears in project listings, the case study, article titles and bodies, metadata, sitemap, resume, and discovery files. Both old clean URLs redirect successfully in the real browser. Vercel permanent redirects are configured but not deployed.
- Supplied email, booking, X, and LinkedIn destinations appear in homepage contact links and the shared footer. Company marks render from local assets in prose as well as the primary affiliation rows.
- All 19 routes checked again at 320 px: no horizontal overflow, detected broken images, or obsolete visible Rudra references. Desktop and 390 px home/workbench visuals inspected.
- Playback advances the actual sampled time and SVG marker. Camera changes preserve the selected time. The playhead reaches the horizon and stops.
- A native-range webview issue was reproduced: a pointer click did not change the playhead. Explicit pointer and keyboard handling now synchronizes state and the thumb. Verified midpoint click (time 10.000), Home (0.000), ArrowRight (0.0125, displayed 0.013), and End on an impact trajectory. General keyboard-only navigation remains subject to the earlier limitation.
- Verified passing branch commit changes position to x=1.42258, y=-1.22795, and rollback restores x=1.80000, y=0.00000. A surface-impact branch stops at 230 steps and r=0.994 R; commit is disabled. An escape branch fails the bound-orbit check and cannot commit.
- Trace panel exposes valid JSON containing solver, units, input state, all 1,601 samples, impulse, and verification. The Copy JSON success state was exercised. Independent host-clipboard readback is unavailable through the browser bridge, so clipboard persistence is not claimed as independently verified. A blob-download experiment was removed after the embedded browser could not complete it; inspection and copy are the supported interface.
- Current client bundle is approximately 83.6 kB gzip, CSS 6.8 kB gzip. Continuous playback updates instrument DOM refs instead of rerendering the React page each frame. No autoplay.
