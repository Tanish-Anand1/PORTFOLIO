import assert from "node:assert/strict";
import { after, beforeEach, mock, test } from "node:test";

// Exercise the real handlers against an isolated Blob double. No production data.
let stored;
let unavailable = false;
mock.module("@vercel/blob", { namedExports: {
  get: async () => {
    if (unavailable) throw new Error("storage unavailable");
    return stored ? { stream: new Response(JSON.stringify(stored)).body } : null;
  },
  put: async (_path, body) => {
    if (unavailable) throw new Error("storage unavailable");
    stored = JSON.parse(body);
    return { url: "https://test.public.blob.vercel-storage.com/test.json" };
  },
} });
const store = await import("../api/_writer-store.js");
const posts = await import("../api/admin/posts.js");
const login = await import("../api/admin/login.js");
const upload = await import("../api/admin/upload.js");
const publicPosts = await import("../api/posts.js");
const previousPassword = process.env.ADMIN_PASSWORD;
const previousToken = process.env.BLOB_READ_WRITE_TOKEN;
process.env.ADMIN_PASSWORD = "isolated-test-password";
process.env.BLOB_READ_WRITE_TOKEN = "isolated-test-token";
after(() => {
  if (previousPassword === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = previousPassword;
  if (previousToken === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
  else process.env.BLOB_READ_WRITE_TOKEN = previousToken;
});
beforeEach(() => { stored = store.emptyContent(); unavailable = false; });
const draft = { slug: "test-post", title: "Test post", summary: "A test summary", dateISO: "2026-09-08", body: ["First paragraph."] };
function request(body, { method = "POST", authenticated = true, origin = "https://portfolio.test" } = {}) {
  return new Request("https://portfolio.test/api/admin/posts", {
    method,
    headers: {
      "content-type": "application/json",
      origin,
      ...(authenticated ? { cookie: store.createSessionCookie().split(";")[0] } : {}),
    },
    ...(method === "GET" ? {} : { body: JSON.stringify(body) }),
  });
}
test("sessions accept signed cookies and reject tampering and expiry", () => {
  assert.equal(store.hasValidSession(request(null)), true);
  const forged = request(null);
  forged.headers.set("cookie", "__Host-ta-writer=forged.signature");
  assert.equal(store.hasValidSession(forged), false);
  const expired = request(null);
  const clock = mock.method(Date, "now", () => new Date("2040-01-01").getTime());
  assert.equal(store.hasValidSession(expired), false);
  clock.mock.restore();
  assert.match(store.createSessionCookie(), /HttpOnly; Secure; SameSite=Strict/);
});
test("all admin content and upload operations require authentication", async () => {
  assert.equal((await posts.GET(request(null, { method: "GET", authenticated: false }))).status, 401);
  assert.equal((await posts.POST(request(draft, { authenticated: false }))).status, 401);
  assert.equal((await posts.DELETE(request({ slug: draft.slug }, { method: "DELETE", authenticated: false }))).status, 401);
  assert.equal((await upload.POST(request(null, { authenticated: false }))).status, 401);
});
test("writes reject cross-origin requests including a different scheme", async () => {
  for (const origin of ["https://elsewhere.test", "http://portfolio.test", "null"]) {
    assert.equal((await posts.POST(request(draft, { origin }))).status, 403);
  }
});
test("login handles malformed values and distinguishes wrong and correct passwords", async () => {
  for (const body of [null, [], "password"]) assert.equal((await login.POST(request(body))).status, 400);
  assert.equal((await login.POST(request({ password: "wrong" }))).status, 401);
  const response = await login.POST(request({ password: "isolated-test-password" }));
  assert.equal(response.status, 200);
  assert.ok(response.headers.get("set-cookie"));
});
test("post validation rejects impossible dates, empty content and unsafe image URLs", () => {
  for (const dateISO of ["2026-02-30", "2026-13-01", "not-a-date"]) assert.ok(store.validatePost({ ...draft, dateISO }).error);
  assert.ok(store.validatePost({ ...draft, dateISO: "2024-02-29" }).post);
  assert.ok(store.validatePost({ ...draft, body: [] }).error);
  assert.ok(store.validatePost({ ...draft, media: { images: [{ src: "javascript:alert(1)" }] } }).error);
});
test("saving the same slug replaces it once and public reads return the update", async () => {
  assert.equal((await posts.POST(request(draft))).status, 200);
  assert.equal((await posts.POST(request({ ...draft, title: "Revised", previousSlug: draft.slug }))).status, 200);
  const response = await publicPosts.GET();
  const value = await response.json();
  assert.equal(value.posts.length, 1);
  assert.equal(value.posts[0].title, "Revised");
  assert.equal(response.headers.get("cache-control"), "no-store");
});
test("renaming replaces the previous slug; deleting new content leaves no tombstone", async () => {
  await posts.POST(request(draft));
  await posts.POST(request({ ...draft, slug: "renamed", previousSlug: draft.slug }));
  assert.deepEqual(stored.posts.map((post) => post.slug), ["renamed"]);
  assert.ok(stored.deletedSlugs.includes(draft.slug));
  await posts.DELETE(request({ slug: "renamed", hideStaticPost: false }, { method: "DELETE" }));
  assert.equal(stored.posts.length, 0);
  assert.ok(!stored.deletedSlugs.includes("renamed"));
});
test("deleting static content records a tombstone and republishing restores it", async () => {
  await posts.DELETE(request({ slug: draft.slug, hideStaticPost: true }, { method: "DELETE" }));
  assert.deepEqual(stored.deletedSlugs, [draft.slug]);
  await posts.POST(request(draft));
  assert.deepEqual(stored.deletedSlugs, []);
});
test("malformed delete and post requests fail without touching stored content", async () => {
  assert.equal((await posts.DELETE(request(null, { method: "DELETE" }))).status, 400);
  assert.equal((await posts.POST(request(null))).status, 400);
  assert.deepEqual(stored, store.emptyContent());
});
test("storage failures return recoverable errors", async () => {
  unavailable = true;
  assert.equal((await posts.POST(request(draft))).status, 503);
  assert.equal((await publicPosts.GET()).status, 503);
});
