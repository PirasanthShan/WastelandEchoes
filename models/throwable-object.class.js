/**
 * Klasse für Objekte, die geworfen werden können, wie Bomben.
 */
class ThrowableObject extends MovableObject {
    /**
     * @property {string[]} IMAGES_EXPLOSION - Bilder für die Explosion-Animation.
     * @property {Audio} explosion_sound - Sound für die Explosion.
     * @property {boolean} isMuted - Gibt an, ob der Explosion-Sound stummgeschaltet ist.
     */
    IMAGES_EXPLOSION = [
        './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
        './img/hero.img/Bomb/bomb_0003_Layer-7.webp', 
        './img/hero.img/Bomb/bomb_0003_Layer-7.webp',
        './img/hero.img/Bomb/bomb_0003_Layer-7.webp'
    ];

    /**
     * Erstellt eine Instanz eines werfbaren Objekts.
     * @param {number} x - Startposition auf der x-Achse.
     * @param {number} y - Startposition auf der y-Achse.
     * @param {boolean} otherDirection - Gibt an, ob das Objekt in die andere Richtung geworfen wird.
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
        this.isMuted = false;
    }

    /**
     * Lässt das Objekt mit einer bestimmten Geschwindigkeit fliegen.
     */
    throw() {
        this.speedY = 7;
        this.applyGravity();
        setInterval(() => {
            this.x += this.otherDirection ? -30 : 30;
        }, 35);
    }

    /**
     * Startet die Explosion mit einer Animation und spielt den Sound ab.
     * @param {Function} onComplete - Callback-Funktion, die nach der Explosion ausgeführt wird.
     */
    playExplosion(onComplete) {
        let frameIndex = 0;
        this.speedY = 0;
        this.applyGravity = () => {};

        if (!this.isMuted) {
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

    /**
     * Schaltet den Mute-Status für den Explosion-Sound um.
     * @param {boolean} isMuted - Gibt an, ob der Sound stummgeschaltet werden soll.
     */
    toggleMute(isMuted) {
        this.isMuted = isMuted;
        this.explosion_sound.muted = isMuted;
    }
}