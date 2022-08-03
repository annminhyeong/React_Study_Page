import React, { useState, useEffect } from 'react';

const OptimizeTest1 = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ border: '1px solid gray', padding: 50 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={(e) => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

//자식 컴포넌트1
//React.memo : 함수형 컴포넌트에게 업데이트 조건을 설정
//똑같은 props를 전달하면 컴포넌트는 업데이트 되지 않는다. 단 자기 자신의 state가 바뀌면 리랜더링이 됨
const Countview = React.memo(({ count }) => {
  //Update : 요소가 변경될때 마다 업데이트
  useEffect(() => {
    console.log(`Update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

//자식 컴포넌트2
//React.memo : 함수형 컴포넌트에게 업데이트 조건을 설정
//똑같은 props를 전달하면 컴포넌트는 업데이트 되지 않는다. 단 자기 자신의 state가 바뀌면 리랜더링이 됨
const Textview = React.memo(({ text }) => {
  //Update : 요소가 변경될때 마다 업데이트
  useEffect(() => {
    console.log(`Update :: text : ${text}`);
  });
  return <div>{text}</div>;
});

export default OptimizeTest1;
