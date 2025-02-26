/**
 * Class representing a movable object in the game.
 * Inherits from DrawableObject.
 */
class MovableObject extends DrawableObject {
    /**
     * @property {number} speed - The speed of the object.
     * @property {boolean} otherDirection - Determines if the object is moving in the opposite direction.
     * @property {number} speedY - Vertical speed for jumping.
     * @property {number} acceleration - Acceleration affecting vertical movement.
     * @property {number} energy - The energy value of the object.
     * @property {number} lastHit - Timestamp of the last hit taken.
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
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 310;
        }
    }

    /**
     * Checks for a collision with another object.
     * @param {Object} mo - The other object.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isColliding(mo) {
        return CollisionHandler.isCollidingDefault(this, mo);
    }

    /**
     * Checks for a collision with a bomb.
     * @param {Object} mo - The other object.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isCollidingBomb(mo) {
        return CollisionHandler.isCollidingBomb(this, mo);
    }

    /**
     * Checks for a collision with the boss enemy.
     * @param {Object} mo - The other object.
     * @param {number} [overlapThreshold=0.7] - The overlap threshold for collision detection.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isCollidingBoss(mo, overlapThreshold = 0.7) {
        return CollisionHandler.isCollidingBoss(this, mo, overlapThreshold);
    }

    /**
     * Checks for a collision with an endboss bomb.
     * @param {Object} mo - The other object.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isCollidingBombEndboss(mo) {
        return CollisionHandler.isCollidingBombEndboss(this, mo);
    }

    /**
     * Checks for a collision with a collectible object.
     * @param {Object} mo - The other object.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isCollidingCollectible(mo) {
        return CollisionHandler.isCollidingCollectibleEchoes(this, mo);
    }

    /**
     * Checks for a collision with a ship.
     * @param {Object} mo - The other object.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isCollidingShip(mo) {
        return CollisionHandler.isCollidingShip(this, mo);
    }

    /**
     * Checks if the object has recently taken damage.
     * @returns {boolean} True if the object was recently hit, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed / 1000 < 0.5;
    }

    /**
     * Reduces the object's energy when hit.
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
     * @returns {boolean} True if the energy is zero, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Plays an animation by cycling through the images.
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