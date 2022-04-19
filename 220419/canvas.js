/* 220419 목표
 * 1) 캔버스 설정
 * 2) document
 * 3) context
 */


// 캔버스 설정
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");


// rect, arc 설정
const arcRadius = 20;
let arcPosX = canvas.width / 2 + 100;
let arcPosY = canvas.height / 2;
let arcMoveDirX = -1;
let arcMoveDirY = -1;
let arcMoveSpeed = 2;

let ball = {
    left:0, right:0, top:0, bottom:0
};

const barWidth = 100;
const barHeight = 20;
let barPosX = canvas.width / 2 - barHeight / 2
let barPosY = canvas.height - barHeight;
let barMoveSpeed = 15;

let paddle = {
    left:0, right:0, top:0, bottom:0
};

document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('keyup', keyUpEventHandler);


/* Function 구현 */
function keyDownEventHandler(e) {
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
    if (arcPosX - 50 < 0) {
        arcMoveDirX = 1;
    }
    else if (arcPosX + 50 > canvas.width) {
        arcMoveDirX = -1;
    }

    if (arcPosY - 50 < 0) {
        arcMoveDirY = 1;
    }
    else if (arcPosY + 50 > canvas.width) {
        arcMoveDirY = -1;
    }

    arcPosX += arcMoveDirX * arcMoveSpeed;
    arcPosY += arcMoveDirY * arcMoveSpeed;

    ball.left = arcPosX - arcRadius;
    ball.right = arcPosX + arcRadius;
    ball.top = arcPosX - arcRadius;
    ball.bottom = arcPosX + arcRadius;

    // 공 + bar 충돌 확인
    if (isCollisionRectToRect(ball, paddle)) {
        arcMoveDirY = -1;
        arcPosY = paddle.top - arcRadius;
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

// 2. draw : 화면 클리어 및 다른 도형 그리기
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect();
    drawArc()
}

// 3. 모양: rectangle
function drawRect() {
    context.beginPath();

    context.rect(barPosX, canvas.height - 20, 100, 20);
    context.fillStyle = 'red';
    context.fill();

    context.closePath();
}

// 3-2. 모양: circle
function drawArc() {
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();

    context.closePath();
}

setInterval(update, 10);
setInterval(draw, 10);