//대입연산자
let a = 1;
let b = 2;

//사칙연산자
console.log(a + b);
console.log(a * b);
console.log(a - b);
console.log(a / b);
console.log(a % b);

//연결연산자
a = '1';
b = '2';
console.log(a + b);

//복합연산자
a = 2;
a += 10;
console.log(a);

//증감연산자
a = 1;
//후위연산자는 이 줄이 끝나고 나서 증가됨
console.log(a++);
//전위연산자는 먼저 증가되고 줄이 실행됨
console.log(++a);

//논리연산자
//and
console.log(true && true);
//or
console.log(true || false);
//not
console.log(!true);

//비교연산자
let compareA = 1 !== '1';
console.log(compareA);
//변수 자료형 확인
console.log(typeof compareA);

//null 병합 연산자 : 왼쪽값이 null이거나 undefined면 오른쪽 값을 대입
let c = undefined;
c = c ?? 10;
console.log(10);
