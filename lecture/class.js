/* 클래스(Class) 및 함수생성자 */
// 사실상 prototype에서 설명한 문제점을 class에선 더욱 간편하고 편리하게 사용 가능하다

// 기본 구조
class CBrick {
    constructor(left, top, right, bot) {
        this.a = left;
        this.b = top;
        this.c = right;
        this.d = bot;
    }
}

const whkwon = new CBrick(10, 50, 20, 300); // 자동차(본네트 크기, 핸들 크기, 바퀴 개수, 백미러 모양, 사이드미러 각도)
console.log(whkwon)


// class CMovingBrick extends CBrick { // 상속: extends를 통해 CBrick이 가지고 있던 속성을 다 가져와서 사용할 수 있다
//     movingAction() { // CBrick엔 없는 새로운 속성을 추가하여 새로운 Class가 탄생된 것임
//         this.left++; console.log("내가 움직이고 있다")
//     }
// }

// for(let i = 1; i < 5; i++) {
//     for(let j = 1; j < 5; j++) {
//         const test = new CBrick(0, 0, i, j);
//         console.log("이거", test);
//     }
// }

// const test2 = new CMovingBrick(0, 0, 10, 10);
// console.log(test2.movingAction());
// console.log(test2);