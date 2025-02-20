/**
 * Repräsentiert die Spielwelt und verwaltet alle Objekte, Prozesse und Interaktionen im Spiel.
 * Diese Klasse ist das zentrale Steuerungselement für das Spielgeschehen.
 *
 * @class World
 */
class World {
  /** @type {boolean} Gibt an, ob das Spiel läuft. */
  isGameRunning = true;

  /** @type {Character} Der Spielercharakter. */
  character = new Character();

  /** @type {Endboss} Der Endboss des Spiels. */
  endboss = new Endboss();

  /** @type {Array} Eine Liste aller Gegner im aktuellen Level. */
  enemies = [];

  /** @type {Array} Eine Liste aller geworfenen Objekte (z. B. Bomben). */
  throwableObjects = [];

 /** @type {HTMLCanvasElement} Das Canvas-Element, auf dem das Spiel gerendert wird. */
  canvas;

  /** @type {CanvasRenderingContext2D} Der 2D-Rendering-Kontext des Canvas. */
  ctx;

  /** @type {Object} Das Tastatur-Objekt, das die Tastatureingaben verwaltet. */
  keyboard;

  /** @type {number} Die Kamera-Position auf der X-Achse. */
  camera_x = 0;

  /** @type {Statusbar} Die Statusleiste für die Lebensenergie des Charakters. */
  statusBar = new Statusbar();

  /** @type {CollectibleBar} Die Sammelleiste für Bomben. */
  collectibleBar = new CollectibleBar();

  /** @type {CollectibleBar2} Die Sammelleiste für Kristalle. */
  crystalBar = new CollectibleBarCrystal();

  /** @type {number} Die Anzahl der Bomben, die der Charakter besitzt. */
  characterBombs = 5;

  /** @type {number} Die maximale Anzahl an Bomben, die der Charakter tragen kann. */
  maxBombs = 10;

  /** @type {number} Die Anzahl der Kristalle, die der Charakter gesammelt hat. */
  characterCrystals = 0;

  /** @type {number} Die maximale Anzahl an Kristallen, die der Charakter sammeln kann. */
  maxCrystals = 10;

  /**
   * Erzeugt eine neue Instanz der Spielwelt.
   *
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem das Spiel gerendert wird.
   * @param {Object} keyboard - Das Tastatur-Objekt, das die Tastatureingaben verwaltet.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
   
    this.level = createLevel1();  
    this.enemies = this.level.enemies;

    this.initializeManagers();
    this.initializeUIElements();
    this.initializeAudio();
    this.startGameProcesses();

    window.world = this;
    world = this;
  }

  /**
   * Initialisiert die Manager des Spiels.
   */
  initializeManagers() {
    this.soundManager = new SoundManager();
    this.interfaceRenderer = new InterfaceRender(this, '#Container');
    this.collisionManager = new CollisionManager(this);
    this.throwManager = new ThrowManager(this);
    this.renderingManager = new RenderingManager(this);
  }

  /**
   * Initialisiert die UI-Elemente des Spiels.
   */
  initializeUIElements() {
    this.interfaceRenderer.renderPhoneControlButtons();
    this.interfaceRenderer.renderGameOver();
    this.lastCollectible = new LastCollectible();
    this.interfaceRenderer.renderControllButtons();
    this.crystalBar = new CollectibleBarCrystal();
  }

  /**
   * Initialisiert und konfiguriert die Hintergrundmusik.
   */
  initializeAudio() {
    this.backgroundMusic = new Audio('audio/gamebackground.mp3');
    Object.assign(this.backgroundMusic, { volume: 0.07, loop: true });
    this.backgroundMusic.addEventListener('error', e => {});
    if (!this.soundManager.isMuted) {
      this.backgroundMusic.play().catch(err => {});
    }
    this.soundManager.registerSound(this.backgroundMusic);
  }

  /**
   * Startet alle notwendigen Prozesse für das Spiel.
   */
  startGameProcesses() {
    this.setWorld();
    this.startAllAnimations();
    this.run();
    this.renderingManager.renderFrame();
    this.animateCrystals();
  }

  /**
   * Setzt die Welt für alle Objekte, die auf die Spielwelt zugreifen müssen.
   */
  setWorld() {
    this.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.character.world = this;
  }

  /**
   * Startet alle Spielprozesse und Intervalle.
   */
  run() {
    if (!this.intervals) {
      this.intervals = [];
      this.setupCollisionChecks();
      this.setupVisibilityChecks();
      this.setupEndbossBehavior();
      this.setupThrowChecks();
      this.setupStatusUpdates();
    }
  }

  stopGameProcesses() {
    for (const id of this.intervals) clearInterval(id);
    this.intervals = [];
    
    if (this.renderRequestId) {
      cancelAnimationFrame(this.renderRequestId);
      this.renderRequestId = null;
    }

     
     if (this.interfaceRenderer?.winMusic) {
      this.interfaceRenderer.winMusic.pause();
      this.interfaceRenderer.winMusic.currentTime = 0; 
    }
    
    this.pauseGame();
    document.querySelectorAll('.gameOver, .youWin, .alertBomb').forEach(el => el.remove());
    const cont = document.querySelector('#Container');
    
    if (cont) cont.innerHTML = '';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  restartGameInstance() {
    window.world = new World(this.canvas, this.keyboard);
    world = window.world;
  }

  restartGame() {
    this.stopGameProcesses();
    this.restartGameInstance();
  }

  /**
   * Initialisiert die Kollisionsabfragen.
   */
  setupCollisionChecks() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.collisionManager.checkCollision();
    }, 600));

    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.collisionManager.checkEndbossCollision();
    }, 600));

    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.collisionManager.checkEndbossCollisionBomb();
    }, 100));

    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.collisionManager.checkCollectibleCollision();
    }, 100));
  }

  /**
   * Initialisiert die Sichtbarkeitsprüfung für das letzte Sammelobjekt.
   */
  setupVisibilityChecks() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.lastCollectible.checkVisibility(this.character);
    }, 100));
  }

  /**
   * Initialisiert das Verhalten des Endbosses.
   */
  setupEndbossBehavior() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.endboss.followCharacter(this.character);
    }, 100));
  }

  /**
   * Initialisiert die Überprüfung von Wurfobjekten.
   */
  setupThrowChecks() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.throwManager.checkThrowObjects();
    }, 50));
  }

  /**
   * Initialisiert die Updates für Status- und Sammelleisten.
   */
  setupStatusUpdates() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.updateStatusBar();
      this.updateCollectibleBar();
      this.updateCrystalBar();
    }, 100));
  }

  /**
   * Startet alle Animationen für Charakter, Gegner und Endboss.
   */
  startAllAnimations() {
    this.character.startAnimation();
    this.enemies.forEach(enemy => {
      if (enemy.startAnimation) {
        enemy.startAnimation();
      }
    });
    this.endboss.startAnimation();
  }

  /**
   * Schaltet den Mute-Zustand des Spiels um.
   */
  toggleMute() {
    this.soundManager.toggleMute();
  }

  /**
   * Pausiert das Spiel und stoppt alle Sounds und Animationen.
   */
  pauseGame() {
    this.isGameRunning = false;
    this.renderingManager.stopAllSounds();
    this.backgroundMusic.pause();

    if (this.endboss && typeof this.endboss.stopAnimation === 'function') {
      this.endboss.stopAnimation();
    }

    if (this.character && typeof this.character.stopAllCharacterSounds === 'function') {
      this.character.stopAllCharacterSounds();
    }

    resetKeyboard();
  }

  /**
   * Setzt das Spiel fort und startet alle Sounds und Animationen.
   */
  resumeGame() {
    this.isGameRunning = true;
    this.renderingManager.resumeAllSounds();
    this.backgroundMusic.play().catch(err => {});

    if (this.endboss && typeof this.endboss.startAnimation === 'function') {
      this.endboss.startAnimation();
    }

    this.renderingManager.renderFrame();
  }

  /**
   * Stoppt das Spiel und zeigt den Game-Over-Bildschirm an.
   */
  stopGame() {
    this.isGameRunning = false;
    this.interfaceRenderer.showGameOver();
    this.interfaceRenderer.hideAlertsBomb();
    this.endboss.stopAllActions();
  }

  /**
   * Zeigt den Gewinnbildschirm an.
   */
  showWinScreen() {
    this.isGameRunning = false;
    this.interfaceRenderer.renderYouWin();
    this.interfaceRenderer.hideAlertsBomb();
  }

  /**
   * Aktualisiert die Statusleiste basierend auf der Lebensenergie des Charakters.
   */
  updateStatusBar() {
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Aktualisiert die Sammelleiste für Bomben.
   */
  updateCollectibleBar() {
    this.collectibleBar.setBombs(this.characterBombs);
  }

  /**
   * Aktualisiert die Sammelleiste für Kristalle.
   */
  updateCrystalBar() {
    this.crystalBar.setCrystals(this.characterCrystals);
  }

  /**
   * Animiert die Kristalle im Level.
   */
  animateCrystals() {
    const crystalInterval = setInterval(() => {
      this.level.collectible2.forEach(crystal => {
        crystal.y += Math.sin(Date.now() / 200) * 1;
      });
    }, 70);
    this.intervals.push(crystalInterval);
  }
  

  /**
   * Schaltet die Bombenwarnung ein oder aus.
   */
  toggleAlertBomb() {
    if (!this.interfaceRenderer) return;
    const alertBomb = document.querySelector('.alertBomb');
    if (this.characterBombs === 0 && this.isGameRunning) {
      if (alertBomb) {
        alertBomb.style.display = 'flex';
      } else {
        this.interfaceRenderer.renderAlertBomb();
      }
    } else {
      if (alertBomb) {
        alertBomb.style.display = 'none';
      }
    }
  }

  /**
   * Entfernt einen Gegner aus der Spielwelt.
   *
   * @param {Object} enemy - Der zu entfernende Gegner.
   */
  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.isRemoved = true;
  }

  /**
   * Entfernt eine Bombe aus der Spielwelt.
   *
   * @param {Object} bomb - Die zu entfernende Bombe.
   */
  removeBomb(bomb) {
    this.throwableObjects = this.throwableObjects.filter((obj) => obj !== bomb);
  }
}