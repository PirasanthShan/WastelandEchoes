/**
 * Represents the display for collected crystals.
 * This class updates the image that visualizes the status of crystal collection.
 *
 * @class CollectibleBarCrystal
 * @extends {MovableObject}
 */
class CollectibleBarCrystal extends MovableObject {
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
   * Creates a new instance of CollectibleBarCrystal.
   * Loads the default image and all status images for the crystal display.
   */
  constructor() {
    super().loadImage('./img/crystalstatus.img/healthbar_0.webp');
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 90;
  }

  /**
   * Updates the display based on the number of collected crystals.
   *
   * @param {number} count - The number of collected crystals.
   * The value must be greater than 0 and less than or equal to the number of available images.
   * If a valid value is passed, the corresponding image is loaded.
   */
  setCrystals(count) {
    if (count > 0 && count <= this.IMAGES.length) {
      this.loadImage(this.IMAGES[count - 1]); 
    }
  }
}