// Explicit pointer and key handling keeps the solver state, thumb, and readouts
// synchronized during scrubbing, including in embedded browser webviews.
export default function SimulationRange({
  min,
  max,
  step = 1,
  onValueChange,
  ...props
}) {
  const update = (input, value) => {
    const next = Math.max(
      min,
      Math.min(max, min + Math.round((value - min) / step) * step),
    );
    input.value = String(next);
    onValueChange(next);
  };
  const point = (event) => {
    const input = event.currentTarget;
    const rect = input.getBoundingClientRect();
    const inset = 8;
    const ratio =
      (event.clientX - rect.left - inset) / Math.max(1, rect.width - inset * 2);
    update(input, min + ratio * (max - min));
  };
  return (
    <input
      {...props}
      type="range"
      min={min}
      max={max}
      step={step}
      onChange={(event) =>
        update(event.currentTarget, Number(event.target.value))
      }
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        event.currentTarget.setPointerCapture(event.pointerId);
        point(event);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          point(event);
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onKeyDown={(event) => {
        const value = Number(event.currentTarget.value);
        const actions = {
          ArrowLeft: value - step,
          ArrowDown: value - step,
          ArrowRight: value + step,
          ArrowUp: value + step,
          Home: min,
          End: max,
          PageDown: value - (max - min) / 10,
          PageUp: value + (max - min) / 10,
        };
        if (!(event.key in actions)) return;
        event.preventDefault();
        update(event.currentTarget, actions[event.key]);
      }}
    />
  );
}
