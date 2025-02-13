/**
 * Klasse, die für das Rendern des Spielframes und die Verwaltung der Anzeige von Objekten verantwortlich ist.
 */
class RenderingManager {
    /**
     * Erstellt eine Instanz von RenderingManager.
     * @param {Object} world - Die Spielwelt-Instanz.
     */
    constructor(world) {
        this.world = world; // Referenz zur Spielwelt
        this.ctx = world.ctx; // Canvas-Kontext
    }
  
    /**
     * Rendert einen einzelnen Frame des Spiels.
     * Stoppt die Sounds, wenn das Spiel nicht läuft.
     */
    renderFrame() {
        if (!this.world.isGameRunning) {
            this.world.soundManager.stopAllSounds();
            return;
        }
  
        this.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.ctx.translate(this.world.camera_x, 0);
  
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.ctx.translate(-this.world.camera_x, 0);
  
        this.addToMap(this.world.statusBar);
        this.addToMap(this.world.collectibleBar);
        this.addToMap(this.world.crystalBar);
        this.ctx.translate(this.world.camera_x, 0);
        this.addToMap(this.world.character);
  
        if (!this.world.endboss.isRemoved) {
            this.addToMap(this.world.endboss);
        }
  
        this.world.enemies.forEach((enemy) => {
            if (!enemy.isRemoved) {
                this.addToMap(enemy);
            }
        });
  
        this.addObjectsToMap(this.world.level.birds);
        this.addObjectsToMap(this.world.throwableObjects);
        this.addObjectsToMap(this.world.level.collectible);
        this.addObjectsToMap(this.world.level.collectible2);
        this.addToMap(this.world.level.lastCollectible);
  
        this.ctx.translate(-this.world.camera_x, 0);
  
        if (this.world.isGameRunning) {
            requestAnimationFrame(() => this.renderFrame());
        }
    }
  
    /**
     * Setzt alle Sounds im Spiel fort, einschließlich der Musik des letzten sammelbaren Objekts, falls zutreffend.
     */
    resumeAllSounds() {
        this.world.soundManager.resumeAllSounds();
        if (this.world.lastCollectible) {
            this.world.lastCollectible.resumeMusic();
        }
    }
  
    /**
     * Stoppt alle Sounds im Spiel, einschließlich der Musik des letzten sammelbaren Objekts, falls zutreffend.
     */
    stopAllSounds() {
        this.world.soundManager.stopAllSounds();
        if (this.world.lastCollectible) {
            this.world.lastCollectible.stopMusic();
        }
    }
  
    /**
     * Fügt mehrere Objekte zur Canvas-Karte hinzu.
     * @param {Object[]} objects - Ein Array von Objekten, die hinzugefügt werden sollen.
     */
    addObjectsToMap(objects) {
        if (!Array.isArray(objects)) return;
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }
  
    /**
     * Fügt ein einzelnes Objekt zur Canvas-Karte hinzu.
     * @param {Object} mo - Das hinzuzufügende Objekt.
     */
    addToMap(mo) {
        if (!mo) return;
        if (mo.otherDirection) this.flipImage(mo);
        if (mo.img) mo.draw(this.ctx);
        if (mo.img) mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }
  
    /**
     * Spiegelt ein Bild horizontal vor dem Rendern.
     * @param {Object} mo - Das Objekt, dessen Bild gespiegelt werden soll.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }
  
    /**
     * Stellt das gespiegelte Bild in seine ursprüngliche Ausrichtung zurück.
     * @param {Object} mo - Das Objekt, dessen Bild wiederhergestellt werden soll.
     */
    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
  }
  