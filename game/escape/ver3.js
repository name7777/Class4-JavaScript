// SET THE CANVANS
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// SET THE MAP
const mapKinds = ['earth', 'forest', 'swamp'];
const mapSelect = Number(prompt("맵을 선택하세요.\n1)땅 2)숲 3)늪"));
console.log(mapKinds[mapSelect - 1]);
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
const lifeCost = 50;

// SET THE MONSTER
const monster = [];
const monsterCount = 3;
const monsterWidth = 25;
const monsterHeight = 25;
class CMonster {
    constructor(left, top, right, bottom, color, hand) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
        this.hand = hand;
    }
    draw() {
        context.rect(this.left, this.top, monsterWidth, monsterHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}

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

// SET THE STORE
const storeWidth = 25;
const storeHeight = 25;
const storeRanNum1 = Math.random() * 10;
const storeRanNum2 = Math.random() * 10;
let storeRow = Math.floor(storeRanNum1);
let storeCol = Math.floor(storeRanNum2);
let storePosX = (storeRow) * (mapWidth + 5);
let storePosY = (storeCol) * (mapHeight + 5);


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

    for (let i = 0; i < monsterCount; i++) {
        if (playerPosX == monster[i].left && playerPosY == monster[i].top) {
            userHand = prompt("1)가위 2)바위 3)보");
            miniGame(userHand - 1, monster[i].hand);
        }
    }

    if (playerPosX == storePosX && playerPosY == storePosY) {
        let wantLife = Number(prompt("구매 할 Life 개수를 입력하세요. (개당 50 Gold)"));
        let spendGold = wantLife * lifeCost;
        if (spendGold > gold) {
            alert("골드가 부족합니다.")
            prompt("구매 할 Life 개수를 입력하세요.");
        }
        else {
            gold -= spendGold;
            life += wantLife;
            console.log('목숨: ', life, ' 골드: ', gold);
        }
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
    drawStore();
    drawTest();
}

// SET THE SET
function setMap() {
    for (let i = 0; i < mapRow; i++) {
        map[i] = [];
        for (let j = 0; j < mapCol; j++) {
            if (mapKinds[mapSelect - 1] == 'earth') {
                map[i][j] = new CMap(
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    "orange"
                )
            }
            else if (mapKinds[mapSelect - 1] == 'forest') {
                map[i][j] = new CMap(
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    "green"
                )
            }
            else if (mapKinds[mapSelect - 1] == 'swamp') {
                map[i][j] = new CMap(
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    j * (mapWidth + 5),
                    i * (mapHeight + 5),
                    "purple"
                )
            }
        }
    }
}

function setMonster() {
    for (let i = 0; i < monsterCount; i++) {
        let ranNum1 = Math.floor(Math.random() * 10);
        let ranNum2 = Math.floor(Math.random() * 10);
        let hand = Math.floor(Math.random() * 10) % 3;
        monster[i] = new CMonster(
            ranNum1 * (mapWidth + 5),
            ranNum2 * (mapHeight + 5),
            ranNum1 * (mapWidth + 5),
            ranNum2 * (mapHeight + 5),
            "blue",
            hand
        )
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
    for (let i = 0; i < monsterCount; i++) {
        monster[i].draw();
    }
    context.closePath();
}

function drawStore() {
    context.beginPath();
    context.rect(storePosX, storePosY, storeWidth, storeHeight);
    context.fillStyle = "pink";
    context.fill();
    context.closePath();
}

function drawTest() {
    var img = new Image();
    img.src = "./img/test.jpg";
    img.onload = function () {
        context.drawImage(img, playerPosX, playerPosY, playerWidth, playerHeight);
    }
}


setMap();
setMonster();
setInterval(draw, 10);
// setInterval(update, 10);