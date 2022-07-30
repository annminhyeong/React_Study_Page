//Turthy
//1. 비어있지 않은 문자열
//2. 빈배열 []
//3. 빈객체 {}
//4. 0이 아닌 숫자
//5. Infinity, -Infinity

//Falsy
//1. 빈문자열 ''
//2. 비어있지 않은 배열
//3. 비어있지 않은 객체
//4. NaN
//5. null
//6. 0, -0
//7. undefined

let a = 'a';

if (a) {
  console.log('true');
} else {
  console.log('false');
}

const getName = (person) => {
  //falsy한 값에 not를 붙이면 true가 됨
  if (!person) {
    return '객체가 아닙니다.';
  }
  return person.name;
};
const person = undefined;
const name = getName(person);
console.log(name);
