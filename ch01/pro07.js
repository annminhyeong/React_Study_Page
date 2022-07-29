//콜백함수
function checkMood(mood, goodCallback, badCallback) {
  if (mood === 'good') {
    //기분 좋을때 하는 동작
    goodCallback();
  } else {
    //기분 안좋을 때 하는 동작
    badCallback();
  }
}
function cry() {
  console.log('action : cry');
}
function sing() {
  console.log('action : sing');
}
function dance() {
  console.log('action : dance');
}

checkMood('sad', sing, cry);
