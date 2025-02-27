/**
 * Provides static methods for collision detection between two objects.
 *
 * @class CollisionHandler
 */
class CollisionHandler {
  /**
   * Calculates the collision between two objects based on overlap factors.
   *
   * @param {Object} obj1 - The first object, must have properties x, y, width, and height.
   * @param {Object} obj2 - The second object, must have properties x, y, width, and height.
   * @param {number} overlapXFactor - Multiplier for the minimum required overlap on the x-axis.
   * @param {number} overlapYFactor - Multiplier for the minimum required overlap on the y-axis.
   * @returns {boolean} true if the overlap on both axes is greater than the minimum values, otherwise false.
   */
  static isColliding(obj1, obj2, overlapXFactor, overlapYFactor) {
    const overlapX = Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x);
    const overlapY = Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y);
    const minOverlapX = Math.min(obj1.width, obj2.width) * overlapXFactor;
    const minOverlapY = Math.min(obj1.height, obj2.height) * overlapYFactor;
    return overlapX > minOverlapX && overlapY > minOverlapY;
  }

  /**
   * Checks the default collision between two objects with fixed factors (0.6 for both axes).
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The second object.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
  static isCollidingDefault(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.5, 0.6);
  }

  /**
   * Checks the collision between two objects when a bomb object is involved.
   * A higher factor for the x-axis (0.9) is used here.
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The second object.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
  static isCollidingBomb(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.9, 0.6);
  }

  /**
   * Checks the collision between two collectible objects.
   * 
   * Note: There was an earlier version with factors (0.6, 0.7),
   * which is overridden here by the following definition (0.5, 0.5).
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The second object.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
  static isCollidingCollectibleEchoes(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.5, 0.5);
  }

   /**
   * Checks the collision between two collectible objects.
   * 
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The second object.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
   static isCollidingBombCollectible(obj1, obj2) {
   return this.isColliding(obj1, obj2, 0.3, 0.7);
  }


  /**
   * Checks the collision between an object and a spaceship.
   * Almost complete overlap is required here (factors 0.99).
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The spaceship object.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
  static isCollidingShip(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.99, 0.99);
  }

  /**
   * Checks the collision between an object and the end boss.
   * A uniform overlap factor is used, which can optionally be adjusted.
   *
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The end boss object.
   * @param {number} [overlapThreshold=0.7] - The overlap factor used for both axes.
   * @returns {boolean} true if the objects collide, otherwise false.
   */
  static isCollidingBoss(obj1, obj2, overlapThreshold = 0.7) {
    return this.isColliding(obj1, obj2, overlapThreshold, overlapThreshold);
  }

  /**
   * Checks the collision between a bomb and the end boss.
   * Slightly stricter factors (0.8) are used here.
   *
   * @param {Object} obj1 - The bomb object.
   * @param {Object} obj2 - The end boss object.
   * @returns {boolean} true if the bomb hits the end boss, otherwise false.
   */
  static isCollidingBombEndboss(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.8, 0.8);
  }
}