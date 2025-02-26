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
    this.resetPosition(); // Resets the bird's starting position
    this.animate();       // Starts the bird's animation (movement)
  }

  /**
   * Resets the bird's position.
   * The bird starts outside the canvas (right) with a random vertical position
   * and a random speed.
   */
  resetPosition() {
    this.x = 3000; // Starts outside the canvas (right)
    this.y = 20 + Math.random() * 60; // Random height within a range (between 20 and 80)
    this.speed = 1 + Math.random() * 2; // Random speed between 1 and 3
  }

  /**
   * Animates the bird by continuously moving it to the left.
   * If the bird completely leaves the visible area (left),
   * its position is reset.
   */
  animate() {
    setInterval(() => {
      this.x -= this.speed; // Moves the bird to the left

      // Checks if the bird has left the canvas (left)
      if (this.x + this.width < 0) {
        this.resetPosition(); // Resets the position if the bird is no longer visible
      }
    }, 1000 / 60); // Animation interval: 60 FPS for smooth movement
  }
}