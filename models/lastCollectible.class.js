/**
 * Klasse, die das letzte sammelbare Objekt im Spiel repräsentiert.
 * Dieses Objekt spielt Hintergrundmusik, wenn sich der Charakter in der Nähe befindet.
 */
class LastCollectible extends MovableObject {
    /**
     * @property {number} width - Die Breite des sammelbaren Objekts.
     * @property {number} height - Die Höhe des sammelbaren Objekts.
     * @property {boolean} musicPlayed - Gibt an, ob die Musik bereits abgespielt wurde.
     * @property {boolean} isMusicPaused - Gibt an, ob die Musik pausiert ist.
     * @property {boolean} isMuted - Gibt an, ob die Musik stummgeschaltet ist.
     * @property {Audio} music - Die Audio-Instanz für die Hintergrundmusik.
     */
    width = 250;
    height = 250;
    musicPlayed = false;
    isMusicPaused = false;
    isMuted = false;
    music = null;

    /**
     * Erstellt eine Instanz von LastCollectible und lädt das Bild des Objekts.
     */
    constructor() {
        super().loadImage('./img/Ship6.webp');
        this.x = 2400;
        this.y = 180;
    }

    /**
     * Überprüft, ob sich das sammelbare Objekt im Sichtbereich des Charakters befindet, 
     * und spielt Musik ab, falls es noch nicht abgespielt wurde.
     * @param {Object} character - Das Charakter-Objekt, das die Position des Spielers enthält.
     */
    checkVisibility(character) {
        const sichtweite = 600;
        // Falls das Spiel nicht mehr läuft, wird die Musik nicht gestartet.
        if (window.world && !window.world.isGameRunning) {
        return;
        }
        if (!this.musicPlayed && Math.abs(character.x - this.x) < sichtweite) {
            this.playMusic();
        }
    }

    /**
     * Erstellt die Audio-Instanz und startet die Hintergrundmusik, falls das Objekt sichtbar ist.
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
                console.warn("Autoplay blockiert, Interaktion erforderlich.");
            });
            this.musicPlayed = true;
        }
    }

    /**
     * Stoppt die Hintergrundmusik und setzt den Pausenstatus.
     */
    stopMusic() {
        if (this.music && !this.music.paused) {
            this.music.pause();
            this.music.currentTime = 0
            this.isMusicPaused = true;
            this.musicPlayed = true;
        }
    }

    /**
     * Setzt die Hintergrundmusik fort, falls sie pausiert war und nicht stummgeschaltet ist.
     */
    resumeMusic() {
        if (this.music && this.isMusicPaused && !this.isMuted) {
            this.music.play().catch(() => {
                console.warn("Fehler beim Fortsetzen der Wiedergabe.");
            });
            this.isMusicPaused = false;
        }
    }

    /**
     * Schaltet den Stummschaltungsstatus der Hintergrundmusik um.
     * Wenn die Musik stummgeschaltet wird, wird sie gestoppt. 
     * Wenn die Stummschaltung aufgehoben wird, wird die Musik fortgesetzt.
     * @param {boolean} isMuted - Der neue Stummschaltungsstatus (true = stumm, false = laut).
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
     * Setzt die Position des sammelbaren Objekts neu.
     * @param {number} x - Die neue X-Koordinate.
     * @param {number} y - Die neue Y-Koordinate.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Setzt die Größe des sammelbaren Objekts neu.
     * @param {number} width - Die neue Breite des Objekts.
     * @param {number} height - Die neue Höhe des Objekts.
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
}
