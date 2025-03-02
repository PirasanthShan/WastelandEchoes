/**
 * Represents the playable character that can move within the game world.
 * Inherits from the `MovableObject` class and extends it with specific properties and methods for the character.
 */
class Character extends MovableObject {
 height = 110;
 width = 110;
 y = 310;
 speed = 1;
 isAnimationPlaying = false;
 isMuted = false;
 hitboxWidth = 110;
 hitboxHeight = 110;
 isAttacking = false; 
 IMAGES_WALKING = [
    './img/hero.img/03_Walk/Walk_000.webp',
    './img/hero.img/03_Walk/Walk_001.webp',
    './img/hero.img/03_Walk/Walk_002.webp',
    './img/hero.img/03_Walk/Walk_003.webp',
    './img/hero.img/03_Walk/Walk_004.webp',
    './img/hero.img/03_Walk/Walk_005.webp',
    './img/hero.img/03_Walk/Walk_006.webp',
    './img/hero.img/03_Walk/Walk_007.webp',
    './img/hero.img/03_Walk/Walk_008.webp',
    './img/hero.img/03_Walk/Walk_009.webp',
    './img/hero.img/03_Walk/Walk_010.webp',
    './img/hero.img/03_Walk/Walk_011.webp'
  ];
  IMAGES_STANDING = [
    './img/hero.img/01_Idle/idle_000.webp',
    './img/hero.img/01_Idle/idle_001.webp',
    './img/hero.img/01_Idle/idle_002.webp',
    './img/hero.img/01_Idle/idle_003.webp',
    './img/hero.img/01_Idle/idle_004.webp',
    './img/hero.img/01_Idle/idle_005.webp',
    './img/hero.img/01_Idle/idle_006.webp',
    './img/hero.img/01_Idle/idle_007.webp',
    './img/hero.img/01_Idle/idle_008.webp'
  ];
 IMAGES_JUMPING = [
    './img/hero.img/05_Jump/Jump_001_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_002_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_003_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_004_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_005_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_006_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_007_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_008_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_009_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_010_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_011_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_012_cropped_resized.webp'
  ];
  IMAGES_DEAD = [
    './img/hero.img/13_Death/Death_000.webp',
    './img/hero.img/13_Death/Death_001.webp',
    './img/hero.img/13_Death/Death_002.webp',
    './img/hero.img/13_Death/Death_003.webp',
    './img/hero.img/13_Death/Death_004.webp',
    './img/hero.img/13_Death/Death_005.webp',
    './img/hero.img/13_Death/Death_006.webp',
    './img/hero.img/13_Death/Death_007.webp',
    './img/hero.img/13_Death/Death_008.webp',
    './img/hero.img/13_Death/Death_009.webp',
    './img/hero.img/13_Death/Death_010.webp',
    './img/hero.img/13_Death/Death_011.webp',
    './img/hero.img/13_Death/Death_012.webp',
    './img/hero.img/13_Death/Death_013.webp',
    './img/hero.img/13_Death/Death_014.webp'
  ];
  IMAGES_HURT = [
    './img/hero.img/04_Sit/Sit_000.webp',
    './img/hero.img/04_Sit/Sit_001.webp',
    './img/hero.img/04_Sit/Sit_002.webp',
    './img/hero.img/04_Sit/Sit_003.webp',
    './img/hero.img/04_Sit/Sit_004.webp',
    './img/hero.img/04_Sit/Sit_005.webp',
    './img/hero.img/04_Sit/Sit_006.webp',
    './img/hero.img/04_Sit/Sit_007.webp',
    './img/hero.img/04_Sit/Sit_008.webp',
    './img/hero.img/04_Sit/Sit_010.webp',
    './img/hero.img/04_Sit/Sit_011.webp',
    './img/hero.img/04_Sit/Sit_012.webp',
    './img/hero.img/04_Sit/Sit_013.webp',
    './img/hero.img/04_Sit/Sit_014.webp'
  ];
  IMAGES_ATTACK = [
    './img/hero.img/06_Attack/Attack_000_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_001_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_002_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_003_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_004_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_005_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_006_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_007_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_008_resized_879x1157.webp'
  ];
  walking_sound = new Audio('./audio/robotwalk3.mp3');
  jump_sound = new Audio('./audio/roboJump.mp3');
  death_sound = new Audio('./audio/deathrobot.mp3');

  /**
   * Constructor for the `Character` class.
   * Loads initial images and sounds for the character.
   */
  constructor() {
    super().loadImage('./img/hero.img/02_Turn_to_walk/Turn_to_walk_003.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);

    this.applyGravity();
    this.loadSounds();
  }

  isCollidingBombCollectible(collectible) {
    if (this.isAttacking) {
    return false;
    }
    return CollisionHandler.isCollidingBombCollectible(this, collectible);
  }

  isCollidingEchoCollectible(mo) {
    if (this.isAttacking) {
      return false;
    }
    return CollisionHandler.isCollidingCollectibleEchoes(this, mo);
  }

  /**
   * Loads the sounds for the character and configures their properties.
   */
  loadSounds() {
    this.walking_sound = new Audio('./audio/robotwalk3.mp3');
    this.jump_sound = new Audio('./audio/roboJump.mp3');
    this.death_sound = new Audio('./audio/deathrobot.mp3');
    this.death_sound.volume = 0.1;
    this.walking_sound.volume = 0.4;
    this.walking_sound.loop = true;
    this.jump_sound.volume = 0.1;
  }

  /**
   * Mutes or unmutes the character's sounds.
   * @param {boolean} isMuted - Indicates whether the sounds should be muted.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    [this.walking_sound, this.jump_sound, this.death_sound].forEach(sound => {
      sound.muted = isMuted;
    });
  }

  /**
   * Starts the character's animation.
   */
  startAnimation() {
    this.animate();
  }

  /**
   * Plays a sound if it is not already playing.
   * @param {Audio} sound - The sound to be played.
   */
  playSound(sound) {
    if (!this.world || !this.world.isGameRunning || window.world.soundManager.isMuted) return;
    if (sound.paused) {
      sound.play().catch();
    }
  }

  /**
   * Stops a specific sound.
   * @param {Audio} sound - The sound to be stopped.
   */
  stopSound(sound) {
    if (!sound.paused) {
      sound.pause();
      sound.currentTime = 0; 
    }
  }

  /**
   * Stops all sounds of the character.
   */
  stopAllCharacterSounds() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.jump_sound);
    this.stopSound(this.death_sound);
  }

  /**
   * Main function for the character's animation.
   * Controls movement, jumping, sound, and camera position.
   */
  animate() {
    setInterval(() => {
      if (!this.world || !this.world.level || !this.world.isGameRunning) return;
      const isJumping = this.world.keyboard.UP && !this.isAboveGround();
      const isMovingRight = this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
      const isMovingLeft = this.world.keyboard.LEFT && this.x > 0;
      if (isJumping) {this.handleJump();}
      if (this.isAboveGround()) {this.handleAirborne();}
      this.handleMovement(isMovingRight, isMovingLeft);
      this.updateCameraPosition();
      }, 1000 / 100);
      this.startAnimationLoop();
  }

  /**
   * Handles the character's jump.
   */
  handleJump() {
    this.playSound(this.jump_sound);
    this.stopSound(this.walking_sound);
    this.jump();
  }

  /**
   * Handles the state when the character is airborne.
   */
  handleAirborne() {
    this.stopSound(this.walking_sound);
  }

    
    /**
   * Handles character movement based on input direction.
   * Stops movement sound if the character is dead.
   * 
   * @param {boolean} isMovingRight - Indicates if the character is moving right.
   * @param {boolean} isMovingLeft - Indicates if the character is moving left.
   */
  handleMovement(isMovingRight, isMovingLeft) {
    if (this.isDead()) {
        this.stopSound(this.walking_sound);
        return;
    }

    if (isMovingRight || isMovingLeft) {
        this.moveCharacter(isMovingRight);
    } else {
        this.stopSound(this.walking_sound);
    }
  }

  /**
  * Moves the character in the specified direction and updates its orientation.
  * 
  * @param {boolean} isMovingRight - Determines if the character moves right.
  */
  moveCharacter(isMovingRight) {
    if (isMovingRight) {
        this.moveRight();
        this.otherDirection = false;
    } else {
        this.moveLeft();
        this.otherDirection = true;
    }

    this.handleWalkingSound();
  }

  /**
  * Handles the walking sound based on whether the character is above ground.
  */
  handleWalkingSound() {
    if (!this.isAboveGround()) {
        this.playSound(this.walking_sound);
    } else {
        this.stopSound(this.walking_sound);
    }
  }

 /**
   * Updates the camera position based on the character's position.
   */
  updateCameraPosition() {
    if (this.x < 2300) {
      this.world.camera_x = -this.x + 100;
    } else if (this.x >= 2300 && this.x < this.world.level.level_end_x - this.world.canvas.width + 100) {
      this.world.camera_x = -(2300 - 100);
    }
  }

  /**
   * Starts the animation loop for the character.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (!this.world || !this.world.isGameRunning) return;
      if (this.isDead()) {this.handleDeathAnimation();return;}
      if (this.isHurt()) {this.handleHurtAnimation();} 
      else if (this.isAboveGround()) {this.handleJumpingAnimation();} 
      else if (this.isAttacking) {this.handleAttackingAnimation();} 
      else {this.handleMovementAnimation();}
    }, 90);
  }

  /**
   * Handles the character's death animation.
   */
  handleDeathAnimation() {
    this.playDeathAnimation();
  }

  /**
   * Handles the character's hurt animation.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Handles the character's jumping animation.
   */
  handleJumpingAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.height = 90;
    this.width = 90;
  }

    /**
     * Handles the character's attack animation.
     */
    handleAttackingAnimation() {
    this.isAttacking = true;
    this.width = 170;
    this.height = 130;
    }
  /**
   * Handles the character's movement animation.
   */
  handleMovementAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.height = 110;
      this.width = 110;
    } else {
      this.playAnimation(this.IMAGES_STANDING);
      this.height = 110;
      this.width = 110;
    }
  }

  /**
   * Plays the character's death animation.
   * @param {function} callback - Callback function to be called after the animation completes.
   */
  playDeathAnimation(callback) {
    if (this.isAnimationPlaying) return;
    this.isAnimationPlaying = true;

    this.playDeathSound();
    this.runDeathAnimation(callback);
  }

  /**
   * Plays the death sound.
   */
  playDeathSound() {
    if (!window.world || window.world.soundManager.isMuted) return;
    if (this.death_sound) {
      this.death_sound.play().catch(() => {});
    }
  }
  

  /**
   * Executes the death animation sequence.
   * @param {function} callback - Callback function to be called after the animation completes.
   */
  runDeathAnimation(callback) {
    const deathImages = this.IMAGES_DEAD;
    let currentFrame = 0;

    this.height = 130;
    this.width = 130;

    const animationInterval = setInterval(() => {
      this.img = this.imageCache[deathImages[currentFrame++]];
      if (currentFrame >= deathImages.length) {
        clearInterval(animationInterval);
        this.isAnimationPlaying = false;
        if (callback) callback();
      }
    }, 1000 / 25); // 25 FPS for the death animation
  }
}