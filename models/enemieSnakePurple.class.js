/**
 * Represents an enemy character in the game.
 * This class extends the `MovableObject` class and includes functionality for movement, animation, and sound.
 *
 * @class Enemie2
 * @extends {MovableObject}
 */
class EnemieSnakePurple extends MovableObject {
  
  y = 220;
  height = 200;
  width = 200;
  isDead = false;
  IMAGES_WALKING = [
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_2.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_3.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_4.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_5.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_6.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_7.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_8.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_9.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_10.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_11.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_12.webp',
    './img/enemies.img/enemie3.img/walk/Walk_Left_Frame_13.webp',
  ];
  IMAGES_ATTACK = [
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_1.webp',
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_2.webp',
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_4.webp',
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_5.webp',
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_6.webp',
    './img/enemies.img/enemie3.img/attack/Attack_3_Left_Frame_7.webp',
  ];
  IMAGES_DEAD = [
    './img/enemies.img/enemie3.img/dead/Dead_Left_Frame_1.webp',
    './img/enemies.img/enemie3.img/dead/Dead_Left_Frame_2.webp',
    './img/enemies.img/enemie3.img/dead/Dead_Left_Frame_3.webp',
  ];
  walking_sound;
  dead_sound;

  /**
   * Creates an instance of Enemie2.
   * Initializes the enemy with default position, speed, and animations.
   */
  constructor() {
    super().loadImage('./img/enemies.img/enemie3.img/walk/Walk_Left_Frame_1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 1750;
    this.speed = 1;

    // Initialize sounds
    this.walking_sound = new Audio(`./audio/snakeWalk.mp3?nocache=${Date.now()}`);
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    this.dead_sound = new Audio(`./audio/snakeDead.mp3?nocache=${Date.now()}`);
    this.dead_sound.volume = 0.05;

    this.animate();
  }

  /**
   * Starts the animation intervals for movement and animation.
   */
  animate() {
    this.startMovementInterval();
    this.startAnimationInterval();
  }

  /**
   * Starts the interval for handling enemy movement.
   */
  startMovementInterval() {
    setInterval(() => {
      this.handleMovement();
    }, 1000 / 60);
  }

  /**
   * Handles the movement logic for the enemy.
   * Moves the enemy left and plays the walking sound if the game is running and the enemy is alive.
   */
  handleMovement() {
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
   * Starts the interval for handling enemy animation.
   */
  startAnimationInterval() {
    setInterval(() => {
      this.handleAnimation();
    }, 1000 / 10);
  }

  /**
   * Handles the animation logic for the enemy.
   * Plays the walking animation if the game is running and the enemy is alive.
   */
  handleAnimation() {
    if (!this.world || !this.world.isGameRunning) return;
    if (!this.isDead) {
      this.playAnimation(this.IMAGES_WALKING);
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
   * Stops the walking sound.
   */
  stopSound() {
    if (!this.walking_sound.paused) {
      this.walking_sound.pause();
      this.walking_sound.currentTime = 0;
    }
  }

  /**
   * Plays the dead animation and removes the enemy from the game after completion.
   *
   * @param {Function} onComplete - Callback function to execute after the animation finishes.
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