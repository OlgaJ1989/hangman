let canvas = document.getElementById('game-area');
let ctx = canvas.getContext('2d');

class SnakeSegment {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let snakeSpeed = 5;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let foodX = 5;
let foodY = 5;
let snakeSegments = [];
let snakeLength = 0;
let score = 0;

function makeGame() {
    moveSnake();

    let result = isGameOver();
    if(result) {
        return;
    }

    clearBoard();
    checkFoodCollision();
    drawFood();
    drawSnake();
    addScore();



/*
    if(score > 10) {
        snakeSpeed = 10;
    }
    if(score > 20) {
        snakeSpeed = 15;
    }
    if(score > 30) {
        snakeSpeed = 20;
    }
    if(score > 40) {
        snakeSpeed = 25;
    }
    if(score > 50) {
        snakeSpeed = 30;
    }
    */

    setTimeout(makeGame, 1000 / snakeSpeed);
}

function isGameOver() {
    let gameOver = false;
    //walls
    if(headX < 0) {
        gameOver = true;
    }
    else if(headX >= tileCount) {
        gameOver = true;
    }
    else if(headY <0) {
        gameOver = true;
    }
    else if(headY >= tileCount) {
        gameOver=true;
    }

    for(let i = 0; i < snakeSegments.length; i++) {
        let part = snakeSegments[i];
        if(part.x === headX && part.y == headY) {
            gameOver = true;
            break;
        }
    }



    if(gameOver) {
        ctx.fillStyle = 'yellow';
        ctx.font = '65px Anton';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function addScore() {
    ctx.fillStyle = '#7AAFC6';
    ctx.font = '20px Anton';
    ctx.fillText('Score ' + score, canvas.width - 80, 20)
}

function clearBoard() {
    ctx.fillStyle = '#22718F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = '#66ffcc';
    for (let i = 0; i < snakeSegments.length; i++) {
        let segment = snakeSegments[i];
        ctx.fillRect(segment.x * tileCount + 1, segment.y * tileCount + 1, tileSize, tileSize);
    }

    snakeSegments.push(new SnakeSegment(headX, headY));
    if (snakeSegments.length > snakeLength) {
        snakeSegments.shift();
    }

    ctx.fillStyle = '#00ff99';
    ctx.fillRect(headX * tileCount + 1, headY * tileCount + 1, tileSize, tileSize);

}

function drawFood() {
    ctx.fillStyle = '#ff6666';
    ctx.fillRect(foodX * tileCount + 1, foodY * tileCount + 1, tileSize, tileSize);
}

function checkFoodCollision() {
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        snakeLength++;
        score++;
        if (score % 5 == 0 ) {
            snakeSpeed += 2;
        }
    }
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
        keyYes = 0;
    }
    //right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
        keyYes = 0;
    }
    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
        keyYes = 0;
    }
    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
        keyYes = 0;
    }

}

makeGame();