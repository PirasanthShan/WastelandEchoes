/**
 * Erzeugt ein neues BackgroundObject, das als Hintergrund im Spiel verwendet wird.
 *
 * @param {string} imagePath - Der Pfad zum Bild, das als Hintergrund angezeigt wird.
 * @param {number} x - Die horizontale Position des Hintergrundobjekts.
 * @param {number} [width=720] - Die Breite des Hintergrundobjekts. Standardwert ist 720, falls kein Wert übergeben wird.
 * @param {number} [height=480] - Die Höhe des Hintergrundobjekts. Standardwert ist 480, falls kein Wert übergeben wird.
 */
class BackgroundObject extends MovableObject {
  constructor(imagePath, x, width = 720, height = 480) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.width = width;
    this.height = height;
    // Positioniert das Objekt so, dass es am unteren Rand (bei y = 480) liegt:
    this.y = 480 - this.height;
  }
}
