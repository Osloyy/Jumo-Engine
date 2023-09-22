
// Jumo Engine
// Version: 0.1

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameObjects = [];

let leftkey = false;
let rightkey = false;
let spacekey = false;
let isJumping = false;


function handleKeyDown(event) {
    //console.log('Key down: ' + event.code)
    if (event.code === 'KeyA') {
        leftkey = true;
    } else if (event.code === 'KeyD') {
        rightkey = true;
    } else if (event.code === 'Space') {
        spacekey = true;
    }
}

function handleKeyUp(event) {
    //console.log('Key up: ' + event.code)
    if (event.code === 'KeyA') {
        leftkey = false;
    } else if (event.code === 'KeyD') {
        rightkey = false;
    } else if (event.code === 'Space') {
        spacekey = false;
    }
}


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
        let jumpForce = -12;
        gameObjects[i].update();

        if (leftkey) {
            player.x -= 5;
        }
        if (rightkey) {
            player.x += 5;
        }
        if (spacekey && !isJumping) {
            if (player.y + player.height >= canvas.height) {
                player.velocityY = jumpForce;
                isJumping = true;
            }
        }

        if (player.y + player.height >= canvas.height) {
            isJumping = false;
        }
    }
}

function drawGameObjects() {
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
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
        let grav = 0.5;
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
    player = new Player(50, 300, 15, 15, 'red');
    gameObjects.push(player);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    gameLoop();
}

window.onload = init;