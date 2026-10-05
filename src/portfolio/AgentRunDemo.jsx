import { useMemo, useState } from "react";
import OrbitViewport from "./OrbitViewport.jsx";
import TraceArtifact from "./TraceArtifact.jsx";
import {
  INITIAL_STATE,
  chooseSafeBranch,
  commitBranch,
  forkWorld,
  simulate,
  verify,
} from "./orbit.js";

const ATTEMPT_IMPULSE = -25;
const POLICY =
  "Try the requested braking action; if it fails, compare sibling branches and choose the strongest braking action that passes every check.";

function runPolicy() {
  const attempt = simulate(INITIAL_STATE, ATTEMPT_IMPULSE);
  const attemptReport = verify(attempt);
  const branches = forkWorld(INITIAL_STATE, ATTEMPT_IMPULSE).map((branch) => ({
    ...branch,
    report: verify(branch.trace),
  }));
  const selected = chooseSafeBranch(branches);
  const selectedIndex = selected ? branches.indexOf(selected) : -1;

  return {
    parent: INITIAL_STATE,
    attempt,
    attemptReport,
    branches,
    selectedIndex,
    committed: false,
    finalState: null,
  };
}

export default function AgentRunDemo() {
  const [run, setRun] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showTrace, setShowTrace] = useState(false);
  const parentTrace = useMemo(() => simulate(INITIAL_STATE), []);
  const selected = run?.branches[selectedIndex ?? run.selectedIndex] || null;
  const failedChecks = run?.attemptReport.checks.filter((check) => !check.pass) || [];

  function startRun() {
    const next = runPolicy();
    setRun(next);
    setSelectedIndex(next.selectedIndex);
    setShowTrace(false);
  }

  function commitSelected() {
    if (!run || !selected?.report.passed) return;
    setRun({
      ...run,
      committed: true,
      finalState: commitBranch(selected, selected.report),
    });
  }

  const lineage = run
    ? {
        policy: POLICY,
        parent: run.parent,
        initialAction: {
          impulsePercent: ATTEMPT_IMPULSE,
          verification: run.attemptReport,
        },
        persistence: "Ephemeral in-browser run; not saved to a production backend.",
        branches: run.branches.map(({ id, trace, report }) => ({
          id,
          impulsePercent: trace.impulse,
          energy: trace.energy,
          periapsis: trace.periapsis,
          collision: trace.collision,
          verification: report,
        })),
        selectedBranch: selected?.id || null,
        committedState: run.finalState,
      }
    : null;

  return (
    <section id="agent-run" className="agent-run" aria-labelledby="agent-run-title">
      <p className="experiment-kicker mono">PRODUCT RUN / BROWSER-SIDE</p>
      <h2 id="agent-run-title">An action. A bad outcome. A better branch.</h2>
      <p className="agent-run-intro">
        Run the same small world through an explicit safety policy. The orbital
        dynamics and checks execute in this browser; the policy is illustrative,
        fixed logic, not an LLM, deployed Vivacity runtime, or customer run. The
        run is ephemeral and is not saved to a backend.
      </p>
      <div className="agent-run-labels" aria-label="Run scope">
        <span><i aria-hidden="true" /> Live here: physics, branches, checks, replay, trace</span>
        <span><i aria-hidden="true" /> Illustrative: the rule-based agent policy</span>
      </div>

      <button className="button agent-run-start" onClick={startRun}>
        {run ? "Replay the policy run" : "Run the illustrative policy"}
        <span aria-hidden="true"> ↗</span>
      </button>

      {run && (
        <>
        <p className="sr-only" role="status">
          {run.committed
            ? `${selected?.id || "Selected branch"} committed to the in-browser world state.`
            : selected
              ? `Initial action rejected. ${selected.id} selected; ${selected.report.passed ? "all checks pass and it is ready to commit" : "checks fail and it cannot be committed"}.`
              : "Initial action rejected. No branch passes; the world state is unchanged."}
        </p>
        <div className="agent-run-results">
          <ol className="agent-lineage">
            <li>
              <span className="mono">PARENT</span>
              <span>local parent · circular orbit · rₚ {parentTrace.periapsis.toFixed(3)} R</span>
            </li>
            <li className={run.attemptReport.passed ? "is-pass" : "is-fail"}>
              <span className="mono">ACTION</span>
              <span>
                Try Δv {ATTEMPT_IMPULSE}% · {run.attemptReport.passed ? "passes checks" : `rejected: ${failedChecks.map((check) => check.name.toLowerCase()).join(", ")}`}
              </span>
            </li>
            <li>
              <span className="mono">FORK</span>
              <span>Three alternatives from the same parent state</span>
            </li>
            <li className={selected?.report.passed ? "is-pass" : "is-fail"}>
              <span className="mono">SELECT</span>
              <span>
                {selected
                  ? `${selected.id} · Δv ${selected.trace.impulse}% · ${selected.report.passed ? "all checks pass" : "checks fail"}`
                  : "No branch passes; world state remains unchanged."}
              </span>
            </li>
            <li className={run.committed ? "is-pass" : "is-pending"}>
              <span className="mono">COMMIT</span>
              <span>
                {run.committed
                  ? `${selected.id} became the new parent state.`
                  : "Review the selected branch before changing the parent."}
              </span>
            </li>
          </ol>

          <div className="agent-branches" role="group" aria-label="Compare counterfactual branches">
            {run.branches.map((branch, index) => (
              <button
                key={branch.id}
                className="agent-branch"
                aria-pressed={(selectedIndex ?? run.selectedIndex) === index}
                disabled={run.committed}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="mono">{branch.id}</span>
                <strong>Δv {branch.trace.impulse}%</strong>
                <span>{branch.report.passed ? "PASS · 3 checks" : "REJECTED · check failed"}</span>
                <small>rₚ {branch.trace.periapsis.toFixed(3)} R · E {branch.trace.energy.toFixed(4)}</small>
              </button>
            ))}
          </div>

          {selected?.report.passed && (
            <button
              className="agent-commit"
              disabled={run.committed}
              onClick={commitSelected}
            >
              {run.committed
                ? `Committed ${selected.id} to the world`
                : `Commit ${selected.id} to the world`}
            </button>
          )}

          {run.committed && selected && (
            <>
              <p className="agent-committed-state">
                New parent state · x {run.finalState.x.toFixed(4)} · y {run.finalState.y.toFixed(4)} · vₓ {run.finalState.vx.toFixed(4)} · vᵧ {run.finalState.vy.toFixed(4)}
              </p>
              <p className="agent-replay-hint">
                Replay the committed branch on the timeline. Every sample below is generated by the same browser simulation.
              </p>
              <OrbitViewport
                key={`${selected.id}-${run.finalState.x}-${run.finalState.y}`}
                trace={selected.trace}
                parentTrace={parentTrace}
                branches={run.branches}
                selected={selectedIndex ?? run.selectedIndex}
                compact={false}
              />
              <button
                className="export-trace"
                aria-expanded={showTrace}
                onClick={() => setShowTrace((visible) => !visible)}
              >
                {showTrace ? "Hide run trace" : "Inspect run trace / lineage"}
              </button>
              {showTrace && (
                <TraceArtifact
                  parent={run.parent}
                  trace={selected.trace}
                  branch={selected.id}
                  report={selected.report}
                  lineage={lineage}
                />
              )}
            </>
          )}
        </div>
        </>
      )}
    </section>
  );
}
