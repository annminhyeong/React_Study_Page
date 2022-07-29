//함수표현식
//호이스팅 안됨
let hello = function () {
  return '안녕하세요 여러분';
};
console.log(hello());

//화살표함수
//호이스팅 안됨
hello = () => {
  return '안녕하세요 여러분';
};
