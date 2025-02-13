document.addEventListener('DOMContentLoaded', () => {
  // Element-Referenzen
  const startGameButton = document.querySelector('#startGame');
  const controlsButton = document.querySelector('#controls');
  const storyButton = document.querySelector('#Story');
  const missionInfoButton = document.querySelector('#missionInfo');
  const containerStartPage = document.querySelector('.containerStartPage');
  const startPage = document.querySelector('#startPage');
  const backgroundMusic = document.querySelector('#backgroundMusic');
  const musicButton = document.querySelector('#toggleMusic');

  // ─────────────────────────────
  // Musikfunktionen
  // ─────────────────────────────

  /**
   * Spielt die Hintergrundmusik ab.
   */
  function playBackgroundMusic() {
    if (backgroundMusic) {
      backgroundMusic.volume = 0.5;
      backgroundMusic.play().catch(() => {
        // Fehler werden ignoriert (z. B. wegen Autoplay-Blockern)
      });
    }
  }

  /**
   * Schaltet die Hintergrundmusik um und passt den Button-Text an.
   */
  function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicButton.innerText = 'Musik stoppen 🔇';
    } else {
      backgroundMusic.pause();
      musicButton.innerText = 'Musik starten 🎵';
    }
  }

  /**
   * Initialisiert die Musik: startet sie und richtet den Musik-Button ein.
   */
  function initMusic() {
    playBackgroundMusic();
    if (musicButton) {
      musicButton.addEventListener('click', toggleBackgroundMusic);
    }
  }

  // ─────────────────────────────
  // Startspiel-Funktionalitäten
  // ─────────────────────────────

  /**
   * Behandelt den Start des Spiels:
   * - Blendet die Startseite aus (Fade-Out)
   * - Pausiert die Hintergrundmusik
   * - Leitet nach kurzer Verzögerung zu "game.html" weiter.
   */
  function handleStartGame() {
    startPage.classList.add('fade-out');
    backgroundMusic.pause();
    setTimeout(() => {
      window.location.href = 'game.html';
    }, 1000);
  }

  function initStartGameButton() {
    if (startGameButton) {
      startGameButton.addEventListener('click', handleStartGame);
    }
  }

  // ─────────────────────────────
  // Container-Funktionen (zum Anzeigen und Verstecken von Inhalten)
  // ─────────────────────────────

  /**
   * Zeigt den Container an und fügt den übergebenen HTML-Inhalt ein.
   * Gleichzeitig wird die Startseite ausgeblendet.
   * @param {string} content - HTML-Inhalt, der im Container angezeigt werden soll.
   */
  function showContainer(content) {
    containerStartPage.innerHTML = content;
    startPage.style.display = 'none';
    containerStartPage.classList.remove('hide-container');
    containerStartPage.classList.add('show-container');
  }

  /**
   * Blendet den Container aus und zeigt anschließend wieder die Startseite an.
   */
  function hideContainer() {
    containerStartPage.classList.remove('show-container');
    containerStartPage.classList.add('hide-container');
    setTimeout(() => {
      startPage.style.display = 'block';
    }, 500);
  }

  /**
   * Fügt einen globalen Event-Listener hinzu, der auf Klicks auf ein Element mit der ID "back" reagiert.
   */
  function initBackButtonListener() {
    document.addEventListener('click', (event) => {
      if (event.target.id === 'back') {
        hideContainer();
      }
    });
  }

  // ─────────────────────────────
  // Inhaltliche Buttons (Controls, Story, Mission Info)
  // ─────────────────────────────

  /**
   * Richtet den "Controls"-Button ein.
   */
  function initControlsButton() {
    if (controlsButton) {
      controlsButton.addEventListener('click', () => {
        showContainer(`
          <button id="back">Back</button>
          <div class="controls">
            <h5>Game Controls:</h5>
            <div class="control-item"><span>Move Right:</span> <span class="key">→</span></div>
            <div class="control-item"><span>Move Left:</span> <span class="key">←</span></div>
            <div class="control-item"><span>Jump:</span> <span class="key">↑</span></div>
            <div class="control-item"><span>Attack:</span> <span class="key">Space</span></div>
          </div>
        `);
      });
    }
  }

  /**
   * Richtet den "Story"-Button ein und startet den Typewriter-Effekt.
   */
  function initStoryButton() {
    if (storyButton) {
      storyButton.addEventListener('click', () => {
        showContainer(`
          <button id="back">Back</button>
          <div class="story">
            <h4>WASTELAND ECHOES</h4>
            <p id="story-text"></p>
          </div>
        `);
        startTypewriterEffect();
      });
    }
  }

  /**
   * Richtet den "Mission Info"-Button ein.
   */
  function initMissionInfoButton() {
    if (missionInfoButton) {
      missionInfoButton.addEventListener('click', () => {
        showContainer(`
          <button id="back">Back</button>
          <div class="missionInfo">
            <h4>Mission Task</h4>
            <p>- Collect Bombs to Kill Enemies</p>
            <p>- Reach the Spaceship</p>
            <p>- Be careful with the Bombs... sometimes you need more than one to kill an enemy.</p>
            <p>- You can only go back home when you collect all the Echoes</p>
          </div>
        `);
      });
    }
  }

  // ─────────────────────────────
  // Typewriter-Effekt
  // ─────────────────────────────

  /**
   * Startet den Typewriter-Effekt für den Storytext.
   */
  function startTypewriterEffect() {
    const storyText = `
      X-17 was once a proud exploration hybrid of human and robot, built to explore new worlds.
      His spaceship, however, crashed as it entered the atmosphere of a strange planet.
      What was once a thriving civilization was now a desolate wasteland.
      
      His systems analyzed the environment. "Biological lifeforms... unknown. Structures... damaged. Potential threat detected."
      
      X-17 had to find parts to repair his ship. He wandered through the ruins of once-great cities and discovered usable components in old storage facilities.
      Along the way, he collected bombs to defend himself against possible threats.
      
      As he worked, a deep rumbling echoed in the distance. The air vibrated, shadows moved on the horizon.
      His sensors triggered an alert, but he had no time to think. He knew only one thing: he had to hurry.
      
      With the salvaged parts, he returned to his spaceship. As he activated the thrusters, the ground trembled.
      The sky darkened as he took off. Whatever had been watching him would not let him escape so easily...
      
      But X-17 was ready.
    `;

    let i = 0;
    const speed = 50;
    const storyElement = document.querySelector("#story-text");

    function typeWriter() {
      if (i < storyText.length) {
        storyElement.innerHTML += storyText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

  // ─────────────────────────────
  // Initialisierung
  // ─────────────────────────────

  initMusic();
  initStartGameButton();
  initControlsButton();
  initStoryButton();
  initMissionInfoButton();
  initBackButtonListener();
});
