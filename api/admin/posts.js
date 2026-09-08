import { json, readContent, requireAdmin, requireSameOriginWrite, validatePost, writeContent } from "../_writer-store.js";

export async function GET(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    return json(await readContent());
  } catch {
    return json({ error: "Could not load writing." }, { status: 503 });
  }
}

export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const invalidOrigin = requireSameOriginWrite(request);
  if (invalidOrigin) return invalidOrigin;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send valid post data." }, { status: 400 });
  }
  const result = validatePost(body);
  if (result.error) return json({ error: result.error }, { status: 400 });
  const previousSlug = typeof body.previousSlug === "string" ? body.previousSlug.trim().toLowerCase() : null;
  if (previousSlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(previousSlug)) {
    return json({ error: "Invalid previous post slug." }, { status: 400 });
  }
  try {
    const current = await readContent();
    const removedSlugs = new Set([result.post.slug]);
    if (previousSlug && previousSlug !== result.post.slug) removedSlugs.add(previousSlug);
    const next = {
      ...current,
      posts: [result.post, ...current.posts.filter((post) => !removedSlugs.has(post.slug))],
      deletedSlugs: [
        ...current.deletedSlugs.filter((slug) => slug !== result.post.slug),
        ...(previousSlug && previousSlug !== result.post.slug ? [previousSlug] : []),
      ],
    };
    return json(await writeContent(next));
  } catch {
    return json({ error: "Could not save this post." }, { status: 503 });
  }
}

export async function DELETE(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const invalidOrigin = requireSameOriginWrite(request);
  if (invalidOrigin) return invalidOrigin;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send the post slug to remove." }, { status: 400 });
  }
  const slug = typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const hideStaticPost = body?.hideStaticPost === true;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return json({ error: "Invalid post slug." }, { status: 400 });
  try {
    const current = await readContent();
    const next = {
      ...current,
      posts: current.posts.filter((post) => post.slug !== slug),
      deletedSlugs: hideStaticPost
        ? [...new Set([...current.deletedSlugs, slug])]
        : current.deletedSlugs.filter((deletedSlug) => deletedSlug !== slug),
    };
    return json(await writeContent(next));
  } catch {
    return json({ error: "Could not remove this post." }, { status: 503 });
  }
}
