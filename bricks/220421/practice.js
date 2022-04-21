/* 220419 목표
 * 1) 캔버스 설정
 * 2) document
 * 3) context
 */

/* 220420 목표
 * 배열
 */


// 캔버스 설정
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

console.log("이건가?", document.setGame.row.value);

// arc(공) 설정
const arcRadius = 20;
let arcPosX = canvas.width / 2;
let arcPosY = canvas.height - arcRadius - 10;
let arcMoveDirX = -1;
let arcMoveDirY = -1;
let arcMoveSpeed = 2;
let isContinue = true;
let isStart = false;

let ball = {
    left: 0, right: 0, top: 0, bottom: 0
};

// bar 설정
const barWidth = 100;
const barHeight = 20;
let barPosX = canvas.width / 2 - barWidth / 2
let barPosY = canvas.height - barHeight;
let barMoveSpeed = 15;

let paddle = {
    left: 0, right: 0, top: 0, bottom: 0
};

// bricks 설정
const brickWidth = 50; // 간격 10
const brickHeight = 25; // 간격 5
const brickRow = 4;
const brickCol = 5;
const brickSum = brickRow * brickCol;
let bricks;
let disapperedCount = 0;

// block 설정
let block;
let blockPosX = canvas.width / 2 - brickWidth / 2;
let blockPosY = canvas.height / 2;
let blockMoveDirX = -1;
let blockMoveSpeed = 3;


// 클래스로 객체의 설계도를 만든다
// 명사로 지칭되는 객체를 설계한다 (자동차, 책, 몬스터, 사람 등의 속성과 기능을 정의)
class Brick {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.isAlive = true;
        this.color = color;
    }

    draw() {
        if(this.isAlive) {
            context.rect(this.left, this.top, brickWidth, brickHeight);
            context.fillStyle = this.color;
            context.fill();
        }
    }
}

// 키처리 함수 추가
document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);


/* Function 구현 */
function keyDownEventHandler(e) {
    if (e.key == " ") {
        isStart = true;
    }

    if (e.key == "ArrowRight") {
        if (barPosX + barWidth < canvas.width) {
            barPosX += barMoveSpeed;
        }
    }
    else if (e.key == "ArrowLeft") {
        if (barPosX > 0) {
            barPosX -= barMoveSpeed;
        }
    }

    paddle.left = barPosX;
    paddle.right = barPosX + barWidth;
    paddle.top = barPosY;
    paddle.bottom = barPosY + barHeight;
}

function keyUpEventHandler() {
}


/* update : 데이터 수정 (도형의 위치 이동)
 * ★ 로직
 * 문제: 도형의 포지션에 따라 왔다 갔다 움직인다
 * 핵심: 방향에 영향을 주는 변수(=moveDir) 설정
 * 조건: if 조건에 맞춰 방향 변수에 + or - 를 결정하고 최종 return에 +=로 증감 표시
 */
function update() {
    if (isStart) {
        console.log(isStart);
        if (arcPosX - arcRadius < 0) {
            arcMoveDirX = 1;
        }
        else if (arcPosX + arcRadius > canvas.width) {
            arcMoveDirX = -1;
        }

        if (arcPosY - arcRadius < 0) {
            arcMoveDirY = 1;
        }
        else if (arcPosY - (arcRadius * 2) > canvas.width) {
            isContinue = false;
        }

        if (block.left < 0) {
            blockMoveDirX = 1;
        }
        else if (block.left > canvas.width - brickWidth) {
            blockMoveDirX = -1;
        }

        arcPosX += arcMoveDirX * arcMoveSpeed;
        arcPosY += arcMoveDirY * arcMoveSpeed;
        block.left += blockMoveDirX * blockMoveSpeed;

        ball.left = arcPosX - arcRadius;
        ball.right = arcPosX + arcRadius;
        ball.top = arcPosY - arcRadius;
        ball.bottom = arcPosY + arcRadius;

        // 공 + bar 충돌 확인
        if (isCollisionRectToRect(ball, paddle)) {
            arcMoveDirY = -1;
            arcPosY = paddle.top - arcRadius;
        }

        // 공 + bricks 충돌 확인
        for (let i = 0; i < brickRow; i++) {
            for (let j = 0; j < brickCol; j++) {
                if (bricks[i][j].isAlive && isCollisionRectToRect(ball, bricks[i][j])) {
                    bricks[i][j].isAlive = false; // 살아있는 bricks(true)를 false로 바꿈

                    disapperedCount += 1;
                    if (disapperedCount == brickSum) {
                        location.reload();
                        alert("Clear");
                    }
                    arcMoveDirY = -arcMoveDirY;

                    break;
                }
            }
        }

        // 공 + block 충돌 확인
        if (isCollisionRectToRect(ball, block)) {
            if (ball.top >= block.bottom && ball.right >= block.left) {
                arcMoveDirY = 1;
            }
            else if (ball.bottom >= block.top && ball.right >= block.left) {
                arcMoveDirX = -1;
            }
            else if (ball.)
        }

        // Game Over
        if (!isContinue) {
            location.reload();
            alert('Game Over');
        }
    }
}

function isCollisionRectToRect(rectA, rectB) {
    /* 안부딪히는 조건
     * a의 왼쪽과 b의 오른쪽
     * a의 오른쪽과 b의 왼쪽
     * a의 위쪽과 b의 아래쪽
     * a의 아래쪽과 b의 위쪽
     */
    if (rectA.left > rectB.right ||
        rectA.right < rectB.left ||
        rectA.top > rectB.bottom ||
        rectA.bottom < rectB.top) {
        return false;
    }

    return true;
}

// function isCollisionBarTop(ball, bar) {
//     if (ball.bottomd < bar.barPosX + barWidth / 2) 
// }

// draw : 화면 클리어 및 여러 가지 도형 그리는 함수
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect();
    drawArc()
    drawBricks();
    drawBlock();
}

// 1) rectangle
function drawRect() {
    context.beginPath();

    context.rect(barPosX, canvas.height - barHeight, barWidth, barHeight);
    context.fillStyle = 'red';
    context.fill();

    context.closePath();
}

// 2) circle
function drawArc() {
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();

    context.closePath();
}

// 3) bricks
function setBricks() {
    bricks = [];
    for (let i = 0; i < brickRow; i++) {
        bricks[i] = [];
        for (let j = 0; j < brickCol; j++) {
            bricks[i][j] = new Brick(
                55 + j * (brickWidth + 10),
                30 + i * (brickHeight + 5),
                55 + j * (brickWidth + 10) + 50,
                30 + i * (brickHeight + 5) + 25,
                "green"
            )
        }
    }

    block = new Brick(
        blockPosX,
        blockPosY,
        blockPosX + brickWidth,
        blockPosY + brickHeight,
        "black"
    )
}

function drawBricks() {
    context.beginPath();
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickCol; j++) {
            bricks[i][j].draw();
        }
    }
    context.closePath();
}

function drawBlock() {
    context.beginPath();
    block.draw();
    context.closePath();
}

setBricks();
setInterval(update, 10);
setInterval(draw, 10);