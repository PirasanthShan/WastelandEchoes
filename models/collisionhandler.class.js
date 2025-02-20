/**
 * Stellt statische Methoden zur Kollisionsberechnung zwischen zwei Objekten bereit.
 *
 * @class CollisionHandler
 */
class CollisionHandler {
  /**
   * Berechnet die Kollision zwischen zwei Objekten anhand von Überlappungsfaktoren.
   *
   * @param {Object} obj1 - Das erste Objekt, muss Eigenschaften x, y, width und height besitzen.
   * @param {Object} obj2 - Das zweite Objekt, muss Eigenschaften x, y, width und height besitzen.
   * @param {number} overlapXFactor - Multiplikator für die erforderliche Mindestüberlappung in x-Richtung.
   * @param {number} overlapYFactor - Multiplikator für die erforderliche Mindestüberlappung in y-Richtung.
   * @returns {boolean} true, wenn die Überlappung beider Achsen größer ist als die Mindestwerte, sonst false.
   */
  static isColliding(obj1, obj2, overlapXFactor, overlapYFactor) {
    const overlapX = Math.min(obj1.x + obj1.width, obj2.x + obj2.width) - Math.max(obj1.x, obj2.x);
    const overlapY = Math.min(obj1.y + obj1.height, obj2.y + obj2.height) - Math.max(obj1.y, obj2.y);
    const minOverlapX = Math.min(obj1.width, obj2.width) * overlapXFactor;
    const minOverlapY = Math.min(obj1.height, obj2.height) * overlapYFactor;
    return overlapX > minOverlapX && overlapY > minOverlapY;
  }

  /**
   * Prüft die Standard-Kollision zwischen zwei Objekten mit festen Faktoren (0.6 für beide Achsen).
   *
   * @param {Object} obj1 - Erstes Objekt.
   * @param {Object} obj2 - Zweites Objekt.
   * @returns {boolean} true, wenn die Objekte kollidieren, sonst false.
   */
  static isCollidingDefault(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.6, 0.6);
  }

  /**
   * Prüft die Kollision zwischen zwei Objekten, wenn ein Bombenobjekt beteiligt ist.
   * Hier wird ein höherer Faktor für die x-Achse (0.9) verwendet.
   *
   * @param {Object} obj1 - Erstes Objekt.
   * @param {Object} obj2 - Zweites Objekt.
   * @returns {boolean} true, wenn die Objekte kollidieren, sonst false.
   */
  static isCollidingBomb(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.9, 0.6);
  }

  /**
   * Prüft die Kollision zwischen zwei Sammelobjekten (Collectibles).
   * 
   * Hinweis: Es gab eine frühere Version mit den Faktoren (0.6, 0.7), 
   * die hier durch die folgende Definition (0.5, 0.5) überschrieben wird.
   *
   * @param {Object} obj1 - Erstes Objekt.
   * @param {Object} obj2 - Zweites Objekt.
   * @returns {boolean} true, wenn die Objekte kollidieren, sonst false.
   */
  static isCollidingCollectible(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.5, 0.2);
    
  }

  /**
   * Prüft die Kollision zwischen einem Objekt und einem Raumschiff.
   * Hier wird fast eine vollständige Überlappung verlangt (Faktoren 0.99).
   *
   * @param {Object} obj1 - Erstes Objekt.
   * @param {Object} obj2 - Das Raumschiff-Objekt.
   * @returns {boolean} true, wenn die Objekte kollidieren, sonst false.
   */
  static isCollidingShip(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.99, 0.99);
  }

  /**
   * Prüft die Kollision zwischen einem Objekt und dem Endboss.
   * Dabei wird ein einheitlicher Überlappungsfaktor verwendet, der optional angepasst werden kann.
   *
   * @param {Object} obj1 - Erstes Objekt.
   * @param {Object} obj2 - Das Endboss-Objekt.
   * @param {number} [overlapThreshold=0.7] - Der Überlappungsfaktor, der für beide Achsen verwendet wird.
   * @returns {boolean} true, wenn die Objekte kollidieren, sonst false.
   */
  static isCollidingBoss(obj1, obj2, overlapThreshold = 0.7) {
    return this.isColliding(obj1, obj2, overlapThreshold, overlapThreshold);
  }

  /**
   * Prüft die Kollision zwischen einer Bombe und dem Endboss.
   * Hier werden etwas strengere Faktoren (0.8) verwendet.
   *
   * @param {Object} obj1 - Das Bomben-Objekt.
   * @param {Object} obj2 - Das Endboss-Objekt.
   * @returns {boolean} true, wenn die Bombe den Endboss trifft, sonst false.
   */
  static isCollidingBombEndboss(obj1, obj2) {
    return this.isColliding(obj1, obj2, 0.8, 0.8);
  }
}
