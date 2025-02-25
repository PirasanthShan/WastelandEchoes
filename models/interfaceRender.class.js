/**
 * Repräsentiert die Benutzeroberfläche (UI) des Spiels.
 * Diese Klasse ist verantwortlich für das Rendern von Steuerungselementen, das Handhaben von Benutzerinteraktionen
 * und das Anzeigen von Spielzuständen wie Game Over oder You Win.
 *
 * @class InterfaceRender
 */
class InterfaceRender {
    /**
     * Erzeugt eine neue Instanz von InterfaceRender.
     *
     * @param {Object} world - Die Welt, in der das Spiel stattfindet.
     * @param {string} [containerSelector='#Container'] - Der CSS-Selektor für den Container, in dem die UI gerendert wird.
     */
    constructor(world, containerSelector = '#Container') {
      this.world = world;
      this.container = document.querySelector(containerSelector);
      this.isFullscreen = false;
    }
  
    /**
     * Fügt Event-Listener zu allen Steuerungsbuttons hinzu.
     */
    addControlButtonListeners() {
      this.addPlayButtonListener();
      this.addSoundButtonListener();
      this.addFullscreenButtonListener();
      this.addRestartButtonListeners();
      this.addHomeButtonListener();
     }
  
    /**
     * Fügt einen Event-Listener zum Play-Button hinzu.
     * Der Button pausiert oder setzt das Spiel fort und aktualisiert das Button-Icon.
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
     * Fügt einen Event-Listener zum Sound-Button hinzu.
     * Der Button schaltet den Sound aller Objekte im Spiel stumm oder aktiviert ihn.
     */
    addSoundButtonListener() {
      document.getElementById('soundButton').addEventListener('click', () => {
        this.world.toggleMute();

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
     * Schaltet die Hintergrundmusik stumm oder aktiviert sie.
     */
    toggleBackgroundMusic() {
      if (this.world.backgroundMusic) {
        this.world.backgroundMusic.muted = this.world.isMuted;
      }
    }
  
    /**
     * Schaltet den Sound eines bestimmten Objekts stumm oder aktiviert ihn.
     *
     * @param {Object} object - Das Objekt, dessen Sound gesteuert werden soll.
     */
    toggleObjectMute(object) {
      if (object && typeof object.toggleMute === 'function') {
        object.toggleMute(this.world.isMuted);
      }
    }
  
    /**
     * Schaltet den Sound einer Gruppe von Objekten stumm oder aktiviert ihn.
     *
     * @param {Array} group - Die Gruppe von Objekten, deren Sound gesteuert werden soll.
     */
    toggleGroupMute(group) {
      group.forEach(item => this.toggleObjectMute(item));
    }
  
    /**
     * Aktualisiert das Icon des Sound-Buttons basierend auf dem aktuellen Stumm-Schaltzustand.
     */
    updateSoundButtonIcon() {
      document.getElementById('soundButton').src = this.world.isMuted ? './img/soundoff.webp' : './img/soundon.webp';
    }
  
    /**
     * Fügt einen Event-Listener zum Fullscreen-Button hinzu.
     * Der Button schaltet den Vollbildmodus ein oder aus.
     */
    addFullscreenButtonListener() {
      const fullscreenButton = document.getElementById('fullscreenButton');
      fullscreenButton.addEventListener('click', () => {
        this.toggleFullscreen();
      });
  
      this.observeAlertBomb();
    }

        /**
     * Fügt Event-Listener zu allen Restart-Buttons hinzu.
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

    addHomeButtonListener() {
      document.getElementById('homeButton')?.addEventListener('click', () => {
          localStorage.setItem('isMuted', JSON.stringify(false)); // Setze Mute-Status zurück
          window.location.href = 'startPage.html'; // Zur Startseite weiterleiten
      });
   }

  
    /**
     * Schaltet den Vollbildmodus ein oder aus.
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
     * Aktualisiert die Position des Alert-Bomb-Elements im Vollbildmodus.
     */
    updateAlertBomb() {
      const alertBomb = document.querySelector('.alertBomb');
      if (alertBomb) {
        alertBomb.classList.toggle("fullscreen", this.isFullscreen);
      }
    }
  
    /**
     * Beobachtet Änderungen im DOM, um das Alert-Bomb-Element zu aktualisieren.
     */
    observeAlertBomb() {
      new MutationObserver(() => {
        this.updateAlertBomb();
      }).observe(document.body, { childList: true, subtree: true });
    }
  
    /**
     * Entfernt das Alert-Bomb-Element aus dem DOM.
     */
    hideAlertsBomb() {
      const alertBomb = document.querySelector('.alertBomb');
      if (alertBomb) alertBomb.remove();
    }
  
    /**
     * Initialisiert die Gewinnmusik.
     */
    setupWinMusic() {
      this.winMusic = new Audio('./audio/YouWin.mp3');
      this.winMusic.volume = 0.2;
      this.winMusic.loop = false;
    }
  
    /**
     * Spielt die Gewinnmusik ab.
     */
    playWinMusic() {
      if (this.winMusic) {
        this.winMusic.play().catch(() => {});
      }
    }
  
    /**
     * Stoppt die Gewinnmusik.
     */
    stopWinMusic() {
      if (this.winMusic) {
        this.winMusic.pause();
        this.winMusic.currentTime = 0;
      }
    }
  
    /**
     * Zeigt den Game-Over-Bildschirm an.
     */
    showGameOver() {
      if (this.world.backgroundMusic) {
        this.world.backgroundMusic.pause();
      }
      const gameOver = this.container.querySelector('.gameOver');
      if (gameOver) gameOver.style.display = 'flex';
    }
  
    /**
     * Rendert die Steuerungsbuttons im Spiel.
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
    }
  
    /**
     * Rendert den You-Win-Bildschirm.
     */
    renderYouWin() {
      this.world.soundManager.applyMuteState();
      if (this.world.character && typeof this.world.character.toggleMute === 'function') {
        this.world.character.toggleMute(true);
      }
  
      this.setupWinMusic();
      this.container.innerHTML += `
        <div class="youWin">
          <h3>Congratulations, You Win!</h3>
          <div style="display: flex; gap: 20px;">
            <button onclick="window.location.href='startPage.html'">Home</button>
            <button id="restartButtonWin">Restart</button>
          </div>
        </div>
      `;
      this.playWinMusic();

       setTimeout(() => { // Verzögerung, um sicherzustellen, dass das Element existiert
        document.getElementById('restartButtonWin')?.addEventListener('click', () => {
        if (window.world) window.world.restartGame();
        });
    }, 100);
    }
  
    /**
     * Rendert den Game-Over-Bildschirm.
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
     * Rendert eine Warnmeldung für Bomben oder Kristalle.
     *
     * @param {string} [type='bomb'] - Der Typ der Warnmeldung ('bomb' oder 'crystals').
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
     * Rendert die Steuerungsbuttons für Mobilgeräte.
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
     * Fügt Event-Listener zu den Mobilgeräte-Steuerungsbuttons hinzu.
     */
    addPhoneControlButtonListeners() {
      this.preventContextMenuOnImages();
      this.addMovementButtonListeners();
      this.addActionButtonListeners();
    }
  
    /**
     * Verhindert das Kontextmenü auf den Steuerungsbuttons.
     */
    preventContextMenuOnImages() {
      document.querySelectorAll('.phoneControllBtn img').forEach(img => {
        img.addEventListener('contextmenu', (event) => event.preventDefault());
      });
    }
  
    /**
     * Fügt Event-Listener zu den Bewegungsbuttons hinzu.
     */
    addMovementButtonListeners() {
      this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/leftarrow.webp"]', 'LEFT');
      this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/rightarrow.webp"]', 'RIGHT');
      this.addButtonListener('.phoneControllBtn .ctrimg[src="./img/jumparrow.webp.png"]', 'UP');
    }
  
    /**
     * Fügt Event-Listener zu den Aktionsbuttons hinzu.
     */
    addActionButtonListeners() {
      this.addButtonListener('.phoneControllBtn .bombimg[src="./img/bomb2.webp"]', 'SPACE');
    }
  
    /**
     * Fügt einen Event-Listener zu einem Button hinzu.
     *
     * @param {string} selector - Der CSS-Selektor für den Button.
     * @param {string} key - Die Taste, die simuliert werden soll.
     */
    addButtonListener(selector, key) {
      const button = document.querySelector(selector);
      if (!button) return; // Falls der Button nicht existiert, abbrechen
      const setKeyState = (state) => {
          e.preventDefault();
          this.world.keyboard[key] = state;
      };
      // Touch-Events mit `passive: true` für bessere Performance
      button.addEventListener('touchstart', (e) => setKeyState(true), { passive: true });
      button.addEventListener('touchend', (e) => setKeyState(false), { passive: true });
      // Kontextmenü (Rechtsklick auf Touch-Geräten) verhindern
      button.addEventListener('contextmenu', (e) => e.preventDefault(), { passive: true });
   }
  
  
  }