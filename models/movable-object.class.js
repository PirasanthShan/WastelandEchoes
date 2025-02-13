/**
 * Klasse, die ein bewegliches Objekt im Spiel repräsentiert.
 * Erbt von DrawableObject.
 */
class MovableObject extends DrawableObject {
    /**
     * @property {number} speed - Die Geschwindigkeit des Objekts.
     * @property {boolean} otherDirection - Bestimmt, ob sich das Objekt in die entgegengesetzte Richtung bewegt.
     * @property {number} speedY - Vertikale Geschwindigkeit für Sprünge.
     * @property {number} acceleration - Beschleunigung, die die vertikale Bewegung beeinflusst.
     * @property {number} energy - Der Energiewert des Objekts.
     * @property {number} lastHit - Zeitstempel des letzten erlittenen Treffers.
     */
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
  
    /**
     * Erstellt eine Instanz von MovableObject.
     */
    constructor() {
        super();
        this.currentImage = 0;
    }
  
    /**
     * Wendet die Schwerkraft auf das Objekt an.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 310;
                this.speedY = 0;
            }
        }, 1000 / 35);
    }
  
    /**
     * Überprüft, ob sich das Objekt über dem Boden befindet.
     * @returns {boolean} True, wenn das Objekt über dem Boden ist, sonst false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 310;
        }
    }
  
    /**
     * Überprüft eine Kollision mit einem anderen Objekt.
     * @param {Object} mo - Das andere Objekt.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isColliding(mo) {
        return CollisionHandler.isCollidingDefault(this, mo);
    }
  
    /**
     * Überprüft eine Kollision mit einer Bombe.
     * @param {Object} mo - Das andere Objekt.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCollidingBomb(mo) {
        return CollisionHandler.isCollidingBomb(this, mo);
    }
  
    /**
     * Überprüft eine Kollision mit dem Boss-Gegner.
     * @param {Object} mo - Das andere Objekt.
     * @param {number} [overlapThreshold=0.7] - Die Überlappungsschwelle für die Kollisionsprüfung.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCollidingBoss(mo, overlapThreshold = 0.7) {
        return CollisionHandler.isCollidingBoss(this, mo, overlapThreshold);
    }
  
    /**
     * Überprüft eine Kollision mit einer Endboss-Bombe.
     * @param {Object} mo - Das andere Objekt.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCollidingBombEndboss(mo) {
        return CollisionHandler.isCollidingBombEndboss(this, mo);
    }
  
    /**
     * Überprüft eine Kollision mit einem sammelbaren Objekt.
     * @param {Object} mo - Das andere Objekt.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCollidingCollectible(mo) {
        return CollisionHandler.isCollidingCollectible(this, mo);
    }
  
    /**
     * Überprüft eine Kollision mit einem Schiff.
     * @param {Object} mo - Das andere Objekt.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCollidingShip(mo) {
        return CollisionHandler.isCollidingShip(this, mo);
    }
  
    /**
     * Überprüft, ob das Objekt kürzlich Schaden erlitten hat.
     * @returns {boolean} True, wenn das Objekt kürzlich getroffen wurde, sonst false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed / 1000 < 0.5;
    }
  
    /**
     * Reduziert die Energie des Objekts, wenn es getroffen wird.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
  
    /**
     * Überprüft, ob das Objekt tot ist.
     * @returns {boolean} True, wenn die Energie null ist, sonst false.
     */
    isDead() {
        return this.energy === 0;
    }
  
    /**
     * Spielt eine Animation ab, indem es durch die Bilder wechselt.
     * @param {string[]} images - Array mit Bildpfaden.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
  
    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed;
    }
  
    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }
  
    /**
     * Lässt das Objekt springen.
     */
    jump() {
        this.speedY = 25;
    }
  }
  