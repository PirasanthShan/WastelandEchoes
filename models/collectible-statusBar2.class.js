/**
 * Repräsentiert die Anzeige für die gesammelten Kristalle.
 * Diese Klasse aktualisiert das Bild, das den Status der Kristallsammlung visualisiert.
 *
 * @class CollectibleBar2
 * @extends {MovableObject}
 */
class CollectibleBar2 extends MovableObject {
  width = 220;
  height = 40;
  IMAGES = [
    './img/crystalstatus.img/healthbar_1.webp',
    './img/crystalstatus.img/healthbar_2.webp',
    './img/crystalstatus.img/healthbar_3.webp',
    './img/crystalstatus.img/healthbar_4.webp',
    './img/crystalstatus.img/healthbar_5.webp',
    './img/crystalstatus.img/healthbar_6.webp',
    './img/crystalstatus.img/healthbar_7.webp',
    './img/crystalstatus.img/healthbar_8.webp',
    './img/crystalstatus.img/healthbar_9.webp',
    './img/crystalstatus.img/healthbar_10.webp',
  ];

  /**
   * Erzeugt eine neue Instanz von CollectibleBar2.
   * Lädt das Standardbild und alle Statusbilder für die Kristallanzeige.
   */
  constructor() {
    super().loadImage('./img/crystalstatus.img/healthbar_0.webp');
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 90;
  }

  /**
   * Aktualisiert die Anzeige basierend auf der Anzahl der gesammelten Kristalle.
   *
   * @param {number} count - Die Anzahl der gesammelten Kristalle.
   * Der Wert muss größer als 0 und kleiner oder gleich der Anzahl der verfügbaren Bilder sein.
   * Wird ein gültiger Wert übergeben, so wird das entsprechende Bild geladen.
   */
  setCrystals(count) {
    if (count > 0 && count <= this.IMAGES.length) {
      this.loadImage(this.IMAGES[count - 1]); // Lade das passende Bild
    }
  }
}
