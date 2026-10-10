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
