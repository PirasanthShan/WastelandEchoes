/**
 * Represents a moving enemy in the game.
 * This class extends MovableObject and includes animations, sounds, and methods for movement and status management.
 *
 * @class Enemie3
 * @extends {MovableObject}
 */
class EnemieSnakeYellow extends MovableObject {
  
  y = 260;
  height = 160;
  width = 160;
  isDead = false;
  IMAGES_WALKING = [
    './img/enemies.img/enemie4.img/walk/walk2.webp',
    './img/enemies.img/enemie4.img/walk/walk3.webp',
    './img/enemies.img/enemie4.img/walk/walk4.webp',
    './img/enemies.img/enemie4.img/walk/walk5.webp',
    './img/enemies.img/enemie4.img/walk/walk6.webp',
    './img/enemies.img/enemie4.img/walk/walk7.webp',
  ];
  IMAGES_ATTACK = [
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/attack/Attack_3_Left_Frame_5.webp',
  ];
  IMAGES_DEAD = [
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_3.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_4.webp',
    './img/enemies.img/enemie4.img/dead/Dead_Left_Frame_5.webp',
  ];
  walking_sound;
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
    this.x = 1500;
    this.speed = 1;
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
    if (!window.world.soundManager.isMuted) {this.dead_sound.play().catch(() => {});}
    let frameIndex = 0;
    const deadAnimationInterval = setInterval(() => {
    this.img = this.imageCache[this.IMAGES_DEAD[frameIndex++]];
    if (frameIndex >= this.IMAGES_DEAD.length) {clearInterval(deadAnimationInterval);
    setTimeout(() => { if (onComplete) onComplete();
    if (this.world) this.world.removeEnemy(this);
      }, 2000);
     }
    }, 1000 / 7);
  }
}