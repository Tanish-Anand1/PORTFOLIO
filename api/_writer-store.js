import { createHmac, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";

export const CONTENT_PATH = "writer-desk/posts.json";
export const SESSION_COOKIE = "__Host-ta-writer";
const MAX_AGE_SECONDS = 60 * 60 * 12;

export const emptyContent = () => ({ posts: [], deletedSlugs: [], updatedAt: null });

export function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function isWriterConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.ADMIN_PASSWORD);
}

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function cookieMap(request) {
  return Object.fromEntries(
    (request.headers.get("cookie") || "")
      .split(";")
      .map((part) => part.trim().split(/=(.*)/s))
      .filter(([key]) => key),
  );
}

function sessionSignature(payload) {
  return createHmac("sha256", process.env.ADMIN_PASSWORD).update(payload).digest("base64url");
}

export function createSessionCookie() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS }),
  ).toString("base64url");
  return `${SESSION_COOKIE}=${payload}.${sessionSignature(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function hasValidSession(request) {
  if (!isWriterConfigured()) return false;
  const token = cookieMap(request)[SESSION_COOKIE];
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sessionSignature(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function passwordMatches(password) {
  if (!isWriterConfigured() || typeof password !== "string") return false;
  const submitted = Buffer.from(password);
  const expected = Buffer.from(process.env.ADMIN_PASSWORD);
  return submitted.length === expected.length && timingSafeEqual(submitted, expected);
}

export async function readContent() {
  if (!isBlobConfigured()) return emptyContent();
  const result = await get(CONTENT_PATH, { access: "public", useCache: false });
  if (!result || !result.stream) return emptyContent();
  const value = await new Response(result.stream).json();
  return {
    posts: Array.isArray(value.posts) ? value.posts : [],
    deletedSlugs: Array.isArray(value.deletedSlugs) ? value.deletedSlugs : [],
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : null,
  };
}

export async function writeContent(content) {
  const next = { ...content, updatedAt: new Date().toISOString() };
  await put(CONTENT_PATH, JSON.stringify(next), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });
  return next;
}

export function requireAdmin(request) {
  return hasValidSession(request)
    ? null
    : json({ error: "Sign in to manage writing." }, { status: 401 });
}

export function requireSameOriginWrite(request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    return new URL(origin).origin === new URL(request.url).origin
      ? null
      : json({ error: "This request must come from the writer desk." }, { status: 403 });
  } catch {
    return json({ error: "This request must come from the writer desk." }, { status: 403 });
  }
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imageUrlPattern = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;

export function validatePost(value) {
  if (!value || typeof value !== "object") return { error: "Post data is required." };
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const slug = typeof value.slug === "string" ? value.slug.trim().toLowerCase() : "";
  const summary = typeof value.summary === "string" ? value.summary.trim() : "";
  const dateISO = typeof value.dateISO === "string" ? value.dateISO : "";
  const body = Array.isArray(value.body)
    ? value.body.map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : "")).filter(Boolean)
    : [];
  const images = Array.isArray(value.media?.images)
    ? value.media.images
        .map((image) => ({
          src: typeof image?.src === "string" ? image.src : "",
          alt: typeof image?.alt === "string" ? image.alt.trim() : "",
          caption: typeof image?.caption === "string" ? image.caption.trim() : "",
        }))
        .filter((image) => image.src)
    : [];
  if (!slugPattern.test(slug)) return { error: "Use lowercase letters, numbers, and hyphens in the URL slug." };
  if (!title || title.length > 160) return { error: "Title must be between 1 and 160 characters." };
  if (!summary || summary.length > 360) return { error: "Summary must be between 1 and 360 characters." };
  const publishedDate = new Date(`${dateISO}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO) || !Number.isFinite(publishedDate.getTime()) || publishedDate.toISOString().slice(0, 10) !== dateISO) {
    return { error: "Use a valid published date." };
  }
  if (!body.length || body.length > 60 || body.some((paragraph) => paragraph.length > 4000)) {
    return { error: "Use 1 to 60 sensible paragraphs." };
  }
  if (images.length > 12 || images.some((image) => !imageUrlPattern.test(image.src))) {
    return { error: "Images must come from this writer desk and cannot exceed 12 per post." };
  }
  return {
    post: {
      slug,
      year: dateISO.slice(0, 4),
      title,
      summary,
      dateISO,
      dateLabel: `Published · ${dateISO}`,
      body,
      media: images.length ? { images } : undefined,
      managed: true,
    },
  };
}
