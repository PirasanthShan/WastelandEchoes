/**
 * Verwaltet alle Kollisionsprüfungen im Spiel.
 * Diese Klasse überprüft Kollisionen zwischen dem Charakter und Gegnern, dem Endboss, Bomben, Sammelobjekten sowie dem Raumschiff.
 *
 * @class CollisionManager
 */
class CollisionManager {
  /**
   * Erstellt eine Instanz des CollisionManager.
   *
   * @param {World} world - Die Instanz der Spielwelt, die alle relevanten Objekte enthält.
   */
  constructor(world) {
    this.world = world; // Referenz zur `World`-Instanz
  }

  /**
   * Überprüft alle relevanten Kollisionen im Spiel.
   * Durchläuft die Liste der Gegner und prüft Kollisionen zwischen dem Charakter und den Gegnern,
   * sowie Kollisionen mit dem Raumschiff und Kristallen.
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
    this.checkCrystalCollision(); // Stelle sicher, dass dies existiert!
  }

  /**
   * Wird aufgerufen, wenn der Charakter tot ist.
   * Falls der Endboss noch lebt, wird dieser in seinen Idle-Zustand versetzt.
   * Anschließend wird die Todesanimation des Charakters abgespielt und das Spiel gestoppt.
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
   * Setzt den Endboss in seinen neutralen Idle-Zustand zurück.
   * Resettet alle Angriffszustände, spielt die Idle-Animation ab und stoppt sowie setzt vorhandene Endboss-Sounds zurück.
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
   * Prüft die Kollision zwischen dem Charakter und dem Raumschiff.
   * Wenn der Charakter mit dem Raumschiff kollidiert, wird geprüft, ob alle Kristalle eingesammelt wurden.
   * Bei vollständiger Sammlung wird der "You Win"-Screen angezeigt und das Spiel beendet,
   * andernfalls wird ein Hinweis angezeigt, dass noch Kristalle fehlen.
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
   * Überprüft, ob keine Bomben mehr vorhanden sind und der Endboss noch lebt.
   * Zeigt in diesem Fall einen Warnhinweis an, andernfalls werden alle Warnmeldungen ausgeblendet.
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
   * Behandelt einen Angriff eines Zombies auf den Charakter.
   * Setzt die Geschwindigkeit des Gegners auf 0, spielt die Angriffsanimation ab,
   * lässt den Charakter Schaden erleiden und aktualisiert die Statusanzeige.
   * Sollte die Energie des Charakters aufgebraucht sein, wird die Todesanimation abgespielt.
   *
   * @param {Enemy} enemy - Das Gegnerobjekt, das den Angriff ausführt.
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
   * Behandelt das Standardverhalten eines Zombies, wenn keine Kollision mit dem Charakter vorliegt.
   * Setzt die Geschwindigkeit des Gegners und bewegt ihn nach links, während die Walking-Animation abgespielt wird.
   *
   * @param {Enemy} enemy - Das Gegnerobjekt.
   */
  handleDefaultZombieBehavior(enemy) {
    enemy.speed = 0.10;
    enemy.moveLeft();
    enemy.playAnimation(enemy.IMAGES_WALKING);
  }

  /**
   * Prüft die Kollision zwischen dem Endboss und dem Charakter.
   * Falls beide Objekte vorhanden sind, wird die Kollisionsbehandlung zwischen dem Endboss und dem Charakter durchgeführt.
   */
  checkEndbossCollision() {
    if (this.world.endboss && this.world.character) {
      this.handleCollisionEndboss();
    }
  }

  /**
   * Behandelt die Kollision zwischen dem Endboss und dem Charakter.
   * Falls der Endboss noch lebt, wird überprüft, ob der Charakter kollidiert.
   * Bei einer Kollision wird der Endboss in den Angriffsmodus versetzt, der Charakter erleidet Schaden und die Statusanzeige wird aktualisiert.
   * Sollte der Charakter keine Energie mehr haben, wird die Todesanimation abgespielt.
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
   * Prüft die Kollision zwischen Bomben (ThrowableObjects) und dem Endboss.
   * Durchläuft alle Wurfobjekte und prüft, ob eine Bombe den Endboss trifft.
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
   * Behandelt die Kollision zwischen einer Bombe und dem Endboss.
   * Spielt die Explosion der Bombe ab, entfernt die Bombe und löst beim Endboss die Hurt-Animation aus.
   * Nach einer kurzen Verzögerung wird der Endboss wieder in Bewegung gesetzt.
   *
   * @param {ThrowableObject} bomb - Die Bombe, die mit dem Endboss kollidiert ist.
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
   * Prüft die Kollision zwischen dem Charakter und Sammelobjekten (Bomben).
   * Wird eine Kollision festgestellt und hat der Charakter noch Platz für Bomben,
   * erhöht sich dessen Bombenzahl, die Anzeige wird aktualisiert und das eingesammelte Objekt entfernt.
   */
  checkCollectibleCollision() {
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
  }

  /**
   * Prüft die Kollision zwischen dem Charakter und Kristallen.
   * Wird eine Kollision festgestellt und hat der Charakter noch Platz für weitere Kristalle,
   * erhöht sich dessen Kristallanzahl, das Kristall-Objekt wird entfernt und die Kristallanzeige aktualisiert.
   */
  checkCrystalCollision() {
    this.world.level.collectible2.forEach((crystal, index) => {
      if (this.world.character.isCollidingCollectible(crystal)) {
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
