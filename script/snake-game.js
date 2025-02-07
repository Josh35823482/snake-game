// board 
const blockSize = 25;
const rows = 20; 
const cols = 20;
let board;
let context;

// snake Head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = []

// Snake food
let foodX;
let foodY;

let GameOver = false;

window.onload = function() {
  board = document.getElementById('board');
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext('2d');//used for drawing on the board

  placeFood();
  document.addEventListener('keyup', changeDirection);
  // update();
  setInterval(update, 1000/10);
}

function update() {
  if (GameOver) {
    return;
  }

  context.fillStyle='black';
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = 'red';
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY])
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length){
    snakeBody[0] = [snakeX, snakeY]; 
  }

  context.fillStyle = 'lime'
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize; 
  context.fillRect(snakeX, snakeY, blockSize, blockSize)
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // GameOver Conditions
if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize ) {
  GameOver = true;
  alert('Game Over');
}
for (let i = 0; i < snakeBody.length; i++ ) {
  if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
    GameOver = true;
    alert('Game over')
  }
}

}



function changeDirection(e) {
  if (e.key === 'ArrowUp' && velocityY != 1) {
    velocityX = 0
    velocityY = -1  
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0
    velocityY = +1
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = +1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
