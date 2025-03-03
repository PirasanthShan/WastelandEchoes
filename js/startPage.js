document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const startGameButton = document.querySelector('#startGame');
  const controlsButton = document.querySelector('#controls');
  const storyButton = document.querySelector('#Story');
  const missionInfoButton = document.querySelector('#missionInfo');
  const containerStartPage = document.querySelector('.containerStartPage');
  const startPage = document.querySelector('#startPage');
  const backgroundMusic = document.querySelector('#backgroundMusic');
  const musicButton = document.querySelector('#toggleMusic');

  // ─────────────────────────────
  // Music functions
  // ─────────────────────────────

  /**
   * Plays the background music muted to allow autoplay.
   */
  function playBackgroundMusic() {
    if (backgroundMusic) {
      backgroundMusic.volume = 0.5;
      const isMuted = localStorage.getItem('isMuted') === 'true';
      backgroundMusic.muted = isMuted;
      musicButton.innerHTML = isMuted 
        ? '<img src="img/soundoff.webp" alt="Sound Off">'
        : '<img src="img/soundon.webp" alt="Sound On">';
      
      if (!isMuted) {
        backgroundMusic.play().catch(() => {});
      } else {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
      }
    }
  }
  
  /**
   * Schaltet die Hintergrundmusik um und speichert den aktuellen Status im localStorage.
   */
  function toggleBackgroundMusic() {
    const isMuted = localStorage.getItem('isMuted') === 'true';
    if (isMuted) {
      localStorage.setItem('isMuted', 'false');
      backgroundMusic.muted = false;
      backgroundMusic.play().catch(() => {});
      musicButton.innerHTML = '<img src="img/soundon.webp" alt="Sound On">';
    } else {
      localStorage.setItem('isMuted', 'true');
      backgroundMusic.pause();
      musicButton.innerHTML = '<img src="img/soundoff.webp" alt="Sound Off">';
    }
  }


  /**
   * Initializes the music: starts it and sets up the music button.
   */
  function initMusic() {
    playBackgroundMusic();
    if (musicButton) {
      musicButton.addEventListener('click', toggleBackgroundMusic);
    }
  }

  // ─────────────────────────────
  // Start game functionalities
  // ─────────────────────────────

  /**
   * Handles the start of the game:
   * - Fades out the start page
   * - Pauses the background music
   * - Redirects to "game.html" after a short delay.
   */
  function handleStartGame() {
    startPage.classList.add('fade-out');
    backgroundMusic.pause();
    setTimeout(() => {
      window.location.href = 'game.html';
    }, 1000);
  }

  /**
   * Initializes the start game button.
   */
  function initStartGameButton() {
    if (startGameButton) {
      startGameButton.addEventListener('click', handleStartGame);
    }
  }

  // ─────────────────────────────
  // Container functions (for showing and hiding content)
  // ─────────────────────────────

  /**
   * Displays the container and inserts the provided HTML content.
   * Simultaneously hides the start page.
   * @param {string} content - HTML content to be displayed in the container.
   */
  function showContainer(content) {
    containerStartPage.innerHTML = content;
    startPage.style.display = 'none';
    containerStartPage.classList.remove('hide-container');
    containerStartPage.classList.add('show-container');
  }

  /**
   * Hides the container and then shows the start page again.
   */
  function hideContainer() {
    containerStartPage.classList.remove('show-container');
    containerStartPage.classList.add('hide-container');
    setTimeout(() => {
      startPage.style.display = 'block';
    }, 500);
  }

  /**
   * Adds a global event listener that reacts to clicks on an element with the ID "back".
   */
  function initBackButtonListener() {
    document.addEventListener('click', (event) => {
      if (event.target.id === 'back') {
        hideContainer();
      }
    });
  }

  // ─────────────────────────────
  // Content buttons (Controls, Story, Mission Info)
  // ─────────────────────────────

  /**
   * Initializes the "Controls" button.
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
   * Initializes the "Story" button and starts the typewriter effect.
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
   * Initializes the "Mission Info" button.
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
  // Typewriter effect
  // ─────────────────────────────

  /**
   * Starts the typewriter effect for the story text.
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
    const speed = 35;
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

  /**
   * Initializes the "Impressum" button.
   */
  function initImpressumButton() {
    const impressumButton = document.querySelector('#Impressum');

    if (impressumButton) {
      impressumButton.addEventListener('click', () => {
        showContainer(`
          <button id="back">Back</button>
          <div class="impressum">
            <h4>Imprint</h4>
            <p><strong>Information according to § 5 TMG</strong></p>
            <p>WASTELAND ECHOES<br>  
              Pirasanth Shanmuganathan<br>  
              Georg-Friedrich-Händel-Str. 5<br>  
              59075 Hamm, Germany  
            </p>

            <h5>Contact</h5>
            <p>Phone: <a href="tel:+491765878962">+49 176 5878962</a></p>
            <p>Email: <a href="mailto:Pirasanth@live.de">Pirasanth@live.de</a></p>

            <h5>Responsible for content according to § 55 Abs. 2 RStV</h5>
            <p>Pirasanth Shanmuganathan<br>  
              Georg-Friedrich-Händel-Str. 5<br>  
              59075 Hamm, Germany  
            </p>

            <h5>Liability Disclaimer</h5>
            <p>The content of this website has been created with the utmost care. However, no guarantee can be given for the accuracy, completeness, or timeliness of the content.</p>

            <h5>Copyright Notice</h5>
            <p>The content published on this website is subject to German copyright law. Any reproduction, editing, distribution, or any kind of utilization outside the limits of copyright law requires prior written consent from the respective author or creator.</p>
          </div>

        `);
      });
    }
  }

  // Add initialization to the start function
  initImpressumButton();

  // ─────────────────────────────
  // Initialization
  // ─────────────────────────────

  initMusic();
  initStartGameButton();
  initControlsButton();
  initStoryButton();
  initMissionInfoButton();
  initBackButtonListener();
});