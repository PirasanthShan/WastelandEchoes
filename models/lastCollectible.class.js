/**
 * Class representing the last collectible item in the game.
 * This item plays background music when the character is near.
 */
class LastCollectible extends MovableObject {
    /**
     * @property {number} width - The width of the collectible.
     * @property {number} height - The height of the collectible.
     * @property {boolean} musicPlayed - Indicates whether the music has been played.
     * @property {boolean} isMusicPaused - Indicates whether the music is paused.
     * @property {boolean} isMuted - Indicates whether the music is muted.
     */
    width = 250;
    height = 250;
    musicPlayed = false;
    isMusicPaused = false;
    isMuted = false;

    /**
     * Creates an instance of LastCollectible.
     */
    constructor() {
        super().loadImage('./img/Ship6.webp');
        this.x = 2400;
        this.y = 180;
    }

    /**
     * Checks if the collectible is within the character's visibility range and plays music.
     * @param {Object} character - The character object.
     */
    checkVisibility(character) {
        const viewDistance = 600;
        if (!this.musicPlayed && Math.abs(character.x - this.x) < viewDistance) {
            this.playMusic();
        }
    }

    /**
     * Plays background music when the collectible is visible.
     */
    playMusic() {
        if (!this.music) {
            this.music = new Audio('./audio/spaceEngine_000.mp3');
            this.music.volume = 0.05;
            this.music.loop = true;
        }

        if (this.isMuted) return;

        if (this.isMusicPaused) {
            this.resumeMusic();
        } else if (this.music.paused) {
            this.music.play().catch(() => {
                // Handle autoplay block
            });
            this.musicPlayed = true;
        }
    }

    /**
     * Stops the background music.
     */
    stopMusic() {
        if (this.music && !this.music.paused) {
            this.music.pause();
            this.isMusicPaused = true;
        }
    }

    /**
     * Resumes the background music if it was paused.
     */
    resumeMusic() {
        if (this.music && this.isMusicPaused && !this.isMuted) {
            this.music.play().catch(() => {
                // Handle resume block
            });
            this.isMusicPaused = false;
        }
    }

    /**
     * Toggles the mute state of the background music.
     * @param {boolean} isMuted - The mute state to be applied.
     */
    toggleMute(isMuted) {
        this.isMuted = isMuted;
        if (this.music) {
            this.music.muted = isMuted;
            if (isMuted) {
                this.stopMusic();
            } else {
                this.resumeMusic();
            }
        }
    }
}
