// 2) async, await
async function asyncTimeCheckAdult(age, timeout) { // async 하나만 붙임으로서 new Promise 객체를 쓰지 않아도 된다
    return new Promise((resolve, reject) => {
        if (age >= 20) { // 실행 성공
            setTimeout(() => { // await를 보기위해 setTimeout 넣음
                console.log('asyncTimeCheckAdult() 실행')
                resolve(age);
            }, timeout)
        }
        else throw new Error(age); // 실행 실패
    })
}

async function asyncCheckAdult(age) { // async 하나만 붙임으로서 new Promise 객체를 쓰지 않아도 된다
    return new Promise((resolve, reject) => {
        if (age >= 20) resolve(age);
        else throw new Error(age);
    })
}

// await : async 함수가 종료될 때까지 기다린다. 또한, "async 함수 안에서만 사용 가능하다"
async function testAsyncAwaitFunc() {
    await asyncTimeCheckAdult(100, 2000); // 얘는 2초동안 대기타고 그 동안 밑에 함수 2개를 실행
    const promiseCheckAdult3 = asyncCheckAdult(100);
    // console.log("이거", promiseCheckAdult3);
    await promiseCheckAdult3.then((data) => console.log(`${data} is adult`)).catch((data) => console.log(`${data} is not adult`));
    // const promiseCheckAdult4 = asyncCheckAdult(10);
    // promiseCheckAdult4.then((data) => console.log(`${data} is adult`)).catch((data) => console.log(`${data} is not adult`));
}

testAsyncAwaitFunc();