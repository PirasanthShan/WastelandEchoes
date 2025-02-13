let canvas;
let world;
let gameKeyboard = {
  RIGHT: false,
  LEFT: false,
  UP: false,
  DOWN: false,
  SPACE: false,
};

// Hilfsfunktion zum Zurücksetzen der Tastenzustände
function resetKeyboard() {
  gameKeyboard.RIGHT = false;
  gameKeyboard.LEFT = false;
  gameKeyboard.UP = false;
  gameKeyboard.DOWN = false;
  gameKeyboard.SPACE = false;
}

function init() {
  canvas = document.getElementById("canvas");
  if (!canvas) {
    return;
  }
  world = new World(canvas, gameKeyboard);
}

// Keydown-Listener: Verarbeiten nur, wenn das Spiel läuft
window.addEventListener("keydown", (e) => {
  if (typeof world === "undefined" || !world?.isGameRunning) return;

  switch (e.key) {
    case "ArrowRight":
      gameKeyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      gameKeyboard.LEFT = true;
      break;
    case "ArrowUp":
      gameKeyboard.UP = true;
      break;
    case "ArrowDown":
      gameKeyboard.DOWN = true;
      break;
    case " ":
      gameKeyboard.SPACE = true;
      break;
  }
});

// Keyup-Listener: Immer verarbeiten, damit die Tasten beim Loslassen zurückgesetzt werden
window.addEventListener("keyup", (e) => {
  if (typeof world === "undefined") return;

  switch (e.key) {
    case "ArrowRight":
      gameKeyboard.RIGHT = false;
      break;
    case "ArrowLeft":
      gameKeyboard.LEFT = false;
      break;
    case "ArrowUp":
      gameKeyboard.UP = false;
      break;
    case "ArrowDown":
      gameKeyboard.DOWN = false;
      break;
    case " ":
      gameKeyboard.SPACE = false;
      break;
  }
});

// Touch-Events für mobile Steuerung
document.addEventListener("touchstart", (e) => {
  if (typeof world === "undefined" || !world?.isGameRunning) return;

  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/leftarrow.webp"]')) {
    gameKeyboard.LEFT = true;
  }
  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/rightarrow.webp"]')) {
    gameKeyboard.RIGHT = true;
  }
  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/jumparrow.webp.png"]')) {
    gameKeyboard.UP = true;
  }
  if (e.target.matches('.phoneControllBtn .bombimg[src="./img/bomb2.webp"]')) {
    gameKeyboard.SPACE = true;
  }
});

document.addEventListener("touchend", (e) => {
  if (typeof world === "undefined" || !world?.isGameRunning) return;

  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/leftarrow.webp"]')) {
    gameKeyboard.LEFT = false;
  }
  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/rightarrow.webp"]')) {
    gameKeyboard.RIGHT = false;
  }
  if (e.target.matches('.phoneControllBtn .ctrimg[src="./img/jumparrow.webp.png"]')) {
    gameKeyboard.UP = false;
  }
  if (e.target.matches('.phoneControllBtn .bombimg[src="./img/bomb2.webp"]')) {
    gameKeyboard.SPACE = false;
  }
});
