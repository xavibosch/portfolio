// Recognize fresh impulses without treating the decaying momentum tail as a swipe.
export function createWheelNavigation() {
  let lastTime = -Infinity;
  let lastStep = -Infinity;
  let lastMagnitude = 0;
  let axis;
  let direction = 0;
  let total = 0;
  let peak = 0;
  let fired = false;

  return (event, now, pageSize = 800) => {
    if (event.ctrlKey || event.metaKey) return 0;
    const nextAxis = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? 'x' : 'y';
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? pageSize : 1;
    const delta = (nextAxis === 'x' ? event.deltaX : event.deltaY) * unit;
    const magnitude = Math.abs(delta);
    if (magnitude < .5) return 0;
    const sign = Math.sign(delta);
    const fresh = now - lastTime > 140;
    const reversed = magnitude >= 4 && (sign !== direction || nextAxis !== axis);
    const impulse = fired && now - lastStep >= 180 && magnitude >= 8 &&
      magnitude > lastMagnitude * 1.7 && magnitude - lastMagnitude >= 5;
    const sustained = fired && now - lastStep >= 440 && magnitude >= 8 && magnitude >= peak * .85;

    if (fresh || reversed || impulse || sustained) {
      total = 0;
      peak = 0;
      fired = false;
      axis = nextAxis;
      direction = sign;
    }
    lastTime = now;
    lastMagnitude = magnitude;
    peak = Math.max(peak, magnitude);
    if (fired || nextAxis !== axis || sign !== direction) return 0;
    total += magnitude;
    if (total < 48) return 0;
    fired = true;
    lastStep = now;
    return direction;
  };
}
