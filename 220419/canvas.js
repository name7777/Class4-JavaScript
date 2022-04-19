/* 220419 목표
 * 1) 캔버스 설정
 * 2) document
 * 3) context
 */

// 1) 캔버스 설정
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

let arcPosX = canvas.width / 2;
let arcPosY = canvas.height / 2;
let moveDir = -1;

/* Function 구현 */
// 1. update : 데이터 수정 (도형의 위치 이동)

/* ★ 로직
 * 문제: 도형의 포지션에 따라 왔다 갔다 움직인다
 * 핵심: 방향에 영향을 주는 변수(=moveDir) 설정
 * 조건: if 조건에 맞춰 방향 변수에 + or - 를 결정하고 최종 return에 +=로 증감 표시
 */ 
function update() {
    if(arcPosX - 50 < 0 ) {
        moveDir = 1;
    }
    else if(arcPosX + 50 > canvas.width) {
        moveDir = -1;
    }

    arcPosX += moveDir;
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

    context.rect(arcPosX, arcPosY, 100, 100);
    context.fillStyle = 'red';
    context.fill();

    context.closePath();
}

// 3-2. 모양: circle
function drawArc() {

    context.beginPath();

    context.arc(arcPosX, arcPosY, 50, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();

    context.closePath();
}


setInterval(update, 10);
setInterval(draw, 10);