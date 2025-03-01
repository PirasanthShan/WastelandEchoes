/**
 * Represents an enemy character in the game.
 * Inherits from MovableObject and includes animations and sound effects.
 *
 * @class Enemie1
 * @extends {MovableObject}
 */
class Enemie1 extends MovableObject {
  /** @type {number} Vertical position of the enemy. */
  y = 220;

  /** @type {number} Height of the enemy. */
  height = 200;

  /** @type {number} Width of the enemy. */
  width = 200;

  /** @type {boolean} Indicates whether the enemy is dead. */
  isDead = false;

  /** @type {boolean} Indicates whether sound is muted. */
  isMuted = false;

  /** @type {string[]} Image paths for the walking animation. */
  IMAGES_WALKING = [
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_3.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_4.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_5.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_6.webp',
    './img/enemies.img/enemie2.img/walk/Run_Left_Frame_7.webp',
  ];

  /** @type {string[]} Image paths for the attack animation. */
  IMAGES_ATTACK = [
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_1.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_3.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_4.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_5.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_6.webp',
    './img/enemies.img/enemie2.img/attack/Attack_2_Left_Frame_7.webp',
  ];

  /** @type {string[]} Image paths for the death animation. */
  IMAGES_DEAD = [
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie2.img/dead/Dead_Left_Frame_3.webp',
  ];

  /** @type {HTMLAudioElement} Sound played when the enemy is walking. */
  walking_sound;

  /** @type {HTMLAudioElement} Sound played when the enemy dies. */
  dead_sound;

  /**
   * Creates an instance of Enemie1.
   * Loads the initial image and all animation frames.
   */
  constructor() {
    super().loadImage('./img/enemies.img/enemie2.img/walk/Run_Left_Frame_1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2100;
    this.speed = 1;

    this.walking_sound = new Audio('./audio/snakeWalk.mp3');
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    this.dead_sound = new Audio('./audio/snakeDead.mp3');
    this.dead_sound.volume = 0.05;

    document.addEventListener("click", () => {
      this.userInteracted = true;
    }, { once: true });

    this.animate();
  }

  /**
   * Starts the animation of the enemy.
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
   * Updates the movement and sound of the enemy.
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
   * Updates the walking animation of the enemy.
   */
  updateWalkingAnimation() {
    if (!this.world || !this.world.isGameRunning) return;
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the walking sound if the game is running and sound is not muted.
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning || window.world.soundManager.isMuted || !this.userInteracted) return;
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
   * Toggles the mute state of all sounds.
   *
   * @param {boolean} isMuted - Whether to mute the sounds.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walking_sound.muted = window.world.soundManager.isMuted;
    this.dead_sound.muted = window.world.soundManager.isMuted;
    
    if (window.world.soundManager.isMuted) {
      this.stopSound();
      this.dead_sound.pause();
      this.dead_sound.currentTime = 0;
    }
  }

  /**
   * Plays the death animation and sound.
   *
   * @param {Function} [onComplete] - Callback function to execute after the animation.
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