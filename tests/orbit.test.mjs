import test from "node:test";
import assert from "node:assert/strict";
import {
  INITIAL_STATE,
  simulate,
  verify,
  forkWorld,
  commitBranch,
  energy,
} from "../src/portfolio/orbit.js";

test("circular orbit preserves radius and energy over the whole horizon", () => {
  const trace = simulate();
  assert.equal(trace.points.length, 1601);
  assert.ok(
    trace.points.every((p) => Math.abs(Math.hypot(p.x, p.y) - 1.8) < 0.0001),
  );
  assert.ok(trace.maxDrift < 1e-7);
  assert.equal(verify(trace).passed, true);
});

test("a low-velocity branch intersects the surface and cannot be committed", () => {
  const trace = simulate(INITIAL_STATE, -35);
  const report = verify(trace);
  assert.equal(trace.collision, true);
  assert.equal(report.passed, false);
  assert.ok(trace.points.length < 1601);
  assert.throws(() => commitBranch({ trace }, report), /verified branch/);
});

test("escape trajectory fails the bound-orbit check", () => {
  const trace = simulate(INITIAL_STATE, 45);
  const report = verify(trace);
  assert.ok(trace.energy > 0);
  assert.equal(report.checks.find((c) => c.name === "Bound orbit").pass, false);
  assert.equal(report.passed, false);
});

test("forks are independent; commit returns the evaluated endpoint without mutating the parent", () => {
  const original = { ...INITIAL_STATE };
  const branches = forkWorld(INITIAL_STATE, 10);
  assert.deepEqual(
    branches.map((b) => b.trace.impulse),
    [-2, 10, 22],
  );
  assert.notEqual(branches[0].trace.points, branches[1].trace.points);
  const selected = branches[1];
  assert.throws(() => commitBranch(selected, null), /verified branch/);
  const next = commitBranch(selected, verify(selected.trace));
  assert.deepEqual(INITIAL_STATE, original);
  assert.deepEqual(next, selected.trace.points.at(-1));
  assert.notEqual(next, selected.trace.points.at(-1));
  assert.ok(Math.abs(energy(next) - selected.trace.energy) < 0.001);
});

test("invalid impulse input is rejected", () => {
  for (const impulse of [NaN, Infinity, -51, 51, "10"])
    assert.throws(() => simulate(INITIAL_STATE, impulse), RangeError);
});
