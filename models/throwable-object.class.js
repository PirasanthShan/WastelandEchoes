/**
 * Class representing a throwable object in the game, such as a bomb.
 * Inherits from MovableObject.
 */
class ThrowableObject extends MovableObject {
   
    IMAGES_EXPLOSION = [
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp'
    ];
  
    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Determines if the object is thrown in the opposite direction.
     */
    constructor(x, y, otherDirection) {
      super().loadImage('./img/hero.img/Bomb/bomb_0009_Layer-1.webp');
      this.loadImages(this.IMAGES_EXPLOSION);
      this.x = x;
      this.y = y;
      this.height = 100;
      this.width = 100;
      this.otherDirection = otherDirection;
      this.throw();
      this.explosion_sound = new Audio('./audio/BombHit.mp3');
      this.explosion_sound.volume = 0.2;
      if (window.world && window.world.soundManager) {
      window.world.soundManager.registerSound(this.explosion_sound);
      }
    }
  
    /**
     * Throws the object by applying gravity and horizontal movement.
     */
    throw() {
      this.speedY = 7;
      this.applyGravity();
      setInterval(() => {
        this.x += this.otherDirection ? -30 : 30;
      }, 35);
    }
  
    /**
     * Plays the explosion animation and sound.
     * @param {Function} onComplete - Callback function to execute after the explosion completes.
     */
    playExplosion(onComplete) {
      if (this.hasExploded) return; 
      this.hasExploded = true;
      let frameIndex = 0;
      this.speedY = 0;
      this.applyGravity = () => {};
      if (!window.world.soundManager.isMuted) {
      this.explosion_sound.play();}
      const explosionInterval = setInterval(() => {
        this.img = this.imageCache[this.IMAGES_EXPLOSION[frameIndex++]];
        if (frameIndex >= this.IMAGES_EXPLOSION.length) {clearInterval(explosionInterval);
        if (onComplete) onComplete();
        }
      }, 1200 / 120);
    }
  
    /**
     * Toggles the mute state of the explosion sound.
     * @param {boolean} isMuted - The new mute state (true = muted, false = unmuted).
     */
    toggleMute(isMuted) {
     this.explosion_sound.muted = isMuted;
      if (isMuted) {
        this.explosion_sound.pause();
        this.explosion_sound.currentTime = 0;
      }
    }
  }