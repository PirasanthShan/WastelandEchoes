/**
 * Klasse zur Verwaltung von Spielsounds.
 */
class SoundManager {
  /**
   * Erstellt eine Instanz des SoundManagers.
   */
  constructor() {
      this.sounds = []; // Speichert alle registrierten Audio-Objekte
      this.isMuted = false; // Standardmäßig ist der Sound aktiviert
  }

  /**
   * Registriert ein Audio-Objekt.
   * @param {Audio} sound - Das zu registrierende Audio-Objekt.
   */
  registerSound(sound) {
      this.sounds.push(sound);
  }

  /**
   * Schaltet den Stumm-Modus für alle registrierten Sounds um.
   */
  toggleMute() {
      this.isMuted = !this.isMuted;
      this.sounds.forEach(sound => {
          sound.muted = this.isMuted;
      });
  }

  /**
   * Stoppt alle Sounds, indem sie pausiert und auf den Anfang zurückgesetzt werden.
   */
  stopAllSounds() {
      this.sounds.forEach(sound => {
          if (!sound.paused) {
              sound.dataset.wasPlaying = "true"; // Speichert, dass der Sound lief
              sound.pause();
              sound.currentTime = 0;
          }
      });
  }

  /**
   * Setzt alle Sounds fort, die vor dem Stoppen abgespielt wurden.
   */
  resumeAllSounds() {
      this.sounds.forEach(sound => {
          if (sound.dataset.wasPlaying === "true") {
              sound.play().catch(err => console.error(err));
              delete sound.dataset.wasPlaying;
          }
      });
  }
}
