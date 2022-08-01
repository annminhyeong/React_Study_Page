//State를 쓸때는 useState를 import해야함
import React, { useState } from 'react';
import OddEvenResult from './OddEvenResult';

//부모가 props를 보낸다면 매개변수로 받아야함, props가 여러개인 경우 객체에 담겨서 옴
//스프레드로 보낸 props들은 비구조화 할당으로 받을 수 있음. ex) {이름}
const Counter = ({ initialValue }) => {
  //console.log(initialValue);
  //console.log('count가 변할때 마다 Counter 컴포넌트 호출');

  //현재 상태를 불러올때는 count로 가져옴
  //useState()는 상태의 초기값 설정함
  //setCount 함수는 상태를 변화시킬때 쓰임
  const [count, setCount] = useState(initialValue);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

//카운터 컴포넌트의 기본 props값 지정
Counter.defaultProps = {
  initialValue: 0,
};

export default Counter;
