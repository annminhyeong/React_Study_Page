import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: '이정환',
//     content: '하이 1',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: '홍길동',
//     content: '하이 2',
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '아무개',
//     content: '하이 3',
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  //useRef를 이용하여 초기값을 0으로 설정함
  const dataId = useRef(0);
  //useState를 이용하여 리스트 데이터의 초기값을 []로 설정
  const [data, setData] = useState([]);

  //리스트 데이터 추가
  const onCreate = (author, content, emotion) => {
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
    //새로운 리스트 데이터를 전개한 뒤에 원래 리스트 데이터를 전개함
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    //console.log(`${targetId}가 삭제되었습니다`);
    //삭제하기 버튼을 클릭한 아이템의 id와 일치하지 않은 배열만 저장
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //console.log(newDiaryList);
    //setData 함수의 상태를 삭제하지 않은 아이템들로 변경
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      //리스트의 아이템을 하나씩 가져와서 아이템의 id가 수정버튼을 눌렀을때의 id와 같다면
      //아이템을 펼친다음 펼친 아이템의 content를 수정버튼을 눌렀을때의 일기내용으로 바꾼 다음
      //새로운 배열에 추가하고 아니라면 기존의 아이템을 새로운 배열에 추가함
      //아이템들을 전부 새로운 배열 추가하면 새로운배열을 setData 함수의 상태로 변경한다.
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
