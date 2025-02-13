/**
 * Verwaltet das Werfen von Bomben in der Spielwelt.
 * Diese Klasse ist für die Logik des Bombenwerfens, die Kollisionserkennung und die Animationen zuständig.
 */
class ThrowManager {
  /**
   * Erstellt eine neue Instanz des `ThrowManager`.
   * @param {World} world - Die Spielwelt, in der das Bombenwerfen stattfindet.
   */
  constructor(world) {
    /** @type {World} Referenz zur Spielwelt. */
    this.world = world;
  }

  /**
   * Überprüft, ob eine Bombe geworfen werden kann, und führt den Wurf aus oder zeigt eine Warnung an.
   */
  checkThrowObjects() {
    if (this.canThrowBomb()) {
      this.executeBombThrow();
    } else if (this.world.characterBombs === 0) {
      this.showAlertBomb();
    }
  }

  /**
   * Prüft, ob der Charakter eine Bombe werfen kann.
   * @returns {boolean} True, wenn der Charakter eine Bombe werfen kann.
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
   * Erstellt eine neue Bombe und fügt sie der Spielwelt hinzu.
   * @returns {ThrowableObject} Die erstellte Bombe.
   */
  createBomb() {
    const bomb = new ThrowableObject(
      this.world.character.x,
      this.world.character.y,
      this.world.character.otherDirection
    );

    // Übernimmt den Mute-Status aus der Spielwelt
    bomb.toggleMute(this.world.isMuted);

    this.world.throwableObjects.push(bomb);
    return bomb;
  }

  /**
   * Führt das Werfen einer Bombe aus:
   * - Setzt den Angriffsstatus des Charakters.
   * - Verringert die Anzahl der verfügbaren Bomben.
   * - Erstellt eine Bombe und behandelt deren Kollision.
   * - Spielt die Angriffsanimation des Charakters ab.
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
   * Zeigt eine Warnung an, wenn keine Bomben mehr verfügbar sind.
   */
  showAlertBomb() {
    this.world.toggleAlertBomb(true);
  }

  /**
   * Behandelt die Kollision einer Bombe mit Feinden.
   * @param {ThrowableObject} bomb - Die geworfene Bombe.
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
   * Löst die Explosion einer Bombe aus.
   * @param {ThrowableObject} bomb - Die explodierende Bombe.
   */
  triggerBombExplosion(bomb) {
    bomb.playExplosion(() => {
      this.world.removeBomb(bomb);
    });

    if (!this.world.isMuted) {
      bomb.explosion_sound.play().catch(() => {});
    }
  }

  /**
   * Behandelt das Treffen eines Feindes durch eine Bombe.
   * @param {Enemy} enemy - Der getroffene Feind.
   */
  handleEnemyHit(enemy) {
    enemy.playDeadAnimation(() => {
      this.world.removeEnemy(enemy);
      enemy.img = null;
    });
  }

  /**
   * Überprüft, ob eine Bombe einen Feind trifft.
   * @param {ThrowableObject} bomb - Die geworfene Bombe.
   * @param {Enemy} enemy - Der Feind, der überprüft wird.
   * @returns {boolean} True, wenn die Bombe den Feind trifft.
   */
  isBombHittingEnemy(bomb, enemy) {
    return bomb.isCollidingBomb(enemy) && !enemy.isDead;
  }

  /**
   * Spielt die Angriffsanimation des Charakters ab.
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