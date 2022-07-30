//비구조화 할당1

// let one1 = 'one';
// let two1 = 'two';
// let three1 = 'three';
// let four;
let [one, two, three, four = '기본값'] = ['one', 'two', 'three'];
console.log(one, two, three, four);

//비구조화 할당2
let object = { one: 'one', two: 'two', three: 'three' };
// let one2 = object.one;
// let two2 = object.two;
// let three2 = object.three;
//왼쪽은 객체인스턴스명, 오른쪽은 원하는 변수명
let { one: one2, two: two2, three: three2 } = object;

console.log(one2, two2, three2);

//비구조화 할당 활용1
let a = 10;
let b = 20;
let tmp = 0;

// tmp = a;
// a = b;
// b = tmp;
[a, b] = [b, a];

console.log(a, b);
