const OddEvenResult = ({ count }) => {
  //부모 컴포넌트의 state를 자식 컴포넌트에게 props로 넘겨줌
  //부모요소의 props인 count가 변경되면 자식 요소가 count를 사용하지 않더라도
  //자식 컴포넌트인 OddEvenResult 컴퍼넌트는 재랜더링됨

  //console.log(count);

  return <>{count % 2 === 0 ? '짝수' : '홀수'}</>;
};

export default OddEvenResult;
