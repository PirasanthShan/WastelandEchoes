/** 
 * @type {HTMLCanvasElement} The canvas element on which the game is rendered.
 */
let canvas;

/**
 * @type {World} The game world that contains all objects and logic.
 */
let world;

/**
 * @type {Object} An object that stores the state of keyboard inputs.
 * @property {boolean} RIGHT - Indicates whether the right arrow key is pressed.
 * @property {boolean} LEFT - Indicates whether the left arrow key is pressed.
 * @property {boolean} UP - Indicates whether the up arrow key is pressed.
 * @property {boolean} DOWN - Indicates whether the down arrow key is pressed.
 * @property {boolean} SPACE - Indicates whether the space key is pressed.
 */
let gameKeyboard = {
  RIGHT: false,
  LEFT: false,
  UP: false,
  DOWN: false,
  SPACE: false,
};

/**
 * Resets all key states in the `gameKeyboard` object to `false`.
 */
function resetKeyboard() {
  gameKeyboard.RIGHT = false;
  gameKeyboard.LEFT = false;
  gameKeyboard.UP = false;
  gameKeyboard.DOWN = false;
  gameKeyboard.SPACE = false;
}

/**
 * Initializes the game:
 * - Retrieves the canvas element from the DOM.
 * - Creates a new game world (`World`) and assigns it to the `world` variable.
 */
function init() {
  canvas = document.getElementById("canvas");
  if (!canvas) return;
  window.world = new World(canvas, gameKeyboard);
}

/**
 * Event listener for keydown events.
 * Updates the state of the keys in the `gameKeyboard` object when the game is running.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

/**
 * Event listener for keyup events.
 * Resets the state of the keys in the `gameKeyboard` object.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

/**
 * Event listener for touchstart events (mobile controls).
 * Updates the state of the keys in the `gameKeyboard` object based on the touched buttons.
 * @param {TouchEvent} e - The touch event.
 */
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

/**
 * Event listener for touchend events (mobile controls).
 * Resets the state of the keys in the `gameKeyboard` object when the touch ends.
 * @param {TouchEvent} e - The touch event.
 */
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