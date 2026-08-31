import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
try {
  const { render, routeList, routeMeta, site } = await server.ssrLoadModule(
    "/src/portfolio/entry-server.jsx",
  );
  const template = await readFile(resolve("dist/index.html"), "utf8");
  for (const path of [...routeList, "/404"]) {
    const { title, description } = routeMeta(path);
    const url = `${site.url}${path === "/" ? "/" : path}`;
    const html = template
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(description)}" />`,
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
        `<meta property="og:title" content="${escape(title)}" />`,
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
        `<meta property="og:description" content="${escape(description)}" />`,
      )
      .replace(
        /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
        `<meta property="og:url" content="${url}" />`,
      )
      .replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
        `<link rel="canonical" href="${url}" />`,
      )
      .replace(
        '<div id="root"></div>',
        () => `<div id="root">${render(path)}</div>`,
      );
    // Flat HTML matches both Vite's preview fallback and Vercel cleanUrls.
    const destination = resolve(
      "dist",
      path === "/" ? "index.html" : `.${path}.html`,
    );
    await mkdir(resolve(destination, ".."), { recursive: true });
    await writeFile(
      destination,
      path === "/404"
        ? html.replace('content="index, follow"', 'content="noindex, follow"')
        : html,
    );
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routeList.map((path) => `\n  <url><loc>${site.url}${path === "/" ? "/" : path}</loc></url>`).join("")}\n</urlset>\n`;
  await writeFile(resolve("dist/sitemap.xml"), sitemap);
  // Standalone preview hosts also preserve old links without JavaScript.
  const redirects = JSON.parse(await readFile("vercel.json", "utf8")).redirects;
  for (const { source, destination } of redirects) {
    await writeFile(
      resolve("dist", `.${source}.html`),
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${site.url}${destination}"><title>OSIRIS | Tanish Anand</title></head><body><a href="${destination}">Continue to OSIRIS</a></body></html>`,
    );
  }
  console.log(`Prerendered ${routeList.length} pages and a 404 page.`);
} finally {
  await server.close();
}
