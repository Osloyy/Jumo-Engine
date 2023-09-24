
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
    let level1 = {
        player: {
            x: 50,
            y: 300,
            width: 15,
            height: 15,
            color: 'orange',
        },

    };
    
    const engine = new window.JumoEngine('gameCanvas', customUpdate);
    const player = engine.createPlayer(level1.player.x, level1.player.y, level1.player.width, level1.player.height, level1.player.color);

    engine.levelManager = new LevelManager(engine);
    engine.levelManager.addLevel(level1);
    engine.levelManager.loadNextLevel();

    engine.backgroundColor = '#3b3a39';

    engine.gameLoop();
}

window.onload = init;
