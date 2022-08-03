import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  //useRef를 이용하여 초기값을 0으로 설정함
  const dataId = useRef(0);
  //useState를 이용하여 리스트 데이터의 초기값을 []로 설정
  const [data, setData] = useState([]);

  const getData = async () => {
    //API를 호출한 다음 JSON값을 배열로 저장
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());
    //console.log(res);

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

    setData(initData);
  };

  //Mount 시점에서 실행하기
  useEffect(() => {
    getData();
  }, []);

  //리스트 데이터 추가
  //useCallback : props로 전달 받았을 때 두번째 인자의 배열에 있는 값이 변화하지 않으면
  //첫번째 인자인 콜백함수는 재런더링 되지 않는다.
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      id: dataId.current,
      author,
      content,
      emotion,
      created_date,
    };
    //dataId의 useRef의 값을 증가
    dataId.current++;

    //onCreate() 함수는 컴포넌트가 Mount 되는 시점에서 한번 실행됨 그 당시의 data의 state는 []임
    //함수는 컴포넌트가 재생성될때 다시 생성되는 이유는 현재의 state값을 참조해야 하기 때문임
    //그런데 onCreate() 함수는 콜백함수에 갖혀서 상태변화 함수에 빈배열을 전달했기 때문에
    //빈배열에 새로운 데이터를 추가하는 꼴이 됨. onCreate() 함수가 알고 있는 data의 state는 []임
    // 이를 해결하기 위해서 함수형 업데이트를 사용함

    //함수형 업데이트는 상태변화함수에 함수를 전달해서 항상 최신의 데이터를 전달하고
    //함수에서 리턴받은 값을 상태변화함수에 업데이트 시킴
    setData((data) => [newItem, ...data]);
  }, []);

  //리스트 삭제
  //useCallback : props로 전달 받았을 때 두번째 인자의 배열에 있는 값이 변화하지 않으면
  //첫번째 인자인 콜백함수는 재런더링 되지 않는다.

  const onRemove = useCallback((targetId) => {
    //onRemove() 함수는 컴포넌트가 Mount 되는 시점에서 한번 실행됨 그 당시의 data의 state는 []임
    //함수는 컴포넌트가 재생성될때 다시 생성되는 이유는 현재의 state값을 참조해야 하기 때문임
    //그런데 onRemove() 함수는 콜백함수에 갖혀서 상태변화 함수에 빈배열을 전달했기 때문에
    //빈배열에서 조건에 맞는 아이템를 삭제하는 꼴이 됨. onRemove() 함수가 알고 있는 data의 state는 []임
    // 이를 해결하기 위해서 함수형 업데이트를 사용함

    //함수형 업데이트는 상태변화함수에 함수를 전달해서 항상 최신의 데이터를 전달하고
    //함수에서 리턴받은 값을 상태변화함수에 업데이트 시킴
    //삭제하기 버튼을 클릭한 아이템의 id와 일치하지 않은 배열만 저장
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    //onEdit() 함수는 컴포넌트가 Mount 되는 시점에서 한번 실행됨 그 당시의 data의 state는 []임
    //함수는 컴포넌트가 재생성될때 다시 생성되는 이유는 현재의 state값을 참조해야 하기 때문임
    //그런데 onEdit() 함수는 콜백함수에 갖혀서 상태변화 함수에 빈배열을 전달했기 때문에
    //빈배열에서 조건에 맞는 아이템를 수정하는 꼴이 됨. onEdit() 함수가 알고 있는 data의 state는 []임
    // 이를 해결하기 위해서 함수형 업데이트를 사용함

    //함수형 업데이트는 상태변화함수에 함수를 전달해서 항상 최신의 데이터를 전달하고
    //함수에서 리턴받은 값을 상태변화함수에 업데이트 시킴
    setData((data) =>
      data.map((it) =>
        //리스트의 아이템을 하나씩 가져와서 아이템의 id가 수정버튼을 눌렀을때의 id와 같다면
        //아이템을 펼친다음 펼친 아이템의 content를 수정버튼을 눌렀을때의 일기내용으로 바꾼 다음
        //새로운 배열에 추가하고 아니라면 기존의 아이템을 새로운 배열에 추가함
        //아이템들을 전부 새로운 배열 추가하면 새로운배열을 setData 함수의 상태로 변경한다.
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  //감정 분석 (1~2 나쁨 3~5 기쁨)
  //API 호출전에 한번 호출, API 호출후에 한번 후출 콘술 2번찍힘
  //Data 수정시 콘솔 찍힘

  //useMemo : 이미 계산해 본 연산 결과를 기억해 두었다가 동일한 계산을 시키면
  //다시 연산하지 않고 기억해 두었던 데이터를 반환 시키게 하는 방법
  //useMemo()의 두번째 인자인 배열의 값이 변화 할때만 첫번째 인자인 콜백함수가 재실행됨
  //useMemo()의 반환값은 함수가 아니라 값임
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
    <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기의 개수 : {data.length}</div>
      <div>좋은 일기의 개수 : {goodCount}</div>
      <div>나쁜 일기의 개수 : {badCount}</div>
      <div>좋은 일기의 비율 : {goodRatio}%</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
