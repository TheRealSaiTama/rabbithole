import test from 'node:test';
import assert from 'node:assert/strict';
import { topics, pickTopic, remainingTime } from '../dist/topics.mjs';
test('every subject can produce a new topic without repeating the current one', () => {
  for (const subject of new Set(topics.map((topic) => topic[0]))) {
    const first = pickTopic(subject, null, () => 0);
    const next = pickTopic(subject, first, () => 0);
    assert.equal(next[0], subject);
    assert.notEqual(next, first);
  }
});
test('timer rounds up and stops at zero after a delayed tick', () => {
  assert.equal(remainingTime(60000, 1), 60);
  assert.equal(remainingTime(60000, 59001), 1);
  assert.equal(remainingTime(60000, 65000), 0);
});
test('anything can reach every subject without returning the current prompt', () => {
  const previous = topics[0];
  const choices = topics.filter((topic) => topic !== previous);
  for (let index = 0; index < choices.length; index += 1) {
    assert.equal(
      pickTopic('Anything', previous, () => (index + 0.5) / choices.length),
      choices[index],
    );
  }
});
test('a fresh speaker minute stays at sixty until one second passes', () => {
  const started = 125000;
  assert.equal(remainingTime(started + 60000, started), 60);
  assert.equal(remainingTime(started + 60000, started + 999), 60);
  assert.equal(remainingTime(started + 60000, started + 1000), 59);
});
