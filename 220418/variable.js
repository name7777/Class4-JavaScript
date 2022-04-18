// alert("start JavaScript");

// 변수명 이름 규칙
/*
 * 1) 알파벳, _, -, 숫자 (한글, 특수문자, 일본어 등 권장 X)
 * 숫자'가 제일 앞에 올 수 없다
 * 
 * 2) camel 표기법
 * let myVeryLongLongName;
 * 
 * 3) 대소문자를 구분한다
 * let myVeryLongLongName;
 * let MyVeryLongLongNmae;
*/

console.log("1", varName); // js는 '호이스팅'으로 인해 변수가 선언되기 전에 실행이 가능함 => C++ 정리한거 다시보면 되겠지만, 컴파일할 때 코딩 해놓은 변수를 메모리에 넣는 것 말고도 '런타임' 환경에서 변수를 넣고 빼고 가능하기 때문에 호이스팅이 됨
var varName = "leejung";	// 가장 오래된 버전에서 사용하던 변수 타입
console.log("2", varName);
let letName = "kwh";
console.log("3", letName);

if (true) {
    // 다른 영역
    var varName = "kwon wonhyun";
    let letName = "kwh2222"; // 지역변수는 해당 scope 안에서만 실행됨. 따라서 5번 콘솔은 이 letName 변수와 관련 없음
}

console.log("4", varName);
console.log("5", letName);


// ★ const: 값이 수정될 일이 없는 변수 EX. 게임에서 1스테이지 맵의 크기, 1스테이지 보스 이름, document 를 변수로 선언할 때 등. 선언하면서 동시에 초기화해야 사용 가능
const constName = "whkwon";
constName = "asdlkfj"; // 변경 안됨
console.log(constName); // => 런타임 에러. 즉, 실행해서 문제가 됐다는 소리. 반대로 컴파일 에러는 애초에 코딩할 때 빨간줄이 뜬다

/* 컴파일 vs 런타임
 * 1) 컴파일: 사람이 작성한 코드를 기계어(binary 등)로 바꿔주는 행위
 * 2) 런타임: 컴파일로 인해 실제로 바뀐 기계어를 한줄씩 실행하는 행위
*/
