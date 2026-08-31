import { useMemo, useReducer, useId, useState } from "react";
import OrbitViewport from "./OrbitViewport.jsx";
import { Brand } from "./Brand.jsx";
import SimulationRange from "./SimulationRange.jsx";
import TraceArtifact from "./TraceArtifact.jsx";
import {
  INITIAL_STATE,
  simulate,
  verify,
  forkWorld,
  commitBranch,
} from "./orbit.js";

const initial = {
  revision: 0,
  parent: INITIAL_STATE,
  previous: null,
  branches: [],
  selected: 1,
  impulse: 10,
  report: null,
  message: "A circular orbit. Change the velocity, then compare the futures.",
};

function reducer(state, action) {
  switch (action.type) {
    case "impulse":
      return {
        ...state,
        impulse: action.value,
        branches: [],
        report: null,
        message:
          "Impulse updated. Fork to simulate three alternatives from the same parent.",
      };
    case "fork":
      return {
        ...state,
        branches: forkWorld(state.parent, state.impulse),
        revision: state.revision + 1,
        selected: 1,
        report: null,
        message:
          "Three branches simulated from one state. Select a branch to inspect it.",
      };
    case "select":
      return {
        ...state,
        selected: action.value,
        report: null,
        message: `Branch ${action.value + 1} selected. Verify it before committing.`,
      };
    case "verify": {
      if (!state.branches.length) return state;
      const report = verify(state.branches[state.selected].trace);
      return {
        ...state,
        report,
        message: report.passed
          ? "All three checks passed. This branch can be committed."
          : "Verification failed. The parent is unchanged. Choose another branch or reduce the impulse.",
      };
    }
    case "commit": {
      if (!state.report?.passed) return state;
      return {
        ...state,
        previous: state.parent,
        revision: state.revision + 1,
        parent: commitBranch(state.branches[state.selected], state.report),
        branches: [],
        report: null,
        message:
          "Branch committed. Its endpoint is the new parent state. Rollback restores the previous parent.",
      };
    }
    case "rollback":
      return state.previous
        ? {
            ...state,
            parent: state.previous,
            revision: state.revision + 1,
            previous: null,
            branches: [],
            report: null,
            message:
              "Previous parent restored. The committed branch has been rolled back.",
          }
        : state;
    case "reset":
      return { ...initial, revision: state.revision + 1 };
    default:
      return state;
  }
}

export default function OrbitSimulation({ compact = false }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [showTrace, setShowTrace] = useState(false);
  const id = useId();
  const parentTrace = useMemo(() => simulate(state.parent), [state.parent]);
  const trace = state.branches[state.selected]?.trace || parentTrace;
  return (
    <div className={`simulation ${compact ? "simulation-compact" : ""}`}>
      <div className="sim-heading">
        <span>
          <Brand name="vivacity">Vivacity</Brand>
          <span className="sim-experiment-name"> / Orbital dynamics</span>
        </span>
        <span className="mono">EXPERIMENT 001</span>
      </div>
      <OrbitViewport
        key={`${state.revision}-${state.branches.length}-${state.selected}-${state.impulse}`}
        trace={trace}
        parentTrace={parentTrace}
        branches={state.branches}
        selected={state.selected}
        compact={compact}
      />
      <dl className="sim-metrics">
        <div>
          <dt>Specific energy</dt>
          <dd>{trace.energy.toFixed(4)}</dd>
        </div>
        <div>
          <dt>Eccentricity</dt>
          <dd>{trace.eccentricity.toFixed(3)}</dd>
        </div>
        <div>
          <dt>Periapsis</dt>
          <dd>
            {trace.periapsis.toFixed(3)} <small>R</small>
          </dd>
        </div>
      </dl>
      {!compact && (
        <div className="impulse-control">
          <label className="scenario-control" htmlFor={`${id}-scenario`}>
            Scenario
            <select
              id={`${id}-scenario`}
              value={
                [-35, 10, 45].includes(state.impulse) ? state.impulse : "custom"
              }
              onChange={(e) =>
                dispatch({ type: "impulse", value: Number(e.target.value) })
              }
            >
              <option value="10">Bound orbit (+10%)</option>
              <option value="-35">Surface impact (-35%)</option>
              <option value="45">Escape (+45%)</option>
              <option value="custom" disabled>
                Custom impulse
              </option>
            </select>
          </label>
          <label htmlFor={`${id}-impulse`}>
            Velocity impulse{" "}
            <span>
              {state.impulse > 0 ? "+" : ""}
              {state.impulse}%
            </span>
          </label>
          <SimulationRange
            id={`${id}-impulse`}
            min={-35}
            max={45}
            step={1}
            value={state.impulse}
            onValueChange={(value) => dispatch({ type: "impulse", value })}
          />
          <p>
            Each fork tests the selected impulse and two alternatives offset by
            ±12 percentage points. Branch impulses are capped at ±50%.
          </p>
        </div>
      )}
      <div className="sim-actions">
        <button
          className="button small"
          onClick={() => dispatch({ type: "fork" })}
        >
          Fork trajectories <span aria-hidden="true">↗</span>
        </button>
        {!compact && (
          <>
            <button
              disabled={!state.branches.length}
              onClick={() => dispatch({ type: "verify" })}
            >
              Verify
            </button>
            <button
              disabled={!state.report?.passed}
              onClick={() => dispatch({ type: "commit" })}
            >
              Commit
            </button>
            <button
              disabled={!state.previous}
              onClick={() => dispatch({ type: "rollback" })}
            >
              Rollback
            </button>
          </>
        )}
        <button
          className="reset-button"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
        {!compact && (
          <button
            className="export-trace"
            aria-expanded={showTrace}
            aria-controls={`${id}-artifact`}
            onClick={() => setShowTrace(!showTrace)}
          >
            {showTrace ? "Hide trace" : "Inspect trace"}
          </button>
        )}
        {compact && (
          <a href="/vivacity#playground" className="sim-expand">
            Open playground <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      {state.branches.length > 0 && (
        <div
          className="branch-selector"
          role="group"
          aria-label="Select a simulated branch"
        >
          {state.branches.map((branch, i) => (
            <button
              key={branch.id}
              aria-pressed={state.selected === i}
              onClick={() => dispatch({ type: "select", value: i })}
            >
              <span className="branch-name">
                {branch.id}
                <span>{state.selected === i ? "SELECTED" : "COMPARE"}</span>
              </span>
              <span className="branch-impulse">
                Δv {branch.trace.impulse > 0 ? "+" : ""}
                {branch.trace.impulse}%
                <span>
                  {branch.trace.collision
                    ? "Impact"
                    : branch.trace.energy >= 0
                      ? "Escape"
                      : "Bound"}
                </span>
              </span>
              {!compact && (
                <span className="branch-data">
                  rₚ {branch.trace.periapsis.toFixed(3)} R · E{" "}
                  {branch.trace.energy.toFixed(4)}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      {state.report && (
        <ul className="verification-report">
          {state.report.checks.map((check) => (
            <li key={check.name}>
              <span className={check.pass ? "check-pass" : "check-fail"}>
                {check.pass ? "PASS" : "FAIL"}
              </span>
              <span>{check.name}</span>
              <code>{check.value}</code>
            </li>
          ))}
        </ul>
      )}
      {!compact && (
        <div id={`${id}-artifact`}>
          {showTrace && (
            <TraceArtifact
              key={`${state.revision}-${state.selected}-${state.impulse}-${Boolean(state.report)}`}
              parent={state.parent}
              trace={trace}
              branch={state.branches[state.selected]?.id || "parent"}
              report={state.report}
            />
          )}
        </div>
      )}
      <p className="sim-status" role="status">
        {state.message}
      </p>
      <p className="sim-disclosure">
        Interactive two-body model running in your browser. Illustrates
        Vivacity’s runtime loop; no production API connection.
      </p>
    </div>
  );
}
