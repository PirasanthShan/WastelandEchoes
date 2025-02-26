/**
 * Class representing the status bar in the game.
 */
class Statusbar extends DrawableObject {
    /**
     * @property {number} width - The width of the status bar.
     * @property {number} height - The height of the status bar.
     * @property {string[]} IMAGES - The different images for various states of the status bar.
     * @property {number} percentage - The current percentage of the status bar.
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
     * Creates a new instance of the status bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 60;
        this.setPercentage(100);
    }
  
    /**
     * Sets the percentage of the status bar and updates the image.
     * @param {number} percentage - The new percentage of the status bar (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]; // Sets the image according to the percentage
    }
  
    /**
     * Determines the index of the image based on the current percentage.
     * @returns {number} The index of the matching image in the IMAGES list.
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