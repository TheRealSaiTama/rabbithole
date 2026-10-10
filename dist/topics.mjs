export const topics = [
  [
    'Space',
    'If the universe is infinite, is there another version of us having this date?',
    'Imagine meeting your alternate self. What would you ask?',
    'Cosmology',
  ],
  [
    'Physics',
    'Would you rather travel to the past or the future?',
    'You get one trip. Where do you go, and who do you look for?',
    'Time travel',
  ],
  [
    'Chemistry',
    'Is falling in love just chemistry?',
    'Does knowing how a feeling works make it less magical?',
    'The chemistry of love',
  ],
  [
    'Maths',
    'Can you put a number on a perfect life?',
    'What would you measure, and what could never fit in a formula?',
    'Numbers & meaning',
  ],
  [
    'Computer science',
    'If an AI knew everything about you, could it be your friend?',
    'What separates being understood from being cared for?',
    'Artificial intelligence',
  ],
  [
    'History',
    'Which ordinary day in history would you love to witness?',
    'Skip the famous battles. Think streets, food, music, and people.',
    'A day in another century',
  ],
  [
    'Geography',
    'If you could wake up anywhere tomorrow, where would it be?',
    'Describe your first hour there, down to the sounds and smells.',
    'Somewhere else',
  ],
  [
    'Politics',
    'What is one rule you would change if you ran the world?',
    'What would it fix? Who might disagree with you?',
    'Your tiny revolution',
  ],
  [
    'Psychology',
    'Are you the same person you were five years ago?',
    'Which part of you stayed, and which part surprised you?',
    'The changing self',
  ],
  [
    'Philosophy',
    'Do we find meaning in life, or make it?',
    'Tell a story about a small thing that matters to you.',
    'Making meaning',
  ],
  [
    'Literature',
    'Which fictional world would you move into?',
    'You have to live there as an ordinary person. Still choosing it?',
    'Between the pages',
  ],
  [
    'Art',
    'Can something be beautiful even if nobody understands it?',
    'Think of a painting, a song, or a strange thing you love.',
    'Beautiful mysteries',
  ],
  [
    'Music',
    'Which song would you use to introduce yourself?',
    'What does it say about you that your biography would miss?',
    'Your opening track',
  ],
  [
    'Nature',
    'What would you ask an animal if it could answer?',
    'Pick one creature, one question, and imagine its reply.',
    'A different kind of mind',
  ],
  [
    'Food',
    'Which meal feels like home to you?',
    'Who makes it? What memory comes with the first bite?',
    'A taste of home',
  ],
  [
    'Everyday life',
    'What tiny thing makes an ordinary day feel special?',
    'Be specific. A smell, a ritual, a person, a moment.',
    'Little joys',
  ],
  [
    'Space',
    'Would you leave Earth knowing you could never come back?',
    'You can explore the stars, but everything familiar stays here.',
    'One way to the stars',
  ],
  [
    'Physics',
    'If you could pause time for one hour, what would you do?',
    'Nobody else notices. How do you spend that quiet hour?',
    'An hour outside time',
  ],
  [
    'Chemistry',
    'Which smell brings back your strongest memory?',
    'Where does it take you, and who is there?',
    'Memory in a molecule',
  ],
  [
    'Maths',
    'Would knowing the odds change the risks you take?',
    'Think about love, work, and trying something you might fail at.',
    'Taking chances',
  ],
  [
    'Computer science',
    'What should the internet forget about us?',
    'Should every version of you stay searchable forever?',
    'Digital memories',
  ],
  [
    'History',
    'What will people a hundred years from now find strange about us?',
    'Pick something we treat as completely normal today.',
    'Future history',
  ],
  [
    'Geography',
    'How much of who you are comes from where you grew up?',
    'What would be different if you had grown up across the world?',
    'Places that shape us',
  ],
  [
    'Politics',
    'What makes a society fair?',
    'Equal chances, equal outcomes, or something else entirely?',
    'The fairness question',
  ],
  [
    'Psychology',
    'Would you want to remember every moment of your life?',
    'Even the awkward ones. What would you gain or lose?',
    'Remembering everything',
  ],
  [
    'Philosophy',
    'If nobody ever knew about a kind act, would you still do it?',
    'What makes an action good: the intention, the result, or both?',
    'Quiet goodness',
  ],
  [
    'Literature',
    'Which book character would make the best dinner guest?',
    'What would you ask them once the food arrives?',
    'Dinner with a character',
  ],
  [
    'Art',
    'If you could keep only one piece of art, what would it be?',
    'It can be a film, a photograph, a poem, or something you made.',
    'One thing to keep',
  ],
  [
    'Music',
    'Do you love a song more for its words or its feeling?',
    'Name one that gets you even when you cannot explain why.',
    'Words or feeling',
  ],
  [
    'Nature',
    'Would you rather understand the ocean or the forest?',
    'What draws you toward that world?',
    'Wild curiosity',
  ],
  [
    'Food',
    'If your life were a menu, what would be on it?',
    'Choose a starter, a main, and a dessert with a story behind each.',
    'Your life on a plate',
  ],
  [
    'Everyday life',
    'What could you happily spend an entire afternoon learning?',
    'No career goals. No need to be good at it. Just curiosity.',
    'For the fun of it',
  ],
];
export function pickTopic(subject, previous, random = Math.random) {
  const choices = topics.filter(
    (topic) =>
      (subject === 'Anything' || topic[0] === subject) && topic !== previous,
  );
  return choices[Math.floor(random() * choices.length)];
}
export function remainingTime(deadline, now) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
