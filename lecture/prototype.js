/* 구조체, prototype */

// 기본 구조
function Brick(left, top, right, bot) { // 이제부터 brick은 변수가 아니라 함수생성자(constructure) 역할이다 (붕어빵을 만들기 위한 붕어빵 틀 역할) - 클래스, 객체 생성자 등 대문자로 시작함
    this.left = left,
    this.top = top,
    this.left = right,
    this.bot = bot
    this.movingAction = function() { console.log("내가 움직이고 있다") }
}

let tempBrick = new Brick(0, 0, 10, 10);
tempBrick.movingAction();

// 문제점 : 메모리낭비
for(let i = 0; i < 20; i++) {
    let tepmBrick2 = new Brick(0, 0, 10, 10); // 나는 brick 모양체에 필요한 left, top 등만 필요한데 구조체 자체를 가져오기 때문에 필요없는 함수도 가져와서 메모리 낭비가 심한 문제점이 있음
    tepmBrick2.movingAction();
}

// 해결책 : prototype
Brick.prototype.movingAction2 = function() { console.log("내가 움직이고 있다2") } // 문법으로 이해하지 말고 어떻게 쓰이는지에 대한 '구조'를 이해해야 한다
console.log(Brick.prototype);