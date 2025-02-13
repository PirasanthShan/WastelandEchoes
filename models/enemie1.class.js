/**
 * Klasse Enemie1 repräsentiert einen feindlichen Charakter im Spiel.
 * Sie erbt von MovableObject und enthält Animationen sowie Soundeffekte.
 */
class Enemie1 extends MovableObject {
  /**
   * Y-Position des Gegners
   * @type {number}
   */
  y = 220;

  /**
   * Höhe des Gegners
   * @type {number}
   */
  height = 200;

  /**
   * Breite des Gegners
   * @type {number}
   */
  width = 200;

  /**
   * Status des Gegners (ob er tot ist)
   * @type {boolean}
   */
  isDead = false;

  /**
   * Status für den Mute-Zustand des Sounds
   * @type {boolean}
   */
  isMuted = false;

  /**
   * Array mit Bildern für die Geh-Animation
   * @type {string[]}
   */
  IMAGES_WALKING = [
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_3.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_4.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_5.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_6.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_7.webp',
  ];

  /**
   * Array mit Bildern für die Angriffs-Animation
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_1.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_3.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_4.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_5.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_6.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_7.webp',
  ];

  /**
   * Array mit Bildern für die Sterbe-Animation
   * @type {string[]}
   */
  IMAGES_DEAD = [
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_3.webp',
  ];

  /**
   * Erstellt eine neue Instanz von Enemie1.
   */
  constructor() {
    super().loadImage('./img/enemies.img/enemie2.img/walk/Run_Left_Frame_1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2100;
    this.speed = 0.20 + Math.random() * 0.20;

    /**
     * Sound für das Gehen
     * @type {HTMLAudioElement}
     */
    this.walking_sound = new Audio('./audio/snakeWalk.mp3');
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    /**
     * Sound für den Tod
     * @type {HTMLAudioElement}
     */
    this.dead_sound = new Audio('./audio/snakeDead.mp3');
    this.dead_sound.volume = 0.05;

    document.addEventListener("click", () => {
      this.userInteracted = true;
    }, { once: true });

    this.animate();
  }

  /**
   * Startet die Animation des Gegners.
   */
  animate() {
    setInterval(() => {
      this.updateMovementAndSound();
    }, 1000 / 60);

    setInterval(() => {
      this.updateWalkingAnimation();
    }, 1000 / 10);
  }

  /**
   * Aktualisiert die Bewegung und den Sound des Gegners.
   */
  updateMovementAndSound() {
    if (!this.world || !this.world.isGameRunning) {
      this.stopSound();
      return;
    }
    if (!this.isDead) {
      this.moveLeft();
      this.playSound();
    } else {
      this.stopSound();
    }
  }

  /**
   * Aktualisiert die Geh-Animation des Gegners.
   */
  updateWalkingAnimation() {
    if (!this.world || !this.world.isGameRunning) return;
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Spielt den Lauf-Sound ab.
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning || this.isMuted || !this.userInteracted) return;
    if (this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  /**
   * Stoppt den Lauf-Sound.
   */
  stopSound() {
    if (!this.walking_sound.paused) {
      this.walking_sound.pause();
      this.walking_sound.currentTime = 0;
    }
  }

  /**
   * Schaltet den Sound stumm oder aktiviert ihn.
   * @param {boolean} isMuted - Gibt an, ob der Sound stummgeschaltet werden soll.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walking_sound.muted = isMuted;
    this.dead_sound.muted = isMuted;
  }

  /**
   * Startet die Sterbe-Animation des Gegners.
   * @param {Function} [onComplete] - Callback-Funktion, die nach der Animation aufgerufen wird.
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
