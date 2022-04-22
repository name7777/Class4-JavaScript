/* 비동기/동기 처리
 * 1) 비동기(Asynchronous)
 * Promise
 * async/await
 */

/* Promise
 * new Promise 호출과 동시에 비동기 처리 시작
 */
const promise = new Promise((resolve, reject) => { // Promise의 매개변수로 함수(resolve, reject)를 받아옴. 함수명은 관례적인 명칭
    // 시간이 오래 걸리는 실행문 ... 5초
    resolve(); // 실행 성공
    reject(); // 실행 실패
});

// then = resolve랑 매칭, catch = reject랑 매칭
promise.then(() => console.log("Promise 'then' called"))
    .catch(() => console.log("Promise 'catch' called"))

// 기본 예제
function testFunc1() {
    console.log('Func1');

    let startTime = new Date().getTime();
    while (new Date().getTime() - startTime < 1000);

    testFunc2();
}

function testFunc2() {
    console.log('Func2');
}

testFunc1();

// ↑ Promise는 new에 의해서 런타임 중에 메모리에 할당되기 때문에 testFunc1()이 먼저 처리되고 Promise가 할당된 후 처리돼서 뒤늦게 된다 = '동적할당'
// 1) Promise
function asyncCheckAdult(age) {
    return new Promise((resolve, reject) => {
        if (age >= 20) resolve(age);
        else reject(age)
    })
}

const promiseCheckAdult1 = asyncCheckAdult(12);
promiseCheckAdult1.then((data) => console.log(`${data} is adult`)).catch((data) => console.log(`${data} is not adult`));
const promiseCheckAdult2 = asyncCheckAdult(100);
promiseCheckAdult2.then((data) => console.log(`${data} is adult`)).catch((data) => console.log(`${data} is not adult`));
// cf) Promise가 여러개일 경우 순서 상관없이 성공(resolve)한 결과들을 먼저 반환한 후 실패들을 반환한다