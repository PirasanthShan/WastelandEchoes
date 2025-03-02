/**
 * Represents the end boss in the game.
 * The end boss can attack, move, take damage, and die.
 * It also reacts to the character by following or attacking them.
 *
 * @class Endboss
 * @extends {MovableObject}
 */
class Endboss extends MovableObject {
 y = 220;
 height = 220;
 width = 250;
 isAttacking = false;
 isMovingLeft = false;
 isMovingRight = false;
 sightRange = 500;
 isHurt = false;
 isDead = false;
 hitCount = 0;
 deadAnimationPlayed = false;
 isCharacterInSight = false;
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
   * Creates an instance of Endboss.
   * Loads the initial image and all animation frames.
   */
  constructor() {
    super().loadImage('./img/boss.img/Idle_000_mirrored.webp');
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.speed = 6;
    this.loadSounds();
  }

  /**
   * Draws the end boss on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {number} [x=this.x] - The x-coordinate of the end boss.
   * @param {number} [y=this.y] - The y-coordinate of the end boss.
   */
  drawEndboss(ctx, x = this.x, y = this.y) {
    ctx.save();
    if (this.otherDirection) {
      ctx.translate(x + this.width, y);
      ctx.scale(-1, 1);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
    } else {
      ctx.drawImage(this.img, x, y, this.width, this.height);
    }
    ctx.restore();
  }

  /**
   * Starts the animation loop for the end boss.
   */
  startAnimation() {
    this.animate();
  }

  /**
   * Handles the animation logic for the end boss.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      if (this.world && !this.world.isGameRunning) return;
      if (this.isDead) { this.handleDeadState(); return; }
      if (this.isHurt) { this.handleHurtState(); }
      else if (this.isAttacking) { this.handleAttackingState(); }
      else if (this.isMovingLeft) { this.handleMovingLeftState(); }
      else if (this.isMovingRight) { this.handleMovingRightState(); }
      else { this.handleStandingState(); }
    }, 100);
  }

  /**
   * Handles the state when the end boss is dead.
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
   * Handles the state when the end boss is hurt.
   */
  handleHurtState() {
    this.playAnimation(this.IMAGES_HURT);
    this.playSound(this.attackSound);
  }

  /**
   * Handles the state when the end boss is attacking.
   */
  handleAttackingState() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.playSound(this.attackSound);
  }

  /**
   * Handles the state when the end boss is moving left.
   */
  handleMovingLeftState() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
    this.playSound(this.walkSound);
  }

  /**
   * Handles the state when the end boss is moving right.
   */
  handleMovingRightState() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveRight();
    this.playSound(this.walkSound);
  }

  /**
   * Handles the state when the end boss is standing still.
   */
  handleStandingState() {
    this.playAnimation(this.IMAGES_STANDING);
  }

  /**
   * Stops the animation and all sounds.
   */
  stopAnimation() {
    this.clearAnimationInterval();
    this.stopAllSounds();
  }

  /**
   * Clears the animation interval.
   */
  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Stops all sounds associated with the end boss.
   */
  stopAllSounds() {
    this.stopSoundIfExists(this.walkSound);
    this.stopSoundIfExists(this.attackSound);
    this.stopSoundIfExists(this.deadSound);
  }

  /**
   * Stops a specific sound if it exists.
   *
   * @param {HTMLAudioElement} sound - The sound to stop.
   */
  stopSoundIfExists(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  /**
   * Handles the end boss taking damage.
   */
  handleHurt() {
    if (this.isDead || this.isHurt) return;
    this.hitCount++;
    if (this.hitCount >= 5) { this.markAsDead(); return; }
    this.activateHurtState();
  }

  /**
   * Marks the end boss as dead and deactivates the hurt state.
   */
  markAsDead() {
    this.isDead = true;
    this.isHurt = false;
  }

  /**
   * Activates the hurt state and plays the hurt animation.
   */
  activateHurtState() {
    this.isHurt = true;
    this.playAnimationOnce(this.IMAGES_HURT, () => { this.isHurt = false; });
  }

  /**
   * Plays an animation once and calls a callback when complete.
   *
   * @param {string[]} animationFrames - The frames of the animation.
   * @param {Function} onComplete - Callback executed after the animation.
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
   * Plays the death animation and sound.
   */
  playDeadAnimation() {
    if (this.deadAnimationPlayed) return;
    this.deadAnimationPlayed = true;
    this.playSound(this.deadSound);
    this.playAnimationOnce(this.IMAGES_DEAD);
  }

  /**
   * Makes the end boss follow the character.
   *
   * @param {Character} character - The character to follow.
   */
  followCharacter(character) {
    if (this.isDead || this.isHurt) return;
    let attackPoint = this.otherDirection 
      ? this.x + this.width * 0.5 
      : this.x + this.width * 0.009;
    let diff = character.x - attackPoint;
    const moveThreshold = 60, attackThreshold = 30;
    this.isCharacterInSight = Math.abs(diff) <= this.sightRange;
    if (!this.isCharacterInSight) { this.handleOutOfSight(); return; }
    if (Math.abs(diff) > moveThreshold) {
      diff > 0 ? this.startMovingRight() : this.startMovingLeft();
    } else {
      this.startAttacking();
    }
  }

  /**
   * Handles the state when the character is out of sight.
   */
  handleOutOfSight() {
    this.stopAllActions();
    this.stopWalkSound();
  }

  /**
   * Stops the walking sound if it is playing.
   */
  stopWalkSound() {
    if (!this.walkSound.paused) {
      this.walkSound.pause();
      this.walkSound.currentTime = 0;
    }
  }

  /**
   * Starts moving the end boss to the left.
   */
  startMovingLeft() {
    this.isMovingLeft = true;
    this.isMovingRight = false;
    this.isAttacking = false;
    this.otherDirection = false;
  }

  /**
   * Starts moving the end boss to the right.
   */
  startMovingRight() {
    this.isMovingRight = true;
    this.isMovingLeft = false;
    this.isAttacking = false;
    this.otherDirection = true;
  }

  /**
   * Starts the attack animation.
   */
  startAttacking() {
    this.isAttacking = true;
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  /**
   * Stops all actions (moving and attacking).
   */
  stopAllActions() {
    this.isMovingLeft = false;
    this.isAttacking = false;
  }

  /**
   * Loads the sounds for the end boss.
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
   * Plays a specific sound and pauses all other sounds.
   *
   * @param {HTMLAudioElement} activeSound - The sound to play.
   */
  playSound(activeSound) {
    if (!this.world || !this.world.isGameRunning || window.world.soundManager.isMuted) return;
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
   * Toggles the mute state of all sounds.
   *
   * @param {boolean} isMuted - Whether to mute the sounds.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walkSound.muted = window.world.soundManager.isMuted;
    this.attackSound.muted = window.world.soundManager.isMuted;
    this.deadSound.muted = window.world.soundManager.isMuted;
    
    if (window.world.soundManager.isMuted) {
      this.walkSound.pause();
      this.walkSound.currentTime = 0;
      this.attackSound.pause();
      this.attackSound.currentTime = 0;
      this.deadSound.pause();
      this.deadSound.currentTime = 0;
    }
 }

}