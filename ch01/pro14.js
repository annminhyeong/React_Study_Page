//단락 회로 평가

//false를 만날때까지 계속 확인하다가 false를 만나면 false값 리턴
console.log(false && true);

//true를 만날때까지 계속 확인하다가 true를 만나면 true값 리턴
console.log(true || false);

const getName = (person) => {
  const name = person && person.name;
  return name || '객체가 아닙니다';
};

let person = null;
const name = getName(person);
console.log(name);
