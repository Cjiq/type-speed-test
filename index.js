const startBtn = document.getElementById("start-button")
const board = document.getElementById("game-board")
const textContainer = document.getElementById("text-container")
const timerElem = document.getElementById("timer")

if (startBtn) startBtn.addEventListener("click", (e) => startGame(e))

function startGame(e) {
  e.target.style.display = "none";
  board.style.display = "block";
  
  startTimer();
}

function startTimer() {
  const startTime = new Date().getTime()
  const timer = setInterval(() => {
      const now = new Date().getTime()
      const seconds = 60 - Math.floor(((now - startTime) % (1000 * 60)) / 1000)
      timerElem.innerHTML = `${seconds} s`
      if (seconds === 0)  exitGame(timer)
  })
}

function exitGame(timer) {
  clearInterval(timer)
}
