/**
 * Klasse zur Verwaltung von Spielsounds.
 * Diese Klasse ermöglicht das Registrieren, Abspielen, Stoppen und Stummschalten von Audio-Objekten.
 */
class SoundManager {
    /**
     * Erstellt eine Instanz des `SoundManager`.
     */
    constructor() {
      /** @type {Audio[]} Liste aller registrierten Audio-Objekte. */
      this.sounds = [];
  
      /** @type {boolean} Gibt an, ob der Sound stummgeschaltet ist. */
      this.isMuted = localStorage.getItem('isMuted') === 'true';
    }
  
    /**
     * Registriert ein Audio-Objekt im SoundManager.
     * @param {Audio} sound - Das zu registrierende Audio-Objekt.
     */
    registerSound(sound) {
      this.sounds.push(sound);
      sound.muted = this.isMuted;
    }
  
    /**
     * Schaltet den Stumm-Modus für alle registrierten Sounds um.
     * Wenn der Sound stummgeschaltet ist, werden alle Sounds stummgeschaltet, andernfalls werden sie aktiviert.
     */
    toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('isMuted', this.isMuted.toString());
      this.sounds.forEach((sound) => sound.muted = this.isMuted);
    }
  
    /**
     * Stoppt alle Sounds, indem sie pausiert und auf den Anfang zurückgesetzt werden.
     * Speichert den Zustand (ob der Sound abgespielt wurde), um ihn später fortsetzen zu können.
     */
    stopAllSounds() {
      this.sounds.forEach((sound) => {
        if (!sound.paused) {
          sound.dataset.wasPlaying = "true"; // Speichert, dass der Sound lief
          sound.pause();
          sound.currentTime = 0;
        }
      });
    }
  
    /**
     * Setzt alle Sounds fort, die vor dem Stoppen abgespielt wurden.
     * Nur Sounds, die vorher abgespielt wurden, werden fortgesetzt.
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
     * Stellt sicher, dass alle registrierten Sounds den aktuellen Mute-Status haben.
     */
    applyMuteState() {
      this.sounds.forEach((sound) => {
          sound.muted = this.isMuted;
      });
     }

  }