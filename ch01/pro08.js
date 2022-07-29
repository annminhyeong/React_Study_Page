//객체생성방식
//1방법(생성자 방식)
let person1 = new Object();

//2방법(객체 리터럴 방식)
let person2 = {
  name: '이정환',
  key1: 'value', //프로퍼티(객체 프로퍼티)
  key2: 123,
  key3: true,
  key3: undefined,
  key3: [1, 2, 3],
  key5: function () {
    console.log(`안녕 나는 ${this.name}`);
  },
};
console.log(person2);

//프로퍼티 추가
person2.obj = '객체 추가';
console.log(person2.obj);

//프로퍼티 수정
person2.obj = '객체 수정';
console.log(person2.obj);

//프로퍼티 삭제
//객체에 없는 프로퍼티에 접근할시 undefined

//방법1 (메모리에서 삭제 안됨)
delete person2.obj;
console.log(person2.obj);

//방법2 (메모리에서 삭제됨)
person2.key4 = null;
console.log(person2.key4);

//점표기법
console.log(person2.key1);

//괄호표기법
console.log(person2['key1']);
console.log(getPropertyValue('key2'));

function getPropertyValue(key) {
  return person2[key];
}

//프로퍼티 안의 함수 사용하기
person2.key5();
person2['key5']();

//프로퍼티가 존재하는지 확인
console.log(`name : ${'name' in person2}`);
console.log(`gender : ${'gender' in person2}`);
