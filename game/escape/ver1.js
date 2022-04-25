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
const player = [];
let playerRow = 0;
let playerCol = 0;

// class CPlayer {
//     constructor(left, top, right, bottom, color) {
//         this.left = left;
//         this.top = top;
//         this.right = right;
//         this.bottom = bottom;
//         this.color = color;
//     }
//     draw() {
//         context.rect(this.left, this.top, playerWidth, playerHeight);
//         context.fillStyle = this.color;
//         context.fill();
//     }
// }

// SET THE KEYBOARD
document.addEventListener('keydown', keyDownEventHandler);

function keyDownEventHandler(e) {
    if (e.key == " ") {
        //
    }

    if (e.key == "ArrowLeft") {
        if (playerRow > 0) {
            playerRow -= (mapWidth + 5);
        }
        else {
            playerRow = playerRow;
        }
    }

    if (e.key == "ArrowUp") {
        if (playerCol > 0) {
            playerCol -= (mapHeight + 5);
        }
        else {
            playerCol = playerCol;
        }
    }

    if (e.key == "ArrowRight") {
        if (playerRow < (mapRow - 1) * (mapWidth + 5)) {
            playerRow += (mapWidth + 5);
        }
        else {
            playerRow = playerRow;
        }
    }
    
    if (e.key == "ArrowDown") {
        if (playerCol < (mapCol - 1) * (mapHeight + 5)) {
            playerCol += (mapHeight + 5);
        }
        else {
            playerCol = playerCol;
        }
    }

    if (isClear()) {
        setTimeout(() => {
            location.reload();
            alert("Clear");
        }, 50);
    }
}

// SET THE CLEAR
function isClear() {
    if (playerRow == (mapRow - 1) * (mapWidth + 5) && playerCol == (mapCol - 1) * (mapHeight + 5)) {
        return true;
    }
    else return false;
}

// SET THE DRAW
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
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
    context.rect(playerRow, playerCol, playerWidth, playerHeight)
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}

setMap();
// setInterval(update, 10);
setInterval(draw, 10);