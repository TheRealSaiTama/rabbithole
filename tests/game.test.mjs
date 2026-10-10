import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { topics, pickTopic, remainingTime } from '../dist/topics.mjs';

function createGame(reducedMotion = false) {
  const elements = new Map();
  const frames = [];
  let tick;
  let now = 1000;
  function element() {
    const classes = new Set();
    return {
      children: [],
      events: {},
      attributes: {},
      value: 'Anything',
      style: { setProperty() {} },
      classList: {
        add(...names) {
          names.forEach((name) => classes.add(name));
        },
        remove(...names) {
          names.forEach((name) => classes.delete(name));
        },
        toggle(name, active) {
          active ? classes.add(name) : classes.delete(name);
        },
        contains(name) {
          return classes.has(name);
        },
      },
      append(...children) {
        this.children.push(...children);
      },
      setAttribute(name, value) {
        this.attributes[name] = value;
      },
      addEventListener(name, action) {
        this.events[name] = action;
      },
    };
  }
  const get = (id) => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  const source = readFileSync(
    new URL('../dist/app.mjs', import.meta.url),
    'utf8',
  );
  runInNewContext(source.replace(/^import[^\n]+\n/, ''), {
    topics,
    pickTopic,
    remainingTime,
    document: {
      getElementById: get,
      createElement: element,
      addEventListener() {},
    },
    window: { matchMedia: () => ({ matches: reducedMotion }) },
    performance: { now: () => now },
    Date: { now: () => now },
    requestAnimationFrame: (action) => frames.push(action),
    setInterval: (action) => {
      tick = action;
    },
  });
  return {
    get,
    click: (id) => get(id).events.click(),
    finishRoll() {
      now += 2200;
      frames.shift()(now);
    },
    advance(milliseconds) {
      now += milliseconds;
      tick();
    },
  };
}

test('roulette locks controls, ignores a second subject click, and releases them on landing', () => {
  const game = createGame();
  game.click('shuffle');
  assert.equal(game.get('shuffle').disabled, true);
  assert.equal(game.get('start').disabled, true);
  game.get('buckets').children[1].events.click();
  assert.equal(game.get('subject').value, 'Anything');
  game.finishRoll();
  assert.equal(game.get('shuffle').disabled, false);
  assert.equal(game.get('start').disabled, false);
  assert.equal(game.get('round').textContent, 'ROUND 02');
  const selected = game
    .get('buckets')
    .children.filter((bucket) => bucket.classList.contains('selected'));
  assert.equal(selected.length, 1);
  assert.ok(
    game
      .get('topic-tag')
      .textContent.includes(selected[0].attributes['aria-label'].toUpperCase()),
  );
});

test('reduced motion selects the chosen subject immediately and avoids repeat prompts', () => {
  const game = createGame(true);
  game.get('buckets').children[1].events.click();
  const question = game.get('question').textContent;
  assert.equal(game.get('subject').value, 'Physics');
  assert.equal(game.get('shuffle').disabled, false);
  game.click('shuffle');
  assert.notEqual(game.get('question').textContent, question);
  assert.equal(game.get('topic-tag').textContent, '⚡ PHYSICS');
});

test('pause holds the countdown and the second speaker gets a fresh minute', () => {
  const game = createGame(true);
  game.click('start');
  game.advance(10000);
  assert.equal(game.get('time').textContent, '0:50');
  game.click('start');
  game.advance(15000);
  assert.equal(game.get('time').textContent, '0:50');
  game.click('start');
  game.advance(50000);
  assert.equal(game.get('time').textContent, '0:00');
  assert.equal(game.get('start').textContent, 'Your turn, Person 2 ♡');
  game.click('start');
  assert.equal(game.get('time').textContent, '1:00');
  assert.equal(game.get('person-two').classList.contains('active'), true);
  game.click('reset');
  assert.equal(game.get('person-one').classList.contains('active'), true);
  assert.equal(game.get('clock').classList.contains('running'), false);
});
