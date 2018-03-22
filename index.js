const startBtn = document.getElementById("start-button");
const board = document.getElementById("game-board");
const textContainer = document.getElementById("text-container");
const timerElem = document.getElementById("timer");
const accuracy = document.getElementById("accuracy");

startBtn.addEventListener("click", () => setupGame());
document.addEventListener("keydown", (e) => keyPressHandler(e));

const wordSequences = [];
const charElems = [];

function setupGame() {
  showBoard();
  startTimer();
  newWordSequence();
}

function newWordSequence() {
  textContainer.innerHTML = "";
  charElems.length = 0; /* Don't argue with the standard :P */
  const words = getRandomWord(5);
  wordSequences.push(words);
  
  asCharSequence(words).forEach(char => {
    const elem = asDomElem(char);
    charElems.push(elem);
    textContainer.appendChild(elem);
  })

  charElems[index = 0].classList.add("active");  
}

let corrects = [];
let numCorrect = 0;
let numError = 0;
let index = 0;
function keyPressHandler(event) {
  if (nonRelevantKey(event)) return;
  if (isEndOfWords()) {
    newWordSequence();
    return;
  }

  const elem = charElems[index];
  elem.classList.remove("active");  
  
  if (event.key === "Backspace") {
    moveBackwards();
  } else {
    const wasCorrect = (event.key === elem.innerText) || (event.key === " " && elem.innerText === "\u00A0");
    moveForward(wasCorrect);
  }

  accuracy.innerText = `${Math.floor(numCorrect / (numCorrect + numError) * 100) || 0}%`
}

function nonRelevantKey(event) {
  if (event.ctrlKey) return true;
  if (event.shiftKey) return true;
  if (event.key === "Alt") return true;
  if (event.key === "ArrowLeft") return true;
  if (event.key === "ArrowUp") return true;
  if (event.key === "ArrowRight") return true;
  if (event.key === "ArrowDown") return true;
  if (event.key === "Meta") return true;
  if (event.key === "Dead") return true;
  return false;
}

function isEndOfWords() {
  return asCharSequence(wordSequences.slice(-1).pop()).length - 1 === index;
}

function moveBackwards() {
  if (index === 0) {
    charElems[index].classList.add("active");
    return;
  }

  const elem = charElems[--index];
    if (corrects.pop()) {
      elem.classList.remove("correct");
      numCorrect--;
    } 
    else {
      elem.classList.remove("error");
      numError--;
    }
    elem.classList.add("active");
}

function moveForward(correct) {
  if (correct) {
    numCorrect++;
    corrects.push(correct);
    charElems[index].classList.add("correct");
  } else {
    numError++;
    corrects.push(correct);
    charElems[index].classList.add("error");
  }
  charElems[++index].classList.add("active");
}

function showBoard() {
  startBtn.style.display = "none";
  board.style.display = "block";
}

function startTimer() {
  const startTime = new Date().getTime();
  const timer = setInterval(() => {
      const now = new Date().getTime();
      const seconds = 60 - Math.floor(((now - startTime)) / 1000);
      timerElem.innerHTML = `${seconds} s`;
      if (seconds === 0)  exitGame(timer);
  })
}

function exitGame(timer) {
  clearInterval(timer);
}

function getRandomWord(n = 1) {
  return Array.from({length: n}, 
    () => Math.floor(Math.random() * wordList.length))
    .map(i => `${wordList[i]}\u00A0`);
}

function asCharSequence(warr) {
  return [].concat.apply([], warr.map(w => w.split('')));
}

function asDomElem(char) {
  const div = document.createElement("div");
  div.classList.add("char");
  div.innerText = char;
  return div;
}
