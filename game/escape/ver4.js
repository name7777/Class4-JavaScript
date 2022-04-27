// SET THE CANVANS
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// COMMON
const commonWidth = 50;
const commonHeight = 50;

// SET THE MAP
const mapKinds = ['earth', 'forest', 'swamp'];
const mapSelect = Number(prompt("맵을 선택하세요.\n1)땅 2)숲 3)늪"));
const mapRow = 10;
const mapCol = 10;
const map = [];

class CMap {
    constructor(left, top, right, bottom, color, isCheck) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
        this.isCheck = isCheck;
    }
    draw() {
        if (this.isCheck) {
            context.rect(this.left, this.top, commonWidth, commonHeight);
            context.fillStyle = this.color;
            context.fill();
        }
        else {
            context.rect(this.left, this.top, commonWidth, commonHeight);
            context.fillStyle = "black";
            context.fill();
        }
    }
}

// SET THE PLAYER
let playerPosX = 0;
let playerPosY = 0;
let gold = 0;
let life = 3;
const lifeCost = 50;

// SET THE EXIT
let exitPosX = Math.floor(Math.random() * 10) * (commonWidth + 5);
let exitPosY = Math.floor(Math.random() * 10) * (commonHeight + 5);

// SET THE MONSTER
const monster = [];
const monsterCount = 3;
class CMonster {
    constructor(left, top, right, bottom, color, hand, isAlive) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
        this.hand = hand;
        this.isAlive = isAlive;
    }
    draw() {
        if (this.isAlive) {
            context.rect(this.left, this.top, commonWidth, commonHeight);
            context.fillStyle = this.color;
            context.fill();
        }
    }
}

// SET THE MINI GAME
const hand = ['scissor', 'rock', 'paper'];
let userHand;
let monsterHand = Math.floor(Math.random() * 10) % 3;

function miniGame(user, npc) {
    let randGold = Math.round(Math.random() * 100);
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
const storeRanNum1 = Math.random() * 10;
const storeRanNum2 = Math.random() * 10;
let storeRow = Math.floor(storeRanNum1);
let storeCol = Math.floor(storeRanNum2);
let storePosX = (storeRow) * (commonWidth + 5);
let storePosY = (storeCol) * (commonHeight + 5);


// SET THE KEYBOARD
document.addEventListener('keydown', keyDownEventHandler);
function keyDownEventHandler(e) {
    // EYESIGHT
    for (let i = 0; i < mapRow; i++) {
        for (let j = 0; j < mapCol; j++) {
            if (playerPosX == map[i][j].left && playerPosY == map[i][j].bottom) {
                map[i][j].isCheck = true;
            }
        }
    }

    if (e.key == "ArrowLeft") {
        if (playerPosX > 0) {
            playerPosX -= (commonWidth + 5);
        }
        else {
            playerPosX = playerPosX;
        }
    }

    if (e.key == "ArrowUp") {
        if (playerPosY > 0) {
            playerPosY -= (commonHeight + 5);
        }
        else {
            playerPosY = playerPosY;
        }
    }

    if (e.key == "ArrowRight") {
        if (playerPosX < (mapRow - 1) * (commonWidth + 5)) {
            playerPosX += (commonWidth + 5);
        }
        else {
            playerPosX = playerPosX;
        }
    }

    if (e.key == "ArrowDown") {
        if (playerPosY < (mapCol - 1) * (commonHeight + 5)) {
            playerPosY += (commonHeight + 5);
        }
        else {
            playerPosY = playerPosY;
        }
    }

    if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown") {
        draw();
    }

    for (let i = 0; i < monsterCount; i++) {
        if (playerPosX == monster[i].left && playerPosY == monster[i].top && monster[i].isAlive == true) {
            setTimeout(() => {
                userHand = prompt("1)가위 2)바위 3)보");
                miniGame(userHand - 1, monster[i].hand);
                monster[i].isAlive = false;
            }, 50);
        }
    }

    if (playerPosX == storePosX && playerPosY == storePosY) {
        let wantLife;
        setTimeout(() => {
            wantLife = Number(prompt("구매 할 Life 개수를 입력하세요. (개당 50 Gold)"));
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
        }, 50)
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
    if (playerPosX == exitPosX && playerPosY == exitPosY) {
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
    drawExit();
}

// SET THE SET
function setMap() {
    let color = "";
    if (mapKinds[mapSelect - 1] == 'earth') {
        color = "orange";
    }
    else if (mapKinds[mapSelect - 1] == 'forest') {
        color = "green";
    }
    else if (mapKinds[mapSelect - 1] == 'swamp') {
        color = "purple";
    }

    for (let i = 0; i < mapRow; i++) {
        map[i] = [];
        for (let j = 0; j < mapCol; j++) {
            map[i][j] = new CMap(
                j * (commonWidth + 5),
                i * (commonHeight + 5),
                j * (commonWidth + 5),
                i * (commonHeight + 5),
                color,
                false
            )
        }
    }
}

function setMonster() {
    let isAlive = "";
    if (mapKinds[mapSelect - 1] == 'earth') {
        isAlive = "coral";
    }
    else if (mapKinds[mapSelect - 1] == 'forest') {
        isAlive = "yellowgreen";
    }
    else if (mapKinds[mapSelect - 1] == 'swamp') {
        isAlive = "salmon";
    }

    for (let i = 0; i < monsterCount; i++) {
        let ranNum1 = Math.floor(Math.random() * 10);
        let ranNum2 = Math.floor(Math.random() * 10);
        let hand = Math.floor(Math.random() * 10) % 3;
        monster[i] = new CMonster(
            ranNum1 * (commonWidth + 5),
            ranNum2 * (commonHeight + 5),
            ranNum1 * (commonWidth + 5),
            ranNum2 * (commonHeight + 5),
            isAlive,
            hand,
            true
        )
    }
}

// SET THE DRAW
function drawMap() {
    for (let i = 0; i < mapRow; i++) {
        for (let j = 0; j < mapCol; j++) {
            context.beginPath();
            map[i][j].draw();
            context.closePath();
        }
    }
}

function drawPlayer() {
    let img = new Image();
    img.src = "./img/player.png";
    img.onload = function () {
        context.drawImage(img, playerPosX, playerPosY, commonWidth, commonHeight);
    }
}

function drawMonster() {
    context.beginPath();
    for (let i = 0; i < monsterCount; i++) {
        monster[i].draw(monster[i].isAlive);
    }
    context.closePath();
}

function drawStore() {
    context.beginPath();
    context.rect(storePosX, storePosY, commonWidth, commonHeight);
    context.fillStyle = "pink";
    context.fill();
    context.closePath();
}

function drawExit() {
    let img = new Image();
    img.src = "./img/exit.jpg";
    img.onload = function () {
        context.drawImage(img, exitPosX, exitPosY, commonWidth, commonHeight);
    }
}

setMap();
setMonster();
draw();