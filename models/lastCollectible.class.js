/**
 * Class representing the final collectible object in the game.
 * This object plays background music when the character is nearby.
 */
class LastCollectible extends MovableObject {
    /**
     * @property {number} width - The width of the collectible object.
     * @property {number} height - The height of the collectible object.
     * @property {boolean} musicPlayed - Indicates whether the music has already been played.
     * @property {boolean} isMusicPaused - Indicates whether the music is paused.
     * @property {boolean} isMuted - Indicates whether the music is muted.
     * @property {Audio} music - The audio instance for the background music.
     */
    width = 250;
    height = 250;
    musicPlayed = false;
    isMusicPaused = false;
    isMuted = false;
    music = null;

    /**
     * Creates an instance of LastCollectible and loads the object's image.
     */
    constructor() {
        super().loadImage('./img/Ship6.webp');
        this.x = 2400;
        this.y = 180;
    }

    /**
     * Checks if the collectible object is within the character's view range,
     * and plays music if it hasn't been played yet.
     * @param {Object} character - The character object containing the player's position.
     */
    checkVisibility(character) {
        const visibilityRange = 600;
        if (!this.musicPlayed && Math.abs(character.x - this.x) < visibilityRange) {
            this.playMusic();
        }
    }

    /**
     * Creates the audio instance and starts the background music if the object is visible.
     */
    playMusic() {
        if (!this.music) {
            this.music = new Audio('./audio/spaceEngine_000.mp3');
            this.music.volume = 0.05;
            this.music.loop = true;
            // Register the music in the global SoundManager,
            // so it is automatically stopped when pausing the game
            if (window.world && window.world.soundManager) {
                window.world.soundManager.registerSound(this.music);
            }
        }

        if (this.isMuted) return;

        if (this.isMusicPaused) {
            this.resumeMusic();
        } else if (this.music.paused) {
            this.music.play().catch(() => {
                console.warn("Autoplay blocked, interaction required.");
            });
            this.musicPlayed = true;
        }
    }

    /**
     * Stops the background music and sets the pause status.
     */
    stopMusic() {
        if (this.music && !this.music.paused) {
            this.music.pause();
            this.isMusicPaused = true;
        }
    }

    /**
     * Resumes the background music if it was paused and not muted.
     */
    resumeMusic() {
        if (this.music && this.isMusicPaused && !this.isMuted) {
            this.music.play().catch(() => {
                console.warn("Error resuming playback.");
            });
            this.isMusicPaused = false;
        }
    }

    /**
     * Toggles the mute status of the background music.
     * If the music is muted, it is stopped.
     * If unmuted, the music resumes.
     * @param {boolean} isMuted - The new mute status (true = muted, false = unmuted).
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

    /**
     * Updates the position of the collectible object.
     * @param {number} x - The new x-coordinate.
     * @param {number} y - The new y-coordinate.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Updates the size of the collectible object.
     * @param {number} width - The new width of the object.
     * @param {number} height - The new height of the object.
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
}