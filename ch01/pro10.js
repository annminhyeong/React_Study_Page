const arr = ['a', 'b', 'c'];
//반복문
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

let person = {
  name: '이정환',
  age: 25,
  tall: 175,
};

const personKeys = Object.keys(person);
console.log(personKeys);
for (let i = 0; i < personKeys.length; i++) {
  const curKey = personKeys[i];
  const curValue = person[curKey];
  console.log(`key : ${curKey}, value :${curValue}`);
}

const personValues = Object.values(person);
for (let i = 0; i < personValues.length; i++) {
  console.log(personValues[i]);
}
