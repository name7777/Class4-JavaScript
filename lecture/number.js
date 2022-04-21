/* 숫자형
 * 
    10진수
    255
    2진수 (ex. 0b 1111 1111)
        128 64 32 16  8 4 2 1 = (총합)255
        ex. 179를 2진수로 바꾸기 => 큰 수인 128부터 하나씩 포함되는지 안되는지를 확인하면서 비트 자리 채우면 됨 => 1011 0011

    8진수 (ex. 0o000)
        64 8 1 
        ex. 255를 8진수로 바꾸기 => 역시 큰 수인 64부터 하나씩 곱하기 x를 해본다. 예를 들어 64x3=192가 마지노선이니 맨 앞은 3. 그다음 8x7=56, 남은 7은 1x7. 따라서 377

    16진수 (ex. 0x00 또는 0x0000)
        4096 256 16 1
        ex. 255를 16진수로 바꾸기 => 0xff(=0x00ff) (f는 15. 16xf + 1xf = 240+15 = 255)
 */

let num = 255;
console.log("2진수", num.toString(2));
console.log("8진수", num.toString(8));
console.log("16진수", num.toString(16));

let randomNum = Math.random() * 10; // ★ Math.random() : 0.0 ~ 1.0 사이의 랜덤한 값(=난수)을 반환
console.log(randomNum);

console.log(Math.floor(randomNum)); // ★ floor : 소수점 버림
console.log(Math.ceil(randomNum)); // ★ ceil : 소수점 올림
console.log(Math.round(randomNum)); // ★ round : 소수점 반올림



console.log("==========================실습=========================");
/* 문제
 * 프로그램이 3 ~ 10 사이의 랜덤한 값을 지정한다.
 * 값을 하나 입력 받아서 정답인지 아닌지 출력해준다.
//  */

// let input = Number();
// let test = prompt('정답은?', input);
// document.write(test);
// let random = Math.random() * 10;
// while (random >= 3 && random <= 10) {
//     random = Math.random() * 10;
//     break;
// }

// let result = Math.round(random);

// if (input == result) console.log("정답입니다", result, input);
// else console.log("틀렸습니다. 정답은, ", result, input);
// console.log("확인");


// 교수님 정답
let correctNum = Math.floor((Math.random() * 10)) % 8 + 3; // 3 + 0 ~ 3 + 7
let inputNum = prompt();

console.log("교수님꺼", inputNum, correctNum);

if (inputNum == correctNum) alert("정답");
else alert("오답");