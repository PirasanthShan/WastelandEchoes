/**
 * Represents an enemy in the game, such as a zombie.
 * The enemy can move, attack, and die. It also plays sounds when walking or dying.
 *
 * @class Enemie
 * @extends {MovableObject}
 */
class Enemie extends MovableObject {
  /** @type {number} Vertical position of the enemy. */
  y = 260;

  /** @type {number} Height of the enemy. */
  height = 160;

  /** @type {number} Width of the enemy. */
  width = 160;

  /** @type {boolean} Indicates whether the enemy is dead. */
  isDead = false;

  /** @type {boolean} Indicates whether sound is enabled for the enemy. */
  soundEnabled = false;

  /** @type {string[]} Image paths for the walking animation. */
  IMAGES_WALKING = [
    'img/enemies.img/zombie1.img/run.img/Run_Frame_2.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_3.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_4.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_5.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_6.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_7.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_8.webp',
  ];

  /** @type {string[]} Image paths for the attack animation. */
  IMAGES_ATTACK = [
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
  ];

  /** @type {string[]} Image paths for the death animation. */
  IMAGES_DEAD = [
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_1.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_2.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_3.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_4.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_5.webp',
  ];

  /** @type {Audio} Sound played when the enemy is walking. */
  walking_sound;

  /** @type {Audio} Sound played when the enemy dies. */
  dead_sound;

  /**
   * Creates an instance of Enemie.
   * Loads the initial image and all animation frames.
   */
  constructor() {
    super().loadImage('./img/enemies.img/zombie1.img/run.img/Run_Frame_1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 550 + Math.random() * 800;
    this.speed = 0.30 + Math.random() * 0.70;

    this.walking_sound = new Audio(`./audio/Zombie.mp3?nocache=${Date.now()}`);
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    this.dead_sound = new Audio(`./audio/zombieDead.mp3?nocache=${Date.now()}`);
    this.dead_sound.volume = 0.07;

    this.setupUserInteraction();
  }

  /**
   * Starts the animation of the enemy.
   */
  startAnimation() {
    this.animate();
  }

  /**
   * Handles the animation logic for the enemy.
   * Updates movement, sound, and walking animation in separate intervals.
   */
  animate() {
    setInterval(() => {
      this.handleMovementAndSound();
    }, 1000 / 140);

    setInterval(() => {
      this.handleWalkingAnimation();
    }, 30000 / 300);
  }

  /**
   * Updates the movement and sound of the enemy.
   * Stops the sound if the game is paused or the enemy is dead.
   */
  handleMovementAndSound() {
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
   * Updates the walking animation of the enemy.
   * Only plays the animation if the game is running and the enemy is alive.
   */
  handleWalkingAnimation() {
    if (!this.world || !this.world.isGameRunning) return;
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Sets up user interaction to enable sound.
   * Sound is enabled after the first click or key press.
   */
  setupUserInteraction() {
    document.addEventListener("click", () => this.enableSound(), { once: true });
    document.addEventListener("keydown", () => this.enableSound(), { once: true });
  }

  /**
   * Enables sound for the enemy.
   */
  enableSound() {
    this.soundEnabled = true;
  }

  /**
   * Toggles the mute state of all sounds.
   *
   * @param {boolean} isMuted - Whether to mute the sounds.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walking_sound.muted = isMuted;
    this.dead_sound.muted = isMuted;
  }

  /**
   * Plays the walking sound if sound is enabled and the game is running.
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning) {
      this.stopSound();
      return;
    }
    if (this.soundEnabled && this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  /**
   * Stops the walking sound.
   */
  stopSound() {
    if (!this.walking_sound.paused) {
      this.walking_sound.pause();
      this.walking_sound.currentTime = 0;
    }
  }

  /**
   * Plays the death animation and sound.
   *
   * @param {Function} [onComplete] - Callback function to execute after the animation.
   */
  playDeadAnimation(onComplete) {
    if (this.isDead) return;
    this.isDead = true;
    this.stopSound();
    this.playDeathSound();
    this.runDeathAnimation(onComplete);
  }

  /**
   * Plays the death sound if sound is enabled.
   */
  playDeathSound() {
    if (this.soundEnabled) {
      this.dead_sound.play();
    }
  }

  /**
   * Runs the death animation sequence.
   *
   * @param {Function} [onComplete] - Callback function to execute after the animation.
   */
  runDeathAnimation(onComplete) {
    let frameIndex = 0;
    const deadAnimationInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGES_DEAD[frameIndex++]];
      if (frameIndex >= this.IMAGES_DEAD.length) {
        clearInterval(deadAnimationInterval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    }, 1000 / 8);
  }
}