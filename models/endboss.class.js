/**
 * Repräsentiert den Endboss im Spiel.
 * Der Endboss kann angreifen, sich bewegen, Schaden nehmen und sterben.
 * Zudem reagiert er auf den Charakter, indem er ihm folgt oder angreift.
 *
 * @class Endboss
 * @extends {MovableObject}
 */
class Endboss extends MovableObject {
  // Positionierung und Dimensionen
  y = 220;
  height = 220;
  width = 250;
  // Zustände des Endboss
  isAttacking = false;
  isMovingLeft = false;
  sightRange = 500;
  isHurt = false;
  isDead = false;
  hitCount = 0;
  deadAnimationPlayed = false;
  isCharacterInSight = false;

  // Bilder für die verschiedenen Zustände
  IMAGES_STANDING = [
    'img/boss.img/Idle_000_mirrored.webp',
    'img/boss.img/Idle_001_mirrored.webp',
    'img/boss.img/Idle_002_mirrored.webp',
    'img/boss.img/Idle_003_mirrored.webp',
    'img/boss.img/Idle_004_mirrored.webp',
    'img/boss.img/Idle_005_mirrored.webp',
    'img/boss.img/Idle_006_mirrored.webp',
    'img/boss.img/Idle_007_mirrored.webp',
    'img/boss.img/Idle_008_mirrored.webp',
    'img/boss.img/Idle_009_mirrored.webp'
  ];
  IMAGES_WALKING = [
    './img/boss.img/Flipped_Walk_000.webp',
    './img/boss.img/Flipped_Walk_001.webp',
    './img/boss.img/Flipped_Walk_002.webp',
    './img/boss.img/Flipped_Walk_003.webp',
    './img/boss.img/Flipped_Walk_004.webp',
    './img/boss.img/Flipped_Walk_005.webp',
    './img/boss.img/Flipped_Walk_006.webp',
    './img/boss.img/Flipped_Walk_007.webp',
    './img/boss.img/Flipped_Walk_008.webp',
    './img/boss.img/Flipped_Walk_009.webp'
  ];
  IMAGES_ATTACK = [
    './img/boss.img/Processed_Attack_1.webp',
    './img/boss.img/Processed_Attack_2.webp',
    './img/boss.img/Processed_Attack_3.webp',
    './img/boss.img/Processed_Attack_7.webp',
    './img/boss.img/Processed_Attack_8.webp',
    './img/boss.img/Processed_Attack_9.webp'
  ];
  IMAGES_HURT = [
    './img/boss.img/Hurt_000_flipped.webp',
    './img/boss.img/Hurt_001_flipped.webp',
    './img/boss.img/Hurt_002_flipped.webp',
    './img/boss.img/Hurt_003_flipped.webp',
    './img/boss.img/Hurt_004_flipped.webp',
    './img/boss.img/Hurt_005_flipped.webp',
    './img/boss.img/Hurt_006_flipped.webp',
    './img/boss.img/Hurt_007_flipped.webp',
    './img/boss.img/Hurt_008_flipped.webp',
    './img/boss.img/Hurt_009_flipped.webp'
  ];
  IMAGES_DEAD = [
    './img/boss.img/Dead_000.webp',
    './img/boss.img/Dead_001.webp',
    './img/boss.img/Dead_002.webp',
    './img/boss.img/Dead_003.webp',
    './img/boss.img/Dead_004.webp',
    './img/boss.img/Dead_005.webp',
    './img/boss.img/Dead_006.webp',
    './img/boss.img/Dead_007.webp',
    './img/boss.img/Dead_008.webp',
    './img/boss.img/Dead_009.webp'
  ];

  /**
   * Erzeugt eine neue Instanz des Endboss.
   * Lädt alle notwendigen Bilder und Sounds, setzt die Startposition und initialisiert die Bewegungsgeschwindigkeit.
   */
  constructor() {
    super().loadImage('./img/boss.img/Idle_000_mirrored.webp');
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.speed = 1;
    this.loadSounds();
  }

  /**
   * Startet die Animation des Endboss.
   */
  startAnimation() {
    this.animate();
  }

  /**
   * Führt die regelmäßige Animation des Endboss aus.
   * Je nach Zustand werden unterschiedliche Unterfunktionen zur Animation aufgerufen.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (this.world && !this.world.isGameRunning) return;
      if (this.isDead) { this.handleDeadState(); return; }
      if (this.isHurt) { this.handleHurtState(); }
      else if (this.isAttacking) { this.handleAttackingState(); }
      else if (this.isMovingLeft) { this.handleMovingLeftState(); }
      else { this.handleStandingState(); }
    }, 100);
  }

  /**
   * Behandelt den Zustand "tot".
   * Spielt die Todesanimation ab und passt Position sowie Größe an, falls noch nicht erfolgt.
   */
  handleDeadState() {
    if (!this.deadAnimationPlayed) {
      this.playDeadAnimation();
      this.y = 250;
      this.height = 240;
      this.width = 260;
    }
  }

  /**
   * Behandelt den Zustand "verletzt".
   * Spielt die Hurt-Animation ab und gibt den Angriffs-Sound wieder.
   */
  handleHurtState() {
    this.playAnimation(this.IMAGES_HURT);
    this.playSound(this.attackSound);
  }

  /**
   * Behandelt den Zustand "angreifend".
   * Spielt die Angriffs-Animation ab und gibt den Angriffs-Sound wieder.
   */
  handleAttackingState() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.playSound(this.attackSound);
  }

  /**
   * Behandelt den Zustand "bewegt sich nach links".
   * Spielt die Walking-Animation ab, bewegt den Endboss nach links und gibt den Walk-Sound wieder.
   */
  handleMovingLeftState() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
    this.playSound(this.walkSound);
  }

  /**
   * Behandelt den Zustand "steht" (keine andere Aktion).
   * Spielt die Standing-Animation ab.
   */
  handleStandingState() {
    this.playAnimation(this.IMAGES_STANDING);
  }

  /**
   * Stoppt die Animation des Endboss, indem das Animationsintervall gelöscht und alle Sounds gestoppt werden.
   */
  stopAnimation() {
    this.clearAnimationInterval();
    this.stopAllSounds();
  }

  /**
   * Löscht das laufende Animationsintervall und setzt es auf null.
   */
  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Stoppt alle zugehörigen Sounds des Endboss.
   */
  stopAllSounds() {
    this.stopSoundIfExists(this.walkSound);
    this.stopSoundIfExists(this.attackSound);
    this.stopSoundIfExists(this.deadSound);
  }

  /**
   * Stoppt einen Sound, falls er existiert, und setzt dessen Wiedergabezeit auf 0.
   *
   * @param {HTMLAudioElement} sound - Der zu stoppende Sound.
   */
  stopSoundIfExists(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Behandelt, dass der Endboss Schaden erleidet.
   * Erhöht den Trefferzähler und löst den Tod aus, wenn eine bestimmte Anzahl an Treffern erreicht ist.
   * Andernfalls wird der Hurt-Zustand aktiviert.
   */
  handleHurt() {
    if (this.isDead || this.isHurt) return;
    this.hitCount++;
    if (this.hitCount >= 5) {
      this.markAsDead();
      return;
    }
    this.activateHurtState();
  }

  /**
   * Markiert den Endboss als tot.
   */
  markAsDead() {
    this.isDead = true;
    this.isHurt = false;
  }

  /**
   * Aktiviert den Hurt-Zustand und spielt die Hurt-Animation einmal ab.
   * Nach Abschluss der Animation wird der Hurt-Zustand aufgehoben.
   */
  activateHurtState() {
    this.isHurt = true;
    this.playAnimationOnce(this.IMAGES_HURT, () => {
      this.isHurt = false;
    });
  }

  /**
   * Spielt eine einmalige Animation ab, indem die übergebenen Frames in einem Intervall durchlaufen werden.
   *
   * @param {string[]} animationFrames - Array von Bildpfaden für die Animation.
   * @param {Function} [onComplete] - Callback-Funktion, die nach Abschluss der Animation aufgerufen wird.
   */
  playAnimationOnce(animationFrames, onComplete) {
    let frameIndex = 0;
    const animationInterval = setInterval(() => {
      this.img = this.imageCache[animationFrames[frameIndex++]];
      if (frameIndex >= animationFrames.length) {
        clearInterval(animationInterval);
        if (onComplete) onComplete();
      }
    }, 30);
  }

  /**
   * Spielt die Todesanimation ab.
   * Falls die Todesanimation bereits abgespielt wurde, wird nichts unternommen.
   * Spielt den Todes-Sound und die Todes-Frames einmal ab.
   */
  playDeadAnimation() {
    if (this.deadAnimationPlayed) return;
    this.deadAnimationPlayed = true;
    this.playSound(this.deadSound);
    this.playAnimationOnce(this.IMAGES_DEAD);
  }

  /**
   * Lässt den Endboss dem Charakter folgen.
   * Prüft, ob der Charakter in Sichtweite ist. Falls nicht, werden alle Aktionen gestoppt und der Walk-Sound angehalten.
   * Falls der Charakter in Sichtweite ist, wird je nach Distanz entschieden, ob sich der Endboss bewegt oder angreift.
   *
   * @param {Character} character - Der Charakter, dem der Endboss folgen soll.
   */
  followCharacter(character) {
    if (this.isDead || this.isHurt) return;
    const distance = Math.abs(this.x - character.x);
    this.isCharacterInSight = distance <= this.sightRange;
    if (!this.isCharacterInSight) {
      this.handleOutOfSight();
      return;
    }
    this.handleInSight(distance);
  }

  /**
   * Behandelt den Fall, dass der Charakter außerhalb der Sicht ist.
   * Stoppt alle Aktionen und den Walk-Sound.
   */
  handleOutOfSight() {
    this.stopAllActions();
    this.stopWalkSound();
  }

  /**
   * Stoppt den Walk-Sound, falls er aktuell läuft.
   */
  stopWalkSound() {
    if (!this.walkSound.paused) {
      this.walkSound.pause();
      this.walkSound.currentTime = 0;
    }
  }

  /**
   * Behandelt den Fall, dass der Charakter in Sichtweite ist.
   * Je nach Abstand wird entweder die Bewegung nach links gestartet oder der Angriff aktiviert.
   *
   * @param {number} distance - Die Distanz zwischen Endboss und Charakter.
   */
  handleInSight(distance) {
    if (distance > 60) {
      this.startMovingLeft();
    } else {
      this.startAttacking();
    }
  }

  /**
   * Setzt den Zustand, dass der Endboss sich nach links bewegt.
   */
  startMovingLeft() {
    this.isMovingLeft = true;
    this.isAttacking = false;
  }

  /**
   * Setzt den Zustand, dass der Endboss angreift.
   */
  startAttacking() {
    this.isMovingLeft = false;
    this.isAttacking = true;
  }

  /**
   * Stoppt alle aktuellen Aktionen des Endboss (Bewegung und Angriff).
   */
  stopAllActions() {
    this.isMovingLeft = false;
    this.isAttacking = false;
  }

  /**
   * Lädt die Sounds für den Endboss (Walk-, Attack- und Dead-Sound).
   */
  loadSounds() {
    this.walkSound = new Audio('./audio/GolemWalk.mp3');
    this.attackSound = new Audio('./audio/GolemHit.mp3');
    this.deadSound = new Audio('./audio/GolemDead.mp3');
    this.walkSound.volume = 0.5;
    this.attackSound.volume = 0.5;
    this.deadSound.volume = 0.5;
    this.walkSound.loop = true;
  }

  /**
   * Spielt den übergebenen Sound ab.
   * Dabei werden alle anderen Sounds gestoppt, sofern der Endboss den Charakter sieht.
   *
   * @param {HTMLAudioElement} activeSound - Der Sound, der abgespielt werden soll.
   */
  playSound(activeSound) {
    if (!this.isCharacterInSight) return;
    const allSounds = [this.walkSound, this.attackSound, this.deadSound];
    allSounds.forEach(sound => {
      if (sound !== activeSound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
    if (activeSound.paused) {
      activeSound.play().catch(() => {});
    }
  }

  /**
   * Schaltet den Mute-Zustand für alle Endboss-Sounds um.
   *
   * @param {boolean} isMuted - true, wenn die Sounds stummgeschaltet werden sollen, sonst false.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walkSound.muted = isMuted;
    this.attackSound.muted = isMuted;
    this.deadSound.muted = isMuted;
  }
}
