//조건문 업그레이드1
function isKoreanFood(food) {
  if (['불고기', '떡볶이', '비빔밥'].includes(food)) {
    return true;
  }
  return false;
}

const food1 = isKoreanFood('불고기');
const food2 = isKoreanFood('파스타');
console.log(food1);
console.log(food2);

//조건문 업그레이드2
const meal = {
  한식: '불고기',
  양식: '파스타',
  중식: '짜장면',
  일식: '초밥',
  인도식: '카레',
};
const getMeal = (mealType) => {
  return meal[mealType] || '굶기';
};
console.log(getMeal(''));
