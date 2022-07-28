//숫자형
let age = 25; //정수
let tall = 175.9; //실수
let inf = Infinity; //양의 무한대
let minusInf = -Infinity; //음의 무한대
let nan = NaN; //숫자가 아니다.

//문자형
let name1 = 'winterlood'; //문자열
let name2 = `my name is ${name1}`; //문자열

//불린형
let isSwitchOn = true; //참
let isSwitchOff = false; //거짓

//null : 의도적으로 이값은 아무것도 안가리키고 있다고 나타낼 때 쓰임
let a = null;
console.log(a);

//undefined : 아무값도 할당되어 있지 않다
let b;
console.log(b);

//형변환
let numberA = 12;
let numberB = '2';

//묵시적 형변환
//문자 : "12" + "2" = "122"
console.log(numberA + numberB);

//명시적 형변환
//숫자 12 + 2 = 14
console.log(numberA + parseInt(numberB));
