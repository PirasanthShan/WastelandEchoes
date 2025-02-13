/**
 * Repräsentiert ein Sammelobjekt im Spiel (z. B. Bomben oder Kristalle).
 * Diese Objekte erben von MovableObject und besitzen definierte Positionen und Größen.
 *
 * @class Collectible
 * @extends {MovableObject}
 */
class Collectible extends MovableObject {
  width = 30;
  height = 30;

  /**
   * Erzeugt eine neue Instanz von Collectible.
   *
   * @param {string} imagePath - Der Pfad zum Bild des Sammelobjekts.
   * @param {number} y - Die vertikale Position des Objekts.
   * @param {number} x - Die horizontale Position des Objekts.
   * @param {number} width - Die Breite des Objekts.
   * @param {number} height - Die Höhe des Objekts.
   */
  constructor(imagePath, y, x, width, height) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
