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
   * Checks for collision between the character and the endboss.
   * If the endboss is dead, the level end position is unlocked.
   * If a collision occurs, the character takes damage.
   */
  handleCollisionEndboss() {
    if (this.world.endboss.isDead) {
        this.world.level.level_end_x = 2500;
        return;
    }

    if (this.world.character.isCollidingBoss(this.world.endboss, 0.45)) {
        this.handleCharacterHitByEndboss();
    } else {
        this.world.endboss.isAttacking = false;
        if (!this.world.endboss.isHurt) {
            this.world.endboss.playSound(this.world.endboss.walkSound);
        }
    }
  }

  /**
  * Handles the event when the character is hit by the endboss.
  * Reduces character health, updates the status bar, 
  * and triggers the death animation if health reaches zero.
  */
  handleCharacterHitByEndboss() {
    this.world.endboss.isAttacking = true;
    this.world.character.isHurt();
    this.world.character.hit();
    this.world.updateStatusBar();

    if (this.world.character.energy <= 0) {
        this.world.character.playDeathAnimation(() => {
            this.world.stopGame();
        });
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
 * Checks for collisions between the character and bomb collectibles.
 * If collected, increases the bomb count and updates the UI.
 */
checkBombCollectibleCollision() {
  for (let i = this.world.level.collectible.length - 1; i >= 0; i--) {
      let collectible = this.world.level.collectible[i];
      if (this.world.character.isCollidingBombCollectible(collectible)) {
          if (this.world.characterBombs < this.world.maxBombs) {
              this.world.characterBombs++;
              this.world.collectibleBar.setBombs(this.world.characterBombs);
              this.world.level.collectible.splice(i, 1);
              this.world.toggleAlertBomb();
          }
      }
  }
}

/**
* Checks for collisions between the character and crystal collectibles.
* If collected, increases the crystal count and updates the UI.
*/
checkCrystalCollectibleCollision() {
  for (let i = this.world.level.collectible2.length - 1; i >= 0; i--) {
      const echo = this.world.level.collectible2[i];
      if (this.world.character.isCollidingEchoCollectible(echo)) {
          if (this.world.characterCrystals < this.world.maxCrystals) {
              this.world.characterCrystals++;
              this.world.level.collectible2.splice(i, 1);
              this.world.crystalBar.setCrystals(this.world.characterCrystals);
          }
      }
  }
  this.world.updateCrystalBar();
}

  /**
  * Calls both collectible collision functions.
  */
  checkCollectibleCollision() {
    this.checkBombCollectibleCollision();
    this.checkCrystalCollectibleCollision();
  }


}