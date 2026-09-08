import { clearSessionCookie, hasValidSession, isWriterConfigured, json } from "../_writer-store.js";

export function GET(request) {
  return json({ configured: isWriterConfigured(), authenticated: hasValidSession(request) });
}

export function DELETE() {
  return json({ authenticated: false }, { headers: { "set-cookie": clearSessionCookie() } });
}
