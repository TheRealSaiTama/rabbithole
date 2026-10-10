import { topics, pickTopic, remainingTime } from './topics.mjs';
const get = (id) => document.getElementById(id);
let topic = topics[0];
let round = 1;
let person = 1;
let seconds = 60;
let deadline = 0;
let running = false;
let finished = false;
const circumference = 2 * Math.PI * 89;
for (const subject of new Set(topics.map((item) => item[0]))) {
  const option = document.createElement('option');
  option.textContent = subject;
  get('subject').append(option);
}
function showTopic() {
  get('question').textContent = topic[1];
  get('hint').textContent = topic[2];
  get('topic-tag').textContent = '✧ ' + topic[0].toUpperCase();
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
        ? 'Person 2’s turn ↗'
        : 'Another rabbit hole ↗'
      : seconds < 60
        ? 'Keep talking ↗'
        : 'Let’s talk ↗';
  get('turn-label').textContent = finished
    ? person === 1
      ? 'PASS THE CONVERSATION'
      : 'A LITTLE CLOSER, MAYBE?'
    : `PERSON ${person}, THE FLOOR IS YOURS`;
  get('clock-caption').textContent = finished
    ? 'TIME TO LISTEN'
    : 'A MINUTE TO WANDER';
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
function newTopic() {
  topic = pickTopic(get('subject').value, topic);
  round += 1;
  resetTimer();
  showTopic();
  get('announcement').textContent = 'New topic: ' + topic[1];
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
get('subject').addEventListener('change', newTopic);
get('how').addEventListener('click', () => get('instructions').showModal());
get('close').addEventListener('click', () => get('instructions').close());
document.addEventListener('visibilitychange', updateTimer);
setInterval(updateTimer, 200);
showTopic();
showTimer();
