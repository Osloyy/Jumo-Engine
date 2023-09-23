
// Jumo Engine
// Version: 0.2

function customUpdate(engine) {

    const player = engine.gameObjects.find(obj => obj instanceof window.Player);

    if (engine.leftKey) {
        player.x -= 5;
    }
    if (engine.rightKey) {
        player.x += 5;
    }
    if (engine.spaceKey && !engine.isJumping) {
        if (player.y + player.height >= engine.canvas.height) {
            player.velocityY = -12;
            engine.isJumping = true;
        }
    }
    if (player.y + player.height >= engine.canvas.height) {
        engine.isJumping = false;
    }
}

function init() {
    const engine = new window.JumoEngine('gameCanvas', customUpdate);
    const player = engine.createPlayer(50, 300, 15, 15, 'orange');

    engine.backgroundColor = 'black';

    engine.gameLoop();
}

window.onload = init;
