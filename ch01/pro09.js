//배열 생성방식
//1. 배열 생성자 방식
let arr1 = new Array();

//2. 배열 리터럴 방식
let arr2 = [1, 2, 3, 4, 5];
console.log(arr2);
console.log(arr2[0]);
console.log(arr2[1]);
console.log(arr2[2]);
console.log(arr2[3]);
console.log(arr2[4]);

//배열 추가
arr2.push({ key: 'value' });
console.log(arr2[5]);

//배열 길이
console.log('length', arr2.length);
