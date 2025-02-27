/**
 * Represents the game world and manages all objects, processes, and interactions in the game.
 * This class is the central control element for the game's events.
 *
 * @class World
 */
class World {
 
  isGameRunning = true;
  character = new Character();
  endboss = new Endboss();
  enemies = [];
  throwableObjects = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  collectibleBar = new CollectibleBar();
  crystalBar = new CollectibleBarCrystal();
  characterBombs = 5;
  maxBombs = 10;
  characterCrystals = 0;
  maxCrystals = 10;

  /**
   * Creates a new instance of the game world.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element on which the game is rendered.
   * @param {Object} keyboard - The keyboard object that manages keyboard inputs.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;

    // Create level and assign enemies
    this.level = createLevel1();
    this.enemies = this.level.enemies;

    this.initializeManagers();
    this.initializeUIElements();

    // Synchronize the UI with the initial mute state
    // (updateSoundButtonIcon ensures the button icon matches the SoundManager state)
    this.interfaceRenderer.updateSoundButtonIcon();

    this.startGameProcesses();

    window.world = this;
    world = this;
  }

  /**
   * Initializes the game's managers.
   */
  initializeManagers() {
    this.soundManager = new SoundManager(this); // Initialize SoundManager with World reference
    this.interfaceRenderer = new InterfaceRender(this, '#Container');
    this.collisionManager = new CollisionManager(this);
    this.throwManager = new ThrowManager(this);
    this.renderingManager = new RenderingManager(this);
  }

  /**
   * Initializes the game's UI elements.
   */
  initializeUIElements() {
    this.interfaceRenderer.renderPhoneControlButtons();
    this.interfaceRenderer.renderGameOver();
    this.lastCollectible = new LastCollectible();
    this.interfaceRenderer.renderControllButtons();
    this.crystalBar = new CollectibleBarCrystal();
  }

  /**
   * Starts all necessary processes for the game.
   */
  startGameProcesses() {
    this.setWorld();
    this.startAllAnimations();
    this.run();
    this.renderingManager.renderFrame();
    this.animateCrystals();
  }

  /**
   * Sets the world for all objects that need to access the game world.
   */
  setWorld() {
    this.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.character.world = this;
  }

  /**
   * Starts all game processes and intervals.
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

  /**
   * Stops all game processes and intervals.
   */
  stopGameProcesses() {
    for (const id of this.intervals) clearInterval(id);
    this.intervals = [];

    if (this.renderRequestId) {
      cancelAnimationFrame(this.renderRequestId);
      this.renderRequestId = null;
    }

    this.interfaceRenderer?.winMusic?.pause();
    if (this.interfaceRenderer?.winMusic)
      this.interfaceRenderer.winMusic.currentTime = 0;

    this.pauseGame();
    document.querySelectorAll('.gameOver, .youWin, .alertBomb').forEach(el => el.remove());
    const cont = document.querySelector('#Container');

    if (cont) cont.innerHTML = '';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Starts a new game instance.
   */
  restartGameInstance() {
    const storedMuteStatus = localStorage.getItem('isMuted');
    const isMuted = storedMuteStatus !== null ? JSON.parse(storedMuteStatus) : false;

    window.world = new World(this.canvas, this.keyboard);
    world = window.world;

    // Reapply the saved mute status after restart
    world.isMuted = isMuted;
    world.soundManager.isMuted = isMuted;

    // Ensure all sounds have the correct mute state
    world.soundManager.applyMuteState();
    world.interfaceRenderer.toggleObjectMute(world.character);
    world.interfaceRenderer.toggleGroupMute([...world.enemies, ...world.throwableObjects]);
    world.interfaceRenderer.toggleObjectMute(world.endboss);
    world.interfaceRenderer.toggleObjectMute(world.lastCollectible);

    // Update icon after restart
    world.interfaceRenderer.updateSoundButtonIcon();
  }

  /**
   * Restarts the game.
   */
  restartGame() {
    this.stopGameProcesses();
    this.restartGameInstance();
  }

  /**
   * Initializes collision checks.
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
   * Initializes visibility checks for the last collectible.
   */
  setupVisibilityChecks() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.lastCollectible.checkVisibility(this.character);
    }, 100));
  }

  /**
   * Initializes the end boss's behavior.
   */
  setupEndbossBehavior() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.endboss.followCharacter(this.character);
    }, 100));
  }

  /**
   * Initializes throwable object checks.
   */
  setupThrowChecks() {
    this.intervals.push(setInterval(() => {
      if (!this.isGameRunning) return;
      this.throwManager.checkThrowObjects();
    }, 50));
  }

  /**
   * Initializes updates for status and collectible bars.
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
   * Starts all animations for the character, enemies, and end boss.
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
   * Pauses the game and stops all sounds and animations.
   */
  pauseGame() {
    this.isGameRunning = false;
    this.soundManager.stopAllSounds(); 
    if (this.lastCollectible) {
      this.lastCollectible.stopMusic(); 
    }
    if (this.endboss && typeof this.endboss.stopAnimation === 'function') {
      this.endboss.stopAnimation();
    }
    if (this.character && typeof this.character.stopAllCharacterSounds === 'function') {
      this.character.stopAllCharacterSounds();
    }
    resetKeyboard();
  }

  /**
   * Resumes the game and starts all sounds and animations.
   */
  resumeGame() {
    this.isGameRunning = true;
    this.soundManager.resumeAllSounds(); 
    if (this.endboss && typeof this.endboss.startAnimation === 'function') {
      this.endboss.startAnimation();
    }
    this.renderingManager.renderFrame();
  }

  /**
   * Stops the game and shows the game-over screen.
   */
  stopGame() {
    this.isGameRunning = false;
    this.interfaceRenderer.showGameOver();
    this.interfaceRenderer.hideAlertsBomb();
    this.endboss.stopAllActions();
  }

  /**
   * Shows the win screen.
   */
  showWinScreen() {
    this.isGameRunning = false;
    this.interfaceRenderer.renderYouWin();
    this.interfaceRenderer.hideAlertsBomb();
  }

  /**
   * Updates the status bar based on the character's health.
   */
  updateStatusBar() {
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Updates the collectible bar for bombs.
   */
  updateCollectibleBar() {
    this.collectibleBar.setBombs(this.characterBombs);
  }

  /**
   * Updates the collectible bar for crystals.
   */
  updateCrystalBar() {
    this.crystalBar.setCrystals(this.characterCrystals);
  }

  /**
   * Animates the crystals in the level.
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
   * Toggles the bomb warning on or off.
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
   * Removes an enemy from the game world.
   *
   * @param {Object} enemy - The enemy to remove.
   */
  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    enemy.isRemoved = true;
  }

  /**
   * Removes a bomb from the game world.
   *
   * @param {Object} bomb - The bomb to remove.
   */
  removeBomb(bomb) {
    this.throwableObjects = this.throwableObjects.filter((obj) => obj !== bomb);
  }
}
