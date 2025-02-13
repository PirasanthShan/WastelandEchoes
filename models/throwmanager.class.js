class ThrowManager {
  constructor(world) {
    this.world = world; // Referenz zur `World`-Instanz
  }

  checkThrowObjects() {
    if (this.canThrowBomb()) {
        this.executeBombThrow();
    } else if (this.world.characterBombs === 0) {
        this.showAlertBomb();
    }
}

/**
 * Prüft, ob eine Bombe geworfen werden kann.
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


  createBomb() {
    const bomb = new ThrowableObject(
      this.world.character.x,
      this.world.character.y,
      this.world.character.otherDirection
    );

    // ✅ Sofort den Mute-Status aus der Welt übernehmen
    bomb.toggleMute(this.world.isMuted);

    this.world.throwableObjects.push(bomb);
    return bomb;
  }
  checkThrowObjects() {
    if (this.canThrowBomb()) {
        this.executeBombThrow();
    } else if (this.world.characterBombs === 0) {
        this.showAlertBomb();
    }
}


/**
 * Führt das Werfen einer Bombe aus.
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
 * Zeigt den Bomben-Alarm an, wenn keine Bomben mehr verfügbar sind.
 */
showAlertBomb() {
    this.world.toggleAlertBomb(true);
}

/**
 * Behandelt die Kollision einer Bombe mit Feinden.
 * @param {Object} bomb - Die geworfene Bombe.
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
 * @param {Object} bomb - Die explodierende Bombe.
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
 * @param {Object} enemy - Der getroffene Feind.
 */
handleEnemyHit(enemy) {
    enemy.playDeadAnimation(() => {
        this.world.removeEnemy(enemy);
        enemy.img = null;
    });
}


  isBombHittingEnemy(bomb, enemy) {
    return bomb.isCollidingBomb(enemy) && !enemy.isDead;
  }

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
