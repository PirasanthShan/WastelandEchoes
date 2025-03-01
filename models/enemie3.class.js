/**
 * Represents a moving enemy in the game.
 * This class extends MovableObject and includes animations, sounds, and methods for movement and status management.
 *
 * @class Enemie3
 * @extends {MovableObject}
 */
class Enemie3 extends MovableObject {
  /** @type {number} Vertical position of the enemy. */
  y = 260;

  /** @type {number} Height of the enemy. */
  height = 160;

  /** @type {number} Width of the enemy. */
  width = 160;

  /** @type {boolean} Indicates whether the enemy is dead. */
  isDead = false;

  /** @type {string[]} Image paths for the walking animation. */
  IMAGES_WALKING = [
    './img/enemies.img/enemie4.img/walk/walk2.webp',
    './img/enemies.img/enemie4.img/walk/walk3.webp',
    './img/enemies.img/enemie4.img/walk/walk4.webp',
    './img/enemies.img/enemie4.img/walk/walk5.webp',
    './img/enemies.img/enemie4.img/walk/walk6.webp',
    './img/enemies.img/enemie4.img/walk/walk7.webp',
  ];

  /** @type {string[]} Image paths for the attack animation. */
  IMAGES_ATTACK = [
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_5.webp',
  ];

  /** @type {string[]} Image paths for the death animation. */
  IMAGES_DEAD = [
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_5.webp',
  ];

  /** @type {HTMLAudioElement} Sound played when the enemy is walking. */
  walking_sound;

  /** @type {HTMLAudioElement} Sound played when the enemy dies. */
  dead_sound;

  /**
   * Creates an instance of Enemie3.
   * Initializes the enemy with default position, speed, and animations.
   */
  constructor() {
    super().loadImage('./img/enemies.img/enemie4.img/walk/walk1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    /** @type {number} Horizontal starting position of the enemy. */
    this.x = 1500;

    /** @type {number} Movement speed of the enemy. */
    this.speed = 1;

    // Initialize sounds
    this.walking_sound = new Audio('./audio/Zombie.mp3');
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    this.dead_sound = new Audio('./audio/zombieDead.mp3');
    this.dead_sound.volume = 0.05;

    this.animate();
  }

  /**
   * Starts the animations of the enemy.
   */
  animate() {
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  /**
   * Starts the movement loop of the enemy.
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
   * Starts the animation loop of the enemy.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (this.isGameActive() && !this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }

  /**
   * Checks if the game is active.
   *
   * @returns {boolean} True if the game is running, otherwise false.
   */
  isGameActive() {
    return this.world && this.world.isGameRunning;
  }

  /**
   * Handles the movement of the enemy.
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
   * Plays the walking sound if the game is running.
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning || window.world.soundManager.isMuted) {
      this.stopSound();
      return;
    }
    if (this.walking_sound.paused) {
      this.walking_sound.play().catch(() => {});
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
   * Toggles the mute state of the enemy's sounds.
   *
   * @param {boolean} isMuted - Whether the sounds should be muted.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    // Setze die muted-Eigenschaft anhand des globalen Mute-Zustands
    this.walking_sound.muted = window.world.soundManager.isMuted;
    this.dead_sound.muted = window.world.soundManager.isMuted;
    if (window.world.soundManager.isMuted) {
      this.stopSound();
      this.dead_sound.pause();
      this.dead_sound.currentTime = 0;
    }
  }

  /**
   * Plays the death animation and removes the enemy after completion.
   *
   * @param {Function} onComplete - Callback function to execute after the animation.
   */
  playDeadAnimation(onComplete) {
    this.isDead = true;
    this.stopSound();
    if (!window.world.soundManager.isMuted) {
      this.dead_sound.play().catch(() => {});
    }
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