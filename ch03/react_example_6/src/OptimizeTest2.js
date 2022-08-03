import React, { useState, useEffect } from 'react';

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ border: '1px solid gray', padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>MemoizedCounter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

//자식 컴포넌트 1 : 전달받은 props를 주소 비교하는 컴포넌트

//React.memo : 함수형 컴포넌트에게 업데이트 조건을 설정
//똑같은 props를 전달하면 컴포넌트는 업데이트 되지 않는다. 단 자기 자신의 state가 바뀌면 리랜더링이 됨
const CounterA = React.memo(({ count }) => {
  //Update : 요소가 변경될때 마다 업데이트
  useEffect(() => {
    console.log(`CounterA Update :: count : ${count}`);
  });

  return <div>{count}</div>;
});

//자식 컴포넌트 2 : 전달받은 props를 주소 비교하는 컴포넌트

//React.memo : 함수형 컴포넌트에게 업데이트 조건을 설정
//똑같은 props를 전달하면 컴포넌트는 업데이트 되지 않는다. 단 자기 자신의 state가 바뀌면 리랜더링이 됨

//부모로부터 props로 전달받은 obj와 현재의 obj의 주소값이 다르므로 계속 리랜더링 됨
const CounterB = React.memo(({ obj }) => {
  //Update : 요소가 변경될때 마다 업데이트
  useEffect(() => {
    console.log(`CounterB Update :: count : ${obj.count}`);
  });

  return <div>{obj.count}</div>;
});

//자바스크립트는 얕은비교(주소 비교)를 하기 때문에 값비교를 하는 함수를 만들어 줘야함
const areEqual = (preProps, nextProps) => {
  if (preProps.obj.count === nextProps.obj.count) {
    return true; //이전 props와 현재 props가 같다 -> 리랜더링 안함
  } else {
    return false; //이전 props와 현재 props가 다르다 -> 리랜더링 함
  }
};

//컴포넌트3 : 전달받은 props를 값비교하는 컴포넌트
const MemoizedCounterB = React.memo(CounterB, areEqual);

export default OptimizeTest2;
