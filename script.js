const gameArea = document.getElementById('gameArea');
const gameSize = 400;
const tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let apple = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };

document.addEventListener('keydown', changeDirection);
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

placeApple();
setInterval(updateGame, 100);

function updateGame() {
    moveSnake();
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        snake.push({}); // Add a new segment to the snake
        placeApple();
    }
    drawGame();
}

function moveSnake() {
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += direction.x * tileSize;
    snake[0].y += direction.y * tileSize;

    if (snake[0].x < 0) snake[0].x = gameSize - tileSize;
    if (snake[0].x >= gameSize) snake[0].x = 0;
    if (snake[0].y < 0) snake[0].y = gameSize - tileSize;
    if (snake[0].y >= gameSize) snake[0].y = 0;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            setDirection(0, -1);
            break;
        case 'ArrowDown':
            setDirection(0, 1);
            break;
        case 'ArrowLeft':
            setDirection(-1, 0);
            break;
        case 'ArrowRight':
            setDirection(1, 0);
            break;
    }
}

function setDirection(x, y) {
    if ((direction.x === 0 && x !== 0) || (direction.y === 0 && y !== 0)) {
        direction = { x, y };
    }
}

function placeApple() {
    apple.x = Math.floor(Math.random() * (gameSize / tileSize)) * tileSize;
    apple.y = Math.floor(Math.random() * (gameSize / tileSize)) * tileSize;
}

function drawGame() {
    gameArea.innerHTML = '';
    drawElement(apple, 'apple');
    snake.forEach(segment => drawElement(segment, 'snake'));
}

function drawElement(element, className) {
    const div = document.createElement('div');
    div.style.left = `${element.x}px`;
    div.style.top = `${element.y}px`;
    div.classList.add(className);
    gameArea.appendChild(div);
}
