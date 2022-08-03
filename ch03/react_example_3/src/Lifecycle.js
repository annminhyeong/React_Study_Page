//useEffect : 라이프사이클 제어
import { useEffect, useState } from 'react';
import './Lifecycle.css';

//자식 컴포넌트 생성 (한파일에 여러개의 컴포넌트가 존재할 수 있음)
const UnmountTest = () => {
  //Unmount : 컴포넌트가 없어질 때, 화면에 사라질 때 한번 실행됨
  //useEffect() 첫번째 인자 콜백함수에 함수를 리턴하면 함수안의 내용이 Unmount 됨
  useEffect(() => {
    //Mount 된 시점에서 할 일
    console.log('Mount!');

    return () => {
      //Unmount 된 시점에서 할 일
      console.log('Unmount!');
    };
  }, []);
  return <div>Unmount Testing Componet</div>;
};

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const [isVisable, setIsVisable] = useState(false);
  const toggle = () => setIsVisable(!isVisable);

  //Mount : 컴포넌트가 탄생할때, 화면에 나타날때 한번 실행됨
  //useEffect() 두번째 인자에 빈배열을 할당하면 컴포넌트가 탄생할때 한번 실행됨
  useEffect(() => {
    //Mount 된 시점에서 할 일
    console.log('Mount!');
  }, []);

  //Update : 컴포넌트가 바꿜때마다, 화면이 바꿜때마다 실행됨
  //useEffect() 두번째 인자를에 아무것도 주지 않으면 모든 요소를 감시하고 대상이 변경될때마다 실행됨
  useEffect(() => {
    //Update 된 시점에서 할 일
    //console.log('Update!');
  });

  //Update : 컴포넌트가 바꿜때마다, 화면이 바꿜때마다 실행됨
  //useEffect() 두번째 인자 배열에 감시할 값을 집어넣으면 감시할 대상이 변경 될때마다 실행됨
  useEffect(() => {
    //Update 된 시점에서 할 일
    console.log(`Count is Update : ${count}`);
    if (count > 5) {
      alert('Count가 5를 넘었습니다. 따라서 1로 초기화 합니다.');
      setCount(1);
    }
  }, [count]);

  useEffect(() => {
    console.log(`Text is Update : ${text}`);
  }, [text]);

  return (
    <div className='Lifecycle'>
      <div className='Update'>
        <h3>Update 테스트</h3>
        <div>
          {count}
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <div className='Unmount'>
        <h3>Unmount 테스트</h3>
        <button onClick={toggle}>ON/OFF</button>
        {/* isVisable이 true일때만 UnmountTest 컴포넌트를 실행함 */}
        {isVisable && <UnmountTest />}
      </div>
    </div>
  );
};

export default Lifecycle;
