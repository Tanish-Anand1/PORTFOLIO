import { put } from "@vercel/blob";
import { json, requireAdmin, requireSameOriginWrite } from "../_writer-store.js";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxBytes = 5 * 1024 * 1024;

export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const invalidOrigin = requireSameOriginWrite(request);
  if (invalidOrigin) return invalidOrigin;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !acceptedTypes.has(file.type) || file.size > maxBytes) {
      return json({ error: "Upload a JPG, PNG, WebP, or GIF smaller than 5 MB." }, { status: 400 });
    }
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-") || "image";
    const blob = await put(`writer-desk/images/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return json({ image: { src: blob.url, alt: "", caption: "" } }, { status: 201 });
  } catch {
    return json({ error: "Upload failed. Try a smaller image." }, { status: 503 });
  }
}
