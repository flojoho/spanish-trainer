import words from './words.js'

const translationInput = document.getElementById('translation-input');
const spanishSpan = document.getElementById('spanish-span');
const form = document.getElementById('form');
const pastWordsDiv = document.getElementById('past-words-div');
const table = document.getElementById('table');

const pastWords = [];

let currentWord;

const getNewWord = () => {
  currentWord = [...words[Math.floor(Math.random()*words.length)]];
  spanishSpan.textContent = currentWord[0];
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const guess = translationInput.value;

  const wasCorrect = currentWord[1] === guess;

  translationInput.value = '';

  currentWord.push(guess);
  pastWords.push(currentWord);

  table.innerHTML = '';
  pastWords.slice(-10).forEach(word => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    const isCorrect = word[1] === word[2];

    td1.innerText = word[0];
    span1.innerText = `${word[1]} `;
    if(!isCorrect) span2.innerText = word[2];

    span2.classList.add('linethrough');
    td1.classList.add('left');
    tr.classList.add(isCorrect ? 'correct' : 'incorrect');

    td2.appendChild(span1);
    td2.appendChild(span2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
  });

  getNewWord();
});

getNewWord();