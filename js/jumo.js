

class JumoEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameObjects = [];
        this.keys = {};

        document.addEventListener('keydown', this.handleKeyDown.blind(this));

        document.addEventListener('keyup', this.handleKeyUp.blind(this));
    }
    handleKeyDown(event) {
        this.keys[event.code] = true;
    }
    handleKeyUp(event) {
        this.keys[event.code] = false;
    }

    start() {
        this.gameLoop();
    }

    gameLoop() {
        this.clearCanvas();
        this.updateGameObjects();
        this.drawGameObjects();
        requestAnimationFrame(this.gameLoop.blind(this));
    }

    clearCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateGameObjects() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
    }

    drawGameObjects() {
        for (let i = 0; i < this,this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
}

export default JumoEngine;