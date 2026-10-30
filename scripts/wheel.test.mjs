import assert from 'node:assert/strict';
import test from 'node:test';
import { createWheelNavigation } from '../src/wheel-navigation.js';

const event = (delta, extra = {}) => ({ deltaX: 0, deltaY: delta, deltaMode: 0, ...extra });

test('a gesture fires once, not once per momentum event', () => {
  const next = createWheelNavigation();
  const results = [20, 36, 60, 54, 43, 29, 20, 13, 8, 5, 3, 1].map((d, i) => next(event(d), i * 20));
  assert.deepEqual(results.filter(Boolean), [1]);
});

test('a new impulse works while the previous tail is still arriving', () => {
  const next = createWheelNavigation();
  assert.equal(next(event(80), 0), 1);
  for (let t = 20; t <= 200; t += 20) assert.equal(next(event(3), t), 0);
  assert.equal(next(event(64), 220), 1);
  assert.equal(next(event(30), 240), 0);
});

test('consecutive separate small gestures both register', () => {
  const next = createWheelNavigation();
  assert.equal(next(event(24), 0), 0);
  assert.equal(next(event(25), 16), 1);
  assert.equal(next(event(24), 200), 0);
  assert.equal(next(event(25), 216), 1);
});

test('direction reversal and horizontal input do not get stuck', () => {
  const next = createWheelNavigation();
  assert.equal(next(event(80), 0), 1);
  assert.equal(next(event(-80), 50), -1);
  assert.equal(next(event(0, { deltaX: 70 }), 100), 1);
  assert.equal(next(event(0, { deltaX: -70 }), 150), -1);
});

test('line and page deltas are normalized; pinch gestures are untouched', () => {
  const next = createWheelNavigation();
  assert.equal(next(event(3, { deltaMode: 1 }), 0), 1);
  assert.equal(next(event(-1, { deltaMode: 2 }), 200), -1);
  assert.equal(next(event(200, { ctrlKey: true }), 400), 0);
  assert.equal(next(event(200, { metaKey: true }), 400), 0);
});

test('sustained deliberate scrolling advances at a controlled rate', () => {
  const next = createWheelNavigation();
  const moves = Array.from({ length: 55 }, (_, i) => next(event(20), i * 20)).filter(Boolean);
  assert.deepEqual(moves, [1, 1, 1]);
});
