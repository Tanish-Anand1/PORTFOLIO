import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { routeList, routeMeta, site } from "../src/portfolio/content.js";

const base = (process.argv[2] || process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:4280").replace(/\/$/, "");
console.log(`Verifying ${base}`);
const titles = new Set();
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
for (const route of routeList) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, `${route}: HTTP status`);
  const html = await response.text();
  const meta = routeMeta(route);
  assert.ok(
    html.includes(`<title>${escape(meta.title)}</title>`),
    `${route}: wrong title or wrong HTML fallback`,
  );
  assert.ok(
    html.includes(`name="description" content="${escape(meta.description)}"`),
    `${route}: wrong description`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="${site.url}${route}"`),
    `${route}: wrong canonical`,
  );
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route}: expected one h1`,
  );
  assert.ok(!titles.has(meta.title), `${route}: duplicate title`);
  titles.add(meta.title);
  const content = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, "");
  for (const [image] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image, /\bsrc="[^"]+"/, `${route}: image has no source`);
    assert.match(image, /\balt="[^"]*"/, `${route}: image has no alternative text`);
  }
  assert.ok(!/\brudra\b/i.test(content), `${route}: obsolete project name`);
  for (const href of [
    site.emailUrl,
    site.booking,
    site.github,
    site.twitter,
    site.linkedin,
  ]) {
    assert.ok(
      html.includes(`href="${href}"`),
      `${route}: missing contact link ${href}`,
    );
  }
  for (const href of site.metadataLinks) {
    assert.ok(
      html.includes(href),
      `${route}: missing official link from metadata ${href}`,
    );
  }
  const staticSchemaMatch = html.match(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
  );
  assert.ok(staticSchemaMatch, `${route}: missing static JSON-LD metadata`);
  const staticSchema = JSON.parse(staticSchemaMatch[1]);
  const profilePage = staticSchema["@graph"].find(
    (item) => item["@type"] === "ProfilePage",
  );
  assert.deepEqual(
    profilePage?.relatedLink,
    site.metadataLinks,
    `${route}: incomplete official-link metadata`,
  );
  const removedCompanyTerms = [
    String.fromCharCode(120, 65, 73),
    String.fromCharCode(71, 114, 111, 107),
  ];
  assert.ok(
    removedCompanyTerms.every(
      (term) => !html.toLowerCase().includes(term.toLowerCase()),
    ),
    `${route}: removed company content remains in rendered HTML`,
  );
  assert.ok(
    !/[\u2014\u2013]/.test(content),
    `${route}: banned dash in content`,
  );
  for (const [, src] of html.matchAll(/(?:src|href)="(\/[^"#?]*)[^"]*"/g)) {
    if (routeList.includes(src) || src === "/") continue;
    await access(resolve("dist", `.${src}`)).catch(() =>
      assert.fail(`${route}: missing local asset or route ${src}`),
    );
  }
}
const missing = await readFile("dist/404.html", "utf8");
const vivacity = await readFile("dist/vivacity.html", "utf8");
assert.ok(
  vivacity.includes("Inclined") && vivacity.includes("Orbital plane"),
  "/vivacity: missing simulation camera scenes",
);
assert.ok(
  !vivacity.includes("vivacity-lab.glb"),
  "/vivacity: obsolete Blender asset reference",
);
for (const [oldPath, target] of [
  ["/projects/rudra", "/projects/osiris"],
  ["/writing/rudra-camera-ingest", "/writing/osiris-camera-ingest"],
]) {
  const response = await fetch(`${base}${oldPath}`, { redirect: "manual" });
  if ([301, 302, 307, 308].includes(response.status)) {
    assert.equal(new URL(response.headers.get("location"), base).pathname, target, `${oldPath}: wrong redirect`);
  } else {
    assert.equal(response.status, 200, `${oldPath}: redirect page status`);
    assert.ok((await response.text()).includes(`url=${target}`), `${oldPath}: missing legacy redirect`);
  }
}
assert.ok(
  missing.includes("Page not found") && missing.includes("noindex, follow"),
);
console.log(
  `PASS: ${routeList.length} real HTTP routes at ${base}; prerendered content, unique metadata, local assets, links, and copy checks.`,
);
