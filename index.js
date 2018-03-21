const startBtn = document.getElementById("start-button")
const board = document.getElementById("game-board")
const textContainer = document.getElementById("text-container")

if (startBtn) startBtn.addEventListener("click", (e) => startGame(e))

function startGame(e) {
  e.target.style.display = "none";
  board.style.display = "block";
  const timer = startTimer();
}

function startTimer() {
  const startTime = new Date().getTime()
  return setInterval(() => {
      const now = new Date().getTime()
      const seconds = Math.floor(((now - startTime) % (1000 * 60)) / 1000)
      
  })
}
