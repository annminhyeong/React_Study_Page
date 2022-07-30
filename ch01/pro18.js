function taskA(a, b, cb) {
  setTimeout(() => {
    const res = a + b;
    cb(res);
  }, 3000);
}

function taskB(a, cb) {
  setTimeout(() => {
    const res = a * 2;
    cb(res);
  }, 1000);
}

function taskC(a, cb) {
  setTimeout(() => {
    const res = a * -1;
    cb(res);
  }, 2000);
}
//비동기 코드를 순차적으로 실행 안함
// taskA(3, 4, (res) => console.log(`A result : ${res}`));
// taskB(7, (res) => console.log(`B result : ${res}`));
// taskC(14, (res) => console.log(`C result : ${res}`));
//console.log('코드 끝');

//비동기코드를 순차적으로 실행함
taskA(3, 4, (aRes) => {
  console.log(`A reuslt : ${aRes}`);
  taskB(aRes, (bRes) => {
    console.log(`B reuslt : ${bRes}`);
    taskC(bRes, (cRes) => {
      console.log(`C reuslt : ${cRes}`);
      console.log('코드 끝');
    });
  });
});
