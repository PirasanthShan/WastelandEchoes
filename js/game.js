/** 
 * @type {HTMLCanvasElement} Das Canvas-Element, auf dem das Spiel gerendert wird.
 */
let canvas;

/**
 * @type {World} Die Spielwelt, die alle Objekte und Logik enthält.
 */
let world;

/**
 * @type {Object} Ein Objekt, das den Zustand der Tastatureingaben speichert.
 * @property {boolean} RIGHT - Gibt an, ob die rechte Pfeiltaste gedrückt ist.
 * @property {boolean} LEFT - Gibt an, ob die linke Pfeiltaste gedrückt ist.
 * @property {boolean} UP - Gibt an, ob die obere Pfeiltaste gedrückt ist.
 * @property {boolean} DOWN - Gibt an, ob die untere Pfeiltaste gedrückt ist.
 * @property {boolean} SPACE - Gibt an, ob die Leertaste gedrückt ist.
 */
let gameKeyboard = {
  RIGHT: false,
  LEFT: false,
  UP: false,
  DOWN: false,
  SPACE: false,
};

/**
 * Setzt alle Tastenzustände im `gameKeyboard`-Objekt auf `false` zurück.
 */
function resetKeyboard() {
  gameKeyboard.RIGHT = false;
  gameKeyboard.LEFT = false;
  gameKeyboard.UP = false;
  gameKeyboard.DOWN = false;
  gameKeyboard.SPACE = false;
}

/**
 * Initialisiert das Spiel:
 * - Holt das Canvas-Element aus dem DOM.
 * - Erstellt eine neue Spielwelt (`World`) und weist sie der Variable `world` zu.
 */
function init() {
  canvas = document.getElementById("canvas");
  if (!canvas) return;
  window.world = new World(canvas, gameKeyboard);
}


/**
 * Event-Listener für Tastendruck-Ereignisse (`keydown`).
 * Aktualisiert den Zustand der Tasten im `gameKeyboard`-Objekt, wenn das Spiel läuft.
 * @param {KeyboardEvent} e - Das Tastatur-Ereignis.
 */
window.addEventListener("keydown", (e) => {
  // Verarbeite Tastendrücke nur, wenn das Spiel läuft
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
 * Event-Listener für Tastenloslassen-Ereignisse (`keyup`).
 * Setzt den Zustand der Tasten im `gameKeyboard`-Objekt zurück.
 * @param {KeyboardEvent} e - Das Tastatur-Ereignis.
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
 * Event-Listener für Touchstart-Ereignisse (mobile Steuerung).
 * Aktualisiert den Zustand der Tasten im `gameKeyboard`-Objekt basierend auf den berührten Buttons.
 * @param {TouchEvent} e - Das Touch-Ereignis.
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
 * Event-Listener für Touchend-Ereignisse (mobile Steuerung).
 * Setzt den Zustand der Tasten im `gameKeyboard`-Objekt zurück, wenn die Berührung endet.
 * @param {TouchEvent} e - Das Touch-Ereignis.
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