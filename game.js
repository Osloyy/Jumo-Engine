
// Jumo Engine

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameObjects = [];

function Player(x , y, width, height, color) {
    GameObject.call(this, x, y, width, height, color);
}
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;


function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function updateGameObjects() {
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update();
    }
}

function drawGameObjects() {
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function gameLoop() {
    clearCanvas();
    updateGameObjects();
    drawGameObjects();
    requestAnimationFrame(gameLoop);

}

function GameObject(x,y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocityY = 0;

    this.update = function() {
        // Update objects here
        const grav = 0.5;
        this.velocityY += grav;
        this.y += this.velocityY;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
        }
    }
    this.draw = function() {
        // Draw objects here
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function init() {
    // Create game objects and add them to the array
    player = new Player(50, 50, 30, 30, 'red');
    gameObjects.push(player);

    gameLoop();
}

window.onload = init;