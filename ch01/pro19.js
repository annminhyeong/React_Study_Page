//resolve : 비동기 작업 성공, then()을 호출함
//reject  : 비동기 작업 실패, catch()를 호출함

function isPositive(number, resolve, reject) {
  setTimeout(() => {
    if (typeof number === 'number') {
      //비동기작업 성공
      resolve(number >= 0 ? '양수' : '음수');
    } else {
      //비동기작업 실패
      reject('주어진 값이 숫자형이 아닙니다.');
    }
  }, 2000);
}
// 콜백함수를 이용한 방법
// isPositive(
//   [],
//   (res) => console.log('성공적으로 수행됨, 주어진 숫자는', res),
//   (err) => console.log('실패하였습니다.', err)
// );

//프로미스를 이용한 방법
function isPositivePromise(number) {
  //비동기 작업을 수행하는 함수
  const executor = (resolve, reject) => {
    setTimeout(() => {
      if (typeof number === 'number') {
        //비동기 처리 성공, then()에 성공결과 전달
        resolve(number >= 0 ? '양수' : '음수');
      } else {
        //비동기 처리 실패, catch()에 실패결과 전달
        reject('주어진 값이 숫자형이 아닙니다.');
      }
    }, 2000);
  };

  //프로미스 객체 생성
  const asyncTask = new Promise(executor);
  return asyncTask;
}

const res = isPositivePromise([]);
res
  .then((res) => {
    console.log('성공적으로 수행됨, 주어진 숫자는', res);
  })
  .catch((err) => {
    console.log('실패하였습니다.', err);
  });

//pro18의 콜백함수를 프로미스로 개선하기
function taskA(a, b) {
  return new Promise((resolve, reject) => {
    //비동기 처리할 코드 작성
    const res = a + b;
    resolve(res);
  });
}

function taskB(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * 2;
      resolve(res);
    }, 1000);
  });
}

function taskC(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = a * -1;
      resolve(res);
    }, 2000);
  });
}

taskA(3, 4)
  .then((aRes) => {
    console.log(`A reuslt : ${aRes}`);
    return taskB(aRes);
  })
  .then((bRes) => {
    console.log(`B reuslt : ${bRes}`);
    return taskC(bRes);
  })
  .then((cRes) => {
    console.log(`C reuslt : ${cRes}`);
    console.log('코드 끝');
  });
