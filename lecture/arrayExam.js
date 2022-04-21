// 배열 표현 방식
let testArray = [1, 2, 3, 4, 5];
let testArray2 = new Array(5);
let testArray3 = []; // 동적배열

// 배열 인덱스 순회 방법
// 1) forEach : 조건없이 모든 배열의 인덱스를 순차적으로 조회하고 싶을 때 forEach
testArray.forEach(function (number, index, arr) {
    console.log("number : ", number, "index : ", index);
})

// 2) for : 짝수/홀수 인덱스만 돌린다는지에 대한 조건을 부여하고 싶을 때 for
for(let i = 0; i < testArray.length; i++) {
    testArray[i];
}

// 배열 관련 메소드
testArray.push(30); // 끝 인덱스에 push: [1, 2, 3, 4, 5, 30]
console.log(testArray);
testArray.pop(); // 끝 인덱스 삭제. 매개변수 X : [1, 2, 3, 4, 5] => LILO 구조 생각하면 됨
console.log(testArray);
testArray.unshift(30) // 앞 인덱스에 추가 : [30, 1, 2, 3, 4, 5]
console.log(testArray);
testArray.shift(); // 앞 인덱스 삭제. 매개변수 X : [1, 2, 3, 4, 5] => LILO 구조 생각하면 됨
console.log(testArray);

/* unshift vs shift
 * 맨 앞에 추가 됨으로서 아무래도 배열 인덱스를 전부 다 바꾸는 등(위치) 큰 인덱스 조작이 이뤄짐
 * 따라서 메모리 리소스적으로 효율이 많이 떨어지기 때문에 크게 권장하진 않는다
*/

// map
// => 다음으로 오는 조건을 만족해서 각 인덱스를 계산하고 '새로운 배열'에 추가한다
let arrayMap = testArray.map(x => x * 2);
console.log("맵", arrayMap);