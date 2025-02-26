/**
 * Manages all collision checks in the game.
 * This class checks collisions between the character and enemies, the end boss, bombs, collectibles, and the spaceship.
 *
 * @class CollisionManager
 */
class CollisionManager {
  /**
   * Creates an instance of CollisionManager.
   *
   * @param {World} world - The instance of the game world containing all relevant objects.
   */
  constructor(world) {
    this.world = world; // Reference to the `World` instance
  }

  /**
   * Checks all relevant collisions in the game.
   * Iterates through the list of enemies and checks collisions between the character and enemies,
   * as well as collisions with the spaceship and crystals.
   */
  checkCollision() {
    this.world.enemies.forEach((enemy) => {
      if (enemy.isDead) return;
      if (this.world.character.isDead()) {
        this.handleCharacterDeath();
        return;
      } else if (this.world.character.isColliding(enemy)) {
        this.handleZombieAttack(enemy);
      } else {
        this.handleDefaultZombieBehavior(enemy);
      }
    });
    this.checkShipCollision();
   }

  /**
   * Called when the character is dead.
   * If the end boss is still alive, it is reset to its idle state.
   * Then, the character's death animation is played, and the game is stopped.
   */
  handleCharacterDeath() {
    if (this.world.endboss && !this.world.endboss.isDead) {
      this.resetEndbossState();
    }
    this.world.character.playDeathAnimation(() => {
      this.world.stopGame();
    });
  }

  /**
   * Resets the end boss to its neutral idle state.
   * Resets all attack states, plays the idle animation, and stops and resets any end boss sounds.
   */
  resetEndbossState() {
    this.world.endboss.isAttacking = false;
    this.world.endboss.isMovingLeft = false;
    this.world.endboss.isHurt = false;
    this.world.endboss.playAnimation(this.world.endboss.IMAGES_STANDING);
    if (this.world.endboss.walkSound) {
      this.world.endboss.walkSound.pause();
      this.world.endboss.walkSound.currentTime = 0;
    }
    if (this.world.endboss.attackSound) {
      this.world.endboss.attackSound.pause();
      this.world.endboss.attackSound.currentTime = 0;
    }
  }

  /**
   * Checks the collision between the character and the spaceship.
   * If the character collides with the spaceship, it checks if all crystals have been collected.
   * If the collection is complete, the "You Win" screen is displayed, and the game ends.
   * Otherwise, a hint is displayed indicating that crystals are still missing.
   */
  checkShipCollision() {
    if (this.world.character.isCollidingShip(this.world.lastCollectible)) {
      if (this.world.characterCrystals >= this.world.maxCrystals) {
        this.world.interfaceRenderer.renderYouWin();
        this.world.isGameRunning = false;
      } else {
        this.world.interfaceRenderer.renderAlertBomb('crystals');
      }
    }
  }

  /**
   * Checks if no bombs are left and the end boss is still alive.
   * Displays a warning in this case; otherwise, all warnings are hidden.
   */
  checkRemainingBombs() {
    const noBombsLeft = this.world.level.collectible.length === 0;
    const isEndbossAlive = !this.world.endboss.isDead;
    if (noBombsLeft && isEndbossAlive) {
      this.world.interfaceRenderer.renderAlertBomb();
    } else {
      this.world.interfaceRenderer.hideAlertsBomb();
    }
  }

  /**
   * Handles a zombie's attack on the character.
   * Sets the enemy's speed to 0, plays the attack animation,
   * causes the character to take damage, and updates the status bar.
   * If the character's energy is depleted, the death animation is played.
   *
   * @param {Enemy} enemy - The enemy object performing the attack.
   */
  handleZombieAttack(enemy) {
    enemy.speed = 0;
    if (enemy.IMAGES_ATTACK) {
      enemy.playAnimation(enemy.IMAGES_ATTACK, 250);
    }
    this.world.character.hit();
    this.world.updateStatusBar();
    if (this.world.character.energy <= 0) {
      this.world.character.playDeathAnimation(() => {
        this.world.stopGame();
      });
    }
  }

  /**
   * Handles the default behavior of a zombie when no collision with the character occurs.
   * Sets the enemy's speed and moves it to the left while playing the walking animation.
   *
   * @param {Enemy} enemy - The enemy object.
   */
  handleDefaultZombieBehavior(enemy) {
    enemy.speed = 0.20;
    enemy.moveLeft();
    enemy.playAnimation(enemy.IMAGES_WALKING);
  }

  /**
   * Checks the collision between the end boss and the character.
   * If both objects exist, the collision handling between the end boss and the character is performed.
   */
  checkEndbossCollision() {
    if (this.world.endboss && this.world.character) {
      this.handleCollisionEndboss();
    }
  }

  /**
   * Handles the collision between the end boss and the character.
   * If the end boss is still alive, it checks if the character collides.
   * On collision, the end boss enters attack mode, the character takes damage, and the status bar is updated.
   * If the character's energy is depleted, the death animation is played.
   */
  handleCollisionEndboss() {
    if (this.world.endboss.isDead) {
      this.world.level.level_end_x = 2500;
      return;
    }
    if (this.world.character.isCollidingBoss(this.world.endboss, 0.45)) {
      this.world.endboss.isAttacking = true;
      this.world.character.isHurt();
      this.world.character.hit();
      this.world.updateStatusBar();
      if (this.world.character.energy <= 0) {
        this.world.character.playDeathAnimation(() => {
          this.world.stopGame();
        });
      }
    } else {
      this.world.endboss.isAttacking = false;
      if (!this.world.endboss.isHurt) {
        this.world.endboss.playSound(this.world.endboss.walkSound);
      }
    }
  }

  /**
   * Checks the collision between bombs (ThrowableObjects) and the end boss.
   * Iterates through all throwable objects and checks if a bomb hits the end boss.
   */
  checkEndbossCollisionBomb() {
    if (this.world.endboss && Array.isArray(this.world.throwableObjects)) {
      this.world.throwableObjects.forEach((bomb) => {
        if (bomb instanceof ThrowableObject && bomb.isCollidingBombEndboss(this.world.endboss)) {
          this.handleEndbossBomb(bomb);
        }
      });
    }
  }

  /**
   * Handles the collision between a bomb and the end boss.
   * Plays the bomb's explosion, removes the bomb, and triggers the hurt animation for the end boss.
   * After a short delay, the end boss is set back in motion.
   *
   * @param {ThrowableObject} bomb - The bomb that collided with the end boss.
   */
  handleEndbossBomb(bomb) {
    bomb.playExplosion(() => this.world.removeBomb(bomb));
    if (!this.world.endboss.isHurt && !this.world.endboss.isDead) {
      this.world.endboss.handleHurt();
    }
    setTimeout(() => {
      if (!this.world.endboss.isDead) {
        this.world.endboss.isHurt = false;
        this.world.endboss.playSound(this.world.endboss.walkSound);
      }
    }, 700);
  }

  /**
 * Checks collisions between the character and collectible items (bombs and asteroids).
 * 
 * For bombs (first type of collectibles), if a collision is detected and the character can carry more bombs,
 * the bomb count is incremented, the collectible bar is updated, and the collected object is removed.
 * 
 * For Echoes (second type of collectibles), a modified collision detection factor is used.
 * If a collision is detected and the character can collect more crystals,
 * the crystal count is incremented, the collectible is removed, and the crystal bar is updated.
 */
checkCollectibleCollision() {
  // For bombs (first collectibles) using the standard collision detection:
  this.world.level.collectible.forEach((collectible) => {
    if (this.world.character.isCollidingCollectible(collectible)) {
      if (this.world.characterBombs < this.world.maxBombs) {
        this.world.characterBombs++;
        this.world.collectibleBar.setBombs(this.world.characterBombs);
        this.world.level.collectible.splice(this.world.level.collectible.indexOf(collectible), 1);
        this.world.toggleAlertBomb();
      }
    }
  });

  // For asteroids (second collectibles) using the modified collision factor:
  this.world.level.collectible2.forEach((crystal, index) => {
    if (CollisionHandler.isCollidingCollectibleEchoes(this.world.character, crystal)) {
      if (this.world.characterCrystals < this.world.maxCrystals) {
        this.world.characterCrystals++;
        this.world.level.collectible2.splice(index, 1);
        this.world.crystalBar.setCrystals(this.world.characterCrystals);
      }
    }
  });
  this.world.updateCrystalBar();
 }

}