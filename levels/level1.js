/**
 * Erstellt das erste Level des Spiels mit verschiedenen Gegnern, Vögeln, Hintergrundobjekten und sammelbaren Gegenständen.
 */
const level1 = new Level(
  /**
   * @property {Object[]} enemies - Die Liste der Gegner im Level.
   */
  [
    new Enemie(),
    new Enemie(),
    new Enemie(),
    new Enemie1(),
    new Enemie2(),
    new Enemie3(),
  ],

  /**
   * @property {Object[]} birds - Die Liste der Vögel im Level.
   */
  [
    new Bird(), new Bird(), new Bird(), new Bird(), new Bird(),
    new Bird(), new Bird(), new Bird(), new Bird(), new Bird(),
    new Bird(), new Bird(), new Bird(),
  ],

  /**
   * @property {Object[]} backgroundObjects - Die Liste der Hintergrundobjekte.
   */
  [
    new BackgroundObject('./img/sky.webp', -719),
    new BackgroundObject('./img/houses&trees_bg.webp', -719),
    new BackgroundObject('./img/houses.webp', -719),
    new BackgroundObject('./img/car_trees_etc.webp', -719),
    new BackgroundObject('./img/fence.webp', -719),
    new BackgroundObject('./img/road.webp', -719),

    new BackgroundObject('./img/sky.webp', 0),
    new BackgroundObject('./img/moon.webp', 0),
    new BackgroundObject('./img/houses&trees_bg.webp', 0),
    new BackgroundObject('./img/houses.webp', 0),
    new BackgroundObject('./img/car_trees_etc.webp', 0),
    new BackgroundObject('./img/fence.webp', 0),
    new BackgroundObject('./img/road.webp', 0),

    new BackgroundObject('./img/sky.webp', 719),
    new BackgroundObject('./img/houses&trees_bg.webp', 719),
    new BackgroundObject('./img/houses.webp', 719),
    new BackgroundObject('./img/car_trees_etc.webp', 719),
    new BackgroundObject('./img/fence.webp', 719),
    new BackgroundObject('./img/road.webp', 719),

    new BackgroundObject('./img/sky.webp', 719 * 2),
    new BackgroundObject('./img/houses&trees_bg.webp', 719 * 2),
    new BackgroundObject('./img/houses.webp', 719 * 2),
    new BackgroundObject('./img/car_trees_etc.webp', 719 * 2),
    new BackgroundObject('./img/fence.webp', 719 * 2),
    new BackgroundObject('./img/road.webp', 719 * 2),

    new BackgroundObject('./img/sky.webp', 719 * 3),
    new BackgroundObject('./img/houses&trees_bg.webp', 719 * 3),
    new BackgroundObject('./img/houses.webp', 719 * 3),
    new BackgroundObject('./img/car_trees_etc.webp', 719 * 3),
    new BackgroundObject('./img/fence.webp', 719 * 3),
    new BackgroundObject('./img/road.webp', 719 * 3),

    new BackgroundObject('./img/sky.webp', 719 * 4),
    new BackgroundObject('./img/houses&trees_bg.webp', 719 * 4),
    new BackgroundObject('./img/houses.webp', 719 * 4),
    new BackgroundObject('./img/car_trees_etc.webp', 719 * 4),
    new BackgroundObject('./img/fence.webp', 719 * 4),
    new BackgroundObject('./img/road.webp', 719 * 4),
  ],

  /**
   * @property {Object[]} collectible - Die Liste der ersten sammelbaren Objekte (Bomben).
   */
  [
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 320, 270, 50, 50),
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 160, 640, 50, 50),
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 250, 980, 50, 50),
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 210, 1190, 50, 50),
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 210, 1740, 50, 50),
    new Collectible('./img/—Pngtree—black military bomb illustration_4650020.webp', 160, 1890, 50, 50),
  ],

  /**
   * @property {Object[]} collectible2 - Die Liste der zweiten sammelbaren Objekte (Asteroiden).
   */
  [
    new Collectible('./img/Mega/asteroidR2.webp', 310, 350, 50, 50),
    new Collectible('./img/Mega/asteroidR3.webp', 300, 640, 50, 50),
    new Collectible('./img/Mega/asteroidR6.webp', 170, 840, 50, 50),
    new Collectible('./img/Mega/asteroidR7.webp', 310, 1100, 50, 50),
    new Collectible('./img/Mega/asteroidR8.webp', 170, 1300, 50, 50),
    new Collectible('./img/Mega/asteroidR9.webp', 320, 1550, 50, 50),
    new Collectible('./img/Mega/asteroidR10.webp', 310, 1700, 50, 50),
    new Collectible('./img/Mega/asteroidR11.webp', 310, 1900, 50, 50),
    new Collectible('./img/Mega/asteroidR12.webp', 170, 2100, 50, 50),
    new Collectible('./img/Mega/asteroidR13.webp', 310, 2300, 50, 50),
  ],

  /**
   * @property {Object} lastCollectible - Das letzte sammelbare Objekt im Level.
   */
  new LastCollectible()
);
