import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//첫번째 인자는 상태변화 이전의 state,
//두번째인자는 dispatch()에서 전달받은 객체
const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      //상태변화시킬 값
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };

      //상태변화시킬 값
      return [newItem, ...state];
    }
    case 'REMOVE': {
      //상태변화시킬 값
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      //상태변화시킬 값
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

//자식 컴포넌트를 거지치 않고 직통으로 데이터를 전달하는 Context Provider 컴포넌트 생성
//자식 컴포넌트가 Context Provider 사용해야하기 때문에 export 해야함
export const DiaryStateContext = React.createContext();

//데이터 state가 변하면 Context Provider가 리랜더링 되기 때문에 새로운 Context Provider를 만들어줌
export const DiaryDispatchContext = React.createContext();

function App() {
  //useRef를 이용하여 초기값을 0으로 설정함
  const dataId = useRef(0);

  //useReducer()의 첫번째 인자는 상태변화를 처리할 함수, 두번째 인자는 초기값
  //data : 현재 state를 사용할때 쓰임
  //dispath : 객체에 값을 담아 useReducer()의 첫번째 인자는 상태변화함수에 전달한다.
  const [data, dispatch] = useReducer(reducer, []);

  const getData = async () => {
    //API를 호출한 다음 JSON값을 배열로 저장
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    //0부터 19까지 추출한 뒤에 객체배열에 저장한뒤 새로운 배열에 저장
    const initData = res.slice(0, 20).map((it) => {
      return {
        id: dataId.current++,
        author: it.email,
        content: it.body,
        //floor : 소수점이하를 반올림
        //random : 0<= x <1 사이의 랜덤한 실수를 반환
        emotion: Math.floor(Math.random() * 5 + 1),
        created_date: new Date().getTime(),
      };
    });

    //상태의 타입은 'INIT'과
    //받은 데이터 initData를 reducer()의 2번째 파라미터 action에 전달
    dispatch({ type: 'INIT', data: initData });
  };

  //Mount 시점에서 실행하기
  useEffect(() => {
    getData();
  }, []);

  //리스트 데이터 추가
  //useCallback : props로 전달 받았을 때 두번째 인자의 배열에 있는 값이 변화하지 않으면
  //첫번째 인자인 콜백함수는 재런더링 되지 않는다.
  const onCreate = useCallback((author, content, emotion) => {
    //dataId의 useRef의 값을 증가
    dataId.current++;

    //상태의 타입은 'CREATE'과 변경할 데이터 initData를
    //받은 데이터 author, content, emotion, id: dataId.current를 reducer()의 2번째 파라미터 action에 전달
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });
  }, []);

  //리스트 삭제
  //useCallback : props로 전달 받았을 때 두번째 인자의 배열에 있는 값이 변화하지 않으면
  //첫번째 인자인 콜백함수는 재런더링 되지 않는다.
  const onRemove = useCallback((targetId) => {
    //상태의 타입은 'REMOVE'과
    //받은 데이터 targetId를 reducer()의 2번째 파라미터 action에 전달
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    //상태의 타입은 'EDIT'과
    //받은 데이터 targetId, newContent를 reducer()의 2번째 파라미터 action에 전달
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  //onCreate, onRemove, onEdit 함수를 하나로 묶음

  //useMemo : 이미 계산해 본 연산 결과를 기억해 두었다가 동일한 계산을 시키면
  //다시 연산하지 않고 기억해 두었던 데이터를 반환 시키게 하는 방법
  //useMemo()의 두번째 인자인 배열의 값이 변화 할때만 첫번째 인자인 콜백함수가 재실행됨
  //useMemo()의 첫번째 인자의 콜백함수의 리턴값을 함수가 아닌 값형태로 저장함
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  //감정 분석 (1~2 나쁨 3~5 기쁨)
  //API 호출전에 한번 호출, API 호출후에 한번 후출 콘술 2번찍힘
  //Data 수정시 콘솔 찍힘

  //useMemo : 이미 계산해 본 연산 결과를 기억해 두었다가 동일한 계산을 시키면
  //다시 연산하지 않고 기억해 두었던 데이터를 반환 시키게 하는 방법
  //useMemo()의 두번째 인자인 배열의 값이 변화 할때만 첫번째 인자인 콜백함수가 재실행됨
  //useMemo()의 첫번째 인자의 콜백함수의 리턴값을 함수가 아닌 값형태로 저장함
  const getDiaryAnalysis = useMemo(() => {
    //console.log('일기분석 시작');

    //배열을 하나씩 가져와서 아이템의 감정이 3이상인 배열의 길이를 계산
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;

    //좋은 일기의 비율
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  //useMemo()의 반환값은 함수가 아니라 값임
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    //Context Provider한테 데이터 전달
    //Context Provider도 컴포넌트이기 때문에 props가 바꿔버리면(data 삭제, 수정 추가)
    //래랜더 되므로 Context Provider에게 한번에 여러개의 데이터를 전달하면 안됨
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className='App'>
          <DiaryEditor />
          <div>전체 일기의 개수 : {data.length}</div>
          <div>좋은 일기의 개수 : {goodCount}</div>
          <div>나쁜 일기의 개수 : {badCount}</div>
          <div>좋은 일기의 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
