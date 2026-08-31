import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { DT, energy } from "./orbit.js";
import SimulationRange from "./SimulationRange.jsx";

const ANGLE = -0.38;
const rotate = (x, y) => [
  x * Math.cos(ANGLE) - y * Math.sin(ANGLE),
  x * Math.sin(ANGLE) + y * Math.cos(ANGLE),
];

function trajectoryPath(points, project, side) {
  let penDown = false;
  return points
    .filter((_, i) => i % 4 === 0 || i === points.length - 1)
    .map((point) => {
      const visible =
        !side || (rotate(point.x, point.y)[1] < 0 ? "back" : "front") === side;
      if (!visible) {
        penDown = false;
        return "";
      }
      const command = penDown ? "L" : "M";
      penDown = true;
      return `${command}${project(point)
        .map((n) => n.toFixed(2))
        .join(",")}`;
    })
    .join(" ");
}

export default function OrbitViewport({
  trace,
  parentTrace,
  branches,
  selected,
  compact,
}) {
  const id = useId();
  const root = useRef(null);
  const cursor = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [view, setView] = useState("inclined");
  const last = trace.points.length - 1;
  const label = branches.length ? branches[selected].id : "parent";
  const telemetry = useMemo(
    () =>
      trace.points.map((point, index) => ({
        ...point,
        time: index * DT,
        radius: Math.hypot(point.x, point.y),
        speed: Math.hypot(point.vx, point.vy),
        drift: Math.abs(energy(point) - trace.energy),
      })),
    [trace],
  );
  const camera = useMemo(() => {
    const tilt = view === "inclined" ? 0.62 : 1;
    const all = [parentTrace, ...branches.map((branch) => branch.trace)];
    let scale = view === "inclined" ? 93 : 76;
    for (const item of all) {
      for (const point of item.points) {
        const [x, y] = rotate(point.x, point.y);
        scale = Math.min(
          scale,
          306 / Math.max(Math.abs(x), 0.01),
          138 / Math.max(Math.abs(y) * tilt, 0.01),
        );
      }
    }
    return {
      scale,
      tilt,
      project: (point) => {
        const [x, y] = rotate(point.x, point.y);
        return [340 + x * scale, 182 + y * scale * tilt];
      },
    };
  }, [view, parentTrace, branches]);
  const driftScale = Math.max(trace.maxDrift, 1e-12);
  const residualPath = useMemo(
    () =>
      telemetry
        .filter((_, i) => i % 4 === 0 || i === last)
        .map(
          (sample) =>
            `${sample.time === 0 ? "M" : "L"}${((sample.time / (last * DT)) * 620 + 4).toFixed(2)},${(58 - (sample.drift / driftScale) * 48).toFixed(2)}`,
        )
        .join(" "),
    [telemetry, driftScale, last],
  );

  // Playback writes only this instrument's SVG/telemetry nodes. The React tree
  // stays idle between user actions; there is no per-frame component render.
  const paint = useCallback(
    (index) => {
      const host = root.current;
      if (!host) return;
      const frame = Math.max(0, Math.min(last, Math.round(index)));
      cursor.current = frame;
      const sample = telemetry[frame];
      const [x, y] = camera.project(sample);
      const [vx, vy] = rotate(sample.vx, sample.vy);
      const occluded =
        view === "inclined" &&
        rotate(sample.x, sample.y)[1] < 0 &&
        Math.hypot(x - 340, y - 182) < camera.scale;
      const marker = host.querySelector("[data-satellite]");
      marker.setAttribute("transform", `translate(${x} ${y})`);
      marker.setAttribute("opacity", occluded ? "0.2" : "1");
      const vector = host.querySelector("[data-velocity]");
      vector.setAttribute(
        "d",
        `M${x} ${y}l${vx * camera.scale * 0.65} ${vy * camera.scale * camera.tilt * 0.65}`,
      );
      vector.setAttribute("opacity", occluded ? "0.2" : "1");
      const values = {
        time: sample.time.toFixed(3),
        frame: `${frame} / ${last}`,
        radius: `${sample.radius.toFixed(3)} R`,
        speed: `${sample.speed.toFixed(4)} R/τ`,
        x: sample.x.toFixed(5),
        y: sample.y.toFixed(5),
        vx: sample.vx.toFixed(5),
        vy: sample.vy.toFixed(5),
        drift: sample.drift.toExponential(2),
        state:
          frame === last
            ? trace.collision
              ? "SURFACE EVENT"
              : "HORIZON REACHED"
            : "STATE SAMPLE",
      };
      host.querySelectorAll("[data-readout]").forEach((node) => {
        node.textContent = values[node.dataset.readout];
      });
      const slider = host.querySelector("[data-timeline]");
      slider.value = String(frame);
      slider.setAttribute(
        "aria-valuetext",
        `Time ${sample.time.toFixed(3)} of ${(last * DT).toFixed(3)} model time units`,
      );
      host
        .querySelector("[data-chart-cursor]")
        ?.setAttribute("x1", String(4 + (frame / last) * 620));
      host
        .querySelector("[data-chart-cursor]")
        ?.setAttribute("x2", String(4 + (frame / last) * 620));
    },
    [camera, last, telemetry, trace.collision, view],
  );

  useEffect(() => {
    paint(cursor.current);
  }, [paint]);
  useEffect(() => {
    if (!playing) return;
    let request;
    let previous;
    let position = cursor.current;
    const tick = (now) => {
      if (previous !== undefined)
        position += ((Math.min(now - previous, 80) / 1000) * speed) / DT;
      previous = now;
      paint(position);
      if (position >= last) {
        setPlaying(false);
        return;
      }
      request = requestAnimationFrame(tick);
    };
    const pauseHidden = () => {
      if (document.hidden) setPlaying(false);
    };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pausePreference = () => setPlaying(false);
    request = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", pauseHidden);
    preference.addEventListener("change", pausePreference);
    return () => {
      cancelAnimationFrame(request);
      document.removeEventListener("visibilitychange", pauseHidden);
      preference.removeEventListener("change", pausePreference);
    };
  }, [playing, speed, paint, last]);

  const paths = (side) => (
    <>
      <path
        d={trajectoryPath(parentTrace.points, camera.project, side)}
        className="parent-orbit"
        fill="none"
      />
      {branches.map((branch, index) => (
        <path
          key={branch.id}
          d={trajectoryPath(branch.trace.points, camera.project, side)}
          className={`branch-orbit ${index === selected ? "is-selected" : ""}`}
          fill="none"
        />
      ))}
    </>
  );
  const first = telemetry[0];
  const [sx, sy] = camera.project(first);
  const [vx, vy] = rotate(first.vx, first.vy);
  return (
    <div className="orbit-instrument" ref={root}>
      <div className="instrument-toolbar">
        <span className="instrument-label">
          <span className="instrument-dot" />
          {label} <span>/ two-body</span>
        </span>
        <div role="group" aria-label="Camera view" className="camera-options">
          <button
            aria-pressed={view === "inclined"}
            onClick={() => setView("inclined")}
          >
            Inclined
          </button>
          <button
            aria-pressed={view === "plane"}
            onClick={() => setView("plane")}
          >
            Orbital plane
          </button>
        </div>
      </div>
      <div className="orbit-scene">
        <svg
          viewBox="0 0 680 360"
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>Orbital trajectory simulation</title>
          <desc id={`${id}-desc`}>
            A computed two-body trajectory.{" "}
            {branches.length
              ? "Amber is the selected branch; dashed lines are alternatives."
              : "The white path is the parent orbit."}{" "}
            The cross marks the sampled position and the arrow shows velocity.
            The central body has radius 1. Periapsis{" "}
            {trace.periapsis.toFixed(3)} body radii. Use the timeline to inspect
            each state.
          </desc>
          <defs>
            <radialGradient id={`${id}-surface`} cx="29%" cy="24%" r="78%">
              <stop offset="0" stopColor="#3a3b37" />
              <stop offset="0.52" stopColor="#1e201c" />
              <stop offset="1" stopColor="#090b09" />
            </radialGradient>
            <clipPath id={`${id}-body`}>
              <circle cx="340" cy="182" r={camera.scale} />
            </clipPath>
            <marker
              id={`${id}-arrow`}
              viewBox="0 0 6 6"
              refX="5"
              refY="3"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0L6 3L0 6" fill="none" stroke="#c4b18f" />
            </marker>
          </defs>
          <g className="orbit-grid" fill="none">
            {[1, 2, 3, 4, 6, 8, 10]
              .filter((r) => r * camera.scale < 305)
              .map((r) => (
                <g key={r}>
                  <ellipse
                    cx="340"
                    cy="182"
                    rx={r * camera.scale}
                    ry={r * camera.scale * camera.tilt}
                  />
                  <text
                    x={343 + r * camera.scale}
                    y="194"
                    className="orbit-label grid-label"
                  >
                    {r}R
                  </text>
                </g>
              ))}
            <path d="M24 182H656M340 28V338" />
          </g>
          {paths(view === "inclined" ? "back" : undefined)}
          <circle
            cx="340"
            cy="182"
            r={camera.scale}
            fill={`url(#${id}-surface)`}
            stroke="#68695e"
            strokeWidth="0.65"
          />
          <g clipPath={`url(#${id}-body)`} className="planet-wire" fill="none">
            {[-0.6, -0.3, 0, 0.3, 0.6].map((y) => (
              <ellipse
                key={y}
                cx="340"
                cy={182 + y * camera.scale}
                rx={camera.scale * Math.sqrt(1 - y * y)}
                ry={camera.scale * 0.18}
              />
            ))}
            {[0.24, 0.57, 0.85].map((r) => (
              <ellipse
                key={r}
                cx="340"
                cy="182"
                rx={camera.scale * r}
                ry={camera.scale}
                transform="rotate(-20 340 182)"
              />
            ))}
          </g>
          {view === "inclined" && paths("front")}
          <path
            data-velocity=""
            d={`M${sx} ${sy}l${vx * camera.scale * 0.65} ${vy * camera.scale * camera.tilt * 0.65}`}
            className="velocity-vector"
            markerEnd={`url(#${id}-arrow)`}
          />
          <g data-satellite="" transform={`translate(${sx} ${sy})`}>
            <circle
              r="4"
              className={branches.length ? "satellite selected" : "satellite"}
            />
            <path
              d="M-10 0H-6M6 0H10M0-10V-6M0 6V10"
              stroke="#dfd8c7"
              strokeWidth="0.8"
            />
          </g>
          <text x="20" y="27" className="orbit-label">
            μ = 1 / R = 1
          </text>
          <text x="660" y="27" textAnchor="end" className="orbit-label">
            VELOCITY VERLET
          </text>
          <text x="20" y="339" className="orbit-label">
            {view === "inclined" ? "INCLINED PROJECTION" : "ORBITAL PLANE"}
          </text>
          <text x="660" y="339" textAnchor="end" className="orbit-label">
            Δt {DT} τ
          </text>
        </svg>
      </div>
      <div className="observation-bar mono">
        <span>
          r <b data-readout="radius">{first.radius.toFixed(3)} R</b>
        </span>
        <span>
          |v| <b data-readout="speed">{first.speed.toFixed(4)} R/τ</b>
        </span>
        <span className="sample-state" data-readout="state">
          STATE SAMPLE
        </span>
      </div>
      <div className="playback-controls">
        <button
          className="playback-toggle"
          aria-label={playing ? "Pause trajectory" : "Play trajectory"}
          onClick={() => {
            if (!playing && cursor.current >= last) paint(0);
            setPlaying(!playing);
          }}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
          {playing ? "Pause" : "Play"}
        </button>
        <div className="timeline-field">
          <label htmlFor={`${id}-timeline`}>
            <span>Trajectory time</span>
            <span>
              <b data-readout="time">0.000</b> / {(last * DT).toFixed(3)} τ
            </span>
          </label>
          <SimulationRange
            id={`${id}-timeline`}
            data-timeline=""
            aria-label="Trajectory time"
            min={0}
            max={last}
            step={1}
            defaultValue="0"
            onValueChange={(value) => {
              setPlaying(false);
              paint(value);
            }}
          />
        </div>
        <label className="playback-speed">
          <span className="sr-only">Playback speed</span>
          <select
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          >
            <option value="1">1×</option>
            <option value="2">2×</option>
            <option value="4">4×</option>
          </select>
        </label>
      </div>
      {!compact && (
        <div className="instrument-diagnostics">
          <div className="state-vector">
            <div className="diagnostic-heading">
              <span>State vector</span>
              <span className="mono" data-readout="frame">
                0 / {last}
              </span>
            </div>
            <dl>
              {["x", "y", "vx", "vy"].map((field) => (
                <div key={field}>
                  <dt>
                    {field === "vx" ? "vₓ" : field === "vy" ? "vᵧ" : field}
                  </dt>
                  <dd data-readout={field}>{first[field].toFixed(5)}</dd>
                </div>
              ))}
            </dl>
            <p>Position in R · velocity in R/τ</p>
          </div>
          <div className="energy-diagnostic">
            <div className="diagnostic-heading">
              <span>Energy residual |E(t) − E₀|</span>
              <b className="mono" data-readout="drift">
                0.00e+0
              </b>
            </div>
            <svg
              viewBox="0 0 630 66"
              role="img"
              aria-label={`Absolute energy residual across the trajectory. Maximum ${trace.maxDrift.toExponential(2)}. Vertical scale is automatic.`}
              preserveAspectRatio="none"
            >
              <path
                d="M4 10H624M4 34H624M4 58H624"
                stroke="#282822"
                fill="none"
              />
              <path
                d={residualPath}
                stroke="#c2aa83"
                strokeWidth="1.3"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <line
                data-chart-cursor=""
                x1="4"
                x2="4"
                y1="4"
                y2="62"
                stroke="#e7e5dc"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            </svg>
            <p>
              <span>0 → {(last * DT).toFixed(2)} τ</span>
              <span>Max {trace.maxDrift.toExponential(2)} · auto scale</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
