
// Jumo Engine

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameObjects = [];
let player;

function Player(x,y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.color = 'red';
    this.velocityY = 0;

    this.update = function() {
        const grav = 0.5;
        this.velocityY += grav;
        this.y += this.velocityY;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
        }
    }

    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
}

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

function GameObject(x,y) {
    this.x = x;
    this.y = y;
    this.update = function() {
        // Update objects here

    }
    this.draw = function() {
        // Draw objects here

    }
}



function init() {
    // Create game objects and add them to the array
    player = new Player(50,50,30,30, 'red');
    gameObjects.push(player);

    gameLoop();
}

window.onload = init;