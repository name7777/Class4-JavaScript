// SET THE CANVANS
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// SET THE MAP
const mapWidth = 25;
const mapHeight = 25;
const mapRow = 10;
const mapCol = 10;
const map = [];

class CMap {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
    }
    draw() {
        context.rect(this.left, this.top, mapWidth, mapHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}

// SET THE PLAYER
const playerWidth = 25;
const playerHeight = 25;
let playerPosX = 0;
let playerPosY = 0;
let randGold = Math.round(Math.random() * 100);
let gold = 0;
let life = 3;

// SET THE MONSTER
const monsterWidth = 25;
const monsterHeight = 25;
const ranNum1 = Math.random() * 10;
const ranNum2 = Math.random() * 10;
let monsterRow = Math.floor(ranNum1);
let monsterCol = Math.floor(ranNum2);
let monsterPosX = (monsterRow) * (mapWidth + 5);
let monsterPosY = (monsterCol) * (mapHeight + 5);

// SET THE MINI GAME
const hand = ['scissor', 'rock', 'paper'];
let userHand;
let monsterHand = Math.floor(Math.random() * 10) % 3;
console.log('몬스터꺼는?', hand[monsterHand]);

function miniGame(user, npc) {
    let result = (user - npc + 2) % 3 // ★ 핵심: 가위바위보 로직 줄이기
    if (user - npc == 0) console.log("비김");
    else if (result == 0) {
        gold += randGold;
        console.log("이김")
    }
    else if (result == 1) {
        life -= 1;
        console.log("짐");
    }
    console.log('목숨: ', life, ' 골드: ', gold);
}

// SET THE KEYBOARD
document.addEventListener('keydown', keyDownEventHandler);

function keyDownEventHandler(e) {
    if (e.key == " ") {
        // 스페이스바
    }

    if (e.key == "ArrowLeft") {
        if (playerPosX > 0) {
            playerPosX -= (mapWidth + 5);
        }
        else {
            playerPosX = playerPosX;
        }
    }

    if (e.key == "ArrowUp") {
        if (playerPosY > 0) {
            playerPosY -= (mapHeight + 5);
        }
        else {
            playerPosY = playerPosY;
        }
    }

    if (e.key == "ArrowRight") {
        if (playerPosX < (mapRow - 1) * (mapWidth + 5)) {
            playerPosX += (mapWidth + 5);
        }
        else {
            playerPosX = playerPosX;
        }
    }

    if (e.key == "ArrowDown") {
        if (playerPosY < (mapCol - 1) * (mapHeight + 5)) {
            playerPosY += (mapHeight + 5);
        }
        else {
            playerPosY = playerPosY;
        }
    }

    if (playerPosX == monsterPosX && playerPosY == monsterPosY) {
        userHand = prompt("1)가위 2)바위 3)보");
        miniGame(userHand - 1, monsterHand);
    }

    if (isClear()) {
        setTimeout(() => {
            location.reload();
            alert("Clear");
        }, 50);
    }

    if (isFinish()) {
        setTimeout(() => {
            location.reload();
            alert("You died");
        }, 50);
    }
}

// SET THE CLEAR
function isClear() {
    if (playerPosX == (mapRow - 1) * (mapWidth + 5) && playerPosY == (mapCol - 1) * (mapHeight + 5)) {
        return true;
    }
    else return false;
}

// SET THE GAME OVER
function isFinish() {
    if (life <= 0) return true;
}

// SET THE DRAW
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
    drawMonster();
}

// SET THE SET
function setMap() {
    for (let i = 0; i < mapRow; i++) {
        map[i] = [];
        for (let j = 0; j < mapCol; j++) {
            map[i][j] = new CMap(
                j * (mapWidth + 5),
                i * (mapHeight + 5),
                j * (mapWidth + 5),
                i * (mapHeight + 5),
                "green"
            )
        }
    }
}

// SET THE DRAW
function drawMap() {
    context.beginPath();
    for (let i = 0; i < mapRow; i++) {
        for (let j = 0; j < mapCol; j++) {
            map[i][j].draw();
        }
    }
    context.closePath();
}

function drawPlayer() {
    context.beginPath();
    context.rect(playerPosX, playerPosY, playerWidth, playerHeight);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}

function drawMonster() {
    context.beginPath();
    context.rect(monsterPosX, monsterPosY, monsterWidth, monsterHeight);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
}

setMap();
// setInterval(update, 10);
setInterval(draw, 10);