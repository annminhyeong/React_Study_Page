import React from 'react';
// import './App.css';
import MyHeader from './MyHeader';
import Counter from './Counter';
import Container from './Container';

function App() {
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  };
  return (
    //<Container> 태그 안의 자식 태그들은 Container 컴포넌트의 props로 전달됨
    <Container>
      {/* JSX는 반드시 최상위 태그를 가져야 하는데 가지기 싫을때 <React.Fragment> 태그를 씀 */}
      {/* <>는 </React.Fragment>랑 같은 의미 */}
      {/* style속성을 사용할때는 css속성명을 카멜케이스로 씀 */}
      <div>
        <MyHeader />
        {/* Props : 부모 컴포넌트에서 자식컴포넌트로 데이터를 보낼때 사용 */}
        {/* Props를 여러개를 보낼때는 객체에 담은 데이터를 스프레드 연산자로 풀어서 전달가능 */}
        <Counter {...counterProps} initialValue={6} />
      </div>
    </Container>
  );
}

export default App;
