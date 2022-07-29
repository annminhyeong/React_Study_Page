let a = 3;

if (a >= 7) {
  console.log('7이상 입니다.');
} else if (a >= 5) {
  console.log('5이상 입니다.');
} else if (a >= 3) {
  console.log('3이상 입니다.');
} else {
  console.log('3미만 입니다.');
}

let country = 'ko';
switch (country) {
  case 'ko':
    console.log('한국');
    break;
  case 'cn':
    console.log('중국');
    break;
  case 'jp':
    console.log('일본');
    break;
  default:
    console.log('미분류');
    break;
}
