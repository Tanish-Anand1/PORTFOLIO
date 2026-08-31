import { Children, cloneElement, isValidElement } from "react";

const organizations = {
  "google deepmind": "deepmind",
  "iit kanpur": "iitk",
  iitk: "iitk",
  "iit bombay": "iitb",
  vivacity: "vivacity",
  anduril: "anduril",
  inflection: "inflection",
  xai: "xai",
  grok: "xai",
  prolearn: "prolearn",
  palantir: "palantir",
  claude: "claude",
  "raspberry pi": "raspberrypi",
  "phi-3 mini": "microsoft",
  github: "github",
  linkedin: "linkedin",
  "cal.com": "cal",
  "google maps": "google",
  google: "google",
  amd: "amd",
  youtube: "youtube",
  vedantu: "vedantu",
  "physics wallah": "physicswallah",
  "tim hortons": "timhortons",
  shell: "shell",
  gradcapital: "gradcapital",
};
const pattern = new RegExp(
  `\\b(${Object.keys(organizations)
    .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})\\b`,
  "gi",
);

export function Brand({ name, children, inline = false }) {
  const ext = { vivacity: "svg", anduril: "svg", iitk: "ico" }[name] || "png";
  return (
    <span className={`brand${inline ? " brand-inline" : ""}`}>
      <img src={`/brands/${name}.${ext}`} width="19" height="19" alt="" />
      <strong>{children}</strong>
    </span>
  );
}

// Keep company marks consistent in project data and authored prose, including
// nested links. Existing Brand elements and code samples remain untouched.
export function CompanyText({ children }) {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(pattern).map((part, index) => {
        const name = organizations[part.toLowerCase()];
        return name ? (
          <Brand key={index} name={name} inline>
            {part}
          </Brand>
        ) : (
          part
        );
      });
    }
    if (
      isValidElement(child) &&
      typeof child.type === "string" &&
      child.props.children !== undefined &&
      !["code", "pre"].includes(child.type)
    ) {
      return cloneElement(
        child,
        {},
        <CompanyText>{child.props.children}</CompanyText>,
      );
    }
    return child;
  });
}
