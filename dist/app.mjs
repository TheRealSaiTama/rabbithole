import { topics, pickTopic, remainingTime } from './topics.mjs';
const get = (id) => document.getElementById(id);
let topic = topics[0];
let round = 1;
let person = 1;
let seconds = 60;
let deadline = 0;
let running = false;
let finished = false;
let shuffling = false;
let selectedSubject = 'Anything';
const subjects = [...new Set(topics.map((item) => item[0]))];
const icons = [
  '🪐',
  '⚡',
  '🧪',
  '🎲',
  '💻',
  '🏺',
  '🌍',
  '⚖️',
  '🧠',
  '💭',
  '📚',
  '🎨',
  '🎧',
  '🌿',
  '🍓',
  '☕',
];
const colors = [
  '#e4dcf6',
  '#fde5aa',
  '#d7efdf',
  '#f5d9e7',
  '#d8e6f7',
  '#f2dfc5',
  '#d7ece9',
  '#e8dff3',
  '#f7dce4',
  '#e3dcf5',
  '#e9dfca',
  '#fae0d0',
  '#e2dcf2',
  '#dcebd0',
  '#f6d5d9',
  '#eddfce',
];
const buckets = [];
const circumference = 2 * Math.PI * 89;
for (const [index, subject] of subjects.entries()) {
  icons[index] ??= '✨';
  colors[index] ??= '#e8dff3';
  const option = document.createElement('option');
  option.textContent = subject;
  get('subject').append(option);
  const bucket = document.createElement('button');
  bucket.className = 'bucket';
  bucket.type = 'button';
  bucket.setAttribute('aria-label', subject);
  bucket.setAttribute('aria-pressed', 'false');
  bucket.style.setProperty('--bucket-color', colors[index]);
  const pot = document.createElement('span');
  pot.className = 'bucket-pot';
  pot.setAttribute('aria-hidden', 'true');
  const icon = document.createElement('span');
  icon.className = 'bucket-icon';
  icon.textContent = icons[index];
  pot.append(icon);
  const label = document.createElement('span');
  label.className = 'bucket-name';
  label.textContent = subject;
  bucket.append(pot, label);
  bucket.addEventListener('click', () => chooseSubject(subject));
  get('buckets').append(bucket);
  buckets.push(bucket);
}
for (let index = 0; index < 20; index += 1) {
  const piece = document.createElement('span');
  piece.style.setProperty('--x', `${10 + Math.random() * 80}%`);
  piece.style.setProperty(
    '--color',
    ['#cd91b3', '#ba9ed5', '#ddb769', '#98bbaa'][index % 4],
  );
  piece.style.setProperty('--delay', `${Math.random() * 0.15}s`);
  piece.style.setProperty('--drift', `${Math.random() * 160 - 80}px`);
  get('confetti').append(piece);
}
function showTopic() {
  get('question').textContent = topic[1];
  get('hint').textContent = topic[2];
  const index = subjects.indexOf(topic[0]);
  get('topic-tag').textContent = icons[index] + ' ' + topic[0].toUpperCase();
  get('topic-art').textContent = icons[index];
  get('topic-panel').style.backgroundColor = colors[index] + '80';
  get('topic-title').textContent = topic[3];
  get('round').textContent = 'ROUND ' + String(round).padStart(2, '0');
}
function showTimer() {
  get('time').textContent =
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  get('progress').style.strokeDashoffset = circumference * (1 - seconds / 60);
  get('person-one').classList.toggle('active', person === 1);
  get('person-two').classList.toggle('active', person === 2);
  get('start').textContent = running
    ? 'Pause'
    : finished
      ? person === 1
        ? 'Your turn, Person 2 ♡'
        : 'One more rabbit hole? 🎲'
      : seconds < 60
        ? 'Keep talking ♡'
        : 'Let’s talk ♡';
  get('clock').classList.toggle('running', running);
  get('clock').classList.toggle('urgent', running && seconds <= 10);
  get('clock').classList.toggle('done', finished);
  get('turn-label').textContent = finished
    ? person === 1
      ? 'YOUR BUNNY SAYS: SWITCH!'
      : 'LOOK AT YOU TWO, CONNECTING ♡'
    : `PERSON ${person}, WE’RE ALL EARS`;
  get('clock-caption').textContent = finished
    ? 'A LITTLE MOMENT TOGETHER'
    : running && seconds <= 10
      ? 'MAKE IT A GOOD ONE ♡'
      : 'YOUR LITTLE MINUTE';
  get('timer-note').textContent = finished
    ? person === 1
      ? 'Person 2, ready for your minute?'
      : 'Keep the conversation going, or try a new topic.'
    : 'One talks. One listens. Then switch.';
}
function resetTimer() {
  running = false;
  finished = false;
  person = 1;
  seconds = 60;
  showTimer();
}
function finishShuffle(nextTopic) {
  topic = nextTopic;
  round += 1;
  shuffling = false;
  resetTimer();
  showTopic();
  setBusy(false);
  for (const [index, bucket] of buckets.entries()) {
    const chosen = subjects[index] === topic[0];
    bucket.classList.toggle('selected', chosen);
    bucket.classList.toggle('chosen', chosen);
  }
  get('topic-panel').classList.remove('shuffling');
  get('topic-panel').classList.add('reveal');
  get('confetti').classList.add('burst');
  get('shuffle-status').textContent =
    `${icons[subjects.indexOf(topic[0])]} ${topic[0]} it is. Ooh, good one!`;
  get('announcement').textContent = 'New topic: ' + topic[1];
}
function setBusy(busy) {
  for (const id of ['shuffle', 'start', 'reset', 'subject', 'anything'])
    get(id).disabled = busy;
  for (const bucket of buckets) bucket.disabled = busy;
  get('shuffle').classList.toggle('rolling', busy);
  get('shuffle').innerHTML = busy
    ? '<span aria-hidden="true">🎲</span> Vroom vroom…'
    : '<span aria-hidden="true">🎲</span> Surprise us!';
  get('buckets').setAttribute('aria-busy', String(busy));
}
function chooseSubject(subject) {
  if (shuffling) return;
  selectedSubject = subject;
  get('subject').value = subject;
  get('anything').classList.toggle('active', subject === 'Anything');
  get('anything').setAttribute('aria-pressed', String(subject === 'Anything'));
  for (const [index, bucket] of buckets.entries()) {
    bucket.classList.toggle('active', subjects[index] === subject);
    bucket.setAttribute('aria-pressed', String(subjects[index] === subject));
  }
  newTopic();
}
function newTopic() {
  if (shuffling) return;
  shuffling = true;
  running = false;
  showTimer();
  setBusy(true);
  get('topic-panel').classList.remove('reveal');
  get('topic-panel').classList.add('shuffling');
  get('confetti').classList.remove('burst');
  buckets.forEach((bucket) => bucket.classList.remove('chosen', 'selected'));
  const nextTopic = pickTopic(selectedSubject, topic);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishShuffle(nextTopic);
    return;
  }
  get('shuffle-status').textContent =
    'A little science? A little philosophy? Let fate cook…';
  const started = performance.now();
  let lastStep = -1;
  const target = subjects.indexOf(nextTopic[0]);
  const steps = subjects.length * 2 + target;
  function roll(now) {
    const progress = Math.min(1, (now - started) / 2100);
    const step = Math.floor((1 - (1 - progress) ** 3) * steps);
    if (step !== lastStep) {
      buckets.forEach((bucket, index) =>
        bucket.classList.toggle('selected', index === step % subjects.length),
      );
      lastStep = step;
    }
    if (progress < 1) requestAnimationFrame(roll);
    else finishShuffle(nextTopic);
  }
  requestAnimationFrame(roll);
}
function updateTimer() {
  if (!running) return;
  seconds = remainingTime(deadline, Date.now());
  if (seconds === 0) {
    running = false;
    finished = true;
    get('announcement').textContent =
      person === 1
        ? 'One minute is up. Pass the turn to Person 2.'
        : 'Both turns are complete. Keep chatting or choose another topic.';
  }
  showTimer();
}
get('start').addEventListener('click', () => {
  if (running) {
    updateTimer();
    running = false;
    showTimer();
    return;
  }
  if (finished && person === 2) {
    newTopic();
    return;
  }
  if (finished) {
    person = 2;
    seconds = 60;
    finished = false;
  }
  deadline = Date.now() + seconds * 1000;
  running = true;
  showTimer();
});
get('reset').addEventListener('click', resetTimer);
get('shuffle').addEventListener('click', newTopic);
get('subject').addEventListener('change', () =>
  chooseSubject(get('subject').value),
);
get('anything').addEventListener('click', () => chooseSubject('Anything'));
get('how').addEventListener('click', () => get('instructions').showModal());
get('close').addEventListener('click', () => get('instructions').close());
document.addEventListener('visibilitychange', updateTimer);
setInterval(updateTimer, 200);
showTopic();
showTimer();
