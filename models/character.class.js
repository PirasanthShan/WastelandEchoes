/**
 * Repräsentiert die Spielfigur, die sich in der Spielwelt bewegen kann.
 * Erbt von der Klasse `MovableObject` und erweitert diese um spezifische Eigenschaften und Methoden für die Spielfigur.
 */
class Character extends MovableObject {
  /** @type {number} Höhe der Spielfigur in Pixeln. */
  height = 110;

  /** @type {number} Breite der Spielfigur in Pixeln. */
  width = 110;

  /** @type {number} Y-Position der Spielfigur auf der Canvas. */
  y = 310;

  /** @type {number} Geschwindigkeit der Spielfigur. */
  speed = 1;

  /** @type {boolean} Gibt an, ob eine Animation aktuell abgespielt wird. */
  isAnimationPlaying = false;

  /** @type {boolean} Gibt an, ob die Sounds der Spielfigur stummgeschaltet sind. */
  isMuted = false;

  /** @type {string[]} Liste der Bildpfade für die Geh-Animation. */
  IMAGES_WALKING = [
    './img/hero.img/03_Walk/Walk_000.webp',
    './img/hero.img/03_Walk/Walk_001.webp',
    './img/hero.img/03_Walk/Walk_002.webp',
    './img/hero.img/03_Walk/Walk_003.webp',
    './img/hero.img/03_Walk/Walk_004.webp',
    './img/hero.img/03_Walk/Walk_005.webp',
    './img/hero.img/03_Walk/Walk_006.webp',
    './img/hero.img/03_Walk/Walk_007.webp',
    './img/hero.img/03_Walk/Walk_008.webp',
    './img/hero.img/03_Walk/Walk_009.webp',
    './img/hero.img/03_Walk/Walk_010.webp',
    './img/hero.img/03_Walk/Walk_011.webp'
  ];

  /** @type {string[]} Liste der Bildpfade für die Steh-Animation. */
  IMAGES_STANDING = [
    './img/hero.img/01_Idle/idle_000.webp',
    './img/hero.img/01_Idle/idle_001.webp',
    './img/hero.img/01_Idle/idle_002.webp',
    './img/hero.img/01_Idle/idle_003.webp',
    './img/hero.img/01_Idle/idle_004.webp',
    './img/hero.img/01_Idle/idle_005.webp',
    './img/hero.img/01_Idle/idle_006.webp',
    './img/hero.img/01_Idle/idle_007.webp',
    './img/hero.img/01_Idle/idle_008.webp'
  ];

  /** @type {string[]} Liste der Bildpfade für die Sprung-Animation. */
  IMAGES_JUMPING = [
    './img/hero.img/05_Jump/Jump_001_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_002_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_003_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_004_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_005_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_006_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_007_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_008_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_009_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_010_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_011_cropped_resized.webp',
    './img/hero.img/05_Jump/Jump_012_cropped_resized.webp'
  ];

  /** @type {string[]} Liste der Bildpfade für die Todes-Animation. */
  IMAGES_DEAD = [
    './img/hero.img/13_Death/Death_000.webp',
    './img/hero.img/13_Death/Death_001.webp',
    './img/hero.img/13_Death/Death_002.webp',
    './img/hero.img/13_Death/Death_003.webp',
    './img/hero.img/13_Death/Death_004.webp',
    './img/hero.img/13_Death/Death_005.webp',
    './img/hero.img/13_Death/Death_006.webp',
    './img/hero.img/13_Death/Death_007.webp',
    './img/hero.img/13_Death/Death_008.webp',
    './img/hero.img/13_Death/Death_009.webp',
    './img/hero.img/13_Death/Death_010.webp',
    './img/hero.img/13_Death/Death_011.webp',
    './img/hero.img/13_Death/Death_012.webp',
    './img/hero.img/13_Death/Death_013.webp',
    './img/hero.img/13_Death/Death_014.webp'
  ];

  /** @type {string[]} Liste der Bildpfade für die Verletzungs-Animation. */
  IMAGES_HURT = [
    './img/hero.img/04_Sit/Sit_000.webp',
    './img/hero.img/04_Sit/Sit_001.webp',
    './img/hero.img/04_Sit/Sit_002.webp',
    './img/hero.img/04_Sit/Sit_003.webp',
    './img/hero.img/04_Sit/Sit_004.webp',
    './img/hero.img/04_Sit/Sit_005.webp',
    './img/hero.img/04_Sit/Sit_006.webp',
    './img/hero.img/04_Sit/Sit_007.webp',
    './img/hero.img/04_Sit/Sit_008.webp',
    './img/hero.img/04_Sit/Sit_010.webp',
    './img/hero.img/04_Sit/Sit_011.webp',
    './img/hero.img/04_Sit/Sit_012.webp',
    './img/hero.img/04_Sit/Sit_013.webp',
    './img/hero.img/04_Sit/Sit_014.webp'
  ];

  /** @type {string[]} Liste der Bildpfade für die Angriffs-Animation. */
  IMAGES_ATTACK = [
    './img/hero.img/06_Attack/Attack_000_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_001_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_002_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_003_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_004_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_005_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_006_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_007_resized_879x1157.webp',
    './img/hero.img/06_Attack/Attack_008_resized_879x1157.webp'
  ];

  /** @type {World} Referenz zur Spielwelt. */
  world;

  /** @type {Audio} Sound, der abgespielt wird, wenn die Spielfigur läuft. */
  walking_sound = new Audio('./audio/robotwalk3.mp3');

  /** @type {Audio} Sound, der abgespielt wird, wenn die Spielfigur springt. */
  jump_sound = new Audio('./audio/roboJump.mp3');

  /** @type {Audio} Sound, der abgespielt wird, wenn die Spielfigur stirbt. */
  death_sound = new Audio('./audio/deathrobot.mp3');

  /**
   * Konstruktor der `Character`-Klasse.
   * Lädt die initialen Bilder und Sounds für die Spielfigur.
   */
  constructor() {
    super().loadImage('./img/hero.img/02_Turn_to_walk/Turn_to_walk_003.webp');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_STANDING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);

    this.applyGravity();
    this.loadSounds();
  }

  /**
   * Lädt die Sounds für die Spielfigur und konfiguriert deren Eigenschaften.
   */
  loadSounds() {
    this.walking_sound = new Audio('./audio/robotwalk3.mp3');
    this.jump_sound = new Audio('./audio/roboJump.mp3');
    this.death_sound = new Audio('./audio/deathrobot.mp3')

    this.walking_sound.volume = 0.4;
    this.walking_sound.loop = true;

    this.jump_sound.volume = 0.1;
  }

  /**
   * Schaltet die Sounds der Spielfigur stumm oder aktiviert sie.
   * @param {boolean} isMuted - Gibt an, ob die Sounds stummgeschaltet werden sollen.
   */
  toggleMute(isMuted) {
    this.isMuted = isMuted;
    [this.walking_sound, this.jump_sound].forEach(sound => {
      sound.muted = isMuted;
    });
  }

  /**
   * Startet die Animation der Spielfigur.
   */
  startAnimation() {
    this.animate();
  }

  /**
   * Spielt einen Sound ab, falls dieser nicht bereits läuft.
   * @param {Audio} sound - Der Sound, der abgespielt werden soll.
   */
  playSound(sound) {
    if (!this.world || !this.world.isGameRunning || this.isMuted) return;
    if (sound.paused) {
      sound.play().catch();
    }
  }

  /**
   * Stoppt einen bestimmten Sound.
   * @param {Audio} sound - Der Sound, der gestoppt werden soll.
   */
  stopSound(sound) {
    if (!sound.paused) {
      sound.pause();
      sound.currentTime = 0; // Setzt den Sound auf den Anfang zurück.
    }
  }

  /**
   * Stoppt alle Sounds der Spielfigur.
   */
  stopAllCharacterSounds() {
    this.stopSound(this.walking_sound);
    this.stopSound(this.jump_sound);
    this.stopSound(this.death_sound);
  }

  /**
   * Hauptfunktion für die Animation der Spielfigur.
   * Steuert Bewegung, Sprung, Sound und Kamera-Position.
   */
  animate() {
    setInterval(() => {
      if (!this.world || !this.world.level || !this.world.isGameRunning) return;
      const isJumping = this.world.keyboard.UP && !this.isAboveGround();
      const isMovingRight = this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
      const isMovingLeft = this.world.keyboard.LEFT && this.x > 0;
      if (isJumping) {
        this.handleJump();
        return;
      }
      if (this.isAboveGround()) {
        this.handleAirborne();
        return;
      }
      this.handleMovement(isMovingRight, isMovingLeft);
      this.updateCameraPosition();
    }, 1000 / 100);
    this.startAnimationLoop();
  }

  /**
   * Behandelt den Sprung der Spielfigur.
   */
  handleJump() {
    this.playSound(this.jump_sound);
    this.stopSound(this.walking_sound);
    this.jump();
  }

  /**
   * Behandelt den Zustand, wenn die Spielfigur in der Luft ist.
   */
  handleAirborne() {
    this.stopSound(this.walking_sound);
  }

  /**
   * Behandelt die seitliche Bewegung der Spielfigur.
   * @param {boolean} isMovingRight - Gibt an, ob die Spielfigur nach rechts bewegt wird.
   * @param {boolean} isMovingLeft - Gibt an, ob die Spielfigur nach links bewegt wird.
   */
  handleMovement(isMovingRight, isMovingLeft) {
    if (isMovingRight) {
      this.moveRight();
      this.otherDirection = false;
      this.playSound(this.walking_sound);
    } else if (isMovingLeft) {
      this.moveLeft();
      this.otherDirection = true;
      this.playSound(this.walking_sound);
    } else {
      this.stopSound(this.walking_sound);
    }
  }

  /**
   * Aktualisiert die Kamera-Position basierend auf der Position der Spielfigur.
   */
  updateCameraPosition() {
    if (this.x < 2300) {
      this.world.camera_x = -this.x + 100;
    } else if (this.x >= 2300 && this.x < this.world.level.level_end_x - this.world.canvas.width + 100) {
      this.world.camera_x = -(2300 - 100);
    }
  }

  /**
   * Startet die Animationsschleife für die Spielfigur.
   */
  startAnimationLoop() {
    setInterval(() => {
      if (!this.world || !this.world.isGameRunning) return;
      if (this.isDead()) {
        this.handleDeathAnimation();
        return;
      }
      if (this.isHurt()) {
        this.handleHurtAnimation();
      } else if (this.isAboveGround()) {
        this.handleJumpingAnimation();
      } else if (this.isAttacking) {
        this.handleAttackingAnimation();
      } else {
        this.handleMovementAnimation();
      }
    }, 90);
  }

  /**
   * Behandelt die Todesanimation der Spielfigur.
   */
  handleDeathAnimation() {
    this.playDeathAnimation();
  }

  /**
   * Behandelt die Verletzungsanimation der Spielfigur.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Behandelt die Sprunganimation der Spielfigur.
   */
  handleJumpingAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.height = 90;
    this.width = 90;
  }

  /**
   * Behandelt die Angriffsanimation der Spielfigur.
   */
  handleAttackingAnimation() {
    this.height = 130;
    this.width = 170;
  }

  /**
   * Behandelt die Bewegungsanimation der Spielfigur.
   */
  handleMovementAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.height = 110;
      this.width = 110;
    } else {
      this.playAnimation(this.IMAGES_STANDING);
      this.height = 110;
      this.width = 110;
    }
  }

  /**
   * Spielt die Todesanimation der Spielfigur ab.
   * @param {function} callback - Callback-Funktion, die nach Abschluss der Animation aufgerufen wird.
   */
  playDeathAnimation(callback) {
    if (this.isAnimationPlaying) return;
    this.isAnimationPlaying = true;

    this.playDeathSound();
    this.runDeathAnimation(callback);
  }

  /**
   * Spielt den Todes-Sound ab.
   */
  playDeathSound() {
    if (this.death_sound) {
      this.death_sound.play().catch(() => {
        // Fehler werden ignoriert (z.B. Autoplay-Blocker)
      });
    }
  }

  /**
   * Führt die Todesanimationssequenz aus.
   * @param {function} callback - Callback-Funktion, die nach Abschluss der Animation aufgerufen wird.
   */
  runDeathAnimation(callback) {
    const deathImages = this.IMAGES_DEAD;
    let currentFrame = 0;

    this.height = 130;
    this.width = 130;

    const animationInterval = setInterval(() => {
      this.img = this.imageCache[deathImages[currentFrame++]];
      if (currentFrame >= deathImages.length) {
        clearInterval(animationInterval);
        this.isAnimationPlaying = false;
        if (callback) callback();
      }
    }, 1000 / 25); // 25 FPS für die Todesanimation
  }
}