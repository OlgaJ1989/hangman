let canvas = document.getElementById('game-area');
let ctx = canvas.getContext('2d');
let snakeSpeed = 5;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let foodX;
let foodY;

function makeGame() {
    clearBoard();
    moveSnake();
    drawSnake();
    setTimeout(makeGame, 1000 / snakeSpeed);
}

function clearBoard() {
    ctx.fillStyle = '#22718F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#7AAFC6';
    ctx.fillRect(headX * tileCount + 1, headY * tileCount + 1, tileSize, tileSize);
}

function moveSnake() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
}

makeGame();