const startBtn = document.getElementById("start-button");
const board = document.getElementById("game-board");
const textContainer = document.getElementById("text-container");
const timerElem = document.getElementById("timer");

startBtn.addEventListener("click", () => setupGame());

function setupGame() {
  showBoard();
  startTimer();
  asCharSequence(getRandomWord(5)).forEach(char => {
    textContainer.appendChild(asDomElem(char));
  })
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
    .map(i => `${wordList[i]} `);
}

function asCharSequence(warr) {
  return [].concat.apply([], warr.map(w => w.split('')));
}

function asDomElem(char) {
  const div = document.createElement("div");
  div.classList.add("char");
  if (char === " ") div.classList.add("space")
  div.innerText = char;
  return div;
}
