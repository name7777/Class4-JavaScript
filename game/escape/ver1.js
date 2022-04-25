/* 1차 버전
- 1	맵 제작 - 이차원 배열
- 2	맵타일 - 오브젝트 or 클래스
- 3	플레이어, 탈출구 - 오브젝트 or 클래스
- 4	키 입력 처리 - 상하좌우 1칸씩 이동 가능
- 5	플레이어가 탈출구에 도착하면 게임 클리어
 
-  2차 버전
- 1	몬스터 등장 - 플레이어가 이동할 때 마다 일정 확률로 만날 수 있다.
- 2	전투 - 몬스터와 만나면 가위, 바위, 보 버튼이 생기고 가위, 바위,보 시스템을 사용해서 전투가 벌어진다.
- 3	전투 - 이기면 0 ~ 100골드 사이에서 랜덤하게 보상 획득
- 4	전투 - 지면 HP 1 감소

-  3차 버전
- 1	맵타일 종류 추가 - 땅, 숲, 늪 등등
- 2	맵타일 종류에 따라 다른 표현 ( 색, 모양 )
- 3	몬스터 종류 추가 - 맵타일 종류에 따라 등장하는 몬스터 변경
- 4	상점 추가 - 맵에 상점 1개 존재
- 5	상점 기능 - 골드를 소모해서 HP 회복

-  4차 버전
- 1	맵 표현 추가 (시야개념)
- 1-1	안 가본 영역 - 검은색
- 1-2	가본 영역 - 회색 (탈출구, 상점 표시)
- 1-3	현재 시야 - 밝은 회색 (탈출구, 상점 표시)
- 2	전투 시 몬스터 프로필 추가 - 몬스터 종류에 따라 이미지 출력
*/


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