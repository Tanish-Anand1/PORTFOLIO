import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./portfolio/portfolio.css";
import App from "./portfolio/PortfolioApp.jsx";

// Preserve the original writing URLs while giving every new page its own URL.
const legacyPath = window.location.hash.replace(/^#\/?/, "");
const renamedPaths = {
  "/projects/rudra": "/projects/osiris",
  "/writing/rudra-camera-ingest": "/writing/osiris-camera-ingest",
};
const renamed = renamedPaths[window.location.pathname.replace(/\/$/, "")];
if (renamed) {
  window.location.replace(
    `${renamed}${window.location.search}${window.location.hash}`,
  );
} else if (
  window.location.pathname === "/" &&
  /^writing(?:\/|$)/.test(legacyPath)
) {
  window.location.replace(`/${legacyPath}`);
} else {
  const root = document.getElementById("root");
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
