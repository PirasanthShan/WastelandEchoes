/**
 * Manages the throwing of bombs in the game world.
 * This class is responsible for the logic of bomb throwing, collision detection, and animations.
 */
class ThrowManager {
  /**
   * Creates a new instance of `ThrowManager`.
   * @param {World} world - The game world where bomb throwing occurs.
   */
  constructor(world) {
    /** @type {World} Reference to the game world. */
    this.world = world;
  }

  /**
   * Checks if a bomb can be thrown and either executes the throw or shows a warning.
   */
  checkThrowObjects() {
    if (this.canThrowBomb()) {
      this.executeBombThrow();
    } else if (this.world.characterBombs === 0) {
      this.showAlertBomb();
    }
  }

  /**
   * Checks if the character can throw a bomb.
   * @returns {boolean} True if the character can throw a bomb.
   */
  canThrowBomb() {
    return (
      this.world.keyboard.SPACE &&
      !this.world.character.isAttacking &&
      this.world.characterBombs > 0 &&
      !this.world.character.isAboveGround()
    );
  }

  /**
   * Creates a new bomb and adds it to the game world.
   * @returns {ThrowableObject} The created bomb.
   */
  createBomb() {
    const bomb = new ThrowableObject(
      this.world.character.x,
      this.world.character.y,
      this.world.character.otherDirection
    );

    // Inherits the mute state from the game world
    bomb.toggleMute(this.world.isMuted);

    this.world.throwableObjects.push(bomb);
    return bomb;
  }

  /**
   * Executes the throwing of a bomb:
   * - Sets the character's attack state.
   * - Decreases the number of available bombs.
   * - Creates a bomb and handles its collision.
   * - Plays the character's attack animation.
   */
  executeBombThrow() {
    this.world.character.isAttacking = true;
    this.world.characterBombs = this.world.collectibleBar.handleBombThrow(this.world.characterBombs);

    if (this.world.characterBombs >= 0) {
      const bomb = this.createBomb();
      this.handleBombCollision(bomb);
      this.animateCharacterAttack();
    }

    this.world.toggleAlertBomb(false);
  }

  /**
   * Shows a warning if no bombs are available.
   */
  showAlertBomb() {
    this.world.toggleAlertBomb(true);
  }

  /**
   * Handles the collision of a bomb with enemies.
   * @param {ThrowableObject} bomb - The thrown bomb.
   */
  handleBombCollision(bomb) {
    const collisionInterval = setInterval(() => {
      this.world.enemies.forEach((enemy) => {
        if (this.isBombHittingEnemy(bomb, enemy)) {
          this.triggerBombExplosion(bomb);
          this.handleEnemyHit(enemy);
          clearInterval(collisionInterval);
        }
      });
    }, 50);
  }

  /**
   * Triggers the explosion of a bomb.
   * @param {ThrowableObject} bomb - The exploding bomb.
   */
  triggerBombExplosion(bomb) {
    // The sound is already played in playExplosion() if not muted.
    bomb.playExplosion(() => {
      this.world.removeBomb(bomb);
    });
  }

  /**
   * Handles an enemy being hit by a bomb.
   * @param {Enemy} enemy - The hit enemy.
   */
  handleEnemyHit(enemy) {
    enemy.playDeadAnimation(() => {
      this.world.removeEnemy(enemy);
      enemy.img = null;
    });
  }

  /**
   * Checks if a bomb hits an enemy.
   * @param {ThrowableObject} bomb - The thrown bomb.
   * @param {Enemy} enemy - The enemy being checked.
   * @returns {boolean} True if the bomb hits the enemy.
   */
  isBombHittingEnemy(bomb, enemy) {
    return bomb.isCollidingBomb(enemy) && !enemy.isDead;
  }

  /**
   * Plays the character's attack animation.
   */
  animateCharacterAttack() {
    const images = this.world.character.IMAGES_ATTACK;
    let frameIndex = 0;

    const animationInterval = setInterval(() => {
      this.world.character.img = this.world.character.imageCache[images[frameIndex++]];
      if (frameIndex >= images.length) {
        clearInterval(animationInterval);
        this.world.character.isAttacking = false;
      }
    }, 1000 / 35);
  }
}