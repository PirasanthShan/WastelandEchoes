/**
 * Class representing a movable object in the game.
 * Inherits from DrawableObject.
 */
class MovableObject extends DrawableObject {
  /**
   * @property {number} speed - The speed of the object.
   * @property {boolean} otherDirection - Determines if the object moves in the opposite direction.
   * @property {number} speedY - Vertical speed for jumping.
   * @property {number} acceleration - Acceleration affecting vertical movement.
   * @property {number} energy - The object's energy level.
   * @property {number} lastHit - Timestamp of the last hit received.
   */
  speed = 0.20;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  energy = 100;
  lastHit = 0;

  /**
   * Creates an instance of MovableObject.
   */
  constructor() {
      super();
      this.currentImage = 0;
  }

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
      setInterval(() => {
          if (this.isAboveGround() || this.speedY > 0) {
              this.y -= this.speedY;
              this.speedY -= this.acceleration;
          } else {
              this.y = 310;
              this.speedY = 0;
          }
      }, 1000 / 35);
  }

  /**
   * Checks if the object is above ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
      if (this instanceof ThrowableObject) {
          return true;
      } else {
          return this.y < 310;
      }
  }

  /**
   * Checks collision with another object.
   * @param {Object} mo - The other object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(mo) {
      return CollisionHandler.isCollidingDefault(this, mo);
  }

  /**
   * Checks collision with a bomb.
   * @param {Object} mo - The other object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingBomb(mo) {
      return CollisionHandler.isCollidingBomb(this, mo);
  }

  /**
   * Checks collision with the boss enemy.
   * @param {Object} mo - The other object.
   * @param {number} [overlapThreshold=0.7] - The overlap threshold for collision detection.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingBoss(mo, overlapThreshold = 0.7) {
      return CollisionHandler.isCollidingBoss(this, mo, overlapThreshold);
  }

  /**
   * Checks collision with a bomb endboss.
   * @param {Object} mo - The other object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingBombEndboss(mo) {
      return CollisionHandler.isCollidingBombEndboss(this, mo);
  }

  /**
   * Checks collision with a collectible.
   * @param {Object} mo - The other object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingCollectible(mo) {
      return CollisionHandler.isCollidingCollectible(this, mo);
  }

  /**
   * Checks collision with a ship.
   * @param {Object} mo - The other object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCollidingShip(mo) {
      return CollisionHandler.isCollidingShip(this, mo);
  }

  /**
   * Checks if the object has been recently hurt.
   * @returns {boolean} True if the object was recently hit, false otherwise.
   */
  isHurt() {
      let timePassed = new Date().getTime() - this.lastHit;
      return timePassed / 1000 < 0.5;
  }

  /**
   * Reduces the object's energy upon being hit.
   */
  hit() {
      this.energy -= 10;
      if (this.energy < 0) {
          this.energy = 0;
      } else {
          this.lastHit = new Date().getTime();
      }
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if energy is zero, false otherwise.
   */
  isDead() {
      return this.energy === 0;
  }

  /**
   * Plays an animation by cycling through images.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
      this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
      this.x -= this.speed;
  }

  /**
   * Makes the object jump.
   */
  jump() {
      this.speedY = 25;
  }
}
