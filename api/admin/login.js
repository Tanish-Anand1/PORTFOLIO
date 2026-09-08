import { createSessionCookie, isWriterConfigured, json, passwordMatches, requireSameOriginWrite } from "../_writer-store.js";

export async function POST(request) {
  const invalidOrigin = requireSameOriginWrite(request);
  if (invalidOrigin) return invalidOrigin;
  if (!isWriterConfigured()) {
    return json({ error: "Writer desk is not configured yet." }, { status: 503 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send a valid password." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: "Send a valid password." }, { status: 400 });
  }
  if (!passwordMatches(body.password)) return json({ error: "That password is not right." }, { status: 401 });
  return json({ authenticated: true }, { headers: { "set-cookie": createSessionCookie() } });
}
