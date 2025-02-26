class ThrowableObject extends MovableObject {
    IMAGES_EXPLOSION = [
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp', 
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
      './img/hero.img/Bomb/bomb_0003_Layer-7.webp'
    ];
  
    constructor(x, y, otherDirection) {
      super().loadImage('./img/hero.img/Bomb/bomb_0009_Layer-1.webp');
      this.loadImages(this.IMAGES_EXPLOSION);
      this.x = x;
      this.y = y;
      this.height = 100;
      this.width = 100;
      this.otherDirection = otherDirection;
      this.throw();
  
      // Erstelle den Explosionssound
      this.explosion_sound = new Audio('./audio/BombHit.mp3');
      this.explosion_sound.volume = 0.2;
      
      // Statt eines eigenen isMuted-Flags: 
      // Greife direkt auf den globalen Mute-Zustand zu
      if (window.world && window.world.soundManager) {
        // Registriere den Sound im globalen SoundManager
        window.world.soundManager.registerSound(this.explosion_sound);
      }
    }
  
    throw() {
      this.speedY = 7;
      this.applyGravity();
      setInterval(() => {
        this.x += this.otherDirection ? -30 : 30;
      }, 35);
    }
  
    playExplosion(onComplete) {
        if (this.hasExploded) return; // Verhindert mehrfaches Auslösen
        this.hasExploded = true;
      
        let frameIndex = 0;
        this.speedY = 0;
        this.applyGravity = () => {};
      
        // Prüfe direkt den globalen Mute-Zustand
        if (!window.world.soundManager.isMuted) {
          this.explosion_sound.play();
        }
      
        const explosionInterval = setInterval(() => {
          this.img = this.imageCache[this.IMAGES_EXPLOSION[frameIndex++]];
          if (frameIndex >= this.IMAGES_EXPLOSION.length) {
            clearInterval(explosionInterval);
            if (onComplete) onComplete();
          }
        }, 1200 / 120);
      }
      
  
    // Optional: Falls du diese Methode aufrufst, um den lokalen Sound zu steuern
    toggleMute(isMuted) {
      // Diese Methode ist dann eher überflüssig, wenn der SoundManager die Steuerung übernimmt.
      // Solltest du sie dennoch nutzen, könnte sie so aussehen:
      this.explosion_sound.muted = isMuted;
      if (isMuted) {
        this.explosion_sound.pause();
        this.explosion_sound.currentTime = 0;
      }
    }
  }
  