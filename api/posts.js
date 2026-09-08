import { emptyContent, isBlobConfigured, json, readContent } from "./_writer-store.js";

export async function GET() {
  if (!isBlobConfigured()) return json(emptyContent());
  try {
    return json(await readContent());
  } catch {
    return json({ error: "Writing is temporarily unavailable." }, { status: 503 });
  }
}
