/**
 * Class responsible for rendering the game frame and managing the display of objects.
 * This class handles drawing all objects on the canvas and managing the camera.
 */
class RenderingManager {
 
  constructor(world) {
  this.world = world;
  this.ctx = world.ctx;
  }

  /**
   * Renders a single frame of the game.
   * Stops sounds if the game is not running.
   */
  renderFrame() {
    if (!this.world.isGameRunning) {
      this.world.soundManager.stopAllSounds();
      return;
    }
    
    this.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    this.ctx.translate(this.world.camera_x, 0);
    this.addObjectsToMap(this.world.level.backgroundObjects);
    this.ctx.translate(-this.world.camera_x, 0);
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.collectibleBar);
    this.addToMap(this.world.crystalBar);
    this.ctx.translate(this.world.camera_x, 0);
    this.addToMap(this.world.character);
    if (!this.world.endboss.isRemoved) {this.addToMapEndboss(this.world.endboss);}
    this.world.enemies.forEach((enemy) => {if (!enemy.isRemoved) {
    this.addToMap(enemy);}});
    this.addObjectsToMap(this.world.level.birds);
    this.addObjectsToMap(this.world.throwableObjects);
    this.addObjectsToMap(this.world.level.collectible);
    this.addObjectsToMap(this.world.level.collectible2);
    this.addToMap(this.world.level.lastCollectible);
    this.ctx.translate(-this.world.camera_x, 0);
    this.world.renderRequestId = requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Resumes all sounds in the game, including the music of the last collectible, if applicable.
   */
  resumeAllSounds() {
    this.world.soundManager.resumeAllSounds();
    if (this.world.lastCollectible) {
      this.world.lastCollectible.resumeMusic();
    }
  }

  /**
   * Stops all sounds in the game, including the music of the last collectible, if applicable.
   */
  stopAllSounds() {
    this.world.soundManager.stopAllSounds();
    if (this.world.lastCollectible) {
      this.world.lastCollectible.stopMusic();
    }
  }

  /**
   * Adds multiple objects to the canvas map.
   * @param {Object[]} objects - An array of objects to be added.
   */
  addObjectsToMap(objects) {
    if (!Array.isArray(objects)) return;
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the canvas map.
   * @param {MovableObject} mo - The object to be added.
   */
  addToMap(mo) {
    if (!mo) return;
    if (mo.otherDirection) this.flipImage(mo);
    if (mo.img) mo.draw(this.ctx);
    if (mo.img) mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Adds the endboss separately to the canvas.
   * This method uses the custom drawEndboss() method of the endboss to draw it correctly (with flip).
   *
   * @param {Endboss} endboss - The endboss instance to be drawn.
   */
  addToMapEndboss(endboss) {
    if (!endboss) return;
    endboss.drawEndboss(this.ctx);
    if (endboss.drawFrame && typeof endboss.drawFrame === 'function') {
      endboss.drawFrame(this.ctx);
    }
  }

  /**
   * Flips an image horizontally before rendering.
   * @param {MovableObject} mo - The object whose image should be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Restores the flipped image to its original orientation.
   * @param {MovableObject} mo - The object whose image should be restored.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }
}