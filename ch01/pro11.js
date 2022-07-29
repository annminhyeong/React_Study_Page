//배열 내장함수
const arr = [1, 2, 3, 4, 5];
const newArr1 = [];

//배열 내장함수 1 (반복문 내장함수)
arr.forEach((item) => newArr1.push(item * 2));

//배열 내장함수2 (map : 배열에 하나하나 추가해줌)
const newArr2 = arr.map((item) => item * 2);
console.log(newArr2);

//배열 내장함수3 (배열에 존재하는지 확인)
console.log(arr.includes(5));

//배열 내장함수4 (배열이 어느 index에 위치하는지 확인)
//없으면 -1
console.log(arr.indexOf(1));

//배열 내장함수5 (조건에 맞는 index 반환, 배열안에 객체가 섞여 있을 경우 사용함)
const arr2 = [
  { num: 1, color: 'red' },
  { num: 2, color: 'blue' },
  { num: 3, color: 'green', name: '이정환' },
  { num: 4, color: 'black' },
  { num: 5, color: 'green', name: '안민형' },
];

//조건에 만족하는 첫번째 요소를 반환
const idx = arr2.findIndex((elm) => elm.color === 'green');
console.log(idx);

//배열 내장함수6 (조건에 맞는 요소를 반환, 배열안에 객체가 섞여 있을 경우 사용함)
const elemnet = arr2.find((elm) => elm.color === 'green');
//조건에 만족하는 첫번째 요소를 반환
console.log(elemnet);

//배열 내장함수7 (조건에 맞는 배열들을 배열에 저장)
console.log(arr2.filter((elm) => elm.color === 'green'));

//배열 내장함수8 (index로 배열을 잘라 자른 배열을 배열에 저장)
//slice(start, end): start부터 end까지 배열을 잘라 배열에 저장 단 end는 포함 안됨
console.log(arr2.slice(0, 2));

//배열 내장함수9 (배열 합쳐서 합친 배열을 배열에 저장)
const arr3 = [
  { num: 3, color: 'white' },
  { num: 4, color: 'orange' },
  { num: 5, color: 'pink' },
];
console.log(arr2.concat(arr3));

console.clear();
//배열 내장함수 10 (배열 정렬하기, 원본배열을 수정함)
//sort() 함수는 기본적으로 사전순으로 문자정렬됨
let chars = ['나', '다', '가'];
chars.sort();
console.log(chars);

let nums = [0, 1, 3, 2, 10, 30, 20];
const compare = (a, b) => {
  if (a > b) return 1; //a가 b보다 크면 a가 뒤로 감
  if (a < b) return -1; //a가 b보다 작으면 a가 앞으로 감
  if ((a = b)) return 0; //a가 b랑 같으면 자리 안바꿈
};
nums.sort(compare);
console.log(nums);

//배열 내장함수 11 (배열안의 내용 합치기)
let arr4 = ['이정환', '님', '안녕하세요', '또 오셨군요'];
//배열의 요소를 공백을 기준으로 합침
console.log(arr4.join(' '));
