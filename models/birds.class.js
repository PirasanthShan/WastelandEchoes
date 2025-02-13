/**
 * Repräsentiert einen Vogel, der über die Leinwand (Canvas) fliegt.
 * Der Vogel startet außerhalb des sichtbaren Bereichs auf der rechten Seite
 * und bewegt sich nach links. Sobald er den Canvas verlässt, wird seine Position zurückgesetzt.
 */
class Bird extends MovableObject {
  height = 300;
  width = 300;
  
  /**
   * Erzeugt eine neue Instanz von Bird.
   * Lädt das Bild des Vogels, setzt die Startposition und startet die Animation.
   */
  constructor() {
    super();
    this.loadImage('./img/bird1.webp');
    this.resetPosition(); // Setzt die Startposition des Vogels
    this.animate();       // Startet die Animation (Bewegung) des Vogels
  }

  /**
   * Setzt die Position des Vogels zurück.
   * Der Vogel startet außerhalb der Canvas (rechts) mit einer zufälligen vertikalen Position
   * und einer zufälligen Geschwindigkeit.
   */
  resetPosition() {
    this.x = 3000; // Start außerhalb der Canvas (rechts)
    this.y = 20 + Math.random() * 60; // Zufällige Höhe innerhalb eines Bereichs (zwischen 20 und 80)
    this.speed = 1 + Math.random() * 2; // Zufällige Geschwindigkeit zwischen 1 und 3
  }

  /**
   * Animiert den Vogel, indem er kontinuierlich nach links fliegt.
   * Wird der Vogel komplett aus dem sichtbaren Bereich entfernt (links),
   * wird seine Position zurückgesetzt.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed; // Bewegt den Vogel nach links

      // Überprüft, ob der Vogel die Canvas verlassen hat (links)
      if (this.x + this.width < 0) {
        this.resetPosition(); // Position zurücksetzen, wenn der Vogel nicht mehr sichtbar ist
      }
    }, 1000 / 60); // Animationsintervall: 60 FPS für flüssige Bewegung
  }
}
