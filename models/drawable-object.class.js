/**
 * Basisklasse für alle Objekte, die gezeichnet werden können.
 * Enthält Methoden zum Laden von Bildern, Zeichnen auf einem Canvas
 * und zum Verwalten eines Bild-Caches.
 *
 * @class DrawableObject
 */
class DrawableObject {
  /** @type {HTMLImageElement} */
  img;
  /** @type {Object<string, HTMLImageElement>} */
  imageCache = {};
  /** @type {number} */
  currentImage = 0;
  /** Horizontale Position des Objekts. @type {number} */
  x = 80;
  /** Vertikale Position des Objekts. @type {number} */
  y = 270;
  /** Höhe des Objekts. @type {number} */
  height = 150;
  /** Breite des Objekts. @type {number} */
  width = 150;
  /** Debugging-Modus, standardmäßig deaktiviert. @type {boolean} */
  DEBUG_MODE = false;

  /**
   * Lädt ein Bild aus dem angegebenen Pfad und speichert es in der Eigenschaft `img`.
   *
   * @param {string} path - Der Pfad zum Bild, das geladen werden soll.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Zeichnet das aktuell geladene Bild auf den übergebenen Canvas-Kontext.
   *
   * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Zeichnet einen Rahmen um das Objekt, wenn DEBUG_MODE aktiviert ist und das Objekt
   * eine Instanz von Collectible2 oder Character ist.
   *
   * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
   */
  drawFrame(ctx) {
    if (this.DEBUG_MODE && (this instanceof Collectible || this instanceof Character)) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Lädt mehrere Bilder aus einem Array von Bildpfaden und speichert diese im imageCache.
   *
   * @param {string[]} arr - Ein Array von Bildpfaden, die geladen werden sollen.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
