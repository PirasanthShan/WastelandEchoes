/**
 * Klasse zur Darstellung der Statusleiste im Spiel.
 */
class Statusbar extends DrawableObject {
  /**
   * @property {number} width - Die Breite der Statusleiste.
   * @property {number} height - Die Höhe der Statusleiste.
   * @property {string[]} IMAGES - Die verschiedenen Bilder für unterschiedliche Zustände der Statusleiste.
   * @property {number} percentage - Der aktuelle Prozentsatz der Statusleiste.
   */
  width = 250;
  height = 30;
  IMAGES = [
      './img/status.img/full_range_hp_bar_0.webp',
      './img/status.img/full_range_hp_bar_10.webp',
      './img/status.img/full_range_hp_bar_20.webp',
      './img/status.img/full_range_hp_bar_30.webp',
      './img/status.img/full_range_hp_bar_40.webp',
      './img/status.img/full_range_hp_bar_50.webp',
      './img/status.img/full_range_hp_bar_60.webp',
      './img/status.img/full_range_hp_bar_70.webp',
      './img/status.img/full_range_hp_bar_80.webp',
      './img/status.img/full_range_hp_bar_90.webp',
      './img/status.img/full_range_hp_bar_100.webp',
  ];

  percentage = 100;

  /**
   * Erstellt eine neue Instanz der Statusleiste.
   */
  constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 0;
      this.y = 60;
      this.setPercentage(100);
  }

  /**
   * Setzt den Prozentsatz der Statusleiste und aktualisiert das Bild.
   * @param {number} percentage - Der neue Prozentsatz der Statusleiste (0-100).
   */
  setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path]; // Setzt das Bild entsprechend des Prozentsatzes
  }

  /**
   * Ermittelt den Index des Bildes basierend auf dem aktuellen Prozentsatz.
   * @returns {number} Der Index des passenden Bildes in der IMAGES-Liste.
   */
  resolveImageIndex() {
      if (this.percentage >= 100) return 10;
      if (this.percentage >= 90) return 9;
      if (this.percentage >= 80) return 8;
      if (this.percentage >= 70) return 7;
      if (this.percentage >= 60) return 6;
      if (this.percentage >= 50) return 5;
      if (this.percentage >= 40) return 4;
      if (this.percentage >= 30) return 3;
      if (this.percentage >= 20) return 2;
      if (this.percentage >= 10) return 1;
      return 0;
  }
}
