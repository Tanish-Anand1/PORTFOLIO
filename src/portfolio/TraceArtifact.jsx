import { useId, useRef, useState } from "react";
import { DT } from "./orbit.js";

export default function TraceArtifact({ parent, trace, branch, report }) {
  const id = useId();
  const input = useRef(null);
  const [message, setMessage] = useState("");
  const artifact = JSON.stringify(
    {
      experiment: "Vivacity portfolio / orbital dynamics",
      implementation: "Independent browser model",
      integrator: "velocity-verlet",
      units: { mu: 1, bodyRadius: 1, time: "dimensionless" },
      dt: DT,
      parent,
      branch,
      trace,
      verification: report,
    },
    null,
    2,
  );
  return (
    <div className="trace-artifact">
      <div className="diagnostic-heading">
        <label htmlFor={id}>Reproducible trace / JSON</label>
        <span>{trace.points.length.toLocaleString("en-US")} states</span>
      </div>
      <textarea
        id={id}
        ref={input}
        readOnly
        value={artifact}
        spellCheck="false"
      />
      <div className="trace-copy-row">
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(artifact);
              setMessage("Trace copied as JSON.");
            } catch {
              input.current.focus();
              input.current.select();
              setMessage(
                "Trace selected. Press Ctrl+C or use your device’s copy command.",
              );
            }
          }}
        >
          Copy JSON
        </button>
        <span role="status">
          {message ||
            "Initial state, solver settings, every sample, and verification."}
        </span>
      </div>
    </div>
  );
}
