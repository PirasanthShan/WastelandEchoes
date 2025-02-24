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
  // Zustände
  isAttacking = false;
  isMovingLeft = false;
  isMovingRight = false;
  sightRange = 500;
  isHurt = false;
  isDead = false;
  hitCount = 0;
  deadAnimationPlayed = false;
  isCharacterInSight = false;
  
  // Bilder
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

  constructor() {
    super().loadImage('./img/boss.img/Idle_000_mirrored.webp');
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.speed = 5;
    this.loadSounds();
  }

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

  startAnimation() {
    this.animate();
  }

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

  handleDeadState() {
    if (!this.deadAnimationPlayed) {
      this.playDeadAnimation();
      this.y = 250;
      this.height = 240;
      this.width = 260;
    }
  }

  handleHurtState() {
    this.playAnimation(this.IMAGES_HURT);
    this.playSound(this.attackSound);
  }

  handleAttackingState() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.playSound(this.attackSound);
  }

  handleMovingLeftState() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveLeft();
    this.playSound(this.walkSound);
  }

  handleMovingRightState() {
    this.playAnimation(this.IMAGES_WALKING);
    this.moveRight();
    this.playSound(this.walkSound);
  }

  handleStandingState() {
    this.playAnimation(this.IMAGES_STANDING);
  }

  stopAnimation() {
    this.clearAnimationInterval();
    this.stopAllSounds();
  }

  clearAnimationInterval() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  stopAllSounds() {
    this.stopSoundIfExists(this.walkSound);
    this.stopSoundIfExists(this.attackSound);
    this.stopSoundIfExists(this.deadSound);
  }

  stopSoundIfExists(sound) {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  handleHurt() {
    if (this.isDead || this.isHurt) return;
    this.hitCount++;
    if (this.hitCount >= 5) { this.markAsDead(); return; }
    this.activateHurtState();
  }

  markAsDead() {
    this.isDead = true;
    this.isHurt = false;
  }

  activateHurtState() {
    this.isHurt = true;
    this.playAnimationOnce(this.IMAGES_HURT, () => { this.isHurt = false; });
  }

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

  playDeadAnimation() {
    if (this.deadAnimationPlayed) return;
    this.deadAnimationPlayed = true;
    this.playSound(this.deadSound);
    this.playAnimationOnce(this.IMAGES_DEAD);
  }

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

  handleOutOfSight() {
    this.stopAllActions();
    this.stopWalkSound();
  }

  stopWalkSound() {
    if (!this.walkSound.paused) {
      this.walkSound.pause();
      this.walkSound.currentTime = 0;
    }
  }

  startMovingLeft() {
    this.isMovingLeft = true;
    this.isMovingRight = false;
    this.isAttacking = false;
    this.otherDirection = false;
  }

  startMovingRight() {
    this.isMovingRight = true;
    this.isMovingLeft = false;
    this.isAttacking = false;
    this.otherDirection = true;
  }

  startAttacking() {
    this.isAttacking = true;
    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  stopAllActions() {
    this.isMovingLeft = false;
    this.isAttacking = false;
  }

  loadSounds() {
    this.walkSound = new Audio('./audio/GolemWalk.mp3');
    this.attackSound = new Audio('./audio/GolemHit.mp3');
    this.deadSound = new Audio('./audio/GolemDead.mp3');
    this.walkSound.volume = 0.5;
    this.attackSound.volume = 0.5;
    this.deadSound.volume = 0.5;
    this.walkSound.loop = true;
  }

  playSound(activeSound) {
    if (!this.isCharacterInSight) return;
    const allSounds = [this.walkSound, this.attackSound, this.deadSound];
    allSounds.forEach(sound => {
      if (sound !== activeSound) { sound.pause(); sound.currentTime = 0; }
    });
    if (activeSound.paused) { activeSound.play().catch(() => {}); }
  }

  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walkSound.muted = isMuted;
    this.attackSound.muted = isMuted;
    this.deadSound.muted = isMuted;
  }
}
