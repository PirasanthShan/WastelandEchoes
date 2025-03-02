/**
 * Represents a bird that flies across the canvas.
 * The bird starts outside the visible area on the right side
 * and moves to the left. Once it leaves the canvas, its position is reset.
 */
class Bird extends MovableObject {
  height = 300;
  width = 300;

  /**
   * Creates a new instance of Bird.
   * Loads the bird image, sets the starting position, and starts the animation.
   */
  constructor() {
    super();
    this.loadImage('./img/bird1.webp');
    this.resetPosition(); 
    this.animate();       
  }

  /**
   * Resets the bird's position.
   * The bird starts outside the canvas (right) with a random vertical position
   * and a random speed.
   */
  resetPosition() {
    this.x = 3000; 
    this.y = 20 + Math.random() * 60; 
    this.speed = 1 + Math.random() * 2; 
  }

  /**
   * Animates the bird by continuously moving it to the left.
   * If the bird completely leaves the visible area (left),
   * its position is reset.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed; 
      if (this.x + this.width < 0) {
        this.resetPosition(); 
      }
    }, 1000 / 60);
  }
}