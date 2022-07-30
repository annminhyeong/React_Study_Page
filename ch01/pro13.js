//삼항 연산자
let a = [];
const arrayStatus = a.length === 0 ? '빈배열' : '안 빈 배열';
console.log(arrayStatus);

let b = [];
const result = b ? true : false;
console.log(result);

//학점 계산 프로그램
let score = 78;

score >= 90
  ? console.log('A+')
  : score >= 50
  ? console.log('B+')
  : console.log('F');
