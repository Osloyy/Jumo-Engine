

class JumoEngine {

    constructor(canvasId, customUpdate) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameObjects = [];
        this.backgroundColor = 'black';

        this.LevelManager = new LevelManager(this);

        this.leftKey = false;
        this.rightKey = false;
        this.spaceKey = false;
        this.isJumping = false;
        this.customUpdate = customUpdate;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    clearGameObjects() {
        this.gameObjects = [];
    }

    handleKeyDown(event) {
        if (event.code === 'KeyA') {
            this.leftKey = true;
        }
        else if (event.code === 'KeyD') {
            this.rightKey = true;
        }
        else if (event.code === 'Space') {
            this.spaceKey = true;
        }
    }

    handleKeyUp(event) {
        if (event.code === 'KeyA') {
            this.leftKey = false;
        }
        else if (event.code === 'KeyD') {
            this.rightKey = false;
        }
        else if (event.code === 'Space') {
            this.spaceKey = false;
        }
    }

    createPlayer(x, y, width, height, color) {
        const player = new Player(x, y, width, height, color, this.canvas);
        this.gameObjects.push(player);
        return player;
    }

    clearCanvas() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateGameObjects() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            let jumpForce = -12;
            this.gameObjects[i].update();

            if (this.leftKey) {
                this.gameObjects[i].x -= 5;
            }
            if (this.rightKey) {
                this.gameObjects[i].x += 5;
            }
            if (this.spaceKey && !this.isJumping) {
                if (this.gameObjects[i].y + this.gameObjects[i].height >= this.canvas.height) {
                    this.gameObjects[i].velocityY = jumpForce;
                    this.isJumping = true;
                }
            }

            if (this.gameObjects[i].y + this.gameObjects[i].height >= this.canvas.height) {
                this.isJumping = false;
            }
        }
    }

    drawGameObjects() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
    }

    gameLoop() {
        this.clearCanvas();
        this.updateGameObjects();
        this.drawGameObjects();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityY = 0;
    }

    update() {
        // Update objects here
        let grav = 0.5;
        this.velocityY += grav;
        this.y += this.velocityY;

        if (this.y + this.height > this.canvas.height) {
            this.y = this.canvas.height - this.height;
            this.velocityY = 0;
        }
    }

    draw(ctx) {
        // Draw objects here
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player extends GameObject {
    constructor(x, y, width, height, color, canvas) {
        super(x, y, width, height, color);
        this.canvas = canvas; 
    }

    update() {
        // Update objects here
        let grav = 0.5;
        this.velocityY += grav;
        this.y += this.velocityY;

        
        if (this.y + this.height > this.canvas.height) {
            this.y = this.canvas.height - this.height;
            this.velocityY = 0;
        }
    }
}


class LevelManager {
    constructor(engine) {
        this.engine = engine;
        this.levels = [];
        this.currentLevelIndex = -1;
    }

    addLevel(levelData) {
        this.levels.push(levelData);
    }

    loadNextLevel(levelIndex) {
        if (levelIndex >= 0 && levelIndex < this.levels.length) {
            const levelData = this.levels[levelIndex];
            this.engine.clearGameObjects();
            this.engine.createPlayer(levelData.player.x, levelData.player.y, levelData.player.width, levelData.player.height, levelData.player.color);
        } else {

        }
    }

    loadLevel(levelIndex) {
        if (levelIndex >= 0 && levelIndex < this.levels.length) {
            const levelData = this.levels[levelIndex];

            engine.clearGameObjects();
            // Init GameObjects for levels

        } else {
            console.error('Invalid level index: ${levelIndex}');
        }
    }
}

window.JumoEngine = JumoEngine;
window.Player = Player;
