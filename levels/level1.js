/**
 * Creates the first level of the game with various enemies, birds, background objects, and collectible items.
 */
function createLevel1() {
  return new Level(
    /**
     * @property {Object[]} enemies - The list of enemies in the level.
     */
    [
      new Enemie(),
      new Enemie(),
      new Enemie(),
      new EnemieSnakePurple(),
      new EnemieSnakeYellow(),
      new EnemieZombie(),
    ],

    /**
     * @property {Object[]} birds - The list of birds in the level.
     */
    [
      new Bird(), new Bird(), new Bird(), new Bird(), new Bird(),
      new Bird(), new Bird(), new Bird(), new Bird(), new Bird(),
      new Bird(), new Bird(), new Bird(),
    ],

    /**
     * @property {Object[]} backgroundObjects - The list of background objects.
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
     * @property {Object[]} collectible - The list of first collectible objects (bombs).
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
     * @property {Object[]} collectible2 - The list of second collectible objects (asteroids).
     */
    [
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 350, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 640, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 170, 840, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 1100, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 170, 1300, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 320, 1550, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 1700, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 1900, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 170, 2100, 50, 50),
      new Collectible('./img/Mega/asteroidR11_resized.webp', 310, 2300, 50, 50),
    ],

    /**
     * @property {Object} lastCollectible - The last collectible object in the level.
     */
    new LastCollectible()
  );
}