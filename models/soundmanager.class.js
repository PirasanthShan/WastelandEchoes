/**
 * Class for managing game sounds.
 * This class allows registering, playing, stopping, and muting audio objects.
 */
class SoundManager {
  /**
   * Creates an instance of `SoundManager`.
   * @param {World} world - The game world instance using the SoundManager.
   */
  constructor(world) {
    this.sounds = [];
    this.isMuted = localStorage.getItem('isMuted') === 'true';
    this.world = world;
  }

  /**
   * Registers an audio object in the SoundManager.
   * @param {Audio} sound - The audio object to register.
   */
  registerSound(sound) {
    this.sounds.push(sound);
    sound.muted = this.isMuted;
  }

  /**
   * Toggles the mute state for all registered sounds.
   * If the sound is muted, all sounds are muted; otherwise, they are unmuted.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('isMuted', this.isMuted.toString());
    this.applyMuteState();
    this.world.interfaceRenderer.updateSoundButtonIcon();
  }

  /**
   * Stops all sounds by pausing them and resetting to the beginning.
   * Saves the state (whether the sound was playing) to resume later.
   */
  stopAllSounds() {
    this.sounds.forEach((sound) => {
      if (!sound.paused) {
        sound.dataset.wasPlaying = "true"; 
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }

  /**
   * Resumes all sounds that were playing before being stopped.
   * Only sounds that were previously playing are resumed.
   */
  resumeAllSounds() {
    this.sounds.forEach((sound) => {
      if (sound.dataset.wasPlaying === "true") {
        sound.play().catch(() => {});
        delete sound.dataset.wasPlaying;
      }
    });
  }

  /**
   * Ensures all registered sounds have the current mute state.
   */
  applyMuteState() {
    this.sounds.forEach((sound) => {
      sound.muted = this.isMuted;
    });
  }
}