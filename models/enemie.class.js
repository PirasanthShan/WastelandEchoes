class Enemie extends MovableObject {
  y = 260;
  height = 160;
  width = 160;
  isDead = false;
  soundEnabled = false; // 🔇 Standardmäßig ist der Sound deaktiviert

  IMAGES_WALKING = [
    'img/enemies.img/zombie1.img/run.img/Run_Frame_2.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_3.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_4.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_5.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_6.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_7.webp',
    'img/enemies.img/zombie1.img/run.img/Run_Frame_8.webp',
];

IMAGES_ATTACK = [
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
    'img/enemies.img/zombie1.img/attack.img/Rotated_Frame_1.webp',
];

IMAGES_DEAD = [
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_1.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_2.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_3.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_4.webp',
    './img/enemies.img/zombie1.img/dead.img/Flipped_Dead_Frame_5.webp',
];


  constructor() {
    super().loadImage('./img/enemies.img/zombie1.img/run.img/Run_Frame_1.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 600 + Math.random() * 700;
    this.speed = 0.70 + Math.random() * 1;

    this.walking_sound = new Audio(`./audio/Zombie.mp3?nocache=${Date.now()}`);
    this.walking_sound.volume = 0.02;
    this.walking_sound.loop = true;

    this.dead_sound = new Audio(`./audio/zombieDead.mp3?nocache=${Date.now()}`);
    this.dead_sound.volume = 0.07; // 🎵 Lautstärke für Tod-Sound angepasst

    this.setupUserInteraction();
  }

  /**
   * 🎮 Startet die Animation erst, wenn das Spiel beginnt
   */
  startAnimation() {
    this.animate();
  }

  /**
 * Führt die Animation des Objekts aus, indem in zwei Intervallen
 * Bewegungs-/Sound-Updates und Animations-Updates durchgeführt werden.
 */
animate() {
  setInterval(() => {
    this.handleMovementAndSound();
  }, 1000 / 140);

  setInterval(() => {
    this.handleWalkingAnimation();
  }, 30000 / 300);
}

/**
 * Aktualisiert die Bewegung und den Sound.
 * Wenn die Welt nicht existiert oder pausiert ist, wird der Sound gestoppt.
 * Ist das Objekt nicht tot, wird es nach links bewegt und der Sound abgespielt.
 * Andernfalls wird der Sound gestoppt.
 */
handleMovementAndSound() {
  if (!this.world || !this.world.isGameRunning) {
    this.stopSound(); // Stoppe den Sound, wenn das Spiel pausiert ist
    return;
  }
  if (!this.isDead) {
    this.moveLeft();
    this.playSound(); // Sound nur abspielen, wenn das Spiel läuft
  } else {
    this.stopSound(); // Stoppt den Sound, wenn tot
  }
}

/**
 * Aktualisiert die Animation des Objekts.
 * Wird nur ausgeführt, wenn die Welt existiert, läuft und das Objekt nicht tot ist.
 */
handleWalkingAnimation() {
  if (!this.world || !this.world.isGameRunning) return; // Falls Spiel pausiert ist, keine Animation!
  if (!this.isDead) {
    this.playAnimation(this.IMAGES_WALKING);
  }
}



  /**
   * 🔊 Aktiviert den Sound erst nach einer Benutzerinteraktion (Click/Tastendruck)
   */
  setupUserInteraction() {
    document.addEventListener("click", () => this.enableSound(), { once: true });
    document.addEventListener("keydown", () => this.enableSound(), { once: true });
  }

  /**
   * ✅ Schaltet den Sound frei, nachdem der Nutzer interagiert hat
   */
  enableSound() {
    this.soundEnabled = true;
   }

  toggleMute(isMuted) {
    this.isMuted = isMuted;
    this.walking_sound.muted = isMuted;
    this.dead_sound.muted = isMuted;
  }
  

  /**
   * 🔉 Spielt den Sound sicher ab (nur wenn erlaubt)
   */
  playSound() {
    if (!this.world || !this.world.isGameRunning) {
        this.stopSound(); // 🔇 Falls das Spiel pausiert wird, stoppe den Sound!
        return;
    }

    if (this.soundEnabled && this.walking_sound.paused) {
        this.walking_sound.play();
        }
    }


  /**
   * 🔇 Stoppt den Lauf-Sound, wenn der Enemy stirbt!
   */
  stopSound() {
    if (!this.walking_sound.paused) {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0; // Setzt den Sound zurück
    }
}


 /**
 * Spielt die Todesanimation des Endboss ab.
 * Falls die Todesanimation bereits abgespielt wurde, wird nichts unternommen.
 * Stoppt zunächst alle Sounds, spielt dann den Todes-Sound ab (falls aktiviert) und
 * führt die Todesanimationssequenz aus. Nach Abschluss der Animation wird optional eine Callback-Funktion ausgeführt.
 *
 * @param {Function} [onComplete] - Eine Callback-Funktion, die nach Abschluss der Todesanimation aufgerufen wird.
 */
playDeadAnimation(onComplete) {
  if (this.isDead) return; // Falls er schon tot ist, nicht nochmal abspielen
  this.isDead = true;
  this.stopSound();           // Lauf-Sound sofort stoppen
  this.playDeathSound();      // Todes-Sound abspielen (falls aktiviert)
  this.runDeathAnimation(onComplete);
}

/**
 * Spielt den Todes-Sound ab, sofern der Sound aktiviert ist.
 */
playDeathSound() {
  if (this.soundEnabled) {
    this.dead_sound.play();
  }
}

/**
 * Führt die Todesanimationssequenz aus, indem die Bilder aus IMAGES_DEAD in einem festen Intervall abgespielt werden.
 * Nach dem Durchlaufen aller Frames wird das Intervall gelöscht und nach 2000 Millisekunden optional die Callback-Funktion aufgerufen.
 *
 * @param {Function} [onComplete] - Eine Callback-Funktion, die nach Abschluss der Animation aufgerufen wird.
 */
runDeathAnimation(onComplete) {
  let frameIndex = 0;
  const deadAnimationInterval = setInterval(() => {
    this.img = this.imageCache[this.IMAGES_DEAD[frameIndex++]];
    if (frameIndex >= this.IMAGES_DEAD.length) {
      clearInterval(deadAnimationInterval);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    }
  }, 1000 / 8);
}

}
