import React, { useEffect, useState, useRef } from 'react';

const DiaryEditor = ({ onCreate }) => {
  //Update
  // useEffect(() => console.log('DiaryEditor Update'));

  //useRef : DOM 조작하기
  const authorInput = useRef();
  const contentInput = useRef();

  //작성자
  //const [author, setAuthor] = useState('');
  //본문
  //const [content, setContent] = useState('');

  //비슷한 State를 하나의 State로 묶어줌
  //state로는 값을 변화시킬수 없음, setState함수를 이용하여 값을 변경해야함
  //useState()는 초기값
  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });

  //onChange 속성이 실행될때 실행되는 함수
  const handleChangeState = (e) => {
    //e.target.name : name  속성의 값을 얻어옴
    //e.target.name : value 속성의 값을 가져옴
    //console.log(e.target.name);
    //console.log(e.target.value);

    setState({
      //기존에 state가 가지고 있는 객체를 펼친다 (author, content, emotion)
      ...state,
      //새로운 값으로 해당 기존객체를 덮어쓴다
      //변수의 값이나 문자열을 프로퍼티의 key로 사용할때는 괄호표기법 이용
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    //console.log(state);
    if (state.author.length < 1) {
      //해당 Dom 요소를 focus해줌
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      //해당 Dom 요소를 focus 해줌
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert('저장성공');
    //일기작성폼 초기화
    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className='DiaryEditor'>
      <h2>오늘의 일기</h2>
      <div>
        {/* input태그의 값이 바뀔때마다  onChange 속성이 실행됨 */}
        {/* change속성의 콜백함수에는 매개변수로 이벤트객체가 전달됨 */}
        <input
          //ref : 해당상수의 useRef의 Dom 위치 설정
          ref={authorInput}
          name='author'
          value={state.author}
          //onChange={(e) => handleChangeState(e)} 와 같음
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          //ref : 해당상수의 useRef의 Dom 위치 설정
          ref={contentInput}
          name='content'
          value={state.content}
          //onChange={(e) => handleChangeState(e)} 와 같음
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정점수: </span>
        <select
          name='emotion'
          value={state.emotion}
          //onChange={(e) => handleChangeState(e)} 와 같음
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

//export 할때 React.memo를 적용해도 됨
//React.memo : 부모에게 전달 받은 props와 자신의 props가 같을때 재랜더링 안되게 함
export default React.memo(DiaryEditor);
