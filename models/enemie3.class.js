/**
 * Klasse Enemie3, die einen beweglichen Feind im Spiel darstellt.
 * Diese Klasse erweitert MovableObject und beinhaltet Animationen,
 * Sounds sowie Methoden zur Bewegung und Statusverwaltung.
 */
class Enemie3 extends MovableObject {
  /**
   * Vertikale Position des Gegners.
   * @type {number}
   */
  y = 260;

  /**
   * Höhe des Gegners.
   * @type {number}
   */
  height = 160;

  /**
   * Breite des Gegners.
   * @type {number}
   */
  width = 160;

  /**
   * Gibt an, ob der Gegner tot ist.
   * @type {boolean}
   */
  isDead = false;

  /**
   * Bilder für die Laufanimation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    './img/enemies.img/enemie4.img/walk/walk2.webp',
    './img/enemies.img/enemie4.img/walk/walk3.webp',
    './img/enemies.img/enemie4.img/walk/walk4.webp',
    './img/enemies.img/enemie4.img/walk/walk5.webp',
    './img/enemies.img/enemie4.img/walk/walk6.webp',
    './img/enemies.img/enemie4.img/walk/walk7.webp',
  ];

  /**
   * Bilder für die Angriffsanimation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_5.webp',
  ];

  /**
   * Bilder für die Todesanimation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_5.webp',
  ];

  /**
   * Erstellt eine neue Instanz von Enemie3.
   */
  constructor() {
    super().loadImage('./img/enemies.img/enemie4.img/walk/walk1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    /**
     * Horizontale Startposition des Gegners.
     * @type {number}
     */
    this.x = 1500;

    /**
     * Bewegungsgeschwindigkeit des Gegners.
     * @type {number}
     */
    this.speedx = 5;

    /**
     * 🔉 Lauf-Soundeffekt.
     * @type {HTMLAudioElement}
     */
    this.walking_sound = new Audio('./audio/Zombie.mp3');
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    /**
     * 🔉 Soundeffekt für den Tod des Gegners.
     * @type {HTMLAudioElement}
     */
    this.dead_sound = new Audio('./audio/zombieDead.mp3');
    this.dead_sound.volume = 0.05;

    this.animate();
  }

  /**
   * Startet die Animationen des Gegners.
   */
  animate() {
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  /**
   * Startet die Bewegungsschleife des Gegners.
   */
  startMovementLoop() {
    setInterval(() => {
      if (!this.isGameActive()) {
        this.stopSound();
        return;
      }
      this.handleMovement();
    }, 1000 / 60);
  }

  /**
   * Startet die Animationsschleife des Gegners.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (this.isGameActive() && !this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }

  /**
   * Überprüft, ob das Spiel aktiv ist.
   * @returns {boolean} True, wenn das Spiel läuft, sonst false.
   */
  isGameActive() {
    return this.world && this.world.isGameRunning;
  }

  /**
   * Steuert die Bewegung des Gegners.
   */
  handleMovement() {
    if (!this.isDead) {
      this.moveLeft();
      this.playSound();
    } else {
      this.stopSound();
    }
  }

  /**
   * 🔉 Spielt den Lauf-Sound ab.
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning) {
      this.stopSound();
      return;
    }

    if (this.walking_sound.paused) {
      this.walking_sound.play().catch(err => {});
    }
  }

  /**
   * 🔇 Stoppt den Lauf-Sound.
   */
  stopSound() {
    if (!this.walking_sound.paused) {
      this.walking_sound.pause();
      this.walking_sound.currentTime = 0;
    }
  }

  /**
   * Toggles the mute state of the enemy's sounds.
   * @param {boolean} isMuted - Whether the sounds should be muted.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walking_sound.muted = isMuted;
    this.dead_sound.muted = isMuted;
  }

  /**
   * Spielt die Todesanimation ab und entfernt den Gegner nach Abschluss.
   * @param {Function} onComplete - Callback-Funktion nach Abschluss der Animation.
   */
  playDeadAnimation(onComplete) {
    this.isDead = true;
    this.stopSound();
    this.dead_sound.play();
    let frameIndex = 0;
    const deadAnimationInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_DEAD[frameIndex++]];
      if (frameIndex >= this.IMAGES_DEAD.length) {
        clearInterval(deadAnimationInterval);
        setTimeout(() => {
          if (onComplete) onComplete();
          if (this.world) this.world.removeEnemy(this);
        }, 2000);
      }
    }, 1000 / 7);
  }
}
