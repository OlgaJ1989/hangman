let canvas = document.getElementById('game-area');
let ctx = getContext('2d');
let snakeSpeed = 7

function makeGame() {
    console.log('draw game');
    setTimeout(makeGame, 1000/ speed); 
}

makeGame();