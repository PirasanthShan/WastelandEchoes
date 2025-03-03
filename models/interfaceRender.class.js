/**
 * Represents the user interface (UI) of the game.
 * This class is responsible for rendering controls, handling user interactions,
 * and displaying game states such as Game Over or You Win.
 *
 * @class InterfaceRender
 */
class InterfaceRender {
  /**
   * Creates an instance of InterfaceRender.
   *
   * @param {Object} world - The world in which the game takes place.
   * @param {string} [containerSelector='#Container'] - The CSS selector for the container where the UI is rendered.
   */
  constructor(world, containerSelector = '#Container') {
    this.world = world;
    this.container = document.querySelector(containerSelector);
    this.isFullscreen = false;
  }

  /**
   * Adds event listeners to all control buttons.
   */
  addControlButtonListeners() {
    this.addPlayButtonListener();
    this.addSoundButtonListener();
    this.addFullscreenButtonListener();
    this.addRestartButtonListeners();
    this.addHomeButtonListener();
  }

  /**
   * Adds an event listener to the play button.
   * The button pauses or resumes the game and updates the button icon.
   */
  addPlayButtonListener() {
    document.getElementById('playButton').addEventListener('click', () => {
      const playButton = document.getElementById('playButton');
      this.world.isGameRunning = !this.world.isGameRunning;
      playButton.src = this.world.isGameRunning ? './img/playpause.webp' : './img/play.webp';
      this.world.isGameRunning ? this.world.resumeGame() : this.world.pauseGame();
    });
  }

  /**
   * Adds an event listener to the sound button.
   * The button mutes or unmutes the sound of all objects in the game.
   */
  addSoundButtonListener() {
    document.getElementById('soundButton').addEventListener('click', () => {
      this.world.soundManager.toggleMute();
      this.toggleBackgroundMusic();
      this.toggleObjectMute(this.world.character);
      this.toggleGroupMute(this.world.enemies);
      this.toggleGroupMute(this.world.throwableObjects);
      this.toggleObjectMute(this.world.endboss);
      this.toggleObjectMute(this.world.lastCollectible);
      this.updateSoundButtonIcon();
    });
  }

  /**
   * Toggles the background music on or off.
   */
  toggleBackgroundMusic() {
    if (this.world.backgroundMusic) {
      this.world.backgroundMusic.muted = this.world.soundManager.isMuted; 
    }
  }

  /**
   * Toggles the sound of a specific object on or off.
   *
   * @param {Object} object - The object whose sound should be toggled.
   */
  toggleObjectMute(object) {
    if (object && typeof object.toggleMute === 'function') {
      object.toggleMute(this.world.soundManager.isMuted); 
    }
  }

  /**
   * Toggles the sound of a group of objects on or off.
   *
   * @param {Array} group - The group of objects whose sound should be toggled.
   */
  toggleGroupMute(group) {
    group.forEach(item => this.toggleObjectMute(item));
  }

  /**
   * Updates the sound button icon based on the current mute state.
   */
  updateSoundButtonIcon() {
    const isMuted = this.world.soundManager.isMuted; 
    document.getElementById('soundButton').src = isMuted ? './img/soundoff.webp' : './img/soundon.webp';
  }

  /**
   * Adds an event listener to the fullscreen button.
   * The button toggles fullscreen mode on or off.
   */
  addFullscreenButtonListener() {
    const fullscreenButton = document.getElementById('fullscreenButton');
    fullscreenButton.addEventListener('click', () => {
      this.toggleFullscreen();
    });
   this.observeAlertBomb();
  }

  /**
   * Adds event listeners to all restart buttons.
   */
  addRestartButtonListeners() {
    document.getElementById('restartButton')?.addEventListener('click', () => {
      if (window.world) window.world.restartGame();
    });
    document.getElementById('restartButtonWin')?.addEventListener('click', () => {
      if (window.world) window.world.restartGame();
    });
    document.getElementById('restartButtonGameOver')?.addEventListener('click', () => {
      if (window.world) window.world.restartGame();
    });
  }

  /**
   * Adds an event listener to the home button.
   */
  addHomeButtonListener() {
    document.getElementById('homeButton')?.addEventListener('click', () => {
    window.location.href = 'startPage.html'; 
    });
  }
  
  /**
   * Toggles fullscreen mode on or off.
   */
  toggleFullscreen() {
    const canvas = document.querySelector('canvas');
    const controllBtn = document.querySelector('.controllBtn');
    this.isFullscreen = !this.isFullscreen;
    canvas.classList.toggle("fullscreen", this.isFullscreen);
    controllBtn.classList.toggle("fullscreen", this.isFullscreen);
    document.getElementById('fullscreenButton').src = this.isFullscreen ? './img/smallscreen.webp' : './img/fullscreen.webp';
    this.updateAlertBomb();
  }

  /**
   * Updates the position of the alert bomb element in fullscreen mode.
   */
  updateAlertBomb() {
    const alertBomb = document.querySelector('.alertBomb');
    if (alertBomb) {
      alertBomb.classList.toggle("fullscreen", this.isFullscreen);
    }
  }

  /**
   * Observes changes in the DOM to update the alert bomb element.
   */
  observeAlertBomb() {
    new MutationObserver(() => {
      this.updateAlertBomb();
    }).observe(document.body, { childList: true, subtree: true });
  }

  /**
   * Removes the alert bomb element from the DOM.
   */
  hideAlertsBomb() {
    const alertBomb = document.querySelector('.alertBomb');
    if (alertBomb) alertBomb.remove();
  }

  /**
   * Initializes the win music.
   */
  setupWinMusic() {
    this.winMusic = new Audio('./audio/YouWin.mp3');
    this.winMusic.volume = 0.2;
    this.winMusic.loop = false;
  }

  /**
   * Plays the win music.
   */
  playWinMusic() {
    if (this.winMusic) {
      this.winMusic.play().catch(() => {});
    }
  }

  /**
   * Stops the win music.
   */
  stopWinMusic() {
    if (this.winMusic) {
      this.winMusic.pause();
      this.winMusic.currentTime = 0;
    }
  }

  /**
   * Displays the game over screen.
   */
  showGameOver() {
    if (this.world.backgroundMusic) {
      this.world.backgroundMusic.pause();
    }
    const gameOver = this.container.querySelector('.gameOver');
    if (gameOver) gameOver.style.display = 'flex';
  }

  /**
   * Renders the control buttons in the game.
   */
  renderControllButtons() {
    this.container.innerHTML += `
      <div class="controllBtn">
        <img id="homeButton" src="./img/home.webp" alt="Home Button" onclick="window.location.href='startPage.html'">
        <img id="playButton" src="./img/playpause.webp" alt="Play Button">
        <img id="soundButton" src="./img/soundon.webp" alt="Sound Button">
        <img id="fullscreenButton" src="./img/fullscreen.webp" alt="Fullscreen Button">
        <img id="restartButton" src="./img/restart.webp" alt="Restart Button">
      </div>
    `;
    this.addControlButtonListeners();
    this.updateSoundButtonIcon();
  }

  /**
   * Renders the You Win screen.
   */
  renderYouWin() {
    this.handleMuteState();
    this.handleWinMusic();

    this.container.innerHTML += `
      <div class="youWin">
        <h3>Congratulations, You Win!</h3>
        <div style="display: flex; gap: 20px;">
          <button onclick="window.location.href='startPage.html'">Home</button>
          <button id="restartButtonWin">Restart</button>
        </div>
      </div>
    `;

    setTimeout(() => { 
        document.getElementById('restartButtonWin')?.addEventListener('click', () => {
            if (window.world) window.world.restartGame();
        });
    }, 100);
  }

  /**
  * Handles muting of all sounds related to the character and endboss.
  */
  handleMuteState() {
    this.world.soundManager.applyMuteState();
     if (this.world.character?.toggleMute) {
        this.world.character.toggleMute(true);
       }
     if (this.world.endboss?.toggleMute) {
        this.world.endboss.toggleMute(true);
        this.world.endboss.stopAllSounds?.();
    }
  }

  /**
  * Manages the background music when the player wins.
  */
  handleWinMusic() {
    if (!window.world.soundManager.isMuted) {
        this.setupWinMusic();
        this.playWinMusic();
    } else {
        if (this.winMusic) {
            this.winMusic.pause();
            this.winMusic.currentTime = 0;
        }
    }
  }

 /**
   * Renders the Game Over screen.
   */
  renderGameOver() {
    if (this.container.querySelector('.gameOver')) return;
    this.container.innerHTML += `
      <div class="gameOver" style="display: none;">
        <img class="gameOverImg" src="./img/gameover.gif" alt="GameOver.gif">
        <h2>Try Again!</h2>
        <div class="gameOverBtn"> 
          <button onclick="window.location.href='startPage.html'">Home</button>
          <button id="restartButtonGameOver">Restart</button>
        </div>
      </div>
    `;
  }

   /**
   * @param {string} [type='bomb'] - The type of warning message ('bomb' or 'crystals').
   */
  renderAlertBomb(type = 'bomb') {
    let alertDiv = this.container.querySelector('.alertBomb');
    if (!alertDiv) {
      alertDiv = document.createElement('div');
      alertDiv.classList.add('alertBomb');
      this.container.appendChild(alertDiv);
    }
    if (type === 'crystals') {
      alertDiv.innerHTML = `
        Collect all Echoes to proceed to the spaceship!
        <img src="./img/—Pngtree—red border on yellow triangle_5489517 (1).webp" alt="Warning">
      `;
    } else {
      alertDiv.innerHTML = `
        No bombs left!<br>
        Collect to continue or Restart!
        <img src="./img/—Pngtree—red border on yellow triangle_5489517 (1).webp" alt="Warning">
      `;
    }
  }

  /**
   * Renders the control buttons for mobile devices.
   */
  renderPhoneControlButtons() {
    this.container.innerHTML += `
      <div class="phoneControllBtn" oncontextmenu="return false;">
        <div>
          <img class="ctrimg" src="./img/leftarrow.webp" alt="Left Arrow">
          <img class="ctrimg" src="./img/rightarrow.webp" alt="Right Arrow">
        </div>
        <div>
          <img class="ctrimg" src="./img/jumparrow.webp.png" alt="Jump Arrow">
          <img class="bombimg" src="./img/bomb2.webp" alt="Bomb Button">
        </div>
      </div>
    `;

    this.addPhoneControlButtonListeners();
  }

  /**
   * Adds event listeners to the mobile control buttons.
   */
  addPhoneControlButtonListeners() {
    this.preventContextMenuOnImages();
    this.addMovementButtonListeners();
    this.addActionButtonListeners();
  }

  /**
   * Prevents the context menu on control buttons.
   */
  preventContextMenuOnImages() {
    document.querySelectorAll('.phoneControllBtn img').forEach(img => {
      img.addEventListener('contextmenu', (event) => event.preventDefault());
    });
  }

  /**
   * Adds event listeners to the movement buttons.
   */
  addMovementButtonListeners() {
    this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/leftarrow.webp"]', 'LEFT');
    this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/rightarrow.webp"]', 'RIGHT');
    this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/jumparrow.webp.png"]', 'UP');
  }

  /**
   * Adds event listeners to the action buttons.
   */
  addActionButtonListeners() {
    this.addButtonListener('.phoneControllBtn .bombimg[src="./img/bomb2.webp"]', 'SPACE');
  }

   /**
   * @param {string} selector - The CSS selector for the button.
   * @param {string} key - The key to simulate.
   */
  addButtonListener(selector, key) {
    const button = document.querySelector(selector);
    if (!button) return; 
    const setKeyState = (state) => {
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.world.keyboard[key] = state;}, 
        { passive: true });
      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.world.keyboard[key] = state;
      }, { passive: true });
    };
   setKeyState(true); 
   setKeyState(false); 
   button.addEventListener('contextmenu', (e) => e.preventDefault(), { passive: true });}
}