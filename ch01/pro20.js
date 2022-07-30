//async

function delay(ms) {
  return new Promise((resolve) => {
    //프로미스에서 resolve()밖에 실행 안하면 resolve로 생략가능
    setTimeout(resolve, ms);
  });
}

//async를 붙이면 Promise객체를 반환하는 비동기처리 함수가 됨
async function helloAsync() {
  //await를 붙이면 비동기함수가 동기적 함수처럼 실행됨
  await delay(2000);
  //return은 resolve()에 값을 전달하는 것과 동일함
  return 'hello async';
}

async function main() {
  const res = await helloAsync();
  console.log(res);
}

main();
