// Dimensionless two-body model: mu = 1, central-body radius = 1.
// This local explainer is independent of Vivacity's production runtime.
export const INITIAL_STATE = Object.freeze({
  x: 1.8,
  y: 0,
  vx: 0,
  vy: Math.sqrt(1 / 1.8),
});
export const DT = 0.0125;
export const STEPS = 1600;

export function energy(s) {
  return (s.vx * s.vx + s.vy * s.vy) / 2 - 1 / Math.hypot(s.x, s.y);
}

export function orbitalElements(s) {
  const e = energy(s);
  const h = s.x * s.vy - s.y * s.vx;
  const eccentricity = Math.sqrt(Math.max(0, 1 + 2 * e * h * h));
  return { energy: e, eccentricity, periapsis: (h * h) / (1 + eccentricity) };
}

export function step(s, dt = DT) {
  const r3 = Math.hypot(s.x, s.y) ** 3;
  const ax = -s.x / r3;
  const ay = -s.y / r3;
  const x = s.x + s.vx * dt + 0.5 * ax * dt * dt;
  const y = s.y + s.vy * dt + 0.5 * ay * dt * dt;
  const nextR3 = Math.hypot(x, y) ** 3;
  return {
    x,
    y,
    vx: s.vx + 0.5 * (ax - x / nextR3) * dt,
    vy: s.vy + 0.5 * (ay - y / nextR3) * dt,
  };
}

export function simulate(parent = INITIAL_STATE, impulse = 0) {
  if (!Number.isFinite(impulse) || impulse < -50 || impulse > 50)
    throw new RangeError("Impulse must be between -50 and 50 percent.");
  const initial = {
    ...parent,
    vx: parent.vx * (1 + impulse / 100),
    vy: parent.vy * (1 + impulse / 100),
  };
  const elements = orbitalElements(initial);
  const points = [{ ...initial }];
  let current = initial;
  let maxDrift = 0;
  let collision = Math.hypot(initial.x, initial.y) <= 1;
  for (let i = 0; i < STEPS && !collision; i += 1) {
    current = step(current);
    points.push(current);
    maxDrift = Math.max(maxDrift, Math.abs(energy(current) - elements.energy));
    collision = Math.hypot(current.x, current.y) <= 1;
  }
  return { initial, points, ...elements, maxDrift, collision, impulse };
}

export function verify(trace) {
  const checks = [
    {
      name: "Bound orbit",
      pass: trace.energy < 0,
      value: `E = ${trace.energy.toFixed(4)}`,
    },
    {
      name: "Surface clearance",
      pass: trace.periapsis > 1 && !trace.collision,
      value: `rₚ = ${trace.periapsis.toFixed(3)} R`,
    },
    {
      name: "Energy conservation",
      pass: trace.maxDrift < 0.001,
      value: `max |ΔE| = ${trace.maxDrift.toExponential(1)}`,
    },
  ];
  return { checks, passed: checks.every((check) => check.pass) };
}

export function forkWorld(parent, impulse) {
  return [-12, 0, 12].map((offset, index) => ({
    id: `branch-${index + 1}`,
    trace: simulate(parent, Math.max(-50, Math.min(50, impulse + offset))),
  }));
}

export function commitBranch(branch, report) {
  if (!report?.passed || !verify(branch.trace).passed)
    throw new Error("Only a verified branch can be committed.");
  // The committed state is the endpoint of the simulated horizon.
  return { ...branch.trace.points.at(-1) };
}
